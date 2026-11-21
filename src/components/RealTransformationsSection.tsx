import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TRANSFORMATIONS_DATA } from '../data/challengesData';
import { ExternalLink, CheckCircle2, Play, Sparkles } from 'lucide-react';

export const RealTransformationsSection: React.FC = () => {
  const { transformations } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const list = transformations && transformations.length > 0 ? transformations : TRANSFORMATIONS_DATA;

  // Extract unique categories
  const categories: string[] = ['ALL', ...Array.from(new Set<string>(list.map(t => String(t.category || '')).filter(Boolean)))];

  const filtered = activeCategory === 'ALL' 
    ? list 
    : list.filter(t => t.category === activeCategory);

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
              Authentic journeys guided by Coach Neetu. Focused nutrition, progressive workouts, core recovery, and consistent habits.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 font-mono-num text-xs">
            {categories.map((cat) => (
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
              className="border border-white/10 bg-[#101014] p-6 sm:p-8 flex flex-col justify-between space-y-6 rounded-sm shadow-xl hover:border-white/25 transition-all"
            >
              {/* Client Info Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold font-display uppercase text-white">
                    {item.name}
                  </h3>
                  {item.title && (
                    <p className="text-xs text-[#FFC515] font-mono-num font-semibold mt-0.5">
                      {item.title}
                    </p>
                  )}
                  <p className="text-[11px] text-white/40 font-mono-num mt-0.5">
                    {item.category.replace('_', ' ')} {item.keyStrategy ? `// ${item.keyStrategy}` : ''}
                  </p>
                </div>
                {item.duration && (
                  <span className="px-2.5 py-1 bg-[#FFC515]/10 border border-[#FFC515]/40 text-[#FFC515] font-mono-num font-bold text-xs uppercase shrink-0">
                    {item.duration}
                  </span>
                )}
              </div>

              {/* Media: Video Player or Side-by-Side Photos */}
              {item.videoUrl ? (
                <div className="relative border border-white/15 overflow-hidden bg-black rounded-sm aspect-[9/16] max-h-[500px] w-full mx-auto flex items-center justify-center">
                  <video
                    src={item.videoUrl}
                    poster={item.posterUrl}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/80 backdrop-blur-md text-[10px] font-mono-num uppercase font-bold text-[#FFC515] border border-[#FFC515]/30 pointer-events-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFC515] animate-pulse"></span>
                    VIDEO STORY
                  </div>
                </div>
              ) : item.beforePhoto && item.afterPhoto ? (
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
              ) : null}

              {/* Metric Delta & Testimonial Details */}
              <div className="space-y-3 pt-2">
                {item.statChange && (
                  <div className="p-3 bg-[#14141a] border border-white/5 flex items-center justify-between font-mono-num text-xs">
                    <span className="text-white/40 uppercase text-[10px]">PROGRESS METRIC</span>
                    <span className="text-[#FFC515] font-bold text-sm">{item.statChange}</span>
                  </div>
                )}

                {/* Description */}
                {item.description && (
                  <div className="p-3 bg-white/[0.03] border-l-2 border-[#FFC515] text-white/80 font-mono-num text-xs leading-relaxed">
                    <span className="text-[10px] text-white/40 uppercase block mb-1 font-bold">CLIENT CASE BREAKDOWN</span>
                    {item.description}
                  </div>
                )}

                {/* Quote */}
                {item.quote && (
                  <p className="text-xs sm:text-sm text-white/70 italic font-mono-num leading-relaxed">
                    "{item.quote}"
                  </p>
                )}

                {/* Href Link Button (if added) */}
                {item.hrefLink && item.hrefLink.trim().length > 0 ? (
                  <div className="pt-2">
                    <a
                      href={item.hrefLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 bg-[#FFC515] hover:bg-[#e0ad10] text-black font-mono-num font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all rounded-sm shadow-[0_0_15px_rgba(255,197,21,0.2)]"
                    >
                      <span>VIEW ORIGINAL STORY / LINK</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                ) : (
                  <div className="pt-1 flex items-center justify-between text-[10px] font-mono-num text-white/40">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 size={12} /> Verified Coaching Client
                    </span>
                    <span className="uppercase text-white/30">100% Authentic Result</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
