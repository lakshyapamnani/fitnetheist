import { Challenge, TransformationStory } from '../types';

export const CHALLENGES_DATA: Challenge[] = [
  {
    id: 'c_7_day_reset',
    title: '7 DAY RESET',
    tagline: 'System reboot for beginners. Eliminate friction, establish baseline discipline.',
    durationDays: 7,
    difficulty: 'BEGINNER',
    goal: 'Kickstart Habits & Clean Nutrition',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    description: 'A focused, zero-excuse 7-day protocol designed to strip away junk habits, establish daily hydration standards, lock in calculated maintenance or deficit nutrition, and complete 4 foundational mobility and strength sessions.',
    whatIsIncluded: [
      '7-Day Structured Nutrition Template & Hydration Blueprint',
      'Daily 30-Minute Bodyweight & Dumbbell Conditioning Workouts',
      'Morning & Evening Accountability Check-in Prompts',
      'Direct Community Tribe Chat Access',
      'Official FITNETHEIST 7-Day Finisher Badge'
    ],
    workoutOverview: '4 training days alternating between full-body strength fundamentals and active recovery mobility flows. 30 minutes max per session.',
    nutritionOverview: 'Strict elimination of liquid sugars and ultra-processed seed oils. Clean protein prioritization calculated to 1.8g per kg bodyweight.',
    accountabilityRules: [
      'Log daily water intake (Minimum 2.8L).',
      'Complete designated daily workout or active recovery steps.',
      'Check in on the Tribe board before 10:00 PM every evening.'
    ],
    price: 'FREE / ₹0',
    badgeName: '7-DAY RESET SURVIVOR',
    enrolledCount: 1420,
    testimonials: [
      {
        quote: 'The simplest, most effective week of my life. Lost 1.8 kg of water retention and stopped craving junk food by day 4.',
        author: 'Arjun M., Delhi',
        stat: '-1.8 kg in 7 Days'
      },
      {
        quote: 'Gave me the exact structure I lacked for 6 months. Now moving onto the 21 Day Ignite.',
        author: 'Elena R., London',
        stat: '100% Habit Adherence'
      }
    ],
    faqs: [
      {
        q: 'Do I need a commercial gym membership for this challenge?',
        a: 'No. The 7-Day Reset is fully executable with bodyweight and a single pair of dumbbells at home.'
      },
      {
        q: 'Is the nutrition plan customized to my calories?',
        a: 'Yes, your 7-day meal plan automatically synchronizes with your personalized Fitnetheist calorie calculator target.'
      }
    ]
  },
  {
    id: 'c_21_day_ignite',
    title: '21 DAYS DISCIPLINE CHALLENGE',
    tagline: 'Standalone Online Program. 21 days of progressive movement, video curriculum, and habit architecture.',
    durationDays: 21,
    difficulty: 'ALL LEVELS',
    goal: 'Build Unbreakable Routine, Movement & Habit Discipline',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    description: 'A 21-day standalone online discipline curriculum. Structured daily progressive movement routines, video module slots, hydration goals, and habit accountability. 100% online program with no virtual or 1:1 sessions.',
    whatIsIncluded: [
      '100% Online Program (No virtual or 1:1 sessions)',
      '21-Day Structured Daily Movement & Mobility Architecture',
      'Dedicated Daily Video Module Hub (Ready for Coach Neetu video lessons)',
      'Daily Habit Checklist & Hydration Compliance (3L+ water)',
      'Digital Completion Certificate & Streak Verification'
    ],
    workoutOverview: '21 sequential days of movement: Phase 1 Foundations, Phase 2 Intensity Ramp, and Phase 3 Mastery & Peak Conditioning.',
    nutritionOverview: 'Clear caloric discipline, whole food prioritization, 1:1 bioavailable protein swaps, and strict hydration targets.',
    accountabilityRules: [
      'Log daily task completion before midnight.',
      'Maintain continuous 21-day streak with zero pauses.',
      'Track hydration compliance and step counts daily.'
    ],
    price: '₹799 / ONE-TIME',
    badgeName: '21-DAY DISCIPLINE MASTER',
    enrolledCount: 4210,
    testimonials: [
      {
        quote: 'Down 3.8 kg and my morning discipline is transformed. The day-by-day video module format is crystal clear.',
        author: 'Vikram S., Bangalore',
        stat: '-3.8 kg & 21/21 Streak'
      },
      {
        quote: 'At ₹799, this is hands-down the highest value fitness program in India. Kept me completely accountable.',
        author: 'Priya K., Mumbai',
        stat: '21/21 Days Completed'
      }
    ],
    faqs: [
      {
        q: 'Is this an online program or are there live sessions?',
        a: 'This is a 100% online program. No live virtual or 1-on-1 sessions are conducted. You follow the guided curriculum, video modules, and daily checklists.'
      },
      {
        q: 'How do the video modules work?',
        a: 'The challenge includes a structured daily video module slot for each day where Coach Neetu lessons and movement breakdowns are streamed directly.'
      }
    ]
  },
  {
    id: 'c_60_day_transform',
    title: '60 DAY TRANSFORM',
    tagline: 'Serious aesthetic & athletic body recomposition. Dramatic measurable change.',
    durationDays: 60,
    difficulty: 'ADVANCED',
    goal: 'Aesthetic Recomposition & Strength',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80',
    description: 'Designed for individuals ready to commit to undeniable physiological change. Combines 5-day Push/Pull/Legs periodization with precision macronutrient cycling and bi-weekly volume adjustments.',
    whatIsIncluded: [
      'Phase 1 & Phase 2 Periodized Hypertrophy Program',
      'Advanced Macro & Nutrient Timing Guidelines',
      'Bi-Weekly Coach Form Review & Assessment Video Access',
      'Body Composition Tracking Graph Suite',
      'Official Certificate of Completion & Wall of Fame Entry'
    ],
    workoutOverview: '5-Day Push/Pull/Legs periodization moving from mechanical tension focus (Weeks 1-4) to metabolic fatigue and density (Weeks 5-8).',
    nutritionOverview: 'Adaptive caloric targets adjusted every 14 days based on rate of fat loss and strength benchmarks.',
    accountabilityRules: [
      'Submit bi-weekly front/side/back check-in photos.',
      'Log weights and reps for every working set.',
      'Maintain 85%+ weekly nutritional compliance score.'
    ],
    price: '₹4,999 / ONE-TIME',
    badgeName: '60-DAY TRANSFORM ELITE',
    enrolledCount: 2190,
    testimonials: [
      {
        quote: 'Went from 86 kg at 24% body fat down to 77 kg at 14% body fat. My bench press actually went UP during the cut.',
        author: 'Devansh T., Mumbai',
        stat: '-9 kg Fat & +15 kg Bench PR'
      }
    ],
    faqs: [
      {
        q: 'Is this suitable for beginners?',
        a: 'We recommend completing the 21 Day Ignite first if you have less than 6 months of continuous barbell training experience.'
      }
    ]
  },
  {
    id: 'c_90_day_beast',
    title: '90 DAY BEAST MODE',
    tagline: 'Elite physical conditioning and extreme discipline. The ultimate test of will.',
    durationDays: 90,
    difficulty: 'ELITE TIER',
    goal: 'Peak Human Performance & Chiseled Physique',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=80',
    description: 'The premier performance curriculum. Three distinct 30-day training phases: Hypertrophy Foundation, Maximum Force Output, and High-Definition Conditioning.',
    whatIsIncluded: [
      '3-Phase 90-Day Training Curriculum (Strength, Power, Conditioning)',
      '1-on-1 Dedicated Coach Feedback Channels',
      'Custom Grocery Auto-Planner & Weekly Meal Prep Schedulers',
      'Private Masterclass Recordings on Recovery, Sleep, and Biomechanics',
      'VIP Leaderboard & Lifetime Member Status'
    ],
    workoutOverview: '6-day high-intensity conditioning split with dedicated deload protocols and advanced central nervous system management.',
    nutritionOverview: 'Full periodized nutrition protocol including refeed days, intra-workout carbohydrate timing, and electrolyte balancing.',
    accountabilityRules: [
      'Mandatory daily logging of sleep duration, morning resting heart rate, and training RPE.',
      'Bi-weekly coach milestone checkpoints.'
    ],
    price: '₹7,499 / ONE-TIME',
    badgeName: '90-DAY BEAST TITAN',
    enrolledCount: 1630,
    testimonials: [
      {
        quote: 'Changed the way I look at discipline forever. I run faster, lift heavier, and haven’t looked this lean since college athletics.',
        author: 'Rohan P., Singapore',
        stat: '11.2% Body Fat & 450lb Deadlift'
      }
    ],
    faqs: [
      {
        q: 'What equipment is required?',
        a: 'Access to a full gym with barbells, cables, squat rack, and dumbbells is required for this program.'
      }
    ]
  }
];

