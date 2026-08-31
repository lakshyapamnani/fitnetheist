import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Settings, Flame, ShieldAlert, Save, Check } from 'lucide-react';

export const AdminSettingsView: React.FC = () => {
  const { scoringRules, updateScoringRules, logAuditAction } = useAdmin();

  const [calcPoints, setCalcPoints] = useState(scoringRules.calculatorCompleted);
  const [dietPoints, setDietPoints] = useState(scoringRules.dietGenerated);
  const [workoutPoints, setWorkoutPoints] = useState(scoringRules.workoutGenerated);
  const [challengePoints, setChallengePoints] = useState(scoringRules.challengeViewed);
  const [pricingPoints, setPricingPoints] = useState(scoringRules.pricingViewed);
  const [contactPoints, setContactPoints] = useState(scoringRules.contactFormSubmitted);
  const [checkoutPoints, setCheckoutPoints] = useState(scoringRules.checkoutStarted);
  const [purchasePoints, setPurchasePoints] = useState(scoringRules.purchaseCompleted);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateScoringRules({
      calculatorCompleted: Number(calcPoints),
      dietGenerated: Number(dietPoints),
      workoutGenerated: Number(workoutPoints),
      challengeViewed: Number(challengePoints),
      pricingViewed: Number(pricingPoints),
      contactFormSubmitted: Number(contactPoints),
      checkoutStarted: Number(checkoutPoints),
      purchaseCompleted: Number(purchasePoints)
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div id="admin-settings-view" className="space-y-6 font-mono-num text-xs">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 bg-[#d8ff38]"></span>
            <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#d8ff38]">
              GLOBAL CONFIGURATION
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-display text-white">
            ADMIN & SCORING SETTINGS
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono-num mt-1">
            Calibrate algorithmic lead scoring weights, notification thresholds, and automation parameters.
          </p>
        </div>

        {savedSuccess && (
          <div className="px-3 py-2 bg-[#d8ff38] text-black font-extrabold uppercase flex items-center gap-1.5">
            <Check size={14} />
            <span>SCORING WEIGHTS CALIBRATED</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        
        {/* Lead Scoring Weights */}
        <div className="bg-zinc-950 border border-white/10 p-6 space-y-5">
          <div className="border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold uppercase text-white tracking-wider flex items-center gap-2">
              <Flame size={16} className="text-[#d8ff38]" />
              AUTOMATED LEAD SCORING MATRIX
            </h3>
            <p className="text-zinc-400 text-xs mt-0.5">
              Defines points awarded to visitor profiles as they engage with public calculators, meal planners, and checkout links.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-3 bg-zinc-900 border border-white/5 space-y-1">
              <label className="block text-zinc-400 uppercase font-bold text-[10px]">CALORIE CALCULATOR COMPLETED</label>
              <input
                type="number"
                value={calcPoints}
                onChange={(e) => setCalcPoints(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-white/10 p-2 text-white font-bold"
              />
              <span className="text-[10px] text-zinc-500 block">Default: +10 pts</span>
            </div>

            <div className="p-3 bg-zinc-900 border border-white/5 space-y-1">
              <label className="block text-zinc-400 uppercase font-bold text-[10px]">7-DAY DIET GENERATED</label>
              <input
                type="number"
                value={dietPoints}
                onChange={(e) => setDietPoints(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-white/10 p-2 text-white font-bold"
              />
              <span className="text-[10px] text-zinc-500 block">Default: +15 pts</span>
            </div>

            <div className="p-3 bg-zinc-900 border border-white/5 space-y-1">
              <label className="block text-zinc-400 uppercase font-bold text-[10px]">WORKOUT PLAN GENERATED</label>
              <input
                type="number"
                value={workoutPoints}
                onChange={(e) => setWorkoutPoints(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-white/10 p-2 text-white font-bold"
              />
              <span className="text-[10px] text-zinc-500 block">Default: +15 pts</span>
            </div>

            <div className="p-3 bg-zinc-900 border border-white/5 space-y-1">
              <label className="block text-zinc-400 uppercase font-bold text-[10px]">CHALLENGE CARD CLICKED</label>
              <input
                type="number"
                value={challengePoints}
                onChange={(e) => setChallengePoints(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-white/10 p-2 text-white font-bold"
              />
              <span className="text-[10px] text-zinc-500 block">Default: +20 pts</span>
            </div>

            <div className="p-3 bg-zinc-900 border border-white/5 space-y-1">
              <label className="block text-zinc-400 uppercase font-bold text-[10px]">CONTACT FORM SUBMISSION</label>
              <input
                type="number"
                value={contactPoints}
                onChange={(e) => setContactPoints(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-white/10 p-2 text-white font-bold"
              />
              <span className="text-[10px] text-zinc-500 block">Default: +25 pts</span>
            </div>

            <div className="p-3 bg-zinc-900 border border-white/5 space-y-1">
              <label className="block text-zinc-400 uppercase font-bold text-[10px]">PRICING TIER INSPECTED</label>
              <input
                type="number"
                value={pricingPoints}
                onChange={(e) => setPricingPoints(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-white/10 p-2 text-white font-bold"
              />
              <span className="text-[10px] text-zinc-500 block">Default: +30 pts</span>
            </div>

            <div className="p-3 bg-zinc-900 border border-white/5 space-y-1">
              <label className="block text-zinc-400 uppercase font-bold text-[10px]">CHECKOUT / ENROLL CLICKED</label>
              <input
                type="number"
                value={checkoutPoints}
                onChange={(e) => setCheckoutPoints(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-white/10 p-2 text-white font-bold"
              />
              <span className="text-[10px] text-zinc-500 block">Default: +50 pts</span>
            </div>

            <div className="p-3 bg-[#d8ff38]/10 border border-[#d8ff38]/30 space-y-1">
              <label className="block text-[#d8ff38] uppercase font-bold text-[10px]">PURCHASE / ENROLL COMPLETED</label>
              <input
                type="number"
                value={purchasePoints}
                onChange={(e) => setPurchasePoints(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-[#d8ff38]/50 p-2 text-[#d8ff38] font-bold"
              />
              <span className="text-[10px] text-zinc-400 block">Default: +100 pts (Instant Won)</span>
            </div>

          </div>
        </div>

        {/* Brand & Business Parameters */}
        <div className="bg-zinc-950 border border-white/10 p-6 space-y-4">
          <div className="border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold uppercase text-white tracking-wider flex items-center gap-2">
              <Settings size={16} className="text-[#d8ff38]" />
              BRAND & COMMUNICATION CHANNELS
            </h3>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-zinc-400 uppercase mb-1">BRAND PLATFORM NAME</label>
              <input
                type="text"
                disabled
                value="FITNETHEIST"
                className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white opacity-70"
              />
            </div>
            <div>
              <label className="block text-zinc-400 uppercase mb-1">SUPPORT WHATSAPP DESK</label>
              <input
                type="text"
                defaultValue="+91 98201 44521"
                className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-zinc-400 uppercase mb-1">OFFICIAL CONTACT EMAIL</label>
              <input
                type="email"
                defaultValue="contact@fitnetheist.com"
                className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-[#d8ff38] hover:bg-[#cbf425] text-black font-extrabold uppercase flex items-center gap-2 transition-colors shadow-[0_0_20px_rgba(216,255,56,0.2)]"
          >
            <Save size={15} />
            <span>SAVE CONFIGURATION MATRIX</span>
          </button>
        </div>

      </form>

    </div>
  );
};
