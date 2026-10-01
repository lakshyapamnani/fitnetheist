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

export const INITIAL_LEADS: Lead[] = [];

export const INITIAL_CUSTOMERS: Customer[] = [];

export const INITIAL_ORDERS: Order[] = [];

export const INITIAL_SUBSCRIPTIONS: Subscription[] = [];

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
    author: 'Head Coach',
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
    author: 'Head Coach',
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
    author: 'Lead Nutritionist',
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

export const INITIAL_AUDIT_LOGS: AuditLog[] = [];

export const INITIAL_NOTIFICATIONS: AdminNotification[] = [];

export const INITIAL_INVOICES: Invoice[] = [];
