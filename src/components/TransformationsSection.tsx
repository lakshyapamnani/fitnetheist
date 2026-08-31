import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TRANSFORMATIONS_DATA } from '../data/challengesData';
import { ArrowRight, Quote, CheckCircle2 } from 'lucide-react';

export const TransformationsSection: React.FC = () => {
  const { setActiveTab } = useApp();
  const [filter, setFilter] = useState<'ALL' | 'WEIGHT_LOSS' | 'MUSCLE_GAIN' | 'RECOMP'>('ALL');

  const filteredItems = TRANSFORMATIONS_DATA.filter(item => {
    if (filter === 'ALL') return true;
    return item.category === filter;
  });

  return (
    <div id="transformations-section-page" className="min-h-screen bg-[#08080a] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 bg-[#FFC515]"></span>
              <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#FFC515]">
                EMPIRICAL EVIDENCE // 09
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight font-display">
              REAL PEOPLE.<br />
              <span className="text-[#FFC515]">REAL PROGRESS.</span>
            </h1>
            <p className="text-white/70 text-sm max-w-2xl mt-2 font-mono-num">
              Real discipline yields measurable biological change. Every result below is achieved through verified caloric calculation, periodized resistance training, and unbroken adherence.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 p-1 bg-[#14141a] border border-white/10 font-mono-num text-xs">
            {[
              { id: 'ALL', label: 'ALL ATHLETES' },
              { id: 'WEIGHT_LOSS', label: 'FAT LOSS' },
              { id: 'MUSCLE_GAIN', label: 'LEAN BULK' },
              { id: 'RECOMP', label: 'RECOMPOSITION' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3 py-1.5 uppercase font-bold transition-colors ${
                  filter === tab.id ? 'bg-[#FFC515] text-black font-extrabold' : 'text-white/60 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Transformations Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="border border-white/10 bg-[#101014] flex flex-col justify-between hover:border-white/30 transition-all"
            >
              {/* Top Split Photography: Before / After */}
              <div className="grid grid-cols-2 h-72 w-full bg-[#14141a] border-b border-white/10 overflow-hidden relative">
                <div className="relative h-full w-full border-r border-white/10">
                  <img
                    src={item.beforePhoto}
                    alt={`${item.name} Before`}
                    className="w-full h-full object-cover filter grayscale contrast-125"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/80 text-[10px] font-mono-num text-white/50 uppercase font-bold">
                    BEFORE
                  </span>
                </div>

                <div className="relative h-full w-full">
                  <img
                    src={item.afterPhoto}
                    alt={`${item.name} After`}
                    className="w-full h-full object-cover filter grayscale contrast-125"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 bg-[#FFC515] text-[10px] font-mono-num text-black uppercase font-extrabold">
                    AFTER
                  </span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold font-mono-num text-white uppercase">
                      {item.name} <span className="text-xs text-white/40 font-normal">({item.age} YRS)</span>
                    </h3>
                    <p className="text-xs font-mono-num text-[#FFC515] font-bold uppercase">
                      {item.duration} PROTOCOL
                    </p>
                  </div>
                  <div className="text-right font-mono-num">
                    <span className="text-sm font-bold text-white block">
                      {item.statChange}
                    </span>
                    <span className="text-[10px] text-white/40 uppercase">VERIFIED RESULT</span>
                  </div>
                </div>

                {/* Key Strategy */}
                <div className="bg-white/5 p-3 border border-white/5 font-mono-num text-xs text-white/80">
                  <span className="text-white/40 block text-[10px] uppercase">PROGRAM PROTOCOL</span>
                  <p className="mt-0.5">{item.keyStrategy}</p>
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs text-white/60 italic font-mono-num border-l-2 border-white/20 pl-3 py-1">
                  "{item.quote}"
                </p>
              </div>

              <div className="border-t border-white/10 px-6 py-3 flex items-center justify-between text-xs font-mono-num text-white/50 bg-[#0c0c0e]">
                <span>CATEGORY: {item.category.replace('_', ' ')}</span>
                <span className="text-[#FFC515] font-bold flex items-center gap-1">
                  <CheckCircle2 size={12} /> VERIFIED ATHLETE
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Editorial Callout */}
        <div className="border border-white/10 bg-[#101014] p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase font-display text-white">
              READY TO BECOME THE NEXT CASE STUDY?
            </h3>
            <p className="text-white/70 text-xs sm:text-sm font-mono-num mt-2">
              Start with exact energy calculations. Build your personalized 7-day diet and begin your training protocol today.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('calculate')}
            className="px-8 py-4 bg-[#FFC515] hover:bg-[#E6AF0F] text-black font-mono-num font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-3 shrink-0 transition-colors shadow-[0_0_15px_rgba(255,197,21,0.25)]"
          >
            <span>START WITH CALORIE CALCULATOR</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};
