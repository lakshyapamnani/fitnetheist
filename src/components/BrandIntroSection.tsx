import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Check } from 'lucide-react';

export const BrandIntroSection: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <section 
      id="brand-intro-section"
      className="relative bg-[#09090b] text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Layout: Left (Brand Statement & Pillars) + Right (High-Contrast Athlete Photography) */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Small Label */}
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-[#d8ff38]"></span>
              <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#d8ff38]">
                THE FITNETHEIST METHOD // 02
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-extrabold uppercase tracking-tight leading-[0.92] font-display text-white">
              FITNESS.<br />
              <span className="text-zinc-400">WITHOUT THE</span><br />
              GUESSWORK.
            </h2>

            {/* Supporting Step-by-Step Copy */}
            <div className="space-y-3 font-mono-num text-sm sm:text-base text-zinc-300 border-l border-[#d8ff38]/40 pl-6 py-2">
              <p className="flex items-center gap-3">
                <span className="text-[#d8ff38] font-bold">01.</span> Calculate your calories.
              </p>
              <p className="flex items-center gap-3">
                <span className="text-[#d8ff38] font-bold">02.</span> Know what to eat.
              </p>
              <p className="flex items-center gap-3">
                <span className="text-[#d8ff38] font-bold">03.</span> Know how to train.
              </p>
              <p className="flex items-center gap-3">
                <span className="text-[#d8ff38] font-bold">04.</span> Track your progress.
              </p>
              <p className="flex items-center gap-3">
                <span className="text-[#d8ff38] font-bold">05.</span> Stay consistent.
              </p>
            </div>

            {/* Short Brand Statement */}
            <p className="text-zinc-400 text-sm sm:text-base font-mono-num leading-relaxed max-w-xl border-t border-white/10 pt-6">
              <strong className="text-white">FITNETHEIST</strong> brings nutrition, training, challenges and progress tracking into one focused fitness experience.
            </p>

            {/* Action button */}
            <div className="pt-2">
              <button
                onClick={() => setActiveTab('calculate')}
                className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 border border-white/20 hover:border-white/50 text-white font-mono-num font-bold text-xs uppercase tracking-wider flex items-center gap-3 transition-colors"
              >
                <span>EXPLORE THE METHOD</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </div>

          {/* Right Column: Premium High-Contrast Athlete Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative border border-white/15 bg-zinc-950 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85"
                alt="Focused athlete preparing for training"
                className="w-full h-[460px] sm:h-[540px] object-cover filter grayscale contrast-125 brightness-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-80" />
              
              {/* Overlay Metadata Tag */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/80 backdrop-blur-sm border border-white/10 font-mono-num text-xs">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">DISCIPLINE PRINCIPLE</span>
                <span className="text-white font-bold block mt-0.5">ELIMINATE AMBIGUITY. EXECUTE DAILY.</span>
              </div>
            </div>

            {/* Decorative subtle ambient accent */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#d8ff38]/10 rounded-full blur-3xl pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
};
