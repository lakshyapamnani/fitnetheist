export type DietType = 'VEGETARIAN' | 'NON-VEGETARIAN' | 'VEGAN';
export type CuisineType = 'INDIAN' | 'INTERNATIONAL' | 'INDIAN_INTERNATIONAL';
export type MealCategory = 'BREAKFAST' | 'LUNCH' | 'SNACK' | 'DINNER';
export type PriceTier = 'BUDGET' | 'STANDARD' | 'PREMIUM';
export type CookingStyle = 'QUICK' | 'NORMAL' | 'MEAL_PREP';
export type FitnessGoal = 'MAINTAIN' | 'LOSE_WEIGHT' | 'GAIN_WEIGHT' | 'BUILD_MUSCLE' | 'STRENGTH' | 'ENDURANCE';
export type ActivityLevel = 'SEDENTARY' | 'LIGHT' | 'MODERATE' | 'VERY_ACTIVE' | 'EXTRA_ACTIVE';
export type ExperienceLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type EquipmentType = 'NO_EQUIPMENT' | 'DUMBBELLS' | 'HOME_GYM' | 'FULL_GYM';
export type MuscleGroup = 'CHEST' | 'BACK' | 'SHOULDERS' | 'ARMS' | 'LEGS' | 'CORE' | 'FULL_BODY' | 'CARDIO' | 'HIIT' | 'MOBILITY' | 'YOGA';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  age: number;
  sex: 'male' | 'female';
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  goal: FitnessGoal;
  dietType: DietType;
  cuisine: CuisineType;
  mealsPerDay: number;
  foodPreferences: string[];
  foodsToAvoid: string[];
  budget: PriceTier;
  cookingStyle: CookingStyle;
  streakDays: number;
  completedWorkoutsCount: number;
  joinedChallengeId?: string;
  joinedChallengeDay?: number;
}

export interface CalorieResult {
  bmr: number;
  maintenanceCalories: number;
  deficitCalories: number;
  surplusCalories: number;
  currentTargetCalories: number;
  goalMode: 'MAINTAIN' | 'CUT' | 'BULK';
  calorieDifference: number;
  estimatedWeeklyWeightChangeKg: number;
  recommendedProteinGramsMin: number;
  recommendedProteinGramsMax: number;
  recommendedCarbsGrams: number;
  recommendedFatGrams: number;
  safetyWarning?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  serving: string;
  servingGrams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  dietType: DietType;
  cuisine: 'INDIAN' | 'INTERNATIONAL';
  mealCategory: MealCategory;
  priceTier: PriceTier;
  tags?: string[];
}

export interface MealFoodPortion {
  food: FoodItem;
  quantityMultiplier: number;
  displayServing: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface ScheduledMeal {
  id: string;
  category: MealCategory;
  name: string;
  foods: MealFoodPortion[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export interface DayDietPlan {
  dayNumber: number;
  dayName: string;
  meals: ScheduledMeal[];
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFat: number;
}

export interface SevenDayDietPlan {
  id: string;
  createdAt: string;
  targetCalories: number;
  dietType: DietType;
  cuisine: CuisineType;
  mealsPerDay: number;
  days: DayDietPlan[];
}

export interface GroceryItem {
  id: string;
  name: string;
  category: 'PROTEINS' | 'CARBOHYDRATES' | 'VEGETABLES' | 'FRUITS' | 'DAIRY_ALTERNATIVES' | 'PANTRY' | 'OTHER';
  totalQuantity: string;
  checked: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  targetMuscles: string;
  category: MuscleGroup;
  difficulty: ExperienceLevel;
  sets: string;
  reps: string;
  restSeconds: number;
  instructions: string[];
  keyFormTip: string;
  videoThumbnail: string;
  equipment: EquipmentType;
}

export interface WorkoutDay {
  dayName: string;
  focus: string;
  estimatedMinutes: number;
  exercises: {
    exercise: Exercise;
    customSets?: string;
    customReps?: string;
  }[];
}

export interface WorkoutPlan {
  id: string;
  name: string;
  goal: FitnessGoal;
  experience: ExperienceLevel;
  equipment: EquipmentType;
  daysPerWeek: number;
  durationMinutes: number;
  days: WorkoutDay[];
}

export interface Challenge {
  id: string;
  title: string;
  tagline: string;
  durationDays: number;
  difficulty: string;
  goal: string;
  image: string;
  description: string;
  whatIsIncluded: string[];
  workoutOverview: string;
  nutritionOverview: string;
  accountabilityRules: string[];
  price: string;
  badgeName: string;
  enrolledCount: number;
  faqs: { q: string; a: string }[];
  testimonials: { quote: string; author: string; stat: string }[];
}

export interface DailyLog {
  date: string;
  weightKg?: number;
  waterLiters: number;
  caloriesConsumed: number;
  proteinConsumed: number;
  workoutDone: boolean;
  workoutTitle?: string;
  chestCm?: number;
  waistCm?: number;
  armsCm?: number;
  thighsCm?: number;
  notes?: string;
  progressPhotoUrl?: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  timeAgo: string;
  content: string;
  badge?: string;
  likesCount: number;
  hasLiked: boolean;
  commentsCount: number;
  streakCount?: number;
  imageUrl?: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  streakDays: number;
  challengeProgress: string;
  totalWorkouts: number;
  isCurrentUser?: boolean;
}

export interface TransformationStory {
  id: string;
  name: string;
  age: number;
  duration: string;
  category: 'WEIGHT_LOSS' | 'MUSCLE_GAIN' | 'RECOMP';
  statChange: string;
  quote: string;
  beforePhoto: string;
  afterPhoto: string;
  keyStrategy: string;
}

export interface AdminAnalytics {
  totalUsers: number;
  activeUsersToday: number;
  challengeParticipants: number;
  dietsGenerated: number;
  workoutsGenerated: number;
  monthlyRevenueUsd: number;
  conversionRatePercent: number;
}
