import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DietGenerator } from './DietGenerator';
import { WorkoutPlanner } from './WorkoutPlanner';
import { CalorieCalculator } from './CalorieCalculator';
import { 
  Utensils, 
  Dumbbell, 
  Moon, 
  Droplet, 
  ArrowRight, 
  ChevronRight, 
  Sliders, 
  RotateCcw, 
  CheckCircle2, 
  ShieldCheck, 
  Plus, 
  Minus,
  Sparkles,
  Info
} from 'lucide-react';

export const ClientPlanView: React.FC = () => {
  const { user, calorieResult, dietPlan, workoutPlan, setActiveTab } = useApp();

  // Active sub-tab in Plan: 'OVERVIEW' | 'NUTRITION' | 'WORKOUT' | 'CALCULATOR'
  const [activeSubTab, setActiveSubTab] = useState<'OVERVIEW' | 'NUTRITION' | 'WORKOUT' | 'CALCULATOR'>('OVERVIEW');

  // Interactive quick hydration tracker for the day
  const [waterLoggedMl, setWaterLoggedMl] = useState<number>(1750);
  const waterTargetMl = Math.round((user?.weightKg || 78) * 38);

  const dailyCalories = calorieResult?.currentTargetCalories || 2050;
  const protein = calorieResult?.recommendedProteinGramsMin || 165;
  const carbs = calorieResult?.recommendedCarbsGrams || 205;
  const fat = calorieResult?.recommendedFatGrams || 55;

  const currentDaySplit = workoutPlan?.days?.[0] || {
    dayName: 'DAY 01',
    focus: 'Upper Body Hypertrophy',
    estimatedMinutes: user?.sessionDurationMinutes || 45,
    exercises: []
  };

  const handleAddWater = (amount: number) => {
    setWaterLoggedMl(prev => Math.max(0, prev + amount));
  };

  return (
    <div id="client-plan-page" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Top Header & Sub-Nav */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-8 border-b border-[#242424] gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 bg-[#FFC515]"></span>
            <span className="text-[11px] font-mono-num font-bold uppercase tracking-[0.25em] text-[#FFC515]">
              ACTIVE BLUEPRINT
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#F5F5F5] font-display">
            YOUR CUSTOM PLAN.
          </h1>
          <p className="text-xs sm:text-sm text-[#9A9A9A] font-mono-num mt-1">
            Synchronized with your profile: {user?.weightKg} kg · {user?.trainingDaysPerWeek || 4} training days/wk
          </p>
        </div>

        {/* Plan Mode Switcher */}
        <div className="inline-flex p-1 bg-[#121214] border border-[#242426] rounded-lg font-mono-num text-xs">
          <button
            onClick={() => setActiveSubTab('OVERVIEW')}
            className={`px-4 py-2 rounded transition-colors ${
              activeSubTab === 'OVERVIEW'
                ? 'bg-[#FFC515] text-black font-bold'
                : 'text-[#9A9A9A] hover:text-[#F5F5F5]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveSubTab('NUTRITION')}
            className={`px-4 py-2 rounded transition-colors ${
              activeSubTab === 'NUTRITION'
                ? 'bg-[#FFC515] text-black font-bold'
                : 'text-[#9A9A9A] hover:text-[#F5F5F5]'
            }`}
          >
            Nutrition
          </button>
          <button
            onClick={() => setActiveSubTab('WORKOUT')}
            className={`px-4 py-2 rounded transition-colors ${
              activeSubTab === 'WORKOUT'
                ? 'bg-[#FFC515] text-black font-bold'
                : 'text-[#9A9A9A] hover:text-[#F5F5F5]'
            }`}
          >
            Workout
          </button>
          <button
            onClick={() => setActiveSubTab('CALCULATOR')}
            className={`px-4 py-2 rounded transition-colors ${
              activeSubTab === 'CALCULATOR'
                ? 'bg-[#FFC515] text-black font-bold'
                : 'text-[#9A9A9A] hover:text-[#F5F5F5]'
            }`}
          >
            Calorie Targets
          </button>
        </div>
      </div>

      {/* =========================================================================
          SUB-VIEW 1: OVERVIEW (Minimal, Calm Executive Dashboard)
          ========================================================================= */}
      {activeSubTab === 'OVERVIEW' && (
        <div className="space-y-8">
          
          {/* Profile Banner */}
          <div className="bg-[#0E0E10] border border-[#242424] rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono-num">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#161618] rounded border border-[#26262A] text-[#FFC515]">
                <ShieldCheck size={16} />
              </div>
              <div>
                <span className="text-[#9A9A9A] block">CURRENT PROFILE INPUTS</span>
                <span className="text-[#F5F5F5] font-semibold text-sm">
                  {user?.weightKg} kg · {user?.heightCm} cm · {user?.age} yrs · {user?.activityLevel} · {user?.goal?.replace('_', ' ')}
                </span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('me')}
              className="px-3.5 py-1.5 bg-[#161618] hover:bg-[#202024] border border-[#2A2A2E] text-[#FFC515] hover:text-white rounded transition-colors"
            >
              Edit Profile in ME →
            </button>
          </div>

          {/* 3 Core Pillars: NUTRITION, TRAINING, RECOVERY */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* 1. NUTRITION */}
            <div className="bg-[#0E0E10] border border-[#242424] rounded-xl p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#202022]">
                  <div className="flex items-center gap-2">
                    <Utensils size={16} className="text-[#FFC515]" />
                    <h2 className="text-sm font-bold uppercase tracking-wider font-mono-num text-[#F5F5F5]">
                      NUTRITION
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono-num text-[#9A9A9A]">
                    {user?.mealsPerDay || 4} meals/day
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-[#9A9A9A] font-mono-num block">DAILY CALORIES</span>
                  <div className="flex items-baseline gap-1 mt-0.5 font-mono-num">
                    <span className="text-3xl font-bold text-[#F5F5F5]">
                      {dailyCalories.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#9A9A9A]">kcal / day</span>
                  </div>
                </div>

                {/* Macro Split Bar */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] text-[#9A9A9A] font-mono-num block">MACRONUTRIENT TARGETS</span>
                  <div className="grid grid-cols-3 gap-2 text-xs font-mono-num">
                    <div className="p-2.5 bg-[#141416] rounded border border-[#222226]">
                      <span className="text-[#9A9A9A] block text-[10px]">PROTEIN</span>
                      <span className="text-sm font-bold text-[#FFC515]">{protein}g</span>
                    </div>
                    <div className="p-2.5 bg-[#141416] rounded border border-[#222226]">
                      <span className="text-[#9A9A9A] block text-[10px]">CARBS</span>
                      <span className="text-sm font-bold text-[#F5F5F5]">{carbs}g</span>
                    </div>
                    <div className="p-2.5 bg-[#141416] rounded border border-[#222226]">
                      <span className="text-[#9A9A9A] block text-[10px]">FAT</span>
                      <span className="text-sm font-bold text-[#9A9A9A]">{fat}g</span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-[#9A9A9A] leading-relaxed">
                  Diet style: {user?.dietType?.replace('_', ' ') || 'Non-Vegetarian'} tailored to your weight goal.
                </p>
              </div>

              <button
                onClick={() => setActiveSubTab('NUTRITION')}
                className="w-full py-2.5 px-4 bg-[#141416] hover:bg-[#1E1E22] border border-[#26262A] text-[#F5F5F5] font-semibold text-xs font-mono-num uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
              >
                <span>VIEW NUTRITION PLAN</span>
                <ChevronRight size={14} className="text-[#9A9A9A]" />
              </button>
            </div>

            {/* 2. TRAINING */}
            <div className="bg-[#0E0E10] border border-[#242424] rounded-xl p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#202022]">
                  <div className="flex items-center gap-2">
                    <Dumbbell size={16} className="text-[#FFC515]" />
                    <h2 className="text-sm font-bold uppercase tracking-wider font-mono-num text-[#F5F5F5]">
                      TRAINING
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono-num text-[#9A9A9A]">
                    {user?.trainingDaysPerWeek || 4} days / week
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-[#9A9A9A] font-mono-num block">CURRENT SPLIT</span>
                  <span className="text-lg font-bold text-[#F5F5F5] block mt-0.5">
                    {workoutPlan?.splitType || 'Upper / Lower Hypertrophy'}
                  </span>
                  <span className="text-xs text-[#9A9A9A] font-mono-num block mt-0.5">
                    {workoutPlan?.difficulty || 'Intermediate'} · {user?.sessionDurationMinutes || 45} min sessions
                  </span>
                </div>

                <div className="p-3 bg-[#141416] rounded border border-[#222226] text-xs font-mono-num space-y-1.5">
                  <div className="flex justify-between text-[#9A9A9A]">
                    <span>Location:</span>
                    <span className="text-[#F5F5F5] font-medium">{user?.trainingLocation || 'Commercial Gym'}</span>
                  </div>
                  <div className="flex justify-between text-[#9A9A9A]">
                    <span>Equipment:</span>
                    <span className="text-[#F5F5F5] font-medium">{(user?.equipmentAvailable || 'FULL_GYM').replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between text-[#9A9A9A]">
                    <span>Today's Focus:</span>
                    <span className="text-[#FFC515] font-medium">{currentDaySplit.focus}</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#9A9A9A] leading-relaxed">
                  Progressive overload programmed with calculated rest timers and RPE guidance.
                </p>
              </div>

              <button
                onClick={() => setActiveSubTab('WORKOUT')}
                className="w-full py-2.5 px-4 bg-[#141416] hover:bg-[#1E1E22] border border-[#26262A] text-[#F5F5F5] font-semibold text-xs font-mono-num uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
              >
                <span>VIEW WORKOUT PLAN</span>
                <ChevronRight size={14} className="text-[#9A9A9A]" />
              </button>
            </div>

            {/* 3. RECOVERY */}
            <div className="bg-[#0E0E10] border border-[#242424] rounded-xl p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#202022]">
                  <div className="flex items-center gap-2">
                    <Droplet size={16} className="text-[#FFC515]" />
                    <h2 className="text-sm font-bold uppercase tracking-wider font-mono-num text-[#F5F5F5]">
                      RECOVERY
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono-num text-[#9A9A9A]">
                    DAILY PROTOCOL
                  </span>
                </div>

                {/* Hydration Tracker */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono-num">
                    <span className="text-[#9A9A9A]">HYDRATION</span>
                    <span className="text-[#F5F5F5] font-semibold">
                      {waterLoggedMl} / {waterTargetMl} ml
                    </span>
                  </div>
                  <div className="w-full bg-[#1C1C20] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#FFC515] h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.round((waterLoggedMl / waterTargetMl) * 100))}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleAddWater(250)}
                      className="px-2.5 py-1 bg-[#141416] hover:bg-[#1E1E22] border border-[#242428] rounded text-[11px] font-mono-num text-[#9A9A9A] hover:text-[#F5F5F5] transition-colors"
                    >
                      +250 ml
                    </button>
                    <button
                      onClick={() => handleAddWater(500)}
                      className="px-2.5 py-1 bg-[#141416] hover:bg-[#1E1E22] border border-[#242428] rounded text-[11px] font-mono-num text-[#9A9A9A] hover:text-[#F5F5F5] transition-colors"
                    >
                      +500 ml
                    </button>
                    <button
                      onClick={() => handleAddWater(-250)}
                      className="px-2 py-1 bg-[#141416] hover:bg-[#1E1E22] border border-[#242428] rounded text-[11px] font-mono-num text-[#9A9A9A] hover:text-[#F5F5F5] transition-colors ml-auto"
                    >
                      -250 ml
                    </button>
                  </div>
                </div>

                {/* Sleep Info */}
                <div className="p-3 bg-[#141416] rounded border border-[#222226] text-xs font-mono-num space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[#F5F5F5]">
                      <Moon size={13} className="text-[#FFC515]" />
                      <span>SLEEP TARGET</span>
                    </div>
                    <span className="font-semibold text-[#F5F5F5]">
                      {user?.sleepHoursTarget || 7.5} hours / night
                    </span>
                  </div>
                  <p className="text-[10px] text-[#9A9A9A] mt-1">
                    Optimal slow-wave sleep aids hormone regulation and muscle protein synthesis.
                  </p>
                </div>

                <p className="text-[11px] text-[#9A9A9A] leading-relaxed">
                  Resting heart rate baseline: {user?.restingHeartRate || 64} bpm.
                </p>
              </div>

              <div className="text-center py-2 text-[11px] text-[#9A9A9A] font-mono-num">
                Logged daily automatically
              </div>
            </div>

          </div>

          {/* Quick Deep Link into Calorie Engine */}
          <div className="p-6 bg-[#0E0E10] border border-[#242424] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-[#F5F5F5] font-display">
                Need to adjust caloric deficit, surplus, or macro breakdown?
              </h3>
              <p className="text-xs text-[#9A9A9A] font-mono-num mt-0.5">
                Explore the Mifflin-St Jeor engine, TDEE multiplier, or customize your protein-to-carb ratios.
              </p>
            </div>
            <button
              onClick={() => setActiveSubTab('CALCULATOR')}
              className="px-5 py-2.5 bg-[#FFC515] hover:bg-[#E6AF0F] text-black font-bold text-xs font-mono-num uppercase tracking-wider rounded transition-colors whitespace-nowrap"
            >
              CALORIE & MACRO TARGETS →
            </button>
          </div>

        </div>
      )}

      {/* =========================================================================
          SUB-VIEW 2: NUTRITION PLAN (Diet Generator)
          ========================================================================= */}
      {activeSubTab === 'NUTRITION' && (
        <div>
          <DietGenerator />
        </div>
      )}

      {/* =========================================================================
          SUB-VIEW 3: WORKOUT PROGRAM (Workout Planner)
          ========================================================================= */}
      {activeSubTab === 'WORKOUT' && (
        <div>
          <WorkoutPlanner />
        </div>
      )}

      {/* =========================================================================
          SUB-VIEW 4: CALORIE & MACRO TARGETS (Calorie Calculator)
          ========================================================================= */}
      {activeSubTab === 'CALCULATOR' && (
        <div>
          <CalorieCalculator />
        </div>
      )}

    </div>
  );
};
