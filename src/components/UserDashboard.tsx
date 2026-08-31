import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CHALLENGES_DATA } from '../data/challengesData';
import { DailyLog } from '../types';
import { 
  Flame, 
  CheckCircle2, 
  Droplet, 
  Dumbbell, 
  Footprints, 
  Scale, 
  TrendingUp, 
  Plus, 
  Calendar, 
  Award,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { 
    user, 
    calorieResult, 
    dietPlan, 
    workoutPlan, 
    dailyLogs, 
    logDailyProgress,
    setActiveTab,
    openAuthModal
  } = useApp();

  const activeChallenge = CHALLENGES_DATA.find(c => c.id === user?.joinedChallengeId) || CHALLENGES_DATA[1];

  // Quick Log Modal State
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [logCalories, setLogCalories] = useState<number>(calorieResult?.currentTargetCalories || 2050);
  const [logProtein, setLogProtein] = useState<number>(155);
  const [logWater, setLogWater] = useState<number>(3.0);
  const [logWeight, setLogWeight] = useState<number>(user?.weightKg || 78);
  const [workoutDone, setWorkoutDone] = useState<boolean>(true);
  const [workoutNotes, setWorkoutNotes] = useState<string>('Push Day: Incline DB Press 34kg 4x8, DB Flies, Dips.');

  const handleQuickAddWater = (liters: number) => {
    const today = new Date().toISOString().split('T')[0];
    const existing = dailyLogs.find(l => l.date === today);
    const currentWater = existing ? existing.waterLiters : 2.0;
    
    logDailyProgress({
      waterLiters: Math.round((currentWater + liters) * 10) / 10
    });
  };

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    logDailyProgress({
      caloriesConsumed: logCalories,
      proteinConsumed: logProtein,
      waterLiters: logWater,
      weightKg: logWeight,
      workoutDone: workoutDone,
      workoutTitle: workoutNotes
    });
    setIsLogModalOpen(false);
  };

  const today = new Date().toISOString().split('T')[0];
  const todayLog: DailyLog = dailyLogs.find(l => l.date === today) || {
    date: today,
    workoutDone: true,
    caloriesConsumed: 2050,
    proteinConsumed: 155,
    waterLiters: 2.8,
    weightKg: 78.0,
    workoutTitle: 'Heavy Push Session // RPE 8.5'
  };

  const targetCalories = calorieResult?.currentTargetCalories || 2050;
  const targetProtein = calorieResult?.recommendedProteinGramsMin || 155;
  const targetWater = 3.5;

  return (
    <div id="user-dashboard-page" className="min-h-screen bg-[#08080a] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header & Streak Badge */}
        <div className="border-b border-white/10 pb-8 mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="h-2 w-2 bg-[#d8ff38]"></span>
              <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#d8ff38]">
                ATHLETE PERFORMANCE DASHBOARD
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-display">
              {user ? `COMMAND CENTER // ${user.name}` : 'ATHLETE COMMAND CENTER'}
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm font-mono-num mt-1">
              Live tracking, daily compliance thresholds, and habit accountability.
            </p>
          </div>

          {/* Daily Streak Badge */}
          <div className="flex items-center gap-4 bg-zinc-950 border border-white/15 p-4 self-start lg:self-auto">
            <div className="p-3 bg-[#d8ff38]/10 border border-[#d8ff38]/30">
              <Flame size={24} className="text-[#d8ff38]" />
            </div>
            <div className="font-mono-num">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white leading-none">
                  {user?.streakDays || 12} DAYS
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-[#d8ff38] text-black font-bold uppercase">
                  UNBROKEN
                </span>
              </div>
              <span className="text-[11px] text-zinc-400 block mt-1">
                DISCIPLINE RECORD: 28 DAYS
              </span>
            </div>
            <button
              onClick={() => setIsLogModalOpen(true)}
              className="ml-4 px-4 py-2 bg-[#d8ff38] hover:bg-[#c9f028] text-black font-mono-num font-bold text-xs uppercase tracking-wider transition-colors shrink-0"
            >
              + LOG TODAY
            </button>
          </div>
        </div>

        {/* 4 Performance Metric Trackers for Today */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          
          {/* 01: Training Status */}
          <div className="border border-white/10 bg-zinc-950 p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono-num text-zinc-400 uppercase">01 // WORKOUT STATUS</span>
              <Dumbbell size={16} className="text-[#d8ff38]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className={todayLog.workoutDone ? "text-[#d8ff38]" : "text-zinc-600"} />
                <span className="text-lg font-bold font-mono-num text-white">
                  {todayLog.workoutDone ? 'SESSION COMPLETED' : 'PENDING'}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono-num mt-1 truncate">
                {todayLog.workoutTitle || 'Upper Power Routine'}
              </p>
            </div>
            <div className="border-t border-white/10 pt-3 mt-4 flex justify-between text-[11px] font-mono-num text-zinc-500">
              <span>EST. TIME: 45 MIN</span>
              <span className="text-[#d8ff38]">100% LOGGED</span>
            </div>
          </div>

          {/* 02: Nutrition & Calories */}
          <div className="border border-white/10 bg-zinc-950 p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono-num text-zinc-400 uppercase">02 // NUTRITION TARGET</span>
              <span className="text-xs font-mono-num text-[#d8ff38] font-bold">
                {Math.round((todayLog.caloriesConsumed / targetCalories) * 100)}%
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono-num text-white">
                  {todayLog.caloriesConsumed}
                </span>
                <span className="text-xs font-mono-num text-zinc-500">/ {targetCalories} KCAL</span>
              </div>
              <div className="w-full bg-zinc-900 h-1.5 mt-2 overflow-hidden">
                <div 
                  className="bg-[#d8ff38] h-full"
                  style={{ width: `${Math.min(100, (todayLog.caloriesConsumed / targetCalories) * 100)}%` }}
                />
              </div>
            </div>
            <div className="border-t border-white/10 pt-3 mt-4 flex justify-between text-[11px] font-mono-num text-zinc-400">
              <span>PROTEIN: <strong className="text-white">{todayLog.proteinConsumed}g</strong> / {targetProtein}g</span>
              <span className="text-[#d8ff38]">ON TRACK</span>
            </div>
          </div>

          {/* 03: Water Tracker */}
          <div className="border border-white/10 bg-zinc-950 p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono-num text-zinc-400 uppercase">03 // HYDRATION</span>
              <Droplet size={16} className="text-cyan-400" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono-num text-white">
                  {todayLog.waterLiters.toFixed(1)}L
                </span>
                <span className="text-xs font-mono-num text-zinc-500">/ {targetWater.toFixed(1)}L</span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => handleQuickAddWater(0.25)}
                  className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-[10px] font-mono-num text-zinc-300 uppercase"
                >
                  +0.25 L
                </button>
                <button
                  onClick={() => handleQuickAddWater(0.5)}
                  className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-[10px] font-mono-num text-zinc-300 uppercase"
                >
                  +0.5 L
                </button>
              </div>
            </div>
            <div className="border-t border-white/10 pt-3 mt-4 flex justify-between text-[11px] font-mono-num text-zinc-500">
              <span>TARGET: 3.5L / DAY</span>
              <span className="text-cyan-400">{Math.round((todayLog.waterLiters / targetWater) * 100)}%</span>
            </div>
          </div>

          {/* 04: Weight */}
          <div className="border border-white/10 bg-zinc-950 p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono-num text-zinc-400 uppercase">04 // MORNING WEIGHT</span>
              <Scale size={16} className="text-[#d8ff38]" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono-num text-white">
                  {todayLog.weightKg || 78.0}
                </span>
                <span className="text-xs font-mono-num text-zinc-500">KG</span>
              </div>
              <p className="text-xs text-zinc-400 font-mono-num mt-1">
                GOAL: <strong className="text-white">{user?.goal.replace('_', ' ')}</strong>
              </p>
            </div>
            <div className="border-t border-white/10 pt-3 mt-4 flex justify-between text-[11px] font-mono-num text-zinc-500">
              <span>7-DAY TREND: -0.45 KG</span>
              <span className="text-[#d8ff38]">OPTIMAL</span>
            </div>
          </div>

        </div>

        {/* Middle Row: Active Challenge Tracker (Left) & Consistency Graph (Right) */}
        <div className="grid lg:grid-cols-12 gap-8 mb-10">
          
          {/* Active Challenge Tracker */}
          <div className="lg:col-span-6 bg-zinc-950 border border-white/10 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono-num uppercase tracking-widest text-[#d8ff38] block">
                  ENROLLED CHALLENGE PROGRAM
                </span>
                <h3 className="text-2xl font-extrabold uppercase font-display text-white mt-1">
                  {activeChallenge.title}
                </h3>
              </div>
              <span className="text-xs font-mono-num px-3 py-1 bg-zinc-900 border border-white/10 text-white">
                DAY {user?.joinedChallengeDay || 12} / {activeChallenge.durationDays}
              </span>
            </div>

            {/* Challenge Progress Bar */}
            <div>
              <div className="flex justify-between text-xs font-mono-num text-zinc-400 mb-2">
                <span>STAGE: PHASE 02 (METABOLIC ADAPTATION)</span>
                <span className="text-[#d8ff38] font-bold">57% COMPLETED</span>
              </div>
              <div className="w-full bg-zinc-900 h-2 border border-white/10 overflow-hidden">
                <div className="bg-[#d8ff38] h-full w-[57%]" />
              </div>
            </div>

            {/* Today's Challenge Mission */}
            <div className="p-4 bg-zinc-900/40 border border-white/10 space-y-2">
              <span className="text-xs font-mono-num text-[#d8ff38] font-bold uppercase block">
                TODAY'S NON-NEGOTIABLE MISSIONS:
              </span>
              <div className="space-y-1.5 font-mono-num text-xs text-zinc-300">
                <p className="flex items-center gap-2">
                  <span className="text-[#d8ff38]">✓</span> Complete planned resistance training routine.
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[#d8ff38]">✓</span> Hit 155g+ protein with zero refined sugar snacking.
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[#d8ff38]">✓</span> Drink minimum 3.5L water and log evening check-in.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setActiveTab('challenges')}
                className="text-xs font-mono-num text-zinc-400 hover:text-white uppercase flex items-center gap-1"
              >
                <span>VIEW ALL CHALLENGES</span>
                <ArrowUpRight size={14} />
              </button>

              <button
                onClick={() => setActiveTab('community')}
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-white text-xs font-mono-num uppercase"
              >
                COMMUNITY CHECK-IN
              </button>
            </div>
          </div>

          {/* Consistency & Weekly Metrics */}
          <div className="lg:col-span-6 bg-zinc-950 border border-white/10 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono-num uppercase tracking-widest text-zinc-400 block">
                  SYSTEM ADHERENCE
                </span>
                <h3 className="text-2xl font-extrabold uppercase font-display text-white mt-1">
                  7-DAY COMPLIANCE
                </h3>
              </div>
              <span className="text-lg font-mono-num font-bold text-[#d8ff38]">
                94% CONSISTENCY
              </span>
            </div>

            {/* Visual 7-day Bar Matrix */}
            <div className="space-y-2">
              <span className="text-xs font-mono-num text-zinc-400 uppercase block">WEEKLY ADHERENCE LOG</span>
              <div className="grid grid-cols-7 gap-2 pt-2">
                {[
                  { day: 'MON', score: 100 },
                  { day: 'TUE', score: 95 },
                  { day: 'WED', score: 100 },
                  { day: 'THU', score: 90 },
                  { day: 'FRI', score: 100 },
                  { day: 'SAT', score: 85 },
                  { day: 'SUN', score: 100 }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <div className="h-28 w-full bg-zinc-900 border border-white/5 flex flex-col justify-end p-1">
                      <div 
                        className={`w-full ${item.score >= 95 ? 'bg-[#d8ff38]' : 'bg-zinc-400'}`}
                        style={{ height: `${item.score}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono-num text-zinc-400">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Insights */}
            <div className="p-4 bg-zinc-900/40 border border-white/10 flex items-center justify-between text-xs font-mono-num">
              <div>
                <span className="text-zinc-500 uppercase block text-[10px]">WEIGHT TREND (7D)</span>
                <span className="text-white font-bold text-sm">-0.45 KG LOSS</span>
              </div>
              <div className="h-6 w-px bg-white/10"></div>
              <div>
                <span className="text-zinc-500 uppercase block text-[10px]">AVG CALORIES</span>
                <span className="text-white font-bold text-sm">2,050 KCAL</span>
              </div>
              <div className="h-6 w-px bg-white/10"></div>
              <div>
                <span className="text-zinc-500 uppercase block text-[10px]">WORKOUT SESSIONS</span>
                <span className="text-[#d8ff38] font-bold text-sm">6 / 7 DONE</span>
              </div>
            </div>

          </div>

        </div>

        {/* Quick Log Modal */}
        {isLogModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0c0c0e] border border-white/20 max-w-xl w-full p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono-num uppercase tracking-widest text-[#d8ff38] block">
                    DAILY TELEMETRY ENTRY
                  </span>
                  <h3 className="text-2xl font-bold uppercase font-display text-white mt-0.5">
                    LOG TODAY'S PERFORMANCE
                  </h3>
                </div>
                <button
                  onClick={() => setIsLogModalOpen(false)}
                  className="text-zinc-400 hover:text-white font-mono-num text-xs uppercase"
                >
                  CLOSE
                </button>
              </div>

              <form onSubmit={handleSaveLog} className="space-y-4 font-mono-num text-xs">
                
                {/* Workout Toggle */}
                <div className="p-3 border border-white/10 bg-zinc-950 flex items-center justify-between">
                  <span className="text-white uppercase font-bold">COMPLETED TODAY'S WORKOUT?</span>
                  <button
                    type="button"
                    onClick={() => setWorkoutDone(!workoutDone)}
                    className={`px-4 py-1.5 font-bold uppercase border transition-all ${
                      workoutDone ? 'bg-[#d8ff38] text-black border-[#d8ff38]' : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                    }`}
                  >
                    {workoutDone ? 'YES, FINISHED' : 'REST / MISSED'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 uppercase mb-1">CALORIES (KCAL)</label>
                    <input
                      type="number"
                      value={logCalories}
                      onChange={(e) => setLogCalories(Number(e.target.value))}
                      className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 uppercase mb-1">PROTEIN (GRAMS)</label>
                    <input
                      type="number"
                      value={logProtein}
                      onChange={(e) => setLogProtein(Number(e.target.value))}
                      className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 uppercase mb-1">WATER (LITERS)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={logWater}
                      onChange={(e) => setLogWater(Number(e.target.value))}
                      className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 uppercase mb-1">WEIGHT (KG)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={logWeight}
                      onChange={(e) => setLogWeight(Number(e.target.value))}
                      className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase mb-1">WORKOUT NOTES / LIFTS</label>
                  <input
                    type="text"
                    value={workoutNotes}
                    onChange={(e) => setWorkoutNotes(e.target.value)}
                    placeholder="e.g. 4x8 DB Bench 32kg, 3x12 Dips"
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white"
                  />
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsLogModalOpen(false)}
                    className="px-4 py-2 border border-zinc-800 text-zinc-400 hover:text-white uppercase"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#d8ff38] hover:bg-[#c9f028] text-black font-bold uppercase"
                  >
                    SAVE & ADVANCE STREAK
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
