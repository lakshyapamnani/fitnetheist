import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ActivityLevel } from '../types';
import { X, Flame, ArrowRight, Dumbbell, Target, Scale, Zap } from 'lucide-react';

export const CalorieCalculatorModal: React.FC = () => {
  const { 
    isCalorieModalOpen, 
    closeCalorieModal, 
    calculateAndSetCalories, 
    setPendingAthleteDetails, 
    openAuthModal,
    user
  } = useApp();

  const [age, setAge] = useState<number>(user?.age || 25);
  const [sex, setSex] = useState<'male' | 'female'>(user?.sex || 'male');
  const [weightKg, setWeightKg] = useState<number>(user?.weightKg || 72);
  const [heightCm, setHeightCm] = useState<number>(user?.heightCm || 175);
  const [activity, setActivity] = useState<ActivityLevel>(user?.activityLevel || 'MODERATE');
  const [goal, setGoal] = useState<'CUT' | 'MAINTAIN' | 'BULK'>('CUT');
  const [isCalculating, setIsCalculating] = useState(false);

  if (!isCalorieModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);

    try {
      // 1. Calculate Mifflin-St Jeor daily calories & macros
      const result = calculateAndSetCalories(
        Number(age),
        sex,
        Number(heightCm),
        Number(weightKg),
        activity,
        goal,
        { triggeredByUserAction: true }
      );

      // 2. Buffer the calculated blueprint in state
      setPendingAthleteDetails({
        source: 'CALORIE_CALCULATOR',
        title: 'Personalized Daily Blueprint',
        summaryText: `${result.currentTargetCalories} kcal • ${result.recommendedProteinGramsMin}g Protein • ${result.recommendedCarbsGrams}g Carbs • ${result.recommendedFatGrams}g Fat`,
        calorieResult: result,
        userMetrics: {
          age: Number(age),
          sex,
          heightCm: Number(heightCm),
          weightKg: Number(weightKg),
          activityLevel: activity,
          goal: goal === 'CUT' ? 'LOSE_WEIGHT' : goal === 'BULK' ? 'BUILD_MUSCLE' : 'MAINTAIN_WEIGHT'
        },
        timestamp: Date.now()
      });

      // 3. Close this calculator popup
      closeCalorieModal();

      // 4. Immediately prompt for login / account creation to save the targets
      const promptReason = `Targets calculated: ${result.currentTargetCalories} kcal (${result.recommendedProteinGramsMin}g Protein · ${result.recommendedCarbsGrams}g Carbs · ${result.recommendedFatGrams}g Fat). Sign in to save your targets to your profile and unlock your 7-day meal plan.`;
      
      // Open auth modal
      openAuthModal('signup', promptReason);
    } catch (err) {
      console.error('Calculation error:', err);
    } finally {
      setIsCalculating(false);
    }
  };

  const activityOptions: { level: ActivityLevel; title: string; subtitle: string }[] = [
    { level: 'SEDENTARY', title: 'SEDENTARY', subtitle: 'Desk job, minimal exercise' },
    { level: 'LIGHT', title: 'LIGHT WORKOUTS', subtitle: '1–2 workout sessions / week' },
    { level: 'MODERATE', title: 'MODERATE WORKOUTS', subtitle: '3–5 workout sessions / week' },
    { level: 'VERY_ACTIVE', title: 'HEAVY WORKOUTS', subtitle: '6–7 intense training sessions / week' },
  ];

  const goalOptions: { mode: 'CUT' | 'MAINTAIN' | 'BULK'; label: string; desc: string }[] = [
    { mode: 'CUT', label: 'FAT LOSS (CUT)', desc: '-500 kcal deficit · Preserve muscle' },
    { mode: 'MAINTAIN', label: 'MAINTENANCE', desc: 'Maintain bodyweight & fuel stamina' },
    { mode: 'BULK', label: 'LEAN BULK', desc: '+350 kcal surplus · Maximize hypertrophy' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#0b0b0e] border border-white/20 max-w-xl w-full p-5 sm:p-7 space-y-5 my-auto shadow-[0_0_50px_rgba(0,0,0,0.9)]">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#d8ff38]/10 border border-[#d8ff38]/30 text-[#d8ff38] text-[10px] font-mono-num font-bold tracking-widest uppercase">
              <Flame size={12} />
              FEATURE: CALORIE & MACRO CALCULATOR
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display uppercase text-white tracking-tight">
              CALCULATE YOUR TARGETS
            </h3>
            <p className="text-xs text-zinc-400 font-mono-num">
              Enter your biometric metrics below. We'll compute your scientific daily targets and sync them with your account.
            </p>
          </div>
          <button
            onClick={closeCalorieModal}
            className="text-zinc-400 hover:text-white p-1 transition-colors"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-mono-num text-xs">
          
          {/* Sex Selection */}
          <div>
            <label className="block text-zinc-300 uppercase mb-1.5 text-[11px] font-bold">
              BIOLOGICAL SEX
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSex('male')}
                className={`py-2 px-3 border text-center uppercase tracking-wider font-bold transition-all ${
                  sex === 'male'
                    ? 'bg-[#d8ff38] text-black border-[#d8ff38] shadow-[0_0_12px_rgba(216,255,56,0.3)]'
                    : 'bg-[#14141a] text-zinc-300 border-white/10 hover:border-white/30'
                }`}
              >
                MALE
              </button>
              <button
                type="button"
                onClick={() => setSex('female')}
                className={`py-2 px-3 border text-center uppercase tracking-wider font-bold transition-all ${
                  sex === 'female'
                    ? 'bg-[#d8ff38] text-black border-[#d8ff38] shadow-[0_0_12px_rgba(216,255,56,0.3)]'
                    : 'bg-[#14141a] text-zinc-300 border-white/10 hover:border-white/30'
                }`}
              >
                FEMALE
              </button>
            </div>
          </div>

          {/* Age, Weight, Height */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-zinc-300 uppercase mb-1 text-[11px]">
                AGE (YEARS)
              </label>
              <input
                type="number"
                required
                min={14}
                max={95}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                placeholder="25"
                className="w-full bg-[#14141a] border border-white/15 px-3 py-2.5 text-white focus:border-[#d8ff38] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-zinc-300 uppercase mb-1 text-[11px]">
                WEIGHT (KG)
              </label>
              <input
                type="number"
                required
                min={35}
                max={250}
                step={0.5}
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                placeholder="72"
                className="w-full bg-[#14141a] border border-white/15 px-3 py-2.5 text-white focus:border-[#d8ff38] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-zinc-300 uppercase mb-1 text-[11px]">
                HEIGHT (CM)
              </label>
              <input
                type="number"
                required
                min={120}
                max={230}
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                placeholder="175"
                className="w-full bg-[#14141a] border border-white/15 px-3 py-2.5 text-white focus:border-[#d8ff38] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Workout / Activity Routine */}
          <div>
            <label className="block text-zinc-300 uppercase mb-1.5 text-[11px] font-bold flex items-center justify-between">
              <span>WORKOUT / ACTIVITY LEVEL</span>
              <span className="text-[10px] text-zinc-500 font-normal">Mifflin-St Jeor TDEE multiplier</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activityOptions.map((opt) => (
                <button
                  key={opt.level}
                  type="button"
                  onClick={() => setActivity(opt.level)}
                  className={`p-2.5 text-left border transition-all ${
                    activity === opt.level
                      ? 'bg-[#d8ff38]/15 border-[#d8ff38] text-white shadow-[0_0_12px_rgba(216,255,56,0.15)]'
                      : 'bg-[#14141a] border-white/10 hover:border-white/25 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-bold text-[11px] ${activity === opt.level ? 'text-[#d8ff38]' : 'text-zinc-200'}`}>
                      {opt.title}
                    </span>
                    {activity === opt.level && <Zap size={13} className="text-[#d8ff38]" />}
                  </div>
                  <span className="block text-[10px] text-zinc-400 mt-0.5">
                    {opt.subtitle}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Fitness Goal */}
          <div>
            <label className="block text-zinc-300 uppercase mb-1.5 text-[11px] font-bold">
              PRIMARY TARGET GOAL
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {goalOptions.map((g) => (
                <button
                  key={g.mode}
                  type="button"
                  onClick={() => setGoal(g.mode)}
                  className={`p-2.5 text-left border transition-all ${
                    goal === g.mode
                      ? 'bg-[#d8ff38]/15 border-[#d8ff38] text-white shadow-[0_0_12px_rgba(216,255,56,0.15)]'
                      : 'bg-[#14141a] border-white/10 hover:border-white/25 text-zinc-400'
                  }`}
                >
                  <span className={`block font-bold text-[11px] ${goal === g.mode ? 'text-[#d8ff38]' : 'text-zinc-200'}`}>
                    {g.label}
                  </span>
                  <span className="block text-[10px] text-zinc-400 mt-0.5 leading-tight">
                    {g.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isCalculating}
              className="w-full py-3.5 bg-[#d8ff38] hover:bg-[#c9f028] text-black font-extrabold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(216,255,56,0.3)] disabled:opacity-50"
            >
              <span>{isCalculating ? 'CALCULATING TARGETS...' : 'CALCULATE TARGETS & CONTINUE'}</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>
            <p className="text-[10px] text-zinc-500 text-center mt-2">
              Next step: Sign in with Google or Email to save your targets & sync your blueprint to Firebase.
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};
