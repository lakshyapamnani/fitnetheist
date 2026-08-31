import React, { useState } from 'react';
import { TRANSFORMATIONS_DATA } from '../data/challengesData';

export const RealTransformationsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const filtered = activeCategory === 'ALL' 
    ? TRANSFORMATIONS_DATA 
    : TRANSFORMATIONS_DATA.filter(t => t.category === activeCategory);

  return (
    <section 
      id="real-transformations-section"
      className="relative bg-[#08080a] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden"
    >
      {/* Testimonials Anchor */}
      <div id="testimonials-section" className="absolute -top-12 left-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-6">
          <span className="h-1.5 w-1.5 bg-[#FFC515]"></span>
          <span className="text-[11px] font-mono-num font-bold uppercase tracking-[0.25em] text-[#FFC515]">
            AUTHENTIC RESULTS & TESTIMONIALS
          </span>
        </div>

        {/* Section Headline */}
        <div className="border-b border-white/10 pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight leading-[0.94] font-display text-white">
              REAL CLIENTS.<br />
              <span className="text-[#FFC515]">REAL TRANSFORMATIONS.</span>
            </h2>
            <p className="text-white/60 font-mono-num text-sm sm:text-base mt-2 max-w-xl">
              Authentic journeys guided by Coach Neetu. Focused nutrition, progressive workouts, and consistent habits.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 font-mono-num text-xs">
            {['ALL', 'WEIGHT_LOSS', 'RECOMP', 'MUSCLE_GAIN'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 uppercase font-bold tracking-wider border transition-all ${
                  activeCategory === cat
                    ? 'bg-[#FFC515] text-black border-[#FFC515]'
                    : 'bg-[#101014] text-white/60 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Minimal Editorial Grid of Real Transformations */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {filtered.map((item) => (
            <div 
              key={item.id}
              className="border border-white/10 bg-[#101014] p-6 sm:p-8 flex flex-col justify-between space-y-6"
            >
              {/* Client Info Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold font-display uppercase text-white">
                    {item.name}
                  </h3>
                  <p className="text-xs text-white/50 font-mono-num mt-0.5">
                    {item.category.replace('_', ' ')} // {item.keyStrategy}
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-[#FFC515]/10 border border-[#FFC515]/40 text-[#FFC515] font-mono-num font-bold text-xs uppercase">
                  {item.duration}
                </span>
              </div>

              {/* Before & After Dual Side-by-Side Photos */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative border border-white/10 overflow-hidden bg-black aspect-[3/4]">
                  <img
                    src={item.beforePhoto}
                    alt={`${item.name} Before Coaching`}
                    className="w-full h-full object-cover filter grayscale contrast-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-[10px] font-mono-num uppercase font-bold text-white/80 border border-white/20">
                    BEFORE
                  </div>
                </div>

                <div className="relative border border-[#FFC515]/40 overflow-hidden bg-black aspect-[3/4]">
                  <img
                    src={item.afterPhoto}
                    alt={`${item.name} After Coaching`}
                    className="w-full h-full object-cover filter grayscale contrast-115"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#FFC515] text-[10px] font-mono-num uppercase font-extrabold text-black">
                    AFTER
                  </div>
                </div>
              </div>

              {/* Metric Delta & Testimonial */}
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-[#14141a] border border-white/5 flex items-center justify-between font-mono-num text-xs">
                  <span className="text-white/40 uppercase text-[10px]">PROGRESS METRIC</span>
                  <span className="text-[#FFC515] font-bold text-sm">{item.statChange}</span>
                </div>

                <p className="text-xs sm:text-sm text-white/70 italic font-mono-num leading-relaxed">
                  "{item.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
