import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight } from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  const { setActiveTab } = useApp();

  const scrollToRateCards = () => {
    const el = document.getElementById('rate-cards-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="final-cta-section"
      className="relative bg-[#050507] text-white py-24 sm:py-36 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#FFC515]/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        
        {/* Brand Sub-header */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#101014] border border-white/15 text-[#FFC515] text-[10px] sm:text-[11px] font-mono-num font-bold tracking-[0.25em] uppercase mx-auto">
          <span className="w-1.5 h-1.5 bg-[#FFC515]"></span>
          FITNETHEIST COACHING
        </div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight leading-[0.92] font-display text-white">
          READY TO BECOME<br />
          <span className="text-[#FFC515]">THE ONE?</span>
        </h2>

        {/* Supporting text */}
        <div className="font-mono-num text-sm sm:text-base text-white/70 space-y-1">
          <p>Personalized coaching.</p>
          <p>Real guidance.</p>
          <p>Real transformation.</p>
        </div>

        {/* Dual Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            id="final-cta-start-transformation"
            onClick={scrollToRateCards}
            className="w-full sm:w-auto px-8 py-4 bg-[#FFC515] hover:bg-[#E6AF0F] text-black font-mono-num font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-colors shadow-[0_0_20px_rgba(255,197,21,0.25)]"
          >
            <span>START YOUR TRANSFORMATION</span>
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>

          <button
            id="final-cta-explore-tools"
            onClick={() => {
              setActiveTab('tools');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 bg-[#101014] hover:bg-white/10 text-white border border-white/20 hover:border-white/50 font-mono-num font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors text-center"
          >
            EXPLORE FITNESS TOOLS →
          </button>
        </div>

        <div className="pt-8 text-xs font-mono-num text-white/40">
          FITNETHEIST – BE THE ONE By Coach Neetu
        </div>

      </div>
    </section>
  );
};
