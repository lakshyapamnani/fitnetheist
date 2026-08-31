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
    price: 'FREE / $0',
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
    title: '21 DAY IGNITE',
    tagline: 'Neurological habit transformation. Turn motivation into permanent mechanical discipline.',
    durationDays: 21,
    difficulty: 'INTERMEDIATE',
    goal: 'Build Unbreakable Routine & Fat Loss',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    description: '21 days of continuous deliberate execution. Lock in your macronutrient splits, master progressive overload mechanics across a 4-day upper/lower split, and participate in daily tribe streak rankings.',
    whatIsIncluded: [
      'Complete 21-Day Progressive Overload Training Plan',
      'Personalized 7-Day Rotating Diet Matrix with Smart Swaps',
      'Daily Streak Tracking & Leaderboard Verification',
      'Weekly Metric Audits (Waist, Weight, Strength PRs)',
      'Exclusive Tribe Challenge Channel'
    ],
    workoutOverview: '4 training days per week (Upper / Lower split) with 2 optional aerobic conditioning and mobility sessions.',
    nutritionOverview: 'Calibrated calorie deficit or lean surplus with exact macronutrient accountability. Vegetarian, Non-Vegetarian, and Vegan paths fully supported.',
    accountabilityRules: [
      'No skipped workouts without scheduled recovery day swap.',
      'Calorie adherence within +/- 75 kcal daily window.',
      'Submit weekly progress metrics on Day 7, 14, and 21.'
    ],
    price: '$29 / ONE-TIME',
    badgeName: '21-DAY IGNITE DISCIPLINE',
    enrolledCount: 3840,
    testimonials: [
      {
        quote: 'Down 4.2 kg and dropped 2 inches off my waist. The lack of guesswork is what makes Fitnetheist stand above everything else.',
        author: 'Vikram S., Bangalore',
        stat: '-4.2 kg & -2 inches waist'
      },
      {
        quote: 'The streak system kept me honest when work got brutal. First time I actually stuck to a 3-week routine.',
        author: 'Marcus K., Chicago',
        stat: '21/21 Days Completed'
      }
    ],
    faqs: [
      {
        q: 'What happens if I miss a day?',
        a: 'You have a 24-hour buffer to log your make-up session, or your streak is reset on the community board.'
      },
      {
        q: 'Can I swap meals in my diet during the challenge?',
        a: 'Yes, using the Fitnetheist Smart Meal Swap engine you can trade any meal for an equivalent macro alternative instantly.'
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
    price: '$59 / ONE-TIME',
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
    tagline: 'Elite athletic conditioning and extreme conditioning. The ultimate test of will.',
    durationDays: 90,
    difficulty: 'ELITE ATHLETE',
    goal: 'Peak Human Performance & Chiseled Physique',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=80',
    description: 'The premier athletic performance curriculum. Three distinct 30-day training phases: Hypertrophy Foundation, Maximum Force Output, and High-Definition Conditioning.',
    whatIsIncluded: [
      '3-Phase 90-Day Athletic Curriculum (Strength, Power, Conditioning)',
      '1-on-1 Dedicated Coach Feedback Channels',
      'Custom Grocery Auto-Planner & Weekly Meal Prep Schedulers',
      'Private Masterclass Recordings on Recovery, Sleep, and Biomechanics',
      'VIP Leaderboard & Lifetime Athlete Status'
    ],
    workoutOverview: '6-day high-intensity athletic conditioning split with dedicated deload protocols and advanced central nervous system management.',
    nutritionOverview: 'Full periodized nutrition protocol including refeed days, intra-workout carbohydrate timing, and electrolyte balancing.',
    accountabilityRules: [
      'Mandatory daily logging of sleep duration, morning resting heart rate, and training RPE.',
      'Bi-weekly coach milestone checkpoints.'
    ],
    price: '$89 / ONE-TIME',
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
    id: 'tr_1',
    name: 'Kabir Varma',
    age: 29,
    duration: '60 Days',
    category: 'WEIGHT_LOSS',
    statChange: '84.5 KG → 73.8 KG (-10.7 KG)',
    quote: 'Fitnetheist removed all ambiguity. I simply hit my calculated 2,150 kcal target, ate my Indian vegetarian protein plan, and trained 4 days a week with zero skipped sets.',
    beforePhoto: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    afterPhoto: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    keyStrategy: '500 kcal scientific deficit + 160g protein via Paneer, Soya, and Whey.'
  },
  {
    id: 'tr_2',
    name: 'Ananya Sharma',
    age: 26,
    duration: '90 Days',
    category: 'RECOMP',
    statChange: '62 KG (28% BF) → 58 KG (19% BF)',
    quote: 'I used to starve myself on 1,100 calories and do endless cardio. Fitnetheist put me on 1,800 calories with heavy barbell squats. My waist shrank 3.5 inches while my glutes and back got sculpted.',
    beforePhoto: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    afterPhoto: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    keyStrategy: 'High-protein vegan meal plan + 4-day Upper/Lower progressive overload.'
  },
  {
    id: 'tr_3',
    name: 'Sameer Khan',
    age: 32,
    duration: '60 Days',
    category: 'MUSCLE_GAIN',
    statChange: '68 KG → 75.5 KG (+7.5 KG Lean Mass)',
    quote: 'I was a hardgainer for 5 years. The Bulking Calorie target gave me 3,100 kcal with structured 5-meal Indian cuisine breakdown. Gained solid shoulder width and thickness without gut fat.',
    beforePhoto: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    afterPhoto: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    keyStrategy: '300 kcal lean surplus + Push/Pull/Legs 5-day split.'
  },
  {
    id: 'tr_4',
    name: 'Pooja Iyer',
    age: 34,
    duration: '21 Days',
    category: 'WEIGHT_LOSS',
    statChange: '71 KG → 66.8 KG (-4.2 KG)',
    quote: 'The 21-day ignite built a habit loop that I could not break. Having the grocery list pre-calculated saved me 5 hours every Sunday.',
    beforePhoto: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    afterPhoto: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
    keyStrategy: 'Quick cooking style + 4 meals/day + 10k daily step baseline.'
  }
];
