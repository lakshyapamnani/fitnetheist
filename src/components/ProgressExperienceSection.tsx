import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Flame, Droplets, Dumbbell, Utensils, CheckCircle2, TrendingUp } from 'lucide-react';

export const ProgressExperienceSection: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <section 
      id="progress-experience-section"
      className="relative bg-[#08080a] text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#FFC515]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="border-b border-white/10 pb-12 mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 bg-[#FFC515]"></span>
            <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#FFC515]">
              12 // PROGRESS EXPERIENCE
            </span>
          </div>
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-extrabold uppercase tracking-tight leading-[0.92] font-display text-white">
                SEE YOURSELF<br />
                <span className="text-[#FFC515]">GET STRONGER.</span>
              </h2>
            </div>
            <div className="lg:col-span-4 font-mono-num text-sm text-white/70">
              <p>
                Visual telemetry engineered for total clarity. No fuzzy vanity charts — just objective daily compliance across workouts, macronutrients, hydration, and unbroken streaks.
              </p>
            </div>
          </div>
        </div>

        {/* Realistic Dashboard Preview — Clean, Dark, Athletic, High Contrast */}
        <div className="border border-white/15 bg-[#101014] p-6 sm:p-10 relative">
          
          {/* Header Bar of the Preview Screen */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 bg-[#FFC515]"></span>
              <div>
                <span className="text-xs font-mono-num text-white/40 uppercase tracking-widest block">TELEMETRY VIEW</span>
                <span className="text-xl font-extrabold font-display uppercase tracking-tight text-white">
                  ATHLETE COMMAND CENTER // TODAY
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 font-mono-num text-xs">
              <span className="px-3 py-1 bg-[#14141a] border border-white/10 text-white/80">
                DATE: TODAY
              </span>
              <span className="px-3 py-1 bg-[#FFC515]/10 border border-[#FFC515]/30 text-[#FFC515] font-extrabold">
                SYSTEM: SYNCED
              </span>
            </div>
          </div>

          {/* Core Telemetry Grid (The exact preview metrics requested) */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
            
            {/* 01: WORKOUT */}
            <div className="p-6 bg-[#0c0c0e] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-white/40 font-mono-num text-[11px] mb-3">
                  <span className="uppercase tracking-widest">SESSION</span>
                  <Dumbbell size={15} className="text-[#FFC515]" />
                </div>
                <span className="text-xs font-mono-num text-white/40 block uppercase">WORKOUT</span>
                <p className="text-2xl font-extrabold font-display uppercase text-white mt-1">
                  UPPER BODY
                </p>
                <p className="text-sm font-mono-num text-[#FFC515] font-bold mt-1">
                  45 MIN // COMPLETED
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono-num text-white/40">
                <span>RPE: 8.5 / 10</span>
                <span className="text-[#FFC515] font-bold">100% LOGGED</span>
              </div>
            </div>

            {/* 02: NUTRITION */}
            <div className="p-6 bg-[#0c0c0e] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-white/40 font-mono-num text-[11px] mb-3">
                  <span className="uppercase tracking-widest">ENERGY</span>
                  <Utensils size={15} className="text-[#FFC515]" />
                </div>
                <span className="text-xs font-mono-num text-white/40 block uppercase">NUTRITION</span>
                <p className="text-2xl font-extrabold font-mono-num text-white mt-1">
                  1,850 <span className="text-white/40 text-base font-normal">/ 2,200</span>
                </p>
                <p className="text-sm font-mono-num text-[#FFC515] font-bold mt-1">
                  KCAL (350 REMAINING)
                </p>
              </div>
              {/* Progress bar */}
              <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5 font-mono-num text-[11px]">
                <div className="h-1.5 w-full bg-[#14141a] overflow-hidden">
                  <div className="h-full bg-[#FFC515] w-[84%]" />
                </div>
                <div className="flex justify-between text-white/50">
                  <span>PROTEIN: 142g / 160g</span>
                  <span className="text-white font-bold">84%</span>
                </div>
              </div>
            </div>

            {/* 03: WATER */}
            <div className="p-6 bg-[#0c0c0e] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-white/40 font-mono-num text-[11px] mb-3">
                  <span className="uppercase tracking-widest">HYDRATION</span>
                  <Droplets size={15} className="text-[#FFC515]" />
                </div>
                <span className="text-xs font-mono-num text-white/40 block uppercase">WATER</span>
                <p className="text-2xl font-extrabold font-mono-num text-white mt-1">
                  2.2 <span className="text-white/40 text-base font-normal">/ 3.0</span>
                </p>
                <p className="text-sm font-mono-num text-white font-bold mt-1">
                  LITERS
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5 font-mono-num text-[11px]">
                <div className="h-1.5 w-full bg-[#14141a] overflow-hidden">
                  <div className="h-full bg-[#FFC515] w-[73%]" />
                </div>
                <div className="flex justify-between text-white/50">
                  <span>0.8L TO DAILY TARGET</span>
                  <span className="text-white font-bold">73%</span>
                </div>
              </div>
            </div>

            {/* 04: STREAK & CHALLENGE */}
            <div className="p-6 bg-[#0c0c0e] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-white/40 font-mono-num text-[11px] mb-3">
                  <span className="uppercase tracking-widest">CONSISTENCY</span>
                  <Flame size={15} className="text-[#FFC515]" />
                </div>
                <span className="text-xs font-mono-num text-white/40 block uppercase">DISCIPLINE STREAK</span>
                <p className="text-2xl font-extrabold font-mono-num text-[#FFC515] mt-1">
                  12 DAYS
                </p>
                <p className="text-sm font-mono-num text-white/80 font-bold mt-1">
                  UNBROKEN LOGS
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 font-mono-num text-[11px]">
                <span className="text-white/40 block">CHALLENGE: 21-DAY IGNITE</span>
                <span className="text-white font-bold block mt-0.5">DAY 12 / 21 (57% COMPLETE)</span>
              </div>
            </div>

          </div>

          {/* Bottom Bar Action CTA */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs font-mono-num text-white/60">
              Live athlete profile synchronization active. Every rep, meal, and milliliter is securely recorded.
            </p>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="w-full sm:w-auto px-6 py-3 bg-[#FFC515] hover:bg-[#E6AF0F] text-black font-mono-num font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shrink-0 shadow-[0_0_15px_rgba(255,197,21,0.25)]"
            >
              <span>ACCESS FULL DASHBOARD</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
