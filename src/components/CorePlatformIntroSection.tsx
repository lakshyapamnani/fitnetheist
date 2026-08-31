import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight } from 'lucide-react';

export const CorePlatformIntroSection: React.FC = () => {
  const { setActiveTab } = useApp();
  
  // Interactive / subtle counter for numeric display
  const [animatedNumber, setAnimatedNumber] = useState(2050);

  return (
    <section 
      id="core-platform-intro-section"
      className="relative bg-[#08080a] text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="border-b border-white/10 pb-12 mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 bg-[#d8ff38]"></span>
            <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#d8ff38]">
              03 // CORE PLATFORM ARCHITECTURE
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight leading-[0.95] font-display text-white max-w-4xl">
            EVERYTHING YOU NEED<br />
            <span className="text-zinc-400">TO TRANSFORM.</span>
          </h2>
        </div>

        {/* 4 Large Editorial Numbered Sections */}
        <div className="space-y-12">
          
          {/* 01 — CALCULATE */}
          <div className="border border-white/10 bg-zinc-950 grid lg:grid-cols-12 transition-all hover:border-white/25">
            {/* Left Col: Number & Title */}
            <div className="lg:col-span-6 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between bg-[#0b0b0e]">
              <div>
                <div className="flex items-baseline justify-between mb-6">
                  <span className="text-6xl sm:text-8xl font-mono-num font-extrabold text-[#d8ff38] leading-none">
                    01
                  </span>
                  <span className="text-xs font-mono-num text-zinc-500 uppercase tracking-widest">
                    METABOLIC ENGINE
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold uppercase font-display tracking-tight text-white mb-2">
                  CALCULATE
                </h3>
                <p className="text-lg font-mono-num text-[#d8ff38] font-bold uppercase tracking-wider mb-4">
                  KNOW YOUR NUMBERS.
                </p>
                <p className="text-zinc-400 text-sm font-mono-num leading-relaxed">
                  Eliminate guesswork with mathematically derived metabolic calculations. Calculate your exact BMR, Maintenance baseline, Deficit target for fat loss, Bulk surplus for muscle gain, and high-protein requirements.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10">
                <button
                  onClick={() => setActiveTab('calculate')}
                  className="px-6 py-3.5 bg-[#d8ff38] hover:bg-[#cbf425] text-black font-mono-num font-bold text-xs uppercase tracking-wider flex items-center gap-3 transition-colors"
                >
                  <span>CALCULATE YOUR CALORIES</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Right Col: Large Numeric Typography & Highlights */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between bg-zinc-950/60">
              <div className="space-y-6">
                {/* Large Display Numeric Typography */}
                <div className="border border-white/10 p-6 sm:p-8 bg-[#09090b]">
                  <span className="text-xs font-mono-num text-zinc-400 uppercase tracking-widest block mb-2">
                    DAILY TARGET CALCULATION
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl sm:text-7xl font-mono-num font-extrabold text-white tracking-tight">
                      {animatedNumber.toLocaleString()}
                    </span>
                    <span className="text-lg sm:text-xl font-mono-num text-[#d8ff38] font-bold uppercase">
                      KCAL / DAY
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-xs font-mono-num text-zinc-500">
                    <button 
                      onClick={() => setAnimatedNumber(1850)}
                      className={`px-2 py-1 border ${animatedNumber === 1850 ? 'border-[#d8ff38] text-[#d8ff38]' : 'border-zinc-800 text-zinc-400'}`}
                    >
                      CUT 1,850
                    </button>
                    <button 
                      onClick={() => setAnimatedNumber(2050)}
                      className={`px-2 py-1 border ${animatedNumber === 2050 ? 'border-[#d8ff38] text-[#d8ff38]' : 'border-zinc-800 text-zinc-400'}`}
                    >
                      TARGET 2,050
                    </button>
                    <button 
                      onClick={() => setAnimatedNumber(2550)}
                      className={`px-2 py-1 border ${animatedNumber === 2550 ? 'border-[#d8ff38] text-[#d8ff38]' : 'border-zinc-800 text-zinc-400'}`}
                    >
                      MAINTAIN 2,550
                    </button>
                    <button 
                      onClick={() => setAnimatedNumber(2850)}
                      className={`px-2 py-1 border ${animatedNumber === 2850 ? 'border-[#d8ff38] text-[#d8ff38]' : 'border-zinc-800 text-zinc-400'}`}
                    >
                      BULK 2,850
                    </button>
                  </div>
                </div>

                {/* Calculation Matrix */}
                <div className="grid grid-cols-2 gap-3 font-mono-num text-xs">
                  <div className="p-3 bg-zinc-900/30 border border-white/5">
                    <span className="text-zinc-500 block text-[10px] uppercase">EQUATION</span>
                    <span className="text-white font-bold">Mifflin-St Jeor</span>
                  </div>
                  <div className="p-3 bg-zinc-900/30 border border-white/5">
                    <span className="text-zinc-500 block text-[10px] uppercase">PROTEIN RATIO</span>
                    <span className="text-[#d8ff38] font-bold">1.8g - 2.2g / kg</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-mono-num text-zinc-500 pt-6 border-t border-white/10 flex justify-between">
                <span>FORMULA: MSJ EQUATION</span>
                <span className="text-[#d8ff38]">SAFETY PROTOCOLS ENABLED</span>
              </div>
            </div>
          </div>

          {/* 02 — EAT */}
          <div className="border border-white/10 bg-zinc-950 grid lg:grid-cols-12 transition-all hover:border-white/25">
            {/* Left Col: Number & Title */}
            <div className="lg:col-span-6 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between bg-[#0b0b0e]">
              <div>
                <div className="flex items-baseline justify-between mb-6">
                  <span className="text-6xl sm:text-8xl font-mono-num font-extrabold text-[#d8ff38] leading-none">
                    02
                  </span>
                  <span className="text-xs font-mono-num text-zinc-500 uppercase tracking-widest">
                    NUTRITION GENERATOR
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold uppercase font-display tracking-tight text-white mb-2">
                  EAT
                </h3>
                <p className="text-lg font-mono-num text-[#d8ff38] font-bold uppercase tracking-wider mb-4">
                  KNOW WHAT TO EAT.
                </p>
                <p className="text-zinc-400 text-sm font-mono-num leading-relaxed">
                  Generate customized, verified 7-day diet protocols tailored to your exact caloric threshold, lifestyle preferences, allergies, and regional cuisine. Built with authentic portion sizing and macro parity.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10">
                <button
                  onClick={() => setActiveTab('nutrition')}
                  className="px-6 py-3.5 bg-[#d8ff38] hover:bg-[#cbf425] text-black font-mono-num font-bold text-xs uppercase tracking-wider flex items-center gap-3 transition-colors"
                >
                  <span>BUILD MY DIET</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Right Col: Dietary Capabilities */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between bg-zinc-950/60">
              <div className="space-y-4">
                
                {/* 3 Core Diet Types */}
                <div>
                  <span className="text-xs font-mono-num text-zinc-400 uppercase tracking-widest block mb-2">
                    SUPPORTED DIETARY ARCHITECTURES
                  </span>
                  <div className="grid grid-cols-3 gap-2 font-mono-num text-xs">
                    <div className="p-3 bg-zinc-900 border border-white/10 text-center font-bold text-white">
                      VEGETARIAN
                    </div>
                    <div className="p-3 bg-zinc-900 border border-white/10 text-center font-bold text-[#d8ff38]">
                      NON-VEGETARIAN
                    </div>
                    <div className="p-3 bg-zinc-900 border border-white/10 text-center font-bold text-white">
                      VEGAN
                    </div>
                  </div>
                </div>

                {/* Granular Parameters */}
                <div className="p-4 bg-[#09090b] border border-white/10 font-mono-num text-xs space-y-2">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
                    CUSTOMIZATION PIPELINES
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-zinc-300">
                    <div>• Exact Calorie Target</div>
                    <div>• Target Goal</div>
                    <div>• Cuisine (Indian / Global)</div>
                    <div>• 3 to 6 Meals / Day</div>
                    <div>• Food Preferences</div>
                    <div>• Foods to Avoid</div>
                    <div>• Allergies / Intolerances</div>
                    <div>• Budget & Prep Time</div>
                  </div>
                </div>

              </div>

              <div className="text-[11px] font-mono-num text-zinc-500 pt-6 border-t border-white/10 flex justify-between">
                <span>DATABASE: VERIFIED NUTRITION</span>
                <span className="text-[#d8ff38]">SMART SWAP & GROCERY LIST</span>
              </div>
            </div>
          </div>

          {/* 03 — TRAIN */}
          <div className="border border-white/10 bg-zinc-950 grid lg:grid-cols-12 transition-all hover:border-white/25">
            {/* Left Col: Number & Title */}
            <div className="lg:col-span-6 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between bg-[#0b0b0e]">
              <div>
                <div className="flex items-baseline justify-between mb-6">
                  <span className="text-6xl sm:text-8xl font-mono-num font-extrabold text-[#d8ff38] leading-none">
                    03
                  </span>
                  <span className="text-xs font-mono-num text-zinc-500 uppercase tracking-widest">
                    PERIODIZATION PLANNER
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold uppercase font-display tracking-tight text-white mb-2">
                  TRAIN
                </h3>
                <p className="text-lg font-mono-num text-[#d8ff38] font-bold uppercase tracking-wider mb-4">
                  KNOW HOW TO TRAIN.
                </p>
                <p className="text-zinc-400 text-sm font-mono-num leading-relaxed">
                  Generate structured resistance workouts calibrated for your physical goal, experience tier, training location, available equipment, schedule, and duration.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10">
                <button
                  onClick={() => setActiveTab('train')}
                  className="px-6 py-3.5 bg-[#d8ff38] hover:bg-[#cbf425] text-black font-mono-num font-bold text-xs uppercase tracking-wider flex items-center gap-3 transition-colors"
                >
                  <span>BUILD MY WORKOUT</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Right Col: Workout Inputs */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between bg-zinc-950/60">
              <div className="space-y-4">
                
                <div className="grid grid-cols-2 gap-3 font-mono-num text-xs">
                  <div className="p-3 bg-zinc-900 border border-white/10">
                    <span className="text-zinc-500 block text-[10px] uppercase">GOAL ARCHETYPES</span>
                    <span className="text-white font-bold">Fat Loss / Hypertrophy / Strength / Endurance</span>
                  </div>
                  <div className="p-3 bg-zinc-900 border border-white/10">
                    <span className="text-zinc-500 block text-[10px] uppercase">EQUIPMENT TIERS</span>
                    <span className="text-white font-bold">No Gear / DBs / Home Gym / Full Gym</span>
                  </div>
                  <div className="p-3 bg-zinc-900 border border-white/10">
                    <span className="text-zinc-500 block text-[10px] uppercase">SCHEDULE</span>
                    <span className="text-white font-bold">3, 4, 5, or 6 Days / Week</span>
                  </div>
                  <div className="p-3 bg-zinc-900 border border-white/10">
                    <span className="text-zinc-500 block text-[10px] uppercase">SESSION TIME</span>
                    <span className="text-white font-bold">30 to 75 Minutes</span>
                  </div>
                </div>

                <div className="p-4 bg-[#09090b] border border-white/10 font-mono-num text-xs">
                  <span className="text-[#d8ff38] font-bold uppercase block mb-1">
                    11-CATEGORY EXERCISE CATALOG
                  </span>
                  <p className="text-zinc-400">
                    Chest, Back, Shoulders, Arms, Legs, Core, Full Body, Cardio, HIIT, Mobility, and Yoga with set/rep cues and rest timers.
                  </p>
                </div>

              </div>

              <div className="text-[11px] font-mono-num text-zinc-500 pt-6 border-t border-white/10 flex justify-between">
                <span>RPE & REST CALIBRATED</span>
                <span className="text-[#d8ff38]">STEP-BY-STEP FORM CUES</span>
              </div>
            </div>
          </div>

          {/* 04 — TRANSFORM */}
          <div className="border border-white/10 bg-zinc-950 grid lg:grid-cols-12 transition-all hover:border-white/25">
            {/* Left Col: Number & Title */}
            <div className="lg:col-span-6 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between bg-[#0b0b0e]">
              <div>
                <div className="flex items-baseline justify-between mb-6">
                  <span className="text-6xl sm:text-8xl font-mono-num font-extrabold text-[#d8ff38] leading-none">
                    04
                  </span>
                  <span className="text-xs font-mono-num text-zinc-500 uppercase tracking-widest">
                    PROGRESS EXPERIENCE
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold uppercase font-display tracking-tight text-white mb-2">
                  TRANSFORM
                </h3>
                <p className="text-lg font-mono-num text-[#d8ff38] font-bold uppercase tracking-wider mb-4">
                  TRACK EVERY REP. EVERY MEAL. EVERY DAY.
                </p>
                <p className="text-zinc-400 text-sm font-mono-num leading-relaxed">
                  Log your morning bodyweight, caloric target compliance, daily protein threshold, water intake, completed workout sessions, and unbroken discipline streaks.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="px-6 py-3.5 bg-[#d8ff38] hover:bg-[#cbf425] text-black font-mono-num font-bold text-xs uppercase tracking-wider flex items-center gap-3 transition-colors"
                >
                  <span>TRACK YOUR PROGRESS</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Right Col: Telemetry Trackers */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between bg-zinc-950/60">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono-num text-xs mb-6">
                <div className="p-3 bg-zinc-900 border border-white/10 text-center">
                  <span className="text-[10px] text-zinc-500 uppercase block">WEIGHT</span>
                  <span className="text-white font-bold mt-1 block">DAILY LOG</span>
                </div>
                <div className="p-3 bg-zinc-900 border border-white/10 text-center">
                  <span className="text-[10px] text-zinc-500 uppercase block">CALORIES</span>
                  <span className="text-[#d8ff38] font-bold mt-1 block">KCAL / DAY</span>
                </div>
                <div className="p-3 bg-zinc-900 border border-white/10 text-center">
                  <span className="text-[10px] text-zinc-500 uppercase block">PROTEIN</span>
                  <span className="text-white font-bold mt-1 block">GRAMS</span>
                </div>
                <div className="p-3 bg-zinc-900 border border-white/10 text-center">
                  <span className="text-[10px] text-zinc-500 uppercase block">WATER</span>
                  <span className="text-cyan-400 font-bold mt-1 block">LITERS</span>
                </div>
                <div className="p-3 bg-zinc-900 border border-white/10 text-center">
                  <span className="text-[10px] text-zinc-500 uppercase block">WORKOUTS</span>
                  <span className="text-white font-bold mt-1 block">SESSIONS</span>
                </div>
                <div className="p-3 bg-zinc-900 border border-white/10 text-center">
                  <span className="text-[10px] text-zinc-500 uppercase block">STREAKS</span>
                  <span className="text-[#d8ff38] font-bold mt-1 block">UNBROKEN</span>
                </div>
                <div className="p-3 bg-zinc-900 border border-white/10 text-center">
                  <span className="text-[10px] text-zinc-500 uppercase block">PHOTOS</span>
                  <span className="text-white font-bold mt-1 block">TIMELINE</span>
                </div>
                <div className="p-3 bg-zinc-900 border border-white/10 text-center">
                  <span className="text-[10px] text-zinc-500 uppercase block">METRICS</span>
                  <span className="text-zinc-300 font-bold mt-1 block">TAPES & BMI</span>
                </div>
              </div>

              <div className="text-[11px] font-mono-num text-zinc-500 pt-6 border-t border-white/10 flex justify-between">
                <span>TELEMETRY: ATHLETE COMMAND CENTER</span>
                <span className="text-[#d8ff38]">ZERO GUESSWORK</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
