import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAdmin } from '../context/AdminContext';
import { Check, ArrowRight, X, ShieldAlert, PauseCircle, Clock, Sparkles, MessageCircle, FileText, Phone, Instagram, ShieldCheck, Video, Flame } from 'lucide-react';
import { DisciplineChallengeModal } from './DisciplineChallengeModal';
import { CoachingPlan } from '../types';
import { DEFAULT_COACHING_PLANS } from '../data/defaultPlans';

export type { CoachingPlan };
export const COACHING_PLANS: CoachingPlan[] = DEFAULT_COACHING_PLANS;

export const RateCardsSection: React.FC = () => {
  const { user, setActiveTab, coachingPlans } = useApp();
  const { trackLeadEvent, captureLead } = useAdmin();
  
  const activePlans = (coachingPlans && coachingPlans.length > 0 ? coachingPlans : DEFAULT_COACHING_PLANS).filter(p => p.isActive !== false);

  // Enrollment Modal State
  const [selectedPlanModal, setSelectedPlanModal] = useState<CoachingPlan | null>(null);
  const [isDisciplineModalOpen, setIsDisciplineModalOpen] = useState(false);

  const [clientName, setClientName] = useState(user?.name || '');
  const [clientEmail, setClientEmail] = useState(user?.email || '');
  const [clientPhone, setClientPhone] = useState(user?.phone || '');
  const [clientGoal, setClientGoal] = useState('Fat Loss & Body Recomposition');
  const [acceptedConsent, setAcceptedConsent] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectPlan = (plan: CoachingPlan) => {
    trackLeadEvent('PRICING_VIEWED', {
      source: 'RATE_CARDS_UPDATED',
      details: `Selected ${plan.name} (${plan.durationLabel}) - ${plan.priceFormatted}`
    });

    if (plan.id === 'plan_21d' || plan.isChallenge) {
      setIsDisciplineModalOpen(true);
      return;
    }

    setSelectedPlanModal(plan);
    setIsSubmitted(false);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlanModal) {
      captureLead({
        name: clientName || 'Interested Client',
        email: clientEmail,
        phone: clientPhone || '07420082838',
        source: `ENROLL_${selectedPlanModal.id.toUpperCase()}`,
        goal: clientGoal
      });
      trackLeadEvent('CHECKOUT_STARTED', {
        source: 'RATE_CARDS_MODAL',
        details: `Submitted enrollment inquiry for ${selectedPlanModal.name} (${selectedPlanModal.priceFormatted})`
      });
    }
    setIsSubmitted(true);
  };

  const handleDirectWhatsApp = () => {
    if (!selectedPlanModal) {
      window.open(
        'https://wa.me/917420082838?text=Hello%20Coach%20Neetu%2C%20I%20want%20to%20inquire%20about%20Fitnetheist%20online%20fitness%20plans.',
        '_blank',
        'noopener,noreferrer'
      );
      return;
    }
    const text = encodeURIComponent(
      `Hello Coach Neetu! I want to enroll in the "${selectedPlanModal.name}" (${selectedPlanModal.durationLabel} - ${selectedPlanModal.priceFormatted}). Both Workout and Nutrition included. My name is ${clientName || 'Client'}. I understand this is an online program with no virtual or 1:1 sessions, and I accept the pause rules and no-refund policy.`
    );
    window.open(`https://wa.me/917420082838?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section 
      id="rate-cards-section"
      className="relative bg-[#08080a] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Top Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-[#FFC515]"></span>
            <span className="text-[11px] font-mono-num font-bold uppercase tracking-[0.25em] text-[#FFC515]">
              TRANSPARENT RATE CARDS & ONLINE PROGRAMS
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-2">
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight leading-[0.92] font-display text-white">
                CHOOSE YOUR <span className="text-[#FFC515]">PROGRAM.</span>
              </h2>
              <p className="text-white/70 font-mono-num text-sm sm:text-base max-w-2xl leading-relaxed">
                Simple. Transparent. 100% Online Fitness Guidance. Structured workout plans, bespoke nutrition, and WhatsApp check-ins crafted personally by Coach Neetu.
              </p>
            </div>

            {/* Quick Contact Badge */}
            <div className="shrink-0 flex items-center gap-3 bg-[#121216] border border-white/10 px-4 py-3 rounded font-mono-num text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">COACH DIRECT DESK</span>
                <span className="text-[#FFC515] font-bold block text-sm">07420082838</span>
              </div>
              <a
                href="https://www.instagram.com/coachneetu.fit?stkn=MnUwMXQxZ2RxZGwy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-zinc-900 hover:bg-[#FFC515] hover:text-black text-white/80 rounded transition-colors"
                title="Instagram: @coachneetu.fit"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://wa.me/917420082838?text=Hello%20Coach%20Neetu%2C%20I%20want%20to%20enroll%20in%20an%20online%20fitness%20plan."
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-emerald-950/80 hover:bg-emerald-500 text-emerald-400 hover:text-black rounded transition-colors"
                title="WhatsApp: 07420082838"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* ===================================================
            IMPORTANT ONLINE PLAN FEATURES CLARIFICATION BANNER
            =================================================== */}
        <div className="bg-[#101016] border border-[#FFC515]/40 p-4 sm:p-5 rounded-[4px] flex items-start gap-3.5 font-mono-num text-xs shadow-lg">
          <div className="p-2 bg-[#FFC515]/10 border border-[#FFC515]/30 rounded text-[#FFC515] shrink-0 mt-0.5">
            <ShieldCheck size={18} />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-white font-extrabold uppercase tracking-wider text-xs">
                IMPORTANT NOTE: ALL AVAILABLE FITNESS PLANS ARE 100% ONLINE PROGRAMS
              </span>
              <span className="px-2 py-0.5 bg-[#FFC515] text-black font-black uppercase text-[9px] rounded">
                ONLINE PROGRAMS ONLY
              </span>
            </div>
            <p className="text-zinc-300 text-xs leading-relaxed">
              All fitness plans and challenges provided by Coach Neetu are strictly <strong>online programs</strong> delivered via customized digital workout blueprints, personalized nutrition matrices, and structured WhatsApp accountability.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-zinc-300 text-[11px] pt-1 border-t border-white/5">
              <span className="text-amber-300 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                No virtual sessions
              </span>
              <span className="text-amber-300 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                No one-on-one (1:1) live sessions
              </span>
              <span className="text-zinc-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#FFC515] rounded-full"></span>
                Weekly check-ins over WhatsApp & monthly reviews included
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================
            3 AVAILABLE PROGRAMS GRID (21D ₹799, 3M ₹9k, 6M ₹18k)
            =================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activePlans.map((plan) => {
            const isFeatured = plan.isPopular;
            const isChallenge = plan.isChallenge;

            return (
              <div
                key={plan.id}
                className={`bg-[#0e0e12] border rounded-[4px] p-6 sm:p-7 flex flex-col justify-between space-y-6 relative transition-all duration-300 hover:border-[#FFC515]/80 ${
                  isFeatured
                    ? 'border-[#FFC515] shadow-[0_0_30px_rgba(255,197,21,0.14)] bg-gradient-to-b from-[#14141a] to-[#0c0c10]'
                    : isChallenge
                      ? 'border-[#FFC515]/60 bg-gradient-to-b from-[#12121c] to-[#0c0c12]'
                      : 'border-white/15 hover:shadow-xl'
                }`}
              >
                {/* Header Badge */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 min-h-[26px]">
                    <span className="text-[10px] font-mono-num font-bold uppercase tracking-widest text-zinc-400">
                      {plan.durationLabel}
                    </span>
                    {plan.badge && (
                      <span
                        className={`text-[9px] font-mono-num font-extrabold uppercase px-2 py-0.5 rounded-[2px] tracking-wider ${
                          isFeatured
                            ? 'bg-[#FFC515] text-black shadow-sm'
                            : isChallenge
                              ? 'bg-amber-400/20 text-[#FFC515] border border-[#FFC515]/40'
                              : 'bg-zinc-800 text-[#FFC515] border border-[#FFC515]/30'
                        }`}
                      >
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold uppercase font-display text-white tracking-tight">
                      {plan.name}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 mt-1.5 px-2 py-0.5 bg-[#FFC515]/10 border border-[#FFC515]/30 rounded text-[11px] font-mono-num text-[#FFC515] font-semibold">
                      <Sparkles size={11} />
                      <span>{isChallenge ? '21 Days Habit Architecture · Video Ready' : 'Online Fitness Plan · Workout + Nutrition'}</span>
                    </div>
                  </div>

                  <p className="text-xs text-white/70 font-mono-num leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Price Block - (Effective Price label/section completely removed) */}
                  <div className="pt-4 border-t border-white/10 font-mono-num space-y-1">
                    <div className="flex items-baseline gap-1 text-[#FFC515]">
                      <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                        {plan.priceFormatted}
                      </span>
                      <span className="text-xs text-white/50 uppercase">/ TOTAL</span>
                    </div>
                    <span className="text-[11px] text-zinc-400 block pt-0.5 font-bold uppercase">
                      {isChallenge ? 'One-Time Enrollment · Instant Access' : 'Full Online Coaching Investment'}
                    </span>
                  </div>

                  {/* Pause Policy Badge on Card */}
                  <div className="p-2.5 bg-zinc-950/80 border border-white/10 rounded font-mono-num text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-zinc-300">
                      <PauseCircle size={13} className={plan.pauseDays > 0 ? "text-[#FFC515]" : "text-zinc-500"} />
                      <span className="text-[11px] uppercase font-bold">
                        Pause: <strong className={plan.pauseDays > 0 ? "text-[#FFC515]" : "text-zinc-400"}>{plan.pauseLabel}</strong>
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-500 leading-tight">
                      {plan.id === 'plan_3m'
                        ? 'Pause facility: Up to 1 week allowed (7 days).'
                        : plan.id === 'plan_6m'
                          ? '20 days complimentary pause included.'
                          : 'Continuous 21-day routine for permanent habit consolidation.'}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 font-mono-num text-xs pt-2 text-white/80">
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2">
                        <Check size={14} className="text-[#FFC515] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 space-y-2">
                  {isChallenge ? (
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => setIsDisciplineModalOpen(true)}
                        className="w-full py-3.5 bg-[#FFC515] hover:bg-[#eab308] text-black font-mono-num font-extrabold text-xs uppercase tracking-wider rounded-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,197,21,0.25)]"
                      >
                        <Video size={14} />
                        <span>VIEW VIDEO CURRICULUM & ENROLL (₹799)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const text = encodeURIComponent(
                            'Hello Coach Neetu! I want to enroll in the "21 Days Discipline Challenge" (21 Days Online Program · ₹799). Please share enrollment details!'
                          );
                          window.open(`https://wa.me/917420082838?text=${text}`, '_blank', 'noopener,noreferrer');
                        }}
                        className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white font-mono-num font-bold text-xs uppercase tracking-wider rounded-[2px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <MessageCircle size={13} className="text-[#FFC515]" />
                        <span>Enroll via WhatsApp (₹799)</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      id={`rate-card-enroll-${plan.id}`}
                      onClick={() => handleSelectPlan(plan)}
                      className={`w-full py-3.5 font-mono-num font-bold text-xs uppercase tracking-wider rounded-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                        isFeatured
                          ? 'bg-[#FFC515] hover:bg-[#eab308] text-black shadow-[0_0_20px_rgba(255,197,21,0.3)]'
                          : 'bg-[#14141a] hover:bg-white hover:text-black border border-white/20 text-white'
                      }`}
                    >
                      <span>ENROLL IN {plan.durationMonths} MONTHS ({plan.priceFormatted})</span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                  
                  <span className="block text-center text-[10px] text-zinc-500 font-mono-num uppercase">
                    Strict No-Refund Policy Applies
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ===================================================
            POLICY HIGHLIGHT PANELS: PAUSE & REFUND
            =================================================== */}
        <div className="grid md:grid-cols-2 gap-6 font-mono-num text-xs">
          
          {/* Pause Policy Panel */}
          <div className="bg-[#0f0f14] border border-[#FFC515]/30 p-6 rounded-[4px] space-y-4">
            <div className="flex items-center gap-2 text-[#FFC515]">
              <PauseCircle size={18} />
              <h4 className="text-sm font-bold uppercase tracking-wider font-display text-white">
                MEMBERSHIP PAUSE RULES
              </h4>
            </div>
            
            <p className="text-zinc-300 leading-relaxed text-xs">
              To support genuine travel, medical pauses, or emergencies while preserving program progression, complimentary pauses are structured by tenure:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-center">
              <div className="p-3 bg-zinc-950 border border-white/10 rounded">
                <span className="text-[10px] text-zinc-500 uppercase block font-bold">21 DAYS DISCIPLINE</span>
                <span className="text-xs text-[#FFC515] font-extrabold block mt-1">NO PAUSE</span>
                <span className="text-[10px] text-zinc-400 block">Continuous 21-Day Streak</span>
              </div>
              <div className="p-3 bg-zinc-950 border border-[#FFC515]/30 rounded">
                <span className="text-[10px] text-zinc-500 uppercase block font-bold">3 MONTHS PLAN</span>
                <span className="text-sm text-[#FFC515] font-extrabold block mt-1">UP TO 1 WEEK</span>
                <span className="text-[10px] text-zinc-400 block">7 Days Allowed</span>
              </div>
              <div className="p-3 bg-zinc-950 border border-[#FFC515]/30 rounded">
                <span className="text-[10px] text-zinc-500 uppercase block font-bold">6 MONTHS PLAN</span>
                <span className="text-sm text-[#FFC515] font-extrabold block mt-1">20 DAYS</span>
                <span className="text-[10px] text-zinc-400 block">Complimentary</span>
              </div>
            </div>

            <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded text-[11px] text-amber-200/90 leading-relaxed">
              <strong className="text-amber-400 uppercase">EXTENDED PAUSE RULE:</strong> Anything beyond these allocated days will be chargeable at <strong className="text-white">₹199 per day</strong>. The membership pause will be lifted only after payment of the extended pause days.
            </div>
          </div>

          {/* Refund Policy Panel */}
          <div className="bg-[#0f0f14] border border-white/15 p-6 rounded-[4px] space-y-4">
            <div className="flex items-center gap-2 text-white">
              <ShieldAlert size={18} className="text-[#FFC515]" />
              <h4 className="text-sm font-bold uppercase tracking-wider font-display text-white">
                STRICT NO-REFUND POLICY
              </h4>
            </div>

            <p className="text-zinc-300 leading-relaxed text-xs">
              Every Fitnetheist coaching slot involves dedicated coaching capacity, bespoke assessment, and intellectual property crafted personally by Coach Neetu.
            </p>

            <ul className="space-y-2 text-zinc-300 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-[#FFC515] font-bold">•</span>
                <span><strong className="text-white">Non-Refundable Upon Commencement:</strong> All payments are 100% non-refundable once coaching materials, intake assessments, or services have commenced.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFC515] font-bold">•</span>
                <span><strong className="text-white">Personal Inability:</strong> Absolutely <strong className="text-amber-300">NO REFUND</strong> if the client has personal issues, work commitments, schedule constraints, travel, lack of motivation, change of mind, or is unable to follow the plan.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFC515] font-bold">•</span>
                <span><strong className="text-white">Unused Tenure:</strong> Discontinuing the program voluntarily does not create any right to a refund or pro-rated return.</span>
              </li>
            </ul>

            <div className="pt-2 flex items-center justify-between border-t border-white/10 text-[11px]">
              <span className="text-zinc-400">Read the complete signed consent terms:</span>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('policy');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-[#FFC515] hover:underline font-bold flex items-center gap-1 uppercase tracking-wider cursor-pointer"
              >
                <FileText size={13} />
                <span>Coaching Consent Form →</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Banner with Direct Contact */}
        <div className="bg-[#121218] border border-white/10 p-6 sm:p-8 rounded-[4px] flex flex-col md:flex-row items-center justify-between gap-6 font-mono-num">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] text-[#FFC515] font-bold uppercase tracking-widest block">
              READY TO COMMENCE YOUR ONLINE PROTOCOL?
            </span>
            <h3 className="text-xl sm:text-2xl font-bold uppercase font-display text-white">
              NEED HELP SELECTING BETWEEN 3 MONTHS, 6 MONTHS, OR 21-DAY CHALLENGE?
            </h3>
            <p className="text-zinc-400 text-xs">
              Speak directly with Coach Neetu on WhatsApp or Instagram for intake guidance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/917420082838?text=Hello%20Coach%20Neetu%2C%20I%20want%20to%20discuss%20which%20online%20fitness%20plan%20suits%20my%20goals."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-[#FFC515] hover:bg-[#eab308] text-black font-extrabold text-xs uppercase tracking-wider rounded flex items-center gap-2 transition-all shadow-md"
            >
              <Phone size={14} />
              <span>CALL / WHATSAPP: 07420082838</span>
            </a>
            <a
              href="https://www.instagram.com/coachneetu.fit?stkn=MnUwMXQxZ2RxZGwy"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-zinc-900 hover:bg-zinc-800 border border-white/20 text-white font-bold text-xs uppercase tracking-wider rounded flex items-center gap-2 transition-all"
            >
              <Instagram size={14} />
              <span>@COACHNEETU.FIT</span>
            </a>
          </div>
        </div>

      </div>

      {/* ===================================================
          21 DAYS DISCIPLINE CHALLENGE VIDEO CURRICULUM MODAL
          =================================================== */}
      <DisciplineChallengeModal
        isOpen={isDisciplineModalOpen}
        onClose={() => setIsDisciplineModalOpen(false)}
        onEnroll={() => {
          setIsDisciplineModalOpen(false);
          const plan21 = activePlans.find(p => p.id === 'plan_21d' || p.isChallenge) || activePlans[0];
          if (plan21) setSelectedPlanModal(plan21);
        }}
      />

      {/* ===================================================
          COACHING ENROLLMENT / INQUIRY MODAL
          =================================================== */}
      {selectedPlanModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0c0c10] border border-white/20 max-w-lg w-full p-6 sm:p-8 space-y-6 rounded-[4px] shadow-2xl font-mono-num text-xs animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#FFC515] font-bold block">
                  ONLINE COACHING ENROLLMENT
                </span>
                <h3 className="text-2xl font-bold uppercase font-display text-white mt-0.5">
                  {selectedPlanModal.name}
                </h3>
                <p className="text-xs text-white/60">
                  {selectedPlanModal.durationLabel} • <span className="text-[#FFC515] font-bold text-sm">{selectedPlanModal.priceFormatted}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedPlanModal(null)}
                className="text-white/60 hover:text-white p-1 cursor-pointer"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {isSubmitted ? (
              <div className="p-6 bg-[#FFC515]/10 border border-[#FFC515] text-center space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#FFC515] text-black flex items-center justify-center mx-auto font-bold text-lg">
                  ✓
                </div>
                <h4 className="text-base font-bold text-white uppercase font-display">
                  ENROLLMENT APPLICATION RECEIVED
                </h4>
                <p className="text-xs text-white/80 leading-relaxed">
                  Thank you, <strong>{clientName || 'Client'}</strong>. Your application for the <strong>{selectedPlanModal.name}</strong> ({selectedPlanModal.priceFormatted}) has been routed to Coach Neetu.
                </p>
                <div className="p-3 bg-zinc-950 border border-white/10 rounded text-[11px] text-zinc-300 text-left space-y-1">
                  <div><strong>Selected Tenure:</strong> {selectedPlanModal.durationLabel}</div>
                  <div><strong>Investment:</strong> {selectedPlanModal.priceFormatted} (100% Online Program)</div>
                  <div><strong>Pause Policy:</strong> {selectedPlanModal.pauseLabel}</div>
                  <div><strong>Program Format:</strong> Online program · No virtual or 1:1 sessions</div>
                  <div><strong>Refund Terms:</strong> Strict No-Refund Policy acknowledged</div>
                </div>
                <div className="pt-2 space-y-2">
                  <button
                    onClick={handleDirectWhatsApp}
                    className="w-full py-3.5 bg-[#FFC515] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#E6AF0F] rounded flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <MessageCircle size={15} />
                    <span>FINALIZE ON WHATSAPP: 07420082838 ↗</span>
                  </button>
                  <button
                    onClick={() => setSelectedPlanModal(null)}
                    className="w-full py-2 text-zinc-400 hover:text-white text-xs uppercase"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} className="space-y-4">
                
                {/* Policy Recap Notice */}
                <div className="p-3 bg-zinc-950 border border-white/10 rounded space-y-1.5 text-[11px] text-zinc-300">
                  <div className="flex items-center justify-between text-[#FFC515] font-bold">
                    <span>100% ONLINE FITNESS PROGRAM</span>
                    <span>{selectedPlanModal.priceFormatted}</span>
                  </div>
                  <div className="text-zinc-400">
                    • <strong>Program Type:</strong> Online Program (No virtual or 1:1 sessions).
                  </div>
                  <div className="text-zinc-400">
                    • <strong>Pause Allowance:</strong> {selectedPlanModal.pauseLabel}
                  </div>
                  <div className="text-zinc-400">
                    • <strong>Refund Policy:</strong> No refunds if client has personal issues, schedule conflicts, or cannot follow the plan.
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 uppercase mb-1 font-bold text-[10px]">YOUR FULL NAME *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-[#14141a] border border-white/10 px-3 py-2.5 text-white placeholder-white/20 focus:border-[#FFC515] outline-none rounded"
                  />
                </div>

                <div>
                  <label className="block text-white/70 uppercase mb-1 font-bold text-[10px]">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="rahul@example.com"
                    className="w-full bg-[#14141a] border border-white/10 px-3 py-2.5 text-white placeholder-white/20 focus:border-[#FFC515] outline-none rounded"
                  />
                </div>

                <div>
                  <label className="block text-white/70 uppercase mb-1 font-bold text-[10px]">PHONE / WHATSAPP NUMBER *</label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="e.g. 07420082838 or +91 98765 43210"
                    className="w-full bg-[#14141a] border border-white/10 px-3 py-2.5 text-white placeholder-white/20 focus:border-[#FFC515] outline-none rounded"
                  />
                </div>

                <div>
                  <label className="block text-white/70 uppercase mb-1 font-bold text-[10px]">PRIMARY GOAL & EXPERIENCE LEVEL</label>
                  <textarea
                    rows={2}
                    value={clientGoal}
                    onChange={(e) => setClientGoal(e.target.value)}
                    placeholder="e.g. Fat loss, body recomposition, muscle building, fixing nutrition habits"
                    className="w-full bg-[#14141a] border border-white/10 p-2.5 text-white placeholder-white/20 focus:border-[#FFC515] outline-none rounded"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={acceptedConsent}
                      onChange={(e) => setAcceptedConsent(e.target.checked)}
                      className="mt-0.5 accent-[#FFC515] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-[11px] text-zinc-300 leading-snug">
                      I understand that all programs are online programs with no virtual or 1:1 sessions. I acknowledge that all services are non-refundable (including personal issues), and I accept the pause rules.
                    </span>
                  </label>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#FFC515] hover:bg-[#E6AF0F] text-black font-extrabold uppercase text-xs tracking-wider transition-colors shadow-[0_0_15px_rgba(255,197,21,0.25)] rounded cursor-pointer"
                  >
                    CONFIRM & SUBMIT INQUIRY ({selectedPlanModal.priceFormatted})
                  </button>

                  <button
                    type="button"
                    onClick={handleDirectWhatsApp}
                    className="w-full py-2.5 border border-white/20 hover:border-white/50 text-white/80 hover:text-white uppercase text-xs text-center rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageCircle size={14} className="text-[#FFC515]" />
                    <span>OR CHAT DIRECTLY ON WHATSAPP: 07420082838 ↗</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </section>
  );
};
