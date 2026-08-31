import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, ChevronDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActiveTab } = useApp();

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero-cinematic-campaign"
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 bg-[#08080a] overflow-hidden border-b border-white/10"
    >
      {/* Background Cinematic Athletic Photography with Dark Vignette */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=2000&q=85"
          alt="Athlete Training in High Focus"
          className="w-full h-full object-cover object-center filter grayscale brightness-35 contrast-125 scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Subtle dark ambient gradient & gentle golden yellow ambient glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/80 to-[#08080a]/40" />
        <div className="absolute top-1/4 right-1/4 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-[#FFC515]/5 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Top Brand Label */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#101014]/90 border border-white/15 text-[#FFC515] text-[10px] sm:text-[11px] font-mono-num font-bold tracking-[0.25em] uppercase">
          <span className="w-1.5 h-1.5 bg-[#FFC515]"></span>
          PERSONALIZED FITNESS COACHING
        </div>
      </div>

      {/* Main Campaign Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-10 sm:py-16">
        <div className="max-w-4xl space-y-6">
          
          {/* Supporting Brand Identity */}
          <div className="space-y-1">
            <p className="text-[#FFC515] font-mono-num text-xs sm:text-sm font-bold tracking-[0.25em] uppercase">
              FITNETHEIST – BE THE ONE
            </p>
            <p className="text-white/60 font-mono-num text-xs sm:text-sm tracking-wider uppercase">
              By Coach Neetu
            </p>
          </div>

          {/* Huge Display Headline */}
          <h1 
            id="hero-main-title"
            className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-extrabold uppercase text-white tracking-tight leading-[0.92] font-display"
          >
            <span className="block text-white">BUILD THE BODY.</span>
            <span className="block text-white">
              BUILD THE <span className="text-[#FFC515]">DISCIPLINE.</span>
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-white/70 text-base sm:text-xl font-mono-num max-w-2xl leading-relaxed">
            Real guidance. Personalized nutrition. Structured training. Zero guesswork.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-4">
            <button
              id="hero-cta-start-transformation"
              onClick={() => scrollToSection('rate-cards-section')}
              className="px-8 py-4 bg-[#FFC515] hover:bg-[#E6AF0F] text-black font-mono-num font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,197,21,0.25)]"
            >
              <span>START YOUR TRANSFORMATION</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>

            <button
              id="hero-cta-connect-with-us"
              onClick={() => scrollToSection('connect-with-us-section')}
              className="px-8 py-4 bg-black/70 hover:bg-white/10 text-white border border-white/20 hover:border-white/50 font-mono-num font-bold text-xs sm:text-sm tracking-wider uppercase transition-colors text-center"
            >
              CONNECT WITH US →
            </button>
          </div>

        </div>
      </div>

      {/* Subtle Telemetry & Scroll Indicator Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-num text-white/60">
        
        {/* Core Values */}
        <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-10 w-full sm:w-auto">
          <div>
            <span className="text-white font-bold text-xs sm:text-sm block">1-ON-1</span>
            <span className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest">DEDICATED COACHING</span>
          </div>
          <div className="h-5 sm:h-6 w-px bg-white/10"></div>
          <div>
            <span className="text-white font-bold text-xs sm:text-sm block">CUSTOM</span>
            <span className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest">NUTRITION & WORKOUTS</span>
          </div>
          <div className="h-5 sm:h-6 w-px bg-white/10"></div>
          <div>
            <span className="text-[#FFC515] font-bold text-xs sm:text-sm block">100%</span>
            <span className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest">AUTHENTIC RESULTS</span>
          </div>
        </div>

        {/* Scroll down trigger */}
        <button
          onClick={() => scrollToSection('connect-with-us-section')}
          className="hidden sm:flex items-center gap-2 text-white/60 hover:text-[#FFC515] transition-colors uppercase tracking-widest text-[11px] py-1"
        >
          <span>EXPLORE COACHING</span>
          <ChevronDown size={14} className="animate-bounce" />
        </button>

      </div>
    </section>
  );
};
