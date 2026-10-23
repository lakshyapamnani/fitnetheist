import { 
  DietType, 
  CuisineType, 
  FitnessGoal, 
  ActivityLevel, 
  ExperienceLevel, 
  EquipmentType, 
  MealCategory,
  WorkoutPlan,
  AdminDietPlan
} from '../types';

export interface PackageOption {
  id: string;
  name: string;
  category: string;
  durationDays: number;
  price: number;
  priceINR: number;
  pauseDays: number;
  description: string;
}

export const PACKAGE_CATALOG: PackageOption[] = [
  {
    id: 'pkg_3m',
    name: '3 Months Protocol',
    category: '3 Months Protocol',
    durationDays: 90,
    price: 8000,
    priceINR: 8000,
    pauseDays: 10,
    description: '90-Day Tailored Diet + Custom Workout Protocol (10 Days Pause Allowed)'
  },
  {
    id: 'pkg_6m',
    name: '6 Months Protocol',
    category: '6 Months Protocol',
    durationDays: 180,
    price: 18000,
    priceINR: 18000,
    pauseDays: 20,
    description: '180-Day Complete Body Recomposition & Postpartum Care (20 Days Pause Allowed)'
  },
  {
    id: 'pkg_9m',
    name: '9 Months Protocol',
    category: '9 Months Protocol',
    durationDays: 270,
    price: 20000,
    priceINR: 20000,
    pauseDays: 30,
    description: '270-Day Advanced Metabolic Reset & Strength Progression (30 Days Pause Allowed)'
  },
  {
    id: 'pkg_12m',
    name: '12 Months Protocol',
    category: '12 Months Protocol',
    durationDays: 365,
    price: 25000,
    priceINR: 25000,
    pauseDays: 45,
    description: '365-Day Annual Executive 1-on-1 Coaching & Lifestyle Mastery (45 Days Pause Allowed)'
  },
  {
    id: 'pkg_21d_challenge',
    name: '21-Day Ignite Shred Challenge',
    category: '21-Day Challenge',
    durationDays: 21,
    price: 3499,
    priceINR: 3499,
    pauseDays: 0,
    description: '21-Day Rapid Metabolic Kickstart & Daily Accountability Cohort'
  },
  {
    id: 'pkg_60d_cohort',
    name: '60-Day Body Recomposition Cohort',
    category: '60-Day Cohort',
    durationDays: 60,
    price: 12999,
    priceINR: 12999,
    pauseDays: 5,
    description: '60-Day Intensive Fat Loss & Lean Muscle Retention Program'
  },
  {
    id: 'pkg_custom',
    name: 'Custom Coaching Protocol',
    category: 'Custom Coaching',
    durationDays: 90,
    price: 15000,
    priceINR: 15000,
    pauseDays: 10,
    description: 'Bespoke Coaching Protocol with Custom Duration & Specializations'
  }
];

/**
 * Returns local calendar date in YYYY-MM-DD format without UTC shift
 */
export const getLocalDateString = (d: Date = new Date()): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Parses a YYYY-MM-DD string into local midnight timestamp
 */
export const parseLocalDateMidnight = (dateStr?: string): number | null => {
  if (!dateStr) return null;
  const clean = dateStr.split('T')[0];
  const parts = clean.split('-').map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return null;
  return new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0, 0).getTime();
};

/**
 * Finds a package option by name or category
 */
export const findPackageOption = (nameOrTier?: string): PackageOption | undefined => {
  if (!nameOrTier) return undefined;
  const lower = nameOrTier.toLowerCase().trim();
  return PACKAGE_CATALOG.find(
    p =>
      p.name.toLowerCase() === lower ||
      p.category.toLowerCase() === lower ||
      p.id.toLowerCase() === lower ||
      (lower.includes('3 month') && p.id === 'pkg_3m') ||
      (lower.includes('90-day') && p.id === 'pkg_3m') ||
      (lower.includes('6 month') && p.id === 'pkg_6m') ||
      (lower.includes('180-day') && p.id === 'pkg_6m') ||
      (lower.includes('9 month') && p.id === 'pkg_9m') ||
      (lower.includes('12 month') && p.id === 'pkg_12m') ||
      (lower.includes('21-day') && p.id === 'pkg_21d_challenge') ||
      (lower.includes('21 day') && p.id === 'pkg_21d_challenge') ||
      (lower.includes('60-day') && p.id === 'pkg_60d_cohort') ||
      (lower.includes('60 day') && p.id === 'pkg_60d_cohort')
  );
};

