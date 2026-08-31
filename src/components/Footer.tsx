import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowUp, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="editorial-footer" className="bg-[#050507] text-white border-t border-white/10 pt-16 pb-24 lg:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Brand & Manifest Grid */}
        <div className="grid lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-2xl tracking-tighter text-white">
                FITNETHEIST
              </span>
              <span className="h-2 w-2 bg-[#FFC515] rounded-full"></span>
            </div>
            <p className="text-white/70 text-xs sm:text-sm font-mono-num max-w-lg leading-relaxed">
              Human performance architecture. We dismantle fitness guesswork through scientifically derived caloric metrics, macro-exact nutrition matrices, and progressive training splits.
            </p>
            <div className="pt-2 text-[11px] font-mono-num text-white/40">
              ENGINEERED FOR RADICAL DISCIPLINE.
            </div>
          </div>

          {/* Quick Nav Columns */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 font-mono-num text-xs">
            
            <div className="space-y-3">
              <span className="text-[#FFC515] font-bold uppercase tracking-wider block">
                CORE PROTOCOLS
              </span>
              <ul className="space-y-2 text-white/70">
                <li>
                  <button onClick={() => setActiveTab('calculate')} className="hover:text-[#FFC515] transition-colors">
                    Calorie Calculator
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('nutrition')} className="hover:text-[#FFC515] transition-colors">
                    7-Day Diet Generator
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('train')} className="hover:text-[#FFC515] transition-colors">
                    Workout Planner
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('train')} className="hover:text-[#FFC515] transition-colors">
                    Exercise Catalog
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-[#FFC515] font-bold uppercase tracking-wider block">
                COMMUNITY & PRO
              </span>
              <ul className="space-y-2 text-white/70">
                <li>
                  <button onClick={() => setActiveTab('challenges')} className="hover:text-[#FFC515] transition-colors">
                    Fitness Challenges
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('transform')} className="hover:text-[#FFC515] transition-colors">
                    Transformations
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('community')} className="hover:text-[#FFC515] transition-colors">
                    The Tribe Feed
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('coach')} className="hover:text-[#FFC515] transition-colors">
                    Head Coach Vik
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('pricing')} className="hover:text-[#FFC515] transition-colors">
                    Membership Tiers
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-white/40 font-bold uppercase tracking-wider block">
                SYSTEM & LEGAL
              </span>
              <ul className="space-y-2 text-white/50 text-[11px]">
                <li>Mifflin-St Jeor Engine</li>
                <li>Macro Parity Validator</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
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
            <strong className="text-white">DISCLAIMER:</strong> Fitnetheist delivers mathematical estimates and educational guidance. This platform does not provide medical diagnosis, clinical treatment, or replace certified healthcare advice. Always consult a physician prior to initiating rigorous exercise or dietary changes.
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
          © {new Date().getFullYear()} FITNETHEIST. ALL RIGHTS RESERVED. BOLD. CINEMATIC. UNBROKEN.
        </div>

      </div>
    </footer>
  );
};
