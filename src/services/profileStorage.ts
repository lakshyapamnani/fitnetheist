/**
 * Profile Storage Service Layer
 * 
 * IMPORTANT ARCHITECTURAL PATTERN:
 * This service acts as the single source of truth for user profile data.
 * All persistence is currently handled via localStorage.
 * 
 * In the future, this repository layer can be upgraded to cloud persistence
 * (e.g. Firebase, Supabase, or custom REST/GraphQL APIs) without needing
 * to rewrite or alter consumer UI components.
 */

import { UserProfile, FitnessGoal, ActivityLevel, DietType, CuisineType, ExperienceLevel, EquipmentType, PriceTier, CookingStyle } from '../types';

const STORAGE_KEYS = {
  PROFILE: 'fitnetheist_user',
  PREFERENCES: 'fitnetheist_preferences',
  GOALS: 'fitnetheist_goal',
  PLAN: 'fitnetheist_plan',
};

export interface UserPreferences {
  units: 'metric' | 'imperial';
  emailReminders: boolean;
  smsReminders: boolean;
  weeklyCheckInDay: 'Sunday' | 'Monday';
  autoRecalculateMacros: boolean;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  units: 'metric',
  emailReminders: true,
  smsReminders: false,
  weeklyCheckInDay: 'Sunday',
  autoRecalculateMacros: true,
};

export const DEFAULT_PROFILE: UserProfile = {
  id: 'usr_default_athlete',
  name: 'Alex Mercer',
  email: 'alex.mercer@fitnetheist.com',
  phone: '+91 98765 43210',
  avatarUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=200&q=80',
  age: 27,
  sex: 'male',
  heightCm: 178,
  weightKg: 78,
  activityLevel: 'MODERATE',
  goal: 'LOSE_WEIGHT',
  dietType: 'NON-VEGETARIAN',
  cuisine: 'INDIAN_INTERNATIONAL',
  mealsPerDay: 4,
  foodPreferences: ['Chicken breast', 'Eggs', 'Oats', 'Basmati rice', 'Paneer', 'Greek yogurt'],
  foodsToAvoid: ['Refined sugar', 'Excess deep fried oils'],
  budget: 'STANDARD',
  cookingStyle: 'NORMAL',
  streakDays: 14,
  completedWorkoutsCount: 22,
  joinedChallengeId: 'c_21_day_ignite',
  joinedChallengeDay: 14,
  
  // Body & Health
  bodyFatPercent: 16.5,
  restingHeartRate: 64,
  trainingExperience: 'INTERMEDIATE',
  injuriesLimitations: 'Mild left shoulder impingement on deep bench press',
  
  // Goals
  targetWeightKg: 72,
  targetDate: '2026-11-30',
  trainingObjective: 'Lean hypertrophy and metabolic conditioning',
  
  // Training
  trainingDaysPerWeek: 4,
  trainingLocation: 'GYM',
  equipmentAvailable: 'FULL_GYM',
  sessionDurationMinutes: 50,
  
  // Lifestyle
  dailyStepGoal: 9000,
  sleepHoursTarget: 7.5,
  allergiesIntolerances: []
};

/**
 * Retrieves the current user profile from local storage, returning null if unauthenticated.
 */
export function getProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    // Explicitly purge legacy demo accounts so visitors start clean
    if (
      !parsed || 
      parsed.id === 'usr_default_athlete' || 
      parsed.email === 'alex.mercer@fitnetheist.com' ||
      parsed.email === 'demo@fitnetheist.com' ||
      parsed.isDemo
    ) {
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
      return null;
    }
    return parsed;
  } catch (error) {
    console.error('[ProfileStorage] Failed to read user profile:', error);
    return null;
  }
}

/**
 * Saves the full user profile to local storage.
 */
export function saveProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (error) {
    console.error('[ProfileStorage] Failed to save user profile:', error);
  }
}

/**
 * Updates partial fields of the profile and saves it.
 */
export function updateProfile(updates: Partial<UserProfile>): UserProfile {
  const current = getProfile() || DEFAULT_PROFILE;
  const updated: UserProfile = { ...current, ...updates };
  saveProfile(updated);
  return updated;
}

/**
 * Retrieves user preferences.
 */
export function getPreferences(): UserPreferences {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    if (!raw) return DEFAULT_PREFERENCES;
    return { ...DEFAULT_PREFERENCES, ...JSON.parse(raw) };
  } catch (error) {
    console.error('[ProfileStorage] Failed to read preferences:', error);
    return DEFAULT_PREFERENCES;
  }
}

/**
 * Saves partial or full user preferences.
 */
export function savePreferences(prefs: Partial<UserPreferences>): UserPreferences {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCES;
  try {
    const current = getPreferences();
    const updated = { ...current, ...prefs };
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('[ProfileStorage] Failed to save preferences:', error);
    return DEFAULT_PREFERENCES;
  }
}

/**
 * Calculates a profile completeness percentage (0-100%).
 */
export function calculateProfileCompleteness(profile: UserProfile): number {
  const fields = [
    Boolean(profile.name),
    Boolean(profile.age && profile.age > 0),
    Boolean(profile.sex),
    Boolean(profile.heightCm && profile.heightCm > 0),
    Boolean(profile.weightKg && profile.weightKg > 0),
    Boolean(profile.goal),
    Boolean(profile.targetWeightKg && profile.targetWeightKg > 0),
    Boolean(profile.activityLevel),
    Boolean(profile.dietType),
    Boolean(profile.mealsPerDay && profile.mealsPerDay > 0),
    Boolean(profile.trainingDaysPerWeek && profile.trainingDaysPerWeek > 0),
    Boolean(profile.equipmentAvailable),
    Boolean(profile.bodyFatPercent),
    Boolean(profile.dailyStepGoal)
  ];
  const completed = fields.filter(Boolean).length;
  return Math.round((completed / fields.length) * 100);
}