/**
 * Calculates local YYYY-MM-DD end date given a start date and package name
 */
export const calculateEndDateFromPackage = (startDateStr: string, packageName?: string): string => {
  const pkg = findPackageOption(packageName);
  const durationDays = pkg ? pkg.durationDays : 90;
  const startMidnight = parseLocalDateMidnight(startDateStr) ?? parseLocalDateMidnight(getLocalDateString())!;
  const endDate = new Date(startMidnight);
  endDate.setDate(endDate.getDate() + durationDays);
  return getLocalDateString(endDate);
};

export type ComputedSubscriptionState = 'ACTIVE' | 'EXPIRING_SOON' | 'SUBSCRIPTION_OVER';

export interface SubscriptionStatusInfo {
  state: ComputedSubscriptionState;
  status: ComputedSubscriptionState;
  label: 'Active' | 'Expiring Soon' | 'Subscription Over';
  badgeText: string;
  daysRemaining: number;
  isExpired: boolean;
  isExpiringSoon: boolean;
  startDateFormatted: string;
  endDateFormatted: string;
}

/**
 * Automatically calculates subscription status using local calendar date-only logic.
 * Threshold for Expiring Soon: 7 days before end date (inclusive of today = endDate).
 */
export const getSubscriptionStatusInfo = (startDate?: string, endDate?: string): SubscriptionStatusInfo => {
  const todayMidnight = parseLocalDateMidnight(getLocalDateString())!;
  const endMidnight = parseLocalDateMidnight(endDate);
  const startClean = startDate ? startDate.split('T')[0] : getLocalDateString();
  const endClean = endDate ? endDate.split('T')[0] : '';

  if (!endMidnight) {
    return {
      state: 'ACTIVE',
      status: 'ACTIVE',
      label: 'Active',
      badgeText: 'Active · Ongoing',
      daysRemaining: 90,
      isExpired: false,
      isExpiringSoon: false,
      startDateFormatted: startClean,
      endDateFormatted: 'Ongoing'
    };
  }

  const diffDays = Math.round((endMidnight - todayMidnight) / 86400000);

  if (diffDays < 0) {
    return {
      state: 'SUBSCRIPTION_OVER',
      status: 'SUBSCRIPTION_OVER',
      label: 'Subscription Over',
      badgeText: `Subscription Over · Ended ${endClean}`,
      daysRemaining: diffDays,
      isExpired: true,
      isExpiringSoon: false,
      startDateFormatted: startClean,
      endDateFormatted: endClean
    };
  }

  if (diffDays <= 7) {
    return {
      state: 'EXPIRING_SOON',
      status: 'EXPIRING_SOON',
      label: 'Expiring Soon',
      badgeText: `Expiring Soon (${diffDays}d left · ${endClean})`,
      daysRemaining: diffDays,
      isExpired: false,
      isExpiringSoon: true,
      startDateFormatted: startClean,
      endDateFormatted: endClean
    };
  }

  return {
    state: 'ACTIVE',
    status: 'ACTIVE',
    label: 'Active',
    badgeText: `Active · Ends ${endClean}`,
    daysRemaining: diffDays,
    isExpired: false,
    isExpiringSoon: false,
    startDateFormatted: startClean,
    endDateFormatted: endClean
  };
};

export type AdminRole = 
  | 'SUPER_ADMIN' 
  | 'ADMIN' 
  | 'COACH' 
  | 'CONTENT_MANAGER' 
  | 'SALES_LEAD_MANAGER';

