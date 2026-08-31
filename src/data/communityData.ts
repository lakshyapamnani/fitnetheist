import { CommunityPost, LeaderboardEntry, AdminAnalytics } from '../types';

export const COMMUNITY_POSTS_DATA: CommunityPost[] = [
  {
    id: 'post_1',
    authorName: 'Vikram Sengupta',
    authorHandle: '@vikram_iron',
    authorAvatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=200&q=80',
    timeAgo: '2h ago',
    content: 'Day 14 of 21-Day Ignite locked in. Hit 140kg squat for 4 clean reps with zero lower back strain. Calorie intake at exactly 2,250 kcal today (165g protein). Discipline is freedom.',
    badge: '21-DAY IGNITE',
    likesCount: 38,
    hasLiked: true,
    commentsCount: 7,
    streakCount: 14,
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'post_2',
    authorName: 'Dr. Neha Pillai',
    authorHandle: '@nehapillai_md',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    timeAgo: '5h ago',
    content: 'Completed my 7-day meal prep using the automated grocery list! 14 portions of Tofu Quinoa bowls and Moong Chillas sealed and stored. No 7pm takeout temptation this week.',
    badge: 'MEAL PREP WARRIOR',
    likesCount: 52,
    hasLiked: false,
    commentsCount: 12,
    streakCount: 28,
  },
  {
    id: 'post_3',
    authorName: 'Zack Thornton',
    authorHandle: '@zack_thornton',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    timeAgo: '8h ago',
    content: 'Week 6 of 60-Day Transform. Down 6.1 kg while bench press increased by 10kg. The Mifflin-St Jeor calorie targets combined with the Upper/Lower periodization are unmatched.',
    badge: '60-DAY TRANSFORM',
    likesCount: 94,
    hasLiked: true,
    commentsCount: 19,
    streakCount: 42,
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'post_4',
    authorName: 'Rhea Chakraborty',
    authorHandle: '@rhea_athletic',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    timeAgo: '1d ago',
    content: 'Passed the 30-day streak mark! Water intake logged every single day (>3L). Energy levels are through the roof. If you are doubting the process, just trust the numbers.',
    badge: '30-DAY STREAK CLUB',
    likesCount: 115,
    hasLiked: false,
    commentsCount: 24,
    streakCount: 31,
  }
];

export const LEADERBOARD_DATA: LeaderboardEntry[] = [
  {
    rank: 1,
    name: 'Kabir Varma',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    streakDays: 84,
    challengeProgress: 'Day 84 / 90 (Beast Mode)',
    totalWorkouts: 72
  },
  {
    rank: 2,
    name: 'Zack Thornton',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    streakDays: 42,
    challengeProgress: 'Day 42 / 60 (Transform)',
    totalWorkouts: 38
  },
  {
    rank: 3,
    name: 'Rhea Chakraborty',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    streakDays: 31,
    challengeProgress: 'Day 31 / 60 (Transform)',
    totalWorkouts: 29
  },
  {
    rank: 4,
    name: 'Alex Mercer (You)',
    avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=200&q=80',
    streakDays: 12,
    challengeProgress: 'Day 12 / 21 (Ignite)',
    totalWorkouts: 10,
    isCurrentUser: true
  },
  {
    rank: 5,
    name: 'Dr. Neha Pillai',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    streakDays: 28,
    challengeProgress: 'Day 28 / 60 (Transform)',
    totalWorkouts: 24
  },
  {
    rank: 6,
    name: 'Vikram Sengupta',
    avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=200&q=80',
    streakDays: 14,
    challengeProgress: 'Day 14 / 21 (Ignite)',
    totalWorkouts: 12
  }
];

export const COACH_DATA = {
  name: 'Marcus "Vanguard" Kane',
  title: 'Founder & Head of Human Performance',
  portrait: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80',
  experienceYears: 14,
  athletesCoached: 3200,
  certifications: [
    'CSCS (Certified Strength & Conditioning Specialist)',
    'Precision Nutrition Master Coach (Pn2)',
    'Exos Performance Specialist (XPS)',
    'USA Weightlifting (USAW-L2)'
  ],
  philosophy: 'Fitness is not an emotional hobby. It is an engineering discipline. We remove the fluff, calculate the metabolic reality, program progressive load without ego, and execute daily with mechanical consistency.',
  specializations: [
    'Aggressive Body Recomposition',
    'Macronutrient Periodization & Metabolic Health',
    'Hypertrophy Biomechanics & Injury Prevention',
    'Athletic Conditioning for High Performers'
  ],
  quote: 'When your nutrition is mathematically sound and your training progressive, transformation is no longer a wish — it is a mathematical inevitability.'
};

export const PRICING_DATA = [
  {
    id: 'plan_free',
    name: 'FREE ARCHETYPE',
    price: '$0',
    frequency: 'FOREVER',
    tagline: 'Foundational calculators and entry athletic resources.',
    features: [
      'Interactive Mifflin-St Jeor Calorie Calculator',
      'Instant Cut / Maintain / Bulk calorie breakdown',
      'Basic Exercise Library & Form Guidelines',
      'Access to The Tribe Public Community Channel',
      'Standard 7-Day Reset Challenge Entry'
    ],
    ctaText: 'START FREE',
    popular: false
  },
  {
    id: 'plan_challenge',
    name: 'CHALLENGE PASS',
    price: '$29',
    frequency: 'ONE-TIME',
    tagline: 'Structured habit protocol with full accountability.',
    features: [
      'Full enrollment in 21-Day Ignite or 60-Day Transform',
      'Personalized 7-Day Nutrition Plan with Smart Swaps',
      'Automated Weekly Categorized Grocery List Generator',
      'Daily Streak Tracker & Leaderboard Verification',
      'Printable & Exportable Workout PDFs',
      'Official Completion Badge & Hall of Fame status'
    ],
    ctaText: 'JOIN A CHALLENGE',
    popular: true
  },
  {
    id: 'plan_pro',
    name: 'PRO ATHLETE',
    price: '$19',
    frequency: 'PER MONTH',
    tagline: 'Complete adaptive training system & coaching support.',
    features: [
      'Unlimited 7-Day Custom Diet Generations',
      'Unlimited Periodized Workout Split Generations',
      'Smart Meal Swap with Exact Macro Matching',
      'Full Progress Tracker with Weight & Measurement Graphs',
      'Bi-Weekly Coach Video Q&A Masterclasses',
      'Access to All Current and Future Challenges',
      'Priority 1-on-1 Nutritionist Support Channel'
    ],
    ctaText: 'UNLOCK PRO ATHLETE',
    popular: false
  }
];

export const INITIAL_ADMIN_ANALYTICS: AdminAnalytics = {
  totalUsers: 14850,
  activeUsersToday: 3240,
  challengeParticipants: 8980,
  dietsGenerated: 42150,
  workoutsGenerated: 38920,
  monthlyRevenueUsd: 48920,
  conversionRatePercent: 8.4
};
