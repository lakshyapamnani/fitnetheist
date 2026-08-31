import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  CalorieResult, 
  SevenDayDietPlan, 
  WorkoutPlan, 
  GroceryItem, 
  DailyLog, 
  CommunityPost, 
  LeaderboardEntry, 
  AdminAnalytics,
  DietType,
  CuisineType,
  FitnessGoal,
  ActivityLevel,
  ExperienceLevel,
  EquipmentType,
  ScheduledMeal,
  Challenge,
  FoodItem
} from '../types';
import { FOOD_DATABASE, generateSevenDayDietPlan, generateGroceryList, getMealAlternatives } from '../data/nutritionDatabase';
import { EXERCISE_DATABASE, generateWorkoutPlan } from '../data/workoutDatabase';
import { CHALLENGES_DATA, TRANSFORMATIONS_DATA } from '../data/challengesData';
import { COMMUNITY_POSTS_DATA, LEADERBOARD_DATA, COACH_DATA, PRICING_DATA, INITIAL_ADMIN_ANALYTICS } from '../data/communityData';

interface AppContextType {
  user: UserProfile | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  calorieResult: CalorieResult | null;
  dietPlan: SevenDayDietPlan | null;
  workoutPlan: WorkoutPlan | null;
  groceryList: GroceryItem[];
  dailyLogs: DailyLog[];
  communityPosts: CommunityPost[];
  leaderboard: LeaderboardEntry[];
  challenges: Challenge[];
  foodDatabase: FoodItem[];
  adminAnalytics: AdminAnalytics;
  adminHeroTitle: string;
  adminHeroSubtitle: string;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup' | 'forgot' | 'onboarding';
  selectedChallenge: Challenge | null;
  selectedExerciseCategory: string;
  setSelectedExerciseCategory: (cat: string) => void;
  
  // Actions
  openAuthModal: (mode?: 'login' | 'signup' | 'forgot' | 'onboarding') => void;
  closeAuthModal: () => void;
  loginUser: (email: string, name?: string) => void;
  logoutUser: () => void;
  saveUserProfile: (profile: Partial<UserProfile>) => void;
  calculateAndSetCalories: (
    age: number, 
    sex: 'male' | 'female', 
    heightCm: number, 
    weightKg: number, 
    activity: ActivityLevel, 
    goal: 'MAINTAIN' | 'CUT' | 'BULK'
  ) => CalorieResult;
  generateAndSetDiet: (
    targetCalories: number, 
    dietType: DietType, 
    cuisine: CuisineType, 
    mealsPerDay: number, 
    budget?: string, 
    preferences?: string[], 
    avoidances?: string[]
  ) => SevenDayDietPlan;
  swapDietMeal: (dayIndex: number, mealIndex: number, newMeal: ScheduledMeal) => void;
  generateAndSetWorkout: (
    goal: FitnessGoal, 
    experience: ExperienceLevel, 
    equipment: EquipmentType, 
    daysPerWeek: number, 
    durationMinutes: number
  ) => WorkoutPlan;
  toggleGroceryItemCheck: (id: string) => void;
  enrollInChallenge: (challengeId: string) => void;
  logDailyProgress: (log: Partial<DailyLog>) => void;
  addCommunityPost: (content: string, imageUrl?: string) => void;
  toggleLikeCommunityPost: (postId: string) => void;
  viewChallengeDetails: (challenge: Challenge) => void;
  updateAdminCms: (title: string, subtitle: string) => void;
  addFoodToDatabase: (food: FoodItem) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'forgot' | 'onboarding'>('login');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [selectedExerciseCategory, setSelectedExerciseCategory] = useState<string>('ALL');

