import React from 'react';
import { useApp } from '../context/AppContext';
import { ChevronDown, ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActiveTab, adminHeroTitle, adminHeroSubtitle } = useApp();

  const scrollToNext = () => {
    const el = document.getElementById('editorial-transition-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero-cinematic-campaign"
      className="relative min-h-[90vh] sm:min-h-screen w-full flex flex-col justify-between pt-20 sm:pt-28 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 bg-[#08080a] overflow-hidden border-b border-white/10"
    >
      {/* Background Cinematic Athletic Photography with Dark Vignette */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=2000&q=85"
          alt="High Performance Athlete Training in Dark Gym"
          className="w-full h-full object-cover object-center filter grayscale brightness-40 contrast-125 scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Subtle dark ambient gradient & soft neon back-rim glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/70 to-[#08080a]/30" />
        <div className="absolute top-1/3 right-1/4 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-[#d8ff38]/5 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      </div>

      {/* Top Brand Sub-Label */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-2 sm:pt-4">
        <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 bg-zinc-900/80 border border-white/15 text-[#d8ff38] text-[10px] sm:text-[11px] font-mono-num font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase">
          <span className="w-1.5 h-1.5 bg-[#d8ff38]"></span>
          HUMAN PERFORMANCE ARCHITECTURE // V2.4
        </div>
      </div>

      {/* Main Campaign Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-8 sm:py-12">
        <div className="max-w-4xl">
          
          <p className="text-zinc-400 font-mono-num text-[11px] sm:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4">
            FITNETHEIST PLATFORM
          </p>

          {/* Huge Display Headline */}
          <h1 
            id="hero-main-title"
            className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-extrabold uppercase text-white tracking-tight leading-[0.94] sm:leading-[0.92] mb-5 sm:mb-6 font-display"
          >
            {adminHeroTitle ? (
              adminHeroTitle.split('. ').map((part, i) => (
                <span key={i} className="block">
                  {part}{i === 0 && '.'}
                </span>
              ))
            ) : (
              <>
                <span className="block">BUILD THE BODY.</span>
                <span className="block text-zinc-300">BUILD THE DISCIPLINE.</span>
              </>
            )}
          </h1>

          {/* Editorial Subhead */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 py-4 mb-6 sm:mb-8 border-y border-white/10 max-w-2xl">
            <div>
              <p className="text-[#d8ff38] font-mono-num text-[11px] sm:text-xs font-bold uppercase tracking-wider">01 // TRAINING</p>
              <p className="text-zinc-400 text-xs sm:text-sm mt-0.5 sm:mt-1">Periodized progressive overload splits.</p>
            </div>
            <div>
              <p className="text-[#d8ff38] font-mono-num text-[11px] sm:text-xs font-bold uppercase tracking-wider">02 // NUTRITION</p>
              <p className="text-zinc-400 text-xs sm:text-sm mt-0.5 sm:mt-1">Mathematically verified macro targets.</p>
            </div>
            <div>
              <p className="text-[#d8ff38] font-mono-num text-[11px] sm:text-xs font-bold uppercase tracking-wider">03 // PROGRESS</p>
              <p className="text-zinc-400 text-xs sm:text-sm mt-0.5 sm:mt-1">Unforgiving streak accountability.</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              id="hero-cta-transformation"
              onClick={() => setActiveTab('nutrition')}
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#d8ff38] hover:bg-[#c9f028] text-black font-mono-num font-extrabold text-xs sm:text-base tracking-wider uppercase transition-all flex items-center justify-center gap-2.5 sm:gap-3 glow-accent-subtle mobile-tap-active"
            >
              <span>START YOUR TRANSFORMATION</span>
              <ArrowRight size={16} strokeWidth={3} />
            </button>

            <button
              id="hero-cta-calories"
              onClick={() => setActiveTab('calculate')}
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-zinc-900/90 hover:bg-zinc-800 text-white border border-white/20 hover:border-white/50 font-mono-num font-bold text-xs sm:text-base tracking-wider uppercase transition-colors text-center mobile-tap-active"
            >
              CALCULATE MY CALORIES
            </button>
          </div>

        </div>
      </div>

      {/* Telemetry & Scroll Indicator Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-num text-zinc-400">
        
        {/* Telemetry Numbers */}
        <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-10 w-full sm:w-auto">
          <div>
            <span className="text-white font-bold text-xs sm:text-sm block">14,850+</span>
            <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-widest">ATHLETES</span>
          </div>
          <div className="h-5 sm:h-6 w-px bg-white/10"></div>
          <div>
            <span className="text-white font-bold text-xs sm:text-sm block">42,150+</span>
            <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-widest">DIETS BUILT</span>
          </div>
          <div className="h-5 sm:h-6 w-px bg-white/10"></div>
          <div>
            <span className="text-[#d8ff38] font-bold text-xs sm:text-sm block">100%</span>
            <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-widest">SCIENTIFIC</span>
          </div>
        </div>

        {/* Scroll down trigger */}
        <button
          onClick={scrollToNext}
          className="hidden sm:flex items-center gap-2 text-zinc-400 hover:text-white transition-colors uppercase tracking-widest text-[11px] py-1"
        >
          <span>SCROLL TO EXPLORE</span>
          <ChevronDown size={14} className="animate-bounce" />
        </button>

      </div>
    </section>
  );
};