export type LeadSource = 
  | 'WEBSITE' 
  | 'CALORIE_CALCULATOR' 
  | 'DIET_GENERATOR' 
  | 'WORKOUT_PLANNER' 
  | 'CHALLENGE' 
  | 'CONTACT_FORM' 
  | 'WHATSAPP' 
  | 'INSTAGRAM' 
  | 'REFERRAL' 
  | 'MANUAL_ENTRY'
  | 'LOGIN_PORTAL'
  | 'SIGNUP'
  | 'WEBSITE_LOGIN';

export type LeadStatus = 
  | 'NEW' 
  | 'CONTACTED' 
  | 'QUALIFIED' 
  | 'INTERESTED' 
  | 'FOLLOW_UP' 
  | 'CONVERTED' 
  | 'LOST' 
  | 'NOT_INTERESTED';

export type LeadTag = 
  | 'HOT' 
  | 'WARM' 
  | 'COLD' 
  | 'HIGH_VALUE' 
  | '21_DAY' 
  | '60_DAY' 
  | '90_DAY' 
  | 'WEIGHT_LOSS' 
  | 'MUSCLE_GAIN' 
  | 'VEGETARIAN' 
  | 'NON_VEGETARIAN' 
  | 'VEGAN';

export interface LeadActivity {
  id: string;
  timestamp: string;
  type: 'CREATED' | 'CONTACTED' | 'FOLLOW_UP' | 'MESSAGE_SENT' | 'CALL' | 'NOTE' | 'STATUS_CHANGE' | 'CONVERTED' | 'TOOL_INTERACTION';
  description: string;
  performedBy: string;
  metadata?: Record<string, any>;
}

export interface LeadNote {
  id: string;
  createdAt: string;
  author: string;
  content: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: LeadSource;
  goal: FitnessGoal;
  dietType?: DietType;
  preferredCuisine?: CuisineType;
  status: LeadStatus;
  assignedTo: string;
  lastContact?: string;
  createdAt: string;
  estimatedValue: number;
  score: number;
  scoreClassification: 'COLD' | 'WARM' | 'HOT';
  
  // Selected Package Info
  packageName?: string;
  packageCategory?: string;
  packagePrice?: number;

  // Biometric & Tool Captured Context
  age?: number;
  sex?: 'male' | 'female';
  heightCm?: number;
  weightKg?: number;
  activityLevel?: ActivityLevel;
  calculatedCalories?: number;
  challengeInterest?: string;
  workoutPreferences?: {
    experience?: ExperienceLevel;
    equipment?: EquipmentType;
    daysPerWeek?: number;
  };
  dietPreferences?: {
    mealsPerDay?: number;
    preferences?: string[];
    restrictions?: string[];
  };
  
  // CRM Management
  tags: LeadTag[];
  notes: LeadNote[];
  activities: LeadActivity[];
  nextFollowUpDate?: string;
  followUpHistory: {
    date: string;
    type: 'CALL' | 'WHATSAPP' | 'EMAIL' | 'MEETING';
    notes: string;
    loggedBy: string;
  }[];
}

export interface ClientCheckIn {
  id: string;
  date: string;
  weightKg: number;
  waistCm?: number;
  waistCircumferenceCm?: number;
  bodyFatPercent?: number;
  adherenceScore: number; // 1-10
  clientNotes?: string;
  coachFeedback?: string;
  photosUploaded?: boolean;
}

export interface ClientCoachNote {
  id: string;
  createdAt: string;
  author: string;
  type: 'GENERAL' | 'MACRO_ADJUSTMENT' | 'WORKOUT_CHANGE' | 'CALL_SUMMARY' | 'MILESTONE';
  content: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  joinedDate: string;
  totalSpent: number;
  
