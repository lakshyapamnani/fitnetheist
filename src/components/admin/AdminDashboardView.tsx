import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  TrendingUp, 
  Trophy, 
  UserCheck, 
  ArrowRight, 
  Flame, 
  ShoppingBag,
  Sparkles,
  Utensils,
  IndianRupee,
  Activity,
  CheckCircle2,
  Clock,
  ExternalLink
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
  const safeLeads = Array.isArray(leads) ? leads : [];
  const safeCustomers = Array.isArray(customers) ? customers : [];
  const safeOrders = Array.isArray(orders) ? orders : [];
  const safeSubscriptions = Array.isArray(subscriptions) ? subscriptions : [];

  const totalLeads = safeLeads.length;
  const newLeads = safeLeads.filter(l => l?.status === 'NEW').length;
  const contactedLeads = safeLeads.filter(l => l?.status === 'CONTACTED' || l?.status === 'FOLLOW_UP').length;
  const qualifiedLeads = safeLeads.filter(l => l?.status === 'QUALIFIED' || l?.status === 'INTERESTED').length;
  const convertedLeads = safeLeads.filter(l => l?.status === 'CONVERTED').length;

  const totalCustomers = safeCustomers.length;
  const activeSubscriptions = safeSubscriptions.filter(s => s?.status === 'ACTIVE').length;
  const totalRevenue = safeOrders.filter(o => o?.paymentStatus === 'PAID').reduce((sum, o) => sum + (o?.amount || 0), 0);
  const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : '0.0';

  // Lead Sources Breakdown
  const sourceCounts: Record<string, number> = {};
  safeLeads.forEach(l => {
    if (!l) return;
    const key = l.source || 'UNKNOWN';
    sourceCounts[key] = (sourceCounts[key] || 0) + 1;
  });

  const sourceList = Object.entries(sourceCounts).map(([src, count]) => ({
    source: src.replace(/_/g, ' '),
    count,
    percentage: totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0
  })).sort((a, b) => b.count - a.count);

  const hotLeads = safeLeads.filter(l => l?.scoreClassification === 'HOT' && l?.status !== 'CONVERTED');

  return (
    <div id="admin-dashboard-view" className="space-y-8 max-w-7xl mx-auto">
      
      {/* Top Header - Clean and Decluttered */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-2 w-2 rounded-full bg-[#FFC515]"></span>
            <span className="text-xs font-mono-num font-bold uppercase tracking-widest text-[#FFC515]">
              OVERVIEW & TELEMETRY
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight font-display text-white">
            ADMIN DASHBOARD
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono-num mt-1">
            Real-time pipeline metrics, athlete roaster, and business revenue.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3 font-mono-num text-xs">
          <button
            onClick={() => setActiveSubtab('leads')}
            className="px-4 py-2.5 bg-[#FFC515] hover:bg-[#e6b010] text-black font-bold uppercase flex items-center gap-2 transition-colors rounded-sm"
          >
            <Users size={14} />
            <span>Athletes Pipeline ({leads.length})</span>
          </button>
          <button
            onClick={() => setActiveSubtab('orders')}
            className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white font-bold uppercase flex items-center gap-2 transition-colors rounded-sm"
          >
            <ShoppingBag size={14} />
            <span>Orders & Billing</span>
          </button>
        </div>
      </div>

      {/* Row 1: High Level KPI Cards with Rs (₹) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono-num">
        
        {/* Total Revenue */}
        <div className="bg-zinc-950 border border-white/10 p-6 relative rounded-sm hover:border-[#FFC515]/40 transition-colors">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-bold">TOTAL REVENUE</span>
            <div className="p-2 bg-[#FFC515]/10 text-[#FFC515] rounded-sm">
              <IndianRupee size={16} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono-num tracking-tight">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-zinc-400 mt-2 flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold flex items-center gap-0.5">
              <CheckCircle2 size={12} /> {orders.length} orders
            </span>
            <span className="text-zinc-600">•</span>
            <span>Settled in INR</span>
          </div>
        </div>

        {/* Total Leads & Conversion */}
        <div className="bg-zinc-950 border border-white/10 p-6 relative rounded-sm hover:border-[#FFC515]/40 transition-colors">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-bold">TOTAL INQUIRIES</span>
            <div className="p-2 bg-zinc-900 text-zinc-300 rounded-sm">
              <Users size={16} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono-num tracking-tight">
            {totalLeads}
          </div>
          <div className="text-xs text-[#FFC515] mt-2 flex items-center gap-1 font-bold">
            <TrendingUp size={13} /> {conversionRate}% conversion rate
          </div>
        </div>

        {/* Active Customers */}
        <div className="bg-zinc-950 border border-white/10 p-6 relative rounded-sm hover:border-[#FFC515]/40 transition-colors">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-bold">ACTIVE ATHLETES</span>
            <div className="p-2 bg-zinc-900 text-zinc-300 rounded-sm">
              <UserCheck size={16} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono-num tracking-tight">
            {totalCustomers}
          </div>
          <div className="text-xs text-zinc-400 mt-2 flex items-center gap-1.5">
            <span className="text-white font-bold">{activeSubscriptions}</span> recurring coaching retainers
          </div>
        </div>

        {/* Active Cohorts */}
        <div className="bg-zinc-950 border border-white/10 p-6 relative rounded-sm hover:border-[#FFC515]/40 transition-colors">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-bold">COHORT PROGRAMS</span>
            <div className="p-2 bg-zinc-900 text-zinc-300 rounded-sm">
              <Trophy size={16} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono-num tracking-tight">
            {challenges.length}
          </div>
          <div className="text-xs text-zinc-400 mt-2">
            Active training curricula
          </div>
        </div>

      </div>

      {/* Row 2: Clean Funnel & Hot Leads */}
      <div className="grid lg:grid-cols-12 gap-6 font-mono-num">
        
        {/* Left: Lead Funnel Matrix (8 cols) */}
        <div className="lg:col-span-8 bg-zinc-950 border border-white/10 p-6 space-y-6 rounded-sm">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                CONVERSION PIPELINE STAGES
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Progression from website calculator entries to active paying athletes.
              </p>
            </div>
            <button 
              onClick={() => setActiveSubtab('leads')}
              className="text-xs text-[#FFC515] hover:underline font-bold flex items-center gap-1"
            >
              Open Pipeline <ArrowRight size={13} />
            </button>
          </div>

          {/* Clean stages summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3.5 bg-zinc-900/60 border border-white/5 rounded-sm">
              <span className="text-[10px] text-zinc-400 uppercase block font-bold">NEW INQUIRIES</span>
              <span className="text-2xl font-extrabold text-white block my-1">{newLeads}</span>
              <span className="text-[10px] text-zinc-500">Uncontacted</span>
            </div>
            <div className="p-3.5 bg-zinc-900/60 border border-white/5 rounded-sm">
              <span className="text-[10px] text-sky-400 uppercase block font-bold">CONTACTED</span>
              <span className="text-2xl font-extrabold text-white block my-1">{contactedLeads}</span>
              <span className="text-[10px] text-zinc-500">In discussion</span>
            </div>
            <div className="p-3.5 bg-zinc-900/60 border border-white/5 rounded-sm">
              <span className="text-[10px] text-amber-400 uppercase block font-bold">QUALIFIED</span>
              <span className="text-2xl font-extrabold text-white block my-1">{qualifiedLeads}</span>
              <span className="text-[10px] text-zinc-500">Protocol drafted</span>
            </div>
            <div className="p-3.5 bg-[#FFC515]/10 border border-[#FFC515]/30 rounded-sm">
              <span className="text-[10px] text-[#FFC515] uppercase block font-bold">CONVERTED</span>
              <span className="text-2xl font-extrabold text-[#FFC515] block my-1">{convertedLeads}</span>
              <span className="text-[10px] text-white font-bold">Enrolled athletes</span>
            </div>
          </div>

          {/* Hot Leads Requiring Immediate Outreach */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
                <Flame size={14} className="text-[#FFC515]" />
                HIGH PRIORITY ATHLETE INQUIRIES ({hotLeads.length})
              </span>
            </div>

            <div className="space-y-2">
              {hotLeads.slice(0, 3).map(lead => (
                <div 
                  key={lead.id}
                  onClick={() => {
                    setSelectedLeadId(lead.id);
                    setActiveSubtab('leads-detail');
                  }}
                  className="p-3.5 bg-zinc-900/40 border border-white/10 hover:border-[#FFC515]/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer rounded-sm"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{lead.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-[#FFC515] text-black font-extrabold rounded-xs">
                        HOT ({lead.score}/100)
                      </span>
                      <span className="text-[10px] text-zinc-400 uppercase">
                        via {lead.source.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                      {lead.phone} • Goal: <strong className="text-zinc-200">{lead.goal.replace(/_/g, ' ')}</strong> • Value: <strong className="text-[#FFC515]">₹{lead.estimatedValue.toLocaleString('en-IN')}</strong>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="text-[10px] text-zinc-400">{lead.assignedTo}</span>
                    <button className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] uppercase font-bold border border-white/10 rounded-sm">
                      Dossier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Lead Sources Attribution (4 cols) */}
        <div className="lg:col-span-4 bg-zinc-950 border border-white/10 p-6 space-y-6 rounded-sm">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              LEAD SOURCE ATTRIBUTION
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Tools generating inquiry volume.
            </p>
          </div>

          <div className="space-y-3.5">
            {sourceList.map(src => (
              <div key={src.source} className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-zinc-300 uppercase">{src.source}</span>
                  <span className="text-[#FFC515]">{src.count} ({src.percentage}%)</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-900 border border-white/5 overflow-hidden rounded-full">
                  <div 
                    className="h-full bg-[#FFC515]" 
                    style={{ width: `${Math.max(5, src.percentage)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 bg-zinc-900/60 border border-white/5 text-xs text-zinc-400 space-y-1 rounded-sm">
            <span className="text-white font-bold uppercase block text-[11px]">ATTRIBUTION SUMMARY</span>
            <p className="leading-relaxed text-[11px]">
              Interactive health tools (Calorie Calculator & Diet Generator) drive 65%+ of high-intent athlete enrollments.
            </p>
          </div>
        </div>

      </div>

      {/* Row 3: Direct Module Shortcuts */}
      <div className="bg-zinc-950 border border-white/10 p-6 space-y-4 rounded-sm font-mono-num">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            DIRECT MANAGEMENT SHORTCUTS
          </h3>
          <span className="text-xs text-zinc-500">Quick Navigation</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <button 
            onClick={() => setActiveSubtab('challenges')}
            className="p-4 bg-zinc-900 border border-white/10 hover:border-[#FFC515] text-left group transition-colors rounded-sm"
          >
            <Trophy size={16} className="text-[#FFC515] mb-2" />
            <span className="font-bold text-white block uppercase">COHORT CMS</span>
            <span className="text-[11px] text-zinc-400">{challenges.length} active programs</span>
          </button>

          <button 
            onClick={() => setActiveSubtab('foods')}
            className="p-4 bg-zinc-900 border border-white/10 hover:border-[#FFC515] text-left group transition-colors rounded-sm"
          >
            <Utensils size={16} className="text-[#FFC515] mb-2" />
            <span className="font-bold text-white block uppercase">NUTRITION DATABASE</span>
            <span className="text-[11px] text-zinc-400">{foodDatabase.length} verified food items</span>
          </button>

          <button 
            onClick={() => setActiveSubtab('orders')}
            className="p-4 bg-zinc-900 border border-white/10 hover:border-[#FFC515] text-left group transition-colors rounded-sm"
          >
            <IndianRupee size={16} className="text-[#FFC515] mb-2" />
            <span className="font-bold text-white block uppercase">ORDERS & BILLING</span>
            <span className="text-[11px] text-zinc-400">{orders.length} settled in Rs (₹)</span>
          </button>

          <button 
            onClick={() => setActiveSubtab('cms-pages')}
            className="p-4 bg-zinc-900 border border-white/10 hover:border-[#FFC515] text-left group transition-colors rounded-sm"
          >
            <Sparkles size={16} className="text-[#FFC515] mb-2" />
            <span className="font-bold text-white block uppercase">HOMEPAGE CONTENT</span>
            <span className="text-[11px] text-zinc-400">Sections, Testimonials, FAQs</span>
          </button>
        </div>
      </div>

    </div>
  );
};
