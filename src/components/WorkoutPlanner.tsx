import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useAdmin } from '../context/AdminContext';
import { FitnessGoal, ExperienceLevel, EquipmentType, MuscleGroup, Exercise } from '../types';
import { EXERCISE_DATABASE } from '../data/workoutDatabase';
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
  Layers
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

  // Wizard State
  const [goal, setGoal] = useState<FitnessGoal>(user?.goal || 'BUILD_MUSCLE');
  const [experience, setExperience] = useState<ExperienceLevel>('INTERMEDIATE');
  const [equipment, setEquipment] = useState<EquipmentType>('FULL_GYM');
  const [daysPerWeek, setDaysPerWeek] = useState<number>(4);
  const [durationMinutes, setDurationMinutes] = useState<number>(45);

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
    } catch (err) {
      // Audio context might be restricted before user interaction
    }
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

  const handleStartTimer = (sec?: number) => {
    if (sec !== undefined) {
      setInitialTimerSeconds(sec);
      setTimerSeconds(sec);
    }
    setIsTimerRunning(true);
  };

  const handlePauseTimer = () => {
    setIsTimerRunning(false);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(initialTimerSeconds);
  };

  const handleGenerateWorkout = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    generateAndSetWorkout(goal, experience, equipment, daysPerWeek, durationMinutes);
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
  // Formulas:
  // Brzycki: W * (36 / (37 - r))
  // Epley: W * (1 + 0.0333 * r)
  // Lombardi: W * (r ^ 0.10)
  // O'Conner: W * (1 + 0.025 * r)
  // Wathan: (100 * W) / (48.8 + (53.8 * Math.exp(-0.075 * r)))
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

  // Estimated Training Energy Burn (kcal = MET * kg * (duration / 60))
  // Weight training moderate MET = 5.0, vigorous MET = 6.5
  const athleteWeightKg = user?.weightKg || 78;
  const sessionCalorieBurn = Math.round(6.0 * athleteWeightKg * (durationMinutes / 60));

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
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="border-b border-white/10 pb-6 mb-8 sm:mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="h-2 w-2 bg-[#d8ff38]"></span>
              <span className="text-[11px] sm:text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#d8ff38]">
                BIOMECHANICAL ENGINE // 03
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight font-display leading-[1.05]">
              WORKOUT PLANNER & 1RM CALCULATOR
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl mt-2 font-mono-num leading-relaxed">
              Periodized progressive overload splits, 1-Rep Max estimation algorithms, load matrices, warmup pyramid solvers, and active training timers.
            </p>
          </div>

          {/* Toggle View Mode: GENERATED PROGRAM vs EXERCISE LIBRARY vs 1RM CALCULATOR */}
          <div className="grid grid-cols-3 sm:flex items-center gap-1 p-1 bg-zinc-900 border border-white/10 font-mono-num text-[11px] sm:text-xs w-full lg:w-auto">
            <button
              id="tab-view-program"
              onClick={() => setViewMode('PROGRAM')}
              className={`px-2.5 sm:px-4 py-2 uppercase font-bold text-center transition-colors mobile-tap-active ${
                viewMode === 'PROGRAM' ? 'bg-[#d8ff38] text-black shadow-[0_0_10px_rgba(216,255,56,0.3)]' : 'text-zinc-400 hover:text-white'
              }`}
            >
              SPLIT
            </button>
            <button
              id="tab-view-calculator"
              onClick={() => setViewMode('CALCULATOR')}
              className={`px-2.5 sm:px-4 py-2 uppercase font-bold text-center transition-colors flex items-center justify-center gap-1 mobile-tap-active ${
                viewMode === 'CALCULATOR' ? 'bg-[#d8ff38] text-black shadow-[0_0_10px_rgba(216,255,56,0.3)]' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Calculator size={12} className="shrink-0" />
              <span>1RM CALC</span>
            </button>
            <button
              id="tab-view-library"
              onClick={() => setViewMode('LIBRARY')}
              className={`px-2.5 sm:px-4 py-2 uppercase font-bold text-center transition-colors mobile-tap-active ${
                viewMode === 'LIBRARY' ? 'bg-[#d8ff38] text-black shadow-[0_0_10px_rgba(216,255,56,0.3)]' : 'text-zinc-400 hover:text-white'
              }`}
            >
              CATALOG ({EXERCISE_DATABASE.length})
            </button>
          </div>
        </div>

        {/* View Mode 1: PROGRAM GENERATOR & ACTIVE SPLIT */}
        {viewMode === 'PROGRAM' && (
          <div className="space-y-12">
            
            {/* Customizer Controls Wizard */}
            <div className="bg-zinc-950 border border-white/10 p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <h2 className="text-xs font-mono-num font-bold text-white uppercase tracking-[0.2em] flex items-center gap-2">
                  <span className="text-[#d8ff38]">STRUCTURED</span> TRAINING PARAMETERS
                </h2>
                <span className="text-[11px] font-mono-num text-zinc-500">PROGRAM GENERATOR</span>
              </div>

              <form onSubmit={handleGenerateWorkout} className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  
                  {/* Goal */}
                  <div>
                    <label className="block text-xs font-mono-num text-zinc-400 uppercase tracking-wider mb-2">
                      PRIMARY ADAPTATION GOAL
                    </label>
                    <div className="space-y-1.5">
                      {[
                        { id: 'BUILD_MUSCLE', label: 'MUSCLE HYPERTROPHY' },
                        { id: 'LOSE_WEIGHT', label: 'METABOLIC FAT LOSS' },
                        { id: 'STRENGTH', label: 'PURE FORCE / STRENGTH' },
                        { id: 'ENDURANCE', label: 'AEROBIC ENDURANCE' }
                      ].map(g => (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => setGoal(g.id as FitnessGoal)}
                          className={`w-full text-left p-2.5 text-xs font-mono-num font-bold uppercase border transition-all ${
                            goal === g.id 
                              ? 'border-[#d8ff38] bg-[#d8ff38]/10 text-white' 
                              : 'border-zinc-800 text-zinc-400 hover:border-zinc-700 bg-zinc-900/30'
                          }`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Experience & Equipment */}
                  <div>
                    <label className="block text-xs font-mono-num text-zinc-400 uppercase tracking-wider mb-2">
                      EXPERIENCE & EQUIPMENT
                    </label>
                    
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] font-mono-num text-zinc-500 block mb-1 uppercase">TRAINING AGE</span>
                        <div className="grid grid-cols-3 gap-1">
                          {['BEGINNER', 'INTERMEDIATE', 'ADVANCED'].map(exp => (
                            <button
                              key={exp}
                              type="button"
                              onClick={() => setExperience(exp as any)}
                              className={`py-2 text-[10px] font-mono-num font-bold uppercase border ${
                                experience === exp ? 'bg-white text-black border-white' : 'border-zinc-800 text-zinc-400 bg-zinc-900/40'
                              }`}
                            >
                              {exp.slice(0, 3)}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono-num text-zinc-500 block mb-1 uppercase">EQUIPMENT ACCESS</span>
                        <div className="space-y-1">
                          {[
                            { id: 'FULL_GYM', label: 'FULL COMMERCIAL GYM' },
                            { id: 'HOME_GYM', label: 'HOME GYM / RACK' },
                            { id: 'DUMBBELLS', label: 'DUMBBELLS ONLY' },
                            { id: 'NO_EQUIPMENT', label: 'BODYWEIGHT / CALISTHENICS' }
                          ].map(eq => (
                            <button
                              key={eq.id}
                              type="button"
                              onClick={() => setEquipment(eq.id as EquipmentType)}
                              className={`w-full text-left p-2 text-xs font-mono-num uppercase border ${
                                equipment === eq.id ? 'border-[#d8ff38] bg-[#d8ff38]/10 text-white font-bold' : 'border-zinc-800 text-zinc-400 bg-zinc-900/30'
                              }`}
                            >
                              {eq.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Frequency & Duration */}
                  <div>
                    <label className="block text-xs font-mono-num text-zinc-400 uppercase tracking-wider mb-2">
                      SCHEDULE & VOLUME
                    </label>

                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] font-mono-num text-zinc-500 block mb-1 uppercase">DAYS PER WEEK</span>
                        <div className="grid grid-cols-4 gap-1">
                          {[3, 4, 5, 6].map(d => (
                            <button
                              key={d}
                              type="button"
                              onClick={() => setDaysPerWeek(d)}
                              className={`py-2 text-xs font-mono-num font-bold uppercase border ${
                                daysPerWeek === d ? 'bg-[#d8ff38] text-black border-[#d8ff38]' : 'border-zinc-800 text-zinc-400 bg-zinc-900/40'
                              }`}
                            >
                              {d} DAYS
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono-num text-zinc-500 block mb-1 uppercase">SESSION DURATION</span>
                        <div className="grid grid-cols-4 gap-1">
                          {[30, 45, 60, 75].map(m => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => setDurationMinutes(m)}
                              className={`py-2 text-xs font-mono-num font-bold uppercase border ${
                                durationMinutes === m ? 'bg-[#d8ff38] text-black border-[#d8ff38]' : 'border-zinc-800 text-zinc-400 bg-zinc-900/40'
                              }`}
                            >
                              {m} MIN
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          id="generate-workout-btn"
                          type="submit"
                          className="w-full py-3 bg-[#d8ff38] hover:bg-[#cbf425] text-black font-mono-num font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all glow-accent-subtle"
                        >
                          <span>GENERATE WORKOUT SPLIT</span>
                          <RefreshCw size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </form>
            </div>

            {/* Generated Program Routine View */}
            {workoutPlan && (
              <div className="space-y-6">
                
                {/* Program Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs font-mono-num uppercase tracking-[0.25em] text-[#d8ff38]">
                      ACTIVE TRAINING SPLIT
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold uppercase font-display text-white mt-1">
                      {workoutPlan.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono-num">
                    <span className="px-3 py-1 bg-zinc-900 border border-white/10 text-white">
                      {workoutPlan.daysPerWeek} DAYS / WEEK
                    </span>
                    <span className="px-3 py-1 bg-zinc-900 border border-white/10 text-[#d8ff38]">
                      {workoutPlan.durationMinutes} MIN (~{sessionCalorieBurn} KCAL BURN)
                    </span>
                  </div>
                </div>

                {/* Day Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {workoutPlan.days.map((day, idx) => (
                    <button
                      key={day.dayName}
                      onClick={() => setSelectedDayIdx(idx)}
                      className={`px-4 py-2.5 text-xs font-mono-num font-bold uppercase tracking-wider border transition-all shrink-0 ${
                        selectedDayIdx === idx
                          ? 'bg-[#d8ff38] text-black border-[#d8ff38]'
                          : 'border-zinc-800 text-zinc-400 hover:text-white bg-zinc-950'
                      }`}
                    >
                      DAY 0{idx + 1}
                    </button>
                  ))}
                </div>

                {/* Selected Workout Day Detail */}
                {workoutPlan.days[selectedDayIdx] && (
                  <div className="bg-zinc-950 border border-white/15 p-6 sm:p-8 space-y-6">
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                      <div>
                        <h4 className="text-xl font-bold uppercase font-display text-white">
                          {workoutPlan.days[selectedDayIdx].dayName}
                        </h4>
                        <p className="text-xs font-mono-num text-zinc-400 mt-1">
                          FOCUS: <strong className="text-white">{workoutPlan.days[selectedDayIdx].focus}</strong>
                        </p>
                      </div>
                      <span className="text-xs font-mono-num text-[#d8ff38] font-bold">
                        {workoutPlan.days[selectedDayIdx].exercises.length} EXERCISES // {workoutPlan.days[selectedDayIdx].estimatedMinutes} MIN
                      </span>
                    </div>

                    {/* Exercises in This Routine */}
                    <div className="space-y-4">
                      {workoutPlan.days[selectedDayIdx].exercises.map((item, exIdx) => {
                        const ex = item.exercise;
                        return (
                          <div 
                            key={ex.id}
                            className="border border-white/10 bg-zinc-900/30 p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-white/20 transition-all"
                          >
                            {/* Left Info */}
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-mono-num font-bold text-[#d8ff38]">
                                  #{exIdx + 1}
                                </span>
                                <h5 className="text-lg font-bold text-white font-mono-num">
                                  {ex.name}
                                </h5>
                                <span className="px-2 py-0.5 bg-zinc-800 text-[10px] font-mono-num text-zinc-400 uppercase">
                                  {ex.category}
                                </span>
                              </div>

                              <p className="text-xs font-mono-num text-zinc-400">
                                TARGET: <strong className="text-zinc-200">{ex.targetMuscles}</strong>
                              </p>

                              <p className="text-xs text-zinc-400 italic bg-black/40 border-l-2 border-[#d8ff38] pl-3 py-1 font-mono-num">
                                CUE: {ex.keyFormTip}
                              </p>
                            </div>

                            {/* Center Sets / Reps / Rest Stats */}
                            <div className="flex items-center gap-4 sm:gap-6 bg-[#0c0c0e] border border-white/10 px-5 py-3 font-mono-num shrink-0">
                              <div>
                                <span className="text-[10px] text-zinc-500 uppercase block">SETS</span>
                                <span className="text-base font-bold text-white block">{item.customSets || ex.sets}</span>
                              </div>
                              <div className="h-5 w-px bg-white/10"></div>
                              <div>
                                <span className="text-[10px] text-zinc-500 uppercase block">REPS</span>
                                <span className="text-base font-bold text-[#d8ff38] block">{item.customReps || ex.reps}</span>
                              </div>
                              <div className="h-5 w-px bg-white/10"></div>
                              <div>
                                <span className="text-[10px] text-zinc-500 uppercase block">REST</span>
                                <span className="text-base font-bold text-white block">{ex.restSeconds}S</span>
                              </div>
                            </div>

                            {/* View Form Details Action */}
                            <button
                              onClick={() => setActiveExerciseModal(ex)}
                              className="px-4 py-2.5 bg-zinc-800 hover:bg-white hover:text-black border border-white/15 text-xs font-mono-num font-bold uppercase tracking-wider shrink-0 transition-colors"
                            >
                              VIEW FORM
                            </button>
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
          <div className="space-y-10">
            
            {/* Top Row: 1RM Form & Main Output Banner */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: 1RM Inputs */}
              <div className="lg:col-span-5 bg-zinc-950 border border-white/10 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-mono-num uppercase tracking-widest text-[#d8ff38] block">
                      STRENGTH ENGINE
                    </span>
                    <h3 className="text-xl font-bold uppercase font-display text-white mt-0.5">
                      1-REP MAX (1RM) ESTIMATOR
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 font-mono-num text-[10px]">
                    <button
                      onClick={() => setIs1rmMetric(true)}
                      className={`px-2 py-1 uppercase border ${is1rmMetric ? 'bg-[#d8ff38] text-black border-[#d8ff38]' : 'border-zinc-800 text-zinc-400'}`}
                    >
                      KG
                    </button>
                    <button
                      onClick={() => setIs1rmMetric(false)}
                      className={`px-2 py-1 uppercase border ${!is1rmMetric ? 'bg-[#d8ff38] text-black border-[#d8ff38]' : 'border-zinc-800 text-zinc-400'}`}
                    >
                      LBS
                    </button>
                  </div>
                </div>

                {/* Lift Name Selector */}
                <div>
                  <label className="block text-xs font-mono-num text-zinc-400 uppercase tracking-wider mb-2">
                    COMPOUND LIFT
                  </label>
                  <select
                    value={liftName}
                    onChange={(e) => setLiftName(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white font-mono-num text-xs focus:border-[#d8ff38] focus:outline-none uppercase"
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
                    <span>WEIGHT LIFTED ({is1rmMetric ? 'KG' : 'LBS'})</span>
                    <span className="text-white font-bold">{weightLifted} {is1rmMetric ? 'kg' : 'lbs'}</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="350"
                    step="2.5"
                    value={weightLifted}
                    onChange={(e) => setWeightLifted(Number(e.target.value))}
                    className="w-full accent-[#d8ff38] bg-zinc-800 h-2 cursor-pointer mb-2"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={weightLifted}
                      onChange={(e) => setWeightLifted(Number(e.target.value))}
                      className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white font-mono-num text-sm focus:border-[#d8ff38] focus:outline-none"
                    />
                    <span className="text-xs font-mono-num text-zinc-400 shrink-0">{is1rmMetric ? 'KG' : 'LBS'}</span>
                  </div>
                </div>

                {/* Repetitions Completed */}
                <div>
                  <div className="flex justify-between text-xs font-mono-num text-zinc-400 mb-2">
                    <span>REPS COMPLETED (CLEAN FORM)</span>
                    <span className="text-[#d8ff38] font-bold">{repsDone} REPS</span>
                  </div>
                  <div className="grid grid-cols-6 gap-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRepsDone(r)}
                        className={`py-2 text-xs font-mono-num font-bold border transition-all ${
                          repsDone === r ? 'bg-[#d8ff38] text-black border-[#d8ff38]' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Formula Comparison Breakdown */}
                <div className="p-4 bg-zinc-900/40 border border-white/5 space-y-2 font-mono-num text-xs">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">ALGORITHM COMPARISON:</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Brzycki:</span>
                      <span className="text-white font-bold">{calcBrzycki} {is1rmMetric ? 'kg' : 'lbs'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Epley:</span>
                      <span className="text-white font-bold">{calcEpley} {is1rmMetric ? 'kg' : 'lbs'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Lombardi:</span>
                      <span className="text-white font-bold">{calcLombardi} {is1rmMetric ? 'kg' : 'lbs'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Wathan:</span>
                      <span className="text-white font-bold">{calcWathan} {is1rmMetric ? 'kg' : 'lbs'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: 1RM Display & Training Load Table */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Highlight 1RM Box */}
                <div className="bg-zinc-950 border border-white/15 p-6 sm:p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#d8ff38]/10 rounded-full blur-[80px] pointer-events-none" />
                  
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                    <div>
                      <span className="text-xs font-mono-num uppercase tracking-widest text-zinc-400">
                        {liftName}
                      </span>
                      <h4 className="text-sm font-bold uppercase font-mono-num text-[#d8ff38] mt-0.5">
                        COMPOSITE 1-REP MAX (100% 1RM)
                      </h4>
                    </div>
                    <span className="px-3 py-1 bg-zinc-900 border border-white/10 text-white font-mono-num text-xs uppercase">
                      BASED ON {repsDone} RM
                    </span>
                  </div>

                  <div className="flex items-baseline gap-4 my-2">
                    <span className="text-6xl font-mono-num font-extrabold text-white tracking-tight">
                      {estimated1RM}
                    </span>
                    <span className="text-2xl font-mono-num font-bold text-[#d8ff38]">
                      {is1rmMetric ? 'KG' : 'LBS'}
                    </span>
                    <span className="text-xs font-mono-num text-zinc-500 ml-auto">
                      ({is1rmMetric ? `${Math.round(estimated1RM * 2.20462)} LBS` : `${Math.round(estimated1RM * 0.453592)} KG`})
                    </span>
                  </div>
                </div>

                {/* % 1RM Training Load Matrix */}
                <div className="bg-zinc-950 border border-white/10 p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-mono-num font-bold uppercase text-white tracking-wider flex items-center gap-2">
                      <Layers size={14} className="text-[#d8ff38]" />
                      % 1RM TRAINING LOAD MATRIX
                    </span>
                    <span className="text-[10px] font-mono-num text-zinc-500">PROGRAMMING TARGETS</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono-num text-xs">
                    {percentageTable.map(item => (
                      <div key={item.percent} className="p-3 bg-zinc-900/40 border border-white/5 flex flex-col justify-between hover:border-[#d8ff38]/40 transition-colors">
                        <div className="flex items-center justify-between text-zinc-400">
                          <span className="font-bold text-white">{item.percent}%</span>
                          <span className="text-[#d8ff38] font-bold">{item.reps}</span>
                        </div>
                        <div className="mt-2">
                          <span className="text-xl font-bold text-white block">
                            {item.load} <span className="text-[10px] text-zinc-400 font-normal">{is1rmMetric ? 'kg' : 'lbs'}</span>
                          </span>
                          <span className="text-[10px] text-zinc-500 block truncate mt-0.5">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Row: Warm-up Pyramid Progression & Interactive Rest Timer */}
            <div className="grid lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Warm-Up Barbell Pyramid */}
              <div className="lg:col-span-7 bg-zinc-950 border border-white/10 p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] font-mono-num uppercase tracking-widest text-zinc-400 block">
                      INJURY PREVENTION & CNS POTENTIATION
                    </span>
                    <h4 className="text-lg font-bold uppercase font-display text-white mt-0.5">
                      BARBELL WARM-UP PYRAMID GENERATOR
                    </h4>
                  </div>
                  <span className="text-xs font-mono-num text-[#d8ff38] font-bold">5-STAGE PROGRESSION</span>
                </div>

                <div className="space-y-2 font-mono-num text-xs">
                  {warmupPyramid.map((w, idx) => (
                    <div key={idx} className="p-3 bg-zinc-900/30 border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 text-center text-[#d8ff38] font-bold">#{idx + 1}</span>
                        <div>
                          <span className="text-white font-bold block">{w.set}</span>
                          <span className="text-[10px] text-zinc-500 block">{w.percent}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-white font-bold block">{w.load} × {w.reps}</span>
                        <span className="text-[10px] text-zinc-400 block">Rest: {w.rest}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Rest Countdown Timer */}
              <div className="lg:col-span-5 bg-zinc-950 border border-white/10 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6">
                    <span className="text-xs font-mono-num font-bold uppercase text-white tracking-wider flex items-center gap-2">
                      <Clock size={14} className="text-[#d8ff38]" />
                      INTRA-SET REST TIMER
                    </span>
                    <span className="text-[10px] font-mono-num text-zinc-400">AUDIO CUE ACTIVE</span>
                  </div>

                  {/* Preset Timer Buttons */}
                  <div className="grid grid-cols-5 gap-1 font-mono-num text-xs mb-6">
                    {[30, 60, 90, 120, 180].map(s => (
                      <button
                        key={s}
                        onClick={() => handleStartTimer(s)}
                        className={`py-2 text-center border font-bold ${
                          initialTimerSeconds === s 
                            ? 'border-[#d8ff38] bg-[#d8ff38]/10 text-white' 
                            : 'border-zinc-800 text-zinc-400 hover:text-white bg-zinc-900/40'
                        }`}
                      >
                        {s}S
                      </button>
                    ))}
                  </div>

                  {/* Timer Circular / Big Display */}
                  <div className="p-8 bg-[#0c0c0e] border border-white/10 text-center font-mono-num">
                    <span className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">REMAINING REST</span>
                    <span className={`text-6xl font-extrabold tracking-tight block ${timerSeconds === 0 ? 'text-[#d8ff38] animate-pulse' : 'text-white'}`}>
                      {Math.floor(timerSeconds / 60)}:{String(timerSeconds % 60).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-zinc-400 block mt-2">
                      {isTimerRunning ? 'COUNTING DOWN...' : timerSeconds === 0 ? 'TIME TO LIFT! GO!' : 'READY TO START'}
                    </span>
                  </div>
                </div>

                {/* Timer Controls */}
                <div className="grid grid-cols-2 gap-3 font-mono-num text-xs">
                  {isTimerRunning ? (
                    <button
                      onClick={handlePauseTimer}
                      className="py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold uppercase flex items-center justify-center gap-2"
                    >
                      <Pause size={14} />
                      <span>PAUSE</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStartTimer()}
                      className="py-3 bg-[#d8ff38] hover:bg-[#cbf425] text-black font-bold uppercase flex items-center justify-center gap-2"
                    >
                      <Play size={14} />
                      <span>{timerSeconds === initialTimerSeconds ? 'START TIMER' : 'RESUME'}</span>
                    </button>
                  )}

                  <button
                    onClick={handleResetTimer}
                    className="py-3 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white uppercase flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} />
                    <span>RESET</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* View Mode 3: COMPREHENSIVE EXERCISE LIBRARY */}
        {viewMode === 'LIBRARY' && (
          <div className="space-y-8">
            
            {/* Filter and Search Bar */}
            <div className="bg-zinc-950 border border-white/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedExerciseCategory(cat.id)}
                    className={`px-3 py-1.5 text-xs font-mono-num font-bold uppercase tracking-wider border whitespace-nowrap transition-all ${
                      selectedExerciseCategory === cat.id
                        ? 'bg-[#d8ff38] text-black border-[#d8ff38]'
                        : 'border-zinc-800 text-zinc-400 hover:text-white bg-zinc-900/40'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search muscles or lifts..."
                  className="w-full bg-zinc-900 border border-zinc-800 pl-9 pr-4 py-2 text-xs font-mono-num text-white focus:border-[#d8ff38] focus:outline-none"
                />
                <Search size={14} className="absolute left-3 top-2.5 text-zinc-500" />
              </div>

            </div>

            {/* Exercise Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExercises.map(ex => (
                <div
                  key={ex.id}
                  className="border border-white/10 bg-zinc-950 flex flex-col justify-between hover:border-white/30 transition-all group overflow-hidden"
                >
                  {/* Photo area */}
                  <div className="relative h-44 w-full bg-zinc-900 overflow-hidden">
                    <img 
                      src={ex.videoThumbnail} 
                      alt={ex.name} 
                      className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                    
                    <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/80 border border-white/10 text-[10px] font-mono-num font-bold text-[#d8ff38] uppercase">
                      {ex.category}
                    </span>

                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-black/80 border border-white/10 text-[10px] font-mono-num text-zinc-300 uppercase">
                      {ex.difficulty}
                    </span>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="text-base font-bold text-white font-mono-num uppercase group-hover:text-[#d8ff38] transition-colors">
                        {ex.name}
                      </h4>
                      <p className="text-xs font-mono-num text-zinc-400 mt-1">
                        {ex.targetMuscles}
                      </p>
                    </div>

                    <div className="border-t border-white/10 pt-3 flex items-center justify-between font-mono-num text-xs text-zinc-400">
                      <span>SETS: <strong className="text-white">{ex.sets}</strong></span>
                      <span>REPS: <strong className="text-[#d8ff38]">{ex.reps}</strong></span>
                      <span>REST: <strong className="text-white">{ex.restSeconds}s</strong></span>
                    </div>

                    <button
                      onClick={() => setActiveExerciseModal(ex)}
                      className="w-full py-2 bg-zinc-900 hover:bg-[#d8ff38] hover:text-black border border-white/10 text-xs font-mono-num font-bold uppercase tracking-wider transition-colors"
                    >
                      READ BIOMECHANICS & FORM
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* EXERCISE DETAIL MODAL */}
        {activeExerciseModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0c0c0e] border border-white/20 max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono-num uppercase tracking-widest text-[#d8ff38] block">
                    {activeExerciseModal.category} // {activeExerciseModal.difficulty}
                  </span>
                  <h3 className="text-2xl font-bold uppercase font-display text-white mt-0.5">
                    {activeExerciseModal.name}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveExerciseModal(null)}
                  className="text-zinc-400 hover:text-white text-xs font-mono-num uppercase px-3 py-1 border border-zinc-800"
                >
                  CLOSE
                </button>
              </div>

              {/* Image & Key cue */}
              <div className="relative h-48 w-full bg-zinc-900 overflow-hidden border border-white/10">
                <img
                  src={activeExerciseModal.videoThumbnail}
                  alt={activeExerciseModal.name}
                  className="w-full h-full object-cover filter grayscale contrast-125"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 inset-x-0 p-3 bg-black/80 backdrop-blur-sm border-t border-white/10 text-xs font-mono-num text-zinc-300">
                  <span className="text-[#d8ff38] font-bold uppercase">PRIMARY MUSCLES: </span>
                  {activeExerciseModal.targetMuscles}
                </div>
              </div>

              {/* Execution Steps */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono-num font-bold uppercase tracking-wider text-white">
                  EXECUTION PROTOCOL:
                </h4>
                <div className="space-y-2 font-mono-num text-xs text-zinc-300">
                  {activeExerciseModal.instructions.map((step, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-3 bg-zinc-950 p-3 border border-white/5">
                      <span className="text-[#d8ff38] font-bold shrink-0">0{sIdx + 1}.</span>
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Golden Form Tip */}
              <div className="p-4 bg-zinc-900 border-l-2 border-[#d8ff38] text-xs font-mono-num text-zinc-200">
                <span className="text-[#d8ff38] font-bold uppercase block mb-1">COACH BIOMECHANICAL CUE</span>
                <p>{activeExerciseModal.keyFormTip}</p>
              </div>

              <div className="flex items-center justify-between text-xs font-mono-num text-zinc-400 border-t border-white/10 pt-4">
                <span>PRESCRIBED REST: {activeExerciseModal.restSeconds} SECONDS</span>
                <button
                  onClick={() => setActiveExerciseModal(null)}
                  className="px-5 py-2 bg-[#d8ff38] text-black font-bold uppercase text-xs"
                >
                  GOT IT
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
