import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveTab('home');
      setTimeout(() => {
        const target = document.getElementById(sectionId);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <footer id="editorial-footer" className="bg-[#050507] text-white border-t border-white/10 pt-16 pb-24 lg:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Brand & Links Grid */}
        <div className="grid lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-2xl tracking-tighter text-white">
                FITNETHEIST
              </span>
              <span className="h-2 w-2 bg-[#FFC515] rounded-full"></span>
            </div>
            <p className="text-[#FFC515] font-mono-num text-xs font-bold uppercase tracking-wider">
              BE THE ONE — By Coach Neetu
            </p>
            <p className="text-white/70 text-xs sm:text-sm font-mono-num max-w-lg leading-relaxed">
              Personalized 1-on-1 fitness coaching, custom nutrition matrices, and structured strength training. Built on personal transformation, scientific principles, and lasting habits.
            </p>
            <div className="pt-2 text-[11px] font-mono-num text-white/40 uppercase tracking-widest">
              INSTAGRAM: @FITNETHEIST • EMAIL: CONTACT@FITNETHEIST.COM
            </div>
          </div>

          {/* Quick Nav Columns */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 font-mono-num text-xs">
            
            <div className="space-y-3">
              <span className="text-[#FFC515] font-bold uppercase tracking-wider block">
                COACHING
              </span>
              <ul className="space-y-2 text-white/70">
                <li>
                  <button onClick={() => scrollToSection('coach-story-section')} className="hover:text-[#FFC515] transition-colors">
                    Coach Neetu Story
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('coaching-philosophy-section')} className="hover:text-[#FFC515] transition-colors">
                    Philosophy
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('rate-cards-section')} className="hover:text-[#FFC515] transition-colors">
                    Rate Cards
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('real-transformations-section')} className="hover:text-[#FFC515] transition-colors">
                    Transformations
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-[#FFC515] font-bold uppercase tracking-wider block">
                FITNESS TOOLS
              </span>
              <ul className="space-y-2 text-white/70">
                <li>
                  <button onClick={() => { setActiveTab('tools'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FFC515] transition-colors">
                    Calorie Calculator
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveTab('tools'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FFC515] transition-colors">
                    7-Day Diet Generator
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveTab('tools'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FFC515] transition-colors">
                    Workout Coach
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveTab('challenges'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FFC515] transition-colors">
                    Challenges
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-white/40 font-bold uppercase tracking-wider block">
                CONNECT & ACCESS
              </span>
              <ul className="space-y-2 text-white/50 text-[11px]">
                <li>
                  <button onClick={() => scrollToSection('connect-with-us-section')} className="text-white/70 hover:text-[#FFC515] transition-colors">
                    WhatsApp Desk
                  </button>
                </li>
                <li>
                  <a href="https://instagram.com/fitnetheist" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#FFC515] transition-colors">
                    Instagram ↗
                  </a>
                </li>
                <li>
                  <button onClick={() => setActiveTab('admin')} className="text-white/70 hover:text-[#FFC515] transition-colors">
                    Admin Portal
                  </button>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Legal Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono-num text-white/50">
          <p className="text-[11px] leading-relaxed max-w-3xl">
            <strong className="text-white">DISCLAIMER:</strong> Fitnetheist delivers personalized educational coaching and caloric guidance. Always consult a healthcare professional before starting any new exercise or nutrition program.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-white/60 hover:text-[#FFC515] uppercase tracking-wider text-[11px] p-2 border border-white/10 shrink-0 transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={12} />
          </button>
        </div>

        <div className="pt-4 text-center md:text-left text-[10px] font-mono-num text-white/30">
          © {new Date().getFullYear()} FITNETHEIST – BE THE ONE By Coach Neetu. ALL RIGHTS RESERVED.
        </div>

      </div>
    </footer>
  );
};
