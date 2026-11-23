import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TRANSFORMATIONS_DATA } from '../data/challengesData';
import { ExternalLink, CheckCircle2, Instagram, Sparkles } from 'lucide-react';

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
            AUTHENTIC RESULTS & INSTAGRAM TESTIMONIALS
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
              Authentic journeys guided by Coach Neetu. Verified video reels, focused nutrition, progressive workouts, core recovery, and consistent habits.
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((item) => {
            const isInstagram = Boolean(item.hrefLink && item.hrefLink.includes('instagram.com'));

            return (
              <div 
                key={item.id}
                className="border border-white/10 bg-[#101014] p-5 sm:p-6 flex flex-col justify-between space-y-5 rounded-sm shadow-xl hover:border-white/25 transition-all group"
              >
                {/* Client Info Header */}
                <div className="flex items-start justify-between border-b border-white/10 pb-4 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold font-display uppercase text-white">
                        {item.name}
                      </h3>
                      {isInstagram && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 border border-pink-500/30 text-[9px] font-bold text-pink-300">
                          <Instagram size={10} className="text-pink-400" />
                          <span>REEL</span>
                        </span>
                      )}
                    </div>
                    {item.title && (
                      <p className="text-xs text-[#FFC515] font-mono-num font-semibold mt-0.5 leading-snug">
                        {item.title}
                      </p>
                    )}
                    <p className="text-[11px] text-white/40 font-mono-num mt-1">
                      {item.category.replace('_', ' ')} {item.keyStrategy ? `// ${item.keyStrategy}` : ''}
                    </p>
                  </div>
                  {item.duration && (
                    <span className="px-2 py-0.5 bg-[#FFC515]/10 border border-[#FFC515]/40 text-[#FFC515] font-mono-num font-bold text-[10px] uppercase shrink-0">
                      {item.duration}
                    </span>
                  )}
                </div>

                {/* Media: Video Player or Instagram Reel Showcase */}
                {item.videoUrl ? (
                  <div className="relative border border-white/15 overflow-hidden bg-black rounded-sm aspect-[9/16] max-h-[440px] w-full mx-auto flex items-center justify-center">
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
                      <span>{isInstagram ? 'INSTAGRAM REEL' : 'VIDEO STORY'}</span>
                    </div>
                  </div>
                ) : isInstagram ? (
                  <div className="relative border border-white/15 overflow-hidden bg-gradient-to-br from-zinc-950 via-[#150d1a] to-zinc-950 rounded-sm aspect-[9/16] max-h-[440px] w-full mx-auto flex flex-col items-center justify-between p-6 text-center">
                    <div className="w-full flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-black/80 backdrop-blur-md text-[9px] font-mono-num uppercase font-bold text-pink-400 border border-pink-500/30 flex items-center gap-1.5">
                        <Instagram size={11} />
                        INSTAGRAM REEL
                      </span>
                      <span className="text-[9px] font-mono-num text-white/40">VERIFIED CLIENT</span>
                    </div>

                    <div className="space-y-4 my-auto">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] p-0.5 mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(253,29,29,0.35)] group-hover:scale-105 transition-transform">
                        <div className="w-full h-full bg-[#0a0a0d] rounded-full flex items-center justify-center">
                          <Instagram size={28} className="text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold uppercase font-display text-white">
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#FFC515] font-mono-num mt-1">
                          {item.title || 'Client Transformation Story'}
                        </p>
                      </div>
                      <p className="text-xs text-white/70 font-mono-num italic leading-relaxed">
                        "{item.quote || 'Watch the full video reel transformation on Instagram'}"
                      </p>
                    </div>

                    <a
                      href={item.hrefLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white font-mono-num font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all rounded-sm shadow-md"
                    >
                      <Instagram size={13} />
                      <span>Watch on Instagram</span>
                      <ExternalLink size={12} className="opacity-80" />
                    </a>
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
                <div className="space-y-3 pt-1">
                  {item.statChange && (
                    <div className="p-2.5 bg-[#14141a] border border-white/5 flex items-center justify-between font-mono-num text-xs">
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
                    <p className="text-xs text-white/70 italic font-mono-num leading-relaxed">
                      "{item.quote}"
                    </p>
                  )}

                  {/* Href Link Button */}
                  {item.hrefLink && item.hrefLink.trim().length > 0 ? (
                    <div className="pt-2">
                      <a
                        href={item.hrefLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-2.5 px-4 font-mono-num font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all rounded-sm shadow-md ${
                          isInstagram
                            ? 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white shadow-[0_0_15px_rgba(253,29,29,0.25)]'
                            : 'bg-[#FFC515] hover:bg-[#e0ad10] text-black shadow-[0_0_15px_rgba(255,197,21,0.2)]'
                        }`}
                      >
                        {isInstagram && <Instagram size={14} />}
                        <span>{isInstagram ? 'WATCH REEL ON INSTAGRAM' : 'VIEW ORIGINAL STORY / LINK'}</span>
                        <ExternalLink size={13} className="opacity-80" />
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
            );
          })}
        </div>

      </div>
    </section>
  );
};