  // User Profile
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('fitnetheist_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {
      id: 'usr_default_demo',
      name: 'Alex Mercer',
      email: 'alex.mercer@fitnetheist.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=200&q=80',
      age: 27,
      sex: 'male',
      heightCm: 178,
      weightKg: 78,
      activityLevel: 'MODERATE',
      goal: 'BUILD_MUSCLE',
      dietType: 'NON-VEGETARIAN',
      cuisine: 'INDIAN_INTERNATIONAL',
      mealsPerDay: 4,
      foodPreferences: ['Chicken', 'Oats', 'Eggs', 'Rice', 'Paneer'],
      foodsToAvoid: ['Cilantro'],
      budget: 'STANDARD',
      cookingStyle: 'NORMAL',
      streakDays: 12,
      completedWorkoutsCount: 18,
      joinedChallengeId: 'c_21_day_ignite',
      joinedChallengeDay: 12
    };
  });

  // Calorie & Nutrition State
  const [calorieResult, setCalorieResult] = useState<CalorieResult | null>(() => {
    return {
      bmr: 1770,
      maintenanceCalories: 2550,
      deficitCalories: 2050,
      surplusCalories: 2850,
      currentTargetCalories: 2050,
      goalMode: 'CUT',
      calorieDifference: -500,
      estimatedWeeklyWeightChangeKg: -0.45,
      recommendedProteinGramsMin: 156,
      recommendedProteinGramsMax: 172,
      recommendedCarbsGrams: 205,
      recommendedFatGrams: 55
    };
  });

  const [dietPlan, setDietPlan] = useState<SevenDayDietPlan | null>(() => {
    return generateSevenDayDietPlan(2050, 'NON-VEGETARIAN', 'INDIAN_INTERNATIONAL', 4);
  });

  const [groceryList, setGroceryList] = useState<GroceryItem[]>(() => {
    const initialPlan = generateSevenDayDietPlan(2050, 'NON-VEGETARIAN', 'INDIAN_INTERNATIONAL', 4);
    return generateGroceryList(initialPlan);
  });

  // Workout State
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(() => {
    return generateWorkoutPlan('BUILD_MUSCLE', 'INTERMEDIATE', 'FULL_GYM', 4, 45);
  });

  // Community & Social
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS_DATA);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(LEADERBOARD_DATA);
  const [challenges, setChallenges] = useState<Challenge[]>(CHALLENGES_DATA);
  const [foodDatabase, setFoodDatabase] = useState<FoodItem[]>(FOOD_DATABASE);

  // Admin CMS
  const [adminHeroTitle, setAdminHeroTitle] = useState('BUILD THE BODY. BUILD THE DISCIPLINE.');
  const [adminHeroSubtitle, setAdminHeroSubtitle] = useState('Structured training. Personalized nutrition. Real progress.');
  const [adminAnalytics, setAdminAnalytics] = useState<AdminAnalytics>(INITIAL_ADMIN_ANALYTICS);

  // Daily Activity Logs
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([
    { date: '2026-08-21', weightKg: 79.2, waterLiters: 3.0, caloriesConsumed: 2040, proteinConsumed: 165, workoutDone: true, workoutTitle: 'Upper Strength' },
    { date: '2026-08-22', weightKg: 79.0, waterLiters: 3.2, caloriesConsumed: 2080, proteinConsumed: 160, workoutDone: true, workoutTitle: 'Lower Strength' },
    { date: '2026-08-23', weightKg: 78.8, waterLiters: 2.8, caloriesConsumed: 2010, proteinConsumed: 170, workoutDone: false, workoutTitle: 'Active Recovery' },
    { date: '2026-08-24', weightKg: 78.6, waterLiters: 3.0, caloriesConsumed: 2050, proteinConsumed: 168, workoutDone: true, workoutTitle: 'Push Hypertrophy' },
    { date: '2026-08-25', weightKg: 78.4, waterLiters: 3.4, caloriesConsumed: 2060, proteinConsumed: 162, workoutDone: true, workoutTitle: 'Pull Hypertrophy' },
    { date: '2026-08-26', weightKg: 78.2, waterLiters: 3.0, caloriesConsumed: 2030, proteinConsumed: 165, workoutDone: true, workoutTitle: 'Legs & Core' },
    { date: '2026-08-27', weightKg: 78.0, waterLiters: 2.2, caloriesConsumed: 1850, proteinConsumed: 145, workoutDone: true, workoutTitle: 'Upper Body 45 MIN' }
  ]);

  // Persist user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('fitnetheist_user', JSON.stringify(user));
    }
  }, [user]);

  const openAuthModal = (mode: 'login' | 'signup' | 'forgot' | 'onboarding' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const loginUser = (email: string, name: string = 'Alex Mercer') => {
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name,
      email,
      avatarUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=200&q=80',
      age: user?.age || 26,
      sex: user?.sex || 'male',
      heightCm: user?.heightCm || 178,
      weightKg: user?.weightKg || 78,
      activityLevel: user?.activityLevel || 'MODERATE',
      goal: user?.goal || 'BUILD_MUSCLE',
      dietType: user?.dietType || 'NON-VEGETARIAN',
      cuisine: user?.cuisine || 'INDIAN_INTERNATIONAL',
      mealsPerDay: user?.mealsPerDay || 4,
      foodPreferences: user?.foodPreferences || ['Chicken', 'Rice', 'Oats'],
      foodsToAvoid: user?.foodsToAvoid || [],
      budget: 'STANDARD',
      cookingStyle: 'NORMAL',
      streakDays: user?.streakDays || 12,
      completedWorkoutsCount: user?.completedWorkoutsCount || 18,
      joinedChallengeId: 'c_21_day_ignite',
      joinedChallengeDay: 12
    };
    setUser(newUser);
    closeAuthModal();
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('fitnetheist_user');
  };

  const saveUserProfile = (profile: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...profile };
    setUser(updated);
  };

  // Scientific Mifflin-St Jeor Calorie Calculation Engine
  const calculateAndSetCalories = (
    age: number,
    sex: 'male' | 'female',
    heightCm: number,
    weightKg: number,
    activity: ActivityLevel,
    goal: 'MAINTAIN' | 'CUT' | 'BULK'
  ): CalorieResult => {
    // Mifflin-St Jeor formula:
    // Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5
    // Women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161
    const baseBmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + (sex === 'male' ? 5 : -161);
    const bmr = Math.round(baseBmr);

    const activityMultipliers: Record<ActivityLevel, number> = {
      SEDENTARY: 1.2,      // Desk job, little to no exercise
      LIGHT: 1.375,        // Light exercise 1-3 days/wk
      MODERATE: 1.55,      // Moderate exercise 3-5 days/wk
      VERY_ACTIVE: 1.725,  // Heavy training 6-7 days/wk
      EXTRA_ACTIVE: 1.9    // Intense daily athletics/physical labor
    };

    const maintenance = Math.round(bmr * (activityMultipliers[activity] || 1.55));
    
    // Sensible scientific deficit (-20% or ~500 kcal) & surplus (+12% or ~300-350 kcal)
    let deficit = Math.round(maintenance - 500);
    let surplus = Math.round(maintenance + 350);

    // Safeguards
    const minSafeKcal = sex === 'male' ? 1500 : 1200;
    let safetyWarning: string | undefined;
    if (deficit < minSafeKcal) {
      deficit = minSafeKcal;
      safetyWarning = `Target adjusted upward to minimum safe threshold (${minSafeKcal} kcal).`;
    }

    let currentTarget = maintenance;
    let calorieDiff = 0;
    let weeklyRateKg = 0;

    if (goal === 'CUT') {
      currentTarget = deficit;
      calorieDiff = deficit - maintenance;
      weeklyRateKg = -0.45;
    } else if (goal === 'BULK') {
      currentTarget = surplus;
      calorieDiff = surplus - maintenance;
      weeklyRateKg = +0.25;
    }

    // Recommended Protein: 1.8g - 2.2g per kg bodyweight
    const proteinMin = Math.round(weightKg * 1.8);
    const proteinMax = Math.round(weightKg * 2.2);

    // Macro splits based on remaining calories
    const proteinCalories = proteinMin * 4;
    const fatCalories = Math.round(currentTarget * 0.25);
    const fatGrams = Math.round(fatCalories / 9);
    const remainingCarbCalories = Math.max(100, currentTarget - proteinCalories - fatCalories);
    const carbsGrams = Math.round(remainingCarbCalories / 4);

    const result: CalorieResult = {
      bmr,
      maintenanceCalories: maintenance,
      deficitCalories: deficit,
      surplusCalories: surplus,
      currentTargetCalories: currentTarget,
      goalMode: goal,
      calorieDifference: calorieDiff,
      estimatedWeeklyWeightChangeKg: weeklyRateKg,
      recommendedProteinGramsMin: proteinMin,
      recommendedProteinGramsMax: proteinMax,
      recommendedCarbsGrams: carbsGrams,
      recommendedFatGrams: fatGrams,
      safetyWarning
    };

    setCalorieResult(result);
    return result;
  };

  const generateAndSetDiet = (
    targetCalories: number,
    dietType: DietType,
    cuisine: CuisineType,
    mealsPerDay: number,
    budget: string = 'STANDARD',
    preferences: string[] = [],
    avoidances: string[] = []
  ): SevenDayDietPlan => {
    const newPlan = generateSevenDayDietPlan(
      targetCalories,
      dietType,
      cuisine,
      mealsPerDay,
      budget,
      preferences,
      avoidances
    );
    setDietPlan(newPlan);
    setGroceryList(generateGroceryList(newPlan));
    
    // Update admin stats
    setAdminAnalytics(prev => ({
      ...prev,
      dietsGenerated: prev.dietsGenerated + 1
    }));

    return newPlan;
  };

  const swapDietMeal = (dayIndex: number, mealIndex: number, newMeal: ScheduledMeal) => {
    if (!dietPlan) return;
    const updatedDays = [...dietPlan.days];
    const dayToUpdate = { ...updatedDays[dayIndex] };
    const updatedMeals = [...dayToUpdate.meals];
    
    updatedMeals[mealIndex] = newMeal;
    dayToUpdate.meals = updatedMeals;
    
    // Recalculate daily totals
    dayToUpdate.dailyCalories = updatedMeals.reduce((sum, m) => sum + m.totalCalories, 0);
    dayToUpdate.dailyProtein = updatedMeals.reduce((sum, m) => sum + m.totalProtein, 0);
    dayToUpdate.dailyCarbs = updatedMeals.reduce((sum, m) => sum + m.totalCarbs, 0);
    dayToUpdate.dailyFat = updatedMeals.reduce((sum, m) => sum + m.totalFat, 0);

    updatedDays[dayIndex] = dayToUpdate;
    const updatedPlan: SevenDayDietPlan = {
      ...dietPlan,
      days: updatedDays
    };

    setDietPlan(updatedPlan);
    setGroceryList(generateGroceryList(updatedPlan));
  };

  const generateAndSetWorkout = (
    goal: FitnessGoal,
    experience: ExperienceLevel,
    equipment: EquipmentType,
    daysPerWeek: number,
    durationMinutes: number
  ): WorkoutPlan => {
    const plan = generateWorkoutPlan(goal, experience, equipment, daysPerWeek, durationMinutes);
    setWorkoutPlan(plan);

    setAdminAnalytics(prev => ({
      ...prev,
      workoutsGenerated: prev.workoutsGenerated + 1
    }));

    return plan;
  };

  const toggleGroceryItemCheck = (id: string) => {
    setGroceryList(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const enrollInChallenge = (challengeId: string) => {
    if (user) {
      setUser({
        ...user,
        joinedChallengeId: challengeId,
        joinedChallengeDay: 1
      });
    }
    setAdminAnalytics(prev => ({
      ...prev,
      challengeParticipants: prev.challengeParticipants + 1
    }));
  };

  const logDailyProgress = (log: Partial<DailyLog>) => {
    const today = new Date().toISOString().split('T')[0];
    setDailyLogs(prev => {
      const existingIdx = prev.findIndex(l => l.date === today);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = { ...updated[existingIdx], ...log };
        return updated;
      } else {
        return [
          ...prev,
          {
            date: today,
            waterLiters: log.waterLiters || 2.5,
            caloriesConsumed: log.caloriesConsumed || 2050,
            proteinConsumed: log.proteinConsumed || 155,
            workoutDone: log.workoutDone !== undefined ? log.workoutDone : true,
            weightKg: log.weightKg || user?.weightKg || 78,
            ...log
          }
        ];
      }
    });

    if (user && log.workoutDone) {
      setUser(prev => prev ? {
        ...prev,
        completedWorkoutsCount: prev.completedWorkoutsCount + 1,
        streakDays: prev.streakDays + 1
      } : null);
    }
  };

  const addCommunityPost = (content: string, imageUrl?: string) => {
    if (!user) {
      openAuthModal('signup');
      return;
    }
    const newPost: CommunityPost = {
      id: `post_${Date.now()}`,
      authorName: user.name,
      authorHandle: `@${user.name.toLowerCase().replace(/\s+/g, '')}`,
      authorAvatar: user.avatarUrl || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=200&q=80',
      timeAgo: 'Just now',
      content,
      badge: user.joinedChallengeId ? 'CHALLENGE ATHLETE' : 'COMMUNITY ATHLETE',
      likesCount: 1,
      hasLiked: true,
      commentsCount: 0,
      streakCount: user.streakDays,
      imageUrl
    };

    setCommunityPosts([newPost, ...communityPosts]);
  };

  const toggleLikeCommunityPost = (postId: string) => {
    setCommunityPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          hasLiked: !p.hasLiked,
          likesCount: p.hasLiked ? p.likesCount - 1 : p.likesCount + 1
        };
      }
      return p;
    }));
  };

  const viewChallengeDetails = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setActiveTab('challenges');
  };

  const updateAdminCms = (title: string, subtitle: string) => {
    setAdminHeroTitle(title);
    setAdminHeroSubtitle(subtitle);
  };

  const addFoodToDatabase = (food: FoodItem) => {
    setFoodDatabase(prev => [food, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      user,
      activeTab,
      setActiveTab,
      calorieResult,
      dietPlan,
      workoutPlan,
      groceryList,
      dailyLogs,
      communityPosts,
      leaderboard,
      challenges,
      foodDatabase,
      adminAnalytics,
      adminHeroTitle,
      adminHeroSubtitle,
      isAuthModalOpen,
      authModalMode,
      selectedChallenge,
      selectedExerciseCategory,
      setSelectedExerciseCategory,
      openAuthModal,
      closeAuthModal,
      loginUser,
      logoutUser,
      saveUserProfile,
      calculateAndSetCalories,
      generateAndSetDiet,
      swapDietMeal,
      generateAndSetWorkout,
      toggleGroceryItemCheck,
      enrollInChallenge,
      logDailyProgress,
      addCommunityPost,
      toggleLikeCommunityPost,
      viewChallengeDetails,
      updateAdminCms,
      addFoodToDatabase
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
