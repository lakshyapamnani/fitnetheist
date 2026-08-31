import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Trophy, 
  UserCheck, 
  ArrowUpRight, 
  ArrowRight, 
  PhoneCall, 
  Calendar, 
  Flame, 
  ShoppingBag,
  Sparkles,
  Utensils,
  Dumbbell
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const { 
    leads, 
    customers, 
    orders, 
    subscriptions, 
    auditLogs, 
    setActiveSubtab, 
    setSelectedLeadId 
  } = useAdmin();
  
  const { challenges, foodDatabase } = useApp();

  // Metrics Calculations
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'NEW').length;
  const contactedLeads = leads.filter(l => l.status === 'CONTACTED' || l.status === 'FOLLOW_UP').length;
  const qualifiedLeads = leads.filter(l => l.status === 'QUALIFIED' || l.status === 'INTERESTED').length;
  const convertedLeads = leads.filter(l => l.status === 'CONVERTED').length;
  const lostLeads = leads.filter(l => l.status === 'LOST' || l.status === 'NOT_INTERESTED').length;

  const totalCustomers = customers.length;
  const activeSubscriptions = subscriptions.filter(s => s.status === 'ACTIVE').length;
  const totalRevenue = orders.filter(o => o.paymentStatus === 'PAID').reduce((sum, o) => sum + o.amount, 0);
  const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : '0.0';

  // Lead Sources Breakdown
  const sourceCounts: Record<string, number> = {};
  leads.forEach(l => {
    const key = l.source;
    sourceCounts[key] = (sourceCounts[key] || 0) + 1;
  });

  const sourceList = Object.entries(sourceCounts).map(([src, count]) => ({
    source: src.replace(/_/g, ' '),
    count,
    percentage: totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0
  })).sort((a, b) => b.count - a.count);

  const hotLeads = leads.filter(l => l.scoreClassification === 'HOT' && l.status !== 'CONVERTED');

  return (
    <div id="admin-dashboard-view" className="space-y-8">
      
      {/* Top Banner / Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 bg-[#d8ff38]"></span>
            <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#d8ff38]">
              BUSINESS INTELLIGENCE & TELEMETRY
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-display text-white">
            OPERATIONAL COCKPIT
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono-num mt-1">
            Real-time attribution, lead conversion pipeline, active challenge enrollments, and financial telemetry.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 font-mono-num text-xs">
          <button
            onClick={() => setActiveSubtab('leads')}
            className="px-4 py-2.5 bg-[#d8ff38] hover:bg-[#cbf425] text-black font-bold uppercase flex items-center gap-2 transition-colors"
          >
            <Users size={14} />
            <span>VIEW CRM LEADS ({leads.length})</span>
          </button>
          <button
            onClick={() => setActiveSubtab('cms-pages')}
            className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-white font-bold uppercase flex items-center gap-2 transition-colors"
          >
            <span>EDIT HOMEPAGE CMS</span>
          </button>
        </div>
      </div>

      {/* Row 1: High Level KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 font-mono-num">
        
        {/* Total Revenue */}
        <div className="bg-zinc-950 border border-white/10 p-5 sm:p-6 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">TOTAL REVENUE (VERIFIED)</span>
            <DollarSign size={16} className="text-[#d8ff38]" />
          </div>
          <div className="text-2xl sm:text-4xl font-extrabold text-[#d8ff38] font-mono-num">
            ${totalRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-zinc-400 mt-2 flex items-center gap-1">
            <span className="text-white font-bold">{orders.length}</span> settled transactions
          </div>
        </div>

        {/* Total Leads & Conversion */}
        <div className="bg-zinc-950 border border-white/10 p-5 sm:p-6 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">TOTAL CRM LEADS</span>
            <Users size={16} className="text-zinc-400" />
          </div>
          <div className="text-2xl sm:text-4xl font-extrabold text-white font-mono-num">
            {totalLeads}
          </div>
          <div className="text-[11px] text-[#d8ff38] mt-2 flex items-center gap-1 font-bold">
            <TrendingUp size={12} /> {conversionRate}% conversion rate
          </div>
        </div>

        {/* Active Customers */}
        <div className="bg-zinc-950 border border-white/10 p-5 sm:p-6 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">ACTIVE ATHLETES</span>
            <UserCheck size={16} className="text-zinc-400" />
          </div>
          <div className="text-2xl sm:text-4xl font-extrabold text-white font-mono-num">
            {totalCustomers}
          </div>
          <div className="text-[11px] text-zinc-400 mt-2">
            <span className="text-white font-bold">{activeSubscriptions}</span> active memberships
          </div>
        </div>

        {/* Active Challenges */}
        <div className="bg-zinc-950 border border-white/10 p-5 sm:p-6 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">CHALLENGE COHORTS</span>
            <Trophy size={16} className="text-zinc-400" />
          </div>
          <div className="text-2xl sm:text-4xl font-extrabold text-white font-mono-num">
            {challenges.length}
          </div>
          <div className="text-[11px] text-zinc-400 mt-2">
            4 active seasonal programs
          </div>
        </div>

      </div>

      {/* Row 2: Lead Funnel Breakdown & Lead Sources */}
      <div className="grid lg:grid-cols-12 gap-6 font-mono-num">
        
        {/* Left: Lead Funnel Matrix (8 cols) */}
        <div className="lg:col-span-8 bg-zinc-950 border border-white/10 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                LEAD CONVERSION FUNNEL MATRIX
              </h3>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Progression from website interactions to paying athletes.
              </p>
            </div>
            <span className="text-xs text-[#d8ff38] font-bold">LIVE STAGES</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
            <div className="p-3 bg-zinc-900/60 border border-white/5">
              <span className="text-[10px] text-zinc-500 uppercase block font-bold">NEW</span>
              <span className="text-xl font-bold text-white block my-1">{newLeads}</span>
              <span className="text-[9px] text-zinc-400">Uncontacted</span>
            </div>
            <div className="p-3 bg-zinc-900/60 border border-white/5">
              <span className="text-[10px] text-blue-400 uppercase block font-bold">CONTACTED</span>
              <span className="text-xl font-bold text-white block my-1">{contactedLeads}</span>
              <span className="text-[9px] text-zinc-400">In touch</span>
            </div>
            <div className="p-3 bg-zinc-900/60 border border-white/5">
              <span className="text-[10px] text-yellow-400 uppercase block font-bold">QUALIFIED</span>
              <span className="text-xl font-bold text-white block my-1">{qualifiedLeads}</span>
              <span className="text-[9px] text-zinc-400">Target identified</span>
            </div>
            <div className="p-3 bg-zinc-900/60 border border-white/5">
              <span className="text-[10px] text-purple-400 uppercase block font-bold">FOLLOW-UP</span>
              <span className="text-xl font-bold text-white block my-1">{leads.filter(l => l.status === 'FOLLOW_UP').length}</span>
              <span className="text-[9px] text-zinc-400">Scheduled</span>
            </div>
            <div className="p-3 bg-[#d8ff38]/10 border border-[#d8ff38]/30">
              <span className="text-[10px] text-[#d8ff38] uppercase block font-bold">CONVERTED</span>
              <span className="text-xl font-bold text-[#d8ff38] block my-1">{convertedLeads}</span>
              <span className="text-[9px] text-white font-bold">Won</span>
            </div>
            <div className="p-3 bg-zinc-900/60 border border-white/5">
              <span className="text-[10px] text-red-400 uppercase block font-bold">LOST</span>
              <span className="text-xl font-bold text-white block my-1">{lostLeads}</span>
              <span className="text-[9px] text-zinc-400">Disqualified</span>
            </div>
          </div>

          {/* Hot Leads Requiring Immediate Outreach */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
                <Flame size={14} className="text-[#d8ff38]" />
                HOT LEADS REQUIRING ACTION ({hotLeads.length})
              </span>
              <button 
                onClick={() => setActiveSubtab('leads')}
                className="text-[11px] text-[#d8ff38] hover:underline"
              >
                View all leads →
              </button>
            </div>

            <div className="space-y-2">
              {hotLeads.slice(0, 3).map(lead => (
                <div 
                  key={lead.id}
                  onClick={() => {
                    setSelectedLeadId(lead.id);
                    setActiveSubtab('leads-detail');
                  }}
                  className="p-3 bg-zinc-900/40 border border-white/10 hover:border-[#d8ff38] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{lead.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 bg-[#d8ff38] text-black font-extrabold">
                        SCORE: {lead.score}
                      </span>
                      <span className="text-[10px] text-zinc-400 uppercase">
                        via {lead.source.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1">
                      {lead.phone} • {lead.goal} • {lead.challengeInterest || 'General Protocol'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-right">
                    <span className="text-[10px] text-zinc-500 uppercase">{lead.assignedTo}</span>
                    <button className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] uppercase font-bold border border-white/10">
                      OPEN DOSSIER
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Lead Sources Attribution (4 cols) */}
        <div className="lg:col-span-4 bg-zinc-950 border border-white/10 p-6 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              LEAD SOURCE ATTRIBUTION
            </h3>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Which tools generate the highest business volume.
            </p>
          </div>

          <div className="space-y-4">
            {sourceList.map(src => (
              <div key={src.source} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-white uppercase">{src.source}</span>
                  <span className="text-[#d8ff38]">{src.count} ({src.percentage}%)</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-900 border border-white/5 overflow-hidden">
                  <div 
                    className="h-full bg-[#d8ff38]" 
                    style={{ width: `${Math.max(5, src.percentage)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 bg-zinc-900/60 border border-white/5 text-[11px] text-zinc-400 space-y-1">
            <span className="text-white font-bold uppercase block">KEY ATTRIBUTION INSIGHT</span>
            <p className="leading-relaxed">
              The <span className="text-[#d8ff38] font-bold">Calorie Calculator</span> and <span className="text-[#d8ff38] font-bold">Diet Generator</span> account for over 65% of organic lead captures, leading to 80% higher challenge conversion.
            </p>
          </div>
        </div>

      </div>

      {/* Row 3: Recent Activity & Audit Logs */}
      <div className="grid lg:grid-cols-12 gap-6 font-mono-num">
        
        {/* Recent Admin Activity (7 cols) */}
        <div className="lg:col-span-7 bg-zinc-950 border border-white/10 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              RECENT SYSTEM ACTIVITY & AUDIT TRAIL
            </h3>
            <button 
              onClick={() => setActiveSubtab('activity')}
              className="text-[11px] text-zinc-400 hover:text-white uppercase"
            >
              Full log →
            </button>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {auditLogs.slice(0, 5).map(log => (
              <div key={log.id} className="p-3 bg-zinc-900/30 border border-white/5 text-xs flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{log.actor}</span>
                    <span className="text-[10px] text-zinc-500 uppercase px-1.5 py-0.2 bg-zinc-800 border border-white/5">
                      {log.actorRole}
                    </span>
                  </div>
                  <p className="text-zinc-300">
                    {log.action.replace(/_/g, ' ')}: <span className="text-[#d8ff38] font-bold">{log.targetResource}</span>
                  </p>
                  {log.newValue && (
                    <span className="text-[10px] text-zinc-500 block">
                      Value: {log.newValue}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-zinc-500 whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Operational Shortcuts (5 cols) */}
        <div className="lg:col-span-5 bg-zinc-950 border border-white/10 p-6 space-y-4">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              DIRECT MODULE SHORTCUTS
            </h3>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Instant access to core business controls.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <button 
              onClick={() => setActiveSubtab('challenges')}
              className="p-3.5 bg-zinc-900 border border-white/10 hover:border-[#d8ff38] text-left group transition-colors"
            >
              <Trophy size={16} className="text-[#d8ff38] mb-2" />
              <span className="font-bold text-white block uppercase">CHALLENGES CMS</span>
              <span className="text-[10px] text-zinc-500">4 active cohorts</span>
            </button>

            <button 
              onClick={() => setActiveSubtab('foods')}
              className="p-3.5 bg-zinc-900 border border-white/10 hover:border-[#d8ff38] text-left group transition-colors"
            >
              <Utensils size={16} className="text-[#d8ff38] mb-2" />
              <span className="font-bold text-white block uppercase">FOOD DATABASE</span>
              <span className="text-[10px] text-zinc-500">{foodDatabase.length} verified items</span>
            </button>

            <button 
              onClick={() => setActiveSubtab('cms-blog')}
              className="p-3.5 bg-zinc-900 border border-white/10 hover:border-[#d8ff38] text-left group transition-colors"
            >
              <Sparkles size={16} className="text-[#d8ff38] mb-2" />
              <span className="font-bold text-white block uppercase">BLOG ARTICLES</span>
              <span className="text-[10px] text-zinc-500">Published guides</span>
            </button>

            <button 
              onClick={() => setActiveSubtab('orders')}
              className="p-3.5 bg-zinc-900 border border-white/10 hover:border-[#d8ff38] text-left group transition-colors"
            >
              <ShoppingBag size={16} className="text-[#d8ff38] mb-2" />
              <span className="font-bold text-white block uppercase">ORDERS & SALES</span>
              <span className="text-[10px] text-zinc-500">{orders.length} transactions</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
