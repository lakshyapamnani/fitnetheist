import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAdmin } from '../context/AdminContext';
import { Check, ArrowRight, X } from 'lucide-react';

export const RateCardsSection: React.FC = () => {
  const { user } = useApp();
  const { trackLeadEvent, captureLead } = useAdmin();
  const [selectedDuration, setSelectedDuration] = useState<'MONTHLY' | '90_DAYS'>('90_DAYS');
  
  // Enrollment Modal State
  const [selectedPlanModal, setSelectedPlanModal] = useState<{
    name: string;
    duration: string;
    price: string;
    savings?: string;
  } | null>(null);

  const [clientName, setClientName] = useState(user?.name || '');
  const [clientEmail, setClientEmail] = useState(user?.email || '');
  const [clientPhone, setClientPhone] = useState(user?.phone || '');
  const [clientGoal, setClientGoal] = useState('Fat Loss & Body Recomposition');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectPlan = (planName: string, duration: string, price: string, savings?: string) => {
    trackLeadEvent('PRICING_VIEWED', {
      source: 'RATE_CARDS',
      details: `Selected ${planName} (${duration}) - ${price}`
    });
    setSelectedPlanModal({ name: planName, duration, price, savings });
    setIsSubmitted(false);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlanModal) {
      captureLead({
        name: clientName || 'Interested Client',
        email: clientEmail,
        phone: clientPhone || '+91 98000 00000',
        source: `RATE_CARD_${selectedPlanModal.name.toUpperCase().replace(/\s+/g, '_')}_${selectedPlanModal.duration}`,
        goal: clientGoal
      });
      trackLeadEvent('CHECKOUT_STARTED', {
        source: 'RATE_CARDS_MODAL',
        details: `Submitted inquiry for ${selectedPlanModal.name} (${selectedPlanModal.duration})`
      });
    }
    setIsSubmitted(true);
  };

  const handleDirectWhatsApp = () => {
    if (!selectedPlanModal) return;
    const text = encodeURIComponent(
      `Hello Coach Neetu! I want to enroll in the Fitnetheist "${selectedPlanModal.name}" (${selectedPlanModal.duration} - ${selectedPlanModal.price}). My name is ${clientName || 'Client'}.`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section 
      id="rate-cards-section"
      className="relative bg-[#08080a] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-6">
          <span className="h-1.5 w-1.5 bg-[#FFC515]"></span>
          <span className="text-[11px] font-mono-num font-bold uppercase tracking-[0.25em] text-[#FFC515]">
            RATE CARDS
          </span>
        </div>

        {/* Header & Duration Toggle */}
        <div className="border-b border-white/10 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight leading-[0.94] font-display text-white">
              CHOOSE YOUR <span className="text-[#FFC515]">COACHING.</span>
            </h2>
            <p className="text-white/60 font-mono-num text-sm sm:text-base mt-2">
              Simple. Transparent. Personalized Coaching.
            </p>
          </div>

          {/* Clean 2-Duration Toggle: MONTHLY & 90 DAYS ONLY */}
          <div className="inline-flex p-1 bg-[#101014] border border-white/15 font-mono-num text-xs">
            <button
              id="duration-toggle-monthly"
              onClick={() => setSelectedDuration('MONTHLY')}
              className={`px-5 py-2.5 uppercase font-bold tracking-wider transition-colors ${
                selectedDuration === 'MONTHLY'
                  ? 'bg-[#FFC515] text-black font-extrabold shadow-[0_0_12px_rgba(255,197,21,0.2)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              MONTHLY
            </button>
            <button
              id="duration-toggle-90days"
              onClick={() => setSelectedDuration('90_DAYS')}
              className={`px-5 py-2.5 uppercase font-bold tracking-wider transition-colors ${
                selectedDuration === '90_DAYS'
                  ? 'bg-[#FFC515] text-black font-extrabold shadow-[0_0_12px_rgba(255,197,21,0.2)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              90 DAYS
            </button>
          </div>
        </div>

        {/* ===================================================
            MONTHLY RATE CARDS (3 Service Options)
            =================================================== */}
        {selectedDuration === 'MONTHLY' && (
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* 1. NUTRITION ONLY */}
            <div className="bg-[#101014] border border-white/15 p-8 flex flex-col justify-between space-y-8 relative">
              <div className="space-y-4">
                <span className="text-[10px] font-mono-num text-white/40 uppercase tracking-widest block">
                  SERVICE OPTION 01
                </span>
                <h3 className="text-2xl font-extrabold uppercase font-display text-white">
                  NUTRITION ONLY
                </h3>
                <p className="text-xs text-white/60 font-mono-num leading-relaxed">
                  Personalized nutrition guidance and diet planning.
                </p>

                {/* Price */}
                <div className="pt-6 border-t border-white/10 font-mono-num">
                  <div className="flex items-baseline gap-1 text-[#FFC515]">
                    <span className="text-4xl sm:text-5xl font-extrabold">₹4,000</span>
                    <span className="text-xs text-white/50 uppercase">/month</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 font-mono-num text-xs pt-4 text-white/80">
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#FFC515] shrink-0 mt-0.5" />
                    <span>Personalized caloric & macronutrient blueprint</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#FFC515] shrink-0 mt-0.5" />
                    <span>Custom 7-day meal plan tailored to food preferences</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#FFC515] shrink-0 mt-0.5" />
                    <span>Weekly dietary adjustments with Coach Neetu</span>
                  </div>
                </div>
              </div>

              <button
                id="rate-card-choose-nutrition-monthly"
                onClick={() => handleSelectPlan('Nutrition Only', 'Monthly', '₹4,000 / month')}
                className="w-full py-4 bg-[#14141a] hover:bg-white hover:text-black border border-white/20 text-white font-mono-num font-bold text-xs uppercase tracking-wider transition-all"
              >
                CHOOSE NUTRITION
              </button>
            </div>

            {/* 2. WORKOUT ONLY */}
            <div className="bg-[#101014] border border-white/15 p-8 flex flex-col justify-between space-y-8 relative">
              <div className="space-y-4">
                <span className="text-[10px] font-mono-num text-white/40 uppercase tracking-widest block">
                  SERVICE OPTION 02
                </span>
                <h3 className="text-2xl font-extrabold uppercase font-display text-white">
                  WORKOUT ONLY
                </h3>
                <p className="text-xs text-white/60 font-mono-num leading-relaxed">
                  Personalized workout guidance and training support.
                </p>

                {/* Price */}
                <div className="pt-6 border-t border-white/10 font-mono-num">
                  <div className="flex items-baseline gap-1 text-[#FFC515]">
                    <span className="text-4xl sm:text-5xl font-extrabold">₹4,000</span>
                    <span className="text-xs text-white/50 uppercase">/month</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 font-mono-num text-xs pt-4 text-white/80">
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#FFC515] shrink-0 mt-0.5" />
                    <span>Custom workout routine adapted to your equipment</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#FFC515] shrink-0 mt-0.5" />
                    <span>Form video reviews & exercise technique guidance</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#FFC515] shrink-0 mt-0.5" />
                    <span>Progressive overload load management</span>
                  </div>
                </div>
              </div>

              <button
                id="rate-card-choose-workout-monthly"
                onClick={() => handleSelectPlan('Workout Only', 'Monthly', '₹4,000 / month')}
                className="w-full py-4 bg-[#14141a] hover:bg-white hover:text-black border border-white/20 text-white font-mono-num font-bold text-xs uppercase tracking-wider transition-all"
              >
                CHOOSE WORKOUT
              </button>
            </div>

            {/* 3. NUTRITION + WORKOUT */}
            <div className="bg-[#101014] border border-[#FFC515] p-8 flex flex-col justify-between space-y-8 relative shadow-[0_0_25px_rgba(255,197,21,0.08)]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-num text-[#FFC515] uppercase tracking-widest font-bold">
                    SERVICE OPTION 03
                  </span>
                  <span className="px-2 py-0.5 bg-[#FFC515] text-black text-[10px] font-mono-num font-extrabold uppercase">
                    COMPLETE COACHING
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold uppercase font-display text-white">
                  NUTRITION + WORKOUT
                </h3>
                <p className="text-xs text-white/60 font-mono-num leading-relaxed">
                  Complete coaching with personalized nutrition and workouts.
                </p>

                {/* Price */}
                <div className="pt-6 border-t border-white/10 font-mono-num">
                  <div className="flex items-baseline gap-1 text-[#FFC515]">
                    <span className="text-4xl sm:text-5xl font-extrabold">₹7,500</span>
                    <span className="text-xs text-white/50 uppercase">/month</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 font-mono-num text-xs pt-4 text-white/80">
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#FFC515] shrink-0 mt-0.5" />
                    <span>Comprehensive nutrition planning + custom workout splits</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#FFC515] shrink-0 mt-0.5" />
                    <span>Direct 1-on-1 check-ins with Coach Neetu</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#FFC515] shrink-0 mt-0.5" />
                    <span>Priority WhatsApp feedback and daily accountability</span>
                  </div>
                </div>
              </div>

              <button
                id="rate-card-choose-complete-monthly"
                onClick={() => handleSelectPlan('Nutrition + Workout', 'Monthly', '₹7,500 / month')}
                className="w-full py-4 bg-[#FFC515] hover:bg-[#E6AF0F] text-black font-mono-num font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(255,197,21,0.25)]"
              >
                CHOOSE COMPLETE PLAN
              </button>
            </div>

          </div>
        )}

        {/* ===================================================
            90 DAYS RATE CARDS (3 Service Options)
            =================================================== */}
        {selectedDuration === '90_DAYS' && (
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* 1. NUTRITION ONLY (90 DAYS) */}
            <div className="bg-[#101014] border border-white/15 p-8 flex flex-col justify-between space-y-8 relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-num text-white/40 uppercase tracking-widest">
                    SERVICE OPTION 01
                  </span>
                  <span className="text-[10px] font-mono-num font-bold text-[#FFC515] uppercase">
                    SAVE ₹1,000
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold uppercase font-display text-white">
                  NUTRITION ONLY
                </h3>
                <p className="text-xs text-white/60 font-mono-num leading-relaxed">
                  Equivalent to ₹12,000 across three monthly payments.
                </p>

                {/* Price */}
                <div className="pt-6 border-t border-white/10 font-mono-num">
                  <div className="flex items-baseline gap-1 text-[#FFC515]">
                    <span className="text-4xl sm:text-5xl font-extrabold">₹11,000</span>
                    <span className="text-xs text-white/50 uppercase">/ 90 DAYS</span>
                  </div>
                  <span className="text-[10px] text-white/40 font-mono-num block mt-1">
                    SAVE ₹1,000 TOTAL
                  </span>
                </div>

                {/* Features */}
                <div className="space-y-2.5 font-mono-num text-xs pt-4 text-white/80">
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#FFC515] shrink-0 mt-0.5" />
                    <span>Full 90-day nutrition periodization for sustained fat loss/muscle</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#FFC515] shrink-0 mt-0.5" />
                    <span>Structured meal phases and metabolic refeed protocols</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#FFC515] shrink-0 mt-0.5" />
                    <span>Regular milestone assessments with Coach Neetu</span>
                  </div>
                </div>
              </div>

              <button
                id="rate-card-choose-nutrition-90days"
                onClick={() => handleSelectPlan('Nutrition Only', '90 Days', '₹11,000 / 90 Days', 'SAVE ₹1,000')}
                className="w-full py-4 bg-[#14141a] hover:bg-white hover:text-black border border-white/20 text-white font-mono-num font-bold text-xs uppercase tracking-wider transition-all"
              >
                CHOOSE 90-DAY NUTRITION
              </button>
            </div>

            {/* 2. WORKOUT ONLY (90 DAYS) */}
            <div className="bg-[#101014] border border-white/15 p-8 flex flex-col justify-between space-y-8 relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-num text-white/40 uppercase tracking-widest">
                    SERVICE OPTION 02
                  </span>
                  <span className="text-[10px] font-mono-num font-bold text-[#FFC515] uppercase">
                    SAVE ₹1,000
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold uppercase font-display text-white">
                  WORKOUT ONLY
                </h3>
                <p className="text-xs text-white/60 font-mono-num leading-relaxed">
                  Equivalent to ₹12,000 across three monthly payments.
                </p>

                {/* Price */}
                <div className="pt-6 border-t border-white/10 font-mono-num">
                  <div className="flex items-baseline gap-1 text-[#FFC515]">
                    <span className="text-4xl sm:text-5xl font-extrabold">₹11,000</span>
                    <span className="text-xs text-white/50 uppercase">/ 90 DAYS</span>
                  </div>
                  <span className="text-[10px] text-white/40 font-mono-num block mt-1">
                    SAVE ₹1,000 TOTAL
                  </span>
                </div>

                {/* Features */}
                <div className="space-y-2.5 font-mono-num text-xs pt-4 text-white/80">
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#FFC515] shrink-0 mt-0.5" />
                    <span>3 distinct 30-day progressive training blocks</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#FFC515] shrink-0 mt-0.5" />
                    <span>Continuous lifting technique and posture audits</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#FFC515] shrink-0 mt-0.5" />
                    <span>Strength benchmarking and deload management</span>
                  </div>
                </div>
              </div>

              <button
                id="rate-card-choose-workout-90days"
                onClick={() => handleSelectPlan('Workout Only', '90 Days', '₹11,000 / 90 Days', 'SAVE ₹1,000')}
                className="w-full py-4 bg-[#14141a] hover:bg-white hover:text-black border border-white/20 text-white font-mono-num font-bold text-xs uppercase tracking-wider transition-all"
              >
                CHOOSE 90-DAY WORKOUT
              </button>
            </div>

            {/* 3. NUTRITION + WORKOUT (90 DAYS) - BEST VALUE */}
            <div className="bg-[#101014] border border-[#FFC515] p-8 flex flex-col justify-between space-y-8 relative shadow-[0_0_30px_rgba(255,197,21,0.14)]">
              
              {/* BEST VALUE Subtle Ribbon */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-num text-[#FFC515] uppercase tracking-widest font-bold">
                    SERVICE OPTION 03
                  </span>
                  <span className="px-2.5 py-0.5 bg-[#FFC515] text-black text-[10px] font-mono-num font-extrabold uppercase tracking-wider">
                    BEST VALUE // SAVE ₹1,500
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold uppercase font-display text-white">
                  NUTRITION + WORKOUT
                </h3>
                <p className="text-xs text-white/60 font-mono-num leading-relaxed">
                  Equivalent to ₹22,500 across three monthly payments.
                </p>

                {/* Price */}
                <div className="pt-6 border-t border-white/10 font-mono-num">
                  <div className="flex items-baseline gap-1 text-[#FFC515]">
                    <span className="text-4xl sm:text-5xl font-extrabold">₹21,000</span>
                    <span className="text-xs text-white/50 uppercase">/ 90 DAYS</span>
                  </div>
                  <span className="text-[10px] text-[#FFC515] font-mono-num font-bold block mt-1">
                    SAVE ₹1,500 (MOST POPULAR TRANSFORMATION PLAN)
                  </span>
                </div>

                {/* Features */}
                <div className="space-y-2.5 font-mono-num text-xs pt-4 text-white/80">
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#FFC515] shrink-0 mt-0.5" />
                    <span>Complete 90-Day Transformation: Nutrition & Workouts</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#FFC515] shrink-0 mt-0.5" />
                    <span>Weekly 1-on-1 progress reviews directly with Coach Neetu</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#FFC515] shrink-0 mt-0.5" />
                    <span>Continuous WhatsApp support, restaurant guides & habit mastery</span>
                  </div>
                </div>
              </div>

              <button
                id="rate-card-choose-complete-90days"
                onClick={() => handleSelectPlan('Nutrition + Workout', '90 Days', '₹21,000 / 90 Days', 'SAVE ₹1,500')}
                className="w-full py-4 bg-[#FFC515] hover:bg-[#E6AF0F] text-black font-mono-num font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(255,197,21,0.25)]"
              >
                CHOOSE 90-DAY COMPLETE
              </button>
            </div>

          </div>
        )}

      </div>

      {/* ===================================================
          COACHING ENROLLMENT / INQUIRY MODAL
          =================================================== */}
      {selectedPlanModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0c0c10] border border-white/20 max-w-lg w-full p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono-num uppercase tracking-widest text-[#FFC515] font-bold block">
                  COACHING ENROLLMENT
                </span>
                <h3 className="text-2xl font-bold uppercase font-display text-white mt-0.5">
                  {selectedPlanModal.name}
                </h3>
                <p className="text-xs text-white/60 font-mono-num">
                  {selectedPlanModal.duration} Plan • <span className="text-[#FFC515] font-bold">{selectedPlanModal.price}</span>
                  {selectedPlanModal.savings && ` (${selectedPlanModal.savings})`}
                </p>
              </div>
              <button
                onClick={() => setSelectedPlanModal(null)}
                className="text-white/60 hover:text-white p-1"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {isSubmitted ? (
              <div className="p-6 bg-[#FFC515]/10 border border-[#FFC515] text-center space-y-4 font-mono-num">
                <div className="w-10 h-10 rounded-full bg-[#FFC515] text-black flex items-center justify-center mx-auto font-bold">
                  ✓
                </div>
                <h4 className="text-base font-bold text-white uppercase">
                  APPLICATION RECEIVED!
                </h4>
                <p className="text-xs text-white/80 leading-relaxed">
                  Thank you, <strong>{clientName || 'Athlete'}</strong>. Coach Neetu will review your details and reach out within 24 hours to begin your personalized onboarding.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleDirectWhatsApp}
                    className="w-full py-3 bg-[#FFC515] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#E6AF0F]"
                  >
                    CONNECT DIRECTLY ON WHATSAPP ↗
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} className="space-y-4 font-mono-num text-xs">
                <div>
                  <label className="block text-white/60 uppercase mb-1">YOUR FULL NAME</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-[#14141a] border border-white/10 px-3 py-2.5 text-white placeholder-white/20 focus:border-[#FFC515] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/60 uppercase mb-1">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="rahul@example.com"
                    className="w-full bg-[#14141a] border border-white/10 px-3 py-2.5 text-white placeholder-white/20 focus:border-[#FFC515] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/60 uppercase mb-1">PHONE / WHATSAPP NUMBER</label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#14141a] border border-white/10 px-3 py-2.5 text-white placeholder-white/20 focus:border-[#FFC515] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/60 uppercase mb-1">PRIMARY GOAL / CURRENT CHALLENGE</label>
                  <textarea
                    rows={2}
                    value={clientGoal}
                    onChange={(e) => setClientGoal(e.target.value)}
                    placeholder="e.g. Lose 8kg belly fat, build lean muscle, fix diet consistency"
                    className="w-full bg-[#14141a] border border-white/10 p-2.5 text-white placeholder-white/20 focus:border-[#FFC515] outline-none"
                  />
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#FFC515] hover:bg-[#E6AF0F] text-black font-extrabold uppercase text-xs tracking-wider transition-colors shadow-[0_0_15px_rgba(255,197,21,0.25)]"
                  >
                    CONFIRM & SUBMIT INQUIRY
                  </button>

                  <button
                    type="button"
                    onClick={handleDirectWhatsApp}
                    className="w-full py-2.5 border border-white/20 hover:border-white/50 text-white/80 hover:text-white uppercase text-xs text-center"
                  >
                    CHAT WITH COACH NEETU ON WHATSAPP ↗
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