  // Status & Membership + Package & Subscription
  status?: 'ACTIVE' | 'ONBOARDING' | 'PAUSED' | 'COMPLETED';
  programTier?: string;
  packageName?: string;
  packageCategory?: string;
  packagePrice?: number;
  assignedCoach?: string;
  startDate?: string;
  endDate?: string;
  paymentStatus?: 'PAID' | 'PARTIALLY_PAID' | 'UNPAID';
  
  // Physical & Biometrics
  age?: number;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  city?: string;
  emergencyContact?: string;
  heightCm?: number;
  startingWeightKg?: number;
  currentWeightKg?: number;
  targetWeightKg?: number;
  targetDate?: string;
  injuriesOrMedicalConditions?: string;
  
  // Nutrition Protocol
  dietGoal: FitnessGoal;
  dietType?: 'VEGAN' | 'VEGETARIAN' | 'EGGETARIAN' | 'NON_VEGETARIAN' | 'JAIN' | 'KETO';
  dailyCalories?: number;
  proteinGrams?: number;
  carbsGrams?: number;
  fatsGrams?: number;
  waterLitres?: number;
  mealsPerDay?: number;
  allergiesOrRestrictions?: string;
  cheatMealProtocol?: string;
  
  // Workout Protocol
  workoutSplit: string;
  trainingDaysPerWeek?: number;
  experienceLevel?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  cardioProtocol?: string;
  strengthBenchmarks?: {
    benchPressKg?: number;
    squatKg?: number;
    deadliftKg?: number;
    overheadPressKg?: number;
  };
  
  // Progress & Interactions
  streakDays: number;
  lastActivity: string;
  activeChallengeId?: string;
  activeChallengeName?: string;
  activeSubscription?: {
    plan: string;
    renewalDate: string;
    status: 'ACTIVE' | 'PAUSED' | 'CANCELLED';
  };
  orderIds: string[];
  checkIns?: ClientCheckIn[];
  coachNotes?: ClientCoachNote[];
  convertedFromLeadId?: string;
  assignedWorkoutPlan?: WorkoutPlan;
  assignedDietPlan?: AdminDietPlan;
}

export type OrderStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED' | 'CANCELLED';

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  productTitle: string;
  productType: 'CHALLENGE' | 'SUBSCRIPTION' | 'COACHING_PASS';
  amount: number;
  currency: string;
  paymentStatus: OrderStatus;
  paymentMethod: 'STRIPE' | 'RAZORPAY' | 'UPI' | 'CARD' | 'MANUAL';
  createdAt: string;
}

export type InvoiceType = 'TAX_INVOICE' | 'PAYMENT_RECEIPT' | 'BILL_OF_SUPPLY';
export type InvoiceStatus = 'PAID' | 'PARTIALLY_PAID' | 'UNPAID' | 'PENDING' | 'OVERDUE' | 'REFUNDED' | 'CANCELLED';

export interface InvoiceItem {
  id: string;
  description: string;
  category?: string;
  quantity: number;
  unitPrice: number;
  discountAmount?: number;
  taxRatePercent?: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  type: InvoiceType;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  
  // Business Info
  businessName: string;
  businessGstin?: string;
  businessPan?: string;
  businessAddress: string;
  businessEmail: string;
  businessPhone: string;
  
  // Customer / Client Info
  clientId?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress?: string;
  clientGstinPan?: string;
  packageName?: string;
  
  // Line Items
  items: InvoiceItem[];
  
  // Financials
  subtotal: number;
  discountTotal: number;
  taxTotal: number;
  totalAmount: number;
  amountPaid?: number;
  outstandingBalance?: number;
  currency: string;
  
  // Payment info
  paymentMethod: 'UPI' | 'RAZORPAY' | 'BANK_TRANSFER' | 'CREDIT_DEBIT_CARD' | 'CASH';
  transactionReference?: string;
  paymentDate?: string;
  
  // Custom Notes
  notes?: string;
  terms?: string;
  createdAt: string;
}

export type SubscriptionStatus = 'ACTIVE' | 'PAUSED' | 'CANCELLED' | 'EXPIRED' | 'PAST_DUE';

