import React, { useState } from 'react';
import { X, Play, Video, CheckCircle2, Flame, Sparkles, MessageCircle, Clock, ShieldCheck, ChevronRight, Upload, AlertCircle } from 'lucide-react';

interface DisciplineDayModule {
  day: number;
  phase: number;
  title: string;
  focus: string;
  durationMins: number;
  mission: string;
  hydrationTargetLiters: number;
  equipment: string;
  videoPlaceholderUrl?: string;
  isCompleted?: boolean;
}

export const DISCIPLINE_21_DAYS_CURRICULUM: DisciplineDayModule[] = [
  // Phase 1: Days 1 - 7: Ignition & Foundation
  {
    day: 1,
    phase: 1,
    title: 'Mindset Architecture & Baseline Discipline',
    focus: 'Mindset, Breathing & Baseline Movement',
    durationMins: 18,
    mission: 'Establish zero-excuse morning protocol. Eliminate liquid sugar and take Day 1 baseline waist & weight metrics.',
    hydrationTargetLiters: 3.0,
    equipment: 'Bodyweight Only'
  },
  {
    day: 2,
    phase: 1,
    title: 'Core Activation & The 3L Water Rule',
    focus: 'Pelvic Stability & Deep Core Awakening',
    durationMins: 20,
    mission: 'Lock in 3.0L water before 8:00 PM. Master transverse abdominis bracing and glute bridges.',
    hydrationTargetLiters: 3.0,
    equipment: 'Yoga Mat / Towel'
  },
  {
    day: 3,
    phase: 1,
    title: 'Upper Body Tone & The Protein Anchor',
    focus: 'Push/Pull Upper Body Conditioning',
    durationMins: 22,
    mission: 'Hit your personalized protein target across 3 balanced meals. Complete all 4 sets of tempo push-ups/incline presses.',
    hydrationTargetLiters: 3.2,
    equipment: 'Bodyweight or Light Dumbbells'
  },
  {
    day: 4,
    phase: 1,
    title: 'Active Mobility & Craving Elimination',
    focus: 'Hip Openers, Thoracic Mobility & Fast Walking',
    durationMins: 18,
    mission: 'Complete 8,000 brisk steps. Zero processed snacks after 7:30 PM.',
    hydrationTargetLiters: 3.0,
    equipment: 'Comfortable Walking Shoes'
  },
  {
    day: 5,
    phase: 1,
    title: 'Lower Body Power & Kinetic Chain',
    focus: 'Quads, Hamstrings & Glute Tension',
    durationMins: 24,
    mission: 'Execute strict squat and reverse lunge tempo (3-sec eccentric). Cook fresh homemade dinner.',
    hydrationTargetLiters: 3.2,
    equipment: 'Bodyweight or Light Dumbbells'
  },
  {
    day: 6,
    phase: 1,
    title: 'Full Body Metabolic Sweat Quotient',
    focus: 'High-Density Interval Conditioning',
    durationMins: 20,
    mission: 'Sustain cadence through 5 rounds of high-effort circuit work. Recovery foam roll or dynamic stretching.',
    hydrationTargetLiters: 3.5,
    equipment: 'Timer & Yoga Mat'
  },
  {
    day: 7,
    phase: 1,
    title: 'Week 1 Milestone Audit & Reflection',
    focus: 'Recovery, Joint Mobility & Habit Audit',
    durationMins: 15,
    mission: 'Weigh-in and log Week 1 metric audit. Prepare grocery items for Week 2 progressive overload.',
    hydrationTargetLiters: 3.0,
    equipment: 'Measuring Tape'
  },

  // Phase 2: Days 8 - 14: Momentum & Progressive Tension
  {
    day: 8,
    phase: 2,
    title: 'Neurological Override: Resisting Resistance',
    focus: 'Tempo Push & Shoulder Stability',
    durationMins: 22,
    mission: 'Focus on perfect form under fatigue. No mid-workout distractions or phone browsing.',
    hydrationTargetLiters: 3.2,
    equipment: 'Dumbbells or Water Bottles'
  },
  {
    day: 9,
    phase: 2,
    title: 'Posterior Chain & Posture Alignment',
    focus: 'Romanian Deadlifts & Back Density',
    durationMins: 24,
    mission: 'Engage lats and glutes. Ensure adequate sleep (7.5+ hours) for central nervous recovery.',
    hydrationTargetLiters: 3.2,
    equipment: 'Dumbbells / Resistance Band'
  },
  {
    day: 10,
    phase: 2,
    title: 'Mid-Point Metabolic Crucible',
    focus: 'Tabata Conditioning & Core Endurance',
    durationMins: 20,
    mission: 'Complete 20s work / 10s rest protocol with zero stopped intervals.',
    hydrationTargetLiters: 3.5,
    equipment: 'Yoga Mat'
  },
  {
    day: 11,
    phase: 2,
    title: 'Isometric Strength & Anti-Rotational Core',
    focus: 'Plank Progressions & Pallof Holds',
    durationMins: 18,
    mission: 'Master anti-rotation. Keep daily calorie adherence within strict calculated deficit/maintenance.',
    hydrationTargetLiters: 3.0,
    equipment: 'Yoga Mat'
  },
  {
    day: 12,
    phase: 2,
    title: 'Lower Body Hypertrophy & Unilateral Balance',
    focus: 'Bulgarian Split Squats & Calf Strength',
    durationMins: 25,
    mission: 'Overcome unilateral muscle imbalances. Focus on knee tracking over second toe.',
    hydrationTargetLiters: 3.2,
    equipment: 'Chair/Bench & Dumbbells'
  },
  {
    day: 13,
    phase: 2,
    title: 'Cardio Engine & High-Volume Density',
    focus: 'Aerobic Power & Breath Control',
    durationMins: 22,
    mission: 'Maintain steady aerobic heart rate for 22 continuous minutes. Zero skipped rounds.',
    hydrationTargetLiters: 3.5,
    equipment: 'Bodyweight'
  },
  {
    day: 14,
    phase: 2,
    title: 'Day 14 Benchmark Checkpoint & Recomp Audit',
    focus: 'Restorative Yoga & Deep Recovery',
    durationMins: 15,
    mission: 'Celebrate 14 days of unbroken discipline. Compare Day 1 vs Day 14 photo check-in.',
    hydrationTargetLiters: 3.0,
    equipment: 'Self-Reflection Sheet'
  },

  // Phase 3: Days 15 - 21: Peak Discipline & Permanent Transformation
  {
    day: 15,
    phase: 3,
    title: 'Peak Density: Upper Body Power Surge',
    focus: 'Chest, Back & Arm Sculpting',
    durationMins: 25,
    mission: 'Increase mechanical volume. Track repetitions and achieve personal record over Day 3 & 8.',
    hydrationTargetLiters: 3.5,
    equipment: 'Dumbbells'
  },
  {
    day: 16,
    phase: 3,
    title: 'Lower Body Endurance & Explosive Power',
    focus: 'Squats, Jump Mechanics & Glute Burnout',
    durationMins: 24,
    mission: 'Push past burning threshold safely. Hydrate with intra-workout electrolytes.',
    hydrationTargetLiters: 3.5,
    equipment: 'Dumbbells / Bodyweight'
  },
  {
    day: 17,
    phase: 3,
    title: 'Unbreakable Core & Dynamic Stability',
    focus: 'Hollow Body Holds & Mountain Climbers',
    durationMins: 20,
    mission: 'Zero cheat repetitions. Complete core complex with uninterrupted flow.',
    hydrationTargetLiters: 3.2,
    equipment: 'Yoga Mat'
  },
  {
    day: 18,
    phase: 3,
    title: 'Aerobic Threshold & Mental Toughness',
    focus: 'Continuous Flow Cardio & Bodyweight Burn',
    durationMins: 22,
    mission: 'Embrace physical friction. Remind yourself why you commenced this challenge.',
    hydrationTargetLiters: 3.5,
    equipment: 'Bodyweight'
  },
  {
    day: 19,
    phase: 3,
    title: 'Full Body Complex & Functional Agility',
    focus: 'Compound Movement Integration',
    durationMins: 25,
    mission: 'Execute clean clean-and-press and walking lunges with razor-sharp mechanics.',
    hydrationTargetLiters: 3.5,
    equipment: 'Dumbbells'
  },
  {
    day: 20,
    phase: 3,
    title: 'The Penultimate Test: 300 Rep Challenge',
    focus: 'Full Body Stamina & Muscular Endurance',
    durationMins: 26,
    mission: 'Complete 300 total designated repetitions across squats, push-ups, lunges, and crunches.',
    hydrationTargetLiters: 3.5,
    equipment: 'Dumbbells & Mat'
  },
  {
    day: 21,
    phase: 3,
    title: 'Final Mastery & Lifetime Discipline Seal',
    focus: 'Celebration Circuit, Mobility & Future Blueprint',
    durationMins: 20,
    mission: 'Complete Final Day 21 circuit! Log final transformation measurements and claim your digital Discipline Finisher Badge.',
    hydrationTargetLiters: 3.2,
    equipment: 'Measuring Tape'
  }
];

