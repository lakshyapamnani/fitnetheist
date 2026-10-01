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
  FoodItem,
  Exercise,
  TransformationStory
} from '../types';
import { FOOD_DATABASE, generateSevenDayDietPlan, generateGroceryList, getMealAlternatives } from '../data/nutritionDatabase';
import { EXERCISE_DATABASE, generateWorkoutPlan } from '../data/workoutDatabase';
import { CHALLENGES_DATA, TRANSFORMATIONS_DATA } from '../data/challengesData';
import { COMMUNITY_POSTS_DATA, LEADERBOARD_DATA, COACH_DATA, PRICING_DATA, INITIAL_ADMIN_ANALYTICS } from '../data/communityData';
import { getProfile, saveProfile, updateProfile } from '../services/profileStorage';
import { 
  auth, 
  db, 
  signInWithGoogle, 
  signInWithEmail, 
  registerWithEmail, 
  logoutFirebase, 
  onAuthChange, 
  syncUserDataToRealtimeDb, 
  getUserDataFromRealtimeDb,
  getSavedFirebaseConfig,
  saveLeadToRealtimeDb,
  saveDietPlanToRealtimeDb,
  saveWorkoutPlanToRealtimeDb,
  saveCalorieCalculationToRealtimeDb,
  saveDailyLogToRealtimeDb,
  listenToUserDailyLogs,
  saveCommunityPostToRealtimeDb,
  listenToCommunityPosts,
  saveSingleExerciseToRealtimeDb,
  deleteSingleExerciseFromRealtimeDb,
  listenToRealtimeExercises,
  saveSingleFoodToRealtimeDb,
  deleteSingleFoodFromRealtimeDb,
  listenToRealtimeFoods
} from '../services/firebase';

