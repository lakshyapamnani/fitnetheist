import React, { useState, useMemo } from 'react';
import {
  Customer,
  Lead,
  PACKAGE_CATALOG,
  findPackageOption,
  getSubscriptionStatusInfo,
  getLocalDateString,
  calculateEndDateFromPackage
} from '../../types/admin';
import { useAdmin } from '../../context/AdminContext';
import { ClientIntakeModal } from './ClientIntakeModal';
import { ClientProfileDetailView } from './ClientProfileDetailView';
import { 
  Users, 
  UserPlus, 
  Search, 
  Flame, 
  Calendar, 
  ChevronRight, 
  Sparkles, 
  Grid, 
  List, 
  MapPin, 
  ShieldCheck,
  ArrowRight,
  Package,
  AlertTriangle,
  Clock
} from 'lucide-react';

export const ClientManagementView: React.FC = () => {
  const { 
    customers, 
    leads, 
    selectedCustomerId, 
    setSelectedCustomerId,
    setActiveSubtab 
  } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [subscriptionFilter, setSubscriptionFilter] = useState<'ALL' | 'ACTIVE' | 'EXPIRING_SOON' | 'SUBSCRIPTION_OVER'>('ALL');
  const [packageFilter, setPackageFilter] = useState<string>('ALL');
  const [goalFilter, setGoalFilter] = useState<string>('ALL');
  const [coachFilter, setCoachFilter] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'CARDS' | 'TABLE'>('CARDS');

  // Intake Modals
  const [isIntakeModalOpen, setIsIntakeModalOpen] = useState(false);
  const [leadToConvert, setLeadToConvert] = useState<Lead | null>(null);
  const [isSelectLeadModalOpen, setIsSelectLeadModalOpen] = useState(false);

  // Dynamically merge any leads with status === 'CONVERTED' into customers roster if not already present
  const mergedCustomers = useMemo(() => {
    const list = [...(customers || [])];
    const existingLeadIds = new Set(list.map(c => c.convertedFromLeadId || c.id));
    const existingEmails = new Set(list.map(c => (c.email || '').toLowerCase().trim()).filter(Boolean));
    const existingPhones = new Set(list.map(c => (c.phone || '').trim()).filter(Boolean));

    (leads || []).forEach(lead => {
      if (lead && lead.status === 'CONVERTED') {
        const emailLower = (lead.email || '').toLowerCase().trim();
        const phoneTrim = (lead.phone || '').trim();
        const alreadyPresent = existingLeadIds.has(lead.id) ||
          (emailLower && existingEmails.has(emailLower)) ||
          (phoneTrim && existingPhones.has(phoneTrim));

        if (!alreadyPresent) {
          const pkgName = lead.packageName || lead.challengeInterest || PACKAGE_CATALOG[0].name;
          const matchedOpt = findPackageOption(pkgName);
          const sDate = lead.createdAt ? lead.createdAt.split('T')[0] : getLocalDateString();
          const eDate = calculateEndDateFromPackage(sDate, pkgName);
          list.unshift({
            id: `cust_${lead.id.replace('lead_', '')}`,
            name: lead.name || 'Converted Client',
            email: lead.email || `client_${lead.id}@domain.com`,
            phone: lead.phone || '',
            avatarUrl: lead.sex === 'female' 
              ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
              : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            joinedDate: sDate,
            totalSpent: lead.estimatedValue || matchedOpt?.priceINR || 8500,
            status: 'ACTIVE',
            programTier: pkgName,
            packageName: pkgName,
            packageCategory: lead.packageCategory || matchedOpt?.category || 'Official Coaching Plan',
            packagePrice: lead.estimatedValue || matchedOpt?.priceINR || 8500,
            assignedCoach: lead.assignedTo && lead.assignedTo !== 'Unassigned' ? lead.assignedTo : 'Coach Neetu (Head Coach)',
            startDate: sDate,
            endDate: eDate,
            age: lead.age || 28,
            gender: lead.sex === 'female' ? 'FEMALE' : 'MALE',
            city: 'India',
            emergencyContact: '',
            heightCm: lead.heightCm || 175,
            startingWeightKg: lead.weightKg || 75,
            currentWeightKg: lead.weightKg || 75,
            targetWeightKg: lead.goal === 'LOSE_WEIGHT' ? (lead.weightKg || 75) - 6 : (lead.weightKg || 75) + 4,
            targetDate: '',
            injuriesOrMedicalConditions: 'None reported.',
            dietGoal: (lead.goal as any) || 'BUILD_MUSCLE',
            dietType: (lead.dietType as any) || 'VEGETARIAN',
            dailyCalories: lead.calculatedCalories || 2100,
            proteinGrams: Math.round((lead.weightKg || 75) * 2),
            carbsGrams: Math.round(((lead.calculatedCalories || 2100) * 0.45) / 4),
            fatsGrams: Math.round(((lead.calculatedCalories || 2100) * 0.25) / 9),
            waterLitres: 3.5,
            mealsPerDay: lead.dietPreferences?.mealsPerDay || 4,
            allergiesOrRestrictions: lead.dietPreferences?.restrictions?.join(', ') || 'None',
            cheatMealProtocol: '1 clean cheat meal weekly',
            workoutSplit: lead.workoutPreferences?.daysPerWeek === 4 ? '4-Day Upper / Lower' : 'Push / Pull / Legs 6-Day',
            trainingDaysPerWeek: lead.workoutPreferences?.daysPerWeek || 4,
            experienceLevel: (lead.workoutPreferences?.experience as any) || 'INTERMEDIATE',
            cardioProtocol: '8,500 daily steps',
            strengthBenchmarks: { benchPressKg: 70, squatKg: 90, deadliftKg: 120, overheadPressKg: 40 },
            streakDays: 1,
            lastActivity: 'Converted from Lead',
            orderIds: [],
            convertedFromLeadId: lead.id
          });
        }
      }
    });
    return list;
  }, [customers, leads]);

  // If a customer is selected, show whole profile view (must be AFTER all hooks)
  if (selectedCustomerId) {
    return (
      <ClientProfileDetailView
        customerId={selectedCustomerId}
        onBack={() => setSelectedCustomerId(null)}
      />
    );
  }

  // Filtered clients (Never hide or delete expired clients unless filtered)
  const filteredCustomers = mergedCustomers.filter(c => {
    if (!c) return false;
    const subInfo = getSubscriptionStatusInfo(c.startDate, c.endDate);
    if (subscriptionFilter !== 'ALL' && subInfo.status !== subscriptionFilter) return false;

    const pkgName = c.packageName || c.programTier || '';
    const pkgCat = c.packageCategory || findPackageOption(pkgName)?.category || 'Official Coaching Plan';
    if (packageFilter !== 'ALL' && pkgName !== packageFilter && pkgCat !== packageFilter) return false;

    if (goalFilter !== 'ALL' && c.dietGoal !== goalFilter) return false;
    const coach = c.assignedCoach || 'Coach Neetu (Head Coach)';
    if (coachFilter !== 'ALL' && !coach.toLowerCase().includes(coachFilter.toLowerCase())) return false;
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (c.name || '').toLowerCase().includes(q);
      const matchEmail = (c.email || '').toLowerCase().includes(q);
      const matchPhone = (c.phone || '').includes(q);
      const matchProgram = pkgName.toLowerCase().includes(q);
      const matchCat = pkgCat.toLowerCase().includes(q);
      const matchCity = (c.city || '').toLowerCase().includes(q);
      const matchCoach = coach.toLowerCase().includes(q);
      return matchName || matchEmail || matchPhone || matchProgram || matchCat || matchCity || matchCoach;
    }
    return true;
  });

  // Calculate high-level roster stats including live subscription tracking
  const totalClients = mergedCustomers.length;
  const activeSubscriptionsCount = mergedCustomers.filter(c => getSubscriptionStatusInfo(c.startDate, c.endDate).status === 'ACTIVE').length;
  const expiringSoonCount = mergedCustomers.filter(c => getSubscriptionStatusInfo(c.startDate, c.endDate).status === 'EXPIRING_SOON').length;
  const expiredSubscriptionsCount = mergedCustomers.filter(c => getSubscriptionStatusInfo(c.startDate, c.endDate).status === 'SUBSCRIPTION_OVER').length;
  const totalRosterLTV = mergedCustomers.reduce((sum, c) => sum + (c.totalSpent || 0), 0);

  // Leads available to convert (non-converted leads)
  const convertibleLeads = (leads || []).filter(l => l.status !== 'CONVERTED' && l.status !== 'LOST');

  return (
    <div id="fitnetheist-clients-view" className="space-y-6">
      
      {/* Top Header & Master Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0a0a0e] border border-white/10 p-5 rounded-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FFC515]/20 border border-[#FFC515]/40 text-[#FFC515] rounded-sm">
              <Users size={20} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider font-display">
                CLIENT MANAGEMENT & SUBSCRIPTION TRACKER
              </h1>
              <p className="text-zinc-400 text-xs font-mono-num">
                Package categorization, automatic subscription expiry tracking, complete client reports, diet plans & invoicing.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Client Selector Dropdown */}
          <div className="relative">
            <select
              defaultValue=""
              onChange={(e) => {
                const val = e.target.value;
                if (!val) return;
                setSelectedCustomerId(val);
              }}
              className="bg-zinc-900 hover:bg-zinc-850 border border-[#FFC515]/50 hover:border-[#FFC515] text-[#FFC515] font-bold px-3 py-2 text-xs rounded-xs focus:outline-none cursor-pointer max-w-[240px] truncate shadow-sm"
              title="Select any client or lead to open their complete client report"
            >
              <option value="" disabled>⚡ Open Client Report...</option>
              <optgroup label="⭐ Enrolled Clients">
                {mergedCustomers.map(c => {
                  const sub = getSubscriptionStatusInfo(c.startDate, c.endDate);
                  return (
                    <option key={c.id} value={c.id}>
                      {c.name} [{sub.label}] — {c.packageName || c.programTier}
                    </option>
                  );
                })}
              </optgroup>
              <optgroup label="⚡ Inquiries & Leads">
                {(leads || []).map(l => (
                  <option key={l.id} value={l.id}>
                    {l.name} [Lead: {l.status}]
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <button
            onClick={() => setActiveSubtab('consent-forms')}
            className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/20 uppercase font-bold text-xs flex items-center gap-1.5 transition-colors rounded-xs cursor-pointer"
          >
            <ShieldCheck size={14} className="text-[#FFC515]" />
            <span>SIGNED CONSENT FORMS</span>
          </button>

          <button
            onClick={() => setIsSelectLeadModalOpen(true)}
            className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/20 uppercase font-bold text-xs flex items-center gap-1.5 transition-colors rounded-xs shadow-sm cursor-pointer"
          >
            <Sparkles size={14} className="text-[#FFC515]" />
            <span>CONVERT FROM LEAD ({convertibleLeads.length})</span>
          </button>

          <button
            onClick={() => {
              setLeadToConvert(null);
              setIsIntakeModalOpen(true);
            }}
            className="px-4 py-2 bg-[#FFC515] hover:bg-[#e6b010] text-black font-black uppercase text-xs flex items-center gap-1.5 transition-transform active:scale-95 rounded-xs shadow-lg cursor-pointer"
          >
            <UserPlus size={15} />
            <span>+ DIRECT NEW CLIENT</span>
          </button>
        </div>
      </div>

      {/* Roster KPI Summary Ribbon with Live Subscription Status Counts */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div
          onClick={() => setSubscriptionFilter('ALL')}
          className={`bg-[#0f0f14] border p-4 rounded-sm cursor-pointer transition-colors ${
            subscriptionFilter === 'ALL' ? 'border-[#FFC515]' : 'border-white/10 hover:border-white/30'
          }`}
        >
          <span className="text-[10px] text-zinc-400 uppercase font-bold block">Total Clients</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-white font-mono-num">{totalClients}</span>
            <span className="text-xs text-zinc-400 font-bold">ROSTER</span>
          </div>
        </div>

        <div
          onClick={() => setSubscriptionFilter('ACTIVE')}
          className={`bg-[#0f0f14] border p-4 rounded-sm cursor-pointer transition-colors ${
            subscriptionFilter === 'ACTIVE' ? 'border-emerald-400' : 'border-white/10 hover:border-emerald-500/40'
          }`}
        >
          <span className="text-[10px] text-emerald-400 uppercase font-bold block">Active Subscriptions</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono-num">{activeSubscriptionsCount}</span>
            <span className="text-xs text-zinc-400 font-bold">ACTIVE</span>
          </div>
        </div>

        <div
          onClick={() => setSubscriptionFilter('EXPIRING_SOON')}
          className={`bg-[#0f0f14] border p-4 rounded-sm cursor-pointer transition-colors ${
            subscriptionFilter === 'EXPIRING_SOON' ? 'border-amber-400' : 'border-white/10 hover:border-amber-500/40'
          }`}
        >
          <span className="text-[10px] text-amber-400 uppercase font-bold block">Expiring Soon (≤7d)</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono-num">{expiringSoonCount}</span>
            <span className="text-xs text-zinc-400 font-bold">RENEW</span>
          </div>
        </div>

        <div
          onClick={() => setSubscriptionFilter('SUBSCRIPTION_OVER')}
          className={`bg-[#0f0f14] border p-4 rounded-sm cursor-pointer transition-colors ${
            subscriptionFilter === 'SUBSCRIPTION_OVER' ? 'border-red-500' : 'border-white/10 hover:border-red-500/40'
          }`}
        >
          <span className="text-[10px] text-red-400 uppercase font-bold block">Subscription Over</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-red-400 font-mono-num">{expiredSubscriptionsCount}</span>
            <span className="text-xs text-zinc-400 font-bold">EXPIRED</span>
          </div>
        </div>

        <div className="bg-[#0f0f14] border border-white/10 p-4 rounded-sm col-span-2 sm:col-span-1">
          <span className="text-[10px] text-zinc-400 uppercase font-bold block">Total Roster LTV</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl sm:text-2xl font-black text-[#FFC515] font-mono-num">₹{totalRosterLTV.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-[#0e0e13] border border-white/10 p-4 rounded-sm space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client name, email, phone, package, category, city..."
              className="w-full bg-[#15151c] border border-white/15 pl-9 pr-4 py-2 text-xs text-white rounded-xs focus:border-[#FFC515] focus:outline-none font-mono-num"
            />
          </div>

          {/* Quick Filter Selectors & View Toggle */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Package / Category Filter */}
            <select
              value={packageFilter}
              onChange={(e) => setPackageFilter(e.target.value)}
              className="bg-[#15151c] border border-[#FFC515]/40 px-3 py-2 text-xs font-bold text-white uppercase rounded-xs focus:border-[#FFC515] focus:outline-none"
            >
              <option value="ALL">ALL PACKAGES & CATEGORIES</option>
              <optgroup label="Filter by Client Category">
                <option value="Official Coaching Plan">CATEGORY: OFFICIAL COACHING PLANS</option>
                <option value="Challenge Tier">CATEGORY: CHALLENGE TIERS</option>
                <option value="Custom Coaching">CATEGORY: CUSTOM COACHING</option>
              </optgroup>
              <optgroup label="Filter by Specific Package">
                {PACKAGE_CATALOG.map(pkg => (
                  <option key={pkg.id} value={pkg.name}>
                    {pkg.name}
                  </option>
                ))}
              </optgroup>
            </select>

            {/* Subscription Status Filter */}
            <select
              value={subscriptionFilter}
              onChange={(e) => setSubscriptionFilter(e.target.value as any)}
              className="bg-[#15151c] border border-white/15 px-3 py-2 text-xs font-bold text-white uppercase rounded-xs focus:border-[#FFC515] focus:outline-none"
            >
              <option value="ALL">ALL SUBSCRIPTIONS</option>
              <option value="ACTIVE">ACTIVE SUBSCRIPTION</option>
              <option value="EXPIRING_SOON">EXPIRING SOON (≤7 DAYS)</option>
              <option value="SUBSCRIPTION_OVER">SUBSCRIPTION OVER</option>
            </select>

            <select
              value={goalFilter}
              onChange={(e) => setGoalFilter(e.target.value)}
              className="bg-[#15151c] border border-white/15 px-3 py-2 text-xs font-bold text-white uppercase rounded-xs focus:border-[#FFC515] focus:outline-none"
            >
              <option value="ALL">ALL GOALS</option>
              <option value="BUILD_MUSCLE">BUILD MUSCLE</option>
              <option value="LOSE_WEIGHT">FAT LOSS</option>
              <option value="STRENGTH">STRENGTH</option>
              <option value="EVERYDAY_HEALTH">RECOMP / HEALTH</option>
            </select>

            <div className="flex border border-white/15 rounded-xs overflow-hidden">
              <button
                type="button"
                onClick={() => setViewMode('CARDS')}
                className={`p-2 transition-colors ${viewMode === 'CARDS' ? 'bg-[#FFC515] text-black' : 'bg-[#15151c] text-zinc-400 hover:text-white'}`}
                title="Grid Cards View"
              >
                <Grid size={14} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('TABLE')}
                className={`p-2 transition-colors ${viewMode === 'TABLE' ? 'bg-[#FFC515] text-black' : 'bg-[#15151c] text-zinc-400 hover:text-white'}`}
                title="Table List View"
              >
                <List size={14} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* CLIENT CARDS GRID VIEW */}
      {viewMode === 'CARDS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((cust) => {
              const startW = cust.startingWeightKg || cust.currentWeightKg || 75;
              const currW = cust.currentWeightKg || startW;
              const targetW = cust.targetWeightKg || startW;
              const totalDist = Math.abs(targetW - startW);
              const doneDist = Math.abs(currW - startW);
              const pct = totalDist > 0 ? Math.min(Math.round((doneDist / totalDist) * 100), 100) : 100;

              const pkgName = cust.packageName || cust.programTier || PACKAGE_CATALOG[0].name;
              const matchedOpt = findPackageOption(pkgName);
              const pkgCategory = cust.packageCategory || matchedOpt?.category || 'Official Coaching Plan';
              const subInfo = getSubscriptionStatusInfo(cust.startDate, cust.endDate);

              return (
                <div
                  key={cust.id}
                  onClick={() => setSelectedCustomerId(cust.id)}
                  className={`bg-[#0f0f14] border p-5 rounded-sm cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 space-y-4 group flex flex-col justify-between ${
                    subInfo.status === 'SUBSCRIPTION_OVER'
                      ? 'border-red-500/50 hover:border-red-500'
                      : subInfo.status === 'EXPIRING_SOON'
                        ? 'border-amber-500/50 hover:border-amber-400'
                        : 'border-white/10 hover:border-[#FFC515]/60'
                  }`}
                >
                  {/* Card Header */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={cust.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                          alt={cust.name}
                          className="w-13 h-13 rounded-sm object-cover border border-white/15 shrink-0 group-hover:border-[#FFC515] transition-colors"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-extrabold text-base text-white uppercase tracking-tight group-hover:text-[#FFC515] transition-colors font-display">
                              {cust.name}
                            </h3>
                          </div>
                          <span className="text-[11px] text-zinc-400 font-mono-num block">
                            {cust.email}
                          </span>
                          {cust.city && (
                            <span className="text-[10px] text-zinc-500 font-mono-num flex items-center gap-1 mt-0.5">
                              <MapPin size={10} /> {cust.city}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Automatic Subscription Status Badge */}
                      <span className={`px-2 py-1 text-[9px] font-black uppercase rounded-xs border shrink-0 flex items-center gap-1 ${
                        subInfo.status === 'SUBSCRIPTION_OVER'
                          ? 'bg-red-500/20 text-red-400 border-red-500/50'
                          : subInfo.status === 'EXPIRING_SOON'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                            : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      }`}>
                        {subInfo.status === 'SUBSCRIPTION_OVER' ? (
                          <AlertTriangle size={10} />
                        ) : subInfo.status === 'EXPIRING_SOON' ? (
                          <Clock size={10} />
                        ) : null}
                        <span>{subInfo.label}</span>
                      </span>
                    </div>

                    {/* Package & Category Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="px-2 py-0.5 bg-[#FFC515]/15 border border-[#FFC515]/40 text-[10px] font-extrabold text-[#FFC515] uppercase rounded-xs truncate max-w-[220px]" title={pkgName}>
                        {pkgName}
                      </span>
                      <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-300 uppercase rounded-xs">
                        {pkgCategory}
                      </span>
                    </div>

                    {/* Subscription Start & End Dates Strip */}
                    <div className="bg-[#14141c] p-2.5 rounded-xs border border-white/5 flex items-center justify-between text-[10px] font-mono-num">
                      <div>
                        <span className="text-zinc-500 uppercase block">Start Date</span>
                        <span className="text-white font-bold">{cust.startDate || cust.joinedDate || 'N/A'}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-zinc-500 uppercase block">Expiry Date</span>
                        <span className={`font-bold ${
                          subInfo.status === 'SUBSCRIPTION_OVER' ? 'text-red-400' :
                          subInfo.status === 'EXPIRING_SOON' ? 'text-amber-300' : 'text-emerald-400'
                        }`}>
                          {cust.endDate || 'N/A'}
                        </span>
                      </div>
                    </div>

                    {/* Weight Progress Bar */}
                    <div className="bg-[#14141c] p-3 rounded-xs border border-white/5 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono-num font-bold">
                        <span className="text-zinc-400">Start: <strong className="text-white">{startW} kg</strong></span>
                        <span className="text-[#FFC515]">Now: <strong className="text-[#FFC515]">{currW} kg</strong></span>
                        <span className="text-emerald-400">Goal: <strong className="text-emerald-400">{targetW} kg</strong></span>
                      </div>
                      <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden border border-white/10">
                        <div
                          className="h-full bg-gradient-to-r from-[#FFC515] to-emerald-400 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    {/* Diet & Exercise Assignment Pills */}
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono-num">
                      <div className="bg-[#14141c] p-2 rounded-xs border border-white/5">
                        <span className="text-zinc-500 uppercase block">Assigned Diet</span>
                        <span className="font-bold text-white mt-0.5 block truncate">
                          {cust.assignedDietPlan?.name || `${cust.dailyCalories || 2100} kcal Target`}
                        </span>
                      </div>
                      <div className="bg-[#14141c] p-2 rounded-xs border border-white/5">
                        <span className="text-zinc-500 uppercase block">Assigned Exercise</span>
                        <span className="font-bold text-white mt-0.5 block truncate">
                          {cust.assignedWorkoutPlan?.name || cust.workoutSplit || 'PPL 5-Day'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-mono-num">
                      <Flame size={12} className="text-amber-400" />
                      <span>₹{(cust.totalSpent || 0).toLocaleString('en-IN')}</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCustomerId(cust.id);
                      }}
                      className="px-3 py-1.5 bg-[#FFC515] group-hover:bg-[#e6b010] text-black font-extrabold uppercase text-[11px] rounded-xs flex items-center gap-1 transition-colors"
                    >
                      <span>CLIENT REPORT</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full p-12 text-center bg-[#0f0f14] border border-white/10 rounded-sm">
              <Users size={36} className="mx-auto text-zinc-600 mb-3" />
              <h3 className="text-base font-bold text-white uppercase font-display">No Client Profiles Found</h3>
              <p className="text-zinc-400 text-xs mt-1">Try adjusting your search query or package/subscription filter, or onboard a new client.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSubscriptionFilter('ALL');
                  setPackageFilter('ALL');
                  setGoalFilter('ALL');
                  setCoachFilter('ALL');
                }}
                className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white uppercase font-bold text-xs rounded-xs"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* TABLE VIEW ALTERNATIVE */}
      {viewMode === 'TABLE' && (
        <div className="bg-[#0f0f14] border border-white/10 rounded-sm overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono-num">
            <thead>
              <tr className="border-b border-white/10 bg-[#14141c] text-zinc-400 uppercase text-[10px] font-bold tracking-wider">
                <th className="p-3">Client</th>
                <th className="p-3">Package & Category</th>
                <th className="p-3">Subscription Dates</th>
                <th className="p-3">Subscription Status</th>
                <th className="p-3">Assigned Diet & Exercise</th>
                <th className="p-3">LTV (₹)</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCustomers.map((cust) => {
                const pkgName = cust.packageName || cust.programTier || PACKAGE_CATALOG[0].name;
                const pkgCat = cust.packageCategory || findPackageOption(pkgName)?.category || 'Official Coaching Plan';
                const subInfo = getSubscriptionStatusInfo(cust.startDate, cust.endDate);

                return (
                  <tr
                    key={cust.id}
                    onClick={() => setSelectedCustomerId(cust.id)}
                    className="hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={cust.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                          alt={cust.name}
                          className="w-9 h-9 rounded-sm object-cover border border-white/10"
                        />
                        <div>
                          <span className="font-extrabold text-white block uppercase">{cust.name}</span>
                          <span className="text-[11px] text-zinc-400">{cust.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-3">
                      <span className="text-[#FFC515] font-bold block">{pkgName}</span>
                      <span className="text-zinc-400 text-[10px] uppercase">{pkgCat}</span>
                    </td>

                    <td className="p-3">
                      <span className="text-white font-bold block">Start: {cust.startDate || cust.joinedDate || 'N/A'}</span>
                      <span className="text-zinc-400 text-[10px]">Ends: {cust.endDate || 'N/A'}</span>
                    </td>

                    <td className="p-3">
                      <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded-xs border ${
                        subInfo.status === 'SUBSCRIPTION_OVER'
                          ? 'bg-red-500/20 text-red-400 border-red-500/40'
                          : subInfo.status === 'EXPIRING_SOON'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      }`}>
                        {subInfo.badgeText}
                      </span>
                    </td>

                    <td className="p-3">
                      <span className="text-white font-bold block">
                        Diet: {cust.assignedDietPlan?.name || `${cust.dailyCalories || 2100} kcal`}
                      </span>
                      <span className="text-zinc-400 text-[10px]">
                        Workout: {cust.assignedWorkoutPlan?.name || cust.workoutSplit || 'PPL'}
                      </span>
                    </td>

                    <td className="p-3 font-bold text-emerald-400">
                      ₹{(cust.totalSpent || 0).toLocaleString('en-IN')}
                    </td>

                    <td className="p-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCustomerId(cust.id);
                        }}
                        className="px-3 py-1 bg-[#FFC515] text-black font-extrabold uppercase text-[10px] rounded-xs"
                      >
                        Full Report
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Direct Intake Modal */}
      {isIntakeModalOpen && (
        <ClientIntakeModal
          isOpen={isIntakeModalOpen}
          onClose={() => {
            setIsIntakeModalOpen(false);
            setLeadToConvert(null);
          }}
          leadToConvert={leadToConvert}
          onSuccess={(newCust) => {
            setSelectedCustomerId(newCust.id);
          }}
        />
      )}

      {/* Select Lead to Convert Modal */}
      {isSelectLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e0e14] border border-white/20 p-6 max-w-2xl w-full font-mono-num text-xs space-y-4 rounded-sm max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#FFC515]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  SELECT CRM LEAD TO CONVERT INTO ACTIVE CLIENT
                </h3>
              </div>
              <button onClick={() => setIsSelectLeadModalOpen(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>

            <p className="text-zinc-400 text-xs shrink-0">
              Choose an inquiry from your CRM pipeline. Their selected package, biometrics, and calorie targets will automatically carry forward into the client onboarding dossier.
            </p>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {convertibleLeads.length > 0 ? (
                convertibleLeads.map((lead) => {
                  const leadPkg = lead.packageName || lead.challengeInterest || PACKAGE_CATALOG[0].name;
                  return (
                    <div
                      key={lead.id}
                      onClick={() => {
                        setIsSelectLeadModalOpen(false);
                        setLeadToConvert(lead);
                        setIsIntakeModalOpen(true);
                      }}
                      className="bg-[#14141c] hover:bg-[#1a1a24] border border-white/10 hover:border-[#FFC515] p-3.5 rounded-xs cursor-pointer transition-all flex items-center justify-between gap-3 group"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-extrabold text-white text-sm group-hover:text-[#FFC515] transition-colors">{lead.name}</span>
                          <span className="px-2 py-0.5 bg-[#FFC515]/15 text-[#FFC515] border border-[#FFC515]/30 text-[9px] font-bold rounded-xs uppercase">
                            {leadPkg}
                          </span>
                          <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 text-[9px] font-bold rounded-xs">
                            {lead.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-zinc-400 text-[11px] mt-1">
                          <span>{lead.email}</span>
                          <span>•</span>
                          <span>{lead.phone}</span>
                          <span>•</span>
                          <span>Goal: <strong className="text-white">{lead.goal?.replace(/_/g, ' ')}</strong></span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="px-3 py-1.5 bg-[#FFC515] text-black font-extrabold uppercase text-[10px] rounded-xs group-hover:bg-[#e6b010] shrink-0 flex items-center gap-1"
                      >
                        <span>Convert Client</span>
                        <ChevronRight size={12} />
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-zinc-500 italic">
                  No active CRM leads available for conversion right now. All current leads are already converted or archived.
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => setIsSelectLeadModalOpen(false)}
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white uppercase font-bold rounded-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
