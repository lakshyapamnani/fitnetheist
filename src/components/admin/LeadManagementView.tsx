import React, { useState, useMemo } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Lead, LeadStatus, LeadSource, LeadTag } from '../../types/admin';
import { 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Flame, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  UserCheck, 
  CheckCircle2, 
  XCircle, 
  ChevronRight,
  Sparkles,
  ArrowUpDown,
  Tag as TagIcon
} from 'lucide-react';

export const LeadManagementView: React.FC = () => {
  const { 
    leads, 
    setSelectedLeadId, 
    setActiveSubtab, 
    updateLeadStatus,
    assignLead,
    captureLead
  } = useAdmin();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');
  const [selectedSourceFilter, setSelectedSourceFilter] = useState<string>('ALL');
  const [selectedGoalFilter, setSelectedGoalFilter] = useState<string>('ALL');
  const [selectedDietFilter, setSelectedDietFilter] = useState<string>('ALL');
  const [selectedScoreFilter, setSelectedScoreFilter] = useState<string>('ALL');
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);

  // New Lead Form State
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadSource, setNewLeadSource] = useState<LeadSource>('MANUAL_ENTRY');
  const [newLeadGoal, setNewLeadGoal] = useState<'BUILD_MUSCLE' | 'LOSE_WEIGHT' | 'STRENGTH'>('BUILD_MUSCLE');
  const [newLeadDiet, setNewLeadDiet] = useState<'VEGETARIAN' | 'NON-VEGETARIAN' | 'VEGAN'>('VEGETARIAN');
  const [newLeadChallenge, setNewLeadChallenge] = useState('21 Day Ignite');
  const [newLeadNote, setNewLeadNote] = useState('');

  // Statuses for tab filters
  const statusTabs = [
    { key: 'ALL', label: 'ALL LEADS', count: leads.length },
    { key: 'NEW', label: 'NEW', count: leads.filter(l => l.status === 'NEW').length },
    { key: 'QUALIFIED', label: 'QUALIFIED', count: leads.filter(l => l.status === 'QUALIFIED').length },
    { key: 'INTERESTED', label: 'INTERESTED', count: leads.filter(l => l.status === 'INTERESTED').length },
    { key: 'FOLLOW_UP', label: 'FOLLOW-UP', count: leads.filter(l => l.status === 'FOLLOW_UP').length },
    { key: 'CONVERTED', label: 'CONVERTED', count: leads.filter(l => l.status === 'CONVERTED').length },
    { key: 'LOST', label: 'LOST', count: leads.filter(l => l.status === 'LOST').length }
  ];

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      // Search matches name, phone, or email
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm);

      // Status filter
      const matchesStatus = selectedStatusFilter === 'ALL' || lead.status === selectedStatusFilter;

      // Source filter
      const matchesSource = selectedSourceFilter === 'ALL' || lead.source === selectedSourceFilter;

      // Goal filter
      const matchesGoal = selectedGoalFilter === 'ALL' || lead.goal === selectedGoalFilter;

      // Diet filter
      const matchesDiet = selectedDietFilter === 'ALL' || lead.dietType === selectedDietFilter;

      // Score filter
      const matchesScore = selectedScoreFilter === 'ALL' || lead.scoreClassification === selectedScoreFilter;

      return matchesSearch && matchesStatus && matchesSource && matchesGoal && matchesDiet && matchesScore;
    });
  }, [leads, searchTerm, selectedStatusFilter, selectedSourceFilter, selectedGoalFilter, selectedDietFilter, selectedScoreFilter]);

  const handleCreateManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadEmail.trim() || !newLeadName.trim()) return;

    captureLead({
      name: newLeadName,
      email: newLeadEmail,
      phone: newLeadPhone || '+91 99999 00000',
      source: newLeadSource,
      goal: newLeadGoal,
      dietType: newLeadDiet,
      challengeInterest: newLeadChallenge,
      customNote: newLeadNote || 'Manually entered into CRM by administrator.'
    });

    setIsAddLeadModalOpen(false);
    setNewLeadName('');
    setNewLeadEmail('');
    setNewLeadPhone('');
    setNewLeadNote('');
  };

  const handleExportCSV = () => {
    const headers = ['ID,Name,Phone,Email,Source,Goal,Diet,Status,AssignedTo,Score,Value,Created'];
    const rows = filteredLeads.map(l => 
      `"${l.id}","${l.name}","${l.phone}","${l.email}","${l.source}","${l.goal}","${l.dietType || ''}","${l.status}","${l.assignedTo}","${l.score}","${l.estimatedValue}","${l.createdAt}"`
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
    <div id="lead-management-crm-view" className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 bg-[#d8ff38]"></span>
            <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#d8ff38]">
              ATHLETE CRM & CONVERSION PIPELINE
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-display text-white">
            LEAD MANAGEMENT
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono-num mt-1">
            Every website calculator submission, diet plan export, and challenge click auto-populates here in real time.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 font-mono-num text-xs">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-zinc-300 hover:text-white uppercase font-bold flex items-center gap-1.5 transition-colors"
          >
            <Download size={14} />
            <span>EXPORT CSV</span>
          </button>

          <button
            onClick={() => setIsAddLeadModalOpen(true)}
            className="px-4 py-2.5 bg-[#d8ff38] hover:bg-[#cbf425] text-black font-bold uppercase flex items-center gap-2 transition-colors"
          >
            <Plus size={14} />
            <span>ADD MANUAL LEAD</span>
          </button>
        </div>
      </div>

      {/* Status Tabs Bar */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-white/10 font-mono-num text-xs">
        {statusTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setSelectedStatusFilter(tab.key)}
            className={`px-3 py-2 uppercase font-bold transition-all whitespace-nowrap flex items-center gap-2 border ${
              selectedStatusFilter === tab.key
                ? 'bg-zinc-800 text-[#d8ff38] border-[#d8ff38]'
                : 'bg-zinc-950 text-zinc-400 border-white/5 hover:border-white/20'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-none font-extrabold ${
              selectedStatusFilter === tab.key ? 'bg-[#d8ff38] text-black' : 'bg-zinc-900 text-zinc-500'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search & Multifilter Control Bar */}
      <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-3 font-mono-num text-xs">
        
        {/* Search Input */}
        <div className="sm:col-span-2 relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Name, Phone (+91...), or Email..."
            className="w-full bg-zinc-950 border border-white/10 pl-9 pr-4 py-2.5 text-white placeholder-zinc-500 text-xs focus:border-[#d8ff38] focus:outline-none"
          />
        </div>

        {/* Source Filter */}
        <div>
          <select
            value={selectedSourceFilter}
            onChange={(e) => setSelectedSourceFilter(e.target.value)}
            className="w-full bg-zinc-950 border border-white/10 px-3 py-2.5 text-zinc-300 text-xs focus:border-[#d8ff38] focus:outline-none"
          >
            <option value="ALL">ALL SOURCES</option>
            <option value="CALORIE_CALCULATOR">CALORIE CALCULATOR</option>
            <option value="DIET_GENERATOR">DIET GENERATOR</option>
            <option value="WORKOUT_PLANNER">WORKOUT PLANNER</option>
            <option value="CHALLENGE">CHALLENGES</option>
            <option value="CONTACT_FORM">CONTACT FORM</option>
            <option value="INSTAGRAM">INSTAGRAM</option>
            <option value="WHATSAPP">WHATSAPP</option>
          </select>
        </div>

        {/* Goal Filter */}
        <div>
          <select
            value={selectedGoalFilter}
            onChange={(e) => setSelectedGoalFilter(e.target.value)}
            className="w-full bg-zinc-950 border border-white/10 px-3 py-2.5 text-zinc-300 text-xs focus:border-[#d8ff38] focus:outline-none"
          >
            <option value="ALL">ALL GOALS</option>
            <option value="BUILD_MUSCLE">BUILD MUSCLE</option>
            <option value="LOSE_WEIGHT">LOSE WEIGHT</option>
            <option value="STRENGTH">STRENGTH</option>
            <option value="MAINTAIN">MAINTAIN</option>
          </select>
        </div>

        {/* Score Classification Filter */}
        <div>
          <select
            value={selectedScoreFilter}
            onChange={(e) => setSelectedScoreFilter(e.target.value)}
            className="w-full bg-zinc-950 border border-white/10 px-3 py-2.5 text-zinc-300 text-xs focus:border-[#d8ff38] focus:outline-none"
          >
            <option value="ALL">ALL SCORES</option>
            <option value="HOT">HOT LEADS (70-100)</option>
            <option value="WARM">WARM LEADS (35-69)</option>
            <option value="COLD">COLD LEADS (0-34)</option>
          </select>
        </div>

      </div>

      {/* Main Leads CRM Table */}
      <div className="bg-zinc-950 border border-white/10 overflow-hidden font-mono-num">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-900/80 border-b border-white/10 text-[10px] text-zinc-400 uppercase tracking-wider font-bold">
                <th className="p-3.5">ATHLETE NAME</th>
                <th className="p-3.5">CONTACT INFO</th>
                <th className="p-3.5">SOURCE & GOAL</th>
                <th className="p-3.5">SCORE</th>
                <th className="p-3.5">STATUS</th>
                <th className="p-3.5">ASSIGNED TO</th>
                <th className="p-3.5">NEXT FOLLOW-UP</th>
                <th className="p-3.5 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-zinc-500">
                    No leads matching current search & filter criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map(lead => {
                  const isHot = lead.scoreClassification === 'HOT';
                  const isWarm = lead.scoreClassification === 'WARM';

                  return (
                    <tr 
                      key={lead.id}
                      className="hover:bg-zinc-900/50 transition-colors group cursor-pointer"
                      onClick={() => {
                        setSelectedLeadId(lead.id);
                        setActiveSubtab('leads-detail');
                      }}
                    >
                      {/* Name & Tags */}
                      <td className="p-3.5 font-bold text-white">
                        <div className="flex items-center gap-2">
                          <span className="group-hover:text-[#d8ff38] transition-colors">{lead.name}</span>
                          {isHot && (
                            <span title="Hot Lead" className="text-[#d8ff38]">
                              <Flame size={13} />
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {lead.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[9px] px-1 py-0.2 bg-zinc-900 border border-white/10 text-zinc-400">
                              {tag.replace(/_/g, ' ')}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="p-3.5 text-zinc-300">
                        <div className="flex items-center gap-1.5 text-zinc-300">
                          <Phone size={11} className="text-zinc-500" />
                          <span>{lead.phone}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-zinc-500 text-[11px] mt-0.5">
                          <Mail size={11} />
                          <span className="truncate max-w-[150px]">{lead.email}</span>
                        </div>
                      </td>

                      {/* Source & Goal */}
                      <td className="p-3.5">
                        <span className="text-white font-bold block">{lead.goal.replace(/_/g, ' ')}</span>
                        <span className="text-[10px] text-zinc-500 uppercase">
                          via {lead.source.replace(/_/g, ' ')}
                        </span>
                      </td>

                      {/* Score Badge */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5">
                          <span className={`px-2 py-0.5 text-[10px] font-extrabold border ${
                            isHot 
                              ? 'bg-[#d8ff38]/20 text-[#d8ff38] border-[#d8ff38]/50' 
                              : isWarm 
                                ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40' 
                                : 'bg-zinc-800 text-zinc-400 border-white/10'
                          }`}>
                            {lead.score} / 100
                          </span>
                        </div>
                      </td>

                      {/* Status Selector dropdown inline */}
                      <td className="p-3.5" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                          className={`text-[10px] font-bold px-2 py-1 uppercase bg-zinc-900 border focus:outline-none ${
                            lead.status === 'CONVERTED' 
                              ? 'text-[#d8ff38] border-[#d8ff38]' 
                              : lead.status === 'QUALIFIED' 
                                ? 'text-yellow-300 border-yellow-500' 
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
                          <option value="CONVERTED">CONVERTED</option>
                          <option value="LOST">LOST</option>
                        </select>
                      </td>

                      {/* Assigned Staff */}
                      <td className="p-3.5 text-zinc-400 text-[11px]">
                        <span className="truncate max-w-[130px] block">{lead.assignedTo}</span>
                      </td>

                      {/* Next Follow-Up */}
                      <td className="p-3.5 text-zinc-400 text-[11px]">
                        {lead.nextFollowUpDate ? (
                          <span className="text-[#d8ff38] font-bold">{lead.nextFollowUpDate}</span>
                        ) : (
                          <span className="text-zinc-600">None set</span>
                        )}
                      </td>

                      {/* Action Button */}
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => {
                            setSelectedLeadId(lead.id);
                            setActiveSubtab('leads-detail');
                          }}
                          className="px-2.5 py-1 bg-zinc-900 hover:bg-[#d8ff38] hover:text-black text-white text-[10px] uppercase font-bold border border-white/10 transition-colors inline-flex items-center gap-1"
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

      {/* Manual Add Lead Modal */}
      {isAddLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e0e12] border border-white/20 p-6 sm:p-8 max-w-lg w-full font-mono-num text-xs space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Plus size={16} className="text-[#d8ff38]" />
                CREATE MANUAL CRM LEAD
              </h3>
              <button 
                onClick={() => setIsAddLeadModalOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="space-y-4">
              <div>
                <label className="block text-zinc-400 uppercase mb-1">ATHLETE FULL NAME *</label>
                <input
                  type="text"
                  required
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="e.g. Rahul Sen"
                  className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white"
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
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">PHONE NUMBER</label>
                  <input
                    type="text"
                    value={newLeadPhone}
                    onChange={(e) => setNewLeadPhone(e.target.value)}
                    placeholder="e.g. +91 98200 11223"
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">SOURCE</label>
                  <select
                    value={newLeadSource}
                    onChange={(e) => setNewLeadSource(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white"
                  >
                    <option value="MANUAL_ENTRY">MANUAL ENTRY</option>
                    <option value="WHATSAPP">WHATSAPP DESK</option>
                    <option value="INSTAGRAM">INSTAGRAM DM</option>
                    <option value="REFERRAL">ATHLETE REFERRAL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">CHALLENGE INTEREST</label>
                  <select
                    value={newLeadChallenge}
                    onChange={(e) => setNewLeadChallenge(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white"
                  >
                    <option value="7 Day Reset">7 DAY RESET</option>
                    <option value="21 Day Ignite">21 DAY IGNITE</option>
                    <option value="60 Day Transform">60 DAY TRANSFORM</option>
                    <option value="90 Day Beast Mode">90 DAY BEAST MODE</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">INITIAL DISCOVERY NOTE</label>
                <textarea
                  rows={3}
                  value={newLeadNote}
                  onChange={(e) => setNewLeadNote(e.target.value)}
                  placeholder="Notes from initial phone call or WhatsApp inquiry..."
                  className="w-full bg-zinc-900 border border-zinc-800 p-3 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddLeadModalOpen(false)}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 uppercase font-bold"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#d8ff38] hover:bg-[#cbf425] text-black font-bold uppercase"
                >
                  SAVE & SCORE LEAD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
