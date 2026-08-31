import React, { useState } from 'react';
import { CalorieCalculator } from './CalorieCalculator';
import { DietGenerator } from './DietGenerator';
import { WorkoutPlanner } from './WorkoutPlanner';
import { Calculator, Utensils, Dumbbell, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FitnessToolsPage: React.FC = () => {
  const { setActiveTab } = useApp();
  const [activeTool, setActiveTool] = useState<'calc' | 'diet' | 'workout'>('calc');

  return (
    <div id="fitness-tools-suite-page" className="min-h-screen bg-[#08080a] text-white pt-24 pb-20">
      
      {/* Top Banner / Switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        
        {/* Breadcrumb / Back to Home */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <button
            onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 text-xs font-mono-num text-white/60 hover:text-[#FFC515] transition-colors uppercase tracking-wider"
          >
            <ArrowLeft size={14} />
            <span>BACK TO COACHING HOMEPAGE</span>
          </button>
          
          <span className="text-[10px] font-mono-num text-[#FFC515] uppercase tracking-widest font-bold">
            FITNETHEIST DIGITAL SUITE
          </span>
        </div>

        {/* Page Title & Context */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-display text-white">
              FITNESS <span className="text-[#FFC515]">TOOLS</span>
            </h1>
            <p className="text-white/60 font-mono-num text-xs sm:text-sm mt-1">
              Personalized calculators and generation engines to understand your calories, nutrition and training.
            </p>
          </div>

          {/* 3-Tool Mode Selector Bar */}
          <div className="inline-flex p-1 bg-[#101014] border border-white/15 font-mono-num text-xs">
            <button
              id="tool-tab-calorie-calc"
              onClick={() => setActiveTool('calc')}
              className={`px-4 py-2.5 uppercase font-bold tracking-wider flex items-center gap-2 transition-all ${
                activeTool === 'calc'
                  ? 'bg-[#FFC515] text-black font-extrabold shadow-[0_0_12px_rgba(255,197,21,0.2)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Calculator size={14} />
              <span>CALORIE CALCULATOR</span>
            </button>

            <button
              id="tool-tab-diet-gen"
              onClick={() => setActiveTool('diet')}
              className={`px-4 py-2.5 uppercase font-bold tracking-wider flex items-center gap-2 transition-all ${
                activeTool === 'diet'
                  ? 'bg-[#FFC515] text-black font-extrabold shadow-[0_0_12px_rgba(255,197,21,0.2)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Utensils size={14} />
              <span>DIET GENERATOR</span>
            </button>

            <button
              id="tool-tab-workout-coach"
              onClick={() => setActiveTool('workout')}
              className={`px-4 py-2.5 uppercase font-bold tracking-wider flex items-center gap-2 transition-all ${
                activeTool === 'workout'
                  ? 'bg-[#FFC515] text-black font-extrabold shadow-[0_0_12px_rgba(255,197,21,0.2)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Dumbbell size={14} />
              <span>WORKOUT COACH</span>
            </button>
          </div>
        </div>

      </div>

      {/* Embedded Selected Tool Container */}
      <div className="w-full">
        {activeTool === 'calc' && (
          <div id="tools-calorie-calculator-view">
            <CalorieCalculator />
          </div>
        )}

        {activeTool === 'diet' && (
          <div id="tools-diet-generator-view">
            <DietGenerator />
          </div>
        )}

        {activeTool === 'workout' && (
          <div id="tools-workout-coach-view">
            <WorkoutPlanner />
          </div>
        )}
      </div>

    </div>
  );
};