interface DisciplineChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnroll?: () => void;
}

export const DisciplineChallengeModal: React.FC<DisciplineChallengeModalProps> = ({
  isOpen,
  onClose,
  onEnroll
}) => {
  const [activePhaseFilter, setActivePhaseFilter] = useState<number | 'ALL'>('ALL');
  const [selectedDayModule, setSelectedDayModule] = useState<DisciplineDayModule | null>(null);
  const [completedDays, setCompletedDays] = useState<number[]>([1, 2]); // Demo initial progress
  const [customVideoUrl, setCustomVideoUrl] = useState<string>('');
  const [videoSlotSavedMsg, setVideoSlotSavedMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredCurriculum = activePhaseFilter === 'ALL'
    ? DISCIPLINE_21_DAYS_CURRICULUM
    : DISCIPLINE_21_DAYS_CURRICULUM.filter(d => d.phase === activePhaseFilter);

  const toggleDayCompletion = (dayNum: number) => {
    setCompletedDays(prev =>
      prev.includes(dayNum) ? prev.filter(d => d !== dayNum) : [...prev, dayNum]
    );
  };

  const handleWhatsAppEnroll = () => {
    const text = encodeURIComponent(
      'Hello Coach Neetu! I want to enroll in the "21 Days Discipline Challenge" (21 Days Online Program · ₹799). Please share payment and onboarding instructions.'
    );
    window.open(`https://wa.me/917420082838?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-mono-num animate-in fade-in duration-200">
      <div className="relative bg-[#0b0b0f] border border-[#FFC515]/50 w-full max-w-5xl max-h-[92vh] flex flex-col rounded-[4px] shadow-[0_0_50px_rgba(255,197,21,0.15)] overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="p-5 sm:p-7 border-b border-white/10 bg-gradient-to-r from-[#121218] via-[#0e0e14] to-[#121218] flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#FFC515] text-black font-extrabold text-[10px] uppercase rounded-[2px] tracking-wider">
                STANDALONE ONLINE PROGRAM
              </span>
              <span className="px-2 py-0.5 bg-zinc-800 text-zinc-300 font-bold text-[10px] uppercase rounded-[2px] border border-white/10">
                21 DAYS DURATION
              </span>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 font-extrabold text-[10px] uppercase rounded-[2px] border border-emerald-500/30">
                ₹799 ONLY
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase font-display text-white tracking-tight">
              21 DAYS <span className="text-[#FFC515]">DISCIPLINE CHALLENGE</span>
            </h2>

            <p className="text-zinc-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              A continuous 21-day online discipline and habit architecture protocol. Complete with daily progressive movement modules, structured hydration rules, and zero-guesswork habit accountability.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-zinc-400">
              <span className="text-amber-300 font-semibold">• 100% Online Program</span>
              <span className="text-zinc-400">• No Virtual / 1:1 Live Sessions</span>
              <span className="text-emerald-400 font-semibold">• Video Upload Architecture Ready</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 rounded transition-colors"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Phase Filter Tabs & Progress Strip */}
        <div className="px-5 sm:px-7 py-3 border-b border-white/10 bg-[#0e0e14] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActivePhaseFilter('ALL')}
              className={`px-3 py-1.5 rounded-[2px] text-xs font-bold uppercase transition-all ${
                activePhaseFilter === 'ALL'
                  ? 'bg-[#FFC515] text-black shadow-sm'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/10'
              }`}
            >
              All 21 Days ({DISCIPLINE_21_DAYS_CURRICULUM.length})
            </button>
            <button
              onClick={() => setActivePhaseFilter(1)}
              className={`px-3 py-1.5 rounded-[2px] text-xs font-bold uppercase transition-all ${
                activePhaseFilter === 1
                  ? 'bg-[#FFC515] text-black shadow-sm'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/10'
              }`}
            >
              Week 1: Ignition (Days 1–7)
            </button>
            <button
              onClick={() => setActivePhaseFilter(2)}
              className={`px-3 py-1.5 rounded-[2px] text-xs font-bold uppercase transition-all ${
                activePhaseFilter === 2
                  ? 'bg-[#FFC515] text-black shadow-sm'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/10'
              }`}
            >
              Week 2: Momentum (Days 8–14)
            </button>
            <button
              onClick={() => setActivePhaseFilter(3)}
              className={`px-3 py-1.5 rounded-[2px] text-xs font-bold uppercase transition-all ${
                activePhaseFilter === 3
                  ? 'bg-[#FFC515] text-black shadow-sm'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/10'
              }`}
            >
              Week 3: Mastery (Days 15–21)
            </button>
          </div>

          <div className="flex items-center gap-2 text-zinc-400 text-xs shrink-0">
            <Flame size={14} className="text-[#FFC515]" />
            <span>Progress: <strong className="text-white">{completedDays.length} / 21 Days</strong></span>
            <span className="text-[#FFC515] font-bold">({Math.round((completedDays.length / 21) * 100)}%)</span>
          </div>
        </div>

        {/* Scrollable Curriculum Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          
          {/* Video Delivery Architecture Notice */}
          <div className="bg-[#12121a] border border-[#FFC515]/30 p-4 rounded-[4px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] text-[#FFC515] uppercase font-extrabold tracking-wider flex items-center gap-1.5">
                <Video size={13} />
                <span>VIDEO CONTENT MODULE ARCHITECTURE READY</span>
              </span>
              <p className="text-zinc-300 text-xs leading-relaxed">
                Each day below is architected with a dedicated video playback frame, daily focus, hydration target, and accountability mission. Coach Neetu will provide the workout videos separately, and each slot is pre-configured to stream high-definition content seamlessly.
              </p>
            </div>
            <div className="shrink-0 px-3 py-1.5 bg-[#FFC515]/10 border border-[#FFC515]/30 rounded text-[11px] text-[#FFC515] font-bold uppercase">
              21 Video Slots Ready
            </div>
          </div>

          {/* Curriculum Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCurriculum.map((item) => {
              const isDone = completedDays.includes(item.day);
              return (
                <div
                  key={item.day}
                  className={`border rounded-[4px] p-4 flex flex-col justify-between space-y-3 transition-all ${
                    isDone
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-100'
                      : 'bg-[#101014] border-white/10 hover:border-[#FFC515]/60'
                  }`}
                >
                  <div className="space-y-2">
                    {/* Day Badge & Duration */}
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="px-2 py-0.5 bg-[#FFC515]/15 border border-[#FFC515]/30 text-[#FFC515] font-black uppercase rounded">
                        DAY {item.day < 10 ? `0${item.day}` : item.day}
                      </span>
                      <span className="text-zinc-400 font-bold flex items-center gap-1">
                        <Clock size={11} />
                        <span>{item.durationMins} MINS</span>
                      </span>
                    </div>

                    {/* Day Title */}
                    <h4 className="text-sm font-bold uppercase font-display text-white tracking-tight leading-snug">
                      {item.title}
                    </h4>

                    {/* Focus */}
                    <p className="text-[11px] text-[#FFC515] font-semibold">
                      Focus: <span className="text-zinc-300 font-normal">{item.focus}</span>
                    </p>

                    {/* Video Slot Card Container */}
                    <div 
                      onClick={() => setSelectedDayModule(item)}
                      className="group relative h-28 bg-[#0a0a0d] border border-dashed border-white/20 hover:border-[#FFC515] rounded flex flex-col items-center justify-center text-center p-3 cursor-pointer transition-all overflow-hidden"
                    >
                      <div className="w-10 h-10 rounded-full bg-zinc-900 group-hover:bg-[#FFC515] text-zinc-400 group-hover:text-black flex items-center justify-center transition-all mb-1 shadow">
                        <Play size={16} className="ml-0.5" />
                      </div>
                      <span className="text-[10px] uppercase font-bold text-zinc-300 group-hover:text-white">
                        Video Lesson Slot Ready
                      </span>
                      <span className="text-[9px] text-zinc-500">
                        Tap to preview / upload link
                      </span>
                    </div>

                    {/* Mission Quote */}
                    <div className="p-2 bg-[#0d0d12] border border-white/5 rounded text-[10px] text-zinc-300 leading-snug">
                      <strong className="text-[#FFC515] block uppercase text-[9px] mb-0.5">Daily Mission:</strong>
                      {item.mission}
                    </div>

                    {/* Hydration & Equipment Specs */}
                    <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1 border-t border-white/5">
                      <span>Water: <strong className="text-white">{item.hydrationTargetLiters}L</strong></span>
                      <span>Equipment: <strong className="text-zinc-300">{item.equipment}</strong></span>
                    </div>
                  </div>

                  {/* Complete Day Checkbox Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => toggleDayCompletion(item.day)}
                      className={`w-full py-2 px-3 text-[11px] font-bold uppercase rounded flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isDone
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                          : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/10'
                      }`}
                    >
                      <CheckCircle2 size={13} className={isDone ? "text-emerald-400" : "text-zinc-500"} />
                      <span>{isDone ? 'Day Completed ✓' : 'Mark Day Completed'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Modal Bottom Sticky CTA */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-[#0e0e14] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 text-xs">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-zinc-400 uppercase text-[11px]">Program Fee:</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#FFC515]">₹799</span>
              <span className="text-xs text-zinc-500 uppercase">/ ONE-TIME</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Online Program · Instant WhatsApp Access · Daily Video Curriculum Hub
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleWhatsAppEnroll}
              className="flex-1 sm:flex-none px-5 py-3 bg-[#FFC515] hover:bg-[#eab308] text-black font-extrabold text-xs uppercase tracking-wider rounded-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <MessageCircle size={15} />
              <span>ENROLL VIA WHATSAPP (₹799)</span>
            </button>

            <button
              onClick={() => {
                if (onEnroll) onEnroll();
                onClose();
              }}
              className="flex-1 sm:flex-none px-4 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider rounded-[2px] border border-white/15 transition-all cursor-pointer"
            >
              <span>INQUIRE WITH COACH</span>
            </button>
          </div>
        </div>

        {/* Day Video Module Preview & Upload Drawer Sub-Modal */}
        {selectedDayModule && (
          <div className="absolute inset-0 z-20 bg-black/95 backdrop-blur-lg p-4 sm:p-8 flex flex-col justify-between overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="max-w-3xl mx-auto w-full space-y-6 my-auto">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="px-2 py-0.5 bg-[#FFC515] text-black text-[10px] font-black uppercase rounded">
                    DAY {selectedDayModule.day} VIDEO MODULE
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold uppercase font-display text-white mt-1">
                    {selectedDayModule.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Target Duration: {selectedDayModule.durationMins} Mins • Focus: {selectedDayModule.focus}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedDayModule(null)}
                  className="p-2 text-zinc-400 hover:text-white bg-zinc-900 rounded"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Video Player Display Container */}
              <div className="aspect-video w-full bg-[#08080c] border border-[#FFC515]/40 rounded relative flex flex-col items-center justify-center text-center p-6 overflow-hidden shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-[#FFC515]/20 border border-[#FFC515] text-[#FFC515] flex items-center justify-center mb-3">
                  <Video size={28} />
                </div>
                <span className="text-base font-extrabold uppercase font-display text-white tracking-wide">
                  COACH NEETU VIDEO MODULE SLOT READY
                </span>
                <p className="text-xs text-zinc-400 max-w-md mt-1 leading-relaxed">
                  The video for Day {selectedDayModule.day} will stream directly inside this player once Coach Neetu shares the video content.
                </p>
                <div className="mt-3 px-3 py-1 bg-zinc-900/90 border border-white/15 text-[11px] text-zinc-300 rounded">
                  Format Supported: Direct MP4, YouTube Unlisted, Vimeo, or Cloudinary Stream
                </div>
              </div>

              {/* Video Upload / Link URL Box for Admin & Coach */}
              <div className="p-4 bg-[#121218] border border-white/15 rounded space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold uppercase text-[#FFC515] flex items-center gap-1.5">
                    <Upload size={12} />
                    <span>Upload / Link Video URL for Day {selectedDayModule.day} (Coach Upload Slot):</span>
                  </label>
                  {videoSlotSavedMsg && (
                    <span className="text-[10px] text-emerald-400 font-bold">{videoSlotSavedMsg}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customVideoUrl}
                    onChange={(e) => setCustomVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/... or .mp4 link"
                    className="flex-1 bg-black border border-white/20 p-2.5 text-xs text-white rounded focus:border-[#FFC515] outline-none font-mono-num"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setVideoSlotSavedMsg(`Video URL linked to Day ${selectedDayModule.day}!`);
                      setTimeout(() => setVideoSlotSavedMsg(null), 3000);
                    }}
                    className="px-4 py-2 bg-[#FFC515] text-black font-extrabold text-xs uppercase rounded cursor-pointer"
                  >
                    Save Slot
                  </button>
                </div>
              </div>

              {/* Day Mission Breakdown */}
              <div className="p-4 bg-zinc-950 border border-white/10 rounded space-y-2 text-xs">
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">
                  DAILY MISSION & COMPLIANCE RULES:
                </span>
                <p className="text-zinc-200 leading-relaxed">
                  {selectedDayModule.mission}
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-zinc-400 text-[11px]">
                  <div>Hydration Goal: <strong className="text-white">{selectedDayModule.hydrationTargetLiters} Litres</strong></div>
                  <div>Equipment Needed: <strong className="text-white">{selectedDayModule.equipment}</strong></div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setSelectedDayModule(null)}
                  className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase rounded cursor-pointer"
                >
                  Close Preview
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
