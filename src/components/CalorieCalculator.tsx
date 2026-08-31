import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useAdmin } from '../context/AdminContext';
import { ActivityLevel, CalorieResult } from '../types';
import { 
  ArrowRight, 
  ShieldAlert, 
  Check, 
  RefreshCw, 
  ChevronRight, 
  Sliders, 
  Scale, 
  Clock, 
  Droplets, 
  Heart, 
  Info,
  Calendar,
  Zap,
  TrendingDown,
  TrendingUp,
  Flame
} from 'lucide-react';

export const CalorieCalculator: React.FC = () => {
  const { user, calorieResult, calculateAndSetCalories, setActiveTab, generateAndSetDiet, generateAndSetWorkout } = useApp();
  const { trackLeadEvent, captureLead } = useAdmin();

  // Unit Toggles
  const [isMetric, setIsMetric] = useState(true);

  // Form Inputs
  const [age, setAge] = useState<number>(user?.age || 26);
  const [sex, setSex] = useState<'male' | 'female'>(user?.sex || 'male');
  const [heightCm, setHeightCm] = useState<number>(user?.heightCm || 178);
  const [weightKg, setWeightKg] = useState<number>(user?.weightKg || 78);
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(10);
  const [weightLbs, setWeightLbs] = useState<number>(172);

  // Formula & Body Fat
  const [formula, setFormula] = useState<'MIFFLIN' | 'KATCH'>('MIFFLIN');
  const [bodyFatPercent, setBodyFatPercent] = useState<number>(16);

  // Activity & Goals
  const [activity, setActivity] = useState<ActivityLevel>(user?.activityLevel || 'MODERATE');
  const [goalMode, setGoalMode] = useState<'MAINTAIN' | 'CUT' | 'BULK'>('CUT');
  const [deficitTier, setDeficitTier] = useState<number>(-20); // -25%, -20%, -15%, 0%, +10%, +15%

  // Custom Macro Sliders
  const [isCustomMacro, setIsCustomMacro] = useState<boolean>(false);
  const [customProteinPerKg, setCustomProteinPerKg] = useState<number>(2.0);
  const [customFatPercent, setCustomFatPercent] = useState<number>(25);

  // Goal Timeline Estimator
  const [targetGoalWeightKg, setTargetGoalWeightKg] = useState<number>(72);
  const [restingHeartRate, setRestingHeartRate] = useState<number>(65);

  const [result, setResult] = useState<CalorieResult | null>(calorieResult);

  // Synchronize metric/imperial conversions
  const handleUnitToggle = (metric: boolean) => {
    setIsMetric(metric);
    if (metric) {
      const totalInches = heightFeet * 12 + heightInches;
      const convertedCm = Math.round(totalInches * 2.54);
      const convertedKg = Math.round(weightLbs * 0.453592);
      setHeightCm(convertedCm);
      setWeightKg(convertedKg);
    } else {
      const totalInches = heightCm / 2.54;
      setHeightFeet(Math.floor(totalInches / 12));
      setHeightInches(Math.round(totalInches % 12));
      setWeightLbs(Math.round(weightKg * 2.20462));
    }
  };

  const getEffectiveKg = () => (isMetric ? weightKg : Math.round(weightLbs * 0.453592));
  const getEffectiveCm = () => (isMetric ? heightCm : Math.round((heightFeet * 12 + heightInches) * 2.54));

  // Compute BMR based on formula
  const computeBMR = (effKg: number, effCm: number) => {
    if (formula === 'KATCH') {
      const leanMassKg = effKg * (1 - bodyFatPercent / 100);
      return Math.round(370 + (21.6 * leanMassKg));
    }
    // Mifflin-St Jeor
    const base = (10 * effKg) + (6.25 * effCm) - (5 * age) + (sex === 'male' ? 5 : -161);
    return Math.round(base);
  };

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const effCm = getEffectiveCm();
    const effKg = getEffectiveKg();

    const calc = calculateAndSetCalories(age, sex, effCm, effKg, activity, goalMode);
    setResult(calc);

    trackLeadEvent('CALCULATOR_COMPLETED', {
      source: 'CALORIE_CALCULATOR',
      details: `Computed ${calc.currentTargetCalories} kcal (${goalMode}) for ${age}yo ${sex}, ${effKg}kg`
    });

    if (user?.email) {
      captureLead({
        name: user.name || 'Athlete Visitor',
        email: user.email,
        phone: user.phone || '+91 98000 00000',
        source: 'CALCULATOR',
        goal: goalMode === 'CUT' ? 'FAT_LOSS' : goalMode === 'BULK' ? 'MUSCLE_GAIN' : 'MAINTENANCE',
        targetCalories: calc.currentTargetCalories
      });
    }
  };

  const handleGoalSwitch = (newGoal: 'MAINTAIN' | 'CUT' | 'BULK') => {
    setGoalMode(newGoal);
    if (newGoal === 'CUT') setDeficitTier(-20);
    else if (newGoal === 'BULK') setDeficitTier(12);
    else setDeficitTier(0);

    const effCm = getEffectiveCm();
    const effKg = getEffectiveKg();
    const calc = calculateAndSetCalories(age, sex, effCm, effKg, activity, newGoal);
    setResult(calc);
  };

  // Run calculation on initial load if no result
  useEffect(() => {
    if (!result) {
      handleCalculate();
    }
  }, []);

  // Scientific Derived Calculations
  const effKg = getEffectiveKg();
  const effCm = getEffectiveCm();
  const bmr = computeBMR(effKg, effCm);

  const activityMultipliers: Record<ActivityLevel, number> = {
    SEDENTARY: 1.2,
    LIGHT: 1.375,
    MODERATE: 1.55,
    VERY_ACTIVE: 1.725,
    EXTRA_ACTIVE: 1.9
  };
  const tdee = Math.round(bmr * (activityMultipliers[activity] || 1.55));
  
  // Adjusted target calories with deficit tier
  const adjustedTargetCalories = Math.round(tdee * (1 + deficitTier / 100));
  const calorieDelta = adjustedTargetCalories - tdee;
  const weeklyRateKg = Math.round((calorieDelta * 7 / 7700) * 100) / 100;

  // Custom vs Standard Macros
  const proteinGrams = isCustomMacro 
    ? Math.round(effKg * customProteinPerKg)
    : Math.round(effKg * (goalMode === 'CUT' ? 2.2 : goalMode === 'BULK' ? 2.0 : 1.8));
  
  const fatCalories = Math.round(adjustedTargetCalories * (isCustomMacro ? customFatPercent / 100 : 0.25));
  const fatGrams = Math.round(fatCalories / 9);
  const proteinCalories = proteinGrams * 4;
  const carbCalories = Math.max(100, adjustedTargetCalories - proteinCalories - fatCalories);
  const carbGrams = Math.round(carbCalories / 4);

  // BMI Calculation
  const heightM = effCm / 100;
  const bmi = Math.round((effKg / (heightM * heightM)) * 10) / 10;
  const getBmiCategory = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-cyan-400' };
    if (val < 25.0) return { label: 'Optimal Athletic Range', color: 'text-[#d8ff38]' };
    if (val < 30.0) return { label: 'Overweight', color: 'text-amber-400' };
    return { label: 'Obese Class', color: 'text-red-400' };
  };
  const bmiInfo = getBmiCategory(bmi);

  // Ideal Body Weight Range (Devine & Robinson Formulas)
  const baseDevine = sex === 'male' 
    ? 50 + 2.3 * ((effCm / 2.54) - 60)
    : 45.5 + 2.3 * ((effCm / 2.54) - 60);
  const idealWeightMin = Math.round(baseDevine * 0.95);
  const idealWeightMax = Math.round(baseDevine * 1.05);

  // Water Hydration Calculator: 35ml per kg base + 500ml per 30m activity
  const waterTargetLiters = Math.round(((effKg * 0.035) + (activity === 'VERY_ACTIVE' || activity === 'EXTRA_ACTIVE' ? 1.0 : 0.5)) * 10) / 10;
  const waterTargetOz = Math.round(waterTargetLiters * 33.814);

  // Timeline Estimator
  const weightDifferenceKg = Math.abs(effKg - targetGoalWeightKg);
  const estimatedWeeksToGoal = weeklyRateKg !== 0 
    ? Math.max(1, Math.round(weightDifferenceKg / Math.abs(weeklyRateKg)))
    : 0;
  
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + (estimatedWeeksToGoal * 7));
  const formattedTargetDate = targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  // Heart Rate Training Zones (Tanaka formula Max HR = 208 - 0.7*age, Karvonen)
  const maxHeartRate = Math.round(208 - (0.7 * age));
  const hrReserve = maxHeartRate - restingHeartRate;
  const getZone = (intensityMin: number, intensityMax: number) => ({
    min: Math.round(restingHeartRate + (hrReserve * intensityMin)),
    max: Math.round(restingHeartRate + (hrReserve * intensityMax))
  });

  const hrZones = [
    { zone: 'Z1', name: 'Active Recovery', range: getZone(0.50, 0.60), focus: 'Metabolic waste clearance & warmup' },
    { zone: 'Z2', name: 'Aerobic Base (Fat Burn)', range: getZone(0.60, 0.70), focus: 'Mitochondrial density & peak lipolysis' },
    { zone: 'Z3', name: 'Aerobic Tempo', range: getZone(0.70, 0.80), focus: 'Lactate threshold & cardio power' },
    { zone: 'Z4', name: 'Anaerobic Threshold', range: getZone(0.80, 0.90), focus: 'High-intensity output & VO2 pace' },
    { zone: 'Z5', name: 'Neuromuscular / VO2 Max', range: getZone(0.90, 1.00), focus: 'All-out sprints & maximum force' },
  ];

  const handleFeedToDietGenerator = () => {
    generateAndSetDiet(
      adjustedTargetCalories,
      user?.dietType || 'NON-VEGETARIAN',
      user?.cuisine || 'INDIAN_INTERNATIONAL',
      user?.mealsPerDay || 4
    );
    setActiveTab('nutrition');
  };

  const handleFeedToWorkout = () => {
    generateAndSetWorkout(
      goalMode === 'CUT' ? 'LOSE_WEIGHT' : goalMode === 'BULK' ? 'BUILD_MUSCLE' : 'MAINTAIN',
      'INTERMEDIATE',
      'FULL_GYM',
      4,
      45
    );
    setActiveTab('train');
  };

  return (
    <div id="calorie-calculator-page" className="min-h-screen bg-[#08080a] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title Section */}
        <div className="border-b border-white/10 pb-6 mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="h-2 w-2 bg-[#d8ff38]"></span>
              <span className="text-[11px] sm:text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#d8ff38]">
                SCIENTIFIC ENERGY ENGINE // 01
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight font-display leading-[1.05]">
              CALORIE & MACRO CALCULATOR
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl mt-2 font-mono-num leading-relaxed">
              Mifflin-St Jeor & Katch-McArdle metabolic models. Real-time macro balancing, deficit velocity, timeline projections, and cardiovascular training zones.
            </p>
          </div>

          {/* Unit Toggle */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-zinc-900 border border-white/10 w-full sm:w-auto font-mono-num text-xs">
            <button
              onClick={() => handleUnitToggle(true)}
              className={`py-2 px-3 sm:px-4 sm:py-1.5 uppercase font-bold text-center transition-colors mobile-tap-active ${
                isMetric ? 'bg-[#d8ff38] text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              METRIC (KG / CM)
            </button>
            <button
              onClick={() => handleUnitToggle(false)}
              className={`py-2 px-3 sm:px-4 sm:py-1.5 uppercase font-bold text-center transition-colors mobile-tap-active ${
                !isMetric ? 'bg-[#d8ff38] text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              IMPERIAL (LBS / FT)
            </button>
          </div>
        </div>

        {/* Main Grid: Form Inputs (Left) & Results Screen (Right) */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Inputs Module */}
          <form 
            onSubmit={handleCalculate}
            className="lg:col-span-6 bg-zinc-950 border border-white/10 p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4">
              <h2 className="text-xs sm:text-sm font-mono-num font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sliders size={16} className="text-[#d8ff38]" />
                <span>ATHLETE BIOMETRIC PARAMETERS</span>
              </h2>
              <span className="text-[10px] sm:text-[11px] font-mono-num text-zinc-500">ACCURACY ENGINE</span>
            </div>

            {/* Formula Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[11px] sm:text-xs font-mono-num text-zinc-400 uppercase tracking-wider">
                  METABOLIC FORMULA
                </label>
                <span className="text-[10px] font-mono-num text-zinc-500">
                  {formula === 'KATCH' ? 'LEAN BODY MASS' : 'MIFFLIN STANDARD'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormula('MIFFLIN')}
                  className={`py-2 px-2.5 sm:px-3 text-xs font-mono-num font-bold uppercase border transition-all text-left mobile-tap-active ${
                    formula === 'MIFFLIN' 
                      ? 'border-[#d8ff38] bg-[#d8ff38]/10 text-white' 
                      : 'border-zinc-800 text-zinc-400 hover:border-zinc-700 bg-zinc-900/30'
                  }`}
                >
                  <span className="block text-white text-[11px] sm:text-xs truncate">MIFFLIN-ST JEOR</span>
                  <span className="text-[9px] sm:text-[10px] text-zinc-500 font-normal block truncate">Standard Biometrics</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormula('KATCH')}
                  className={`py-2 px-2.5 sm:px-3 text-xs font-mono-num font-bold uppercase border transition-all text-left mobile-tap-active ${
                    formula === 'KATCH' 
                      ? 'border-[#d8ff38] bg-[#d8ff38]/10 text-white' 
                      : 'border-zinc-800 text-zinc-400 hover:border-zinc-700 bg-zinc-900/30'
                  }`}
                >
                  <span className="block text-white text-[11px] sm:text-xs truncate">KATCH-MCARDLE</span>
                  <span className="text-[9px] sm:text-[10px] text-zinc-500 font-normal block truncate">Requires Body Fat %</span>
                </button>
              </div>
            </div>

            {/* Sex & Age */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-mono-num text-zinc-400 uppercase tracking-wider mb-1.5">
                  BIOLOGICAL SEX
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSex('male')}
                    className={`py-2.5 text-xs font-mono-num font-bold uppercase border transition-all mobile-tap-active ${
                      sex === 'male' 
                        ? 'bg-white text-black border-white' 
                        : 'border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    MALE
                  </button>
                  <button
                    type="button"
                    onClick={() => setSex('female')}
                    className={`py-2.5 text-xs font-mono-num font-bold uppercase border transition-all mobile-tap-active ${
                      sex === 'female' 
                        ? 'bg-white text-black border-white' 
                        : 'border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    FEMALE
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="input-age" className="block text-[11px] sm:text-xs font-mono-num text-zinc-400 uppercase tracking-wider mb-1.5">
                  AGE (YEARS)
                </label>
                <input
                  id="input-age"
                  type="number"
                  min="14"
                  max="90"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 px-4 py-2.5 text-white font-mono-num text-base sm:text-sm focus:border-[#d8ff38] focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Height & Weight */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {isMetric ? (
                <div>
                  <label htmlFor="input-height-cm" className="block text-[11px] sm:text-xs font-mono-num text-zinc-400 uppercase tracking-wider mb-1.5">
                    HEIGHT (CM)
                  </label>
                  <input
                    id="input-height-cm"
                    type="number"
                    min="100"
                    max="230"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 px-4 py-2.5 text-white font-mono-num text-base sm:text-sm focus:border-[#d8ff38] focus:outline-none"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-[11px] sm:text-xs font-mono-num text-zinc-400 uppercase tracking-wider mb-1.5">
                    HEIGHT (FT / IN)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      min="3"
                      max="7"
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(Number(e.target.value))}
                      placeholder="Ft"
                      className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2.5 text-white font-mono-num text-base sm:text-sm focus:border-[#d8ff38] focus:outline-none"
                    />
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={heightInches}
                      onChange={(e) => setHeightInches(Number(e.target.value))}
                      placeholder="In"
                      className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2.5 text-white font-mono-num text-base sm:text-sm focus:border-[#d8ff38] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {isMetric ? (
                <div>
                  <label htmlFor="input-weight-kg" className="block text-[11px] sm:text-xs font-mono-num text-zinc-400 uppercase tracking-wider mb-1.5">
                    WEIGHT (KG)
                  </label>
                  <input
                    id="input-weight-kg"
                    type="number"
                    min="35"
                    max="250"
                    step="0.5"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 px-4 py-2.5 text-white font-mono-num text-base sm:text-sm focus:border-[#d8ff38] focus:outline-none"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="input-weight-lbs" className="block text-[11px] sm:text-xs font-mono-num text-zinc-400 uppercase tracking-wider mb-1.5">
                    WEIGHT (LBS)
                  </label>
                  <input
                    id="input-weight-lbs"
                    type="number"
                    min="80"
                    max="500"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 px-4 py-2.5 text-white font-mono-num text-base sm:text-sm focus:border-[#d8ff38] focus:outline-none"
                    required
                  />
                </div>
              )}
            </div>

            {/* Optional Body Fat % & Resting HR */}
            <div className="grid grid-cols-2 gap-4 p-3 bg-zinc-900/30 border border-white/5">
              <div>
                <label className="block text-xs font-mono-num text-zinc-400 uppercase tracking-wider mb-1">
                  EST. BODY FAT % {formula === 'KATCH' && <span className="text-[#d8ff38]">*</span>}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="4"
                    max="50"
                    step="0.5"
                    value={bodyFatPercent}
                    onChange={(e) => setBodyFatPercent(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-white font-mono-num text-sm focus:border-[#d8ff38] focus:outline-none"
                  />
                  <span className="text-xs font-mono-num text-zinc-400">%</span>
                </div>
                <span className="text-[10px] font-mono-num text-zinc-500 block mt-1">
                  Lean Mass: {Math.round(effKg * (1 - bodyFatPercent / 100) * 10) / 10} kg
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono-num text-zinc-400 uppercase tracking-wider mb-1">
                  RESTING HEART RATE
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="40"
                    max="110"
                    value={restingHeartRate}
                    onChange={(e) => setRestingHeartRate(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-white font-mono-num text-sm focus:border-[#d8ff38] focus:outline-none"
                  />
                  <span className="text-xs font-mono-num text-zinc-400">BPM</span>
                </div>
                <span className="text-[10px] font-mono-num text-zinc-500 block mt-1">
                  For cardio zones
                </span>
              </div>
            </div>

            {/* Activity Level Selector */}
            <div>
              <label className="block text-xs font-mono-num text-zinc-400 uppercase tracking-wider mb-2">
                ACTIVITY LEVEL (TDEE MULTIPLIER)
              </label>
              <div className="space-y-2">
                {[
                  { id: 'SEDENTARY', label: 'SEDENTARY', desc: 'Desk job, minimal to no deliberate physical exercise (×1.2)' },
                  { id: 'LIGHT', label: 'LIGHTLY ACTIVE', desc: 'Light training or walking 1–3 days per week (×1.375)' },
                  { id: 'MODERATE', label: 'MODERATELY ACTIVE', desc: 'Consistent resistance or cardio training 3–5 days per week (×1.55)' },
                  { id: 'VERY_ACTIVE', label: 'VERY ACTIVE', desc: 'Hard athletic training / sports 6–7 days per week (×1.725)' },
                  { id: 'EXTRA_ACTIVE', label: 'EXTREMELY ACTIVE', desc: 'Heavy physical labor + rigorous daily athletics (×1.9)' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActivity(item.id as ActivityLevel)}
                    className={`w-full text-left p-3 border transition-all flex items-start justify-between ${
                      activity === item.id 
                        ? 'border-[#d8ff38] bg-[#d8ff38]/5 text-white' 
                        : 'border-zinc-800/80 bg-zinc-900/30 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <span className={`text-xs font-mono-num font-bold uppercase block ${activity === item.id ? 'text-[#d8ff38]' : 'text-zinc-200'}`}>
                        {item.label}
                      </span>
                      <span className="text-[11px] text-zinc-400 block mt-0.5 leading-tight">{item.desc}</span>
                    </div>
                    {activity === item.id && (
                      <span className="h-2 w-2 bg-[#d8ff38] mt-1 shrink-0"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Calculate Button */}
            <button
              id="calc-submit-button"
              type="submit"
              className="w-full py-4 bg-[#d8ff38] hover:bg-[#c9f028] text-black font-mono-num font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all glow-accent-subtle"
            >
              <span>COMPUTE TARGET METRICS</span>
              <RefreshCw size={16} />
            </button>
          </form>

          {/* Results Screen Module */}
          <div className="lg:col-span-6 space-y-6">
            
            {result ? (
              <div className="bg-zinc-950 border border-white/15 p-6 sm:p-8 space-y-6 relative overflow-hidden">
                
                {/* Atmospheric glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#d8ff38]/10 rounded-full blur-[80px] pointer-events-none" />

                {/* Instant Goal Switcher Header */}
                <div className="border-b border-white/10 pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono-num uppercase tracking-widest text-zinc-400">
                      INTERACTIVE TARGET SELECTION
                    </span>
                    <span className="text-[11px] font-mono-num text-[#d8ff38] font-bold">
                      LIVE SWITCH
                    </span>
                  </div>

                  {/* Goal Mode Buttons: MAINTAIN, CUT, BULK */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => handleGoalSwitch('CUT')}
                      className={`py-2.5 px-2 text-xs font-mono-num font-bold uppercase border transition-all text-center ${
                        goalMode === 'CUT'
                          ? 'bg-[#d8ff38] text-black border-[#d8ff38]'
                          : 'border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 bg-zinc-900/40'
                      }`}
                    >
                      FAT LOSS (CUT)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleGoalSwitch('MAINTAIN')}
                      className={`py-2.5 px-2 text-xs font-mono-num font-bold uppercase border transition-all text-center ${
                        goalMode === 'MAINTAIN'
                          ? 'bg-[#d8ff38] text-black border-[#d8ff38]'
                          : 'border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 bg-zinc-900/40'
                      }`}
                    >
                      MAINTAIN
                    </button>
                    <button
                      type="button"
                      onClick={() => handleGoalSwitch('BULK')}
                      className={`py-2.5 px-2 text-xs font-mono-num font-bold uppercase border transition-all text-center ${
                        goalMode === 'BULK'
                          ? 'bg-[#d8ff38] text-black border-[#d8ff38]'
                          : 'border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 bg-zinc-900/40'
                      }`}
                    >
                      SURPLUS (BULK)
                    </button>
                  </div>

                  {/* Granular Deficit / Surplus Slider */}
                  <div className="p-3 bg-zinc-900/40 border border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono-num">
                      <span className="text-zinc-400 uppercase">CALORIC ADJUSTMENT TIER</span>
                      <span className={`font-bold ${deficitTier < 0 ? 'text-amber-400' : deficitTier > 0 ? 'text-emerald-400' : 'text-white'}`}>
                        {deficitTier > 0 ? `+${deficitTier}% (Surplus)` : deficitTier < 0 ? `${deficitTier}% (Deficit)` : '0% (Equilibrium)'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-30"
                      max="25"
                      step="5"
                      value={deficitTier}
                      onChange={(e) => setDeficitTier(Number(e.target.value))}
                      className="w-full accent-[#d8ff38] bg-zinc-800 h-1.5 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono-num text-zinc-500">
                      <span>-30% AGGRESSIVE CUT</span>
                      <span>MAINTENANCE</span>
                      <span>+25% HYPERTROPHY</span>
                    </div>
                  </div>
                </div>

                {/* Primary Daily Target Display */}
                <div className="p-6 bg-[#0c0c0f] border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono-num uppercase tracking-[0.25em] text-zinc-400">
                      YOUR DAILY TARGET CALORIES
                    </span>
                    <span className={`text-xs font-mono-num font-bold px-2 py-0.5 uppercase ${
                      deficitTier < 0 ? 'bg-amber-950/80 text-amber-400 border border-amber-800/40' :
                      deficitTier > 0 ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/40' :
                      'bg-zinc-800 text-zinc-200'
                    }`}>
                      {deficitTier < 0 ? 'FAT LOSS DEFICIT' : deficitTier > 0 ? 'CONTROLLED SURPLUS' : 'PEAK EQUILIBRIUM'}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-3 my-2">
                    <span className="text-5xl sm:text-6xl font-mono-num font-extrabold text-white tracking-tight">
                      {adjustedTargetCalories.toLocaleString()}
                    </span>
                    <span className="text-xl font-mono-num font-bold text-[#d8ff38]">
                      KCAL / DAY
                    </span>
                  </div>

                  {adjustedTargetCalories < (sex === 'male' ? 1500 : 1200) && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-amber-400 font-mono-num bg-amber-950/40 border border-amber-800/40 p-2">
                      <ShieldAlert size={14} className="shrink-0" />
                      <span>Warning: Below clinical floor ({sex === 'male' ? '1500' : '1200'} kcal). Exercise caution.</span>
                    </div>
                  )}
                </div>

                {/* Breakdown Comparison Metrics */}
                <div className="grid grid-cols-4 gap-2 font-mono-num text-center">
                  <div className="border border-white/10 p-2.5 bg-zinc-900/40">
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider block">BMR</span>
                    <span className="text-base font-bold text-white block mt-0.5">{bmr}</span>
                    <span className="text-[9px] text-zinc-400">KCAL</span>
                  </div>
                  <div className="border border-white/10 p-2.5 bg-zinc-900/40">
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider block">TDEE</span>
                    <span className="text-base font-bold text-white block mt-0.5">{tdee}</span>
                    <span className="text-[9px] text-zinc-400">KCAL</span>
                  </div>
                  <div className="border border-white/10 p-2.5 bg-zinc-900/40">
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider block">NET DELTA</span>
                    <span className={`text-base font-bold block mt-0.5 ${calorieDelta < 0 ? 'text-amber-400' : calorieDelta > 0 ? 'text-emerald-400' : 'text-zinc-400'}`}>
                      {calorieDelta > 0 ? `+${calorieDelta}` : calorieDelta}
                    </span>
                    <span className="text-[9px] text-zinc-400">KCAL / DAY</span>
                  </div>
                  <div className="border border-white/10 p-2.5 bg-zinc-900/40">
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider block">EST. RATE</span>
                    <span className="text-base font-bold text-white block mt-0.5">
                      {weeklyRateKg > 0 ? `+${weeklyRateKg}` : weeklyRateKg}
                    </span>
                    <span className="text-[9px] text-zinc-400">KG / WK</span>
                  </div>
                </div>

                {/* Macronutrient Distribution Bar & Targets */}
                <div className="border border-white/10 p-4 bg-zinc-900/30 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono-num">
                    <span className="text-zinc-300 font-bold uppercase">TARGET MACRONUTRIENT DISTRIBUTION</span>
                    <button
                      type="button"
                      onClick={() => setIsCustomMacro(!isCustomMacro)}
                      className="text-[#d8ff38] text-[11px] underline"
                    >
                      {isCustomMacro ? 'RESET TO DEFAULT' : 'CUSTOMIZE RATIOS'}
                    </button>
                  </div>

                  {isCustomMacro && (
                    <div className="p-3 bg-zinc-950 border border-white/10 space-y-3 font-mono-num text-xs">
                      <div>
                        <div className="flex justify-between text-zinc-400 mb-1">
                          <span>PROTEIN MULTIPLIER: {customProteinPerKg}g / kg</span>
                          <span className="text-[#d8ff38] font-bold">{proteinGrams}g</span>
                        </div>
                        <input
                          type="range"
                          min="1.4"
                          max="2.8"
                          step="0.1"
                          value={customProteinPerKg}
                          onChange={(e) => setCustomProteinPerKg(Number(e.target.value))}
                          className="w-full accent-[#d8ff38]"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-zinc-400 mb-1">
                          <span>FAT SHARE: {customFatPercent}% OF KCAL</span>
                          <span className="text-white font-bold">{fatGrams}g</span>
                        </div>
                        <input
                          type="range"
                          min="15"
                          max="40"
                          step="1"
                          value={customFatPercent}
                          onChange={(e) => setCustomFatPercent(Number(e.target.value))}
                          className="w-full accent-[#d8ff38]"
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2 text-center font-mono-num">
                    <div className="p-2.5 border border-white/10 bg-zinc-950">
                      <span className="text-[10px] text-zinc-400 uppercase block">PROTEIN (4 KCAL/G)</span>
                      <span className="text-lg font-bold text-[#d8ff38] block mt-0.5">
                        {proteinGrams}g
                      </span>
                      <span className="text-[10px] text-zinc-500 block">{Math.round((proteinCalories / adjustedTargetCalories) * 100)}% ({proteinCalories} kcal)</span>
                    </div>

                    <div className="p-2.5 border border-white/10 bg-zinc-950">
                      <span className="text-[10px] text-zinc-400 uppercase block">CARBS (4 KCAL/G)</span>
                      <span className="text-lg font-bold text-white block mt-0.5">
                        {carbGrams}g
                      </span>
                      <span className="text-[10px] text-zinc-500 block">{Math.round((carbCalories / adjustedTargetCalories) * 100)}% ({carbCalories} kcal)</span>
                    </div>

                    <div className="p-2.5 border border-white/10 bg-zinc-950">
                      <span className="text-[10px] text-zinc-400 uppercase block">FATS (9 KCAL/G)</span>
                      <span className="text-lg font-bold text-white block mt-0.5">
                        {fatGrams}g
                      </span>
                      <span className="text-[10px] text-zinc-500 block">{Math.round((fatCalories / adjustedTargetCalories) * 100)}% ({fatCalories} kcal)</span>
                    </div>
                  </div>
                </div>

                {/* Computational Addons: Timeline Estimator & Biometrics Matrix */}
                <div className="border border-white/10 p-4 bg-zinc-900/30 space-y-4 font-mono-num">
                  <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                    <span className="text-zinc-300 font-bold uppercase flex items-center gap-2">
                      <Calendar size={14} className="text-[#d8ff38]" />
                      GOAL TIMELINE ESTIMATOR
                    </span>
                    <span className="text-zinc-500 text-[10px]">REALISTIC TRAJECTORY</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <label className="block text-[10px] text-zinc-400 uppercase mb-1">TARGET GOAL WEIGHT</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={targetGoalWeightKg}
                          onChange={(e) => setTargetGoalWeightKg(Number(e.target.value))}
                          className="w-full bg-zinc-950 border border-zinc-800 px-3 py-1 text-white text-xs"
                        />
                        <span className="text-xs text-zinc-400">KG</span>
                      </div>
                    </div>

                    <div className="flex-1 p-2.5 bg-zinc-950 border border-white/10 text-center">
                      <span className="text-[10px] text-zinc-500 uppercase block">TIME TO GOAL</span>
                      <span className="text-sm font-bold text-[#d8ff38] block">
                        {weeklyRateKg !== 0 ? `~${estimatedWeeksToGoal} WEEKS` : 'EQUILIBRIUM'}
                      </span>
                      <span className="text-[9px] text-zinc-400 block">{weeklyRateKg !== 0 ? `By ${formattedTargetDate}` : 'Stable weight'}</span>
                    </div>
                  </div>
                </div>

                {/* Additional Clinical Biometrics: BMI & Water Requirement */}
                <div className="grid grid-cols-2 gap-3 font-mono-num text-xs">
                  <div className="p-3 bg-zinc-900/40 border border-white/10">
                    <div className="flex items-center justify-between text-zinc-500 text-[10px] uppercase mb-1">
                      <span>BMI SCORE</span>
                      <Scale size={12} className="text-[#d8ff38]" />
                    </div>
                    <span className="text-xl font-bold text-white block">{bmi}</span>
                    <span className={`text-[10px] font-bold block ${bmiInfo.color}`}>{bmiInfo.label}</span>
                    <span className="text-[9px] text-zinc-500 block mt-1">Ideal Weight: {idealWeightMin}–{idealWeightMax} kg</span>
                  </div>

                  <div className="p-3 bg-zinc-900/40 border border-white/10">
                    <div className="flex items-center justify-between text-zinc-500 text-[10px] uppercase mb-1">
                      <span>DAILY HYDRATION</span>
                      <Droplets size={12} className="text-cyan-400" />
                    </div>
                    <span className="text-xl font-bold text-cyan-400 block">{waterTargetLiters} L</span>
                    <span className="text-[10px] text-zinc-400 block">({waterTargetOz} FL OZ)</span>
                    <span className="text-[9px] text-zinc-500 block mt-1">Adjusted for activity & weight</span>
                  </div>
                </div>

                {/* Target Heart Rate Training Zones (Karvonen) */}
                <div className="p-4 bg-zinc-900/30 border border-white/10 space-y-2 font-mono-num">
                  <div className="flex items-center justify-between text-xs text-zinc-300">
                    <span className="font-bold uppercase flex items-center gap-1.5">
                      <Heart size={13} className="text-red-400" />
                      CARDIO TRAINING HEART RATE ZONES (MAX HR: {maxHeartRate} BPM)
                    </span>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    {hrZones.map(z => (
                      <div key={z.zone} className="flex items-center justify-between text-[11px] p-1.5 bg-zinc-950 border border-white/5">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-zinc-800 text-[9px] text-white font-bold">{z.zone}</span>
                          <span className="text-zinc-300 font-bold">{z.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[#d8ff38] font-bold">{z.range.min} - {z.range.max} BPM</span>
                          <span className="text-[9px] text-zinc-500 block">{z.focus}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action Hub */}
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  <button
                    id="calc-feed-diet-button"
                    onClick={handleFeedToDietGenerator}
                    className="py-3.5 bg-white hover:bg-zinc-200 text-black font-mono-num font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>FEED TO 7-DAY DIET GENERATOR</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    id="calc-feed-workout-button"
                    onClick={handleFeedToWorkout}
                    className="py-3.5 bg-[#d8ff38] hover:bg-[#cbf425] text-black font-mono-num font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>FEED TO WORKOUT PLANNER</span>
                    <Zap size={14} />
                  </button>
                </div>

              </div>
            ) : (
              <div className="border border-dashed border-zinc-800 p-12 text-center text-zinc-500 font-mono-num text-sm">
                Enter your biometrics and click compute to unlock your performance calorie matrix.
              </div>
            )}

            {/* Scientific Medical / Health Disclaimer */}
            <div className="border border-white/10 bg-zinc-950/60 p-5 text-xs text-zinc-400 leading-relaxed font-mono-num">
              <p className="font-bold text-zinc-300 uppercase tracking-wider mb-1 flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-[#d8ff38]"></span>
                CLINICAL METHODOLOGY & HEALTH SAFEGUARDS
              </p>
              <p>
                Calculations are derived from the Mifflin-St Jeor and Katch-McArdle mathematical models. Actual metabolic adaptation fluctuates based on genetics, hormonal health, non-exercise activity thermogenesis (NEAT), and training density. Fitnetheist enforces a minimum threshold to safeguard against metabolic downregulation.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
