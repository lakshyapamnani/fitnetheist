import { 
  Lead, 
  Customer, 
  Order, 
  Invoice,
  Subscription, 
  CMSPage, 
  BlogPost, 
  FAQItem, 
  MediaItem, 
  NavigationItem, 
  SEOConfig, 
  AuditLog, 
  AdminNotification,
  LeadScoringRules
} from '../types/admin';

export const INITIAL_LEAD_SCORING_RULES: LeadScoringRules = {
  calculatorCompleted: 10,
  dietGenerated: 15,
  workoutGenerated: 15,
  challengeViewed: 20,
  pricingViewed: 30,
  checkoutStarted: 50,
  purchaseCompleted: 100,
  contactFormSubmitted: 25
};

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead_101',
    name: 'Rohan Sharma',
    phone: '+91 98201 44521',
    email: 'rohan.sharma@example.com',
    source: 'CALORIE_CALCULATOR',
    goal: 'LOSE_WEIGHT',
    dietType: 'VEGETARIAN',
    preferredCuisine: 'INDIAN',
    status: 'QUALIFIED',
    assignedTo: 'Coach Neetu (Head Coach)',
    lastContact: '2026-08-26T14:30:00Z',
    createdAt: '2026-08-25T09:15:00Z',
    estimatedValue: 7500,
    score: 85,
    scoreClassification: 'HOT',
    age: 29,
    sex: 'male',
    heightCm: 175,
    weightKg: 88,
    activityLevel: 'LIGHT',
    calculatedCalories: 1850,
    challengeInterest: '21 Day Ignite Challenge',
    tags: ['HOT', 'HIGH_VALUE', '21_DAY', 'WEIGHT_LOSS', 'VEGETARIAN'],
    nextFollowUpDate: '2026-08-28',
    notes: [
      {
        id: 'n_1',
        createdAt: '2026-08-25T10:00:00Z',
        author: 'Coach Neetu',
        content: 'Calculated 1850 kcal deficit. Looking to drop 10kg before wedding in November. Prefers Indian vegetarian meal swaps.'
      },
      {
        id: 'n_2',
        createdAt: '2026-08-26T14:35:00Z',
        author: 'Coach Neetu',
        content: 'Had 15-min WhatsApp discovery call. Very keen on the 21-day cohort starting next Monday. Sent payment link.'
      }
    ],
    activities: [
      {
        id: 'act_1',
        timestamp: '2026-08-25T09:15:00Z',
        type: 'CREATED',
        description: 'Lead auto-captured via Mifflin-St Jeor Calorie Calculator',
        performedBy: 'SYSTEM_BOT'
      },
      {
        id: 'act_2',
        timestamp: '2026-08-25T09:30:00Z',
        type: 'STATUS_CHANGE',
        description: 'Status changed from NEW to QUALIFIED (+25 Lead Score)',
        performedBy: 'Coach Neetu'
      },
      {
        id: 'act_3',
        timestamp: '2026-08-26T14:30:00Z',
        type: 'CALL',
        description: 'WhatsApp Audio Call completed (Duration: 14m 22s)',
        performedBy: 'Coach Neetu'
      }
    ],
    followUpHistory: [
      {
        date: '2026-08-26',
        type: 'WHATSAPP',
        notes: 'Sent PDF breakdown of 21-Day Ignite protocol & vegetarian macro sheet',
        loggedBy: 'Coach Neetu'
      }
    ]
  },
  {
    id: 'lead_102',
    name: 'Priya Sundaram',
    phone: '+91 97112 88402',
    email: 'priya.sundaram@gmail.com',
    source: 'DIET_GENERATOR',
    goal: 'BUILD_MUSCLE',
    dietType: 'NON-VEGETARIAN',
    preferredCuisine: 'INDIAN_INTERNATIONAL',
    status: 'INTERESTED',
    assignedTo: 'Coach Neetu (Head Coach)',
    lastContact: '2026-08-27T08:00:00Z',
    createdAt: '2026-08-26T18:20:00Z',
    estimatedValue: 11000,
    score: 75,
    scoreClassification: 'HOT',
    age: 26,
    sex: 'female',
    heightCm: 164,
    weightKg: 58,
    activityLevel: 'MODERATE',
    calculatedCalories: 2150,
    challengeInterest: '60 Day Transform',
    tags: ['HOT', '60_DAY', 'MUSCLE_GAIN', 'NON_VEGETARIAN'],
    nextFollowUpDate: '2026-08-29',
    notes: [
      {
        id: 'n_3',
        createdAt: '2026-08-27T08:05:00Z',
        author: 'Coach Neetu',
        content: 'Generated 4-meal 2150 kcal high protein plan. Wants to improve upper body hypertrophy and deadlift strength.'
      }
    ],
    activities: [
      {
        id: 'act_4',
        timestamp: '2026-08-26T18:20:00Z',
        type: 'CREATED',
        description: 'Generated 7-Day High Protein Non-Veg Diet Plan',
        performedBy: 'SYSTEM_BOT'
      }
    ],
    followUpHistory: []
  },
  {
    id: 'lead_103',
    name: 'Marcus Vance',
    phone: '+1 415 555 2671',
    email: 'marcus.vance@techcorp.io',
    source: 'WORKOUT_PLANNER',
    goal: 'BUILD_MUSCLE',
    dietType: 'NON-VEGETARIAN',
    preferredCuisine: 'INTERNATIONAL',
    status: 'CONVERTED',
    assignedTo: 'Coach Neetu (Head Coach)',
    lastContact: '2026-08-24T16:00:00Z',
    createdAt: '2026-08-20T11:00:00Z',
    estimatedValue: 21000,
    score: 110,
    scoreClassification: 'HOT',
    age: 32,
    sex: 'male',
    heightCm: 183,
    weightKg: 82,
    activityLevel: 'VERY_ACTIVE',
    calculatedCalories: 2750,
    challengeInterest: '90 Day Nutrition + Workout Coaching',
    tags: ['HIGH_VALUE', '90_DAY', 'MUSCLE_GAIN'],
    notes: [
      {
        id: 'n_4',
        createdAt: '2026-08-24T16:30:00Z',
        author: 'Coach Neetu',
        content: 'Converted to 90 Day Nutrition + Workout Coaching (₹21,000). Onboarded to athlete telemetry dashboard.'
      }
    ],
    activities: [
      {
        id: 'act_5',
        timestamp: '2026-08-24T16:00:00Z',
        type: 'CONVERTED',
        description: 'Completed purchase for ₹21,000 (Order #ORD-9842)',
        performedBy: 'RAZORPAY_GATEWAY'
      }
    ],
    followUpHistory: []
  },
  {
    id: 'lead_104',
    name: 'Sameer Kulkarni',
    phone: '+91 99881 33219',
    email: 'sameer.kulkarni@yahoo.com',
    source: 'CHALLENGE',
    goal: 'LOSE_WEIGHT',
    dietType: 'VEGAN',
    preferredCuisine: 'INDIAN',
    status: 'FOLLOW_UP',
    assignedTo: 'Coach Neetu (Head Coach)',
    lastContact: '2026-08-26T11:20:00Z',
    createdAt: '2026-08-26T10:00:00Z',
    estimatedValue: 4000,
    score: 60,
    scoreClassification: 'WARM',
    age: 35,
    sex: 'male',
    heightCm: 172,
    weightKg: 91,
    activityLevel: 'SEDENTARY',
    calculatedCalories: 1700,
    challengeInterest: 'Nutrition Only (Monthly)',
    tags: ['WARM', '21_DAY', 'WEIGHT_LOSS', 'VEGAN'],
    nextFollowUpDate: '2026-08-28',
    notes: [
      {
        id: 'n_5',
        createdAt: '2026-08-26T11:25:00Z',
        author: 'Coach Neetu',
        content: 'Strict vegan. Requested confirmation that all meal substitutions have 100% plant-based protein parity.'
      }
    ],
    activities: [
      {
        id: 'act_6',
        timestamp: '2026-08-26T10:00:00Z',
        type: 'CREATED',
        description: 'Viewed 7 Day Reset Details and started enrollment form',
        performedBy: 'SYSTEM_BOT'
      }
    ],
    followUpHistory: [
      {
        date: '2026-08-26',
        type: 'EMAIL',
        notes: 'Emailed vegan protein substitution guide (Tofu, Edamame, Soya, Pea isolate)',
        loggedBy: 'Coach Neetu'
      }
    ]
  },
  {
    id: 'lead_105',
    name: 'Devika Nair',
    phone: '+91 94470 12093',
    email: 'devika.nair@outlook.com',
    source: 'CONTACT_FORM',
    goal: 'STRENGTH',
    dietType: 'VEGETARIAN',
    preferredCuisine: 'INDIAN',
    status: 'NEW',
    assignedTo: 'Unassigned',
    createdAt: '2026-08-27T02:15:00Z',
    estimatedValue: 7500,
    score: 35,
    scoreClassification: 'WARM',
    tags: ['WARM', 'VEGETARIAN'],
    notes: [],
    activities: [
      {
        id: 'act_7',
        timestamp: '2026-08-27T02:15:00Z',
        type: 'CREATED',
        description: 'Submitted Contact Us form from Homepage: "Looking for 1-on-1 coaching options for powerlifting"',
        performedBy: 'SYSTEM_BOT'
      }
    ],
    followUpHistory: []
  },
  {
    id: 'lead_106',
    name: 'Tanvi Agarwal',
    phone: '+91 98100 55432',
    email: 'tanvi.agarwal@gmail.com',
    source: 'INSTAGRAM',
    goal: 'LOSE_WEIGHT',
    dietType: 'VEGETARIAN',
    preferredCuisine: 'INDIAN',
    status: 'CONTACTED',
    assignedTo: 'Coach Neetu (Head Coach)',
    lastContact: '2026-08-26T19:00:00Z',
    createdAt: '2026-08-26T15:40:00Z',
    estimatedValue: 7500,
    score: 45,
    scoreClassification: 'WARM',
    tags: ['WARM', 'WEIGHT_LOSS', 'VEGETARIAN'],
    notes: [
      {
        id: 'n_6',
        createdAt: '2026-08-26T19:05:00Z',
        author: 'Coach Neetu',
        content: 'DM inquiry from @tanvifit. Wants to join 1-on-1 coaching. Shared calorie calculator link.'
      }
    ],
    activities: [
      {
        id: 'act_8',
        timestamp: '2026-08-26T15:40:00Z',
        type: 'CREATED',
        description: 'Captured via Instagram Direct Message Desk',
        performedBy: 'Coach Neetu'
      }
    ],
    followUpHistory: []
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust_01',
    name: 'Marcus Vance',
    email: 'marcus.vance@techcorp.io',
    phone: '+1 650 492 8812',
    avatarUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=200&q=80',
    joinedDate: '2026-05-14',
    totalSpent: 21000,
    status: 'ACTIVE',
    programTier: '90-Day VIP 1-on-1 Transformation',
    assignedCoach: 'Coach Vikram (Strength Specialist)',
    startDate: '2026-05-15',
    endDate: '2026-08-15',
    age: 29,
    gender: 'MALE',
    city: 'San Francisco, CA',
    emergencyContact: '+1 650 332 9011 (Spouse)',
    heightCm: 182,
    startingWeightKg: 94.5,
    currentWeightKg: 85.2,
    targetWeightKg: 82.0,
    targetDate: '2026-09-30',
    injuriesOrMedicalConditions: 'Mild right shoulder impingement during heavy overhead presses; subbed with landmine press.',
    dietGoal: 'BUILD_MUSCLE',
    dietType: 'NON_VEGETARIAN',
    dailyCalories: 2650,
    proteinGrams: 195,
    carbsGrams: 280,
    fatsGrams: 65,
    waterLitres: 4.0,
    mealsPerDay: 4,
    allergiesOrRestrictions: 'Lactose intolerant (use plant/isolate protein only)',
    cheatMealProtocol: '1 refeed meal every Saturday (High Carb, Low Fat)',
    workoutSplit: '4-Day Upper / Lower Split',
    trainingDaysPerWeek: 4,
    experienceLevel: 'ADVANCED',
    cardioProtocol: '10,000 steps daily + 15 min incline walk post-workout',
    strengthBenchmarks: {
      benchPressKg: 110,
      squatKg: 145,
      deadliftKg: 180,
      overheadPressKg: 65
    },
    activeChallengeId: 'c_90_day_beast',
    activeChallengeName: '90 Day Nutrition + Workout',
    activeSubscription: {
      plan: '90-Day Full Coaching',
      renewalDate: '2026-09-14',
      status: 'ACTIVE'
    },
    lastActivity: '12 minutes ago',
    streakDays: 48,
    orderIds: ['ORD-9842'],
    checkIns: [
      {
        id: 'chk_1',
        date: '2026-09-12',
        weightKg: 85.2,
        waistCm: 81.5,
        bodyFatPercent: 12.8,
        adherenceScore: 10,
        clientNotes: 'Felt very energized this week. Incline bench hit 85kg for 8 reps cleanly.',
        coachFeedback: 'Outstanding progress Marcus. Shoulders looking much fuller, keep water intake at 4L.',
        photosUploaded: true
      },
      {
        id: 'chk_2',
        date: '2026-09-05',
        weightKg: 86.1,
        waistCm: 82.2,
        bodyFatPercent: 13.5,
        adherenceScore: 9,
        clientNotes: 'Had one business dinner on Thursday, kept alcohol to zero and picked grilled salmon.',
        coachFeedback: 'Great discipline navigating that business dinner.',
        photosUploaded: true
      },
      {
        id: 'chk_3',
        date: '2026-08-28',
        weightKg: 87.0,
        waistCm: 83.4,
        bodyFatPercent: 14.2,
        adherenceScore: 9,
        clientNotes: 'First week on the 2,650 kcal adjustment. Recovery is noticeably faster.',
        coachFeedback: 'Calorie increase is doing its job. Keep progressive overload consistent.',
        photosUploaded: true
      }
    ],
    coachNotes: [
      {
        id: 'cn_1',
        createdAt: '2026-09-10T14:30:00Z',
        author: 'Coach Vikram',
        type: 'MACRO_ADJUSTMENT',
        content: 'Bumped carbs by +25g on training days to maximize bench/squat peak strength.'
      },
      {
        id: 'cn_2',
        createdAt: '2026-08-15T10:00:00Z',
        author: 'Coach Vikram',
        type: 'MILESTONE',
        content: 'Hit sub-13% body fat milestone! Athlete is preparing for lean hypertrophy phase.'
      }
    ]
  },
  {
    id: 'cust_02',
    name: 'Karan Malhotra',
    email: 'karan.m@gmail.com',
    phone: '+91 98112 34509',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    joinedDate: '2026-06-01',
    totalSpent: 11000,
    status: 'ACTIVE',
    programTier: '90-Day Nutrition Protocol',
    assignedCoach: 'Coach Neetu (Head Coach)',
    startDate: '2026-06-01',
    endDate: '2026-08-31',
    age: 34,
    gender: 'MALE',
    city: 'New Delhi, India',
    emergencyContact: '+91 98112 99001 (Brother)',
    heightCm: 176,
    startingWeightKg: 88.0,
    currentWeightKg: 79.4,
    targetWeightKg: 74.0,
    targetDate: '2026-10-15',
    injuriesOrMedicalConditions: 'None. Slight lower back stiffness after prolonged desk work.',
    dietGoal: 'LOSE_WEIGHT',
    dietType: 'VEGETARIAN',
    dailyCalories: 1850,
    proteinGrams: 145,
    carbsGrams: 190,
    fatsGrams: 45,
    waterLitres: 3.5,
    mealsPerDay: 4,
    allergiesOrRestrictions: 'Pure Vegetarian. Protein sources: Paneer, Whey, Greek Yogurt, Tofu, Soya.',
    cheatMealProtocol: 'Single clean cheat meal on Sunday lunch (max 700 kcal).',
    workoutSplit: 'Push / Pull / Legs',
    trainingDaysPerWeek: 5,
    experienceLevel: 'INTERMEDIATE',
    cardioProtocol: '8,500 daily steps + 10 min stairmaster warmup',
    strengthBenchmarks: {
      benchPressKg: 75,
      squatKg: 95,
      deadliftKg: 120,
      overheadPressKg: 45
    },
    activeChallengeId: 'c_60_day_transform',
    activeChallengeName: '90 Day Nutrition Only',
    lastActivity: '2 hours ago',
    streakDays: 45,
    orderIds: ['ORD-9843'],
    checkIns: [
      {
        id: 'chk_4',
        date: '2026-09-11',
        weightKg: 79.4,
        waistCm: 84.0,
        bodyFatPercent: 18.2,
        adherenceScore: 9,
        clientNotes: 'Dropped below 80kg! Huge psychological milestone for me.',
        coachFeedback: 'Phenomenal work Karan! Breaking the 80kg plateau is huge. Maintaining calories as is.',
        photosUploaded: true
      },
      {
        id: 'chk_5',
        date: '2026-09-04',
        weightKg: 80.3,
        waistCm: 85.0,
        bodyFatPercent: 19.1,
        adherenceScore: 8,
        clientNotes: 'Slight craving for sweets mid-week, solved with whey casein pudding.',
        coachFeedback: 'Casein pudding is the perfect low-cal hack. Keep it up.',
        photosUploaded: true
      }
    ],
    coachNotes: [
      {
        id: 'cn_3',
        createdAt: '2026-09-11T16:00:00Z',
        author: 'Coach Neetu',
        type: 'MILESTONE',
        content: 'Broken 80kg barrier. Total weight loss to date: -8.6 kg in 14 weeks.'
      }
    ]
  },
  {
    id: 'cust_03',
    name: 'Sneha Patel',
    email: 'sneha.patel@corporate.in',
    phone: '+91 97230 45671',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    joinedDate: '2026-07-10',
    totalSpent: 7500,
    status: 'ACTIVE',
    programTier: 'Monthly Nutrition + Workout',
    assignedCoach: 'Coach Neetu (Head Coach)',
    startDate: '2026-07-10',
    endDate: '2026-10-10',
    age: 27,
    gender: 'FEMALE',
    city: 'Mumbai, India',
    heightCm: 164,
    startingWeightKg: 65.0,
    currentWeightKg: 60.8,
    targetWeightKg: 58.0,
    targetDate: '2026-10-31',
    injuriesOrMedicalConditions: 'History of runner knee on left patella; squats limited to parallel.',
    dietGoal: 'LOSE_WEIGHT',
    dietType: 'VEGETARIAN',
    dailyCalories: 1550,
    proteinGrams: 115,
    carbsGrams: 160,
    fatsGrams: 40,
    waterLitres: 3.0,
    mealsPerDay: 3,
    allergiesOrRestrictions: 'No nuts (tree nut allergy)',
    workoutSplit: 'Full Body 3x/Week',
    trainingDaysPerWeek: 3,
    experienceLevel: 'BEGINNER',
    cardioProtocol: '7,000 steps daily',
    strengthBenchmarks: {
      benchPressKg: 35,
      squatKg: 50,
      deadliftKg: 65,
      overheadPressKg: 20
    },
    activeChallengeId: 'c_21_day_ignite',
    activeChallengeName: 'Monthly Nutrition + Workout',
    lastActivity: 'Yesterday',
    streakDays: 19,
    orderIds: ['ORD-9844'],
    checkIns: [
      {
        id: 'chk_6',
        date: '2026-09-13',
        weightKg: 60.8,
        waistCm: 71.0,
        bodyFatPercent: 22.4,
        adherenceScore: 10,
        clientNotes: 'Strength on deadlifts jumped to 65kg for 5 clean reps.',
        coachFeedback: 'Form looked crisp on video check. Ready for next progression cycle.',
        photosUploaded: true
      }
    ],
    coachNotes: [
      {
        id: 'cn_4',
        createdAt: '2026-09-01T09:15:00Z',
        author: 'Coach Neetu',
        type: 'GENERAL',
        content: 'Onboarded to app and assigned Full Body 3x beginner hypertrophy split.'
      }
    ]
  },
  {
    id: 'cust_04',
    name: 'Ananya Deshmukh',
    email: 'ananya.deshmukh@gmail.com',
    phone: '+91 99201 88412',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    joinedDate: '2026-08-01',
    totalSpent: 14500,
    status: 'ONBOARDING',
    programTier: '60-Day Recomp Challenge',
    assignedCoach: 'Coach Rahul (Metabolic Coach)',
    startDate: '2026-08-01',
    endDate: '2026-10-01',
    age: 31,
    gender: 'FEMALE',
    city: 'Pune, India',
    heightCm: 168,
    startingWeightKg: 72.0,
    currentWeightKg: 69.8,
    targetWeightKg: 64.0,
    targetDate: '2026-11-15',
    injuriesOrMedicalConditions: 'None reported.',
    dietGoal: 'MAINTAIN',
    dietType: 'EGGETARIAN',
    dailyCalories: 1750,
    proteinGrams: 130,
    carbsGrams: 180,
    fatsGrams: 45,
    waterLitres: 3.2,
    mealsPerDay: 4,
    allergiesOrRestrictions: 'Egg-friendly vegetarian. No beef or pork.',
    workoutSplit: 'Upper / Lower 4-Day Split',
    trainingDaysPerWeek: 4,
    experienceLevel: 'INTERMEDIATE',
    cardioProtocol: '8,000 steps daily',
    strengthBenchmarks: {
      benchPressKg: 42,
      squatKg: 60,
      deadliftKg: 75,
      overheadPressKg: 25
    },
    activeChallengeId: 'c_60_day_transform',
    activeChallengeName: '60-Day Recomp Challenge',
    lastActivity: '4 hours ago',
    streakDays: 14,
    orderIds: [],
    checkIns: [
      {
        id: 'chk_7',
        date: '2026-09-10',
        weightKg: 69.8,
        waistCm: 74.5,
        bodyFatPercent: 24.1,
        adherenceScore: 9,
        clientNotes: 'Felt strong during lower body day. Energy levels are super stable.',
        coachFeedback: 'Great adherence on the egg-protein plan. Keep hydration steady.',
        photosUploaded: false
      }
    ],
    coachNotes: [
      {
        id: 'cn_5',
        createdAt: '2026-08-01T12:00:00Z',
        author: 'Coach Rahul',
        type: 'CALL_SUMMARY',
        content: 'Completed 45-min onboarding call. Outlined 4-day split and grocery list.'
      }
    ]
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-9842',
    customerId: 'cust_01',
    customerName: 'Marcus Vance',
    customerEmail: 'marcus.vance@techcorp.io',
    productTitle: '90 Day Nutrition + Workout Coaching',
    productType: 'CHALLENGE',
    amount: 21000,
    currency: 'INR',
    paymentStatus: 'PAID',
    paymentMethod: 'RAZORPAY',
    createdAt: '2026-08-24T16:00:00Z'
  },
  {
    id: 'ORD-9843',
    customerId: 'cust_02',
    customerName: 'Karan Malhotra',
    customerEmail: 'karan.m@gmail.com',
    productTitle: '90 Day Nutrition Protocol',
    productType: 'CHALLENGE',
    amount: 11000,
    currency: 'INR',
    paymentStatus: 'PAID',
    paymentMethod: 'UPI',
    createdAt: '2026-08-25T11:20:00Z'
  },
  {
    id: 'ORD-9844',
    customerId: 'cust_03',
    customerName: 'Sneha Patel',
    customerEmail: 'sneha.patel@corporate.in',
    productTitle: 'Monthly Nutrition + Workout Coaching',
    productType: 'CHALLENGE',
    amount: 7500,
    currency: 'INR',
    paymentStatus: 'PAID',
    paymentMethod: 'UPI',
    createdAt: '2026-08-26T08:45:00Z'
  },
  {
    id: 'ORD-9845',
    customerId: 'cust_04_guest',
    customerName: 'Arjun Verma',
    customerEmail: 'arjun.v@gmail.com',
    productTitle: 'Monthly Nutrition Only Coaching',
    productType: 'CHALLENGE',
    amount: 4000,
    currency: 'INR',
    paymentStatus: 'PENDING',
    paymentMethod: 'CARD',
    createdAt: '2026-08-27T01:10:00Z'
  }
];

