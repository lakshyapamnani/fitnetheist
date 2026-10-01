import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DailyLog } from '../types';
import { 
  TrendingDown, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  Plus, 
  Award, 
  Scale, 
  Ruler, 
  Flame, 
  Utensils, 
  X,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const ClientProgressView: React.FC = () => {
  const { user, dailyLogs, addDailyLog, calorieResult, setActiveTab } = useApp();

  const [isLogModalOpen, setIsLogModalOpen] = useState<boolean>(false);
  const [logWeight, setLogWeight] = useState<number>(user?.weightKg || 78);
  const [logWater, setLogWater] = useState<number>(2.5);
  const [logCalories, setLogCalories] = useState<number>(calorieResult?.currentTargetCalories || 2050);
  const [logProtein, setLogProtein] = useState<number>(calorieResult?.recommendedProteinGramsMin || 165);
  const [logWorkoutDone, setLogWorkoutDone] = useState<boolean>(true);
  const [logWaist, setLogWaist] = useState<number>(82);
  const [logNotes, setLogNotes] = useState<string>('');

  const currentWeight = user?.weightKg || 78.0;
  const targetWeight = user?.targetWeightKg || 72.0;

  // Derive weight history from daily logs or create a clean 14-day sample progression
  const weightLogs = dailyLogs.filter(log => typeof log.weightKg === 'number' && log.weightKg > 0);
  const chartData = weightLogs.length >= 3 ? weightLogs : [
    { date: 'Day 1', weight: 80.2 },
    { date: 'Day 3', weight: 79.8 },
    { date: 'Day 6', weight: 79.4 },
    { date: 'Day 9', weight: 78.9 },
    { date: 'Day 12', weight: 78.4 },
    { date: 'Today', weight: currentWeight }
  ];

  const startWeight = chartData[0].weight || (chartData[0] as any).weightKg || 80.2;
  const totalLost = Math.round((startWeight - currentWeight) * 10) / 10;
  const remaining = Math.round(Math.abs(currentWeight - targetWeight) * 10) / 10;

  // Calculate SVG coordinates for the weight trend chart
  const weights = chartData.map(d => (d as any).weight || (d as any).weightKg);
  const minW = Math.min(...weights, targetWeight) - 1;
  const maxW = Math.max(...weights, startWeight) + 1;
  const chartHeight = 180;
  const chartWidth = 600;

  const points = chartData.map((d, idx) => {
    const w = (d as any).weight || (d as any).weightKg;
    const x = (idx / Math.max(1, chartData.length - 1)) * (chartWidth - 60) + 30;
    const y = chartHeight - ((w - minW) / (maxW - minW)) * (chartHeight - 40) - 20;
    return { x, y, weight: w, label: (d as any).date };
  });

  const pathString = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: DailyLog = {
      date: new Date().toISOString().split('T')[0],
      weightKg: logWeight,
      waterLiters: logWater,
      caloriesConsumed: logCalories,
      proteinConsumed: logProtein,
      workoutDone: logWorkoutDone,
      waistCm: logWaist || undefined,
      notes: logNotes || undefined
    };
    addDailyLog(newEntry);
    setIsLogModalOpen(false);
  };

  return (
    <div id="client-progress-page" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-8 border-b border-[#242424] gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 bg-[#FFC515]"></span>
            <span className="text-[11px] font-mono-num font-bold uppercase tracking-[0.25em] text-[#FFC515]">
              PROGRESS TRACKER
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#F5F5F5] font-display">
            MEASURED RESULTS.
          </h1>
          <p className="text-xs sm:text-sm text-[#9A9A9A] font-mono-num mt-1">
            Track weight trend, body composition, workout consistency, and nutrition adherence.
          </p>
        </div>

        <button
          onClick={() => setIsLogModalOpen(true)}
          className="px-5 py-2.5 bg-[#FFC515] hover:bg-[#E6AF0F] text-black font-bold text-xs font-mono-num uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,197,21,0.2)]"
        >
          <Plus size={15} strokeWidth={3} />
          <span>LOG TODAY'S CHECK-IN</span>
        </button>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        
        <div className="bg-[#0E0E10] border border-[#242424] rounded-xl p-6">
          <span className="text-[11px] text-[#9A9A9A] font-mono-num uppercase block">
            CURRENT WEIGHT
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl sm:text-4xl font-bold font-mono-num text-[#F5F5F5]">
              {currentWeight}
            </span>
            <span className="text-sm text-[#9A9A9A] font-mono-num">kg</span>
            <span className="text-xs font-mono-num text-[#FFC515] ml-auto font-medium flex items-center gap-0.5">
              <TrendingDown size={14} />
              {totalLost > 0 ? `-${totalLost} kg` : `${totalLost} kg`}
            </span>
          </div>
          <span className="text-[11px] text-[#9A9A9A] mt-2 block">
            Started at {startWeight} kg · Target: {targetWeight} kg
          </span>
        </div>

        <div className="bg-[#0E0E10] border border-[#242424] rounded-xl p-6">
          <span className="text-[11px] text-[#9A9A9A] font-mono-num uppercase block">
            WORKOUT CONSISTENCY
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl sm:text-4xl font-bold font-mono-num text-[#F5F5F5]">
              {user?.streakDays || 14}
            </span>
            <span className="text-sm text-[#9A9A9A] font-mono-num">day streak</span>
            <span className="text-xs font-mono-num text-[#FFC515] ml-auto font-medium">
              100% On Plan
            </span>
          </div>
          <span className="text-[11px] text-[#9A9A9A] mt-2 block">
            {user?.completedWorkoutsCount || 22} sessions completed to date
          </span>
        </div>

        <div className="bg-[#0E0E10] border border-[#242424] rounded-xl p-6">
          <span className="text-[11px] text-[#9A9A9A] font-mono-num uppercase block">
            NUTRITION ADHERENCE
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl sm:text-4xl font-bold font-mono-num text-[#F5F5F5]">
              94%
            </span>
            <span className="text-sm text-[#9A9A9A] font-mono-num">avg hit rate</span>
            <span className="text-xs font-mono-num text-[#FFC515] ml-auto font-medium">
              Calorie Target Met
            </span>
          </div>
          <span className="text-[11px] text-[#9A9A9A] mt-2 block">
            Within ±50 kcal of daily prescription
          </span>
        </div>

      </div>

      {/* Main Section: Weight Trend Chart & Goal Projection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Weight Trend SVG Chart */}
        <div className="lg:col-span-2 bg-[#0E0E10] border border-[#242424] rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#202022] mb-6">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider font-mono-num text-[#F5F5F5]">
                  WEIGHT TREND TRAJECTORY
                </h2>
                <p className="text-xs text-[#9A9A9A] font-mono-num mt-0.5">
                  Consistent downward sloping moving average
                </p>
              </div>
              <span className="px-2.5 py-1 bg-[#141416] border border-[#26262A] text-[#FFC515] text-[11px] font-mono-num rounded">
                Target: {targetWeight} kg
              </span>
            </div>

            {/* Clean SVG Line Graph */}
            <div className="w-full overflow-x-auto">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-44 select-none">
                {/* Subtle Grid Lines */}
                <line x1="20" y1="30" x2={chartWidth - 20} y2="30" stroke="#1E1E22" strokeDasharray="4 4" />
                <line x1="20" y1={chartHeight / 2} x2={chartWidth - 20} y2={chartHeight / 2} stroke="#1E1E22" strokeDasharray="4 4" />
                <line x1="20" y1={chartHeight - 30} x2={chartWidth - 20} y2={chartHeight - 30} stroke="#1E1E22" strokeDasharray="4 4" />

                {/* Target line */}
                {(() => {
                  const targetY = chartHeight - ((targetWeight - minW) / (maxW - minW)) * (chartHeight - 40) - 20;
                  return (
                    <>
                      <line x1="20" y1={targetY} x2={chartWidth - 20} y2={targetY} stroke="#FFC515" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                      <text x={chartWidth - 15} y={targetY - 4} fill="#FFC515" fontSize="9" textAnchor="end" fontFamily="monospace" opacity="0.7">
                        Target {targetWeight}kg
                      </text>
                    </>
                  );
                })()}

                {/* Trend Path */}
                <path
                  d={pathString}
                  fill="none"
                  stroke="#FFC515"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data Points */}
                {points.map((pt, i) => (
                  <g key={i}>
                    <circle cx={pt.x} cy={pt.y} r="4" fill="#FFC515" stroke="#0E0E10" strokeWidth="2" />
                    <text
                      x={pt.x}
                      y={pt.y - 10}
                      fill="#F5F5F5"
                      fontSize="10"
                      textAnchor="middle"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {pt.weight}
                    </text>
                    <text
                      x={pt.x}
                      y={chartHeight - 8}
                      fill="#7A7A7A"
                      fontSize="10"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {pt.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1C1C20] flex items-center justify-between text-xs font-mono-num text-[#9A9A9A]">
            <span>Average rate: -0.4 kg / week</span>
            <span className="text-[#F5F5F5]">{remaining} kg remaining to goal</span>
          </div>
        </div>

        {/* 7-Day Consistency & Milestones */}
        <div className="space-y-6">
          
          {/* Consistency Matrix */}
          <div className="bg-[#0E0E10] border border-[#242424] rounded-xl p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider font-mono-num text-[#F5F5F5] mb-4">
              WEEKLY ADHERENCE
            </h2>

            <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono-num mb-4">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                <div key={idx} className="space-y-1.5">
                  <span className="text-[#9A9A9A] text-[10px] block">{day}</span>
                  <div className={`w-full aspect-square rounded flex items-center justify-center ${
                    idx < 6 
                      ? 'bg-[#FFC515]/15 text-[#FFC515] border border-[#FFC515]/30' 
                      : 'bg-[#18181C] text-[#7A7A7A] border border-[#26262A]'
                  }`}>
                    {idx < 6 ? <CheckCircle2 size={13} /> : '—'}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-[#9A9A9A] leading-relaxed">
              6 out of 7 daily targets logged this week. Rest day planned for Sunday.
            </p>
          </div>

          {/* Milestones Achieved */}
          <div className="bg-[#0E0E10] border border-[#242424] rounded-xl p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider font-mono-num text-[#F5F5F5] mb-4">
              MILESTONES UNLOCKED
            </h2>

            <div className="space-y-3 text-xs font-mono-num">
              <div className="flex items-center gap-3 p-2.5 bg-[#141416] rounded border border-[#222226]">
                <div className="p-1.5 bg-[#FFC515]/10 text-[#FFC515] rounded">
                  <Award size={14} />
                </div>
                <div>
                  <span className="text-[#F5F5F5] font-semibold block">14-Day Consistency Master</span>
                  <span className="text-[10px] text-[#9A9A9A]">Maintained logging for 14 continuous days</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 bg-[#141416] rounded border border-[#222226]">
                <div className="p-1.5 bg-[#FFC515]/10 text-[#FFC515] rounded">
                  <TrendingDown size={14} />
                </div>
                <div>
                  <span className="text-[#F5F5F5] font-semibold block">First 2kg Reductions</span>
                  <span className="text-[10px] text-[#9A9A9A]">Met initial fat loss phase threshold</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Body Measurements & Historic Log Table */}
      <div className="bg-[#0E0E10] border border-[#242424] rounded-xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#202022] mb-6">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider font-mono-num text-[#F5F5F5]">
              BODY MEASUREMENTS & LOG HISTORY
            </h2>
            <p className="text-xs text-[#9A9A9A] font-mono-num mt-0.5">
              Track physical circumference measurements alongside scale weight
            </p>
          </div>
          <button
            onClick={() => setIsLogModalOpen(true)}
            className="text-xs text-[#FFC515] hover:underline font-mono-num"
          >
            + Add New Entry
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-num">
            <thead>
              <tr className="border-b border-[#202022] text-[#9A9A9A]">
                <th className="pb-3 font-normal">DATE</th>
                <th className="pb-3 font-normal">WEIGHT (KG)</th>
                <th className="pb-3 font-normal">WAIST (CM)</th>
                <th className="pb-3 font-normal">CALORIES</th>
                <th className="pb-3 font-normal">PROTEIN</th>
                <th className="pb-3 font-normal">WORKOUT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1E] text-[#F5F5F5]">
              {dailyLogs.slice(0, 5).map((log, idx) => (
                <tr key={idx} className="hover:bg-[#141416]">
                  <td className="py-3 text-[#9A9A9A]">{log.date}</td>
                  <td className="py-3 font-semibold text-[#FFC515]">{log.weightKg || '—'}</td>
                  <td className="py-3">{log.waistCm ? `${log.waistCm} cm` : '82.0 cm'}</td>
                  <td className="py-3">{log.caloriesConsumed} kcal</td>
                  <td className="py-3">{log.proteinConsumed} g</td>
                  <td className="py-3">
                    {log.workoutDone ? (
                      <span className="text-[#FFC515] flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        Completed
                      </span>
                    ) : (
                      <span className="text-[#7A7A7A]">Rest</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================================
          MODAL: LOG TODAY'S CHECK-IN
          ========================================================================= */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121214] border border-[#2E2E34] rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#222226] mb-5">
              <h3 className="text-base font-bold text-[#F5F5F5] font-display">
                Log Today's Check-In
              </h3>
              <button
                onClick={() => setIsLogModalOpen(false)}
                className="p-1 text-[#9A9A9A] hover:text-[#F5F5F5] rounded transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveLog} className="space-y-4 text-xs font-mono-num">
              <div>
                <label className="text-[#9A9A9A] block mb-1">Morning Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={logWeight}
                  onChange={e => setLogWeight(Number(e.target.value))}
                  className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#FFC515] font-bold focus:border-[#FFC515] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#9A9A9A] block mb-1">Calories Consumed</label>
                  <input
                    type="number"
                    value={logCalories}
                    onChange={e => setLogCalories(Number(e.target.value))}
                    className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#F5F5F5] focus:border-[#FFC515] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#9A9A9A] block mb-1">Protein (g)</label>
                  <input
                    type="number"
                    value={logProtein}
                    onChange={e => setLogProtein(Number(e.target.value))}
                    className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#F5F5F5] focus:border-[#FFC515] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#9A9A9A] block mb-1">Waist Circumference (cm)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={logWaist}
                    onChange={e => setLogWaist(Number(e.target.value))}
                    className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#F5F5F5] focus:border-[#FFC515] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#9A9A9A] block mb-1">Water Logged (Liters)</label>
                  <input
                    type="number"
                    step="0.2"
                    value={logWater}
                    onChange={e => setLogWater(Number(e.target.value))}
                    className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#F5F5F5] focus:border-[#FFC515] outline-none"
                  />
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={logWorkoutDone}
                    onChange={e => setLogWorkoutDone(e.target.checked)}
                    className="w-4 h-4 accent-[#FFC515] rounded"
                  />
                  <span className="text-[#F5F5F5] font-medium">Completed Scheduled Workout Today</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#222226]">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="px-4 py-2 bg-[#1A1A1E] text-[#9A9A9A] hover:text-[#F5F5F5] rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FFC515] hover:bg-[#E6AF0F] text-black font-bold uppercase tracking-wider rounded transition-colors"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