export const TRANSFORMATIONS_DATA: TransformationStory[] = [
  {
    id: 'testi_monika',
    name: 'Monika Singh',
    title: '8 KG Down • 21 Inches Lost • Diastasis Recti Healed',
    age: 31,
    duration: '2 Months',
    category: 'POSTPARTUM',
    statChange: '-8 KG & 21 Inches Lost',
    quote: 'Motherhood changed my body, but Coach Neetu’s structured approach healed my diastasis recti and helped me lose 8 kg in just 2 months.',
    description: '8 KG DOWN. 21 INCHES LOST. DIASTASIS RECTI HEALED. ALL IN 2 MONTHS. 🔥 Motherhood changed her body, but with disciplined nutrition, core rehabilitation protocols, and customized coaching, she dropped 8 kg, lost 21 inches, and healed her diastasis recti.',
    videoUrl: '/testimonials/testimonial-1.mp4',
    posterUrl: '/testimonials/testimonial-1.jpg',
    hrefLink: 'https://www.instagram.com/reel/DgADVC-sd3A/?cnvx=MWkza2xqMGgxemYxOA==',
    keyStrategy: 'Diastasis recti safe core rehabilitation + customized calorie deficit & high protein',
    featured: true,
    createdAt: '2026-11-23'
  },
  {
    id: 'testi_vaishali',
    name: 'Vaishali',
    title: 'Incredible Body Recomposition & Fat Loss Journey',
    age: 29,
    duration: '3 Months',
    category: 'WEIGHT_LOSS',
    statChange: 'Visible Fat Loss & Core Toning',
    quote: 'Coach Neetu gave me the exact clarity, structure, and continuous motivation. I gained immense strength, energy, and a body I am truly proud of.',
    description: 'Consistent progressive training and tailored nutrition matrices delivered undeniable physiological change. Built strength, toned muscles, and formed lasting healthy lifestyle habits without extreme starvation.',
    hrefLink: 'https://www.instagram.com/reel/DfreCpkM5Uk/?hvrq=MWJ4Mm9sa2tyemZ1NA==',
    keyStrategy: 'Calorie-controlled nutrition + progressive overload resistance training',
    featured: true,
    createdAt: '2026-11-23'
  },
  {
    id: 'testi_neha',
    name: 'Neha',
    title: 'She Lost Weight — But That’s Not The Real Transformation',
    age: 28,
    duration: '3 Months',
    category: 'RECOMP',
    statChange: 'Total Energy & Body Recomp',
    quote: 'She lost weight, but that’s not the real transformation. The real transformation is she is feeling like herself again — energized, confident, and unstoppable.',
    description: 'She lost weight. But that’s not the real transformation. The real transformation: She’s feeling energetic, confident, and like herself again. Building sustainable lifestyle habits without starvation or extreme fatigue.',
    videoUrl: '/testimonials/testimonial-2.mp4',
    posterUrl: '/testimonials/testimonial-2.jpg',
    hrefLink: 'https://www.instagram.com/reel/DcGcRa0NgtR/?fqnt=MWd0ZWt3Y2ZrdjB2MA==',
    keyStrategy: 'Sustainable habit architecture + progressive resistance training + hormonal balance nutrition',
    featured: true,
    createdAt: '2026-11-23'
  }
];