export const INITIAL_SUBSCRIPTIONS: Subscription[] = [
  {
    id: 'sub_001',
    customerId: 'cust_01',
    customerName: 'Marcus Vance',
    customerEmail: 'marcus.vance@techcorp.io',
    planName: 'Monthly Coaching Retainer',
    startDate: '2026-06-14',
    renewalDate: '2026-09-14',
    status: 'ACTIVE',
    amountPerMonth: 7500
  },
  {
    id: 'sub_002',
    customerId: 'cust_02',
    customerName: 'Karan Malhotra',
    customerEmail: 'karan.m@gmail.com',
    planName: 'Monthly Nutrition Protocol',
    startDate: '2026-07-01',
    renewalDate: '2026-09-01',
    status: 'ACTIVE',
    amountPerMonth: 4000
  }
];

export const INITIAL_CMS_PAGES: CMSPage[] = [
  {
    id: 'page_home',
    slug: 'home',
    title: 'Homepage',
    seoTitle: 'FITNETHEIST — Scientific Body Recomposition & Performance Protocols',
    metaDescription: 'Structured athletic training, Mifflin-St Jeor caloric calculations, personalized 7-day nutrition matrices, and transformative accountability challenges.',
    canonicalUrl: 'https://fitnetheist.com/',
    ogImageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    isPublished: true,
    lastUpdated: '2026-08-27T02:00:00Z',
    updatedBy: 'SUPER ADMIN',
    sections: [
      {
        id: 'sec_hero',
        sectionKey: 'hero',
        name: 'Hero Section',
        enabled: true,
        order: 1,
        heading: 'BUILD THE BODY. BUILD THE DISCIPLINE.',
        subtitle: 'Structured athletic training. Personalized nutrition. Real progress.',
        ctaText: 'START YOUR TRANSFORMATION',
        ctaActionTab: 'calculate',
        secondaryCtaText: 'EXPLORE CHALLENGES',
        secondaryCtaActionTab: 'challenges',
        eyebrowText: 'FITNETHEIST PROTOCOLS // 2026'
      },
      {
        id: 'sec_connect',
        sectionKey: 'connect',
        name: '01 — Connect With Us',
        enabled: true,
        order: 2,
        heading: "LET'S BUILD YOUR STRONGER SELF.",
        subtitle: 'Your transformation starts with one conversation.',
        ctaText: 'START YOUR JOURNEY',
        ctaActionTab: 'calculate',
        eyebrowText: '01 // CONNECT WITH US'
      },
      {
        id: 'sec_brand',
        sectionKey: 'brand_intro',
        name: '02 — Brand Introduction',
        enabled: true,
        order: 3,
        heading: 'FITNESS. WITHOUT THE GUESSWORK.',
        subtitle: 'Most people fail because of vague plans and zero accountability. We replace confusion with absolute clarity.',
        eyebrowText: '02 // THE PHILOSOPHY'
      },
      {
        id: 'sec_core',
        sectionKey: 'core_features',
        name: '03 — Core Features & Architecture',
        enabled: true,
        order: 4,
        heading: 'EVERYTHING YOU NEED TO TRANSFORM.',
        subtitle: 'Four integrated pillars engineered to remove confusion and guarantee physical results.',
        eyebrowText: '03 // THE ENGINE'
      },
      {
        id: 'sec_calc',
        sectionKey: 'calorie_calc',
        name: '04 — Calorie Calculator',
        enabled: true,
        order: 5,
        heading: 'MIFFLIN-ST JEOR METABOLIC ENGINE',
        subtitle: 'Calculate your exact Basal Metabolic Rate and caloric targets with empirical scientific precision.',
        eyebrowText: '04 // SCIENTIFIC PRECISION'
      },
      {
        id: 'sec_diet',
        sectionKey: 'diet_generator',
        name: '05 — 7-Day Diet Generator',
        enabled: true,
        order: 6,
        heading: 'EAT WITH PURPOSE.',
        subtitle: 'Personalized meal plans built for your target calories, dietary lifestyle, and preferred cuisine.',
        eyebrowText: '05 // NUTRITION PROTOCOL'
      },
      {
        id: 'sec_swap',
        sectionKey: 'meal_swap',
        name: '06 — Smart Meal Swap',
        enabled: true,
        order: 7,
        heading: "DON'T LIKE IT? SWAP IT.",
        subtitle: '1:1 nutritional parity swap engine across Paneer, Chicken, Tofu, Eggs, and Soya.',
        eyebrowText: '06 // FLEXIBILITY'
      },
      {
        id: 'sec_workout',
        sectionKey: 'workout_planner',
        name: '07 — Workout Planner',
        enabled: true,
        order: 8,
        heading: 'TRAIN WITH PURPOSE.',
        subtitle: 'Periodized resistance routines configured for your experience, equipment, and weekly availability.',
        eyebrowText: '07 // RESISTANCE TRAINING'
      },
      {
        id: 'sec_challenges',
        sectionKey: 'challenges',
        name: '08 — Fitness Challenges',
        enabled: true,
        order: 9,
        heading: 'CHOOSE YOUR CHALLENGE.',
        subtitle: 'Four structured tiers to ignite consistency, forge habits, or undergo total physical recomposition.',
        eyebrowText: '08 // ACCOUNTABILITY'
      },
      {
        id: 'sec_transform',
        sectionKey: 'transformations',
        name: '09 — Transformations',
        enabled: true,
        order: 10,
        heading: 'REAL PEOPLE. REAL PROGRESS.',
        subtitle: 'Real discipline yields measurable biological change. Zero shortcuts.',
        eyebrowText: '09 // EMPIRICAL EVIDENCE'
      },
      {
        id: 'sec_coach',
        sectionKey: 'coach',
        name: '10 — The Coach',
        enabled: true,
        order: 11,
        heading: 'SOMEONE HAS YOUR BACK.',
        subtitle: 'Battle-tested coaching methodology developed through over a decade of coaching elite athletes.',
        eyebrowText: '10 // HUMAN LEADERSHIP'
      },
      {
        id: 'sec_community',
        sectionKey: 'community',
        name: '11 — The Tribe',
        enabled: true,
        order: 12,
        heading: 'THE TRIBE.',
        subtitle: "Transformation is easier when you're not doing it alone. Join athletes worldwide.",
        eyebrowText: '11 // COMMUNITY NETWORK'
      },
      {
        id: 'sec_progress',
        sectionKey: 'progress',
        name: '12 — Progress Experience',
        enabled: true,
        order: 13,
        heading: 'YOUR JOURNEY. MEASURED.',
        subtitle: 'Real-time telemetry tracking workouts, daily caloric adherence, and active challenge streaks.',
        eyebrowText: '12 // TELEMETRY'
      },
      {
        id: 'sec_cta',
        sectionKey: 'final_cta',
        name: '13 — Final CTA',
        enabled: true,
        order: 14,
        heading: 'THE TIME FOR EXCUSES IS OVER.',
        subtitle: 'Your future self is built today. Choose your path and commit completely.',
        ctaText: 'START TODAY',
        ctaActionTab: 'calculate',
        eyebrowText: '13 // FINAL DECISION'
      }
    ]
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog_1',
    title: 'The Truth About Protein Absorption: Why Meal Timing Matters Less Than Total Daily Intake',
    slug: 'truth-about-protein-absorption',
    featuredImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Debunking the 30g per meal myth and how to optimize leucine thresholds for maximum muscle protein synthesis.',
    content: `For decades, gym folklore stated that the human digestive tract could only utilize 30 grams of protein in a single feeding. Modern peer-reviewed isotopic tracer studies have repeatedly debunked this. While muscle protein synthesis (MPS) may spike around 0.4-0.5g/kg per meal, the remaining amino acids are retained in the splanchnic bed and released gradually for tissue repair, enzymatic synthesis, and systemic recovery.`,
    author: 'Alex Mercer (Head Coach)',
    category: 'Nutrition',
    tags: ['Protein', 'Hypertrophy', 'Macros', 'Science'],
    seoTitle: 'Protein Absorption Truth & Leucine Thresholds — Fitnetheist',
    seoDescription: 'Scientific breakdown of protein synthesis and daily distribution for drug-free natural athletes.',
    status: 'PUBLISHED',
    publishDate: '2026-08-15'
  },
  {
    id: 'blog_2',
    title: 'Progressive Overload Without Adding Weight: 4 Advanced Intensity Modalities',
    slug: 'progressive-overload-advanced-modalities',
    featuredImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    excerpt: 'How to stimulate mechanical tension when you have hit a strength plateau or have limited dumbbell weights.',
    content: `Mechanical tension is the primary driver of muscular hypertrophy. When adding load on the barbell is not feasible, intelligent athletes manipulate tempo (eccentric duration), intra-set rest intervals, full range of motion standardization, and peak contraction pauses to enforce greater motor unit recruitment.`,
    author: 'Alex Mercer (Head Coach)',
    category: 'Workout',
    tags: ['Training', 'Hypertrophy', 'Plateau', 'Technique'],
    seoTitle: 'Progressive Overload Modalities — Fitnetheist Training Guide',
    seoDescription: 'How to break through training plateaus with tempo control and mechanical tension.',
    status: 'PUBLISHED',
    publishDate: '2026-08-20'
  },
  {
    id: 'blog_3',
    title: 'Vegetarian Muscle Building: Achieving High Protein Without Excess Fat',
    slug: 'vegetarian-muscle-building-protein-guide',
    featuredImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Strategic meal engineering using low-fat paneer, roasted soya chunks, edamame, and Greek yogurt.',
    content: `A common pitfall for vegetarian athletes trying to hit 160g+ of daily protein is the concurrent accumulation of saturated fats from excessive regular paneer or carbs from lentils. By integrating dry defatted soya chunks (52% protein), low-fat cottage cheese, egg whites or whey isolates, plant-based athletes can comfortably hit precise cutting and bulking targets.`,
    author: 'Ananya Roy (Nutritionist)',
    category: 'Nutrition',
    tags: ['Vegetarian', 'Indian Diet', 'Protein', 'Meal Prep'],
    seoTitle: 'Vegetarian High Protein Nutrition Guide — Fitnetheist',
    seoDescription: 'Master Indian vegetarian macronutrient balance for lean muscle building and fat loss.',
    status: 'PUBLISHED',
    publishDate: '2026-08-24'
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq_1',
    category: 'CHALLENGES',
    question: 'What happens if I miss a daily workout during a challenge?',
    answer: 'Consistency is prioritized over perfection. While your unbroken streak badge resets, you have 48 hours to complete a recovery session and maintain your cohort graduation status.',
    order: 1,
    isPublished: true
  },
  {
    id: 'faq_2',
    category: 'NUTRITION',
    question: 'How does the Smart Meal Swap maintain calorie targets?',
    answer: 'Every food item in our verified database is calibrated to exact gram equivalents so that when you swap chicken breast for paneer or tofu, the algorithm automatically adjusts portion sizes to preserve your daily calorie and protein budget.',
    order: 2,
    isPublished: true
  },
  {
    id: 'faq_3',
    category: 'TRAINING',
    question: 'Can I perform the workouts at home with only a pair of adjustable dumbbells?',
    answer: 'Yes. When generating your routine, select the "Dumbbells" or "No Equipment" toggle. The exercise library will automatically filter for unilateral and bodyweight mechanical progressions.',
    order: 3,
    isPublished: true
  },
  {
    id: 'faq_4',
    category: 'MEMBERSHIP',
    question: 'Can I cancel or pause my subscription anytime?',
    answer: 'Yes. You can manage, pause, or cancel your active subscription with zero hidden fees directly from your athlete dashboard or by contacting our direct support desk.',
    order: 4,
    isPublished: true
  }
];

