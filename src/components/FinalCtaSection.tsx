import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Flame } from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <section 
      id="final-cta-section"
      className="relative bg-[#050507] text-white py-28 sm:py-36 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden"
    >
      {/* Background Athlete Image with Dark Cinematic Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=2000&q=85"
          alt="Athletic training discipline environment"
          className="w-full h-full object-cover filter grayscale contrast-150 brightness-[0.25]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/80 to-transparent" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />
      </div>

      {/* Subtle Neon Environmental Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#d8ff38]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="max-w-4xl space-y-8">
          
          {/* Section Indicator */}
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-[#d8ff38]"></span>
            <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#d8ff38]">
              13 // THE DECISION
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-tight leading-[0.9] font-display text-white">
            YOUR TRANSFORMATION<br />
            <span className="text-[#d8ff38]">STARTS TODAY.</span>
          </h2>

          {/* Supporting Copy (Exact requested text) */}
          <div className="space-y-2 font-mono-num text-base sm:text-xl text-zinc-300 border-l-2 border-[#d8ff38] pl-6 py-2">
            <p>Stop guessing.</p>
            <p>Start training.</p>
            <p>Start eating with purpose.</p>
            <p className="text-white font-bold">Start becoming stronger.</p>
          </div>

          {/* Primary and Secondary Action Buttons */}
          <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            
            {/* Primary CTA */}
            <button
              id="final-cta-start-transformation"
              onClick={() => setActiveTab('challenges')}
              className="px-8 py-4 bg-[#d8ff38] hover:bg-[#cbf425] text-black font-mono-num font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-colors glow-accent-subtle shadow-xl"
            >
              <span>START YOUR TRANSFORMATION</span>
              <ArrowRight size={16} />
            </button>

            {/* Secondary CTA */}
            <button
              id="final-cta-calculate-calories"
              onClick={() => setActiveTab('calculate')}
              className="px-8 py-4 bg-zinc-950/80 hover:bg-zinc-900 border border-white/20 hover:border-white/50 text-white font-mono-num font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-colors backdrop-blur-sm"
            >
              <span>CALCULATE MY CALORIES</span>
              <ArrowRight size={16} />
            </button>

          </div>

          {/* Guarantee Subtext */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono-num text-zinc-500">
            <span>FITNETHEIST PERFORMANCE ARCHITECTURE</span>
            <span className="text-zinc-400">JOIN 4,200+ ATHLETES WORLDWIDE</span>
          </div>

        </div>

      </div>
    </section>
  );
};
