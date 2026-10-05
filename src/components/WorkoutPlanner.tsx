import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useAdmin } from '../context/AdminContext';
import { FitnessGoal, ExperienceLevel, EquipmentType, MuscleGroup, Exercise } from '../types';
import { EXERCISE_DATABASE } from '../data/workoutDatabase';
import { ExerciseVideoPlayer } from './ExerciseVideoPlayer';
import { 
  Dumbbell, 
  Search, 
  Filter, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  ChevronRight, 
  RefreshCw, 
  Flame, 
  Clock, 
  Calculator, 
  Award, 
  Zap, 
  Scale, 
  Volume2, 
  TrendingUp, 
  Sliders, 
  Layers, 
  Video, 
  Settings2, 
  X, 
  Sparkles
} from 'lucide-react';

export const WorkoutPlanner: React.FC = () => {
  const { 
    user, 
    workoutPlan, 
    generateAndSetWorkout,
    selectedExerciseCategory, 
    setSelectedExerciseCategory 
  } = useApp();
  const { trackLeadEvent, captureLead } = useAdmin();

  // Wizard / Split Parameters State
  const [goal, setGoal] = useState<FitnessGoal>(user?.goal || 'BUILD_MUSCLE');
  const [experience, setExperience] = useState<ExperienceLevel>('INTERMEDIATE');
  const [equipment, setEquipment] = useState<EquipmentType>('FULL_GYM');
  const [daysPerWeek, setDaysPerWeek] = useState<number>(4);
  const [durationMinutes, setDurationMinutes] = useState<number>(45);

  // Popup Modal State for Program Configuration (ask once like a pop-up)
  const [isConfigModalOpen, setIsConfigModalOpen] = useState<boolean>(false);

  // Check if first-time visitor to pop up once
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const alreadyPrompted = sessionStorage.getItem('fitnetheist_workout_popup_shown');
      if (!alreadyPrompted) {
        setIsConfigModalOpen(true);
        sessionStorage.setItem('fitnetheist_workout_popup_shown', 'true');
      }
    }
  }, []);

  // Active Tab: Split Program vs Exercise Library vs 1RM & Biomechanics
  const [viewMode, setViewMode] = useState<'PROGRAM' | 'LIBRARY' | 'CALCULATOR'>('PROGRAM');
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(0);

  // Exercise Library Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeExerciseModal, setActiveExerciseModal] = useState<Exercise | null>(null);

  // 1RM Calculator State
  const [liftName, setLiftName] = useState<string>('BARBELL BENCH PRESS');
  const [weightLifted, setWeightLifted] = useState<number>(100);
  const [repsDone, setRepsDone] = useState<number>(5);
  const [is1rmMetric, setIs1rmMetric] = useState<boolean>(true);

  // Rest Timer State
  const [timerSeconds, setTimerSeconds] = useState<number>(90);
  const [initialTimerSeconds, setInitialTimerSeconds] = useState<number>(90);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Audio Beep Cue using Web Audio API
  const playAudioBeep = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (err) {}
  };

  // Timer Tick
  useEffect(() => {
    if (isTimerRunning && timerSeconds > 0) {
      timerRef.current = setTimeout(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (isTimerRunning && timerSeconds === 0) {
      setIsTimerRunning(false);
      playAudioBeep();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isTimerRunning, timerSeconds]);

  const handleGenerateWorkout = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    generateAndSetWorkout(goal, experience, equipment, daysPerWeek, durationMinutes);
    setIsConfigModalOpen(false);
    sessionStorage.setItem('fitnetheist_workout_popup_shown', 'true');
    setViewMode('PROGRAM');
    trackLeadEvent('WORKOUT_GENERATED', {
      source: 'WORKOUT_PLANNER',
      details: `Generated ${daysPerWeek}-day ${experience} routine with ${equipment} (${durationMinutes} min)`
    });
    if (user?.email) {
      captureLead({
        name: user.name || 'Athlete Visitor',
        email: user.email,
        phone: user.phone || '+91 98000 00000',
        source: 'WORKOUT_PLANNER',
        goal: goal === 'FAT_LOSS' ? 'FAT_LOSS' : goal === 'BUILD_MUSCLE' ? 'MUSCLE_GAIN' : 'MAINTENANCE'
      });
    }
  };

  // 1-Rep Max Calculations
  const calcBrzycki = repsDone === 1 ? weightLifted : Math.round(weightLifted * (36 / (37 - repsDone)));
  const calcEpley = repsDone === 1 ? weightLifted : Math.round(weightLifted * (1 + 0.0333 * repsDone));
  const calcLombardi = repsDone === 1 ? weightLifted : Math.round(weightLifted * Math.pow(repsDone, 0.10));
  const calcOConner = repsDone === 1 ? weightLifted : Math.round(weightLifted * (1 + 0.025 * repsDone));
  const calcWathan = repsDone === 1 ? weightLifted : Math.round((100 * weightLifted) / (48.8 + (53.8 * Math.exp(-0.075 * repsDone))));
  
  const estimated1RM = Math.round((calcBrzycki + calcEpley + calcLombardi + calcOConner + calcWathan) / 5);

  const percentageTable = [
    { percent: 100, reps: '1 RM', load: estimated1RM, desc: 'Absolute Maximum Effort' },
    { percent: 95, reps: '2 Reps', load: Math.round(estimated1RM * 0.95), desc: 'Maximal Strength / Peaking' },
    { percent: 90, reps: '3-4 Reps', load: Math.round(estimated1RM * 0.90), desc: 'Heavy Strength Work' },
    { percent: 85, reps: '5-6 Reps', load: Math.round(estimated1RM * 0.85), desc: 'Strength & Myofibrillar Size' },
    { percent: 80, reps: '7-8 Reps', load: Math.round(estimated1RM * 0.80), desc: 'Optimal Hypertrophy Load' },
    { percent: 75, reps: '9-10 Reps', load: Math.round(estimated1RM * 0.75), desc: 'Volume Accumulation' },
    { percent: 70, reps: '11-12 Reps', load: Math.round(estimated1RM * 0.70), desc: 'Metabolic Hypertrophy' },
    { percent: 65, reps: '15 Reps', load: Math.round(estimated1RM * 0.65), desc: 'Muscular Endurance / Deload' },
    { percent: 50, reps: '20+ Reps', load: Math.round(estimated1RM * 0.50), desc: 'Dynamic Effort / Warmup' }
  ];

  // Warm-Up Barbell Pyramid
  const warmupPyramid = [
    { set: 'Warmup 1', load: '20 kg (Empty Bar)', percent: 'Pattern Groove', reps: '10 Reps', rest: '45s' },
    { set: 'Warmup 2', load: `${Math.round(estimated1RM * 0.40)} kg`, percent: '40% 1RM', reps: '8 Reps', rest: '60s' },
    { set: 'Warmup 3', load: `${Math.round(estimated1RM * 0.60)} kg`, percent: '60% 1RM', reps: '5 Reps', rest: '75s' },
    { set: 'Warmup 4', load: `${Math.round(estimated1RM * 0.75)} kg`, percent: '75% 1RM', reps: '3 Reps', rest: '90s' },
    { set: 'Warmup 5', load: `${Math.round(estimated1RM * 0.85)} kg`, percent: '85% 1RM', reps: '1 Rep (Potentiation)', rest: '120s' },
    { set: 'Work Sets', load: `${Math.round(estimated1RM * 0.80)} kg`, percent: '80% 1RM', reps: '4 sets × 6-8 reps', rest: '180s' },
  ];

  // Filter Exercises
  const filteredExercises = EXERCISE_DATABASE.filter(ex => {
    if (selectedExerciseCategory !== 'ALL' && ex.category !== selectedExerciseCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        ex.name.toLowerCase().includes(q) ||
        ex.targetMuscles.toLowerCase().includes(q) ||
        ex.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const categories: { id: string; label: string }[] = [
    { id: 'ALL', label: 'ALL EXERCISES' },
    { id: 'CHEST', label: 'CHEST' },
    { id: 'BACK', label: 'BACK' },
    { id: 'SHOULDERS', label: 'SHOULDERS' },
    { id: 'ARMS', label: 'ARMS' },
    { id: 'LEGS', label: 'LEGS' },
    { id: 'CORE', label: 'CORE' },
    { id: 'HIIT', label: 'HIIT / CARDIO' },
    { id: 'MOBILITY', label: 'MOBILITY / YOGA' }
  ];

  return (
    <div id="workout-planner-page" className="min-h-screen bg-[#08080a] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Title */}
        <div className="border-b border-white/10 pb-6 mb-8 sm:mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1.5 w-1.5 bg-[#d8ff38] rounded-full"></span>
              <span className="text-[11px] font-mono-num font-medium uppercase tracking-widest text-[#d8ff38]">
                ATHLETIC PROTOCOL // 03
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight font-display">
              WORKOUT PLANNER & 1RM CALCULATOR
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl mt-1.5 font-mono-num leading-relaxed">
              Periodized progressive overload training splits, clean 16:9 form demonstrations, and clinical strength load matrices.
            </p>
          </div>

          {/* Toggle View Mode: GENERATED PROGRAM vs EXERCISE LIBRARY vs 1RM CALCULATOR */}
          <div className="grid grid-cols-3 sm:flex items-center gap-1 p-1 bg-zinc-900/80 border border-white/10 rounded-[4px] font-mono-num text-[11px] sm:text-xs w-full lg:w-auto">
            <button
              id="tab-view-program"
              onClick={() => setViewMode('PROGRAM')}
              className={`px-3 py-1.5 uppercase font-bold text-center transition-colors rounded-[2px] ${
                viewMode === 'PROGRAM' ? 'bg-[#d8ff38] text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              SPLIT
            </button>
            <button
              id="tab-view-calculator"
              onClick={() => setViewMode('CALCULATOR')}
              className={`px-3 py-1.5 uppercase font-bold text-center transition-colors rounded-[2px] flex items-center justify-center gap-1 ${
                viewMode === 'CALCULATOR' ? 'bg-[#d8ff38] text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Calculator size={12} className="shrink-0" />
              <span>1RM CALC</span>
            </button>
            <button
              id="tab-view-library"
              onClick={() => setViewMode('LIBRARY')}
              className={`px-3 py-1.5 uppercase font-bold text-center transition-colors rounded-[2px] ${
                viewMode === 'LIBRARY' ? 'bg-[#d8ff38] text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              CATALOG ({EXERCISE_DATABASE.length})
            </button>
          </div>
        </div>

        {/* View Mode 1: PROGRAM & ACTIVE SPLIT ROUTINE */}
        {viewMode === 'PROGRAM' && (
          <div className="space-y-6">
            
            {/* Minimal Program Header Bar */}
            <div className="bg-[#0c0c0e] border border-white/10 rounded-[4px] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d8ff38]" />
                  <span className="text-[10px] font-mono-num font-medium text-[#d8ff38] uppercase tracking-wider">
                    CURRENT SPLIT
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold uppercase font-display text-white">
                  {workoutPlan?.name || 'Hypertrophy Muscle Engine Split'}
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono-num text-zinc-400 pt-0.5">
                  <span className="bg-zinc-900 px-2 py-0.5 rounded-[2px] border border-white/5 text-zinc-300">
                    {workoutPlan?.daysPerWeek || daysPerWeek} Days/Week
                  </span>
                  <span className="bg-zinc-900 px-2 py-0.5 rounded-[2px] border border-white/5 text-zinc-300">
                    {workoutPlan?.durationMinutes || durationMinutes} Min
                  </span>
                  <span className="bg-zinc-900 px-2 py-0.5 rounded-[2px] border border-white/5 text-zinc-300">
                    {equipment.replace('_', ' ')}
                  </span>
                  <span className="bg-zinc-900 px-2 py-0.5 rounded-[2px] border border-white/5 text-zinc-300">
                    {experience}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsConfigModalOpen(true)}
                className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-white/10 rounded-[3px] font-mono-num text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shrink-0 self-start md:self-auto min-h-[44px]"
              >
                <Settings2 size={13} className="text-[#d8ff38]" />
                <span>Customize Split</span>
              </button>
            </div>

            {/* Program Routine View */}
            {workoutPlan && (
              <div className="space-y-6">
                
                {/* Day Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {workoutPlan.days.map((day, idx) => (
                    <button
                      key={day.dayName}
                      onClick={() => setSelectedDayIdx(idx)}
                      className={`px-4 py-2 text-xs font-mono-num font-bold uppercase tracking-wider border rounded-[3px] transition-colors shrink-0 min-h-[40px] ${
                        selectedDayIdx === idx
                          ? 'bg-[#d8ff38] text-black border-[#d8ff38]'
                          : 'border-zinc-800 text-zinc-400 hover:text-white bg-[#0c0c0e]'
                      }`}
                    >
                      Day 0{idx + 1}
                    </button>
                  ))}
                </div>

                {/* Selected Workout Day Detail */}
                {workoutPlan.days[selectedDayIdx] && (
                  <div className="bg-[#0c0c0e] border border-white/10 rounded-[4px] p-5 sm:p-6 space-y-6">
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                      <div>
                        <h3 className="text-lg font-bold uppercase font-display text-white">
                          {workoutPlan.days[selectedDayIdx].dayName}
                        </h3>
                        <p className="text-xs font-mono-num text-zinc-400 mt-0.5">
                          Focus: <span className="text-zinc-200">{workoutPlan.days[selectedDayIdx].focus}</span>
                        </p>
                      </div>
                      <span className="text-xs font-mono-num text-zinc-400">
                        {workoutPlan.days[selectedDayIdx].exercises.length} Exercises · {workoutPlan.days[selectedDayIdx].estimatedMinutes} Min
                      </span>
                    </div>

                    {/* Exercises in This Routine */}
                    <div className="space-y-3">
                      {workoutPlan.days[selectedDayIdx].exercises.map((item, exIdx) => {
                        const ex = item.exercise;
                        return (
                          <div 
                            key={ex.id}
                            onClick={() => setActiveExerciseModal(ex)}
                            className="border border-white/5 bg-zinc-900/40 hover:bg-zinc-900/70 p-4 rounded-[4px] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-white/15 transition-all cursor-pointer group"
                          >
                            {/* Left Info */}
                            <div className="space-y-1.5 flex-1">
                              <div className="flex items-center gap-2.5">
                                <span className="text-xs font-mono-num font-bold text-[#d8ff38]">
                                  0{exIdx + 1}
                                </span>
                                <h4 className="text-base font-semibold text-white font-mono-num group-hover:text-[#d8ff38] transition-colors">
                                  {ex.name}
                                </h4>
                                <span className="px-1.5 py-0.5 bg-zinc-800 rounded-[2px] text-[10px] font-mono-num text-zinc-400 uppercase">
                                  {ex.category}
                                </span>
                              </div>

                              <p className="text-xs font-mono-num text-zinc-400">
                                Target: <span className="text-zinc-300">{ex.targetMuscles}</span>
                              </p>

                              <p className="text-xs text-zinc-400 font-mono-num line-clamp-1">
                                Cue: {ex.keyFormTip}
                              </p>
                            </div>

                            {/* Center Sets / Reps / Rest Stats */}
                            <div className="flex items-center gap-4 bg-black/50 border border-white/5 rounded-[3px] px-4 py-2 font-mono-num shrink-0 text-xs">
                              <div>
                                <span className="text-[9px] text-zinc-500 uppercase block">SETS</span>
                                <span className="font-bold text-white">{item.customSets || ex.sets}</span>
                              </div>
                              <div className="h-4 w-px bg-white/10" />
                              <div>
                                <span className="text-[9px] text-zinc-500 uppercase block">REPS</span>
                                <span className="font-bold text-[#d8ff38]">{item.customReps || ex.reps}</span>
                              </div>
                              <div className="h-4 w-px bg-white/10" />
                              <div>
                                <span className="text-[9px] text-zinc-500 uppercase block">REST</span>
                                <span className="font-bold text-white">{ex.restSeconds}s</span>
                              </div>
                            </div>

                            {/* View Form Action Button */}
                            <div className="shrink-0">
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); setActiveExerciseModal(ex); }}
                                className="px-3 py-1.5 bg-zinc-800 hover:bg-[#d8ff38] hover:text-black text-zinc-200 rounded-[2px] border border-white/10 text-xs font-mono-num font-medium flex items-center gap-1.5 transition-colors min-h-[36px]"
                              >
                                <Play size={11} fill="currentColor" />
                                <span>Watch Form</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                  </div>
                )}

              </div>
            )}

          </div>
        )}

        {/* View Mode 2: 1RM & STRENGTH CALCULATOR SUITE */}
        {viewMode === 'CALCULATOR' && (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: 1RM Inputs */}
              <div className="lg:col-span-5 bg-[#0c0c0e] border border-white/10 rounded-[4px] p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-mono-num uppercase tracking-wider text-[#d8ff38] block">
                      STRENGTH ESTIMATION
                    </span>
                    <h3 className="text-lg font-bold uppercase font-display text-white mt-0.5">
                      1-REP MAX (1RM)
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 font-mono-num text-[10px]">
                    <button
                      onClick={() => setIs1rmMetric(true)}
                      className={`px-2 py-1 uppercase border rounded-[2px] ${is1rmMetric ? 'bg-[#d8ff38] text-black border-[#d8ff38]' : 'border-zinc-800 text-zinc-400'}`}
                    >
                      KG
                    </button>
                    <button
                      onClick={() => setIs1rmMetric(false)}
                      className={`px-2 py-1 uppercase border rounded-[2px] ${!is1rmMetric ? 'bg-[#d8ff38] text-black border-[#d8ff38]' : 'border-zinc-800 text-zinc-400'}`}
                    >
                      LBS
                    </button>
                  </div>
                </div>

                {/* Lift Name Selector */}
                <div>
                  <label className="block text-xs font-mono-num text-zinc-400 uppercase mb-1.5">
                    COMPOUND LIFT
                  </label>
                  <select
                    value={liftName}
                    onChange={(e) => setLiftName(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-[3px] px-3 py-2 text-white font-mono-num text-xs focus:border-[#d8ff38] focus:outline-none uppercase"
                  >
                    <option value="BARBELL BENCH PRESS">BARBELL BENCH PRESS</option>
                    <option value="BARBELL BACK SQUAT">BARBELL BACK SQUAT</option>
                    <option value="CONVENTIONAL DEADLIFT">CONVENTIONAL DEADLIFT</option>
                    <option value="OVERHEAD MILITARY PRESS">OVERHEAD MILITARY PRESS</option>
                    <option value="BARBELL BENT OVER ROW">BARBELL BENT OVER ROW</option>
                    <option value="WEIGHTED CHIN-UP / PULL-UP">WEIGHTED CHIN-UP / PULL-UP</option>
                    <option value="INCLINE DUMBBELL BENCH">INCLINE DUMBBELL BENCH</option>
                    <option value="CUSTOM EXERCISE">CUSTOM EXERCISE</option>
                  </select>
                </div>

                {/* Weight Lifted */}
                <div>
                  <div className="flex justify-between text-xs font-mono-num text-zinc-400 mb-2">
                    <span>WEIGHT LIFTED</span>
                    <span className="text-white font-bold">{weightLifted} {is1rmMetric ? 'kg' : 'lbs'}</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="350"
                    step="2.5"
                    value={weightLifted}
                    onChange={(e) => setWeightLifted(Number(e.target.value))}
                    className="w-full accent-[#d8ff38] bg-zinc-800 h-1.5 rounded-full cursor-pointer mb-2"
                  />
                  <input
                    type="number"
                    value={weightLifted}
                    onChange={(e) => setWeightLifted(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-[3px] px-3 py-2 text-white font-mono-num text-xs focus:border-[#d8ff38] focus:outline-none"
                  />
                </div>

                {/* Repetitions Completed */}
                <div>
                  <div className="flex justify-between text-xs font-mono-num text-zinc-400 mb-2">
                    <span>REPS COMPLETED</span>
                    <span className="text-[#d8ff38] font-bold">{repsDone} Reps</span>
                  </div>
                  <div className="grid grid-cols-6 gap-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRepsDone(r)}
                        className={`py-1.5 text-xs font-mono-num font-bold rounded-[2px] border transition-all ${
                          repsDone === r ? 'bg-[#d8ff38] text-black border-[#d8ff38]' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Algorithmic Breakdown */}
                <div className="p-3.5 bg-zinc-900/40 border border-white/5 rounded-[3px] space-y-1.5 font-mono-num text-xs">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">ALGORITHM COMPARISON:</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Brzycki:</span>
                      <span className="text-white font-medium">{calcBrzycki} {is1rmMetric ? 'kg' : 'lbs'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Epley:</span>
                      <span className="text-white font-medium">{calcEpley} {is1rmMetric ? 'kg' : 'lbs'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: 1RM Display & Training Load Table */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Highlight 1RM Box */}
                <div className="bg-[#0c0c0e] border border-white/10 rounded-[4px] p-6 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-mono-num uppercase tracking-wider text-zinc-400">
                      {liftName}
                    </span>
                    <span className="text-xs font-mono-num text-[#d8ff38]">
                      BASED ON {repsDone} RM
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 py-2">
                    <span className="text-4xl sm:text-6xl font-extrabold font-display text-white">
                      {estimated1RM}
                    </span>
                    <span className="text-lg font-bold font-mono-num text-[#d8ff38]">
                      {is1rmMetric ? 'KG' : 'LBS'}
                    </span>
                  </div>

                  <p className="text-xs font-mono-num text-zinc-400">
                    Composite 1RM calculated from validated sports science formulas.
                  </p>
                </div>

                {/* Percentage Load Matrix */}
                <div className="bg-[#0c0c0e] border border-white/10 rounded-[4px] p-5 space-y-3">
                  <h4 className="text-xs font-mono-num font-bold uppercase tracking-wider text-zinc-300">
                    LOAD SPECTRUM (% 1RM):
                  </h4>
                  <div className="grid grid-cols-3 gap-2 font-mono-num">
                    {percentageTable.slice(0, 6).map(row => (
                      <div key={row.percent} className="p-2.5 bg-zinc-900/50 border border-white/5 rounded-[2px] space-y-0.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#d8ff38] font-bold">{row.percent}%</span>
                          <span className="text-zinc-400 text-[10px]">{row.reps}</span>
                        </div>
                        <div className="text-sm font-bold text-white">
                          {row.load} {is1rmMetric ? 'kg' : 'lbs'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* View Mode 3: EXERCISE CATALOG (16:9 VIDEO PREVIEWS) */}
        {viewMode === 'LIBRARY' && (
          <div className="space-y-6">
            
            {/* Category Filter & Search Bar */}
            <div className="bg-[#0c0c0e] border border-white/10 rounded-[4px] p-4 space-y-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search exercise name or target muscle..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-[3px] pl-9 pr-3 py-2 text-xs font-mono-num text-white focus:border-[#d8ff38] focus:outline-none min-h-[44px]"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono-num text-xs">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedExerciseCategory(cat.id as any)}
                    className={`px-3 py-1.5 uppercase font-medium tracking-wider border rounded-[2px] transition-colors shrink-0 ${
                      selectedExerciseCategory === cat.id
                        ? 'bg-[#d8ff38] text-black border-[#d8ff38] font-bold'
                        : 'border-zinc-800 text-zinc-400 hover:text-white bg-zinc-900/40'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Exercise Grid with 16:9 Thumbnails */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredExercises.map(ex => (
                <div 
                  key={ex.id}
                  onClick={() => setActiveExerciseModal(ex)}
                  className="bg-[#0c0c0e] border border-white/10 rounded-[4px] overflow-hidden flex flex-col justify-between hover:border-white/20 transition-all cursor-pointer group"
                >
                  <div>
                    {/* Standard 16:9 Video Preview */}
                    <div className="relative aspect-video w-full bg-zinc-900 overflow-hidden">
                      {ex.videoThumbnail ? (
                        <img
                          src={ex.videoThumbnail}
                          alt={ex.name}
                          className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-102 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-600">
                          <Video size={30} />
                        </div>
                      )}
                      
                      {/* Subtle Play Overlay */}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="w-11 h-11 rounded-full bg-[#d8ff38] text-black flex items-center justify-center pl-0.5 shadow-md group-hover:scale-105 transition-transform">
                          <Play size={16} fill="currentColor" />
                        </div>
                      </div>

                      <span className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 text-[9px] font-mono-num font-medium text-zinc-300 uppercase rounded-[2px] border border-white/10">
                        {ex.category}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className="text-base font-semibold text-white group-hover:text-[#d8ff38] transition-colors font-mono-num">
                        {ex.name}
                      </h4>
                      <p className="text-xs font-mono-num text-zinc-400 line-clamp-1">
                        Target: <span className="text-zinc-300">{ex.targetMuscles}</span>
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex items-center justify-between font-mono-num text-xs border-t border-white/5">
                    <span className="text-zinc-500 uppercase text-[10px]">{ex.equipment.replace('_', ' ')}</span>
                    <span className="text-[#d8ff38] font-medium text-[11px] flex items-center gap-0.5 group-hover:underline">
                      Watch Form
                      <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* ONE-TIME POPUP MODAL: PROGRAM CONFIGURATION                               */}
        {/* ========================================================================= */}
        {isConfigModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#0e0e11] border border-white/15 rounded-[6px] max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
              
              <div className="flex items-start justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold uppercase font-display text-white">
                    CUSTOMIZE TRAINING SPLIT
                  </h3>
                  <p className="text-xs font-mono-num text-zinc-400 mt-0.5">
                    Set your parameters to generate your personalized routine.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsConfigModalOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-white rounded transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleGenerateWorkout} className="space-y-4 font-mono-num text-xs">
                
                {/* 1. Goal */}
                <div>
                  <label className="block text-zinc-300 font-medium uppercase mb-1.5">
                    PRIMARY GOAL
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'BUILD_MUSCLE', label: 'HYPERTROPHY' },
                      { id: 'LOSE_WEIGHT', label: 'FAT LOSS' },
                      { id: 'STRENGTH', label: 'STRENGTH' },
                      { id: 'ENDURANCE', label: 'ENDURANCE' }
                    ].map(g => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setGoal(g.id as FitnessGoal)}
                        className={`p-2.5 text-left rounded-[3px] border font-bold uppercase transition-colors ${
                          goal === g.id 
                            ? 'border-[#d8ff38] bg-[#d8ff38]/10 text-white' 
                            : 'border-zinc-800 text-zinc-400 bg-zinc-900/40 hover:border-zinc-700'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Experience & Equipment */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-300 font-medium uppercase mb-1.5">
                      EXPERIENCE
                    </label>
                    <select
                      value={experience}
                      onChange={(e) => setExperience(e.target.value as any)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-[3px] p-2 text-white outline-none"
                    >
                      <option value="BEGINNER">BEGINNER</option>
                      <option value="INTERMEDIATE">INTERMEDIATE</option>
                      <option value="ADVANCED">ADVANCED</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-medium uppercase mb-1.5">
                      EQUIPMENT
                    </label>
                    <select
                      value={equipment}
                      onChange={(e) => setEquipment(e.target.value as EquipmentType)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-[3px] p-2 text-white outline-none"
                    >
                      <option value="FULL_GYM">FULL GYM</option>
                      <option value="HOME_GYM">HOME GYM / RACK</option>
                      <option value="DUMBBELLS">DUMBBELLS ONLY</option>
                      <option value="NO_EQUIPMENT">BODYWEIGHT</option>
                    </select>
                  </div>
                </div>

                {/* 3. Days & Duration */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-300 font-medium uppercase mb-1.5">
                      DAYS / WEEK
                    </label>
                    <div className="grid grid-cols-4 gap-1">
                      {[3, 4, 5, 6].map(d => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDaysPerWeek(d)}
                          className={`py-1.5 font-bold uppercase rounded-[2px] border ${
                            daysPerWeek === d ? 'bg-[#d8ff38] text-black border-[#d8ff38]' : 'border-zinc-800 text-zinc-400 bg-zinc-900/40'
                          }`}
                        >
                          {d}D
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-medium uppercase mb-1.5">
                      DURATION
                    </label>
                    <div className="grid grid-cols-4 gap-1">
                      {[30, 45, 60, 75].map(m => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setDurationMinutes(m)}
                          className={`py-1.5 font-bold uppercase rounded-[2px] border ${
                            durationMinutes === m ? 'bg-[#d8ff38] text-black border-[#d8ff38]' : 'border-zinc-800 text-zinc-400 bg-zinc-900/40'
                          }`}
                        >
                          {m}m
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsConfigModalOpen(false)}
                    className="px-4 py-2 bg-zinc-900 text-zinc-400 uppercase font-medium hover:text-white rounded-[3px]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#d8ff38] hover:bg-[#cbf425] text-black font-bold uppercase tracking-wider rounded-[3px] transition-colors"
                  >
                    Apply Split
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PREMIUM MINIMALIST EXERCISE VIDEO & EXECUTION PROTOCOL MODAL              */}
        {/* ========================================================================= */}
        {activeExerciseModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
            <div className="bg-[#0b0b0e] border border-white/10 rounded-[6px] max-w-2xl w-full p-5 sm:p-7 space-y-5 shadow-2xl relative my-auto">
              
              {/* Top Header: Exercise Name & Subtitle */}
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div className="space-y-0.5">
                  <h3 className="text-xl sm:text-2xl font-bold uppercase font-display text-white tracking-tight">
                    {activeExerciseModal.name}
                  </h3>
                  <p className="text-xs font-mono-num text-zinc-400">
                    {activeExerciseModal.category} · {activeExerciseModal.difficulty} · {activeExerciseModal.equipment.replace('_', ' ')}
                  </p>
                </div>
                
                <button
                  onClick={() => setActiveExerciseModal(null)}
                  className="p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-[4px] transition-colors shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close exercise modal"
                >
                  <X size={16} />
                </button>
              </div>

              {/* 16:9 Clean Responsive Video Player */}
              <div className="w-full">
                <ExerciseVideoPlayer
                  videoUrl={activeExerciseModal.videoUrl}
                  thumbnailUrl={activeExerciseModal.videoThumbnail}
                  exerciseName={activeExerciseModal.name}
                  aspectRatio="16/9"
                  autoPlay={false}
                  className="rounded-[4px]"
                />
              </div>

              {/* Compact Metadata Card: Target & Equipment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3.5 px-4 bg-zinc-900/40 border border-white/5 rounded-[4px] text-xs font-mono-num">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">TARGET</span>
                  <span className="text-zinc-200 font-medium">
                    {activeExerciseModal.targetMuscles.split(',').map(m => m.trim()).join(' · ')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">EQUIPMENT</span>
                  <span className="text-[#d8ff38] font-bold">
                    {activeExerciseModal.equipment.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Execution Protocol (Clean Numbered List 01, 02, 03) */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono-num font-bold uppercase tracking-widest text-zinc-400">
                  EXECUTION PROTOCOL
                </h4>
                <div className="space-y-3 font-mono-num">
                  {activeExerciseModal.instructions.map((step, sIdx) => (
                    <div key={sIdx} className="space-y-1 pb-3 border-b border-white/5 last:border-0 last:pb-0">
                      <span className="text-xs font-bold text-[#d8ff38]">
                        {sIdx < 9 ? `0${sIdx + 1}` : sIdx + 1}
                      </span>
                      <p className="text-sm text-zinc-200 leading-relaxed font-sans">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Minimal Coaching Biomechanical Cue */}
              {activeExerciseModal.keyFormTip && (
                <div className="p-3.5 bg-zinc-900/60 border-l-2 border-[#d8ff38] rounded-[2px] space-y-1 font-mono-num">
                  <span className="text-[10px] text-[#d8ff38] font-bold uppercase tracking-wider block">COACHING CUE</span>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">{activeExerciseModal.keyFormTip}</p>
                </div>
              )}

              {/* Footer with Rest and Done Button */}
              <div className="flex items-center justify-between text-xs font-mono-num text-zinc-400 border-t border-white/10 pt-3">
                <span>Prescribed Rest: <strong className="text-white">{activeExerciseModal.restSeconds}s</strong></span>
                <button
                  onClick={() => setActiveExerciseModal(null)}
                  className="px-5 py-2 bg-[#d8ff38] hover:bg-[#cbf425] text-black font-bold uppercase text-xs rounded-[3px] transition-colors min-h-[40px]"
                >
                  Done
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
