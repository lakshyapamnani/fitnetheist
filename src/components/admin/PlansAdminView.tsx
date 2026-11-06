import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CoachingPlan } from '../../types';
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  Save, 
  RotateCcw, 
  Sparkles, 
  Check, 
  CheckCircle2, 
  PauseCircle, 
  Flame, 
  Eye, 
  EyeOff, 
  Copy, 
  ArrowUp, 
  ArrowDown, 
  MessageCircle, 
  ShieldCheck, 
  Layers, 
  AlertCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const PlansAdminView: React.FC = () => {
  const { 
    coachingPlans, 
    saveCoachingPlan, 
    deleteCoachingPlan, 
    resetCoachingPlans,
    saveAllCoachingPlans 
  } = useApp();

  const [editingPlanId, setEditingPlanId] = useState<string | null>(coachingPlans[0]?.id || null);
  const [plansDraft, setPlansDraft] = useState<Record<string, CoachingPlan>>({});
  const [savingStatus, setSavingStatus] = useState<Record<string, 'idle' | 'saving' | 'saved'>>({});
  const [globalFeedback, setGlobalFeedback] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [showNewPlanModal, setShowNewPlanModal] = useState(false);
  const [showLivePreview, setShowLivePreview] = useState(false);

  // New Plan Form State
  const [newPlan, setNewPlan] = useState<Partial<CoachingPlan>>({
    name: 'CUSTOM ONLINE FITNESS PLAN',
    durationLabel: '1 Month (Online Program)',
    durationMonths: 1,
    durationDays: 30,
    totalPrice: 4999,
    priceFormatted: '₹4,999',
    pauseDays: 0,
    pauseLabel: 'Continuous Protocol',
    badge: 'ONLINE PROGRAM',
    isPopular: false,
    isChallenge: false,
    isActive: true,
    description: '100% Online Fitness Program. Custom workout split, bespoke nutrition protocol, and weekly progress check-ins via WhatsApp.',
    features: [
      '100% Online Program (No virtual or 1:1 sessions)',
      'Customized workout split and exercise demonstrations',
      'Personalized macro nutrition matrix',
      'Weekly WhatsApp progress audit'
    ],
    ctaText: 'ENROLL IN ONLINE PLAN',
    whatsappMessage: 'Hello Coach Neetu! I want to enroll in the Custom Online Fitness Plan. Let\'s get started!'
  });

  const getPlanDraft = (plan: CoachingPlan): CoachingPlan => {
    return plansDraft[plan.id] || plan;
  };

  const handleUpdateDraft = (planId: string, updates: Partial<CoachingPlan>) => {
    setPlansDraft(prev => {
      const current = prev[planId] || coachingPlans.find(p => p.id === planId);
      if (!current) return prev;
      return {
        ...prev,
        [planId]: {
          ...current,
          ...updates
        }
      };
    });
  };

  const handleSavePlan = async (planId: string) => {
    const plan = plansDraft[planId] || coachingPlans.find(p => p.id === planId);
    if (!plan) return;

    setSavingStatus(prev => ({ ...prev, [planId]: 'saving' }));
    try {
      await saveCoachingPlan(plan);
      setSavingStatus(prev => ({ ...prev, [planId]: 'saved' }));
      setGlobalFeedback({
        type: 'success',
        message: `Plan "${plan.name}" saved to Realtime Database successfully.`
      });
      setTimeout(() => {
        setSavingStatus(prev => ({ ...prev, [planId]: 'idle' }));
        setGlobalFeedback(null);
      }, 3500);
    } catch (err) {
      setSavingStatus(prev => ({ ...prev, [planId]: 'idle' }));
      setGlobalFeedback({
        type: 'error',
        message: 'Failed to sync with Realtime Database. Check your connection.'
      });
    }
  };

  const handleDeletePlan = async (planId: string) => {
    const plan = coachingPlans.find(p => p.id === planId);
    if (!plan) return;

    if (!window.confirm(`Are you sure you want to delete "${plan.name}"? This will remove it from Realtime DB and the public website.`)) {
      return;
    }

    try {
      await deleteCoachingPlan(planId);
      setGlobalFeedback({
        type: 'info',
        message: `Plan "${plan.name}" removed from Realtime DB.`
      });
      setTimeout(() => setGlobalFeedback(null), 3000);
    } catch {
      setGlobalFeedback({
        type: 'error',
        message: 'Failed to delete plan from Realtime DB.'
      });
    }
  };

  const handleDuplicatePlan = async (sourcePlan: CoachingPlan) => {
    const newId = `plan_${Date.now()}`;
    const duplicated: CoachingPlan = {
      ...sourcePlan,
      id: newId,
      name: `${sourcePlan.name} (COPY)`,
      isPopular: false,
      order: coachingPlans.length,
      updatedAt: new Date().toISOString()
    };

    try {
      await saveCoachingPlan(duplicated);
      setEditingPlanId(newId);
      setGlobalFeedback({
        type: 'success',
        message: `Duplicated plan created and pushed to Realtime DB.`
      });
      setTimeout(() => setGlobalFeedback(null), 3000);
    } catch {
      setGlobalFeedback({
        type: 'error',
        message: 'Failed to duplicate plan.'
      });
    }
  };

  const handleResetDefaults = async () => {
    if (!window.confirm('Reset all plans to default 21 Days (₹799), 3 Months (₹9,000), and 6 Months (₹18,000)? Any custom additions will be overwritten in Realtime DB.')) {
      return;
    }

    try {
      await resetCoachingPlans();
      setPlansDraft({});
      setGlobalFeedback({
        type: 'info',
        message: 'Reset all coaching plans to default catalog in Realtime DB.'
      });
      setTimeout(() => setGlobalFeedback(null), 3500);
    } catch {
      setGlobalFeedback({
        type: 'error',
        message: 'Failed to reset plans in Realtime DB.'
      });
    }
  };

  const handleCreateNewPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlan.name?.trim()) {
      alert('Plan Name is required.');
      return;
    }

    const createdPlan: CoachingPlan = {
      id: `plan_${Date.now()}`,
      name: newPlan.name.trim().toUpperCase(),
      durationLabel: newPlan.durationLabel?.trim() || 'Online Program',
      durationMonths: newPlan.durationMonths || undefined,
      durationDays: newPlan.durationDays || undefined,
      totalPrice: Number(newPlan.totalPrice) || 0,
      priceFormatted: newPlan.priceFormatted?.trim() || `₹${newPlan.totalPrice}`,
      pauseDays: Number(newPlan.pauseDays) || 0,
      pauseLabel: newPlan.pauseLabel?.trim() || 'No Pause',
      badge: newPlan.badge?.trim() || 'ONLINE PROGRAM',
      isPopular: !!newPlan.isPopular,
      isChallenge: !!newPlan.isChallenge,
      isActive: true,
      order: coachingPlans.length,
      description: newPlan.description?.trim() || '100% Online Fitness Program.',
      features: (newPlan.features || []).filter(f => f.trim().length > 0),
      ctaText: newPlan.ctaText?.trim() || 'ENROLL NOW',
      whatsappMessage: newPlan.whatsappMessage?.trim() || `Hello Coach Neetu! I want to enroll in ${newPlan.name}.`,
      updatedAt: new Date().toISOString()
    };

    try {
      await saveCoachingPlan(createdPlan);
      setShowNewPlanModal(false);
      setEditingPlanId(createdPlan.id);
      setGlobalFeedback({
        type: 'success',
        message: `New plan "${createdPlan.name}" deployed to Realtime DB!`
      });
      setTimeout(() => setGlobalFeedback(null), 3500);
    } catch {
      setGlobalFeedback({
        type: 'error',
        message: 'Failed to create plan in Realtime DB.'
      });
    }
  };

  // Feature item helpers
  const handleAddFeature = (planId: string) => {
    const draft = getPlanDraft(coachingPlans.find(p => p.id === planId)!);
    const updatedFeatures = [...(draft.features || []), 'New online program feature bullet'];
    handleUpdateDraft(planId, { features: updatedFeatures });
  };

  const handleUpdateFeature = (planId: string, index: number, text: string) => {
    const draft = getPlanDraft(coachingPlans.find(p => p.id === planId)!);
    const updatedFeatures = [...(draft.features || [])];
    updatedFeatures[index] = text;
    handleUpdateDraft(planId, { features: updatedFeatures });
  };

  const handleDeleteFeature = (planId: string, index: number) => {
    const draft = getPlanDraft(coachingPlans.find(p => p.id === planId)!);
    const updatedFeatures = (draft.features || []).filter((_, i) => i !== index);
    handleUpdateDraft(planId, { features: updatedFeatures });
  };

  const handleMoveFeature = (planId: string, index: number, direction: 'up' | 'down') => {
    const draft = getPlanDraft(coachingPlans.find(p => p.id === planId)!);
    const updatedFeatures = [...(draft.features || [])];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= updatedFeatures.length) return;
    const temp = updatedFeatures[index];
    updatedFeatures[index] = updatedFeatures[targetIdx];
    updatedFeatures[targetIdx] = temp;
    handleUpdateDraft(planId, { features: updatedFeatures });
  };

  const activePlansCount = coachingPlans.filter(p => p.isActive !== false).length;
  const challengePlansCount = coachingPlans.filter(p => p.isChallenge).length;

  return (
    <div className="h-full flex flex-col bg-[#08080a] text-white overflow-hidden font-mono-num">
      
      {/* Top Action Header */}
      <div className="flex-shrink-0 bg-[#0d0d12] border-b border-white/10 p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFC515]">
              FIREBASE REALTIME DATABASE CONNECTED
            </span>
            <span className="text-[10px] text-zinc-500 bg-zinc-900 px-2 py-0.5 border border-white/10 rounded">
              /coachingPlans
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase font-display text-white tracking-tight mt-1 flex items-center gap-2.5">
            <CreditCard className="text-[#FFC515]" size={24} />
            <span>PLANS & RATE CARDS MANAGER</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5 max-w-2xl">
            Edit everything on the public pricing cards in real time: plan name, pricing, duration, pause rules, badges, feature bullets, and WhatsApp links.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <button
            onClick={() => setShowLivePreview(!showLivePreview)}
            className={`px-3.5 py-2 font-bold uppercase rounded flex items-center gap-2 transition-all border ${
              showLivePreview
                ? 'bg-zinc-800 text-[#FFC515] border-[#FFC515]'
                : 'bg-zinc-900 text-zinc-300 border-white/15 hover:border-white/30'
            }`}
          >
            <Eye size={14} />
            <span>{showLivePreview ? 'Hide Live Preview' : 'Show Live Preview'}</span>
          </button>

          <button
            onClick={handleResetDefaults}
            className="px-3.5 py-2 bg-zinc-900 border border-white/15 hover:border-red-500/50 text-zinc-300 hover:text-red-400 font-bold uppercase rounded flex items-center gap-1.5 transition-colors"
            title="Reset all plans to standard 21 Days, 3 Months & 6 Months"
          >
            <RotateCcw size={14} />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            onClick={() => setShowNewPlanModal(true)}
            className="px-4 py-2 bg-[#FFC515] hover:bg-[#eab308] text-black font-extrabold uppercase rounded flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(255,197,21,0.25)]"
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>Create New Plan</span>
          </button>
        </div>
      </div>

      {/* Global Feedback Banner */}
      {globalFeedback && (
        <div className={`px-6 py-2.5 text-xs font-bold flex items-center justify-between transition-all ${
          globalFeedback.type === 'success' 
            ? 'bg-emerald-950/80 text-emerald-300 border-b border-emerald-500/40' 
            : globalFeedback.type === 'error'
            ? 'bg-red-950/80 text-red-300 border-b border-red-500/40'
            : 'bg-[#FFC515]/15 text-[#FFC515] border-b border-[#FFC515]/30'
        }`}>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} />
            <span>{globalFeedback.message}</span>
          </div>
          <button 
            onClick={() => setGlobalFeedback(null)}
            className="text-xs uppercase hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Telemetry Bar */}
      <div className="bg-[#0b0b0e] border-b border-white/10 px-4 sm:px-6 py-3 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono-num text-zinc-400">
        <div>
          <span className="text-[10px] text-zinc-500 uppercase block font-bold">TOTAL PLANS</span>
          <span className="text-sm font-bold text-white">{coachingPlans.length} Total</span>
        </div>
        <div>
          <span className="text-[10px] text-zinc-500 uppercase block font-bold">LIVE ON WEBSITE</span>
          <span className="text-sm font-bold text-emerald-400">{activePlansCount} Active</span>
        </div>
        <div>
          <span className="text-[10px] text-zinc-500 uppercase block font-bold">CHALLENGE PROGRAMS</span>
          <span className="text-sm font-bold text-[#d8ff38]">{challengePlansCount} Challenge</span>
        </div>
        <div>
          <span className="text-[10px] text-zinc-500 uppercase block font-bold">REALTIME SYNC</span>
          <span className="text-sm font-bold text-[#FFC515]">Instant Auto-Sync</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

        {/* Live Preview Toggle Pane */}
        {showLivePreview && (
          <div className="bg-[#0a0a0d] border border-[#FFC515]/40 rounded p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FFC515] rounded-full"></span>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#FFC515]">
                  WEBSITE RATE CARDS LIVE PREVIEW (HOW CLIENTS SEE THIS ON THE SITE)
                </span>
              </div>
              <span className="text-[10px] text-zinc-500 uppercase">
                Updates in Real Time
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {coachingPlans.filter(p => p.isActive !== false).map(plan => {
                const draft = getPlanDraft(plan);
                const isFeatured = draft.isPopular;
                const isChallenge = draft.isChallenge;
                return (
                  <div
                    key={draft.id}
                    className={`bg-[#0e0e12] border rounded p-5 flex flex-col justify-between space-y-4 relative ${
                      isFeatured
                        ? 'border-[#FFC515] shadow-[0_0_20px_rgba(255,197,21,0.12)]'
                        : isChallenge
                        ? 'border-[#d8ff38]/40 shadow-[0_0_20px_rgba(216,255,56,0.06)]'
                        : 'border-white/15'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-zinc-400 uppercase font-bold">{draft.durationLabel}</span>
                        {draft.badge && (
                          <span className={`px-2 py-0.5 rounded-[2px] font-extrabold uppercase ${
                            isChallenge ? 'bg-[#d8ff38] text-black' : isFeatured ? 'bg-[#FFC515] text-black' : 'bg-zinc-800 text-[#FFC515]'
                          }`}>
                            {draft.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold uppercase font-display text-white">
                        {draft.name}
                      </h3>

                      <p className="text-xs text-zinc-400 line-clamp-2">
                        {draft.description}
                      </p>

                      <div className="pt-2 border-t border-white/10">
                        <span className="text-3xl font-black text-[#FFC515]">{draft.priceFormatted}</span>
                        <span className="text-[10px] text-zinc-500 uppercase ml-1">/ Total</span>
                      </div>

                      <div className="p-2 bg-zinc-950 border border-white/10 rounded text-xs text-zinc-300">
                        <strong>Pause:</strong> {draft.pauseLabel}
                      </div>

                      <div className="space-y-1.5 text-xs text-zinc-300">
                        {draft.features?.slice(0, 4).map((f, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <Check size={13} className={isChallenge ? "text-[#d8ff38] shrink-0 mt-0.5" : "text-[#FFC515] shrink-0 mt-0.5"} />
                            <span className="line-clamp-1">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10">
                      <div className={`w-full py-2.5 text-center text-xs font-bold uppercase rounded ${
                        isChallenge ? 'bg-[#d8ff38] text-black' : isFeatured ? 'bg-[#FFC515] text-black' : 'bg-zinc-800 text-white'
                      }`}>
                        {draft.ctaText || 'ENROLL NOW'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Plan Cards Editor List */}
        <div className="space-y-6">
          {coachingPlans.map((plan, planIndex) => {
            const draft = getPlanDraft(plan);
            const isEditing = editingPlanId === plan.id;
            const status = savingStatus[plan.id] || 'idle';
            const isFeatured = draft.isPopular;
            const isChallenge = draft.isChallenge;
            const isActive = draft.isActive !== false;

            return (
              <div 
                key={plan.id}
                className={`bg-[#0d0d12] border rounded-[4px] transition-all duration-200 overflow-hidden ${
                  isEditing 
                    ? 'border-[#FFC515] shadow-[0_0_30px_rgba(255,197,21,0.12)]' 
                    : 'border-white/15 hover:border-white/30'
                }`}
              >
                {/* Header Collapsible Bar */}
                <div 
                  onClick={() => setEditingPlanId(isEditing ? null : plan.id)}
                  className="p-4 sm:p-5 bg-[#121218] flex flex-wrap items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-zinc-800 border border-white/10 flex items-center justify-center text-xs font-bold text-[#FFC515]">
                      {planIndex + 1}
                    </span>

                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base sm:text-lg font-black uppercase font-display text-white">
                          {draft.name}
                        </h2>
                        {draft.badge && (
                          <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-zinc-800 text-[#FFC515] border border-[#FFC515]/30">
                            {draft.badge}
                          </span>
                        )}
                        {!isActive && (
                          <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-500/30">
                            HIDDEN / DRAFT
                          </span>
                        )}
                        {isFeatured && (
                          <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-[#FFC515]/20 text-[#FFC515] border border-[#FFC515]/40 flex items-center gap-1">
                            <Sparkles size={10} />
                            FEATURED
                          </span>
                        )}
                        {isChallenge && (
                          <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-[#d8ff38]/20 text-[#d8ff38] border border-[#d8ff38]/40 flex items-center gap-1">
                            <Flame size={10} />
                            CHALLENGE
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-zinc-400 mt-0.5">
                        <span className="text-[#FFC515] font-extrabold">{draft.priceFormatted}</span>
                        <span>•</span>
                        <span>{draft.durationLabel}</span>
                        <span>•</span>
                        <span>Pause: {draft.pauseLabel}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Active Visibility Toggle */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateDraft(plan.id, { isActive: !isActive });
                      }}
                      className={`px-2.5 py-1 text-[11px] font-bold uppercase rounded flex items-center gap-1.5 border transition-all ${
                        isActive
                          ? 'bg-emerald-950/50 text-emerald-300 border-emerald-500/40'
                          : 'bg-zinc-900 text-zinc-500 border-white/10'
                      }`}
                      title={isActive ? 'Visible to website visitors' : 'Hidden from website'}
                    >
                      {isActive ? <Eye size={12} /> : <EyeOff size={12} />}
                      <span>{isActive ? 'Active' : 'Hidden'}</span>
                    </button>

                    {/* Save Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSavePlan(plan.id);
                      }}
                      disabled={status === 'saving'}
                      className={`px-3.5 py-1.5 text-xs font-bold uppercase rounded flex items-center gap-1.5 transition-all shadow-md ${
                        status === 'saved'
                          ? 'bg-emerald-500 text-black'
                          : 'bg-[#FFC515] hover:bg-[#eab308] text-black'
                      }`}
                    >
                      <Save size={13} />
                      <span>{status === 'saving' ? 'Saving...' : status === 'saved' ? 'Saved!' : 'Save to DB'}</span>
                    </button>

                    <div className="text-zinc-400 p-1">
                      {isEditing ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>
                </div>

                {/* Expanded Edit Form */}
                {isEditing && (
                  <div className="p-5 sm:p-7 space-y-6 border-t border-white/10 bg-[#0a0a0e]">
                    
                    {/* Row 1: Core Identification & Toggles */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2 space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">
                          PLAN TITLE / DISPLAY NAME *
                        </label>
                        <input
                          type="text"
                          value={draft.name}
                          onChange={(e) => handleUpdateDraft(plan.id, { name: e.target.value.toUpperCase() })}
                          placeholder="e.g. 3 MONTHS ONLINE FITNESS PLAN"
                          className="w-full bg-[#14141a] border border-white/15 px-3 py-2 text-sm text-white rounded outline-none focus:border-[#FFC515] font-bold"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">
                          BADGE TEXT (OPTIONAL)
                        </label>
                        <input
                          type="text"
                          value={draft.badge || ''}
                          onChange={(e) => handleUpdateDraft(plan.id, { badge: e.target.value.toUpperCase() })}
                          placeholder="e.g. ONLINE FITNESS PLAN, POPULAR"
                          className="w-full bg-[#14141a] border border-white/15 px-3 py-2 text-sm text-white rounded outline-none focus:border-[#FFC515]"
                        />
                      </div>
                    </div>

                    {/* Row 2: Pricing & Duration Configuration */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">
                          NUMERIC PRICE (INR ₹) *
                        </label>
                        <input
                          type="number"
                          value={draft.totalPrice}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            handleUpdateDraft(plan.id, { 
                              totalPrice: val,
                              priceFormatted: `₹${val.toLocaleString('en-IN')}`
                            });
                          }}
                          placeholder="9000"
                          className="w-full bg-[#14141a] border border-white/15 px-3 py-2 text-sm text-white rounded outline-none focus:border-[#FFC515]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">
                          DISPLAY PRICE FORMATTED *
                        </label>
                        <input
                          type="text"
                          value={draft.priceFormatted}
                          onChange={(e) => handleUpdateDraft(plan.id, { priceFormatted: e.target.value })}
                          placeholder="₹9,000"
                          className="w-full bg-[#14141a] border border-white/15 px-3 py-2 text-sm text-[#FFC515] font-bold rounded outline-none focus:border-[#FFC515]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">
                          DURATION LABEL *
                        </label>
                        <input
                          type="text"
                          value={draft.durationLabel}
                          onChange={(e) => handleUpdateDraft(plan.id, { durationLabel: e.target.value })}
                          placeholder="3 Months (Online Fitness Plan)"
                          className="w-full bg-[#14141a] border border-white/15 px-3 py-2 text-sm text-white rounded outline-none focus:border-[#FFC515]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">
                          DURATION DAYS (APPROX)
                        </label>
                        <input
                          type="number"
                          value={draft.durationDays || (draft.durationMonths ? draft.durationMonths * 30 : 30)}
                          onChange={(e) => handleUpdateDraft(plan.id, { durationDays: Number(e.target.value) })}
                          placeholder="90"
                          className="w-full bg-[#14141a] border border-white/15 px-3 py-2 text-sm text-white rounded outline-none focus:border-[#FFC515]"
                        />
                      </div>
                    </div>

                    {/* Row 3: Pause Policy Configuration */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-zinc-950/70 border border-white/10 rounded">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider flex items-center gap-1.5">
                          <PauseCircle size={13} className="text-[#FFC515]" />
                          <span>PAUSE DAYS ALLOWED</span>
                        </label>
                        <input
                          type="number"
                          value={draft.pauseDays}
                          onChange={(e) => {
                            const days = Number(e.target.value);
                            handleUpdateDraft(plan.id, { 
                              pauseDays: days,
                              pauseLabel: days === 0 ? 'No Pause Allowed' : days === 7 ? 'Up to 1 Week Allowed' : `${days} Days Complimentary`
                            });
                          }}
                          placeholder="7"
                          className="w-full bg-[#14141a] border border-white/15 px-3 py-2 text-sm text-white rounded outline-none focus:border-[#FFC515]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">
                          PAUSE LABEL (DISPLAYED ON CARD)
                        </label>
                        <input
                          type="text"
                          value={draft.pauseLabel}
                          onChange={(e) => handleUpdateDraft(plan.id, { pauseLabel: e.target.value })}
                          placeholder="Up to 1 Week Allowed"
                          className="w-full bg-[#14141a] border border-white/15 px-3 py-2 text-sm text-[#FFC515] font-semibold rounded outline-none focus:border-[#FFC515]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">
                          EXTENDED PAUSE NOTE
                        </label>
                        <input
                          type="text"
                          value={draft.extendedPauseNote || ''}
                          onChange={(e) => handleUpdateDraft(plan.id, { extendedPauseNote: e.target.value })}
                          placeholder="Beyond allowed days: ₹199/day"
                          className="w-full bg-[#14141a] border border-white/15 px-3 py-2 text-sm text-zinc-300 rounded outline-none focus:border-[#FFC515]"
                        />
                      </div>
                    </div>

                    {/* Row 4: Marketing Description */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">
                        PLAN SUMMARY & MARKETING DESCRIPTION *
                      </label>
                      <textarea
                        rows={2}
                        value={draft.description}
                        onChange={(e) => handleUpdateDraft(plan.id, { description: e.target.value })}
                        placeholder="Detailed description of what is included in this online program..."
                        className="w-full bg-[#14141a] border border-white/15 px-3 py-2 text-sm text-zinc-200 rounded outline-none focus:border-[#FFC515] leading-relaxed"
                      />
                    </div>

                    {/* Row 5: Feature Bullets Management (Everything inside the card) */}
                    <div className="space-y-3 p-4 bg-zinc-950/70 border border-white/10 rounded">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-[11px] uppercase font-extrabold text-[#FFC515] block tracking-wider flex items-center gap-1.5">
                            <CheckCircle2 size={14} />
                            <span>CARD FEATURE BULLET POINTS ({draft.features?.length || 0})</span>
                          </label>
                          <p className="text-[10px] text-zinc-400">
                            Reorder, edit, add or delete any feature displayed with a checkmark on the card.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAddFeature(plan.id)}
                          className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-[#FFC515] text-[11px] font-bold uppercase rounded border border-[#FFC515]/30 flex items-center gap-1.5 transition-colors"
                        >
                          <Plus size={12} />
                          <span>Add Feature</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {(draft.features || []).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 bg-[#121217] p-2 rounded border border-white/10">
                            <span className="text-[10px] font-bold text-zinc-500 w-4 text-center">
                              {fIdx + 1}
                            </span>
                            <input
                              type="text"
                              value={feat}
                              onChange={(e) => handleUpdateFeature(plan.id, fIdx, e.target.value)}
                              className="flex-1 bg-transparent text-xs text-white outline-none border-b border-transparent focus:border-[#FFC515]"
                            />
                            
                            {/* Reorder Up */}
                            <button
                              type="button"
                              onClick={() => handleMoveFeature(plan.id, fIdx, 'up')}
                              disabled={fIdx === 0}
                              className="p-1 text-zinc-400 hover:text-white disabled:opacity-30"
                              title="Move up"
                            >
                              <ArrowUp size={13} />
                            </button>

                            {/* Reorder Down */}
                            <button
                              type="button"
                              onClick={() => handleMoveFeature(plan.id, fIdx, 'down')}
                              disabled={fIdx === (draft.features?.length || 1) - 1}
                              className="p-1 text-zinc-400 hover:text-white disabled:opacity-30"
                              title="Move down"
                            >
                              <ArrowDown size={13} />
                            </button>

                            {/* Delete Bullet */}
                            <button
                              type="button"
                              onClick={() => handleDeleteFeature(plan.id, fIdx)}
                              className="p-1 text-zinc-400 hover:text-red-400 transition-colors"
                              title="Remove feature"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Row 6: Toggles & CTAs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">
                          CTA BUTTON TEXT
                        </label>
                        <input
                          type="text"
                          value={draft.ctaText || ''}
                          onChange={(e) => handleUpdateDraft(plan.id, { ctaText: e.target.value })}
                          placeholder="e.g. ENROLL IN 3 MONTHS"
                          className="w-full bg-[#14141a] border border-white/15 px-3 py-2 text-sm text-white rounded outline-none focus:border-[#FFC515]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider flex items-center gap-1.5">
                          <MessageCircle size={13} className="text-emerald-400" />
                          <span>WHATSAPP PREFILLED MESSAGE</span>
                        </label>
                        <input
                          type="text"
                          value={draft.whatsappMessage || ''}
                          onChange={(e) => handleUpdateDraft(plan.id, { whatsappMessage: e.target.value })}
                          placeholder="Hello Coach Neetu! I want to enroll..."
                          className="w-full bg-[#14141a] border border-white/15 px-3 py-2 text-sm text-zinc-300 rounded outline-none focus:border-[#FFC515]"
                        />
                      </div>
                    </div>

                    {/* Row 7: Plan Behavioral Switches */}
                    <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-white/10 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={draft.isPopular}
                          onChange={(e) => handleUpdateDraft(plan.id, { isPopular: e.target.checked })}
                          className="accent-[#FFC515] w-4 h-4"
                        />
                        <span className="font-bold text-white">Highlighted / Most Popular Card</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={draft.isChallenge}
                          onChange={(e) => handleUpdateDraft(plan.id, { isChallenge: e.target.checked })}
                          className="accent-[#d8ff38] w-4 h-4"
                        />
                        <span className="font-bold text-[#d8ff38]">Open 21-Day Challenge Hub Modal</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={draft.isActive !== false}
                          onChange={(e) => handleUpdateDraft(plan.id, { isActive: e.target.checked })}
                          className="accent-emerald-400 w-4 h-4"
                        />
                        <span className="font-bold text-emerald-400">Show on Live Website (Active)</span>
                      </label>
                    </div>

                    {/* Bottom Action Footer for this card */}
                    <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleDuplicatePlan(draft)}
                          className="px-3.5 py-2 bg-zinc-900 border border-white/15 hover:border-white/30 text-zinc-300 font-bold uppercase rounded flex items-center gap-1.5 text-xs transition-colors"
                        >
                          <Copy size={13} />
                          <span>Duplicate Plan</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeletePlan(plan.id)}
                          className="px-3.5 py-2 bg-zinc-900 border border-red-500/30 hover:bg-red-950/40 text-red-400 font-bold uppercase rounded flex items-center gap-1.5 text-xs transition-colors"
                        >
                          <Trash2 size={13} />
                          <span>Delete Plan</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSavePlan(plan.id)}
                        disabled={status === 'saving'}
                        className="px-6 py-2.5 bg-[#FFC515] hover:bg-[#eab308] text-black font-extrabold uppercase rounded flex items-center gap-2 text-xs transition-all shadow-[0_0_20px_rgba(255,197,21,0.2)]"
                      >
                        <Save size={14} />
                        <span>{status === 'saving' ? 'Deploying to Realtime DB...' : 'Save Changes to Realtime DB'}</span>
                      </button>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Modal: Create New Plan */}
      {showNewPlanModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e0e13] border-2 border-[#FFC515] max-w-2xl w-full p-6 sm:p-8 rounded space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] text-[#FFC515] font-bold uppercase tracking-widest block">
                  REALTIME DB CATALOG
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase font-display text-white mt-0.5">
                  CREATE NEW COACHING PLAN
                </h3>
              </div>
              <button
                onClick={() => setShowNewPlanModal(false)}
                className="text-zinc-400 hover:text-white uppercase font-bold text-xs"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreateNewPlan} className="space-y-4 text-xs font-mono-num">
              <div className="space-y-1">
                <label className="text-zinc-400 uppercase font-bold text-[10px]">Plan Name *</label>
                <input
                  type="text"
                  required
                  value={newPlan.name}
                  onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                  placeholder="e.g. 1 MONTH RAPID RECOMPOSITION"
                  className="w-full bg-[#14141a] border border-white/15 px-3 py-2 text-white font-bold rounded outline-none focus:border-[#FFC515]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase font-bold text-[10px]">Price (₹ INR) *</label>
                  <input
                    type="number"
                    required
                    value={newPlan.totalPrice}
                    onChange={(e) => {
                      const p = Number(e.target.value);
                      setNewPlan({ ...newPlan, totalPrice: p, priceFormatted: `₹${p.toLocaleString('en-IN')}` });
                    }}
                    placeholder="4999"
                    className="w-full bg-[#14141a] border border-white/15 px-3 py-2 text-white rounded outline-none focus:border-[#FFC515]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase font-bold text-[10px]">Price Display String</label>
                  <input
                    type="text"
                    value={newPlan.priceFormatted}
                    onChange={(e) => setNewPlan({ ...newPlan, priceFormatted: e.target.value })}
                    placeholder="₹4,999"
                    className="w-full bg-[#14141a] border border-white/15 px-3 py-2 text-[#FFC515] font-bold rounded outline-none focus:border-[#FFC515]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase font-bold text-[10px]">Duration Label</label>
                  <input
                    type="text"
                    value={newPlan.durationLabel}
                    onChange={(e) => setNewPlan({ ...newPlan, durationLabel: e.target.value })}
                    placeholder="1 Month (Online Program)"
                    className="w-full bg-[#14141a] border border-white/15 px-3 py-2 text-white rounded outline-none focus:border-[#FFC515]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase font-bold text-[10px]">Pause Facility Label</label>
                  <input
                    type="text"
                    value={newPlan.pauseLabel}
                    onChange={(e) => setNewPlan({ ...newPlan, pauseLabel: e.target.value })}
                    placeholder="Continuous Protocol / 7 Days Allowed"
                    className="w-full bg-[#14141a] border border-white/15 px-3 py-2 text-white rounded outline-none focus:border-[#FFC515]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 uppercase font-bold text-[10px]">Plan Description</label>
                <textarea
                  rows={2}
                  value={newPlan.description}
                  onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                  className="w-full bg-[#14141a] border border-white/15 px-3 py-2 text-zinc-300 rounded outline-none focus:border-[#FFC515]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 uppercase font-bold text-[10px]">Badge (e.g. ONLINE PROGRAM)</label>
                <input
                  type="text"
                  value={newPlan.badge}
                  onChange={(e) => setNewPlan({ ...newPlan, badge: e.target.value.toUpperCase() })}
                  className="w-full bg-[#14141a] border border-white/15 px-3 py-2 text-white rounded outline-none focus:border-[#FFC515]"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newPlan.isPopular}
                    onChange={(e) => setNewPlan({ ...newPlan, isPopular: e.target.checked })}
                    className="accent-[#FFC515]"
                  />
                  <span className="text-white font-bold">Featured / Popular</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newPlan.isChallenge}
                    onChange={(e) => setNewPlan({ ...newPlan, isChallenge: e.target.checked })}
                    className="accent-[#d8ff38]"
                  />
                  <span className="text-[#d8ff38] font-bold">Is 21-Day Challenge Hub</span>
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewPlanModal(false)}
                  className="px-4 py-2.5 bg-zinc-900 border border-white/15 text-zinc-300 font-bold uppercase rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#FFC515] hover:bg-[#eab308] text-black font-extrabold uppercase rounded flex items-center gap-2 shadow-lg"
                >
                  <Plus size={15} />
                  <span>Create & Deploy to Realtime DB</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
