import React from 'react';

export const CoachingPhilosophySection: React.FC = () => {
  return (
    <section 
      id="coaching-philosophy-section"
      className="relative bg-[#08080a] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-6">
          <span className="h-1.5 w-1.5 bg-[#FFC515]"></span>
          <span className="text-[11px] font-mono-num font-bold uppercase tracking-[0.25em] text-[#FFC515]">
            COACHING PHILOSOPHY
          </span>
        </div>

        {/* Minimal Editorial Layout */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Main Headline */}
          <div className="lg:col-span-6">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight leading-[0.94] font-display text-white">
              PERSONALIZED<br />
              <span className="text-[#FFC515]">COACHING.</span><br />
              NOT GENERIC<br />
              <span className="text-white/50">PROGRAMS.</span>
            </h2>
          </div>

          {/* Text-led Editorial Content */}
          <div className="lg:col-span-6 space-y-6 font-mono-num text-sm sm:text-base text-white/80 leading-relaxed border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-10 pt-8 lg:pt-0">
            <p className="text-white font-medium text-base sm:text-lg">
              Generic PDF templates and one-size-fits-all meal plans fail because your body, work schedule, food preferences, and metabolism are uniquely yours.
            </p>

            <div className="space-y-4 text-white/70 text-xs sm:text-sm">
              <p>
                At <strong className="text-white">Fitnetheist</strong>, every coaching protocol is built by Coach Neetu around your specific goals — whether you need a calorie deficit for fat loss, structured strength training for muscle tone, or a flexible vegetarian diet that fits family meals.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="p-4 bg-[#101014] border border-white/10">
                  <span className="text-[#FFC515] font-bold text-xs uppercase block mb-1">01 / TAILORED NUTRITION</span>
                  <p className="text-xs text-white/60">Macro-balanced meal guidance calculated for your daily schedule, dietary choices, and authentic home cooking.</p>
                </div>
                <div className="p-4 bg-[#101014] border border-white/10">
                  <span className="text-[#FFC515] font-bold text-xs uppercase block mb-1">02 / TARGETED TRAINING</span>
                  <p className="text-xs text-white/60">Progressive workouts designed for your available equipment — home dumbbells or full commercial gym.</p>
                </div>
              </div>

              <p className="text-xs text-white/50 pt-2">
                No extreme deprivation. No dangerous shortcuts. Just consistent, customized coaching designed to help you become the one.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