export const INITIAL_MEDIA_LIBRARY: MediaItem[] = [
  {
    id: 'med_01',
    filename: 'hero-athlete-dark.jpg',
    title: 'Hero Athlete Visual',
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80',
    fileType: 'IMAGE',
    fileSizeMb: 1.8,
    uploadDate: '2026-08-20',
    dimensions: '1920x1080',
    usedIn: ['Hero Section', 'Brand Introduction']
  },
  {
    id: 'med_02',
    filename: 'coach-profile-editorial.jpg',
    title: 'Head Coach Editorial Portrait',
    url: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80',
    fileType: 'IMAGE',
    fileSizeMb: 1.2,
    uploadDate: '2026-08-21',
    dimensions: '1200x1600',
    usedIn: ['Coach Section']
  },
  {
    id: 'med_03',
    filename: 'challenge-ignite-cover.jpg',
    title: '21 Day Ignite Cover Banner',
    url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    fileType: 'IMAGE',
    fileSizeMb: 2.1,
    uploadDate: '2026-08-22',
    dimensions: '1400x900',
    usedIn: ['Challenges Section', 'Pricing Section']
  },
  {
    id: 'med_04',
    filename: 'exercise-squat-demo.mp4',
    title: 'Barbell Back Squat Form Demonstration',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-barbell-in-a-gym-43750-large.mp4',
    fileType: 'EXERCISE_CLIP',
    fileSizeMb: 8.4,
    uploadDate: '2026-08-23',
    dimensions: '1080p 60fps',
    usedIn: ['Exercise Library', 'Workout Planner']
  }
];

