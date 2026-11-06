import { CoachingPlan } from '../types';

export const DEFAULT_COACHING_PLANS: CoachingPlan[] = [
  {
    id: 'plan_21d',
    name: '21 DAYS DISCIPLINE CHALLENGE',
    durationDays: 21,
    durationLabel: '21 Days (Online Program)',
    totalPrice: 799,
    priceFormatted: '₹799',
    pauseDays: 0,
    pauseLabel: 'Continuous 21-Day Streak',
    badge: 'NEW ONLINE PROGRAM',
    isPopular: false,
    isChallenge: true,
    isActive: true,
    order: 0,
    ctaText: 'START 21-DAY DISCIPLINE',
    description: 'Standalone 21-day online discipline and habit architecture protocol. 21 structured daily progressive movement modules, hydration standards, and daily habit accountability.',
    features: [
      '100% Online Program (No virtual or 1:1 sessions)',
      '21-Day progressive discipline & habit architecture',
      'Daily Video Curriculum Hub (Video upload structure ready)',
      'Daily habit, hydration & nutrition compliance standards',
      'Digital Completion Badge & Streak Tracker'
    ],
    whatsappMessage: 'Hello Coach Neetu! I want to enroll in the 21 Days Discipline Challenge (21 Days - ₹799). Let\'s start!'
  },
  {
    id: 'plan_3m',
    name: '3 MONTHS ONLINE FITNESS PLAN',
    durationMonths: 3,
    durationLabel: '3 Months (Online Fitness Plan)',
    totalPrice: 9000,
    priceFormatted: '₹9,000',
    pauseDays: 7,
    pauseLabel: 'Up to 1 Week Allowed',
    badge: 'ONLINE FITNESS PLAN',
    isPopular: true,
    isChallenge: false,
    isActive: true,
    order: 1,
    ctaText: 'ENROLL IN 3 MONTHS',
    description: '100% Online Fitness Program. Customised workout and nutrition plan, weekly check-in over WhatsApp, monthly progress review, and up to 1 week pause facility.',
    features: [
      '100% Online Fitness Program (No virtual or 1:1 sessions)',
      'Custom workout split based on your schedule & equipment',
      'Bespoke Indian & international nutrition matrix with exact macros',
      'Smart Meal Swap integration (1:1 protein & caloric parity)',
      'Weekly check-in & progress audit over WhatsApp',
      'Up to 1 week membership pause facility included'
    ],
    whatsappMessage: 'Hello Coach Neetu! I want to enroll in the 3 Months Online Fitness Plan (₹9,000). Both Workout & Nutrition included. Let\'s start!'
  },
  {
    id: 'plan_6m',
    name: '6 MONTHS ONLINE FITNESS PLAN',
    durationMonths: 6,
    durationLabel: '6 Months (Online Fitness Plan)',
    totalPrice: 18000,
    priceFormatted: '₹18,000',
    pauseDays: 20,
    pauseLabel: '20 Days Complimentary',
    badge: 'TRANSFORMATION CHOICE',
    isPopular: false,
    isChallenge: false,
    isActive: true,
    order: 2,
    ctaText: 'ENROLL IN 6 MONTHS',
    description: '100% Online Fitness Program. Customised workout and nutrition plan, weekly check-in over WhatsApp, monthly progress review, and 20 days pause facility.',
    features: [
      '100% Online Fitness Program (No virtual or 1:1 sessions)',
      'Complete physiological & postural transformation cycle',
      'Bespoke nutrition with phased progressive carbohydrate cycles',
      'Direct WhatsApp check-ins & weekly video form reviews',
      'Full postpartum recovery or hypertrophy specialization',
      '20 Days complimentary pause facility included'
    ],
    whatsappMessage: 'Hello Coach Neetu! I want to enroll in the 6 Months Online Fitness Plan (₹18,000). Both Workout & Nutrition included. Let\'s start!'
  }
];
