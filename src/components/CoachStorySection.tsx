import React from 'react';
import { ArrowRight } from 'lucide-react';

export const CoachStorySection: React.FC = () => {
  const scrollToPricing = () => {
    const el = document.getElementById('rate-cards-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="coach-story-section"
      className="relative bg-[#08080a] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-6">
          <span className="h-1.5 w-1.5 bg-[#FFC515]"></span>
          <span className="text-[11px] font-mono-num font-bold uppercase tracking-[0.25em] text-[#FFC515]">
            COACH & BRAND STORY
          </span>
        </div>

        {/* Section Headline */}
        <div className="border-b border-white/10 pb-8 mb-12">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight leading-[0.94] font-display text-white">
            REAL COACH.<br />
            <span className="text-[#FFC515]">REAL JOURNEY.</span>
          </h2>
          <p className="text-white/60 font-mono-num text-sm sm:text-base mt-3 max-w-2xl">
            Meet Coach Neetu — Founder of Fitnetheist.
          </p>
        </div>

        {/* Main Content: Story & Photography */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* Coach Photo Card */}
          <div className="lg:col-span-5 relative flex flex-col justify-between border border-white/15 bg-[#101014] overflow-hidden min-h-[440px] sm:min-h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=1200&q=85"
              alt="Coach Neetu - Founder of Fitnetheist"
              className="w-full h-full object-cover object-top filter grayscale contrast-115 brightness-95"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent" />
            
            {/* Caption Overlay */}
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#08080a]/90 backdrop-blur-md border border-white/10 font-mono-num">
              <span className="text-[10px] text-[#FFC515] font-bold uppercase tracking-widest block">
                FOUNDER & HEAD COACH
              </span>
              <h3 className="text-xl font-bold font-display uppercase text-white mt-0.5">
                COACH NEETU
              </h3>
              <p className="text-xs text-white/60 mt-1">
                Personal Transformation 2017–18 • Dedicated 1-on-1 Fitness Coach
              </p>
            </div>
          </div>

          {/* Coach Story Details */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Written Narrative */}
            <div className="space-y-5 text-white/80 font-mono-num text-sm sm:text-base leading-relaxed">
              
              <div className="border-l-2 border-[#FFC515] pl-4 sm:pl-6 py-1">
                <p className="text-white font-semibold text-base sm:text-lg">
                  "I didn't start as a trainer. I started as someone who desperately needed to understand how sustainable transformation actually works."
                </p>
              </div>

              <div className="space-y-4 text-white/70 text-xs sm:text-sm">
                <div>
                  <h4 className="text-white font-bold uppercase tracking-wider mb-1 text-xs text-[#FFC515]">
                    THE 2017–18 TRANSFORMATION
                  </h4>
                  <p>
                    During 2017–18, Coach Neetu went through her own deep personal transformation. Navigating confusing diet trends, extreme starvation methods, and unguided gym workouts, she realized how broken mainstream fitness advice was.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-bold uppercase tracking-wider mb-1 text-xs text-[#FFC515]">
                    JOURNEY INTO FITNESS COACHING
                  </h4>
                  <p>
                    By learning evidence-based nutrition, structured resistance training, and progressive overload, she rebuilt her health, strength, and confidence from the inside out. That life-changing journey ignited a lifelong mission to help others achieve the same clarity without wasting years on false promises.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-bold uppercase tracking-wider mb-1 text-xs text-[#FFC515]">
                    HER APPROACH TO HELPING CLIENTS
                  </h4>
                  <p>
                    Coach Neetu treats every client as an individual. She looks at your routine, food preferences, stress levels, and daily lifestyle to design nutrition and workouts that fit into your life — building habits that last forever.
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Statement & CTA */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono-num text-white/40 uppercase tracking-widest block">
                  COACHING PHILOSOPHY
                </span>
                <span className="text-sm font-bold text-white font-mono-num">
                  EMPATHY. STRUCTURE. SUSTAINABLE PROGRESS.
                </span>
              </div>

              <button
                onClick={scrollToPricing}
                className="px-6 py-3 bg-[#FFC515] hover:bg-[#E6AF0F] text-black font-mono-num font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-[0_0_15px_rgba(255,197,21,0.2)]"
              >
                <span>VIEW COACHING PLANS</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
