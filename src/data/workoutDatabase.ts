import { Exercise, MuscleGroup, ExperienceLevel, EquipmentType, WorkoutPlan, FitnessGoal } from '../types';

export const EXERCISE_DATABASE: Exercise[] = [
  // CHEST
  {
    id: 'ex_barbell_bench',
    name: 'Barbell Flat Bench Press',
    targetMuscles: 'Pectoralis Major, Anterior Deltoid, Triceps',
    category: 'CHEST',
    difficulty: 'INTERMEDIATE',
    sets: '4',
    reps: '6-8',
    restSeconds: 120,
    instructions: [
      'Plant feet flat with shoulder blades retracted and depressed into bench.',
      'Grip bar slightly wider than shoulder-width with wrists stacked.',
      'Unrack, take a deep belly breath, brace core, and lower bar under control to mid-chest.',
      'Drive aggressively upward without bouncing, locking elbows softly.'
    ],
    keyFormTip: 'Tuck elbows at 45° to protect shoulders and maximize sternal chest recruitment.',
    videoThumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    equipment: 'FULL_GYM'
  },
  {
    id: 'ex_incline_dumbbell_press',
    name: 'Incline Dumbbell Press',
    targetMuscles: 'Clavicular (Upper) Pectorals, Anterior Deltoids',
    category: 'CHEST',
    difficulty: 'INTERMEDIATE',
    sets: '3-4',
    reps: '8-10',
    restSeconds: 90,
    instructions: [
      'Set bench to 30° incline.',
      'Kick dumbbells to shoulder height, pinch scapulae together.',
      'Press dumbbells along a slight inward arc, controlling the deep eccentric stretch at bottom.'
    ],
    keyFormTip: 'Do not exceed 30°-45° incline to avoid shifting load predominantly to front delts.',
    videoThumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    equipment: 'DUMBBELLS'
  },
  {
    id: 'ex_weighted_dips',
    name: 'Parallel Bar Chest Dips',
    targetMuscles: 'Lower Pectorals, Anterior Deltoids, Triceps',
    category: 'CHEST',
    difficulty: 'ADVANCED',
    sets: '3',
    reps: '8-12',
    restSeconds: 90,
    instructions: [
      'Mount bars and lean torso forward at 30° angle.',
      'Bend knees slightly, flare elbows outward slightly as you lower until shoulders pass elbows.',
      'Drive powerfully up through palms.'
    ],
    keyFormTip: 'Maintain forward lean throughout to target chest over triceps.',
    videoThumbnail: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80',
    equipment: 'HOME_GYM'
  },
  {
    id: 'ex_pushups_tempo',
    name: 'Deficit Tempo Push-Ups',
    targetMuscles: 'Pectorals, Serratus Anterior, Core',
    category: 'CHEST',
    difficulty: 'BEGINNER',
    sets: '4',
    reps: '15-20',
    restSeconds: 60,
    instructions: [
      'Hands placed slightly outside shoulders on parallettes or plates.',
      'Squeeze glutes and abs to maintain rigid plank.',
      'Lower for 3 seconds into deep chest stretch, pause 1s, explode up.'
    ],
    keyFormTip: 'Keep neck neutral and protract shoulder blades at the very top.',
    videoThumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
    equipment: 'NO_EQUIPMENT'
  },

  // BACK
  {
    id: 'ex_deadlift',
    name: 'Conventional Barbell Deadlift',
    targetMuscles: 'Posterior Chain, Erector Spinae, Latissimus Dorsi, Glutes, Hamstrings',
    category: 'BACK',
    difficulty: 'ADVANCED',
    sets: '4',
    reps: '5',
    restSeconds: 180,
    instructions: [
      'Bar over mid-foot, feet hip-width apart.',
      'Hinge hips, grip bar firmly, pull chest up and pull the slack out of the bar.',
      'Leg press the floor away, locking hips and knees simultaneously.'
    ],
    keyFormTip: 'Engage lats as if bending the bar around your shins before lifting.',
    videoThumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    equipment: 'FULL_GYM'
  },
  {
    id: 'ex_chest_supported_row',
    name: 'Chest-Supported T-Bar Row',
    targetMuscles: 'Rhomboids, Middle Trapezius, Latissimus Dorsi',
    category: 'BACK',
    difficulty: 'INTERMEDIATE',
    sets: '4',
    reps: '8-10',
    restSeconds: 90,
    instructions: [
      'Lie prone on pad, grab neutral handles.',
      'Initiate pull by retracting shoulder blades without arching lower back off the pad.',
      'Pull elbows toward hips and hold contraction for 1 full second.'
    ],
    keyFormTip: 'Eliminates lumbar fatigue while overloading upper back density.',
    videoThumbnail: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80',
    equipment: 'FULL_GYM'
  },
  {
    id: 'ex_pullups_strict',
    name: 'Strict Bodyweight Pull-Ups',
    targetMuscles: 'Latissimus Dorsi, Biceps Brachii, Rear Deltoids',
    category: 'BACK',
    difficulty: 'INTERMEDIATE',
    sets: '4',
    reps: '6-10',
    restSeconds: 90,
    instructions: [
      'Overhand grip outside shoulders, start from dead hang.',
      'Depress scapulae, pull chest directly toward bar until chin clears with zero kipping.'
    ],
    keyFormTip: 'Lead with sternum, not chin, to maximize lat fiber recruitment.',
    videoThumbnail: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80',
    equipment: 'HOME_GYM'
  },

  // SHOULDERS
  {
    id: 'ex_overhead_press',
    name: 'Standing Military Barbell Press',
    targetMuscles: 'Anterior & Lateral Deltoids, Upper Chest, Triceps, Core',
    category: 'SHOULDERS',
    difficulty: 'ADVANCED',
    sets: '4',
    reps: '6-8',
    restSeconds: 120,
    instructions: [
      'Grip just outside shoulders, elbows tucked in front of bar.',
      'Brace glutes and quads. Press bar overhead in vertical path by pulling head slightly back.',
      'Lock out overhead with bar stacked directly over shoulder joint.'
    ],
    keyFormTip: 'Squeeze glutes rock hard to prevent hyper-extending the lumbar spine.',
    videoThumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
    equipment: 'FULL_GYM'
  },
  {
    id: 'ex_lateral_raise_cable',
    name: 'Behind-the-Back Cable Lateral Raise',
    targetMuscles: 'Lateral Deltoids',
    category: 'SHOULDERS',
    difficulty: 'INTERMEDIATE',
    sets: '4',
    reps: '12-15',
    restSeconds: 60,
    instructions: [
      'Set pulley to wrist height, stand in front with cable behind lower back.',
      'Raise arm in scapular plane (30° forward) until parallel to floor, controlling descent.'
    ],
    keyFormTip: 'Provides continuous tension through the entire range of motion.',
    videoThumbnail: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    equipment: 'FULL_GYM'
  },
  {
    id: 'ex_dumbbell_lateral_raises',
    name: 'Standing Dumbbell Lateral Raise',
    targetMuscles: 'Lateral Deltoid Head',
    category: 'SHOULDERS',
    difficulty: 'BEGINNER',
    sets: '4',
    reps: '12-15',
    restSeconds: 60,
    instructions: [
      'Slight forward hinge at hips (10°).',
      'Lead with elbows and pinkies, sweeping weights outward and slightly forward.'
    ],
    keyFormTip: 'Never shrug traps at the top; keep shoulder blades down.',
    videoThumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    equipment: 'DUMBBELLS'
  },

  // ARMS
  {
    id: 'ex_incline_dumbbell_curl',
    name: 'Incline Dumbbell Bicep Curl',
    targetMuscles: 'Biceps Long Head (Peak)',
    category: 'ARMS',
    difficulty: 'INTERMEDIATE',
    sets: '3',
    reps: '10-12',
    restSeconds: 60,
    instructions: [
      'Sit back on 45° incline bench, letting arms hang straight down behind torso.',
      'Curl dumbbells upward while supinating wrists, keeping elbows pinned back.'
    ],
    keyFormTip: 'Maintains extreme stretch on the long head of the bicep throughout.',
    videoThumbnail: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    equipment: 'DUMBBELLS'
  },
  {
    id: 'ex_skull_crushers',
    name: 'EZ-Bar Overhead Triceps Extension (Skull Crusher)',
    targetMuscles: 'Triceps Long Head & Medial Head',
    category: 'ARMS',
    difficulty: 'INTERMEDIATE',
    sets: '3-4',
    reps: '10-12',
    restSeconds: 75,
    instructions: [
      'Lie flat, press EZ-bar overhead with shoulders angled slightly back toward crown of head.',
      'Flex at elbows only, lowering bar toward crown of head, then extend triceps fully.'
    ],
    keyFormTip: 'Angling the upper arm back 10° keeps constant tension at the top lockout.',
    videoThumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    equipment: 'FULL_GYM'
  },

  // LEGS
  {
    id: 'ex_barbell_squat',
    name: 'Barbell High-Bar Back Squat',
    targetMuscles: 'Quadriceps, Gluteus Maximus, Adductors, Core',
    category: 'LEGS',
    difficulty: 'ADVANCED',
    sets: '4',
    reps: '6-8',
    restSeconds: 150,
    instructions: [
      'Bar rested on upper traps, feet shoulder-width, toes turned 15° out.',
      'Inhale deep into diaphragm, brace 360°, sit down between hips below parallel.',
      'Drive floor away while maintaining upright chest.'
    ],
    keyFormTip: 'Track knees directly over middle toes, ensuring heels remain glued down.',
    videoThumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    equipment: 'FULL_GYM'
  },
  {
    id: 'ex_romanian_deadlift',
    name: 'Dumbbell Romanian Deadlift (RDL)',
    targetMuscles: 'Hamstrings, Glute-Ham Tie-in, Lower Back',
    category: 'LEGS',
    difficulty: 'INTERMEDIATE',
    sets: '4',
    reps: '8-10',
    restSeconds: 90,
    instructions: [
      'Hold dumbbells in front of thighs with slight soft knee bend.',
      'Push hips straight backward toward wall while keeping dumbbells skimming shins.',
      'Squeeze glutes to return once deep hamstring stretch is felt.'
    ],
    keyFormTip: 'Move through hips only—do not increase knee flexion on the way down.',
    videoThumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    equipment: 'DUMBBELLS'
  },
  {
    id: 'ex_bulgarian_split_squat',
    name: 'Rear-Foot Elevated Bulgarian Split Squat',
    targetMuscles: 'Quads, Glutes, Stabilizers',
    category: 'LEGS',
    difficulty: 'INTERMEDIATE',
    sets: '3',
    reps: '10 per leg',
    restSeconds: 75,
    instructions: [
      'Place rear foot on bench laces-down.',
      'Lower front hip until front thigh is parallel to ground.',
      'Drive through front heel to return to top.'
    ],
    keyFormTip: 'Slight forward torso lean shifts emphasis onto glute max.',
    videoThumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    equipment: 'DUMBBELLS'
  },

  // CORE
  {
    id: 'ex_hanging_leg_raise',
    name: 'Hanging Strict Leg Raise',
    targetMuscles: 'Rectus Abdominis, Iliopsoas, Obliques',
    category: 'CORE',
    difficulty: 'ADVANCED',
    sets: '4',
    reps: '10-15',
    restSeconds: 60,
    instructions: [
      'Hang from pullup bar, depress shoulder blades.',
      'Posteriorly tilt pelvis and curl legs straight up until toes touch bar without swinging.'
    ],
    keyFormTip: 'Curl your pelvis upward at the top; do not just flex hip flexors.',
    videoThumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    equipment: 'HOME_GYM'
  },
  {
    id: 'ex_ab_wheel_rollout',
    name: 'Kneeling Ab Wheel Rollout',
    targetMuscles: 'Deep Core, Rectus Abdominis, Lats',
    category: 'CORE',
    difficulty: 'INTERMEDIATE',
    sets: '3',
    reps: '10-12',
    restSeconds: 60,
    instructions: [
      'Kneel on mat, hold wheel directly under shoulders with tucked pelvis.',
      'Roll out as far as core strength permits without letting lumbar sag, then pull back.'
    ],
    keyFormTip: 'Never let lower back hyperextend—keep abs locked in hollow body position.',
    videoThumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
    equipment: 'HOME_GYM'
  },

  // CARDIO / HIIT
  {
    id: 'ex_assault_bike_sprints',
    name: 'Echo Bike Max Output Sprints',
    targetMuscles: 'Cardiovascular, Full Body Power, Anaerobic Capacity',
    category: 'HIIT',
    difficulty: 'ADVANCED',
    sets: '8 rounds',
    reps: '20s on / 40s off',
    restSeconds: 40,
    instructions: [
      'Establish aggressive push-pull rhythm through handles and pedal drive.',
      'Sprint at 95%+ maximum RPM for 20 seconds, cruise at light cadence during rest.'
    ],
    keyFormTip: 'Drive through balls of feet and maintain aggressive rhythmic breathing.',
    videoThumbnail: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80',
    equipment: 'FULL_GYM'
  },
  {
    id: 'ex_kettlebell_snatches',
    name: 'Hardstyle Kettlebell Snatches',
    targetMuscles: 'Hips, Trapezius, Posterior Chain, Grip, VO2 Max',
    category: 'HIIT',
    difficulty: 'ADVANCED',
    sets: '5 rounds',
    reps: '15 per side',
    restSeconds: 60,
    instructions: [
      'Hike kettlebell between legs, drive hips powerfully.',
      'Punch hand through handle at top without letting bell crash on forearm.'
    ],
    keyFormTip: 'Power comes entirely from the hip snap, not the shoulder pull.',
    videoThumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    equipment: 'DUMBBELLS'
  },

  // MOBILITY / YOGA
  {
    id: 'ex_world_greatest_stretch',
    name: 'World’s Greatest Stretch with Thoracic Rotation',
    targetMuscles: 'Hip Flexors, Thoracic Spine, Hamstrings, Ankles',
    category: 'MOBILITY',
    difficulty: 'BEGINNER',
    sets: '2',
    reps: '6 per side',
    restSeconds: 30,
    instructions: [
      'Lunge forward with right foot, place hands on ground inside right foot.',
      'Drop right elbow toward instep, then rotate right arm up toward ceiling, following with gaze.'
    ],
    keyFormTip: 'Breathe out on rotation to unlock deep thoracic spine mobility.',
    videoThumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    equipment: 'NO_EQUIPMENT'
  },
  {
    id: 'ex_90_90_hip_flow',
    name: '90/90 Hip Internal & External Mobility Flow',
    targetMuscles: 'Hip Joint Capsule, Gluteus Medius, Piriformis',
    category: 'MOBILITY',
    difficulty: 'BEGINNER',
    sets: '3',
    reps: '8 rotations per side',
    restSeconds: 30,
    instructions: [
      'Sit with both legs at 90-degree angles on the floor.',
      'Maintain tall spine and hinge forward over front knee, then transition sides without hands if possible.'
    ],
    keyFormTip: 'Keep sit bones anchored and pivot smoothly on heels.',
    videoThumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    equipment: 'NO_EQUIPMENT'
  }
];

