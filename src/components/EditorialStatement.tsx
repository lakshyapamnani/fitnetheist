import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Flame, Utensils, Dumbbell } from 'lucide-react';

export const EditorialStatement: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <section 
      id="editorial-transition-section"
      className="relative bg-[#08080a] text-white py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Large Statement Transition */}
        <div className="border-b border-white/10 pb-16 mb-20">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            
            <div className="lg:col-span-8">
              <span className="text-[#FFC515] font-mono-num text-xs font-bold tracking-[0.3em] uppercase block mb-3">
                THE PHILOSOPHY
              </span>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight leading-[0.95] font-display text-white">
                YOUR FITNESS<br />
                <span className="text-white/60">SHOULDN'T BE</span><br />
                <span className="text-[#FFC515]">A GUESS.</span>
              </h2>
            </div>

            <div className="lg:col-span-4 border-l border-white/10 lg:pl-8 space-y-3 font-mono-num text-sm text-white/80">
              <p className="flex items-center gap-2">
                <span className="text-[#FFC515] font-bold">01/</span> Know your exact calories.
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#FFC515] font-bold">02/</span> Know what to eat every meal.
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#FFC515] font-bold">03/</span> Know how to train for your split.
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#FFC515] font-bold">04/</span> Track progress with zero delusion.
              </p>
            </div>

          </div>
        </div>

        {/* 3 Core Tools - Large Editorial Magazine Sections */}
        <div className="space-y-16">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs font-mono-num uppercase tracking-[0.25em] text-white/50">
              CORE PERFORMANCE SUITE
            </span>
            <span className="text-xs font-mono-num text-[#FFC515] font-bold">
              ENGINEERED PROTOCOLS
            </span>
          </div>

          {/* 01 CALORIE CALCULATOR */}
          <div className="grid lg:grid-cols-12 border border-white/10 bg-[#101014] transition-all hover:border-white/30">
            {/* Left Huge Typography & Number */}
            <div className="lg:col-span-5 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between bg-[#0c0c10]">
              <div>
                <span className="text-6xl sm:text-7xl font-mono-num font-extrabold text-[#FFC515] block leading-none mb-4">
                  01
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold uppercase font-display tracking-tight text-white mb-3">
                  CALORIE CALCULATOR
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Scientifically derived energy estimation using the verified Mifflin-St Jeor equation. Pinpoint your basal metabolic baseline, active maintenance, and exact caloric targets for aggressive fat reduction or controlled muscle accumulation.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10">
                <button
                  id="tool-cta-calc"
                  onClick={() => setActiveTab('calculate')}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#FFC515] hover:bg-[#E6AF0F] text-black font-mono-num font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-3 transition-colors shadow-[0_0_15px_rgba(255,197,21,0.25)]"
                >
                  <span>CALCULATE NOW</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Right Editorial Breakdown & Visual Metrics */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between bg-[#101014]/60">
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="border border-white/10 p-4 bg-[#14141a]">
                  <span className="text-[11px] font-mono-num text-white/40 uppercase tracking-widest block mb-1">METABOLIC METRIC</span>
                  <p className="text-lg font-bold text-white font-mono-num">BMR & MAINTENANCE</p>
                  <p className="text-xs text-white/60 mt-1">Accurate baseline energy expenditure accounting for age, biological sex, height, and activity level.</p>
                </div>
                <div className="border border-white/10 p-4 bg-[#14141a]">
                  <span className="text-[11px] font-mono-num text-white/40 uppercase tracking-widest block mb-1">FAT LOSS TARGET</span>
                  <p className="text-lg font-bold text-[#FFC515] font-mono-num">CALORIE DEFICIT</p>
                  <p className="text-xs text-white/60 mt-1">Calculated 500 kcal deficit targeting a steady, muscle-sparing 0.45 kg weekly fat loss.</p>
                </div>
                <div className="border border-white/10 p-4 bg-[#14141a]">
                  <span className="text-[11px] font-mono-num text-white/40 uppercase tracking-widest block mb-1">HYPERTROPHY TARGET</span>
                  <p className="text-lg font-bold text-white font-mono-num">CALORIE SURPLUS / BULK</p>
                  <p className="text-xs text-white/60 mt-1">Controlled +350 kcal surplus to maximize muscle protein synthesis with minimal adipose gain.</p>
                </div>
                <div className="border border-white/10 p-4 bg-[#14141a]">
                  <span className="text-[11px] font-mono-num text-white/40 uppercase tracking-widest block mb-1">MACRONUTRIENT RATIO</span>
                  <p className="text-lg font-bold text-white font-mono-num">PROTEIN THRESHOLD</p>
                  <p className="text-xs text-white/60 mt-1">Evidence-backed 1.8g to 2.2g protein per kg bodyweight recommendation.</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono-num text-white/50 border-t border-white/10 pt-4">
                <span>FORMULA: MIFFLIN-ST JEOR</span>
                <span className="text-[#FFC515] font-bold">BUILT-IN SAFETY SAFEGUARDS</span>
              </div>
            </div>
          </div>

          {/* 02 DIET GENERATOR */}
          <div className="grid lg:grid-cols-12 border border-white/10 bg-[#101014] transition-all hover:border-white/30">
            {/* Left Huge Typography & Number */}
            <div className="lg:col-span-5 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between bg-[#0c0c10]">
              <div>
                <span className="text-6xl sm:text-7xl font-mono-num font-extrabold text-[#FFC515] block leading-none mb-4">
                  02
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold uppercase font-display tracking-tight text-white mb-3">
                  DIET GENERATOR
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Generate an authentic 7-day nutritional protocol powered by a structured, verified food database. No AI hallucinations — real portions, accurate macronutrients, and instant calorie-matched meal swaps.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10">
                <button
                  id="tool-cta-diet"
                  onClick={() => setActiveTab('nutrition')}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#FFC515] hover:bg-[#E6AF0F] text-black font-mono-num font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-3 transition-colors shadow-[0_0_15px_rgba(255,197,21,0.25)]"
                >
                  <span>BUILD MY DIET</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Right Editorial Breakdown */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between bg-[#101014]/60">
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 p-4 border border-white/10 bg-[#14141a]">
                  <span className="text-xs font-mono-num text-[#FFC515] font-bold">A/</span>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase font-mono-num">DIET PREFERENCES & CUISINES</h4>
                    <p className="text-xs text-white/60 mt-1">Strict vegetarian, vegan, and non-vegetarian pipelines across Indian, International, and hybrid culinary databases.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border border-white/10 bg-[#14141a]">
                  <span className="text-xs font-mono-num text-[#FFC515] font-bold">B/</span>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase font-mono-num">SMART MEAL SWAP ENGINE</h4>
                    <p className="text-xs text-white/60 mt-1">Don't feel like chicken or paneer? Swap any meal for an alternative within +/- 30 kcal of your macro target with a single click.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border border-white/10 bg-[#14141a]">
                  <span className="text-xs font-mono-num text-[#FFC515] font-bold">C/</span>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase font-mono-num">AUTO-GENERATED GROCERY CHECKLIST</h4>
                    <p className="text-xs text-white/60 mt-1">Aggregated ingredients categorized into Proteins, Carbs, Veggies, Fruits, and Pantry for effortless Sunday meal prep.</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono-num text-white/50 border-t border-white/10 pt-4">
                <span>MEAL TIMINGS: 3 TO 6 MEALS/DAY</span>
                <span className="text-[#FFC515] font-bold">PRINT & EXPORT READY</span>
              </div>
            </div>
          </div>

          {/* 03 WORKOUT PLANNER */}
          <div className="grid lg:grid-cols-12 border border-white/10 bg-[#101014] transition-all hover:border-white/30">
            {/* Left Huge Typography & Number */}
            <div className="lg:col-span-5 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between bg-[#0c0c10]">
              <div>
                <span className="text-6xl sm:text-7xl font-mono-num font-extrabold text-[#FFC515] block leading-none mb-4">
                  03
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold uppercase font-display tracking-tight text-white mb-3">
                  WORKOUT PLANNER
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Architect structured training regimens based on your specific biomechanics, available equipment, experience level, and days per week. From commercial gym Push/Pull/Legs to minimalist dumbbell conditioning.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10">
                <button
                  id="tool-cta-train"
                  onClick={() => setActiveTab('train')}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#FFC515] hover:bg-[#E6AF0F] text-black font-mono-num font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-3 transition-colors shadow-[0_0_15px_rgba(255,197,21,0.25)]"
                >
                  <span>BUILD MY WORKOUT</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Right Editorial Breakdown */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between bg-[#101014]/60">
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="border border-white/10 p-4 bg-[#14141a]">
                  <span className="text-xs font-mono-num text-[#FFC515] font-bold block mb-1">01 / SPLIT ARCHITECTURE</span>
                  <h4 className="text-sm font-bold text-white uppercase font-mono-num">PERIODIZED SPLITS</h4>
                  <p className="text-xs text-white/60 mt-1">Full Body (3D), Upper/Lower (4D), and Push/Pull/Legs (5-6D) configurations with matched rest intervals.</p>
                </div>
                <div className="border border-white/10 p-4 bg-[#14141a]">
                  <span className="text-xs font-mono-num text-[#FFC515] font-bold block mb-1">02 / EXERCISE LIBRARY</span>
                  <h4 className="text-sm font-bold text-white uppercase font-mono-num">11 CATEGORY CATALOG</h4>
                  <p className="text-xs text-white/60 mt-1">Chest, Back, Shoulders, Arms, Legs, Core, HIIT, and Mobility with strict anatomical form cues.</p>
                </div>
                <div className="border border-white/10 p-4 bg-[#14141a]">
                  <span className="text-xs font-mono-num text-[#FFC515] font-bold block mb-1">03 / EQUIPMENT AGNOSTIC</span>
                  <h4 className="text-sm font-bold text-white uppercase font-mono-num">4 GEAR TIERS</h4>
                  <p className="text-xs text-white/60 mt-1">Programs dynamically adapt to No Equipment, Dumbbells, Home Gym, or Commercial Gym setups.</p>
                </div>
                <div className="border border-white/10 p-4 bg-[#14141a]">
                  <span className="text-xs font-mono-num text-[#FFC515] font-bold block mb-1">04 / PROGRESSION</span>
                  <h4 className="text-sm font-bold text-white uppercase font-mono-num">RPE & REST TIMING</h4>
                  <p className="text-xs text-white/60 mt-1">Prescribed sets, rep ranges, and seconds of rest to optimize muscular tension and recovery.</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono-num text-white/50 border-t border-white/10 pt-4">
                <span>GOAL: HYPERTROPHY / FAT LOSS / STRENGTH</span>
                <span className="text-[#FFC515] font-bold">FORM GUIDELINES INCLUDED</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
