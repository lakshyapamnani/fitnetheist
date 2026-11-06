import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAdmin } from '../context/AdminContext';
import { Check, ArrowRight, PauseCircle, ShieldAlert, Sparkles, MessageCircle, FileText, Phone, Instagram, Flame, ShieldCheck } from 'lucide-react';
import { COACHING_PLANS, CoachingPlan } from './RateCardsSection';
import { DisciplineChallengeModal } from './DisciplineChallengeModal';

export const PricingSection: React.FC = () => {
  const { setActiveTab, coachingPlans } = useApp();
  const { trackLeadEvent } = useAdmin();
  const [showChallengeModal, setShowChallengeModal] = useState(false);

  const activePlans = (coachingPlans && coachingPlans.length > 0 ? coachingPlans : COACHING_PLANS).filter(p => p.isActive !== false);

  const handleSelectPlan = (plan: CoachingPlan) => {
    trackLeadEvent('PRICING_VIEWED', {
      source: 'PRICING_PAGE_ONLINE_TIERS',
      details: `Selected ${plan.name} (${plan.durationLabel}) - ${plan.priceFormatted}`
    });

    if (plan.id === 'plan_21d' || plan.isChallenge) {
      setShowChallengeModal(true);
      return;
    }

    const text = encodeURIComponent(
      plan.whatsappMessage ||
      `Hello Coach Neetu! I want to enroll in the "${plan.name}" (${plan.durationLabel} - ${plan.priceFormatted}). Both Workout & Nutrition included. Let's start!`
    );
    window.open(`https://wa.me/917420082838?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="pricing-section-page" className="min-h-screen bg-[#08080a] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 font-mono-num">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-[#FFC515]"></span>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFC515]">
                OFFICIAL ONLINE PROGRAMS & RATE CARDS
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight font-display text-white">
              COACHING <span className="text-[#FFC515]">INVESTMENT.</span>
            </h1>
            <p className="text-white/70 text-sm sm:text-base max-w-2xl leading-relaxed">
              Every package includes <strong className="text-white">BOTH custom workout programming and bespoke nutrition guidance</strong> by Coach Neetu.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <a
              href="https://wa.me/917420082838?text=Hello%20Coach%20Neetu%2C%20I%20have%20a%20question%20about%20your%20online%20fitness%20plans."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-[#FFC515] text-black font-extrabold uppercase rounded flex items-center gap-2 hover:bg-[#eab308] transition-colors"
            >
              <Phone size={14} />
              <span>07420082838</span>
            </a>
            <a
              href="https://www.instagram.com/coachneetu.fit?stkn=MnUwMXQxZ2RxZGwy"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-zinc-900 border border-white/15 text-white font-bold uppercase rounded flex items-center gap-2 hover:bg-zinc-800 transition-colors"
            >
              <Instagram size={14} />
              <span>@coachneetu.fit</span>
            </a>
          </div>
        </div>

        {/* Mandatory Online Programs Notice Banner */}
        <div className="p-4 sm:p-5 bg-[#121217] border-l-4 border-[#FFC515] border-y border-r border-white/10 rounded-[2px] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#FFC515] font-extrabold text-xs sm:text-sm tracking-wider uppercase">
              <ShieldCheck size={18} />
              <span>IMPORTANT NOTICE: ALL FITNESS PLANS ARE 100% ONLINE PROGRAMS</span>
            </div>
            <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
              All plans offered are structured <strong>online fitness and nutrition programs</strong>. <strong>No virtual sessions</strong> and <strong>no one-on-one (1:1) live sessions</strong> are conducted. Workouts, meal plans, metrics logging, and check-ins are handled systematically via our digital protocols and WhatsApp.
            </p>
          </div>
          <span className="shrink-0 px-3 py-1 bg-[#FFC515]/15 border border-[#FFC515]/30 text-[#FFC515] text-[10px] font-mono-num font-bold uppercase tracking-widest">
            DIGITAL PROTOCOL
          </span>
        </div>

        {/* 3 Active Plans Grid (21 Days, 3 Months, 6 Months) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    ? 'border-[#d8ff38]/50 shadow-[0_0_25px_rgba(216,255,56,0.08)] bg-[#0d100d]'
                    : 'border-white/15'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between min-h-[26px]">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      {plan.durationLabel}
                    </span>
                    {plan.badge && (
                      <span
                        className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-[2px] tracking-wider ${
                          isChallenge
                            ? 'bg-[#d8ff38] text-black font-extrabold'
                            : isFeatured
                            ? 'bg-[#FFC515] text-black'
                            : 'bg-zinc-800 text-[#FFC515] border border-[#FFC515]/30'
                        }`}
                      >
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold uppercase font-display text-white">
                      {plan.name}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 mt-1 px-2 py-0.5 bg-[#FFC515]/10 border border-[#FFC515]/30 rounded text-[11px] text-[#FFC515] font-semibold">
                      {isChallenge ? <Flame size={12} className="text-[#d8ff38]" /> : <Sparkles size={11} />}
                      <span>{isChallenge ? 'Daily Protocol + Habit Architecture' : 'Workout + Nutrition'}</span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="pt-4 border-t border-white/10 space-y-1">
                    <div className="flex items-baseline gap-1 text-[#FFC515]">
                      <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                        {plan.priceFormatted}
                      </span>
                      <span className="text-xs text-white/50 uppercase">/ TOTAL</span>
                    </div>
                    {/* Note: Effective price label completely removed as requested */}
                  </div>

                  <div className="p-2.5 bg-zinc-950/80 border border-white/10 rounded text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-zinc-300">
                      <PauseCircle size={13} className={plan.pauseDays > 0 ? "text-[#FFC515]" : "text-zinc-500"} />
                      <span className="text-[11px] uppercase font-bold">
                        Pause: <strong className={plan.pauseDays > 0 ? "text-[#FFC515]" : "text-zinc-400"}>{plan.pauseLabel}</strong>
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-500 leading-tight">
                      {plan.pauseDays === 0
                        ? (isChallenge ? 'Continuous 21-day challenge. No pause facility.' : 'Strict continuous program.')
                        : `Up to ${plan.pauseLabel.toLowerCase()}. Extended pause: ₹199/day.`}
                    </p>
                  </div>

                  <div className="space-y-2.5 text-xs pt-2 text-white/80">
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2">
                        <Check size={14} className={isChallenge ? "text-[#d8ff38] shrink-0 mt-0.5" : "text-[#FFC515] shrink-0 mt-0.5"} />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full py-3.5 font-bold text-xs uppercase tracking-wider rounded-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isChallenge
                        ? 'bg-[#d8ff38] hover:bg-[#c9f028] text-black shadow-[0_0_20px_rgba(216,255,56,0.3)]'
                        : isFeatured
                        ? 'bg-[#FFC515] hover:bg-[#eab308] text-black shadow-[0_0_20px_rgba(255,197,21,0.3)]'
                        : 'bg-[#14141a] hover:bg-white hover:text-black border border-white/20 text-white'
                    }`}
                  >
                    <span>{isChallenge ? 'VIEW CHALLENGE & ENROLL' : `ENROLL IN ${plan.name}`}</span>
                    <ArrowRight size={14} />
                  </button>
                  <span className="block text-center text-[10px] text-zinc-500 uppercase">
                    Strict No-Refund Policy • 100% Online
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Policy Highlights */}
        <div className="grid md:grid-cols-2 gap-6 text-xs">
          <div className="bg-[#0f0f14] border border-[#FFC515]/30 p-6 rounded-[4px] space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider font-display text-white flex items-center gap-2">
              <PauseCircle size={16} className="text-[#FFC515]" />
              MEMBERSHIP PAUSE RULES
            </h4>
            <div className="space-y-1.5 text-zinc-300">
              {activePlans.map(plan => (
                <p key={plan.id}>• <strong>{plan.name}:</strong> {plan.pauseLabel} {plan.pauseDays > 0 ? `(${plan.pauseDays} days)` : ''}.</p>
              ))}
              <p className="text-amber-300 pt-1">
                • <strong>Extended Pause:</strong> Anything beyond allowed days will be chargeable at <strong>₹199 per day</strong>, and pause will be lifted only after payment of the extended pause days.
              </p>
            </div>
          </div>

          <div className="bg-[#0f0f14] border border-white/15 p-6 rounded-[4px] space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider font-display text-white flex items-center gap-2">
              <ShieldAlert size={16} className="text-[#FFC515]" />
              REFUND POLICY & ONLINE FORMAT
            </h4>
            <div className="space-y-1.5 text-zinc-300">
              <p>• <strong>100% Online Protocol:</strong> All plans are online programs. No virtual or 1:1 sessions.</p>
              <p>• <strong>Strict No-Refund:</strong> All payments are 100% non-refundable once coaching commences.</p>
              <p>• <strong>Personal Inability:</strong> <strong className="text-white">No refund if the client has personal issues, schedule conflicts, lack of time, lack of motivation, travel, or inability to follow the plan.</strong></p>
              <p>• <strong>Unused Days:</strong> Unused tenure is non-refundable upon voluntary discontinuation.</p>
            </div>
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  setActiveTab('policy');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-[#FFC515] hover:underline font-bold flex items-center gap-1 uppercase"
              >
                <FileText size={13} />
                <span>Read Full Coaching Consent Form & Agreement →</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 21 Days Discipline Challenge Interactive Modal */}
      {showChallengeModal && (
        <DisciplineChallengeModal onClose={() => setShowChallengeModal(false)} />
      )}
    </div>
  );
};
