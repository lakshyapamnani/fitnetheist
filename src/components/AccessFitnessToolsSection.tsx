import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight } from 'lucide-react';

export const AccessFitnessToolsSection: React.FC = () => {
  const { setActiveTab, openCalorieModal } = useApp();

  return (
    <section 
      id="access-fitness-tools-section"
      className="relative bg-[#08080a] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden"
    >
      <div id="features-section" className="absolute -top-12 left-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header Indicator */}
        <div className="flex items-center gap-2 mb-6">
          <span className="h-1.5 w-1.5 bg-[#FFC515]"></span>
          <span className="text-[11px] font-mono-num font-bold uppercase tracking-[0.25em] text-[#FFC515]">
            DIGITAL FITNESS SUITE & FEATURES
          </span>
        </div>

        {/* Concise Editorial Block */}
        <div className="border border-white/15 bg-[#101014] p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-display text-white">
              YOUR FITNESS <span className="text-[#FFC515]">TOOLS.</span>
            </h2>
            <p className="text-white/70 text-sm sm:text-base font-mono-num leading-relaxed">
              Personalized tools to help you understand your calories, nutrition and training.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono-num text-white/50">
              <span>• CALORIE CALCULATOR</span>
              <span>• 7-DAY DIET GENERATOR</span>
              <span>• WORKOUT COACH</span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              id="cta-open-calorie-calculator"
              onClick={openCalorieModal}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#d8ff38] hover:bg-[#c9f028] text-black font-mono-num font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-colors shadow-[0_0_18px_rgba(216,255,56,0.25)]"
            >
              <span>CALCULATE CALORIES</span>
              <ArrowRight size={15} strokeWidth={2.5} />
            </button>
            <button
              id="cta-explore-fitness-tools"
              onClick={() => {
                setActiveTab('tools');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 py-3.5 border border-white/20 hover:border-white/50 text-white font-mono-num font-bold text-xs uppercase tracking-wider flex items-center justify-center transition-colors"
            >
              <span>ALL TOOLS →</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