export const INITIAL_NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 'nav_calc', label: 'CALCULATE', targetTab: 'calculate', order: 1, isHeader: true, isFooter: true },
  { id: 'nav_nutr', label: 'NUTRITION', targetTab: 'nutrition', order: 2, isHeader: true, isFooter: true },
  { id: 'nav_train', label: 'TRAIN', targetTab: 'train', order: 3, isHeader: true, isFooter: true },
  { id: 'nav_chal', label: 'CHALLENGES', targetTab: 'challenges', order: 4, isHeader: true, isFooter: true },
  { id: 'nav_trans', label: 'TRANSFORM', targetTab: 'transform', order: 5, isHeader: true, isFooter: true },
  { id: 'nav_comm', label: 'THE TRIBE', targetTab: 'community', order: 6, isHeader: true, isFooter: true },
  { id: 'nav_coach', label: 'COACH', targetTab: 'coach', order: 7, isHeader: true, isFooter: true },
  { id: 'nav_pricing', label: 'PRICING', targetTab: 'pricing', order: 8, isHeader: true, isFooter: true },
  { id: 'nav_admin', label: 'ADMIN', targetTab: 'admin', order: 9, isHeader: true, isFooter: false }
];

export const INITIAL_SEO_CONFIG: SEOConfig = {
  siteTitle: 'FITNETHEIST — Scientific Body Recomposition & Performance Protocols',
  defaultDescription: 'Calculated nutrition. Periodized training. Real athletic discipline.',
  canonicalBaseUrl: 'https://fitnetheist.com',
  defaultOgImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
  twitterHandle: '@fitnetheist',
  indexingEnabled: true
};

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log_01',
    timestamp: '2026-08-27T02:20:00Z',
    actor: 'Alex Mercer',
    actorRole: 'SUPER_ADMIN',
    action: 'UPDATED_CHALLENGE_STATUS',
    targetResource: 'c_21_day_ignite',
    oldValue: 'DRAFT',
    newValue: 'PUBLISHED'
  },
  {
    id: 'log_02',
    timestamp: '2026-08-26T21:10:00Z',
    actor: 'Ananya Roy',
    actorRole: 'CONTENT_MANAGER',
    action: 'PUBLISHED_BLOG_POST',
    targetResource: 'vegetarian-muscle-building-protein-guide',
    newValue: 'PUBLISHED'
  },
  {
    id: 'log_03',
    timestamp: '2026-08-26T18:45:00Z',
    actor: 'Vikram Mehta',
    actorRole: 'SALES_LEAD_MANAGER',
    action: 'ASSIGNED_LEAD',
    targetResource: 'lead_102 (Priya Sundaram)',
    oldValue: 'Unassigned',
    newValue: 'Ananya Roy'
  },
  {
    id: 'log_04',
    timestamp: '2026-08-26T14:30:00Z',
    actor: 'Alex Mercer',
    actorRole: 'COACH',
    action: 'UPDATED_EXERCISE_SETS_REPS',
    targetResource: 'ex_barbell_squat',
    oldValue: '3 sets 8-10 reps',
    newValue: '4 sets 6-8 reps @ RPE 8'
  }
];

