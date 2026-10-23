import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Lead, LeadStatus, LeadSource, PACKAGE_CATALOG, findPackageOption } from '../../types/admin';
import { ClientIntakeModal } from './ClientIntakeModal';
import { 
  Users, 
  Search, 
  Download, 
  Plus, 
  Flame, 
  Phone, 
  Mail, 
  ChevronRight, 
  CheckCircle2,
  Zap,
  MessageSquare,
  Database,
  Edit3,
  Package,
  X
} from 'lucide-react';

export const LeadManagementView: React.FC = () => {
  const { 
    leads, 
    updateLead,
    updateLeadStatus, 
    setSelectedLeadId, 
    setSelectedCustomerId,
    setActiveSubtab, 
    captureLead
  } = useAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');
  const [selectedSourceFilter, setSelectedSourceFilter] = useState<string>('ALL');
  const [selectedScoreFilter, setSelectedScoreFilter] = useState<string>('ALL');
  const [selectedPackageFilter, setSelectedPackageFilter] = useState<string>('ALL');
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [leadToConvertModal, setLeadToConvertModal] = useState<Lead | null>(null);
  const [justConvertedLeadId, setJustConvertedLeadId] = useState<string | null>(null);

  // Form state for creating a new manual lead
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadSource, setNewLeadSource] = useState<LeadSource>('MANUAL_ENTRY');
  const [newLeadPackage, setNewLeadPackage] = useState<string>(PACKAGE_CATALOG[0].name);
  const [newLeadGoal, setNewLeadGoal] = useState<'LOSE_WEIGHT' | 'BUILD_MUSCLE' | 'STRENGTH' | 'EVERYDAY_HEALTH'>('LOSE_WEIGHT');
  const [newLeadNote, setNewLeadNote] = useState('');

  // Form state for editing an existing lead
  const [editLeadName, setEditLeadName] = useState('');
  const [editLeadEmail, setEditLeadEmail] = useState('');
  const [editLeadPhone, setEditLeadPhone] = useState('');
  const [editLeadSource, setEditLeadSource] = useState<LeadSource>('MANUAL_ENTRY');
  const [editLeadPackage, setEditLeadPackage] = useState<string>(PACKAGE_CATALOG[0].name);
  const [editLeadGoal, setEditLeadGoal] = useState<string>('LOSE_WEIGHT');
  const [editLeadEstimatedValue, setEditLeadEstimatedValue] = useState<number>(8500);

  const safeLeads = Array.isArray(leads) ? leads : [];

  const filteredLeads = safeLeads.filter(lead => {
    if (!lead) return false;
    const term = (searchTerm || '').toLowerCase();
    const leadPkg = lead.packageName || lead.challengeInterest || '';
    const nameMatch = (lead.name || '').toLowerCase().includes(term);
    const emailMatch = (lead.email || '').toLowerCase().includes(term);
    const phoneMatch = (lead.phone || '').includes(searchTerm);
    const pkgMatch = leadPkg.toLowerCase().includes(term);
    const notesMatch = Array.isArray(lead.notes) && lead.notes.some(n => 
      ((n.content || (n as any).text || '')).toLowerCase().includes(term)
    );

    const matchesSearch = !term || nameMatch || emailMatch || phoneMatch || pkgMatch || notesMatch;
    const matchesStatus = selectedStatusFilter === 'ALL' || lead.status === selectedStatusFilter;
    const matchesSource = selectedSourceFilter === 'ALL' || lead.source === selectedSourceFilter;
    const matchesScore = selectedScoreFilter === 'ALL' || lead.scoreClassification === selectedScoreFilter;
    const matchesPackage = selectedPackageFilter === 'ALL' || leadPkg === selectedPackageFilter;

    return matchesSearch && matchesStatus && matchesSource && matchesScore && matchesPackage;
  });

  const handleCreateManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim() || !newLeadEmail.trim()) return;

    captureLead({
      name: newLeadName.trim(),
      email: newLeadEmail.trim(),
      phone: newLeadPhone.trim() || '+91 99999 99999',
      source: newLeadSource,
      goal: newLeadGoal,
      packageName: newLeadPackage,
      challengeInterest: newLeadPackage,
      dietType: 'Non-Vegetarian',
      preferredCuisine: 'North Indian',
      customNote: newLeadNote.trim() || undefined
    });

    setIsAddLeadModalOpen(false);
    setNewLeadName('');
    setNewLeadEmail('');
    setNewLeadPhone('');
    setNewLeadPackage(PACKAGE_CATALOG[0].name);
    setNewLeadNote('');
  };

  const openEditLeadModal = (e: React.MouseEvent, lead: Lead) => {
    e.stopPropagation();
    const pkg = lead.packageName || lead.challengeInterest || PACKAGE_CATALOG[0].name;
    const matchedOpt = findPackageOption(pkg);
    setEditingLead(lead);
    setEditLeadName(lead.name || '');
    setEditLeadEmail(lead.email || '');
    setEditLeadPhone(lead.phone || '');
    setEditLeadSource(lead.source || 'MANUAL_ENTRY');
    setEditLeadPackage(matchedOpt ? matchedOpt.name : pkg);
    setEditLeadGoal(lead.goal || 'LOSE_WEIGHT');
    setEditLeadEstimatedValue(lead.estimatedValue || matchedOpt?.priceINR || 8500);
  };

  const handleSaveEditedLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLead) return;
    const matchedOpt = findPackageOption(editLeadPackage);
    updateLead(editingLead.id, {
      name: editLeadName.trim(),
      email: editLeadEmail.trim(),
      phone: editLeadPhone.trim(),
      source: editLeadSource,
      goal: editLeadGoal as any,
      packageName: editLeadPackage,
      packageCategory: matchedOpt?.category || 'Official Coaching Plan',
      challengeInterest: editLeadPackage,
      estimatedValue: Number(editLeadEstimatedValue) || matchedOpt?.priceINR || 8500
    });
    setEditingLead(null);
  };

  const handleConvertLeadClick = (e: React.MouseEvent, lead: Lead) => {
    e.stopPropagation();
    setLeadToConvertModal(lead);
  };

  const statusTabs = [
    { key: 'ALL', label: 'All Inquiries', count: safeLeads.length },
    { key: 'NEW', label: 'New', count: safeLeads.filter(l => l?.status === 'NEW').length },
    { key: 'CONTACTED', label: 'Contacted', count: safeLeads.filter(l => l?.status === 'CONTACTED').length },
    { key: 'QUALIFIED', label: 'Qualified', count: safeLeads.filter(l => l?.status === 'QUALIFIED').length },
    { key: 'FOLLOW_UP', label: 'Follow-Up', count: safeLeads.filter(l => l?.status === 'FOLLOW_UP').length },
    { key: 'CONVERTED', label: 'Converted', count: safeLeads.filter(l => l?.status === 'CONVERTED').length },
    { key: 'LOST', label: 'Lost', count: safeLeads.filter(l => l?.status === 'LOST').length },
  ];

  const handleExportCSV = () => {
    const headers = ['ID,Name,Email,Phone,Package,Category,Source,Goal,Score,Classification,Status,AssignedTo,EstimatedValue(INR),CreatedAt'];
    const rows = safeLeads.map(l => 
      `"${l.id}","${l.name}","${l.email}","${l.phone}","${l.packageName || l.challengeInterest || ''}","${l.packageCategory || ''}","${l.source}","${l.goal}",${l.score},"${l.scoreClassification}","${l.status}","${l.assignedTo}",${l.estimatedValue},"${l.createdAt}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `fitnetheist_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="lead-management-crm-view" className="space-y-6 max-w-7xl mx-auto font-mono-num text-xs">
      
      {/* Firebase Realtime Sync Status Banner */}
      <div className="bg-[#14141c] border border-emerald-500/30 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 rounded-sm">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <div className="flex items-center gap-2">
            <Database size={13} className="text-emerald-400" />
            <span className="text-[11px] font-extrabold text-white uppercase tracking-wider">
              FIREBASE REALTIME DB LIVE SYNC: ACTIVE
            </span>
            <span className="text-[10px] text-zinc-400 font-mono hidden md:inline">
              (fitnetheist-b553b-default-rtdb.firebaseio.com)
            </span>
          </div>
        </div>

        <span className="text-[10px] text-zinc-400 font-mono-num">
          ⚡ All user logins, package selections & mobile numbers feed into this pipeline immediately in real-time.
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-2 w-2 rounded-full bg-[#FFC515]"></span>
            <span className="text-xs font-mono-num font-bold uppercase tracking-widest text-[#FFC515]">
              CLIENT PIPELINE & PACKAGE ASSIGNMENT
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight font-display text-white">
            LEAD MANAGEMENT
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono-num mt-1">
            Assign coaching packages to leads, edit lead records, and convert leads into active clients with automatic package carry-forward.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 font-mono-num text-xs">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2.5 bg-zinc-950 hover:bg-zinc-900 border border-white/15 text-zinc-300 hover:text-white uppercase font-bold flex items-center gap-1.5 transition-colors rounded-sm"
          >
            <Download size={14} />
            <span>EXPORT CSV</span>
          </button>

          <button
            onClick={() => setIsAddLeadModalOpen(true)}
            className="px-4 py-2.5 bg-[#FFC515] hover:bg-[#e6b010] text-black font-bold uppercase flex items-center gap-2 transition-colors rounded-sm"
          >
            <Plus size={14} />
            <span>ADD INQUIRY</span>
          </button>
        </div>
      </div>

      {/* Status Tabs Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono-num text-xs">
        {statusTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setSelectedStatusFilter(tab.key)}
            className={`px-3 py-2 uppercase font-bold transition-all whitespace-nowrap flex items-center gap-2 rounded-sm border ${
              selectedStatusFilter === tab.key
                ? 'bg-zinc-900 text-[#FFC515] border-[#FFC515]'
                : 'bg-zinc-950 text-zinc-400 border-white/5 hover:border-white/20'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`text-[10px] px-1.5 py-0.2 font-extrabold rounded-xs ${
              selectedStatusFilter === tab.key ? 'bg-[#FFC515] text-black' : 'bg-zinc-900 text-zinc-500'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search & Multifilter Control Bar */}
      <div className="grid sm:grid-cols-2 md:grid-cols-6 gap-3 font-mono-num text-xs">
        
        {/* Search Input */}
        <div className="sm:col-span-2 relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Name, Mobile, Email, or Package..."
            className="w-full bg-zinc-950 border border-white/10 pl-10 pr-4 py-2.5 text-white placeholder-zinc-500 text-xs focus:border-[#FFC515] focus:outline-none rounded-sm"
          />
        </div>

        {/* Package Filter */}
        <div>
          <select
            value={selectedPackageFilter}
            onChange={(e) => setSelectedPackageFilter(e.target.value)}
            className="w-full bg-zinc-950 border border-white/10 px-3 py-2.5 text-zinc-300 text-xs focus:border-[#FFC515] focus:outline-none rounded-sm"
          >
            <option value="ALL">ALL PACKAGES</option>
            {PACKAGE_CATALOG.map(pkg => (
              <option key={pkg.id} value={pkg.name}>
                {pkg.name}
              </option>
            ))}
          </select>
        </div>

        {/* Source Filter */}
        <div>
          <select
            value={selectedSourceFilter}
            onChange={(e) => setSelectedSourceFilter(e.target.value)}
            className="w-full bg-zinc-950 border border-white/10 px-3 py-2.5 text-zinc-300 text-xs focus:border-[#FFC515] focus:outline-none rounded-sm"
          >
            <option value="ALL">ALL SOURCES</option>
            <option value="LOGIN_PORTAL">USER LOGIN PORTAL</option>
            <option value="SIGNUP">SIGNUP REGISTRATION</option>
            <option value="CALORIE_CALCULATOR">CALORIE CALCULATOR</option>
            <option value="DIET_GENERATOR">DIET GENERATOR</option>
            <option value="WORKOUT_PLANNER">WORKOUT PLANNER</option>
            <option value="CHALLENGE">CHALLENGES</option>
            <option value="CONTACT_FORM">CONTACT FORM</option>
            <option value="WHATSAPP">WHATSAPP</option>
          </select>
        </div>

        {/* Score Classification Filter */}
        <div>
          <select
            value={selectedScoreFilter}
            onChange={(e) => setSelectedScoreFilter(e.target.value)}
            className="w-full bg-zinc-950 border border-white/10 px-3 py-2.5 text-zinc-300 text-xs focus:border-[#FFC515] focus:outline-none rounded-sm"
          >
            <option value="ALL">ALL INTENT SCORES</option>
            <option value="HOT">HOT (HIGH INTENT)</option>
            <option value="WARM">WARM (MODERATE)</option>
            <option value="COLD">COLD (DISCOVERY)</option>
          </select>
        </div>

        <div className="flex items-center justify-end text-zinc-400 text-[11px] pr-2">
          <span>Displaying <strong>{filteredLeads.length}</strong> inquiries</span>
        </div>
      </div>

      {/* Main Leads CRM Table */}
      <div className="bg-zinc-950 border border-white/10 overflow-hidden font-mono-num rounded-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-900/80 border-b border-white/10 text-[10px] text-zinc-400 uppercase tracking-wider font-bold">
                <th className="p-3.5">CLIENT NAME</th>
                <th className="p-3.5">MOBILE & CONTACT</th>
                <th className="p-3.5">SELECTED PACKAGE</th>
                <th className="p-3.5">SOURCE & SCORE</th>
                <th className="p-3.5">STAGE STATUS</th>
                <th className="p-3.5 text-center">CONVERT TO CLIENT</th>
                <th className="p-3.5 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-zinc-500">
                    No leads matching current search & filter criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map(lead => {
                  const isHot = lead.scoreClassification === 'HOT';
                  const isWarm = lead.scoreClassification === 'WARM';
                  const isConverted = lead.status === 'CONVERTED';
                  const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
                  const selectedPkgName = lead.packageName || lead.challengeInterest || PACKAGE_CATALOG[0].name;
                  const matchedPkg = findPackageOption(selectedPkgName);

                  return (
                    <tr 
                      key={lead.id}
                      className="hover:bg-zinc-900/50 transition-colors group cursor-pointer"
                      onClick={() => {
                        setSelectedLeadId(lead.id);
                        setActiveSubtab('leads-detail');
                      }}
                    >
                      {/* Name & Goal */}
                      <td className="p-3.5 font-bold text-white">
                        <div className="flex items-center gap-2">
                          <span className="group-hover:text-[#FFC515] transition-colors font-bold text-sm">{lead.name}</span>
                          {isHot && (
                            <span title="Hot Lead" className="text-[#FFC515]">
                              <Flame size={14} />
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-zinc-400 block mt-0.5 font-normal">
                          Goal: <strong className="text-zinc-300">{lead.goal?.replace(/_/g, ' ') || 'Fat Loss / Muscle'}</strong>
                        </span>
                      </td>

                      {/* Contact Info */}
                      <td className="p-3.5 text-zinc-300" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5 text-[#FFC515] font-bold">
                            <Phone size={12} className="text-[#FFC515]" />
                            <span>{lead.phone || 'No phone captured'}</span>
                          </div>
                          {cleanPhone && (
                            <a
                              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi ${lead.name}, this is the Fitnetheist coaching desk regarding your ${selectedPkgName} fitness plan.`)}`}
                              target="_blank"
                              rel="noreferrer"
                              title="Direct WhatsApp"
                              className="p-1 bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-400 rounded-xs transition-colors"
                            >
                              <MessageSquare size={11} />
                            </a>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] mt-1">
                          <Mail size={11} />
                          <span className="truncate max-w-[170px]">{lead.email}</span>
                        </div>
                      </td>

                      {/* Package Selector Dropdown */}
                      <td className="p-3.5" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={matchedPkg ? matchedPkg.name : selectedPkgName}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateLead(lead.id, { packageName: val });
                          }}
                          className="w-full max-w-[220px] bg-zinc-900 border border-[#FFC515]/30 hover:border-[#FFC515] text-white font-bold text-[10px] px-2 py-1.5 rounded-xs focus:outline-none focus:border-[#FFC515]"
                        >
                          {!matchedPkg && selectedPkgName && (
                            <option value={selectedPkgName}>{selectedPkgName}</option>
                          )}
                          {PACKAGE_CATALOG.map(pkg => (
                            <option key={pkg.id} value={pkg.name}>
                              {pkg.name} (₹{pkg.priceINR.toLocaleString('en-IN')})
                            </option>
                          ))}
                        </select>
                        <div className="flex items-center gap-2 mt-1 text-[10px]">
                          <span className="text-zinc-400">
                            {lead.packageCategory || matchedPkg?.category || 'Coaching Plan'}
                          </span>
                          <span className="text-[#FFC515] font-bold">
                            ₹{(lead.estimatedValue || matchedPkg?.priceINR || 8500).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </td>

                      {/* Source & Score */}
                      <td className="p-3.5 text-zinc-300">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 bg-zinc-900 border border-white/10 text-zinc-300 text-[10px] font-bold rounded-xs uppercase">
                            {lead.source.replace(/_/g, ' ')}
                          </span>
                          <span className={`px-1.5 py-0.5 text-[10px] font-extrabold border rounded-xs ${
                            isHot 
                              ? 'bg-[#FFC515]/20 text-[#FFC515] border-[#FFC515]/50' 
                              : isWarm 
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                                : 'bg-zinc-800 text-zinc-400 border-white/10'
                          }`}>
                            {lead.score}/100
                          </span>
                        </div>
                        <span className="text-[10px] text-zinc-500 block mt-1">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </span>
                      </td>

                      {/* Status Selector dropdown inline */}
                      <td className="p-3.5" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                          className={`text-[10px] font-bold px-2 py-1 uppercase bg-zinc-900 border rounded-xs focus:outline-none ${
                            lead.status === 'CONVERTED' 
                              ? 'text-emerald-400 border-emerald-500 bg-emerald-950/30' 
                              : lead.status === 'QUALIFIED' 
                                ? 'text-amber-300 border-amber-500' 
                                : lead.status === 'NEW' 
                                  ? 'text-white border-white/30' 
                                  : 'text-zinc-400 border-zinc-800'
                          }`}
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="QUALIFIED">QUALIFIED</option>
                          <option value="INTERESTED">INTERESTED</option>
                          <option value="FOLLOW_UP">FOLLOW-UP</option>
                          <option value="CONVERTED">CONVERTED (CLIENT)</option>
                          <option value="LOST">LOST</option>
                        </select>
                      </td>

                      {/* Convert into Client Button */}
                      <td className="p-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                        {isConverted || justConvertedLeadId === lead.id ? (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/60 border border-emerald-500/60 text-emerald-300 font-bold text-[10px] uppercase rounded-xs">
                            <CheckCircle2 size={12} className="text-emerald-400" />
                            <span>CLIENT CREATED</span>
                            <button
                              onClick={() => {
                                setSelectedCustomerId(null);
                                setActiveSubtab('clients');
                              }}
                              className="ml-1 underline hover:text-white cursor-pointer"
                              title="View in Roster"
                            >
                              ROSTER →
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => handleConvertLeadClick(e, lead)}
                            className="px-3 py-1.5 bg-[#FFC515] hover:bg-[#e6b010] text-black font-extrabold uppercase text-[10px] tracking-wider inline-flex items-center gap-1.5 transition-transform active:scale-95 shadow-sm rounded-xs"
                            title="Convert this lead into an active coaching client with package & subscription dates"
                          >
                            <Zap size={11} className="fill-black" />
                            <span>CONVERT INTO CLIENT</span>
                          </button>
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td className="p-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={(e) => openEditLeadModal(e, lead)}
                            className="p-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-[#FFC515] border border-white/10 rounded-xs transition-colors"
                            title="Edit Lead & Package"
                          >
                            <Edit3 size={12} />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedLeadId(lead.id);
                              setActiveSubtab('leads-detail');
                            }}
                            className="px-2.5 py-1 bg-zinc-900 hover:bg-[#FFC515] hover:text-black text-white text-[10px] uppercase font-bold border border-white/10 transition-colors inline-flex items-center gap-1 rounded-xs"
                          >
                            <span>DOSSIER</span>
                            <ChevronRight size={12} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Add Lead Modal */}
      {isAddLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e0e12] border border-white/20 p-6 sm:p-8 max-w-lg w-full font-mono-num text-xs space-y-5 rounded-sm">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Plus size={16} className="text-[#FFC515]" />
                CREATE MANUAL CRM LEAD
              </h3>
              <button 
                onClick={() => setIsAddLeadModalOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="space-y-4">
              <div>
                <label className="block text-zinc-400 uppercase mb-1">CLIENT FULL NAME *</label>
                <input
                  type="text"
                  required
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="e.g. Rahul Sen"
                  className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white rounded-xs focus:border-[#FFC515] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    value={newLeadEmail}
                    onChange={(e) => setNewLeadEmail(e.target.value)}
                    placeholder="e.g. rahul@example.com"
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white rounded-xs focus:border-[#FFC515] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">MOBILE NUMBER *</label>
                  <input
                    type="text"
                    required
                    value={newLeadPhone}
                    onChange={(e) => setNewLeadPhone(e.target.value)}
                    placeholder="e.g. +91 98200 11223"
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white rounded-xs focus:border-[#FFC515] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#FFC515] font-bold uppercase mb-1 flex items-center gap-1.5">
                  <Package size={13} /> PACKAGE SELECTED *
                </label>
                <select
                  value={newLeadPackage}
                  onChange={(e) => setNewLeadPackage(e.target.value)}
                  className="w-full bg-zinc-900 border border-[#FFC515]/40 px-3 py-2 text-white font-bold rounded-xs focus:border-[#FFC515] focus:outline-none"
                >
                  {PACKAGE_CATALOG.map(pkg => (
                    <option key={pkg.id} value={pkg.name}>
                      {pkg.name} — ₹{pkg.priceINR.toLocaleString('en-IN')} ({pkg.durationDays} Days)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">SOURCE</label>
                  <select
                    value={newLeadSource}
                    onChange={(e) => setNewLeadSource(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white rounded-xs"
                  >
                    <option value="MANUAL_ENTRY">MANUAL ENTRY</option>
                    <option value="LOGIN_PORTAL">LOGIN PORTAL</option>
                    <option value="WHATSAPP">WHATSAPP DESK</option>
                    <option value="INSTAGRAM">INSTAGRAM DM</option>
                    <option value="REFERRAL">CLIENT REFERRAL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">PRIMARY GOAL</label>
                  <select
                    value={newLeadGoal}
                    onChange={(e) => setNewLeadGoal(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white rounded-xs"
                  >
                    <option value="LOSE_WEIGHT">FAT LOSS</option>
                    <option value="BUILD_MUSCLE">MUSCLE GAIN</option>
                    <option value="STRENGTH">STRENGTH</option>
                    <option value="EVERYDAY_HEALTH">POSTPARTUM / RECOMP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">INTAKE NOTES / REMARKS</label>
                <textarea
                  rows={3}
                  value={newLeadNote}
                  onChange={(e) => setNewLeadNote(e.target.value)}
                  placeholder="Goals, food preferences, current workout split, target timeline..."
                  className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white rounded-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddLeadModalOpen(false)}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 uppercase font-bold rounded-xs"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FFC515] hover:bg-[#e6b010] text-black font-bold uppercase rounded-xs"
                >
                  SAVE LEAD TO REALTIME DB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Existing Lead Modal (Retains Selected Package) */}
      {editingLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e0e12] border border-white/20 p-6 sm:p-8 max-w-lg w-full font-mono-num text-xs space-y-5 rounded-sm">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Edit3 size={16} className="text-[#FFC515]" />
                EDIT LEAD & PACKAGE: {editingLead.name}
              </h3>
              <button 
                onClick={() => setEditingLead(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveEditedLead} className="space-y-4">
              <div>
                <label className="block text-zinc-400 uppercase mb-1">CLIENT FULL NAME *</label>
                <input
                  type="text"
                  required
                  value={editLeadName}
                  onChange={(e) => setEditLeadName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white rounded-xs focus:border-[#FFC515] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    value={editLeadEmail}
                    onChange={(e) => setEditLeadEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white rounded-xs focus:border-[#FFC515] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">MOBILE NUMBER *</label>
                  <input
                    type="text"
                    required
                    value={editLeadPhone}
                    onChange={(e) => setEditLeadPhone(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white rounded-xs focus:border-[#FFC515] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#FFC515] font-bold uppercase mb-1 flex items-center gap-1.5">
                  <Package size={13} /> ASSIGNED PACKAGE *
                </label>
                <select
                  value={editLeadPackage}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEditLeadPackage(val);
                    const pkg = findPackageOption(val);
                    if (pkg) {
                      setEditLeadEstimatedValue(pkg.priceINR);
                    }
                  }}
                  className="w-full bg-zinc-900 border border-[#FFC515]/40 px-3 py-2 text-white font-bold rounded-xs focus:border-[#FFC515] focus:outline-none"
                >
                  {PACKAGE_CATALOG.map(pkg => (
                    <option key={pkg.id} value={pkg.name}>
                      {pkg.name} — ₹{pkg.priceINR.toLocaleString('en-IN')} ({pkg.durationDays} Days)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">SOURCE</label>
                  <select
                    value={editLeadSource}
                    onChange={(e) => setEditLeadSource(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white rounded-xs"
                  >
                    <option value="MANUAL_ENTRY">MANUAL ENTRY</option>
                    <option value="LOGIN_PORTAL">LOGIN PORTAL</option>
                    <option value="SIGNUP">SIGNUP</option>
                    <option value="WHATSAPP">WHATSAPP</option>
                    <option value="CALORIE_CALCULATOR">CALCULATOR</option>
                    <option value="DIET_GENERATOR">DIET GENERATOR</option>
                    <option value="WORKOUT_PLANNER">WORKOUT PLANNER</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">PRIMARY GOAL</label>
                  <select
                    value={editLeadGoal}
                    onChange={(e) => setEditLeadGoal(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white rounded-xs"
                  >
                    <option value="LOSE_WEIGHT">FAT LOSS</option>
                    <option value="BUILD_MUSCLE">MUSCLE GAIN</option>
                    <option value="STRENGTH">STRENGTH</option>
                    <option value="EVERYDAY_HEALTH">POSTPARTUM / HEALTH</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">PACKAGE VALUE (₹)</label>
                  <input
                    type="number"
                    value={editLeadEstimatedValue}
                    onChange={(e) => setEditLeadEstimatedValue(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-[#FFC515] font-bold rounded-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingLead(null)}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 uppercase font-bold rounded-xs"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FFC515] hover:bg-[#e6b010] text-black font-bold uppercase rounded-xs"
                >
                  UPDATE LEAD & PACKAGE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Convert Lead to Client Intake Modal (Carries Forward Selected Package & Captures Subscription Dates) */}
      {leadToConvertModal && (
        <ClientIntakeModal
          isOpen={Boolean(leadToConvertModal)}
          onClose={() => setLeadToConvertModal(null)}
          leadToConvert={leadToConvertModal}
          onSuccess={(newCustomer) => {
            setJustConvertedLeadId(leadToConvertModal.id);
            setLeadToConvertModal(null);
            setSelectedCustomerId(newCustomer.id);
            setActiveSubtab('clients');
          }}
        />
      )}

    </div>
  );
};