// Workout Split Program Generator
export function generateWorkoutPlan(
  goal: FitnessGoal,
  experience: ExperienceLevel,
  equipment: EquipmentType,
  daysPerWeek: number,
  durationMinutes: number
): WorkoutPlan {
  // Select matching exercises
  const filterByEquip = (cat: MuscleGroup) => {
    let pool = EXERCISE_DATABASE.filter(e => e.category === cat);
    if (equipment === 'NO_EQUIPMENT') {
      pool = pool.filter(e => e.equipment === 'NO_EQUIPMENT');
    } else if (equipment === 'DUMBBELLS') {
      pool = pool.filter(e => e.equipment === 'NO_EQUIPMENT' || e.equipment === 'DUMBBELLS');
    }
    if (pool.length === 0) {
      pool = EXERCISE_DATABASE.filter(e => e.category === cat);
    }
    return pool;
  };

  const chest = filterByEquip('CHEST');
  const back = filterByEquip('BACK');
  const shoulders = filterByEquip('SHOULDERS');
  const arms = filterByEquip('ARMS');
  const legs = filterByEquip('LEGS');
  const core = filterByEquip('CORE');
  const hiit = filterByEquip('HIIT');
  const mobility = filterByEquip('MOBILITY');

  let days = [];

  if (daysPerWeek <= 3) {
    // Full Body Split (3 Days)
    days = [
      {
        dayName: 'Day 01 — Full Body Power & Compound',
        focus: 'Chest, Back, Quads, Core',
        estimatedMinutes: durationMinutes,
        exercises: [
          { exercise: legs[0] || EXERCISE_DATABASE[12], customSets: '4', customReps: '6-8' },
          { exercise: chest[0] || EXERCISE_DATABASE[0], customSets: '4', customReps: '6-8' },
          { exercise: back[0] || EXERCISE_DATABASE[4], customSets: '4', customReps: '8' },
          { exercise: shoulders[0] || EXERCISE_DATABASE[7], customSets: '3', customReps: '10' },
          { exercise: core[0] || EXERCISE_DATABASE[15], customSets: '3', customReps: '12-15' }
        ]
      },
      {
        dayName: 'Day 02 — Posterior Chain & Hypertrophy',
        focus: 'Hamstrings, Upper Back, Shoulders, Arms',
        estimatedMinutes: durationMinutes,
        exercises: [
          { exercise: legs[1] || EXERCISE_DATABASE[13], customSets: '4', customReps: '8-10' },
          { exercise: back[1] || EXERCISE_DATABASE[5], customSets: '4', customReps: '10' },
          { exercise: chest[1] || EXERCISE_DATABASE[1], customSets: '3', customReps: '10-12' },
          { exercise: arms[0] || EXERCISE_DATABASE[10], customSets: '3', customReps: '12' },
          { exercise: mobility[0] || EXERCISE_DATABASE[19], customSets: '2', customReps: '8' }
        ]
      },
      {
        dayName: 'Day 03 — Athletic Output & Core Density',
        focus: 'Unilateral Legs, Upper Density, HIIT Finish',
        estimatedMinutes: durationMinutes,
        exercises: [
          { exercise: legs[2] || EXERCISE_DATABASE[14], customSets: '3', customReps: '10/leg' },
          { exercise: chest[2] || EXERCISE_DATABASE[2], customSets: '3', customReps: '10' },
          { exercise: back[2] || EXERCISE_DATABASE[6], customSets: '3', customReps: '8' },
          { exercise: shoulders[1] || EXERCISE_DATABASE[8], customSets: '3', customReps: '15' },
          { exercise: hiit[0] || EXERCISE_DATABASE[17], customSets: '5 rounds', customReps: '20s on / 40s off' }
        ]
      }
    ];
  } else if (daysPerWeek === 4) {
    // Upper / Lower Split (4 Days)
    days = [
      {
        dayName: 'Day 01 — Upper Body Strength',
        focus: 'Chest, Upper Back, Overhead Delts',
        estimatedMinutes: durationMinutes,
        exercises: [
          { exercise: chest[0] || EXERCISE_DATABASE[0] },
          { exercise: back[1] || EXERCISE_DATABASE[5] },
          { exercise: shoulders[0] || EXERCISE_DATABASE[7] },
          { exercise: arms[1] || EXERCISE_DATABASE[11] },
        ]
      },
      {
        dayName: 'Day 02 — Lower Body Strength & Core',
        focus: 'Quads, Posterior Chain, Trunk Stability',
        estimatedMinutes: durationMinutes,
        exercises: [
          { exercise: legs[0] || EXERCISE_DATABASE[12] },
          { exercise: legs[1] || EXERCISE_DATABASE[13] },
          { exercise: legs[2] || EXERCISE_DATABASE[14] },
          { exercise: core[0] || EXERCISE_DATABASE[15] }
        ]
      },
      {
        dayName: 'Day 03 — Upper Body Hypertrophy',
        focus: 'Incline Pecs, Lats, Lateral Delts, Arms',
        estimatedMinutes: durationMinutes,
        exercises: [
          { exercise: chest[1] || EXERCISE_DATABASE[1] },
          { exercise: back[2] || EXERCISE_DATABASE[6] },
          { exercise: shoulders[1] || EXERCISE_DATABASE[8] },
          { exercise: arms[0] || EXERCISE_DATABASE[10] }
        ]
      },
      {
        dayName: 'Day 04 — Lower Body Volume & Conditioning',
        focus: 'Unilateral Legs, Calves, HIIT Capacity',
        estimatedMinutes: durationMinutes,
        exercises: [
          { exercise: back[0] || EXERCISE_DATABASE[4] },
          { exercise: legs[2] || EXERCISE_DATABASE[14] },
          { exercise: core[1] || EXERCISE_DATABASE[16] },
          { exercise: hiit[0] || EXERCISE_DATABASE[17] }
        ]
      }
    ];
  } else {
    // 5-6 Days Push / Pull / Legs Split
    days = [
      {
        dayName: 'Day 01 — Push Focus (Chest, Front/Side Delts, Triceps)',
        focus: 'Horizontal Pressing, Incline Hypertrophy, Triceps',
        estimatedMinutes: durationMinutes,
        exercises: [
          { exercise: chest[0] || EXERCISE_DATABASE[0] },
          { exercise: chest[1] || EXERCISE_DATABASE[1] },
          { exercise: shoulders[1] || EXERCISE_DATABASE[8] },
          { exercise: arms[1] || EXERCISE_DATABASE[11] }
        ]
      },
      {
        dayName: 'Day 02 — Pull Focus (Back, Rear Delts, Biceps)',
        focus: 'Vertical Pull, Horizontal Row, Biceps',
        estimatedMinutes: durationMinutes,
        exercises: [
          { exercise: back[0] || EXERCISE_DATABASE[4] },
          { exercise: back[2] || EXERCISE_DATABASE[6] },
          { exercise: back[1] || EXERCISE_DATABASE[5] },
          { exercise: arms[0] || EXERCISE_DATABASE[10] }
        ]
      },
      {
        dayName: 'Day 03 — Legs & Trunk Anterior/Posterior',
        focus: 'Squat Patterns, Hamstring Curls, Deep Core',
        estimatedMinutes: durationMinutes,
        exercises: [
          { exercise: legs[0] || EXERCISE_DATABASE[12] },
          { exercise: legs[1] || EXERCISE_DATABASE[13] },
          { exercise: legs[2] || EXERCISE_DATABASE[14] },
          { exercise: core[0] || EXERCISE_DATABASE[15] }
        ]
      },
      {
        dayName: 'Day 04 — Push Hypertrophy & Overhead Mechanics',
        focus: 'Overhead Press, Dips, Lateral Delts',
        estimatedMinutes: durationMinutes,
        exercises: [
          { exercise: shoulders[0] || EXERCISE_DATABASE[7] },
          { exercise: chest[2] || EXERCISE_DATABASE[2] },
          { exercise: shoulders[2] || EXERCISE_DATABASE[9] },
          { exercise: arms[1] || EXERCISE_DATABASE[11] }
        ]
      },
      {
        dayName: 'Day 05 — Pull Hypertrophy & Athletic Back',
        focus: 'Chest-Supported Rows, Lat Pulldowns, Bicep Peak',
        estimatedMinutes: durationMinutes,
        exercises: [
          { exercise: back[1] || EXERCISE_DATABASE[5] },
          { exercise: back[2] || EXERCISE_DATABASE[6] },
          { exercise: arms[0] || EXERCISE_DATABASE[10] },
          { exercise: core[1] || EXERCISE_DATABASE[16] }
        ]
      }
    ];
  }

  const programTitles: Record<FitnessGoal, string> = {
    BUILD_MUSCLE: 'Hypertrophy Protocol // Advanced Muscle Engine',
    LOSE_WEIGHT: 'Metabolic Shred // High-Density Athletic Cut',
    STRENGTH: 'Power & Force Velocity // Pure Strength Protocol',
    MAINTAIN: 'Peak Athletic Maintenance // Precision Balance',
    GAIN_WEIGHT: 'Mass Accumulation // Heavy Volume Surplus',
    ENDURANCE: 'Aerobic Power & Structural Endurance'
  };

  return {
    id: `routine_${Date.now()}`,
    name: programTitles[goal] || 'Athletic Performance Split',
    goal,
    experience,
    equipment,
    daysPerWeek,
    durationMinutes,
    days
  };
}