export const INITIAL_NOTIFICATIONS: AdminNotification[] = [
  {
    id: 'notif_1',
    timestamp: 'Just now',
    title: 'Hot Lead Generated: Rohan Sharma',
    message: 'Score 85/100 (Calorie Calculator + 21 Day Ignite inquiry). WhatsApp follow-up logged.',
    type: 'HOT_LEAD',
    read: false,
    linkSubtab: 'leads'
  },
  {
    id: 'notif_2',
    timestamp: '18 min ago',
    title: 'New Order Received ($399)',
    message: 'Marcus Vance purchased 90 Day Beast Mode All-Access pass via Stripe.',
    type: 'NEW_PURCHASE',
    read: false,
    linkSubtab: 'invoices'
  },
  {
    id: 'notif_3',
    timestamp: '1 hour ago',
    title: 'Follow-up Due: Sameer Kulkarni',
    message: 'Vegan protein protocol guide delivered. Check in regarding 7 Day Reset enrollment.',
    type: 'FOLLOW_UP_DUE',
    read: false,
    linkSubtab: 'leads'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv_1001',
    invoiceNumber: 'INV-2026-0042',
    type: 'TAX_INVOICE',
    status: 'PAID',
    issueDate: '2026-08-25',
    dueDate: '2026-08-25',
    businessName: 'FITNETHEIST ELITE PERFORMANCE & NUTRITION',
    businessGstin: '07AAACF8899Q1ZX',
    businessPan: 'AAACF8899Q',
    businessAddress: 'Plot 42, Sector 18, Commercial Hub, Cyber City, Gurugram, HR 122002',
    businessEmail: 'billing@fitnetheist.com',
    businessPhone: '+91 98100 45678',
    clientName: 'Alex Mercer',
    clientEmail: 'alex.mercer@gmail.com',
    clientPhone: '+91 98200 11223',
    clientAddress: 'B-402, Highline Residency, Bandra West, Mumbai, MH 400050',
    items: [
      {
        id: 'item_1',
        description: '90-Day VIP 1-on-1 Physique Transformation Protocol (Weekly Video Check-ins, Custom Hypertrophy Split, Macro Engineering)',
        category: 'COACHING',
        quantity: 1,
        unitPrice: 19999,
        discountAmount: 2000,
        taxRatePercent: 18,
        total: 21238.82
      }
    ],
    subtotal: 17999,
    discountTotal: 2000,
    taxTotal: 3239.82,
    totalAmount: 21238.82,
    currency: 'INR',
    paymentMethod: 'UPI',
    transactionReference: 'UPI-AXIS-9821034459',
    paymentDate: '2026-08-25',
    notes: 'Thank you for committing to your athletic evolution with Fitnetheist. All custom macros and periodized training splits are active in your dashboard.',
    terms: 'All digital fitness and customized coaching services are non-refundable once custom programs are deployed. Access valid for 90 days from activation date.',
    createdAt: '2026-08-25T11:20:00Z'
  },
  {
    id: 'inv_1002',
    invoiceNumber: 'REC-2026-0089',
    type: 'PAYMENT_RECEIPT',
    status: 'PAID',
    issueDate: '2026-08-26',
    dueDate: '2026-08-26',
    businessName: 'FITNETHEIST ELITE PERFORMANCE & NUTRITION',
    businessGstin: '07AAACF8899Q1ZX',
    businessPan: 'AAACF8899Q',
    businessAddress: 'Plot 42, Sector 18, Commercial Hub, Cyber City, Gurugram, HR 122002',
    businessEmail: 'billing@fitnetheist.com',
    businessPhone: '+91 98100 45678',
    clientName: 'Priya Sharma',
    clientEmail: 'priya.fitness@example.com',
    clientPhone: '+91 98765 43210',
    clientAddress: 'Flat 12A, Orchid Towers, Indiranagar, Bengaluru, KA 560038',
    items: [
      {
        id: 'item_2',
        description: '21-Day Ignite Shred Challenge (Exclusive Community Access, Daily Habit Tracking, Meal Swap Engine)',
        category: 'CHALLENGE',
        quantity: 1,
        unitPrice: 3499,
        discountAmount: 500,
        taxRatePercent: 18,
        total: 3538.82
      }
    ],
    subtotal: 2999,
    discountTotal: 500,
    taxTotal: 539.82,
    totalAmount: 3538.82,
    currency: 'INR',
    paymentMethod: 'RAZORPAY',
    transactionReference: 'pay_RZP884930127',
    paymentDate: '2026-08-26',
    notes: 'Official payment receipt for 21-Day Ignite enrollment. Challenge dashboard unlocked.',
    terms: 'Receipt generated automatically upon successful gateway authorization.',
    createdAt: '2026-08-26T09:45:00Z'
  },
  {
    id: 'inv_1003',
    invoiceNumber: 'INV-2026-0090',
    type: 'TAX_INVOICE',
    status: 'PENDING',
    issueDate: '2026-08-27',
    dueDate: '2026-08-30',
    businessName: 'FITNETHEIST ELITE PERFORMANCE & NUTRITION',
    businessGstin: '07AAACF8899Q1ZX',
    businessPan: 'AAACF8899Q',
    businessAddress: 'Plot 42, Sector 18, Commercial Hub, Cyber City, Gurugram, HR 122002',
    businessEmail: 'billing@fitnetheist.com',
    businessPhone: '+91 98100 45678',
    clientName: 'Rohan Sharma',
    clientEmail: 'rohan.sharma@example.com',
    clientPhone: '+91 98201 44521',
    clientAddress: 'Saket, New Delhi, DL 110017',
    items: [
      {
        id: 'item_3',
        description: '60-Day Body Recomposition Elite Coaching Pass (Custom Indian Vegetarian Macro Engine & Strength Split)',
        category: 'COACHING',
        quantity: 1,
        unitPrice: 12999,
        discountAmount: 1000,
        taxRatePercent: 18,
        total: 14158.82
      }
    ],
    subtotal: 11999,
    discountTotal: 1000,
    taxTotal: 2159.82,
    totalAmount: 14158.82,
    currency: 'INR',
    paymentMethod: 'UPI',
    transactionReference: 'PENDING_CONFIRMATION',
    notes: 'Invoice generated following 1-on-1 consultation with Head Coach Neetu.',
    terms: 'Payment due within 3 days to reserve intake slot in the upcoming transformation cohort.',
    createdAt: '2026-08-27T15:10:00Z'
  }
];

