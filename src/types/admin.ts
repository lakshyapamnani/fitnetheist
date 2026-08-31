import { 
  DietType, 
  CuisineType, 
  FitnessGoal, 
  ActivityLevel, 
  ExperienceLevel, 
  EquipmentType, 
  MealCategory 
} from '../types';

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
  | 'MANUAL_ENTRY';

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

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  joinedDate: string;
  totalSpent: number;
  activeChallengeId?: string;
  activeChallengeName?: string;
  activeSubscription?: {
    plan: string;
    renewalDate: string;
    status: 'ACTIVE' | 'PAUSED' | 'CANCELLED';
  };
  lastActivity: string;
  dietGoal: FitnessGoal;
  workoutSplit: string;
  streakDays: number;
  orderIds: string[];
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
