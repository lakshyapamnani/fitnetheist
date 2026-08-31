import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { useAdmin } from '../context/AdminContext';
import { HeroSection } from './HeroSection';
import { FinalCtaSection } from './FinalCtaSection';
import { TRANSFORMATIONS_DATA } from '../data/challengesData';
import { 
  Calculator, 
  Utensils, 
  Dumbbell, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  ShieldCheck, 
  Zap, 
  ChevronRight,
  UserCheck,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setActiveTab } = useApp();
  const { trackLeadEvent } = useAdmin();

  // Interactive Quick Metric Estimator State
  const [quickGoal, setQuickGoal] = useState<'FAT_LOSS' | 'MAINTENANCE' | 'MUSCLE_GAIN'>('FAT_LOSS');
  const [quickSex, setQuickSex] = useState<'MALE' | 'FEMALE'>('MALE');
  const [quickWeight, setQuickWeight] = useState<number>(75);
  const [quickExperience, setQuickExperience] = useState<'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'>('INTERMEDIATE');

  // Compute Instant Quick Protocol
  const quickEstimate = useMemo(() => {
    const bmr = quickSex === 'MALE' 
      ? 10 * quickWeight + 6.25 * 175 - 5 * 26 + 5 
      : 10 * quickWeight + 6.25 * 165 - 5 * 26 - 161;
    
    const tdee = Math.round(bmr * 1.45);
    let targetCalories = tdee;
    let proteinPerKg = 2.0;

    if (quickGoal === 'FAT_LOSS') {
      targetCalories = Math.round(tdee - 500);
      proteinPerKg = 2.2;
    } else if (quickGoal === 'MUSCLE_GAIN') {
      targetCalories = Math.round(tdee + 350);
      proteinPerKg = 2.0;
    } else {
      proteinPerKg = 1.8;
    }

    const proteinGrams = Math.round(quickWeight * proteinPerKg);
    const waterLiters = (quickWeight * 0.045).toFixed(1);
    
    let suggestedSplit = '4-Day Upper / Lower';
    if (quickExperience === 'BEGINNER') suggestedSplit = '3-Day Full Body';
    if (quickExperience === 'ADVANCED') suggestedSplit = '5-Day Push / Pull / Legs';

    return {
      tdee,
      targetCalories,
      proteinGrams,
      waterLiters,
      suggestedSplit
    };
  }, [quickGoal, quickSex, quickWeight, quickExperience]);

  const handleContactDirect = (channel: string) => {
    trackLeadEvent('CONTACT_FORM_SUBMITTED', {
      source: `HOMEPAGE_QUICK_${channel.toUpperCase()}`,
      details: `User clicked ${channel} contact channel on homepage.`
    });
    if (channel === 'instagram') {
      window.open('https://instagram.com/fitnetheist', '_blank', 'noopener,noreferrer');
    } else if (channel === 'whatsapp') {
      window.open('https://wa.me/?text=Hello%20Fitnetheist%20Team%2C%20I%20want%20to%20start%20my%20fitness%20transformation.', '_blank', 'noopener,noreferrer');
    } else if (channel === 'email') {
      window.location.href = 'mailto:contact@fitnetheist.com?subject=Fitnetheist%20Transformation%20Inquiry';
    }
  };

  // Top 3 Curated Transformations for Minimal Showcase
  const featuredTransformations = TRANSFORMATIONS_DATA.slice(0, 3);

  return (
    <div id="fitnetheist-minimal-homepage" className="w-full">
      {/* 1. CINEMATIC ATHLETIC HERO */}
      <HeroSection />

      {/* 2. THE FITNETHEIST ARCHITECTURE (Minimal 4-Pillar Scientific Overview) */}
      <section className="relative bg-[#08080a] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="border-b border-white/10 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-2 w-2 bg-[#FFC515]"></span>
                <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#FFC515]">
                  THE METHODOLOGY // ZERO GUESSWORK
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase font-display tracking-tight text-white">
                SCIENCE-DERIVED.<br />
                <span className="text-[#FFC515]">DATA-GOVERNED.</span>
              </h2>
            </div>
            <p className="text-white/70 text-xs sm:text-sm font-mono-num max-w-md">
              Most fitness programs fail because they rely on vague motivation. Fitnetheist replaces ambiguity with verified metabolic equations, periodized resistance splits, and real-time habit accountability.
            </p>
          </div>

          {/* 4 Architectural Columns */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Pillar 01 */}
            <div className="p-6 bg-[#101014] border border-white/10 flex flex-col justify-between hover:border-[#FFC515]/40 transition-colors group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-mono-num font-extrabold text-[#FFC515]">01</span>
                  <Calculator size={18} className="text-white/40 group-hover:text-[#FFC515] transition-colors" />
                </div>
                <h3 className="text-lg font-bold font-mono-num uppercase text-white mb-2">
                  CALORIC PRECISION
                </h3>
                <p className="text-xs text-white/60 font-mono-num leading-relaxed">
                  Pinpoint your BMR, TDEE, and exact caloric deficit or bulk surplus using the verified Mifflin-St Jeor formula.
                </p>
              </div>
              <button 
                onClick={() => setActiveTab('calculate')}
                className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono-num text-[#FFC515] font-bold uppercase group-hover:translate-x-1 transition-transform"
              >
                <span>OPEN CALCULATOR</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Pillar 02 */}
            <div className="p-6 bg-[#101014] border border-white/10 flex flex-col justify-between hover:border-[#FFC515]/40 transition-colors group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-mono-num font-extrabold text-[#FFC515]">02</span>
                  <Utensils size={18} className="text-white/40 group-hover:text-[#FFC515] transition-colors" />
                </div>
                <h3 className="text-lg font-bold font-mono-num uppercase text-white mb-2">
                  7-DAY NUTRITION
                </h3>
                <p className="text-xs text-white/60 font-mono-num leading-relaxed">
                  Generate customized 7-day meal protocols with exact gram weights, Smart Meal Swaps, and Indian/Global recipe parity.
                </p>
              </div>
              <button 
                onClick={() => setActiveTab('nutrition')}
                className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono-num text-[#FFC515] font-bold uppercase group-hover:translate-x-1 transition-transform"
              >
                <span>BUILD DIET PROTOCOL</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Pillar 03 */}
            <div className="p-6 bg-[#101014] border border-white/10 flex flex-col justify-between hover:border-[#FFC515]/40 transition-colors group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-mono-num font-extrabold text-[#FFC515]">03</span>
                  <Dumbbell size={18} className="text-white/40 group-hover:text-[#FFC515] transition-colors" />
                </div>
                <h3 className="text-lg font-bold font-mono-num uppercase text-white mb-2">
                  SPLIT PROGRAMMING
                </h3>
                <p className="text-xs text-white/60 font-mono-num leading-relaxed">
                  Periodized Push/Pull/Legs, Upper/Lower, and Full Body routines with equipment scaling and precise set/rep cues.
                </p>
              </div>
              <button 
                onClick={() => setActiveTab('train')}
                className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono-num text-[#FFC515] font-bold uppercase group-hover:translate-x-1 transition-transform"
              >
                <span>BUILD WORKOUT PLAN</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Pillar 04 */}
            <div className="p-6 bg-[#101014] border border-white/10 flex flex-col justify-between hover:border-[#FFC515]/40 transition-colors group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-mono-num font-extrabold text-[#FFC515]">04</span>
                  <Flame size={18} className="text-white/40 group-hover:text-[#FFC515] transition-colors" />
                </div>
                <h3 className="text-lg font-bold font-mono-num uppercase text-white mb-2">
                  STREAK TELEMETRY
                </h3>
                <p className="text-xs text-white/60 font-mono-num leading-relaxed">
                  Daily morning weight tracking, macro compliance logs, hydration metrics, and unbroken discipline streaks.
                </p>
              </div>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono-num text-[#FFC515] font-bold uppercase group-hover:translate-x-1 transition-transform"
              >
                <span>ACCESS DASHBOARD</span>
                <ChevronRight size={14} />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE QUICK-ESTIMATE METABOLIC CONSOLE (Instant Value & Actionable Insight) */}
      <section className="relative bg-[#050508] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Quick Configurator */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 bg-[#FFC515]"></span>
                <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#FFC515]">
                  INSTANT ESTIMATION ENGINE
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase font-display tracking-tight text-white">
                CALCULATE YOUR<br />
                <span className="text-[#FFC515]">METABOLIC TARGETS.</span>
              </h2>
              
              <p className="text-white/70 text-xs sm:text-sm font-mono-num">
                Configure your physical baseline below for an instant preliminary estimate. Access the full calculator for granular activity multipliers and macro breakdowns.
              </p>

              {/* Interactive Controls */}
              <div className="space-y-4 pt-2 font-mono-num text-xs">
                
                {/* Goal Selector */}
                <div>
                  <label className="block text-white/50 uppercase text-[10px] tracking-wider mb-1.5">
                    01 // PRIMARY OBJECTIVE
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'FAT_LOSS', label: 'FAT LOSS (-500 KCAL)' },
                      { id: 'MAINTENANCE', label: 'MAINTAIN' },
                      { id: 'MUSCLE_GAIN', label: 'LEAN BULK (+350 KCAL)' }
                    ].map(g => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setQuickGoal(g.id as any)}
                        className={`py-2 px-2 border text-center font-bold transition-colors ${
                          quickGoal === g.id 
                            ? 'bg-[#FFC515] text-black border-[#FFC515]' 
                            : 'bg-[#101014] text-white/70 border-white/15 hover:text-white'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Biological Sex & Experience */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/50 uppercase text-[10px] tracking-wider mb-1.5">
                      02 // BIOLOGICAL SEX
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setQuickSex('MALE')}
                        className={`py-2 border font-bold text-center transition-colors ${
                          quickSex === 'MALE' 
                            ? 'bg-white text-black border-white' 
                            : 'bg-[#101014] text-white/60 border-white/15 hover:text-white'
                        }`}
                      >
                        MALE
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuickSex('FEMALE')}
                        className={`py-2 border font-bold text-center transition-colors ${
                          quickSex === 'FEMALE' 
                            ? 'bg-white text-black border-white' 
                            : 'bg-[#101014] text-white/60 border-white/15 hover:text-white'
                        }`}
                      >
                        FEMALE
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/50 uppercase text-[10px] tracking-wider mb-1.5">
                      03 // TRAINING EXPERIENCE
                    </label>
                    <select
                      value={quickExperience}
                      onChange={(e) => setQuickExperience(e.target.value as any)}
                      className="w-full py-2 px-2 bg-[#101014] border border-white/15 text-white font-bold focus:border-[#FFC515] focus:outline-none"
                    >
                      <option value="BEGINNER">BEGINNER (0-1 YR)</option>
                      <option value="INTERMEDIATE">INTERMEDIATE (1-3 YRS)</option>
                      <option value="ADVANCED">ADVANCED (3+ YRS)</option>
                    </select>
                  </div>
                </div>

                {/* Bodyweight Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-white/50 uppercase text-[10px] tracking-wider">
                      04 // CURRENT BODYWEIGHT
                    </label>
                    <span className="text-white font-bold text-sm">
                      {quickWeight} KG / {(quickWeight * 2.20462).toFixed(1)} LBS
                    </span>
                  </div>
                  <input
                    type="range"
                    min="45"
                    max="140"
                    step="1"
                    value={quickWeight}
                    onChange={(e) => setQuickWeight(Number(e.target.value))}
                    className="w-full accent-[#FFC515] bg-[#14141a] h-2 rounded-none cursor-pointer"
                  />
                </div>

              </div>
            </div>

            {/* Right Column: Instant Live Display Card */}
            <div className="lg:col-span-6">
              <div className="border border-[#FFC515]/30 bg-[#101014] p-6 sm:p-8 space-y-6 shadow-[0_0_30px_rgba(255,197,21,0.06)] relative overflow-hidden">
                <div className="absolute top-0 right-0 px-3 py-1 bg-[#FFC515] text-black font-mono-num font-extrabold text-[10px] uppercase">
                  LIVE PROJECTION
                </div>

                <div>
                  <span className="text-xs font-mono-num text-white/50 uppercase tracking-widest block mb-1">
                    ESTIMATED DAILY CALORIE TARGET
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl sm:text-6xl font-mono-num font-extrabold text-[#FFC515] tracking-tight">
                      {quickEstimate.targetCalories.toLocaleString()}
                    </span>
                    <span className="text-lg font-mono-num font-bold text-white uppercase">
                      KCAL / DAY
                    </span>
                  </div>
                  <span className="text-[11px] font-mono-num text-white/50 block mt-1">
                    MAINTENANCE BASELINE (TDEE): ~{quickEstimate.tdee.toLocaleString()} KCAL
                  </span>
                </div>

                {/* Macro & Split Breakdown Matrix */}
                <div className="grid grid-cols-3 gap-3 border-y border-white/10 py-4 font-mono-num text-xs">
                  <div className="p-3 bg-[#14141a] border border-white/5">
                    <span className="text-[10px] text-white/40 uppercase block">DAILY PROTEIN</span>
                    <span className="text-lg font-bold text-white block mt-0.5">{quickEstimate.proteinGrams}g</span>
                    <span className="text-[9px] text-[#FFC515] uppercase">MUSCLE RETENTION</span>
                  </div>
                  <div className="p-3 bg-[#14141a] border border-white/5">
                    <span className="text-[10px] text-white/40 uppercase block">MIN. WATER</span>
                    <span className="text-lg font-bold text-white block mt-0.5">{quickEstimate.waterLiters}L</span>
                    <span className="text-[9px] text-white/50 uppercase">HYDRATION</span>
                  </div>
                  <div className="p-3 bg-[#14141a] border border-white/5">
                    <span className="text-[10px] text-white/40 uppercase block">OPTIMAL SPLIT</span>
                    <span className="text-xs font-bold text-white block mt-1 leading-tight">{quickEstimate.suggestedSplit}</span>
                  </div>
                </div>

                {/* Direct Gateway Actions */}
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('calculate')}
                    className="py-3.5 px-4 bg-[#FFC515] hover:bg-[#E6AF0F] text-black font-mono-num font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,197,21,0.25)] transition-colors"
                  >
                    <span>FULL MACRO CALCULATOR</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    onClick={() => setActiveTab('nutrition')}
                    className="py-3.5 px-4 bg-[#14141a] hover:bg-white/10 border border-white/20 text-white font-mono-num font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>GENERATE 7-DAY DIET</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. EMPIRICAL SOCIAL PROOF (Curated 3-Athlete Transformation Showcase) */}
      <section className="relative bg-[#08080a] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="border-b border-white/10 pb-8 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-2 w-2 bg-[#FFC515]"></span>
                <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#FFC515]">
                  VERIFIED OUTCOMES
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase font-display tracking-tight text-white">
                REAL PEOPLE.<br />
                <span className="text-[#FFC515]">MEASURABLE PROGRESS.</span>
              </h2>
            </div>

            <button
              onClick={() => setActiveTab('transform')}
              className="px-5 py-2.5 bg-[#14141a] hover:bg-white hover:text-black border border-white/15 text-white text-xs font-mono-num font-bold uppercase tracking-wider flex items-center gap-2 transition-colors self-start sm:self-auto"
            >
              <span>VIEW ALL TRANSFORMATIONS</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* 3 Showcase Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {featuredTransformations.map((item) => (
              <div 
                key={item.id}
                className="bg-[#101014] border border-white/10 flex flex-col justify-between hover:border-white/30 transition-all"
              >
                {/* Photo Split */}
                <div className="grid grid-cols-2 h-56 bg-[#14141a] border-b border-white/10 relative overflow-hidden">
                  <div className="relative h-full w-full border-r border-white/10">
                    <img
                      src={item.beforePhoto}
                      alt={`${item.name} Before`}
                      className="w-full h-full object-cover filter grayscale contrast-125"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/80 text-[9px] font-mono-num text-white/50 uppercase font-bold">
                      BEFORE
                    </span>
                  </div>
                  <div className="relative h-full w-full">
                    <img
                      src={item.afterPhoto}
                      alt={`${item.name} After`}
                      className="w-full h-full object-cover filter contrast-110"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-[#FFC515] text-[9px] font-mono-num text-black uppercase font-extrabold">
                      AFTER
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-base font-bold text-white font-mono-num uppercase">{item.name}, {item.age}</h4>
                      <span className="text-[10px] font-mono-num text-[#FFC515] font-bold px-2 py-0.5 bg-[#FFC515]/10 border border-[#FFC515]/30 uppercase">
                        {item.duration}
                      </span>
                    </div>
                    <p className="text-xs text-white/50 font-mono-num">
                      STRATEGY: {item.keyStrategy}
                    </p>
                  </div>

                  {/* Stat pill */}
                  <div className="p-2.5 bg-[#14141a] border border-white/5 flex items-center justify-between text-xs font-mono-num">
                    <span className="text-white/40 uppercase text-[10px]">DELTA METRIC</span>
                    <span className="text-[#FFC515] font-bold text-sm">{item.statChange}</span>
                  </div>

                  <p className="text-xs text-white/70 italic font-mono-num line-clamp-3">
                    "{item.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. COACH PROFILE & DIRECT CONNECT (Authoritative, Minimal, Informative) */}
      <section className="relative bg-[#050508] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Coach Bio */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 bg-[#FFC515]"></span>
                <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#FFC515]">
                  HEAD PERFORMANCE ARCHITECT
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase font-display tracking-tight text-white">
                COACH VIK.<br />
                <span className="text-[#FFC515]">RESULTS OVER EXCUSES.</span>
              </h2>

              <p className="text-white/70 text-xs sm:text-sm font-mono-num leading-relaxed">
                "You do not need another restrictive fad diet or confusing 3-hour workout. You need mathematical precision, authentic food portions you actually enjoy, and an unforgiving standard of daily execution."
              </p>

              <div className="grid sm:grid-cols-3 gap-3 border-y border-white/10 py-4 font-mono-num text-xs">
                <div>
                  <span className="text-white font-bold text-base block">10+ YEARS</span>
                  <span className="text-[10px] text-white/40 uppercase">COACHING EXPERTISE</span>
                </div>
                <div>
                  <span className="text-white font-bold text-base block">4,200+</span>
                  <span className="text-[10px] text-white/40 uppercase">ATHLETES MENTORED</span>
                </div>
                <div>
                  <span className="text-[#FFC515] font-bold text-base block">CSCS & CISSN</span>
                  <span className="text-[10px] text-white/40 uppercase">CERTIFIED CREDENTIALS</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveTab('coach')}
                  className="px-6 py-3 bg-[#FFC515] hover:bg-[#E6AF0F] text-black font-mono-num font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(255,197,21,0.25)]"
                >
                  <span>EXPLORE COACHING</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  onClick={() => handleContactDirect('whatsapp')}
                  className="px-6 py-3 bg-[#14141a] hover:bg-white hover:text-black border border-white/20 text-white font-mono-num font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
                >
                  <span>WHATSAPP DIRECT DESK</span>
                  <MessageSquare size={14} />
                </button>
              </div>
            </div>

            {/* Right Column: Clean Contact Desk */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-[#101014] border border-white/10 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-mono-num uppercase tracking-widest text-[#FFC515] block font-bold">
                  DIRECT ACCESS CHANNELS
                </span>
                <h3 className="text-xl font-bold font-mono-num uppercase text-white mt-1">
                  GET IN TOUCH WITH US
                </h3>
              </div>

              <div className="space-y-3 font-mono-num text-xs">
                
                <div 
                  onClick={() => handleContactDirect('instagram')}
                  className="p-3.5 bg-[#14141a] border border-white/10 hover:border-[#FFC515] cursor-pointer transition-colors flex items-center justify-between group"
                >
                  <div>
                    <span className="text-white font-bold block group-hover:text-[#FFC515] transition-colors">INSTAGRAM</span>
                    <span className="text-[11px] text-white/50">@fitnetheist // Daily training & tips</span>
                  </div>
                  <ArrowRight size={14} className="text-white/40 group-hover:text-[#FFC515] transition-colors" />
                </div>

                <div 
                  onClick={() => handleContactDirect('whatsapp')}
                  className="p-3.5 bg-[#14141a] border border-white/10 hover:border-[#FFC515] cursor-pointer transition-colors flex items-center justify-between group"
                >
                  <div>
                    <span className="text-white font-bold block group-hover:text-[#FFC515] transition-colors">WHATSAPP</span>
                    <span className="text-[11px] text-white/50">Direct coaching inquiry & assessment</span>
                  </div>
                  <ArrowRight size={14} className="text-white/40 group-hover:text-[#FFC515] transition-colors" />
                </div>

                <div 
                  onClick={() => handleContactDirect('email')}
                  className="p-3.5 bg-[#14141a] border border-white/10 hover:border-[#FFC515] cursor-pointer transition-colors flex items-center justify-between group"
                >
                  <div>
                    <span className="text-white font-bold block group-hover:text-[#FFC515] transition-colors">EMAIL DESK</span>
                    <span className="text-[11px] text-white/50">contact@fitnetheist.com</span>
                  </div>
                  <ArrowRight size={14} className="text-white/40 group-hover:text-[#FFC515] transition-colors" />
                </div>

              </div>

              <div className="pt-2 text-[11px] font-mono-num text-white/40 flex items-center justify-between border-t border-white/10">
                <span>SUPPORT RESPONSE: &lt; 2 HOURS</span>
                <span className="text-[#FFC515] font-bold">ONLINE</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. FINAL DECISIVE CALL TO ACTION */}
      <FinalCtaSection />
    </div>
  );
};
