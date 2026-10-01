import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateProfileCompleteness } from '../services/profileStorage';
import { 
  User, 
  Target, 
  Utensils, 
  Dumbbell, 
  Heart, 
  Activity, 
  Settings, 
  Check, 
  X, 
  Edit3, 
  ChevronRight, 
  Sparkles,
  Shield,
  RotateCcw
} from 'lucide-react';
import { 
  UserProfile, 
  FitnessGoal, 
  ActivityLevel, 
  DietType, 
  CuisineType, 
  ExperienceLevel, 
  EquipmentType, 
  CookingStyle 
} from '../types';

export const ClientMeProfileView: React.FC = () => {
  const { user, saveUserProfile, setActiveTab } = useApp();
  
  // Section currently being edited: null | 'PERSONAL' | 'GOALS' | 'NUTRITION' | 'TRAINING' | 'HEALTH' | 'LIFESTYLE'
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);

  // Form state buffer for the active edit modal
  const [formData, setFormData] = useState<Partial<UserProfile>>({});

  if (!user) return null;

  const completeness = calculateProfileCompleteness(user);

  const startEdit = (section: string) => {
    setFormData({ ...user });
    setEditingSection(section);
  };

  const cancelEdit = () => {
    setEditingSection(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveUserProfile(formData);
    setEditingSection(null);
    setSaveSuccessNotice('Profile updated & targets recalculated');
    setTimeout(() => setSaveSuccessNotice(null), 3000);
  };

  const friendlyGoal = (g?: string) => {
    if (!g) return 'Fat Loss';
    return g.replace('LOSE_WEIGHT', 'Fat Loss')
      .replace('BUILD_MUSCLE', 'Muscle Gain')
      .replace('MAINTAIN', 'Maintenance')
      .replace('GAIN_WEIGHT', 'Weight Gain')
      .replace('STRENGTH', 'Strength Peak')
      .replace('ENDURANCE', 'Endurance Conditioning')
      .replace('_', ' ');
  };

  const friendlyDiet = (d?: string) => {
    if (!d) return 'Non-Vegetarian';
    return d.replace('NON-VEGETARIAN', 'Non-Vegetarian')
      .replace('VEGETARIAN', 'Vegetarian')
      .replace('VEGAN', 'Vegan')
      .replace('EGGETARIAN', 'Eggetarian')
      .replace('KETO', 'Keto / Low-Carb')
      .replace('HIGH_PROTEIN', 'High Protein Athletic');
  };

  return (
    <div id="client-me-profile-page" className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Success Notification Banner */}
      {saveSuccessNotice && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-[#161618] border border-[#FFC515] text-[#F5F5F5] px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 text-xs font-mono-num animate-in fade-in slide-in-from-top-2">
          <div className="w-2 h-2 rounded-full bg-[#FFC515]" />
          <span>{saveSuccessNotice}</span>
        </div>
      )}

      {/* Header Profile Summary */}
      <div className="bg-[#0E0E10] border border-[#242424] rounded-xl p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#18181C] border border-[#2A2A30] overflow-hidden shrink-0 flex items-center justify-center">
              {user.avatarUrl ? (
                <img 
                  src={user.avatarUrl} 
                  alt={user.name} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              ) : (
                <User size={28} className="text-[#FFC515]" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] font-display">
                  {user.name}
                </h1>
                <span className="px-2 py-0.5 bg-[#18181C] text-[#FFC515] text-[10px] font-mono-num rounded border border-[#2A2A30]">
                  ACTIVE ATHLETE
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#9A9A9A] font-mono-num mt-0.5">
                {user.email} · {user.phone || '+91 98000 00000'}
              </p>
            </div>
          </div>

          {/* Profile Completeness Pill */}
          <div className="w-full sm:w-auto bg-[#141416] border border-[#242426] p-4 rounded-lg min-w-[220px]">
            <div className="flex items-center justify-between text-xs font-mono-num mb-2">
              <span className="text-[#9A9A9A]">PROFILE COMPLETENESS</span>
              <span className="text-[#FFC515] font-bold">{completeness}%</span>
            </div>
            <div className="w-full bg-[#1C1C20] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#FFC515] h-full rounded-full transition-all duration-500"
                style={{ width: `${completeness}%` }}
              />
            </div>
            <span className="text-[10px] text-[#9A9A9A] mt-1.5 block">
              Used automatically across Plan & Calculators
            </span>
          </div>
        </div>
      </div>

      {/* Profile Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 1. PERSONAL DETAILS */}
        <div className="bg-[#0E0E10] border border-[#242424] rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#202022] mb-4">
              <div className="flex items-center gap-2.5 text-[#F5F5F5]">
                <User size={16} className="text-[#FFC515]" />
                <h2 className="text-sm font-bold uppercase tracking-wider font-mono-num">
                  PERSONAL DETAILS
                </h2>
              </div>
              <button
                id="edit-personal-details-btn"
                onClick={() => startEdit('PERSONAL')}
                className="text-xs text-[#9A9A9A] hover:text-[#FFC515] flex items-center gap-1 font-mono-num transition-colors"
              >
                <Edit3 size={12} />
                <span>EDIT</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono-num">
              <div>
                <span className="text-[#9A9A9A] block">AGE</span>
                <span className="text-sm font-semibold text-[#F5F5F5]">{user.age} yrs</span>
              </div>
              <div>
                <span className="text-[#9A9A9A] block">SEX</span>
                <span className="text-sm font-semibold text-[#F5F5F5] uppercase">{user.sex}</span>
              </div>
              <div>
                <span className="text-[#9A9A9A] block">HEIGHT</span>
                <span className="text-sm font-semibold text-[#F5F5F5]">{user.heightCm} cm</span>
              </div>
              <div>
                <span className="text-[#9A9A9A] block">CURRENT WEIGHT</span>
                <span className="text-sm font-semibold text-[#FFC515]">{user.weightKg} kg</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#1C1C20] text-[11px] text-[#9A9A9A]">
            Weight and height determine your basal metabolic rate (BMR).
          </div>
        </div>

        {/* 2. GOALS */}
        <div className="bg-[#0E0E10] border border-[#242424] rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#202022] mb-4">
              <div className="flex items-center gap-2.5 text-[#F5F5F5]">
                <Target size={16} className="text-[#FFC515]" />
                <h2 className="text-sm font-bold uppercase tracking-wider font-mono-num">
                  GOALS & TARGETS
                </h2>
              </div>
              <button
                id="edit-goals-btn"
                onClick={() => startEdit('GOALS')}
                className="text-xs text-[#9A9A9A] hover:text-[#FFC515] flex items-center gap-1 font-mono-num transition-colors"
              >
                <Edit3 size={12} />
                <span>EDIT</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono-num">
              <div className="col-span-2">
                <span className="text-[#9A9A9A] block">PRIMARY OBJECTIVE</span>
                <span className="text-sm font-semibold text-[#F5F5F5]">{friendlyGoal(user.goal)}</span>
              </div>
              <div>
                <span className="text-[#9A9A9A] block">TARGET WEIGHT</span>
                <span className="text-sm font-semibold text-[#FFC515]">{user.targetWeightKg || 72} kg</span>
              </div>
              <div>
                <span className="text-[#9A9A9A] block">TARGET TIMELINE</span>
                <span className="text-sm font-semibold text-[#F5F5F5]">{user.targetDate || 'Nov 2026'}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#1C1C20] text-[11px] text-[#9A9A9A]">
            Calorie deficits and surplus are derived from this objective.
          </div>
        </div>

        {/* 3. NUTRITION PREFERENCES */}
        <div className="bg-[#0E0E10] border border-[#242424] rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#202022] mb-4">
              <div className="flex items-center gap-2.5 text-[#F5F5F5]">
                <Utensils size={16} className="text-[#FFC515]" />
                <h2 className="text-sm font-bold uppercase tracking-wider font-mono-num">
                  NUTRITION PREFERENCES
                </h2>
              </div>
              <button
                id="edit-nutrition-btn"
                onClick={() => startEdit('NUTRITION')}
                className="text-xs text-[#9A9A9A] hover:text-[#FFC515] flex items-center gap-1 font-mono-num transition-colors"
              >
                <Edit3 size={12} />
                <span>EDIT</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono-num">
              <div>
                <span className="text-[#9A9A9A] block">DIET TYPE</span>
                <span className="text-sm font-semibold text-[#F5F5F5]">{friendlyDiet(user.dietType)}</span>
              </div>
              <div>
                <span className="text-[#9A9A9A] block">MEALS PER DAY</span>
                <span className="text-sm font-semibold text-[#F5F5F5]">{user.mealsPerDay} meals</span>
              </div>
              <div className="col-span-2">
                <span className="text-[#9A9A9A] block">PREFERRED STAPLES</span>
                <span className="text-xs text-[#F5F5F5] leading-relaxed">
                  {user.foodPreferences?.join(', ') || 'Chicken, Eggs, Rice, Oats, Paneer'}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-[#9A9A9A] block">FOODS TO AVOID</span>
                <span className="text-xs text-[#9A9A9A] leading-relaxed">
                  {user.foodsToAvoid?.join(', ') || 'None specified'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#1C1C20] text-[11px] text-[#9A9A9A]">
            Auto-seeds the 7-Day Meal Plan and smart ingredient alternatives.
          </div>
        </div>

        {/* 4. TRAINING & EQUIPMENT */}
        <div className="bg-[#0E0E10] border border-[#242424] rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#202022] mb-4">
              <div className="flex items-center gap-2.5 text-[#F5F5F5]">
                <Dumbbell size={16} className="text-[#FFC515]" />
                <h2 className="text-sm font-bold uppercase tracking-wider font-mono-num">
                  TRAINING & EQUIPMENT
                </h2>
              </div>
              <button
                id="edit-training-btn"
                onClick={() => startEdit('TRAINING')}
                className="text-xs text-[#9A9A9A] hover:text-[#FFC515] flex items-center gap-1 font-mono-num transition-colors"
              >
                <Edit3 size={12} />
                <span>EDIT</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono-num">
              <div>
                <span className="text-[#9A9A9A] block">FREQUENCY</span>
                <span className="text-sm font-semibold text-[#F5F5F5]">{user.trainingDaysPerWeek || 4} days / week</span>
              </div>
              <div>
                <span className="text-[#9A9A9A] block">EXPERIENCE</span>
                <span className="text-sm font-semibold text-[#F5F5F5]">{user.trainingExperience || 'INTERMEDIATE'}</span>
              </div>
              <div>
                <span className="text-[#9A9A9A] block">LOCATION</span>
                <span className="text-sm font-semibold text-[#F5F5F5]">{user.trainingLocation || 'GYM'}</span>
              </div>
              <div>
                <span className="text-[#9A9A9A] block">SESSION DURATION</span>
                <span className="text-sm font-semibold text-[#F5F5F5]">{user.sessionDurationMinutes || 45} minutes</span>
              </div>
              <div className="col-span-2">
                <span className="text-[#9A9A9A] block">EQUIPMENT ACCESS</span>
                <span className="text-xs text-[#F5F5F5]">
                  {(user.equipmentAvailable || 'FULL_GYM').replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#1C1C20] text-[11px] text-[#9A9A9A]">
            Auto-seeds exercise selection, split volume, and rest schedules.
          </div>
        </div>

        {/* 5. BODY & HEALTH */}
        <div className="bg-[#0E0E10] border border-[#242424] rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#202022] mb-4">
              <div className="flex items-center gap-2.5 text-[#F5F5F5]">
                <Heart size={16} className="text-[#FFC515]" />
                <h2 className="text-sm font-bold uppercase tracking-wider font-mono-num">
                  BODY & HEALTH
                </h2>
              </div>
              <button
                id="edit-health-btn"
                onClick={() => startEdit('HEALTH')}
                className="text-xs text-[#9A9A9A] hover:text-[#FFC515] flex items-center gap-1 font-mono-num transition-colors"
              >
                <Edit3 size={12} />
                <span>EDIT</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono-num">
              <div>
                <span className="text-[#9A9A9A] block">BODY FAT %</span>
                <span className="text-sm font-semibold text-[#F5F5F5]">
                  {user.bodyFatPercent ? `${user.bodyFatPercent}%` : '16.5%'}
                </span>
              </div>
              <div>
                <span className="text-[#9A9A9A] block">RESTING HEART RATE</span>
                <span className="text-sm font-semibold text-[#F5F5F5]">
                  {user.restingHeartRate ? `${user.restingHeartRate} bpm` : '64 bpm'}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-[#9A9A9A] block">INJURIES / LIMITATIONS</span>
                <span className="text-xs text-[#F5F5F5] leading-relaxed">
                  {user.injuriesLimitations || 'No active injuries reported.'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#1C1C20] text-[11px] text-[#9A9A9A]">
            Used for heart rate zones, Katch-McArdle calculations, and injury substitutions.
          </div>
        </div>

        {/* 6. LIFESTYLE & DAILY HABITS */}
        <div className="bg-[#0E0E10] border border-[#242424] rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#202022] mb-4">
              <div className="flex items-center gap-2.5 text-[#F5F5F5]">
                <Activity size={16} className="text-[#FFC515]" />
                <h2 className="text-sm font-bold uppercase tracking-wider font-mono-num">
                  LIFESTYLE & ACTIVITY
                </h2>
              </div>
              <button
                id="edit-lifestyle-btn"
                onClick={() => startEdit('LIFESTYLE')}
                className="text-xs text-[#9A9A9A] hover:text-[#FFC515] flex items-center gap-1 font-mono-num transition-colors"
              >
                <Edit3 size={12} />
                <span>EDIT</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono-num">
              <div>
                <span className="text-[#9A9A9A] block">ACTIVITY LEVEL</span>
                <span className="text-sm font-semibold text-[#F5F5F5]">{user.activityLevel}</span>
              </div>
              <div>
                <span className="text-[#9A9A9A] block">DAILY STEP GOAL</span>
                <span className="text-sm font-semibold text-[#F5F5F5]">
                  {(user.dailyStepGoal || 9000).toLocaleString()} steps
                </span>
              </div>
              <div>
                <span className="text-[#9A9A9A] block">SLEEP TARGET</span>
                <span className="text-sm font-semibold text-[#F5F5F5]">
                  {user.sleepHoursTarget || 7.5} hours / night
                </span>
              </div>
              <div>
                <span className="text-[#9A9A9A] block">COOKING PREFERENCE</span>
                <span className="text-sm font-semibold text-[#F5F5F5]">{user.cookingStyle || 'NORMAL'}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#1C1C20] text-[11px] text-[#9A9A9A]">
            Dictates Total Daily Energy Expenditure (TDEE) multipliers.
          </div>
        </div>

      </div>

      {/* Account Settings & Fast Actions */}
      <div className="mt-8 bg-[#0E0E10] border border-[#242424] rounded-xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#202022] mb-4">
          <div className="flex items-center gap-2.5 text-[#F5F5F5]">
            <Settings size={16} className="text-[#FFC515]" />
            <h2 className="text-sm font-bold uppercase tracking-wider font-mono-num">
              ACCOUNT & SYSTEM
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono-num">
          <div className="p-4 bg-[#141416] rounded border border-[#222226]">
            <span className="text-[#9A9A9A] block">STORAGE MODE</span>
            <span className="text-sm font-bold text-[#F5F5F5] block mt-1">Local Storage</span>
            <span className="text-[10px] text-[#9A9A9A] mt-1 block">
              Saved client-side in browser session.
            </span>
          </div>

          <div className="p-4 bg-[#141416] rounded border border-[#222226]">
            <span className="text-[#9A9A9A] block">ADMINISTRATOR DESK</span>
            <button
              onClick={() => setActiveTab('admin')}
              className="text-xs font-bold text-[#FFC515] hover:underline block mt-1"
            >
              Open Coach Admin Portal →
            </button>
            <span className="text-[10px] text-[#9A9A9A] mt-1 block">
              Manage client inquiries, roster & analytics.
            </span>
          </div>

          <div className="p-4 bg-[#141416] rounded border border-[#222226]">
            <span className="text-[#9A9A9A] block">RESET DEFAULTS</span>
            <button
              onClick={() => {
                if (confirm('Reset your profile back to default demo values?')) {
                  localStorage.removeItem('fitnetheist_user');
                  window.location.reload();
                }
              }}
              className="text-xs font-bold text-red-400 hover:underline block mt-1"
            >
              Reset to Defaults
            </button>
            <span className="text-[10px] text-[#9A9A9A] mt-1 block">
              Restore initial profile baseline.
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODAL: EDIT SECTION
          ========================================================================= */}
      {editingSection && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121214] border border-[#2E2E34] rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#222226] mb-6">
              <h3 className="text-base font-bold text-[#F5F5F5] font-display">
                Edit {editingSection} Details
              </h3>
              <button
                onClick={cancelEdit}
                className="p-1 text-[#9A9A9A] hover:text-[#F5F5F5] rounded transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-mono-num">
              
              {/* EDIT PERSONAL */}
              {editingSection === 'PERSONAL' && (
                <>
                  <div>
                    <label className="text-[#9A9A9A] block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#F5F5F5] focus:border-[#FFC515] outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[#9A9A9A] block mb-1">Age (Years)</label>
                      <input
                        type="number"
                        min="14"
                        max="90"
                        value={formData.age || 25}
                        onChange={e => setFormData({ ...formData, age: Number(e.target.value) })}
                        className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#F5F5F5] focus:border-[#FFC515] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[#9A9A9A] block mb-1">Biological Sex</label>
                      <select
                        value={formData.sex || 'male'}
                        onChange={e => setFormData({ ...formData, sex: e.target.value as 'male' | 'female' })}
                        className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#F5F5F5] focus:border-[#FFC515] outline-none"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[#9A9A9A] block mb-1">Height (cm)</label>
                      <input
                        type="number"
                        min="120"
                        max="240"
                        value={formData.heightCm || 175}
                        onChange={e => setFormData({ ...formData, heightCm: Number(e.target.value) })}
                        className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#F5F5F5] focus:border-[#FFC515] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[#9A9A9A] block mb-1">Current Weight (kg)</label>
                      <input
                        type="number"
                        step="0.1"
                        min="35"
                        max="250"
                        value={formData.weightKg || 75}
                        onChange={e => setFormData({ ...formData, weightKg: Number(e.target.value) })}
                        className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#FFC515] font-bold focus:border-[#FFC515] outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* EDIT GOALS */}
              {editingSection === 'GOALS' && (
                <>
                  <div>
                    <label className="text-[#9A9A9A] block mb-1">Primary Fitness Goal</label>
                    <select
                      value={formData.goal || 'LOSE_WEIGHT'}
                      onChange={e => setFormData({ ...formData, goal: e.target.value as FitnessGoal })}
                      className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#F5F5F5] focus:border-[#FFC515] outline-none"
                    >
                      <option value="LOSE_WEIGHT">Fat Loss (Caloric Deficit)</option>
                      <option value="MAINTAIN">Weight Maintenance & Body Recomp</option>
                      <option value="BUILD_MUSCLE">Muscle Gain (Hypertrophy Surplus)</option>
                      <option value="GAIN_WEIGHT">Weight Gain</option>
                      <option value="STRENGTH">Strength & Power Peak</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[#9A9A9A] block mb-1">Target Weight (kg)</label>
                      <input
                        type="number"
                        step="0.5"
                        value={formData.targetWeightKg || 70}
                        onChange={e => setFormData({ ...formData, targetWeightKg: Number(e.target.value) })}
                        className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#F5F5F5] focus:border-[#FFC515] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[#9A9A9A] block mb-1">Target Timeline</label>
                      <input
                        type="text"
                        placeholder="e.g. Nov 2026 or 12 weeks"
                        value={formData.targetDate || ''}
                        onChange={e => setFormData({ ...formData, targetDate: e.target.value })}
                        className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#F5F5F5] focus:border-[#FFC515] outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* EDIT NUTRITION */}
              {editingSection === 'NUTRITION' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[#9A9A9A] block mb-1">Diet Type</label>
                      <select
                        value={formData.dietType || 'NON-VEGETARIAN'}
                        onChange={e => setFormData({ ...formData, dietType: e.target.value as DietType })}
                        className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#F5F5F5] focus:border-[#FFC515] outline-none"
                      >
                        <option value="NON-VEGETARIAN">Non-Vegetarian</option>
                        <option value="VEGETARIAN">Vegetarian</option>
                        <option value="EGGETARIAN">Eggetarian</option>
                        <option value="VEGAN">Vegan</option>
                        <option value="HIGH_PROTEIN">High Protein Athletic</option>
                        <option value="KETO">Keto / Low-Carb</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[#9A9A9A] block mb-1">Meals Per Day</label>
                      <select
                        value={formData.mealsPerDay || 4}
                        onChange={e => setFormData({ ...formData, mealsPerDay: Number(e.target.value) })}
                        className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#F5F5F5] focus:border-[#FFC515] outline-none"
                      >
                        <option value={3}>3 Meals</option>
                        <option value={4}>4 Meals (Recommended)</option>
                        <option value={5}>5 Meals</option>
                        <option value={6}>6 Small Feedings</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-[#9A9A9A] block mb-1">Preferred Foods (comma separated)</label>
                    <input
                      type="text"
                      value={formData.foodPreferences?.join(', ') || ''}
                      onChange={e => setFormData({ 
                        ...formData, 
                        foodPreferences: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                      })}
                      className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#F5F5F5] focus:border-[#FFC515] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[#9A9A9A] block mb-1">Foods to Avoid / Allergies</label>
                    <input
                      type="text"
                      value={formData.foodsToAvoid?.join(', ') || ''}
                      onChange={e => setFormData({ 
                        ...formData, 
                        foodsToAvoid: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                      })}
                      className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#F5F5F5] focus:border-[#FFC515] outline-none"
                    />
                  </div>
                </>
              )}

              {/* EDIT TRAINING */}
              {editingSection === 'TRAINING' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[#9A9A9A] block mb-1">Days Per Week</label>
                      <select
                        value={formData.trainingDaysPerWeek || 4}
                        onChange={e => setFormData({ ...formData, trainingDaysPerWeek: Number(e.target.value) })}
                        className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#F5F5F5] focus:border-[#FFC515] outline-none"
                      >
                        <option value={3}>3 Days (Full Body)</option>
                        <option value={4}>4 Days (Upper / Lower)</option>
                        <option value={5}>5 Days (Push / Pull / Legs / Upper / Lower)</option>
                        <option value={6}>6 Days (PPL × 2)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[#9A9A9A] block mb-1">Experience Level</label>
                      <select
                        value={formData.trainingExperience || 'INTERMEDIATE'}
                        onChange={e => setFormData({ ...formData, trainingExperience: e.target.value as ExperienceLevel })}
                        className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#F5F5F5] focus:border-[#FFC515] outline-none"
                      >
                        <option value="BEGINNER">Beginner (&lt; 1 year)</option>
                        <option value="INTERMEDIATE">Intermediate (1–3 years)</option>
                        <option value="ADVANCED">Advanced (3+ years)</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[#9A9A9A] block mb-1">Location</label>
                      <select
                        value={formData.trainingLocation || 'GYM'}
                        onChange={e => setFormData({ ...formData, trainingLocation: e.target.value as 'GYM' | 'HOME' | 'BOTH' })}
                        className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#F5F5F5] focus:border-[#FFC515] outline-none"
                      >
                        <option value="GYM">Commercial Gym</option>
                        <option value="HOME">Home Setup</option>
                        <option value="BOTH">Hybrid (Gym + Home)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[#9A9A9A] block mb-1">Session Duration (min)</label>
                      <input
                        type="number"
                        min="25"
                        max="120"
                        value={formData.sessionDurationMinutes || 45}
                        onChange={e => setFormData({ ...formData, sessionDurationMinutes: Number(e.target.value) })}
                        className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#F5F5F5] focus:border-[#FFC515] outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[#9A9A9A] block mb-1">Equipment Available</label>
                    <select
                      value={formData.equipmentAvailable || 'FULL_GYM'}
                      onChange={e => setFormData({ ...formData, equipmentAvailable: e.target.value as EquipmentType })}
                      className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#F5F5F5] focus:border-[#FFC515] outline-none"
                    >
                      <option value="FULL_GYM">Full Commercial Gym (Barbells, Cables, Dumbbells, Machines)</option>
                      <option value="DUMBBELLS_ONLY">Dumbbells & Bench Only</option>
                      <option value="BODYWEIGHT">Bodyweight / Calisthenics Only</option>
                      <option value="RESISTANCE_BANDS">Resistance Bands & Suspension</option>
                    </select>
                  </div>
                </>
              )}

              {/* EDIT HEALTH */}
              {editingSection === 'HEALTH' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[#9A9A9A] block mb-1">Estimated Body Fat %</label>
                      <input
                        type="number"
                        step="0.5"
                        min="5"
                        max="50"
                        value={formData.bodyFatPercent || 16.5}
                        onChange={e => setFormData({ ...formData, bodyFatPercent: Number(e.target.value) })}
                        className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#F5F5F5] focus:border-[#FFC515] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[#9A9A9A] block mb-1">Resting Heart Rate (bpm)</label>
                      <input
                        type="number"
                        min="40"
                        max="110"
                        value={formData.restingHeartRate || 64}
                        onChange={e => setFormData({ ...formData, restingHeartRate: Number(e.target.value) })}
                        className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#F5F5F5] focus:border-[#FFC515] outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[#9A9A9A] block mb-1">Injuries / Movement Limitations</label>
                    <textarea
                      rows={3}
                      value={formData.injuriesLimitations || ''}
                      onChange={e => setFormData({ ...formData, injuriesLimitations: e.target.value })}
                      placeholder="e.g. Mild lower back sensitivity on heavy deadlifts"
                      className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#F5F5F5] focus:border-[#FFC515] outline-none"
                    />
                  </div>
                </>
              )}

              {/* EDIT LIFESTYLE */}
              {editingSection === 'LIFESTYLE' && (
                <>
                  <div>
                    <label className="text-[#9A9A9A] block mb-1">Activity Level</label>
                    <select
                      value={formData.activityLevel || 'MODERATE'}
                      onChange={e => setFormData({ ...formData, activityLevel: e.target.value as ActivityLevel })}
                      className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#F5F5F5] focus:border-[#FFC515] outline-none"
                    >
                      <option value="SEDENTARY">Sedentary (Desk job, little movement)</option>
                      <option value="LIGHT">Light Activity (1–3 exercise sessions/wk)</option>
                      <option value="MODERATE">Moderately Active (3–5 training sessions/wk)</option>
                      <option value="VERY_ACTIVE">Very Active (6–7 heavy training sessions/wk)</option>
                      <option value="EXTRA_ACTIVE">Extremely Active (Athletic labor / 2x daily)</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[#9A9A9A] block mb-1">Daily Step Goal</label>
                      <input
                        type="number"
                        step="500"
                        value={formData.dailyStepGoal || 9000}
                        onChange={e => setFormData({ ...formData, dailyStepGoal: Number(e.target.value) })}
                        className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#F5F5F5] focus:border-[#FFC515] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[#9A9A9A] block mb-1">Sleep Hours / Night</label>
                      <input
                        type="number"
                        step="0.5"
                        min="4"
                        max="12"
                        value={formData.sleepHoursTarget || 7.5}
                        onChange={e => setFormData({ ...formData, sleepHoursTarget: Number(e.target.value) })}
                        className="w-full bg-[#18181C] border border-[#28282D] rounded p-2.5 text-[#F5F5F5] focus:border-[#FFC515] outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#222226]">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-[#1A1A1E] hover:bg-[#222228] text-[#9A9A9A] hover:text-[#F5F5F5] rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FFC515] hover:bg-[#E6AF0F] text-black font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 shadow-[0_0_12px_rgba(255,197,21,0.2)]"
                >
                  <Check size={14} strokeWidth={2.5} />
                  <span>Save Changes</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
