import React, { useState, useEffect, useMemo } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  UserCheck, 
  UserPlus, 
  Phone, 
  Mail, 
  Search, 
  Filter, 
  Download, 
  Zap, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight, 
  Flame, 
  Activity, 
  Dumbbell, 
  Utensils, 
  Calendar, 
  ExternalLink,
  MessageCircle,
  Copy,
  Check,
  Sparkles,
  RefreshCw,
  Clock,
  Shield,
  Plus
} from 'lucide-react';
import { listenToRealtimeAthletes, saveLeadToRealtimeDb, saveCustomerToRealtimeDb } from '../../services/firebase';
import { Lead, Customer } from '../../types/admin';

export interface UserLoginRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  age?: number;
  sex?: 'male' | 'female';
  heightCm?: number;
  weightKg?: number;
  goal?: string;
  dietType?: string;
  cuisine?: string;
  activityLevel?: string;
  calculatedCalories?: number;
  lastLoginAt?: string;
  registeredAt?: string;
  authProvider?: 'google' | 'password' | 'guest';
}

export const AdminUsersView: React.FC = () => {
  const { 
    leads, 
    captureLead, 
    customers, 
    convertLeadToCustomer, 
    setActiveSubtab, 
    setSelectedLeadId,
    logAuditAction 
  } = useAdmin();

  const { user: currentAppUser } = useApp();

  const [realtimeUsers, setRealtimeUsers] = useState<UserLoginRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'NOT_LEAD' | 'IN_LEADS' | 'CONVERTED_CLIENT'>('ALL');
  const [justConvertedLeadUser, setJustConvertedLeadUser] = useState<string | null>(null);
  const [justConvertedClientUser, setJustConvertedClientUser] = useState<string | null>(null);
  const [copiedPhoneId, setCopiedPhoneId] = useState<string | null>(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  // New user manual form state
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserGoal, setNewUserGoal] = useState('BUILD_MUSCLE');
  const [newUserCalories, setNewUserCalories] = useState(2100);

  // Subscribe to Realtime Database athletes
  useEffect(() => {
    const unsub = listenToRealtimeAthletes((remoteAthletes) => {
      if (Array.isArray(remoteAthletes) && remoteAthletes.length > 0) {
        const formatted = remoteAthletes.map(a => ({
          id: a.id || a.userId || `usr_${Date.now()}`,
          name: a.name || a.profile?.name || 'Athlete',
          email: a.email || a.profile?.email || 'user@fitnetheist.com',
          phone: a.phone || a.profile?.phone || '',
          avatarUrl: a.avatarUrl || a.profile?.avatarUrl,
          age: a.age || a.profile?.age || 26,
          sex: a.sex || a.profile?.sex || 'male',
          heightCm: a.heightCm || a.profile?.heightCm || 178,
          weightKg: a.weightKg || a.profile?.weightKg || 78,
          goal: a.goal || a.profile?.goal || 'BUILD_MUSCLE',
          dietType: a.dietType || a.profile?.dietType || 'NON-VEGETARIAN',
          cuisine: a.cuisine || a.profile?.cuisine || 'INDIAN_INTERNATIONAL',
          activityLevel: a.activityLevel || a.profile?.activityLevel || 'MODERATE',
          calculatedCalories: a.calorieResult?.currentTargetCalories || a.calculatedCalories || 2150,
          lastLoginAt: a.lastUpdatedAt ? new Date(a.lastUpdatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Active recently',
          registeredAt: a.createdAt || '2026-10-01',
          authProvider: a.authProvider || 'google'
        }));
        setRealtimeUsers(formatted);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  // Merge active user session and remote realtime users
  const allUsers = useMemo(() => {
    const map = new Map<string, UserLoginRecord>();

    // 1. Realtime Database athlete records
    realtimeUsers.forEach(u => {
      if (u.email) {
        map.set(u.email.toLowerCase(), u);
      }
    });

    // 2. Currently logged-in athlete in app state
    if (currentAppUser && currentAppUser.email) {
      const activeRecord: UserLoginRecord = {
        id: currentAppUser.id,
        name: currentAppUser.name,
        email: currentAppUser.email,
        phone: currentAppUser.phone,
        avatarUrl: currentAppUser.avatarUrl,
        age: currentAppUser.age,
        sex: currentAppUser.sex,
        heightCm: currentAppUser.heightCm,
        weightKg: currentAppUser.weightKg,
        goal: currentAppUser.goal,
        dietType: currentAppUser.dietType,
        cuisine: currentAppUser.cuisine,
        activityLevel: currentAppUser.activityLevel,
        calculatedCalories: 2200,
        lastLoginAt: 'Active Now (Live Session)',
        registeredAt: new Date().toISOString().split('T')[0],
        authProvider: 'google'
      };
      map.set(currentAppUser.email.toLowerCase(), {
        ...map.get(currentAppUser.email.toLowerCase()),
        ...activeRecord
      });
    }

    return Array.from(map.values());
  }, [currentAppUser, realtimeUsers]);

  // Helper to check user relationship with Leads and Clients
  const getUserStatus = (user: UserLoginRecord) => {
    // Check if client exists
    const client = customers.find(c => 
      c.email.toLowerCase() === user.email.toLowerCase() || 
      (user.phone && c.phone.replace(/\D/g, '') === user.phone.replace(/\D/g, ''))
    );

    if (client) {
      return { stage: 'CLIENT' as const, client, lead: null };
    }

    // Check if lead exists
    const lead = leads.find(l => 
      l.email.toLowerCase() === user.email.toLowerCase() ||
      (user.phone && l.phone && l.phone.replace(/\D/g, '') === user.phone.replace(/\D/g, ''))
    );

    if (lead) {
      if (lead.status === 'CONVERTED') {
        return { stage: 'CLIENT' as const, client: null, lead };
      }
      return { stage: 'LEAD' as const, client: null, lead };
    }

    return { stage: 'USER_ONLY' as const, client: null, lead: null };
  };

  // Convert User -> Lead
  const handleConvertToLead = (user: UserLoginRecord) => {
    const leadPayload = {
      name: user.name,
      email: user.email,
      phone: user.phone || '+91 98000 00000',
      source: 'LOGIN_PORTAL' as const,
      goal: (user.goal as any) || 'BUILD_MUSCLE',
      dietType: (user.dietType as any) || 'NON-VEGETARIAN',
      preferredCuisine: (user.cuisine as any) || 'INDIAN_INTERNATIONAL',
      age: user.age || 26,
      sex: user.sex || 'male',
      heightCm: user.heightCm || 178,
      weightKg: user.weightKg || 78,
      calculatedCalories: user.calculatedCalories || 2150,
      status: 'NEW' as const,
      estimatedValue: 149,
      notes: `User converted to Lead from Admin Users Tab. Phone: ${user.phone || 'N/A'}`
    };

    const newLead = captureLead(leadPayload);
    saveLeadToRealtimeDb(newLead);
    logAuditAction('CONVERTED_USER_TO_LEAD', user.name, 'USER_PORTAL', 'CRM_LEAD');

    setJustConvertedLeadUser(user.id);
    setTimeout(() => setJustConvertedLeadUser(null), 3500);
  };

  // Convert User / Lead -> Client
  const handleConvertToClient = (user: UserLoginRecord) => {
    const { lead } = getUserStatus(user);

    let targetLeadId: string;
    if (lead) {
      targetLeadId = lead.id;
    } else {
      // First create lead then convert
      const newLead = captureLead({
        name: user.name,
        email: user.email,
        phone: user.phone || '+91 98000 00000',
        source: 'LOGIN_PORTAL',
        goal: (user.goal as any) || 'BUILD_MUSCLE',
        status: 'NEW',
        estimatedValue: 149
      });
      targetLeadId = newLead.id;
    }

    const newCustomer = convertLeadToCustomer(targetLeadId, {
      programTier: 'TRANSFORMATION_60_DAY',
      assignedCoach: 'Ananya Roy (Head Coach)'
    });

    saveCustomerToRealtimeDb(newCustomer);
    setJustConvertedClientUser(user.id);
    setTimeout(() => setJustConvertedClientUser(null), 3500);
  };

  const handleCopyPhone = (phone: string, id: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhoneId(id);
    setTimeout(() => setCopiedPhoneId(null), 2000);
  };

  const handleCreateManualUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    const record: UserLoginRecord = {
      id: `usr_${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      phone: newUserPhone || '+91 98765 43210',
      avatarUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=200&q=80',
      age: 26,
      sex: 'male',
      heightCm: 178,
      weightKg: 78,
      goal: newUserGoal,
      dietType: 'NON-VEGETARIAN',
      cuisine: 'INDIAN_INTERNATIONAL',
      activityLevel: 'MODERATE',
      calculatedCalories: newUserCalories,
      lastLoginAt: 'Just now',
      registeredAt: new Date().toISOString().split('T')[0],
      authProvider: 'password'
    };

    setRealtimeUsers(prev => [record, ...prev]);
    setIsAddUserModalOpen(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPhone('');
  };

  const handleExportCSV = () => {
    const headers = ['User ID', 'Name', 'Email', 'Mobile Phone', 'Goal', 'Calories (kcal)', 'Lifecycle Status', 'Last Active'];
    const rows = allUsers.map(u => {
      const status = getUserStatus(u);
      return [
        u.id,
        `"${u.name}"`,
        u.email,
        `"${u.phone || 'N/A'}"`,
        u.goal || 'BUILD_MUSCLE',
        u.calculatedCalories || 2100,
        status.stage,
        `"${u.lastLoginAt || 'Recent'}"`
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `fitnetheist_user_logins_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Users
  const filteredUsers = allUsers.filter(u => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.phone && u.phone.includes(searchTerm)) ||
      (u.goal && u.goal.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    const status = getUserStatus(u);
    if (statusFilter === 'NOT_LEAD') return status.stage === 'USER_ONLY';
    if (statusFilter === 'IN_LEADS') return status.stage === 'LEAD';
    if (statusFilter === 'CONVERTED_CLIENT') return status.stage === 'CLIENT';

    return true;
  });

  const totalUsersCount = allUsers.length;
  const withPhoneCount = allUsers.filter(u => u.phone && u.phone.trim().length > 5).length;
  const inLeadsCount = allUsers.filter(u => getUserStatus(u).stage === 'LEAD').length;
  const inClientsCount = allUsers.filter(u => getUserStatus(u).stage === 'CLIENT').length;

  return (
    <div id="admin-user-logins-view" className="space-y-6 font-mono-num text-xs">
      
      {/* Top Banner Notice */}
      <div className="bg-zinc-950 border border-[#FFC515]/30 p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[0_0_20px_rgba(255,197,21,0.06)] rounded-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#FFC515]/10 border border-[#FFC515]/30 text-[#FFC515] rounded-xs">
            <Users size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-xs uppercase tracking-wider">
                REALTIME USER LOGINS & CONVERSION PIPELINE
              </span>
              <span className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></span>
            </div>
            <p className="text-zinc-400 text-[11px]">
              Every portal login, email signup, and Google Auth session is captured with mobile numbers for instant CRM lead and client conversion.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setIsAddUserModalOpen(true)}
            className="px-3.5 py-1.5 bg-[#FFC515] hover:bg-[#e6b010] text-black font-extrabold uppercase text-xs flex items-center gap-1.5 transition-colors rounded-xs shadow-sm"
          >
            <Plus size={13} />
            <span>RECORD LOGIN</span>
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-2 w-2 bg-[#FFC515] rounded-full"></span>
            <span className="text-xs font-mono-num font-bold uppercase tracking-widest text-[#FFC515]">
              AUTHENTICATION & USER DIRECTORY
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight font-display text-white">
            USER LOGINS & ATHLETES
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono-num mt-1">
            Browse all authenticated user sessions, promote them into CRM leads, and convert them to coaching clients.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2.5 bg-zinc-950 hover:bg-zinc-900 border border-white/15 text-zinc-300 hover:text-white uppercase font-bold flex items-center gap-1.5 transition-colors rounded-sm"
          >
            <Download size={14} />
            <span>EXPORT CSV</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 font-mono-num">
        
        {/* Card 1: Total Logins */}
        <div className="bg-zinc-950 border border-white/10 p-4 rounded-sm">
          <div className="flex items-center justify-between text-zinc-400 text-[10px] uppercase font-bold mb-1">
            <span>TOTAL ATHLETE LOGINS</span>
            <Users size={14} className="text-[#FFC515]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-white">
            {totalUsersCount}
          </div>
          <div className="text-[10px] text-zinc-500 mt-1">
            Live database records & auth accounts
          </div>
        </div>

        {/* Card 2: Mobile Numbers */}
        <div className="bg-zinc-950 border border-white/10 p-4 rounded-sm">
          <div className="flex items-center justify-between text-zinc-400 text-[10px] uppercase font-bold mb-1">
            <span>MOBILE CAPTURED</span>
            <Phone size={14} className="text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-emerald-400">
            {withPhoneCount}
          </div>
          <div className="text-[10px] text-zinc-500 mt-1">
            {Math.round((withPhoneCount / (totalUsersCount || 1)) * 100)}% contactable leads ready
          </div>
        </div>

        {/* Card 3: In Leads */}
        <div className="bg-zinc-950 border border-white/10 p-4 rounded-sm">
          <div className="flex items-center justify-between text-zinc-400 text-[10px] uppercase font-bold mb-1">
            <span>IN CRM LEADS</span>
            <Zap size={14} className="text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-amber-300">
            {inLeadsCount}
          </div>
          <div className="text-[10px] text-zinc-500 mt-1">
            Active in sales pipeline
          </div>
        </div>

        {/* Card 4: Converted to Clients */}
        <div className="bg-zinc-950 border border-white/10 p-4 rounded-sm">
          <div className="flex items-center justify-between text-zinc-400 text-[10px] uppercase font-bold mb-1">
            <span>ACTIVE CLIENTS</span>
            <UserCheck size={14} className="text-[#FFC515]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-[#FFC515]">
            {inClientsCount}
          </div>
          <div className="text-[10px] text-zinc-500 mt-1">
            Enrolled in coaching roster
          </div>
        </div>

      </div>

      {/* Search & Filter Controls */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
        
        {/* Search Input */}
        <div className="sm:col-span-2 relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Athlete Name, Mobile (+91...), Email, or Goal..."
            className="w-full bg-zinc-950 border border-white/10 pl-10 pr-4 py-2.5 text-white placeholder-zinc-500 text-xs focus:border-[#FFC515] focus:outline-none rounded-sm"
          />
        </div>

        {/* Lifecycle Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full bg-zinc-950 border border-white/10 px-3 py-2.5 text-zinc-300 text-xs focus:border-[#FFC515] focus:outline-none rounded-sm"
          >
            <option value="ALL">ALL USERS ({allUsers.length})</option>
            <option value="NOT_LEAD">NOT IN LEADS YET (READY TO CONVERT)</option>
            <option value="IN_LEADS">IN LEADS PIPELINE ({inLeadsCount})</option>
            <option value="CONVERTED_CLIENT">ACTIVE CLIENTS ({inClientsCount})</option>
          </select>
        </div>

        {/* Quick Clear / Reset */}
        <div className="flex items-center justify-end">
          <span className="text-zinc-500 text-[11px]">
            Showing <strong className="text-white">{filteredUsers.length}</strong> of {allUsers.length} Logins
          </span>
        </div>

      </div>

      {/* Main Users Table */}
      <div className="bg-zinc-950 border border-white/10 overflow-hidden shadow-2xl rounded-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono-num">
            <thead>
              <tr className="bg-zinc-900/90 border-b border-white/10 text-[10px] text-zinc-400 uppercase tracking-wider font-bold">
                <th className="p-3.5">ATHLETE IDENTITY</th>
                <th className="p-3.5">MOBILE NUMBER</th>
                <th className="p-3.5">GOAL & TARGET</th>
                <th className="p-3.5">LAST ACTIVE</th>
                <th className="p-3.5">LIFECYCLE STAGE</th>
                <th className="p-3.5 text-center">CONVERSION ACTION</th>
                <th className="p-3.5 text-right">DETAILS</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5 text-xs">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-zinc-500">
                    <Users size={36} className="mx-auto mb-3 opacity-30 text-[#FFC515]" />
                    <p className="text-sm font-bold text-white uppercase tracking-wider">
                      {allUsers.length === 0 ? 'No User Logins Recorded Yet' : 'No User Logins Matched Your Query'}
                    </p>
                    <p className="text-xs text-zinc-400 mt-1 max-w-md mx-auto">
                      {allUsers.length === 0 
                        ? 'All portal logins, Google Sign-Ins, and email registrations will stream into this table in real time with their mobile numbers.'
                        : 'Try searching another name, mobile number (+91...), or switch your filter.'}
                    </p>
                    {allUsers.length === 0 && (
                      <button
                        onClick={() => setIsAddUserModalOpen(true)}
                        className="mt-4 px-4 py-2 bg-[#FFC515] text-black font-extrabold uppercase text-xs rounded-xs hover:bg-[#e6b010] inline-flex items-center gap-1.5"
                      >
                        <Plus size={13} />
                        <span>Record Test Athlete Login</span>
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                filteredUsers.map(user => {
                  const status = getUserStatus(user);
                  const isJustConvertedLead = justConvertedLeadUser === user.id;
                  const isJustConvertedClient = justConvertedClientUser === user.id;

                  return (
                    <tr 
                      key={user.id} 
                      className="hover:bg-zinc-900/50 transition-colors group"
                    >
                      {/* Athlete Identity */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatarUrl || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=200&q=80'}
                            alt={user.name}
                            className="w-9 h-9 rounded-full object-cover border border-white/20 flex-shrink-0"
                          />
                          <div>
                            <div className="font-bold text-white text-xs flex items-center gap-2">
                              <span>{user.name}</span>
                              {user.authProvider === 'google' && (
                                <span className="text-[9px] px-1 py-0.2 bg-blue-950/60 text-blue-300 border border-blue-500/40 rounded-xs uppercase font-bold">
                                  Google
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-zinc-400 flex items-center gap-1.5 mt-0.5">
                              <Mail size={11} className="text-zinc-500" />
                              <span>{user.email}</span>
                            </div>
                            <div className="text-[9px] text-zinc-600 font-mono">
                              UID: {user.id.slice(0, 14)}...
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Mobile Number & Quick WhatsApp */}
                      <td className="p-3.5">
                        {user.phone ? (
                          <div className="space-y-1">
                            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-zinc-900 border border-white/15 text-emerald-400 font-bold rounded-xs text-[11px]">
                              <Phone size={11} className="text-emerald-400" />
                              <span>{user.phone}</span>
                              <button
                                onClick={() => handleCopyPhone(user.phone!, user.id)}
                                className="ml-1 text-zinc-500 hover:text-white"
                                title="Copy mobile number"
                              >
                                {copiedPhoneId === user.id ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                              </button>
                            </div>

                            <div>
                              <a
                                href={`https://wa.me/${user.phone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(user.name)},%20welcome%20to%20Fitnetheist!%20Your%20custom%20fitness%20and%20diet%20plan%20is%20ready.`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] text-emerald-400 hover:underline inline-flex items-center gap-1 font-bold"
                              >
                                <MessageCircle size={10} />
                                <span>WhatsApp Chat →</span>
                              </a>
                            </div>
                          </div>
                        ) : (
                          <span className="text-zinc-500 text-[10px] italic">
                            No mobile recorded
                          </span>
                        )}
                      </td>

                      {/* Goal & Target */}
                      <td className="p-3.5">
                        <div>
                          <span className="px-2 py-0.5 bg-zinc-900 border border-white/10 text-white font-bold text-[10px] uppercase rounded-xs">
                            {user.goal ? user.goal.replace(/_/g, ' ') : 'BUILD MUSCLE'}
                          </span>
                          <div className="text-[10px] text-zinc-400 mt-1 flex items-center gap-2">
                            <span>{user.calculatedCalories || 2150} kcal</span>
                            <span className="text-zinc-600">·</span>
                            <span>{user.age || 26}y / {user.weightKg || 78}kg</span>
                          </div>
                        </div>
                      </td>

                      {/* Last Active */}
                      <td className="p-3.5 text-zinc-400 text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} className="text-zinc-500" />
                          <span>{user.lastLoginAt || 'Recent'}</span>
                        </div>
                        <span className="text-[9px] text-zinc-600 block mt-0.5">
                          Reg: {user.registeredAt || '2026-10-01'}
                        </span>
                      </td>

                      {/* Lifecycle Stage */}
                      <td className="p-3.5">
                        {status.stage === 'CLIENT' ? (
                          <span className="px-2 py-1 bg-[#FFC515]/20 border border-[#FFC515]/50 text-[#FFC515] font-extrabold text-[10px] uppercase rounded-xs inline-flex items-center gap-1">
                            <UserCheck size={11} />
                            <span>COACHING CLIENT</span>
                          </span>
                        ) : status.stage === 'LEAD' ? (
                          <span className="px-2 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 font-extrabold text-[10px] uppercase rounded-xs inline-flex items-center gap-1">
                            <Zap size={11} />
                            <span>CRM LEAD ({status.lead?.status})</span>
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-zinc-900 border border-white/10 text-zinc-400 font-bold text-[10px] uppercase rounded-xs inline-flex items-center gap-1">
                            <Users size={11} />
                            <span>USER / LOGIN ONLY</span>
                          </span>
                        )}
                      </td>

                      {/* Conversion Action */}
                      <td className="p-3.5 text-center">
                        {status.stage === 'CLIENT' || isJustConvertedClient ? (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/60 border border-emerald-500/60 text-emerald-300 font-bold text-[10px] uppercase rounded-xs">
                            <CheckCircle2 size={12} className="text-emerald-400" />
                            <span>CLIENT CREATED</span>
                            <button
                              onClick={() => setActiveSubtab('clients')}
                              className="ml-1 underline hover:text-white"
                            >
                              ROSTER →
                            </button>
                          </div>
                        ) : status.stage === 'LEAD' || isJustConvertedLead ? (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleConvertToClient(user)}
                              className="px-2.5 py-1.5 bg-[#FFC515] hover:bg-[#e6b010] text-black font-extrabold uppercase text-[10px] tracking-wider inline-flex items-center gap-1 rounded-xs transition-transform active:scale-95 shadow-sm"
                              title="Convert this CRM lead into an active coaching client"
                            >
                              <Zap size={11} className="fill-black" />
                              <span>CONVERT TO CLIENT</span>
                            </button>

                            <button
                              onClick={() => {
                                if (status.lead) {
                                  setSelectedLeadId(status.lead.id);
                                  setActiveSubtab('leads-detail');
                                } else {
                                  setActiveSubtab('leads');
                                }
                              }}
                              className="text-[10px] text-zinc-400 hover:text-white uppercase font-bold underline"
                              title="View Lead Pipeline Dossier"
                            >
                              LEAD →
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            {/* Step 1: Convert to Lead */}
                            <button
                              onClick={() => handleConvertToLead(user)}
                              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-black font-extrabold uppercase text-[10px] tracking-wider inline-flex items-center gap-1 rounded-xs transition-transform active:scale-95 shadow-sm"
                              title="Push this athlete login into CRM Leads"
                            >
                              <UserPlus size={11} />
                              <span>CONVERT TO LEAD</span>
                            </button>

                            {/* Direct Convert to Client Shortcut */}
                            <button
                              onClick={() => handleConvertToClient(user)}
                              className="px-2.5 py-1.5 bg-zinc-900 hover:bg-[#FFC515] hover:text-black text-white font-bold uppercase text-[10px] border border-white/10 rounded-xs transition-colors"
                              title="Directly convert into coaching client"
                            >
                              <span>TO CLIENT</span>
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Details & Dossier */}
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => {
                            if (status.lead) {
                              setSelectedLeadId(status.lead.id);
                              setActiveSubtab('leads-detail');
                            } else if (status.stage === 'CLIENT') {
                              setActiveSubtab('clients');
                            } else {
                              handleConvertToLead(user);
                            }
                          }}
                          className="px-2.5 py-1 bg-zinc-900 hover:bg-white hover:text-black text-white text-[10px] uppercase font-bold border border-white/10 transition-colors inline-flex items-center gap-1 rounded-xs"
                        >
                          <span>DOSSIER</span>
                          <ChevronRight size={12} />
                        </button>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-[#0e0e12] border border-white/15 max-w-md w-full p-6 space-y-4 shadow-2xl rounded-sm">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-[#FFC515]" />
                <h3 className="font-bold text-white uppercase text-sm">RECORD ATHLETE LOGIN</h3>
              </div>
              <button 
                onClick={() => setIsAddUserModalOpen(false)}
                className="text-zinc-500 hover:text-white font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateManualUser} className="space-y-3 font-mono-num text-xs">
              <div>
                <label className="block text-zinc-400 uppercase text-[10px] font-bold mb-1">Athlete Full Name *</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Karan Singhania"
                  className="w-full bg-zinc-950 border border-white/10 px-3 py-2 text-white focus:border-[#FFC515] focus:outline-none rounded-xs"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase text-[10px] font-bold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="e.g. karan@gmail.com"
                  className="w-full bg-zinc-950 border border-white/10 px-3 py-2 text-white focus:border-[#FFC515] focus:outline-none rounded-xs"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase text-[10px] font-bold mb-1">Mobile Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={newUserPhone}
                  onChange={(e) => setNewUserPhone(e.target.value)}
                  placeholder="e.g. +91 98200 12345"
                  className="w-full bg-zinc-950 border border-white/10 px-3 py-2 text-white focus:border-[#FFC515] focus:outline-none rounded-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase text-[10px] font-bold mb-1">Primary Goal</label>
                  <select
                    value={newUserGoal}
                    onChange={(e) => setNewUserGoal(e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 px-3 py-2 text-white focus:border-[#FFC515] focus:outline-none rounded-xs"
                  >
                    <option value="BUILD_MUSCLE">BUILD MUSCLE</option>
                    <option value="LOSE_WEIGHT">FAT LOSS (CUT)</option>
                    <option value="MAINTAIN">MAINTAIN FITNESS</option>
                    <option value="ENDURANCE">ENDURANCE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase text-[10px] font-bold mb-1">Target Calories</label>
                  <input
                    type="number"
                    value={newUserCalories}
                    onChange={(e) => setNewUserCalories(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-white/10 px-3 py-2 text-white focus:border-[#FFC515] focus:outline-none rounded-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-3 py-2 text-zinc-400 hover:text-white uppercase font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FFC515] text-black font-extrabold uppercase rounded-xs hover:bg-[#e6b010]"
                >
                  Save Athlete Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