export interface Subscription {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  planName: string;
  startDate: string;
  renewalDate: string;
  status: SubscriptionStatus;
  amountPerMonth: number;
}

export interface CMSSection {
  id: string;
  sectionKey: string;
  name: string;
  enabled: boolean;
  order: number;
  heading: string;
  subtitle: string;
  ctaText?: string;
  ctaActionTab?: string;
  secondaryCtaText?: string;
  secondaryCtaActionTab?: string;
  eyebrowText?: string;
  imageUrl?: string;
  badgeText?: string;
  customData?: Record<string, any>;
}

export interface CMSPage {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogImageUrl: string;
  isPublished: boolean;
  lastUpdated: string;
  updatedBy: string;
  sections: CMSSection[];
  revisionHistory?: {
    version: number;
    savedAt: string;
    savedBy: string;
    sections: CMSSection[];
  }[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  excerpt: string;
  content: string;
  author: string;
  category: 'Nutrition' | 'Workout' | 'Weight Loss' | 'Muscle Building' | 'Beginner Fitness' | 'Recipes';
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  status: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'ARCHIVED';
  publishDate: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'GENERAL' | 'NUTRITION' | 'TRAINING' | 'CHALLENGES' | 'MEMBERSHIP';
  order: number;
  isPublished: boolean;
}

export interface MediaItem {
  id: string;
  filename: string;
  title: string;
  url: string;
  fileType: 'IMAGE' | 'VIDEO' | 'EXERCISE_CLIP' | 'DOCUMENT';
  fileSizeMb: number;
  uploadDate: string;
  dimensions?: string;
  usedIn: string[];
}

export interface NavigationItem {
  id: string;
  label: string;
  targetTab: string;
  order: number;
  isHeader: boolean;
  isFooter: boolean;
  isCta?: boolean;
}

export interface SEOConfig {
  siteTitle: string;
  defaultDescription: string;
  canonicalBaseUrl: string;
  defaultOgImage: string;
  twitterHandle: string;
  indexingEnabled: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: AdminRole;
  action: string;
  targetResource: string;
  oldValue?: string;
  newValue?: string;
}

export interface AdminNotification {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  type: 'NEW_LEAD' | 'HOT_LEAD' | 'NEW_PURCHASE' | 'FAILED_PAYMENT' | 'CONTACT_FORM' | 'CHALLENGE_ENROLLMENT' | 'FOLLOW_UP_DUE';
  read: boolean;
  linkSubtab?: string;
}

export interface LeadScoringRules {
  calculatorCompleted: number;
  dietGenerated: number;
  workoutGenerated: number;
  challengeViewed: number;
  pricingViewed: number;
  checkoutStarted: number;
  purchaseCompleted: number;
  contactFormSubmitted: number;
}

export interface CoachingConsentRecord {
  id: string;
  clientName: string;
  clientAge?: string;
  clientPhone: string;
  clientEmail?: string;
  program: '3_MONTHS' | '6_MONTHS' | '9_MONTHS' | '12_MONTHS' | string;
  programPrice: string;
  pauseAllowance: string;
  startDate: string;
  medicalConditions?: string;
  medications?: string;
  allergies?: string;
  injuries?: string;
  emergencyContact?: string;
  emergencyRelationship?: string;
  emergencyPhone?: string;
  declarations?: {
    healthMedical: boolean;
    exerciseRisk: boolean;
    nutritionConsent: boolean;
    clientResponsibilities: boolean;
    strictNoRefund: boolean;
    pausePolicyAccepted: boolean;
    virtualTerms?: boolean;
    proprietaryMaterial?: boolean;
    privacyAcknowledged?: boolean;
  };
  signatureText: string;
  signaturePlace: string;
  signedAt: string;
  status: 'SIGNED' | 'VERIFIED' | 'REVIEWED';
  verifiedAt?: string;
  coachNotes?: string;
  lastSyncedAt?: string;
}