export interface PendingAthleteDetails {
  source: 'CALORIE_CALCULATOR' | 'DIET_PLAN' | 'WORKOUT_PLAN' | 'PROFILE_SETUP';
  title?: string;
  summaryText?: string;
  calorieResult?: CalorieResult;
  userMetrics?: Partial<UserProfile>;
  dietPlan?: SevenDayDietPlan;
  workoutPlan?: WorkoutPlan;
  timestamp: number;
}

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
  exercises: Exercise[];
  transformations: TransformationStory[];
  adminAnalytics: AdminAnalytics;
  adminHeroTitle: string;
  adminHeroSubtitle: string;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup' | 'forgot' | 'onboarding';
  authPromptReason: string | null;
  pendingAthleteDetails: PendingAthleteDetails | null;
  setPendingAthleteDetails: (details: PendingAthleteDetails | null) => void;
  selectedChallenge: Challenge | null;
  selectedExerciseCategory: string;
  setSelectedExerciseCategory: (cat: string) => void;
  
  // Firebase state & helpers
  isFirebaseConnected: boolean;
  isFirebaseModalOpen: boolean;
  openFirebaseConfigModal: () => void;
  closeFirebaseModal: () => void;
  loginWithGoogle: (phone?: string) => Promise<void>;

  // Calorie Feature Popup
  isCalorieModalOpen: boolean;
  openCalorieModal: () => void;
  closeCalorieModal: () => void;

  // Actions
  openAuthModal: (mode?: 'login' | 'signup' | 'forgot' | 'onboarding', promptReason?: string) => void;
  closeAuthModal: () => void;
  loginUser: (email: string, password?: string, name?: string, phone?: string) => Promise<void>;
  signupUser: (name: string, email: string, password?: string, profile?: Partial<UserProfile>, phone?: string) => Promise<void>;
  logoutUser: () => void;
  saveUserProfile: (profile: Partial<UserProfile>) => void;
  calculateAndSetCalories: (
    age: number, 
    sex: 'male' | 'female', 
    heightCm: number, 
    weightKg: number, 
    activity: ActivityLevel, 
    goal: 'MAINTAIN' | 'CUT' | 'BULK',
    options?: { triggeredByUserAction?: boolean }
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
  deleteFoodFromDatabase: (id: string) => void;
  addExercise: (exercise: Exercise) => void;
  updateExercise: (id: string, updates: Partial<Exercise>) => void;
  deleteExercise: (id: string) => void;
  addChallenge: (challenge: Challenge) => void;
  updateChallenge: (id: string, updates: Partial<Challenge>) => void;
  deleteChallenge: (id: string) => void;
  addTransformation: (story: TransformationStory) => void;
  deleteTransformation: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const getTabFromLocation = (): string => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);
  const tabParam = searchParams.get('tab')?.toLowerCase();
  const hash = window.location.hash.replace(/^#/, '').toLowerCase();

  const candidate = tabParam || path || hash;
  if (candidate) {
    if (['admin', 'dashboard', 'tools', 'calculate', 'nutrition', 'train', 'challenges', 'transform', 'community', 'coach', 'pricing', 'plan', 'progress', 'me', 'results'].includes(candidate)) {
      if (candidate === 'results') return 'progress';
      if (candidate === 'dashboard') return 'me';
      return candidate;
    }
  }
  return 'home';
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [activeTab, setActiveTabState] = useState<string>(() => getTabFromLocation());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      try {
        const url = new URL(window.location.href);
        if (tab === 'home') {
          url.searchParams.delete('tab');
          if (url.pathname !== '/') {
            window.history.pushState({}, '', '/' + (url.search ? url.search : ''));
          } else {
            window.history.pushState({}, '', url.toString());
          }
        } else {
          url.searchParams.set('tab', tab);
          window.history.pushState({}, '', url.toString());
        }
      } catch {
        // Fallback for restricted iframe environments
      }
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const tab = getTabFromLocation();
      setActiveTabState(tab);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'forgot' | 'onboarding'>('login');
  const [authPromptReason, setAuthPromptReason] = useState<string | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [selectedExerciseCategory, setSelectedExerciseCategory] = useState<string>('ALL');

  // Firebase Realtime DB & Config State
  const [isFirebaseModalOpen, setIsFirebaseModalOpen] = useState(false);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(() => {
    const cfg = getSavedFirebaseConfig();
    return Boolean(cfg.apiKey && (cfg.databaseURL || cfg.projectId));
  });

  const openFirebaseConfigModal = () => setIsFirebaseModalOpen(true);
  const closeFirebaseModal = () => {
    const cfg = getSavedFirebaseConfig();
    setIsFirebaseConnected(Boolean(cfg.apiKey && (cfg.databaseURL || cfg.projectId)));
    setIsFirebaseModalOpen(false);
  };

  // Calorie Feature Popup Modal State
  const [isCalorieModalOpen, setIsCalorieModalOpen] = useState<boolean>(false);
  const openCalorieModal = () => setIsCalorieModalOpen(true);
  const closeCalorieModal = () => setIsCalorieModalOpen(false);

  // User Profile
  const [user, setUser] = useState<UserProfile | null>(() => {
    return getProfile();
  });

  // Pending athlete details buffer (e.g. from unauthenticated calorie calculation or diet generation)
  const [pendingAthleteDetails, setPendingAthleteDetailsState] = useState<PendingAthleteDetails | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem('fitnetheist_pending_details');
        if (stored) return JSON.parse(stored);
      } catch {}
    }
    return null;
  });

  const setPendingAthleteDetails = (details: PendingAthleteDetails | null) => {
    setPendingAthleteDetailsState(details);
    if (typeof window !== 'undefined') {
      try {
        if (details) {
          sessionStorage.setItem('fitnetheist_pending_details', JSON.stringify(details));
        } else {
          sessionStorage.removeItem('fitnetheist_pending_details');
        }
      } catch {}
    }
  };

  // Auto-prompt visitor to use the calorie calculator feature after a brief initial pause
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const alreadyShown = sessionStorage.getItem('fitnetheist_calorie_popup_shown');
      if (!user && !alreadyShown) {
        const timer = setTimeout(() => {
          setIsCalorieModalOpen(true);
          sessionStorage.setItem('fitnetheist_calorie_popup_shown', 'true');
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [user]);

  // Listen for Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthChange(async (fbUser) => {
      if (fbUser) {
        setIsFirebaseConnected(true);
        try {
          const remoteData = await getUserDataFromRealtimeDb(fbUser.uid);
          if (remoteData?.profile) {
            setUser(remoteData.profile);
            saveProfile(remoteData.profile);
            if (remoteData.calorieResult) setCalorieResult(remoteData.calorieResult);
            if (remoteData.dietPlan) setDietPlan(remoteData.dietPlan);
            if (remoteData.workoutPlan) setWorkoutPlan(remoteData.workoutPlan);
          }
        } catch (err) {
          console.warn('Could not sync user from Realtime DB:', err);
        }
      }
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

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
  const [exercises, setExercises] = useState<Exercise[]>(() => {
    try {
      const saved = localStorage.getItem('fitnetheist_exercises_lib');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return EXERCISE_DATABASE;
  });

  // Persist exercises to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fitnetheist_exercises_lib', JSON.stringify(exercises));
    } catch {}
  }, [exercises]);

  // Realtime Database sync listeners for Exercises, Foods, and Community
  useEffect(() => {
    const unsubEx = listenToRealtimeExercises((remoteExercises) => {
      if (Array.isArray(remoteExercises) && remoteExercises.length > 0) {
        setExercises(prev => {
          const map = new Map<string, Exercise>();
          (prev || []).forEach(ex => { if (ex && ex.id) map.set(ex.id, ex); });
          remoteExercises.forEach(rex => { if (rex && rex.id) map.set(rex.id, { ...map.get(rex.id), ...rex }); });
          return Array.from(map.values());
        });
      }
    });

    const unsubFoods = listenToRealtimeFoods((remoteFoods) => {
      if (Array.isArray(remoteFoods) && remoteFoods.length > 0) {
        setFoodDatabase(prev => {
          const map = new Map<string, FoodItem>();
          (prev || []).forEach(f => { if (f && f.id) map.set(f.id, f); });
          remoteFoods.forEach(rf => { if (rf && rf.id) map.set(rf.id, { ...map.get(rf.id), ...rf }); });
          return Array.from(map.values());
        });
      }
    });

    const unsubPosts = listenToCommunityPosts((remotePosts) => {
      if (Array.isArray(remotePosts) && remotePosts.length > 0) {
        setCommunityPosts(prev => {
          const map = new Map<string, CommunityPost>();
          (prev || []).forEach(p => { if (p && p.id) map.set(p.id, p); });
          remotePosts.forEach(rp => { if (rp && rp.id) map.set(rp.id, { ...map.get(rp.id), ...rp }); });
          return Array.from(map.values());
        });
      }
    });

    return () => {
      unsubEx();
      unsubFoods();
      unsubPosts();
    };
  }, []);
  const [transformations, setTransformations] = useState<TransformationStory[]>(TRANSFORMATIONS_DATA);

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

  const openAuthModal = (mode: 'login' | 'signup' | 'forgot' | 'onboarding' = 'login', promptReason?: string) => {
    setAuthModalMode(mode);
    setAuthPromptReason(promptReason || null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthPromptReason(null);
  };

  const loginWithGoogle = async (phone?: string) => {
    try {
      const cred = await signInWithGoogle();
      const fbUser = cred.user;

      const remoteData = await getUserDataFromRealtimeDb(fbUser.uid);
      let finalProfile: UserProfile;

      if (remoteData?.profile) {
        finalProfile = {
          ...remoteData.profile,
          phone: phone || remoteData.profile.phone || user?.phone || '',
          ...(pendingAthleteDetails?.userMetrics || {})
        };
      } else {
        finalProfile = {
          id: fbUser.uid,
          name: fbUser.displayName || 'Alex Mercer',
          email: fbUser.email || 'athlete@fitnetheist.com',
          phone: phone || user?.phone || '',
          avatarUrl: fbUser.photoURL || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=200&q=80',
          age: pendingAthleteDetails?.userMetrics?.age || 26,
          sex: pendingAthleteDetails?.userMetrics?.sex || 'male',
          heightCm: pendingAthleteDetails?.userMetrics?.heightCm || 178,
          weightKg: pendingAthleteDetails?.userMetrics?.weightKg || 78,
          activityLevel: pendingAthleteDetails?.userMetrics?.activityLevel || 'MODERATE',
          goal: pendingAthleteDetails?.userMetrics?.goal || 'BUILD_MUSCLE',
          dietType: pendingAthleteDetails?.userMetrics?.dietType || 'NON-VEGETARIAN',
          cuisine: pendingAthleteDetails?.userMetrics?.cuisine || 'INDIAN_INTERNATIONAL',
          mealsPerDay: pendingAthleteDetails?.userMetrics?.mealsPerDay || 4,
          foodPreferences: ['Chicken', 'Rice', 'Oats'],
          foodsToAvoid: [],
          budget: 'STANDARD',
          cookingStyle: 'NORMAL',
          streakDays: 1,
          completedWorkoutsCount: 0,
          joinedChallengeId: 'c_21_day_ignite',
          joinedChallengeDay: 1
        };
      }

      const finalCalorie = pendingAthleteDetails?.calorieResult || remoteData?.calorieResult || calorieResult;
      const finalDiet = pendingAthleteDetails?.dietPlan || remoteData?.dietPlan || dietPlan;
      const finalWorkout = pendingAthleteDetails?.workoutPlan || remoteData?.workoutPlan || workoutPlan;

      setUser(finalProfile);
      saveProfile(finalProfile);
      if (finalCalorie) setCalorieResult(finalCalorie);
      if (finalDiet) setDietPlan(finalDiet);
      if (finalWorkout) setWorkoutPlan(finalWorkout);

      await syncUserDataToRealtimeDb(fbUser.uid, {
        profile: finalProfile,
        calorieResult: finalCalorie,
        dietPlan: finalDiet,
        workoutPlan: finalWorkout
      });

      // Feed into Leads in Firebase Realtime Database
      const leadPayload = {
        id: `lead_${fbUser.uid}`,
        name: finalProfile.name,
        email: finalProfile.email,
        phone: finalProfile.phone || phone || 'Pending phone number',
        source: 'LOGIN_PORTAL' as const,
        goal: finalProfile.goal,
        dietType: finalProfile.dietType,
        preferredCuisine: finalProfile.cuisine,
        age: finalProfile.age,
        sex: finalProfile.sex,
        heightCm: finalProfile.heightCm,
        weightKg: finalProfile.weightKg,
        calculatedCalories: finalCalorie?.totalCalories || undefined,
        status: 'NEW',
        createdAt: new Date().toISOString(),
        estimatedValue: 149,
        score: 85,
        scoreClassification: 'HOT',
        assignedTo: 'Vikram Mehta (Sales Lead)',
        tags: ['HOT', 'LOGIN_PORTAL'],
        activities: [
          {
            id: `act_${Date.now()}`,
            timestamp: new Date().toISOString(),
            type: 'CREATED',
            description: `Lead authenticated via Google Sign-In with Mobile: ${finalProfile.phone || 'N/A'}`,
            performedBy: 'SYSTEM_BOT'
          }
        ]
      };
      await saveLeadToRealtimeDb(leadPayload);

      // Save to local leads cache
      try {
        const savedLeads = JSON.parse(localStorage.getItem('fitnetheist_crm_leads') || '[]');
        const filtered = Array.isArray(savedLeads) ? savedLeads.filter((l: any) => l.id !== leadPayload.id) : [];
        localStorage.setItem('fitnetheist_crm_leads', JSON.stringify([leadPayload, ...filtered]));
      } catch (e) {}

      setPendingAthleteDetails(null);
      closeAuthModal();
    } catch (err) {
      console.error('Google Sign-In notice:', err);
      throw err;
    }
  };

  const loginUser = async (email: string, password?: string, name: string = 'Alex Mercer', phone?: string) => {
    let uid = `usr_${Date.now()}`;
    if (password) {
      try {
        const cred = await signInWithEmail(email, password);
        if (cred?.user?.uid) uid = cred.user.uid;
      } catch (err) {
        console.warn('Firebase login notice, proceeding with session:', err);
      }
    }

    const newUser: UserProfile = {
      id: uid,
      name: name || email.split('@')[0] || 'Alex Mercer',
      email,
      phone: phone || user?.phone || '',
      avatarUrl: user?.avatarUrl || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=200&q=80',
      age: pendingAthleteDetails?.userMetrics?.age || user?.age || 26,
      sex: pendingAthleteDetails?.userMetrics?.sex || user?.sex || 'male',
      heightCm: pendingAthleteDetails?.userMetrics?.heightCm || user?.heightCm || 178,
      weightKg: pendingAthleteDetails?.userMetrics?.weightKg || user?.weightKg || 78,
      activityLevel: pendingAthleteDetails?.userMetrics?.activityLevel || user?.activityLevel || 'MODERATE',
      goal: pendingAthleteDetails?.userMetrics?.goal || user?.goal || 'BUILD_MUSCLE',
      dietType: pendingAthleteDetails?.userMetrics?.dietType || user?.dietType || 'NON-VEGETARIAN',
      cuisine: pendingAthleteDetails?.userMetrics?.cuisine || user?.cuisine || 'INDIAN_INTERNATIONAL',
      mealsPerDay: pendingAthleteDetails?.userMetrics?.mealsPerDay || user?.mealsPerDay || 4,
      foodPreferences: user?.foodPreferences || ['Chicken', 'Rice', 'Oats'],
      foodsToAvoid: user?.foodsToAvoid || [],
      budget: 'STANDARD',
      cookingStyle: 'NORMAL',
      streakDays: user?.streakDays || 12,
      completedWorkoutsCount: user?.completedWorkoutsCount || 18,
      joinedChallengeId: 'c_21_day_ignite',
      joinedChallengeDay: 12
    };

    const finalCalorie = pendingAthleteDetails?.calorieResult || calorieResult;
    const finalDiet = pendingAthleteDetails?.dietPlan || dietPlan;
    const finalWorkout = pendingAthleteDetails?.workoutPlan || workoutPlan;

    setUser(newUser);
    saveProfile(newUser);
    if (finalCalorie) setCalorieResult(finalCalorie);
    if (finalDiet) setDietPlan(finalDiet);
    if (finalWorkout) setWorkoutPlan(finalWorkout);

    await syncUserDataToRealtimeDb(newUser.id, {
      profile: newUser,
      calorieResult: finalCalorie,
      dietPlan: finalDiet,
      workoutPlan: finalWorkout
    });

    // Feed into Leads in Firebase Realtime Database
    const leadPayload = {
      id: `lead_${newUser.id}`,
      name: newUser.name,
      email: newUser.email,
      phone: phone || newUser.phone || 'Pending phone number',
      source: 'LOGIN_PORTAL' as const,
      goal: newUser.goal,
      dietType: newUser.dietType,
      preferredCuisine: newUser.cuisine,
      age: newUser.age,
      sex: newUser.sex,
      heightCm: newUser.heightCm,
      weightKg: newUser.weightKg,
      calculatedCalories: finalCalorie?.totalCalories || undefined,
      status: 'NEW',
      createdAt: new Date().toISOString(),
      estimatedValue: 149,
      score: 85,
      scoreClassification: 'HOT',
      assignedTo: 'Vikram Mehta (Sales Lead)',
      tags: ['HOT', 'LOGIN_PORTAL'],
      activities: [
        {
          id: `act_${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: 'CREATED',
          description: `Lead logged in via User Auth Portal with Mobile: ${phone || newUser.phone || 'N/A'}`,
          performedBy: 'SYSTEM_BOT'
        }
      ]
    };
    await saveLeadToRealtimeDb(leadPayload);

    // Save to local leads cache
    try {
      const savedLeads = JSON.parse(localStorage.getItem('fitnetheist_crm_leads') || '[]');
      const filtered = Array.isArray(savedLeads) ? savedLeads.filter((l: any) => l.id !== leadPayload.id) : [];
      localStorage.setItem('fitnetheist_crm_leads', JSON.stringify([leadPayload, ...filtered]));
    } catch (e) {}

    setPendingAthleteDetails(null);
    closeAuthModal();
  };

  const signupUser = async (
    name: string,
    email: string,
    password?: string,
    profile?: Partial<UserProfile>,
    phone?: string
  ) => {
    let uid = `usr_${Date.now()}`;
    if (password) {
      try {
        const cred = await registerWithEmail(email, password);
        if (cred?.user?.uid) uid = cred.user.uid;
      } catch (err) {
        console.warn('Firebase register notice, proceeding with session:', err);
      }
    }

    const mergedMetrics = {
      ...profile,
      ...(pendingAthleteDetails?.userMetrics || {})
    };

    const newUser: UserProfile = {
      id: uid,
      name: name || 'Alex Mercer',
      email: email || 'alex.mercer@fitnetheist.com',
      phone: phone || profile?.phone || '',
      avatarUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=200&q=80',
      age: mergedMetrics.age || 26,
      sex: mergedMetrics.sex || 'male',
      heightCm: mergedMetrics.heightCm || 178,
      weightKg: mergedMetrics.weightKg || 78,
      activityLevel: mergedMetrics.activityLevel || 'MODERATE',
      goal: mergedMetrics.goal || 'BUILD_MUSCLE',
      dietType: mergedMetrics.dietType || 'NON-VEGETARIAN',
      cuisine: mergedMetrics.cuisine || 'INDIAN_INTERNATIONAL',
      mealsPerDay: mergedMetrics.mealsPerDay || 4,
      foodPreferences: profile?.foodPreferences || ['Chicken', 'Rice', 'Oats', 'Paneer'],
      foodsToAvoid: profile?.foodsToAvoid || [],
      budget: profile?.budget || 'STANDARD',
      cookingStyle: profile?.cookingStyle || 'NORMAL',
      streakDays: 1,
      completedWorkoutsCount: 0,
      joinedChallengeId: profile?.joinedChallengeId || 'c_21_day_ignite',
      joinedChallengeDay: 1
    };

    const finalCalorie = pendingAthleteDetails?.calorieResult || calorieResult;
    const finalDiet = pendingAthleteDetails?.dietPlan || dietPlan;
    const finalWorkout = pendingAthleteDetails?.workoutPlan || workoutPlan;

    setUser(newUser);
    saveProfile(newUser);
    if (finalCalorie) setCalorieResult(finalCalorie);
    if (finalDiet) setDietPlan(finalDiet);
    if (finalWorkout) setWorkoutPlan(finalWorkout);

    await syncUserDataToRealtimeDb(newUser.id, {
      profile: newUser,
      calorieResult: finalCalorie,
      dietPlan: finalDiet,
      workoutPlan: finalWorkout
    });

    // Feed into Leads in Firebase Realtime Database
    const leadPayload = {
      id: `lead_${newUser.id}`,
      name: newUser.name,
      email: newUser.email,
      phone: phone || newUser.phone || 'Pending phone number',
      source: 'SIGNUP' as const,
      goal: newUser.goal,
      dietType: newUser.dietType,
      preferredCuisine: newUser.cuisine,
      age: newUser.age,
      sex: newUser.sex,
      heightCm: newUser.heightCm,
      weightKg: newUser.weightKg,
      calculatedCalories: finalCalorie?.totalCalories || undefined,
      status: 'NEW',
      createdAt: new Date().toISOString(),
      estimatedValue: 149,
      score: 90,
      scoreClassification: 'HOT',
      assignedTo: 'Vikram Mehta (Sales Lead)',
      tags: ['HOT', 'SIGNUP'],
      activities: [
        {
          id: `act_${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: 'CREATED',
          description: `New athlete enrolled via Signup Portal with Mobile: ${phone || newUser.phone || 'N/A'}`,
          performedBy: 'SYSTEM_BOT'
        }
      ]
    };
    await saveLeadToRealtimeDb(leadPayload);

    // Save to local leads cache
    try {
      const savedLeads = JSON.parse(localStorage.getItem('fitnetheist_crm_leads') || '[]');
      const filtered = Array.isArray(savedLeads) ? savedLeads.filter((l: any) => l.id !== leadPayload.id) : [];
      localStorage.setItem('fitnetheist_crm_leads', JSON.stringify([leadPayload, ...filtered]));
    } catch (e) {}

    setPendingAthleteDetails(null);
    closeAuthModal();
  };

  const logoutUser = () => {
    logoutFirebase().catch(() => {});
    setUser(null);
    localStorage.removeItem('fitnetheist_user');
  };

  const saveUserProfile = (profileUpdates: Partial<UserProfile>) => {
    const updated = updateProfile(profileUpdates);
    setUser(updated);

    if (user?.id) {
      syncUserDataToRealtimeDb(user.id, {
        profile: updated
      });
    }

    // Auto-recalculate calories and macros based on updated profile
    const goalMode: 'MAINTAIN' | 'CUT' | 'BULK' = 
      (updated.goal === 'LOSE_WEIGHT' || (updated.goal as string) === 'CUT')
        ? 'CUT'
        : (updated.goal === 'GAIN_WEIGHT' || updated.goal === 'BUILD_MUSCLE' || (updated.goal as string) === 'BULK')
          ? 'BULK'
          : 'MAINTAIN';

    calculateAndSetCalories(
      updated.age,
      updated.sex,
      updated.heightCm,
      updated.weightKg,
      updated.activityLevel,
      goalMode
    );
  };

  // Scientific Mifflin-St Jeor Calorie Calculation Engine
  const calculateAndSetCalories = (
    age: number,
    sex: 'male' | 'female',
    heightCm: number,
    weightKg: number,
    activity: ActivityLevel,
    goal: 'MAINTAIN' | 'CUT' | 'BULK',
    options?: { triggeredByUserAction?: boolean }
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

    // If user is already logged in, update profile and sync to Realtime DB
    if (user) {
      const updated = updateProfile({
        age,
        sex,
        heightCm,
        weightKg,
        activityLevel: activity,
        goal: goal === 'CUT' ? 'LOSE_WEIGHT' : goal === 'BULK' ? 'GAIN_WEIGHT' : 'MAINTAIN'
      });
      setUser(updated);
      syncUserDataToRealtimeDb(user.id, {
        profile: updated,
        calorieResult: result
      });
    } else if (options?.triggeredByUserAction) {
      // User is not logged in yet: manage & buffer state of details, then prompt login
      const pending: PendingAthleteDetails = {
        source: 'CALORIE_CALCULATOR',
        title: 'Calorie & Macro Blueprint',
        summaryText: `${result.currentTargetCalories} kcal (${goal}) · ${proteinMin}g Protein · ${weightKg}kg athlete`,
        calorieResult: result,
        userMetrics: {
          age,
          sex,
          heightCm,
          weightKg,
          activityLevel: activity,
          goal: goal === 'CUT' ? 'LOSE_WEIGHT' : goal === 'BULK' ? 'GAIN_WEIGHT' : 'MAINTAIN'
        },
        timestamp: Date.now()
      };
      setPendingAthleteDetails(pending);
      openAuthModal('login', `Your targets (${result.currentTargetCalories} kcal · ${proteinMin}g protein) have been calculated! Sign in to save your targets to your account.`);
    }

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
    
    // Sync to Realtime Database
    if (user?.id) {
      saveDietPlanToRealtimeDb(user.id, newPlan);
    } else {
      saveDietPlanToRealtimeDb('guest_session', newPlan);
    }

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

    if (user?.id) {
      saveDietPlanToRealtimeDb(user.id, updatedPlan);
    }
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

    // Sync to Realtime Database
    if (user?.id) {
      saveWorkoutPlanToRealtimeDb(user.id, plan);
    } else {
      saveWorkoutPlanToRealtimeDb('guest_session', plan);
    }

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
      const updatedUser = {
        ...user,
        joinedChallengeId: challengeId,
        joinedChallengeDay: 1
      };
      setUser(updatedUser);
      syncUserDataToRealtimeDb(user.id, { profile: updatedUser });
    }
    setAdminAnalytics(prev => ({
      ...prev,
      challengeParticipants: prev.challengeParticipants + 1
    }));
  };

  const logDailyProgress = (log: Partial<DailyLog>) => {
    const today = new Date().toISOString().split('T')[0];
    const logItem: DailyLog = {
      date: today,
      waterLiters: log.waterLiters || 2.5,
      caloriesConsumed: log.caloriesConsumed || 2050,
      proteinConsumed: log.proteinConsumed || 155,
      workoutDone: log.workoutDone !== undefined ? log.workoutDone : true,
      weightKg: log.weightKg || user?.weightKg || 78,
      ...log
    };

    setDailyLogs(prev => {
      const existingIdx = prev.findIndex(l => l.date === today);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = { ...updated[existingIdx], ...log };
        return updated;
      } else {
        return [...prev, logItem];
      }
    });

    if (user?.id) {
      saveDailyLogToRealtimeDb(user.id, { ...logItem, id: today });
      if (log.workoutDone) {
        setUser(prev => {
          if (!prev) return null;
          const updated = {
            ...prev,
            completedWorkoutsCount: prev.completedWorkoutsCount + 1,
            streakDays: prev.streakDays + 1
          };
          syncUserDataToRealtimeDb(user.id, { profile: updated });
          return updated;
        });
      }
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
    saveCommunityPostToRealtimeDb(newPost);
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

  const deleteFoodFromDatabase = (id: string) => {
    setFoodDatabase(prev => prev.filter(f => f.id !== id));
  };

  const addExercise = (exercise: Exercise) => {
    setExercises(prev => [exercise, ...prev]);
  };

  const updateExercise = (id: string, updates: Partial<Exercise>) => {
    setExercises(prev => prev.map(ex => ex.id === id ? { ...ex, ...updates } : ex));
  };

  const deleteExercise = (id: string) => {
    setExercises(prev => prev.filter(ex => ex.id !== id));
  };

  const addChallenge = (challenge: Challenge) => {
    setChallenges(prev => [challenge, ...prev]);
  };

  const updateChallenge = (id: string, updates: Partial<Challenge>) => {
    setChallenges(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteChallenge = (id: string) => {
    setChallenges(prev => prev.filter(c => c.id !== id));
  };

  const addTransformation = (story: TransformationStory) => {
    setTransformations(prev => [story, ...prev]);
  };

  const deleteTransformation = (id: string) => {
    setTransformations(prev => prev.filter(t => t.id !== id));
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
      exercises,
      transformations,
      adminAnalytics,
      adminHeroTitle,
      adminHeroSubtitle,
      isAuthModalOpen,
      authModalMode,
      authPromptReason,
      pendingAthleteDetails,
      setPendingAthleteDetails,
      isFirebaseConnected,
      isFirebaseModalOpen,
      openFirebaseConfigModal,
      closeFirebaseModal,
      loginWithGoogle,
      isCalorieModalOpen,
      openCalorieModal,
      closeCalorieModal,
      selectedChallenge,
      selectedExerciseCategory,
      setSelectedExerciseCategory,
      openAuthModal,
      closeAuthModal,
      loginUser,
      signupUser,
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
      addFoodToDatabase,
      deleteFoodFromDatabase,
      addExercise,
      updateExercise,
      deleteExercise,
      addChallenge,
      updateChallenge,
      deleteChallenge,
      addTransformation,
      deleteTransformation
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
