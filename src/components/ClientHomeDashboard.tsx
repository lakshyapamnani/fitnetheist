import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Utensils, Dumbbell, TrendingDown, Calendar, ShieldCheck, ChevronRight } from 'lucide-react';

export const ClientHomeDashboard: React.FC = () => {
  const { user, calorieResult, workoutPlan, dailyLogs, setActiveTab } = useApp();

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'GOOD MORNING';
    if (hour < 17) return 'GOOD AFTERNOON';
    return 'GOOD EVENING';
  };

  const currentWeight = user?.weightKg || 78.0;
  const targetWeight = user?.targetWeightKg || 72.0;
  const initialWeight = dailyLogs.length > 0 ? (dailyLogs[0].weightKg || currentWeight) : currentWeight;
  const weightChange = Math.round((currentWeight - initialWeight) * 10) / 10;
  
  const dailyCalories = calorieResult?.currentTargetCalories || 2050;
  const dailyProtein = calorieResult?.recommendedProteinGramsMin || 160;

  const currentWorkoutDay = workoutPlan?.days?.[0] || {
    dayName: 'DAY 01',
    focus: 'Upper Body Strength',
    estimatedMinutes: user?.sessionDurationMinutes || 45
  };

  const friendlyGoalName = (user?.goal || 'LOSE_WEIGHT')
    .replace('LOSE_WEIGHT', 'Fat Loss')
    .replace('BUILD_MUSCLE', 'Muscle Hypertrophy')
    .replace('MAINTAIN', 'Maintenance')
    .replace('GAIN_WEIGHT', 'Weight Gain')
    .replace('STRENGTH', 'Strength Peak')
    .replace('ENDURANCE', 'Endurance Conditioning')
    .replace('_', ' ');

  return (
    <div className="w-full bg-[#0E0E10] border border-[#242424] rounded-xl p-6 sm:p-8 mb-12 shadow-sm">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#202022] gap-3">
        <div>
          <span className="text-[11px] font-mono-num font-semibold text-[#FFC515] tracking-widest uppercase block">
            {getGreeting()}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F5F5F5] font-display mt-0.5">
            {user?.name || 'Athlete'}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-[#9A9A9A] font-mono-num block">CURRENT GOAL</span>
            <span className="text-sm font-semibold text-[#F5F5F5]">
              {friendlyGoalName} · {targetWeight} kg target
            </span>
          </div>
          <button
            onClick={() => setActiveTab('me')}
            className="px-3 py-1.5 bg-[#161618] hover:bg-[#1E1E22] border border-[#2A2A2E] text-xs text-[#9A9A9A] hover:text-[#F5F5F5] font-mono-num transition-colors rounded"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Main 3 Action Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-[#202022]">
        
        {/* 1. Today's Plan */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono-num text-[#9A9A9A] tracking-wider uppercase font-medium">
              TODAY'S ACTION
            </span>
            <span className="text-xs text-[#FFC515] font-mono-num">ON TRACK</span>
          </div>

          <div className="bg-[#141416] p-4 rounded-lg border border-[#222226] space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#1C1C20] rounded border border-[#28282D] text-[#FFC515] shrink-0 mt-0.5">
                <Utensils size={15} />
              </div>
              <div>
                <span className="text-[11px] text-[#9A9A9A] font-mono-num block">NUTRITION TARGET</span>
                <span className="text-base font-bold text-[#F5F5F5] font-mono-num">
                  {dailyCalories.toLocaleString()} <span className="text-xs font-normal text-[#9A9A9A]">kcal</span>
                </span>
                <span className="text-xs text-[#9A9A9A] block mt-0.5">
                  {dailyProtein}g protein target
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-[#1F1F24]">
              <div className="p-2 bg-[#1C1C20] rounded border border-[#28282D] text-[#FFC515] shrink-0 mt-0.5">
                <Dumbbell size={15} />
              </div>
              <div>
                <span className="text-[11px] text-[#9A9A9A] font-mono-num block">TRAINING</span>
                <span className="text-sm font-semibold text-[#F5F5F5] block">
                  {currentWorkoutDay.focus}
                </span>
                <span className="text-xs text-[#9A9A9A] font-mono-num">
                  {currentWorkoutDay.estimatedMinutes} minutes
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('plan')}
            className="w-full py-2.5 px-4 bg-[#FFC515] hover:bg-[#E6AF0F] text-black font-semibold text-xs font-mono-num uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
          >
            <span>VIEW TODAY'S PLAN</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 2. Progress Overview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono-num text-[#9A9A9A] tracking-wider uppercase font-medium">
              PROGRESS SNAPSHOT
            </span>
            <span className="text-xs text-[#9A9A9A] font-mono-num">
              {user?.streakDays || 14}d streak
            </span>
          </div>

          <div className="bg-[#141416] p-4 rounded-lg border border-[#222226] space-y-4">
            <div>
              <span className="text-[11px] text-[#9A9A9A] font-mono-num block">CURRENT WEIGHT</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-bold font-mono-num text-[#F5F5F5]">
                  {currentWeight}
                </span>
                <span className="text-xs text-[#9A9A9A] font-mono-num">kg</span>
                {weightChange !== 0 && (
                  <span className={`text-xs font-mono-num font-medium ml-auto flex items-center gap-1 ${
                    weightChange < 0 ? 'text-[#FFC515]' : 'text-[#9A9A9A]'
                  }`}>
                    <TrendingDown size={13} />
                    {weightChange > 0 ? `+${weightChange}` : weightChange} kg
                  </span>
                )}
              </div>
            </div>

            {/* Clean Progress Meter */}
            <div>
              <div className="flex justify-between text-xs font-mono-num text-[#9A9A9A] mb-1.5">
                <span>Start: {initialWeight} kg</span>
                <span>Target: {targetWeight} kg</span>
              </div>
              <div className="w-full bg-[#1C1C20] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#FFC515] h-full rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, Math.max(15, Math.round((Math.abs(initialWeight - currentWeight) / Math.max(1, Math.abs(initialWeight - targetWeight))) * 100)))}%` }}
                />
              </div>
            </div>

            <p className="text-[11px] text-[#9A9A9A] leading-relaxed">
              Consistently on track for your target timeline.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('progress')}
            className="w-full py-2.5 px-4 bg-[#18181B] hover:bg-[#202024] border border-[#28282D] text-[#F5F5F5] font-medium text-xs font-mono-num uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
          >
            <span>VIEW PROGRESS</span>
            <ChevronRight size={14} className="text-[#9A9A9A]" />
          </button>
        </div>

        {/* 3. Next Check-In & Coaching Desk */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono-num text-[#9A9A9A] tracking-wider uppercase font-medium">
              NEXT CHECK-IN
            </span>
            <span className="text-xs text-[#FFC515] font-mono-num">SUNDAY</span>
          </div>

          <div className="bg-[#141416] p-4 rounded-lg border border-[#222226] space-y-3.5">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#1C1C20] rounded border border-[#28282D] text-[#FFC515] shrink-0 mt-0.5">
                <Calendar size={15} />
              </div>
              <div>
                <span className="text-sm font-semibold text-[#F5F5F5] block">
                  Weekly Bio-Feedback Review
                </span>
                <p className="text-xs text-[#9A9A9A] mt-0.5 leading-relaxed">
                  Log your morning weight, waist measurement, and weekly adherence rating.
                </p>
              </div>
            </div>

            <div className="p-3 bg-[#111113] rounded border border-[#1E1E22] text-xs text-[#9A9A9A] flex items-center justify-between">
              <span className="font-mono-num">Coach Neetu's Desk:</span>
              <span className="text-[#F5F5F5] font-medium">Active 1-on-1</span>
            </div>
          </div>

          <button
            onClick={() => {
              const text = encodeURIComponent(`Hi Coach Neetu, this is ${user?.name || 'Athlete'}. Checking in on my plan.`);
              window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer');
            }}
            className="w-full py-2.5 px-4 bg-[#18181B] hover:bg-[#202024] border border-[#28282D] text-[#F5F5F5] font-medium text-xs font-mono-num uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
          >
            <span>MESSAGE COACH NEETU</span>
            <ArrowRight size={14} className="text-[#9A9A9A]" />
          </button>
        </div>

      </div>

      {/* Bottom Subtle Navigation Bar */}
      <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-num text-[#9A9A9A]">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-[#FFC515]" />
          <span>Profile values automatically synchronize across all fitness tools.</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setActiveTab('plan')} className="hover:text-[#F5F5F5] transition-colors">
            Nutrition & Workout Plan →
          </button>
          <button onClick={() => setActiveTab('me')} className="hover:text-[#F5F5F5] transition-colors">
            Account & Settings →
          </button>
        </div>
      </div>

    </div>
  );
};
