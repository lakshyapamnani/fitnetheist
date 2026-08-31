import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAdmin } from '../context/AdminContext';
import { DietType, CuisineType, FitnessGoal, ScheduledMeal, DayDietPlan, GroceryItem } from '../types';
import { getMealAlternatives } from '../data/nutritionDatabase';
import { ArrowRight, RefreshCw, Check, Download, Printer, Utensils, X, ShieldAlert, Sparkles } from 'lucide-react';

export const DietGenerator: React.FC = () => {
  const { 
    user, 
    calorieResult, 
    dietPlan, 
    groceryList, 
    generateAndSetDiet, 
    swapDietMeal, 
    toggleGroceryItemCheck,
    setActiveTab 
  } = useApp();
  const { trackLeadEvent, captureLead } = useAdmin();

  // Wizard / Config State
  const [goal, setGoal] = useState<FitnessGoal>(user?.goal || 'BUILD_MUSCLE');
  const [targetCalories, setTargetCalories] = useState<number>(
    calorieResult?.currentTargetCalories || 2050
  );
  const [dietType, setDietType] = useState<DietType>(user?.dietType || 'NON-VEGETARIAN');
  const [cuisine, setCuisine] = useState<CuisineType>(user?.cuisine || 'INDIAN_INTERNATIONAL');
  const [mealsPerDay, setMealsPerDay] = useState<number>(user?.mealsPerDay || 4);
  const [likedFoods, setLikedFoods] = useState<string>(user?.foodPreferences.join(', ') || 'Chicken, Eggs, Rice, Oats, Paneer');
  const [avoidFoods, setAvoidFoods] = useState<string>(user?.foodsToAvoid.join(', ') || '');
  const [budget, setBudget] = useState<'BUDGET' | 'STANDARD' | 'PREMIUM'>('STANDARD');
  const [cookingStyle, setCookingStyle] = useState<'QUICK' | 'NORMAL' | 'MEAL_PREP'>('NORMAL');

  // Active Selected Day in Diet Viewer (0-6)
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(0);

  // Meal Swap Modal State
  const [swappingMealInfo, setSwappingMealInfo] = useState<{
    dayIdx: number;
    mealIdx: number;
    currentMeal: ScheduledMeal;
    alternatives: ScheduledMeal[];
  } | null>(null);

  // Loading state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Grocery List Drawer / View Toggle
  const [isGroceryViewOpen, setIsGroceryViewOpen] = useState<boolean>(false);
  const [copiedGroceryNotice, setCopiedGroceryNotice] = useState<boolean>(false);

  const handleGenerateDiet = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsGenerating(true);

    const prefList = likedFoods.split(',').map(s => s.trim()).filter(Boolean);
    const avoidList = avoidFoods.split(',').map(s => s.trim()).filter(Boolean);

    try {
      // Attempt backend API call first
      const response = await fetch('/api/diet/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetCalories,
          dietType,
          cuisine,
          mealsPerDay,
          budget,
          preferences: prefList,
          avoidances: avoidList,
          goal
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.plan) {
          generateAndSetDiet(
            targetCalories,
            dietType,
            cuisine,
            mealsPerDay,
            budget,
            prefList,
            avoidList
          );
        } else {
          generateAndSetDiet(
            targetCalories,
            dietType,
            cuisine,
            mealsPerDay,
            budget,
            prefList,
            avoidList
          );
        }
      } else {
        // Fallback to client-side engine
        generateAndSetDiet(
          targetCalories,
          dietType,
          cuisine,
          mealsPerDay,
          budget,
          prefList,
          avoidList
        );
      }
    } catch (err) {
      // Fallback to client-side engine
      generateAndSetDiet(
        targetCalories,
        dietType,
        cuisine,
        mealsPerDay,
        budget,
        prefList,
        avoidList
      );
    } finally {
      setIsGenerating(false);
    }

    trackLeadEvent('DIET_GENERATED', {
      source: 'DIET_GENERATOR',
      details: `Generated 7-day ${dietType} diet plan (${targetCalories} kcal, ${mealsPerDay} meals)`
    });

    if (user?.email) {
      captureLead({
        name: user.name || 'Athlete Visitor',
        email: user.email,
        phone: user.phone || '+91 98000 00000',
        source: 'DIET_GENERATOR',
        goal: goal === 'FAT_LOSS' ? 'FAT_LOSS' : goal === 'BUILD_MUSCLE' ? 'MUSCLE_GAIN' : 'MAINTENANCE',
        targetCalories
      });
    }
  };

  const handleOpenSwapModal = async (dayIdx: number, mealIdx: number, currentMeal: ScheduledMeal) => {
    const avoidList = avoidFoods.split(',').map(s => s.trim()).filter(Boolean);
    try {
      const response = await fetch('/api/diet/swap-alternatives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentMeal,
          dietType,
          cuisine,
          avoidances: avoidList
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.alternatives) {
          setSwappingMealInfo({
            dayIdx,
            mealIdx,
            currentMeal,
            alternatives: data.alternatives
          });
          return;
        }
      }
    } catch (e) {
      // Fallback
    }

    const alts = getMealAlternatives(currentMeal, dietType, cuisine, avoidList);
    setSwappingMealInfo({
      dayIdx,
      mealIdx,
      currentMeal,
      alternatives: alts
    });
  };

  const handleConfirmSwap = (replacementMeal: ScheduledMeal) => {
    if (!swappingMealInfo) return;
    swapDietMeal(swappingMealInfo.dayIdx, swappingMealInfo.mealIdx, replacementMeal);
    setSwappingMealInfo(null);
  };

  const handleDownloadGroceryList = () => {
    if (!groceryList || groceryList.length === 0) return;
    let content = `FITNETHEIST // 7-DAY AGGREGATED GROCERY PROTOCOL\nTarget: ${targetCalories} KCAL | Diet Type: ${dietType}\nGenerated: ${new Date().toLocaleDateString()}\n\n`;
    
    const categories = ['PROTEINS', 'CARBOHYDRATES', 'VEGETABLES', 'FRUITS', 'DAIRY_ALTERNATIVES', 'PANTRY', 'OTHER'] as const;
    categories.forEach(cat => {
      const items = groceryList.filter(g => g.category === cat);
      if (items.length > 0) {
        content += `[${cat}]\n`;
        items.forEach(item => {
          content += ` - [${item.checked ? 'X' : ' '}] ${item.name} (${item.totalQuantity})\n`;
        });
        content += '\n';
      }
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FITNETHEIST_Grocery_List_${targetCalories}kcal.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyGroceryToClipboard = () => {
    let content = `FITNETHEIST // GROCERY LIST (${targetCalories} KCAL)\n`;
    groceryList.forEach(g => {
      content += `• ${g.name} — ${g.totalQuantity}\n`;
    });
    navigator.clipboard.writeText(content);
    setCopiedGroceryNotice(true);
    setTimeout(() => setCopiedGroceryNotice(false), 2500);
  };

  const currentDayPlan = dietPlan?.days[selectedDayIdx] || dietPlan?.days[0];

  return (
    <div id="diet-generator-page" className="min-h-screen bg-[#08080a] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="border-b border-white/10 pb-6 mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="h-2 w-2 bg-[#d8ff38]"></span>
              <span className="text-[11px] sm:text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#d8ff38]">
                NUTRITION PROTOCOL ENGINE // 02
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight font-display leading-[1.05]">
              7-DAY DIET GENERATOR
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl mt-2 font-mono-num leading-relaxed">
              Generate structured, macro-exact 7-day nutrition plans using an authentic nutritional database. Supports strict Vegetarian, Non-Vegetarian, and Vegan regimes with smart 1-click meal swaps.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              id="open-grocery-btn"
              onClick={() => setIsGroceryViewOpen(true)}
              className="w-full sm:w-auto px-5 py-3 bg-zinc-900 hover:bg-zinc-800 border border-white/20 hover:border-white/50 text-white font-mono-num text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors mobile-tap-active"
            >
              <Utensils size={14} className="text-[#d8ff38]" />
              <span>VIEW GROCERY LIST ({groceryList.length})</span>
            </button>
          </div>
        </div>

        {/* 9-Step Nutrition Configuration Box */}
        <div className="bg-zinc-950 border border-white/10 p-6 sm:p-8 mb-12">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <h2 className="text-xs font-mono-num font-bold text-white uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="text-[#d8ff38]">9-STAGE</span> NUTRITION PARAMETERS
            </h2>
            <span className="text-[11px] font-mono-num text-zinc-500">CONFIG WIZARD</span>
          </div>

          <form onSubmit={handleGenerateDiet} className="space-y-6">
            
            {/* Steps 1 & 2: Goal & Calories */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Step 1: Goal */}
              <div>
                <label className="block text-xs font-mono-num text-zinc-400 uppercase tracking-wider mb-2">
                  STEP 01 // FITNESS GOAL
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'LOSE_WEIGHT', label: 'FAT LOSS' },
                    { id: 'BUILD_MUSCLE', label: 'BUILD MUSCLE' },
                    { id: 'MAINTAIN', label: 'MAINTAIN' },
                    { id: 'GAIN_WEIGHT', label: 'BULK' }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setGoal(item.id as FitnessGoal)}
                      className={`py-2 px-2 text-center text-xs font-mono-num font-bold uppercase border transition-all ${
                        goal === item.id 
                          ? 'bg-[#d8ff38] text-black border-[#d8ff38]' 
                          : 'border-zinc-800 text-zinc-400 hover:border-zinc-700 bg-zinc-900/40'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Calories */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="diet-target-calories" className="block text-xs font-mono-num text-zinc-400 uppercase tracking-wider">
                    STEP 02 // DAILY CALORIE TARGET
                  </label>
                  {calorieResult && (
                    <button
                      type="button"
                      onClick={() => setTargetCalories(calorieResult.currentTargetCalories)}
                      className="text-[10px] font-mono-num text-[#d8ff38] hover:underline"
                    >
                      USE CALCULATOR RESULT ({calorieResult.currentTargetCalories} KCAL)
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <input
                    id="diet-target-calories"
                    type="number"
                    min="1200"
                    max="5000"
                    step="50"
                    value={targetCalories}
                    onChange={(e) => setTargetCalories(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 px-4 py-2 text-white font-mono-num text-sm focus:border-[#d8ff38] focus:outline-none"
                    required
                  />
                  <span className="text-xs font-mono-num text-zinc-400 font-bold shrink-0">KCAL / DAY</span>
                </div>
              </div>

            </div>

            {/* Steps 3, 4, 5: Diet Type, Cuisine, Meals Per Day */}
            <div className="grid md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
              
              {/* Step 3: Diet Type (REQUIRED) */}
              <div>
                <label className="block text-xs font-mono-num text-zinc-400 uppercase tracking-wider mb-2">
                  STEP 03 // DIET TYPE <span className="text-[#d8ff38]">*REQUIRED</span>
                </label>
                <div className="space-y-1.5">
                  {[
                    { id: 'NON-VEGETARIAN', label: 'NON-VEGETARIAN', sub: 'Chicken, Fish, Eggs, Dairy' },
                    { id: 'VEGETARIAN', label: 'VEGETARIAN', sub: 'No meat/fish. Eggs, Dairy, Paneer' },
                    { id: 'VEGAN', label: 'VEGAN', sub: '100% Plant-derived, No animal products' }
                  ].map(dt => (
                    <button
                      key={dt.id}
                      type="button"
                      onClick={() => setDietType(dt.id as DietType)}
                      className={`w-full text-left p-2.5 border transition-all ${
                        dietType === dt.id 
                          ? 'border-[#d8ff38] bg-[#d8ff38]/10 text-white' 
                          : 'border-zinc-800 text-zinc-400 hover:border-zinc-700 bg-zinc-900/30'
                      }`}
                    >
                      <span className="text-xs font-mono-num font-bold uppercase block text-white">{dt.label}</span>
                      <span className="text-[10px] text-zinc-400 block">{dt.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Cuisine */}
              <div>
                <label className="block text-xs font-mono-num text-zinc-400 uppercase tracking-wider mb-2">
                  STEP 04 // CUISINE PREFERENCE
                </label>
                <div className="space-y-1.5">
                  {[
                    { id: 'INDIAN_INTERNATIONAL', label: 'INDIAN + INTERNATIONAL', sub: 'Rotis, Dals, Bowls, Sourdough, Oats' },
                    { id: 'INDIAN', label: 'INDIAN CUISINE', sub: 'Paneer, Chana, Dal Tadka, Moong Chillas' },
                    { id: 'INTERNATIONAL', label: 'INTERNATIONAL', sub: 'Quinoa bowls, Grilled proteins, Stir-fries' }
                  ].map(cs => (
                    <button
                      key={cs.id}
                      type="button"
                      onClick={() => setCuisine(cs.id as CuisineType)}
                      className={`w-full text-left p-2.5 border transition-all ${
                        cuisine === cs.id 
                          ? 'border-[#d8ff38] bg-[#d8ff38]/10 text-white' 
                          : 'border-zinc-800 text-zinc-400 hover:border-zinc-700 bg-zinc-900/30'
                      }`}
                    >
                      <span className="text-xs font-mono-num font-bold uppercase block text-white">{cs.label}</span>
                      <span className="text-[10px] text-zinc-400 block">{cs.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 5: Meals Per Day */}
              <div>
                <label className="block text-xs font-mono-num text-zinc-400 uppercase tracking-wider mb-2">
                  STEP 05 // MEALS PER DAY
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { count: 3, label: '3 MEALS', sub: 'Breakfast, Lunch, Dinner' },
                    { count: 4, label: '4 MEALS', sub: '+ 1 Athletic Snack' },
                    { count: 5, label: '5 MEALS', sub: 'Pre & Post Workout Split' },
                    { count: 6, label: '6 MEALS', sub: 'High-Frequency Fuel' }
                  ].map(m => (
                    <button
                      key={m.count}
                      type="button"
                      onClick={() => setMealsPerDay(m.count)}
                      className={`p-2.5 text-left border transition-all ${
                        mealsPerDay === m.count 
                          ? 'border-[#d8ff38] bg-[#d8ff38]/10 text-white' 
                          : 'border-zinc-800 text-zinc-400 hover:border-zinc-700 bg-zinc-900/30'
                      }`}
                    >
                      <span className="text-xs font-mono-num font-bold uppercase block text-white">{m.label}</span>
                      <span className="text-[10px] text-zinc-500 block leading-tight">{m.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Steps 6, 7, 8, 9: Preferences, Restrictions, Budget, Cooking Style */}
            <div className="grid md:grid-cols-4 gap-4 pt-4 border-t border-white/10">
              
              {/* Step 6: Liked Foods */}
              <div>
                <label htmlFor="input-liked-foods" className="block text-xs font-mono-num text-zinc-400 uppercase tracking-wider mb-1">
                  STEP 06 // FOODS I LIKE
                </label>
                <input
                  id="input-liked-foods"
                  type="text"
                  value={likedFoods}
                  onChange={(e) => setLikedFoods(e.target.value)}
                  placeholder="e.g. Chicken, Oats, Rice"
                  className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white font-mono-num focus:border-[#d8ff38] focus:outline-none"
                />
              </div>

              {/* Step 7: Restrictions / Allergies */}
              <div>
                <label htmlFor="input-avoid-foods" className="block text-xs font-mono-num text-zinc-400 uppercase tracking-wider mb-1">
                  STEP 07 // FOODS TO AVOID
                </label>
                <input
                  id="input-avoid-foods"
                  type="text"
                  value={avoidFoods}
                  onChange={(e) => setAvoidFoods(e.target.value)}
                  placeholder="e.g. Dairy, Peanuts, Cilantro"
                  className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white font-mono-num focus:border-[#d8ff38] focus:outline-none"
                />
              </div>

              {/* Step 8: Budget */}
              <div>
                <label className="block text-xs font-mono-num text-zinc-400 uppercase tracking-wider mb-1">
                  STEP 08 // BUDGET TIER
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {['BUDGET', 'STANDARD', 'PREMIUM'].map(b => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(b as any)}
                      className={`py-2 text-[10px] font-mono-num font-bold uppercase border ${
                        budget === b ? 'bg-white text-black border-white' : 'border-zinc-800 text-zinc-400 bg-zinc-900'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 9: Cooking Style */}
              <div>
                <label className="block text-xs font-mono-num text-zinc-400 uppercase tracking-wider mb-1">
                  STEP 09 // PREP STYLE
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {['QUICK', 'NORMAL', 'MEAL_PREP'].map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setCookingStyle(s as any)}
                      className={`py-2 text-[10px] font-mono-num font-bold uppercase border ${
                        cookingStyle === s ? 'bg-white text-black border-white' : 'border-zinc-800 text-zinc-400 bg-zinc-900'
                      }`}
                    >
                      {s.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Submit Generator Button */}
            <div className="pt-2">
              <button
                id="generate-diet-submit-btn"
                type="submit"
                disabled={isGenerating}
                className="w-full py-4 bg-[#d8ff38] hover:bg-[#cbf425] disabled:opacity-60 text-black font-mono-num font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all glow-accent-subtle"
              >
                {isGenerating ? (
                  <>
                    <span>CALCULATING 7-DAY MACRO MATRIX...</span>
                    <RefreshCw size={16} className="animate-spin" />
                  </>
                ) : (
                  <>
                    <span>GENERATE MY 7-DAY NUTRITION MATRIX</span>
                    <RefreshCw size={16} />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* 7-Day Plan Display Section */}
        {dietPlan && (
          <div className="space-y-8">
            
            {/* Day Selector Tabs (Monday - Sunday) */}
            <div className="border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 snap-x">
                {dietPlan.days.map((day, idx) => (
                  <button
                    key={day.dayName}
                    id={`diet-day-tab-${idx}`}
                    onClick={() => setSelectedDayIdx(idx)}
                    className={`px-3.5 sm:px-4 py-2.5 text-xs font-mono-num font-bold uppercase tracking-wider border transition-all shrink-0 snap-start mobile-tap-active ${
                      selectedDayIdx === idx
                        ? 'bg-[#d8ff38] text-black border-[#d8ff38] shadow-[0_0_12px_rgba(216,255,56,0.3)]'
                        : 'border-zinc-800 text-zinc-400 hover:text-white bg-zinc-950'
                    }`}
                  >
                    DAY 0{day.dayNumber} • {day.dayName.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Day View */}
            {currentDayPlan && (
              <div className="bg-zinc-950 border border-white/15 p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
                
                {/* Day Header & Daily Macro Totals Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5 sm:pb-6">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-mono-num text-[#d8ff38] uppercase tracking-widest block">
                      SCHEDULED PROTOCOL
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold uppercase font-display text-white mt-0.5">
                      {currentDayPlan.dayName}
                    </h3>
                  </div>

                  {/* Daily Macro Bar - Grid on mobile for crisp legibility */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 bg-[#0c0c0e] border border-white/10 p-3 sm:px-6 sm:py-3 font-mono-num">
                    <div className="p-1.5 bg-zinc-900/40 sm:bg-transparent border border-white/5 sm:border-0">
                      <span className="text-[9px] sm:text-[10px] text-zinc-400 uppercase block">TOTAL ENERGY</span>
                      <span className="text-base sm:text-lg font-bold text-white block mt-0.5">{currentDayPlan.dailyCalories} <span className="text-[10px] text-zinc-400">KCAL</span></span>
                    </div>
                    <div className="p-1.5 bg-zinc-900/40 sm:bg-transparent border border-white/5 sm:border-0">
                      <span className="text-[9px] sm:text-[10px] text-zinc-400 uppercase block">PROTEIN</span>
                      <span className="text-base sm:text-lg font-bold text-[#d8ff38] block mt-0.5">{currentDayPlan.dailyProtein}<span className="text-[10px] text-[#d8ff38]/70">G</span></span>
                    </div>
                    <div className="p-1.5 bg-zinc-900/40 sm:bg-transparent border border-white/5 sm:border-0">
                      <span className="text-[9px] sm:text-[10px] text-zinc-400 uppercase block">CARBS</span>
                      <span className="text-base sm:text-lg font-bold text-white block mt-0.5">{currentDayPlan.dailyCarbs}<span className="text-[10px] text-zinc-400">G</span></span>
                    </div>
                    <div className="p-1.5 bg-zinc-900/40 sm:bg-transparent border border-white/5 sm:border-0">
                      <span className="text-[9px] sm:text-[10px] text-zinc-400 uppercase block">FAT</span>
                      <span className="text-base sm:text-lg font-bold text-white block mt-0.5">{currentDayPlan.dailyFat}<span className="text-[10px] text-zinc-400">G</span></span>
                    </div>
                  </div>
                </div>

                {/* Meals List - Clean Rectangular Editorial Modules */}
                <div className="space-y-4">
                  {currentDayPlan.meals.map((meal, mealIdx) => (
                    <div 
                      key={meal.id}
                      className="border border-white/10 bg-zinc-900/30 p-4 sm:p-5 transition-all hover:border-white/20"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3 mb-3">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="px-2 py-0.5 bg-zinc-800 text-[10px] font-mono-num font-bold text-[#d8ff38] uppercase">
                            {meal.category}
                          </span>
                          <h4 className="text-base sm:text-lg font-bold text-white font-mono-num">
                            {meal.name}
                          </h4>
                        </div>

                        {/* Smart Meal Swap Action */}
                        <button
                          id={`meal-swap-btn-${selectedDayIdx}-${mealIdx}`}
                          onClick={() => handleOpenSwapModal(selectedDayIdx, mealIdx, meal)}
                          className="w-full sm:w-auto px-3.5 py-2 sm:py-1 bg-zinc-800 hover:bg-[#d8ff38] hover:text-black border border-white/15 text-zinc-200 font-mono-num text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors mobile-tap-active"
                        >
                          <RefreshCw size={13} />
                          <span>SWAP MEAL</span>
                        </button>
                      </div>

                      {/* Ingredients & Portions */}
                      <div className="space-y-2 mb-4">
                        {meal.foods.map((foodPortion, fIdx) => (
                          <div key={fIdx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 sm:gap-1 text-xs text-zinc-300 font-mono-num bg-zinc-950/40 p-2 border border-white/5">
                            <span className="text-white font-medium">• {foodPortion.displayServing}</span>
                            <span className="text-zinc-400 text-[11px]">
                              {foodPortion.calories} kcal | {foodPortion.protein}g P | {foodPortion.carbs}g C | {foodPortion.fat}g F
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Meal Macro Summary Footer */}
                      <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-6 pt-3 border-t border-white/5 text-xs font-mono-num text-zinc-400">
                        <span>CALORIES: <strong className="text-white">{meal.totalCalories} KCAL</strong></span>
                        <span>PROTEIN: <strong className="text-[#d8ff38]">{meal.totalProtein}G</strong></span>
                        <span>CARBS: <strong className="text-zinc-300">{meal.totalCarbs}G</strong></span>
                        <span>FAT: <strong className="text-zinc-300">{meal.totalFat}G</strong></span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>
        )}

        {/* SMART MEAL SWAP MODAL */}
        {swappingMealInfo && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
            <div className="bg-[#0c0c0e] border-t sm:border border-white/20 rounded-t-2xl sm:rounded-none max-w-2xl w-full p-5 sm:p-8 space-y-5 sm:space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
              
              {/* Mobile Drag Indicator */}
              <div className="sm:hidden w-12 h-1.5 bg-zinc-700 rounded-full mx-auto mb-1 opacity-60" />

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono-num uppercase tracking-widest text-[#d8ff38] block">
                    NUTRITIONAL EQUIVALENCE ENGINE
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold uppercase font-display text-white mt-0.5">
                    SWAP: {swappingMealInfo.currentMeal.name}
                  </h3>
                </div>
                <button 
                  onClick={() => setSwappingMealInfo(null)}
                  className="text-zinc-400 hover:text-white p-1.5"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-3 bg-zinc-900 border border-white/10 text-xs font-mono-num grid grid-cols-2 sm:flex sm:items-center justify-between gap-2 text-zinc-300">
                <span>ORIGINAL TARGET: <strong>{swappingMealInfo.currentMeal.totalCalories} KCAL</strong></span>
                <span>PROTEIN: <strong>{swappingMealInfo.currentMeal.totalProtein}G</strong></span>
                <span className="text-[#d8ff38] col-span-2 sm:col-span-1">TOLERANCE: ±30 KCAL</span>
              </div>

              {/* Alternatives List */}
              <div className="space-y-3">
                {swappingMealInfo.alternatives.length > 0 ? (
                  swappingMealInfo.alternatives.map((altMeal) => (
                    <div 
                      key={altMeal.id}
                      className="border border-white/10 bg-zinc-950 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#d8ff38] transition-colors"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-white font-mono-num">{altMeal.name}</h4>
                        <p className="text-xs text-zinc-400 font-mono-num mt-0.5">
                          {altMeal.foods[0]?.displayServing}
                        </p>
                        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-4 text-xs font-mono-num text-zinc-400 mt-2">
                          <span className="text-white font-bold">{altMeal.totalCalories} KCAL</span>
                          <span className="text-[#d8ff38] font-bold">{altMeal.totalProtein}G PROTEIN</span>
                          <span>{altMeal.totalCarbs}G CARBS</span>
                          <span>{altMeal.totalFat}G FAT</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleConfirmSwap(altMeal)}
                        className="w-full sm:w-auto px-4 py-2.5 bg-[#d8ff38] hover:bg-[#c9f028] text-black font-mono-num font-bold text-xs uppercase tracking-wider self-start sm:self-auto shrink-0 transition-colors mobile-tap-active text-center"
                      >
                        SELECT SWAP
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs font-mono-num text-zinc-500 border border-dashed border-zinc-800">
                    No exact matching alternatives in current category. Modify your diet filters or custom database items in Admin.
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 pt-4 flex justify-end">
                <button
                  onClick={() => setSwappingMealInfo(null)}
                  className="w-full sm:w-auto px-4 py-2.5 border border-zinc-800 text-zinc-400 hover:text-white font-mono-num text-xs uppercase mobile-tap-active"
                >
                  CANCEL
                </button>
              </div>

            </div>
          </div>
        )}

        {/* GROCERY LIST DRAWER / MODAL */}
        {isGroceryViewOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
            <div className="bg-[#0c0c0e] border-t sm:border border-white/20 rounded-t-2xl sm:rounded-none max-w-3xl w-full p-5 sm:p-8 space-y-5 sm:space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
              
              {/* Mobile Drag Indicator */}
              <div className="sm:hidden w-12 h-1.5 bg-zinc-700 rounded-full mx-auto mb-1 opacity-60" />

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono-num uppercase tracking-widest text-[#d8ff38] block">
                    AUTOMATED 7-DAY AGGREGATION
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold uppercase font-display text-white mt-0.5">
                    WEEKLY GROCERY MANIFEST
                  </h3>
                </div>
                <button 
                  onClick={() => setIsGroceryViewOpen(false)}
                  className="text-zinc-400 hover:text-white p-1.5"
                  aria-label="Close grocery list"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Actions: Print, Copy, Download */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <span className="text-xs font-mono-num text-zinc-400">
                  Total Items: <strong className="text-white">{groceryList.length} items</strong>
                </span>

                <div className="grid grid-cols-3 sm:flex items-center gap-2">
                  <button
                    onClick={handleCopyGroceryToClipboard}
                    className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-mono-num text-zinc-300 hover:text-white uppercase text-center mobile-tap-active"
                  >
                    {copiedGroceryNotice ? 'COPIED!' : 'COPY LIST'}
                  </button>
                  <button
                    onClick={handleDownloadGroceryList}
                    className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-mono-num text-zinc-300 hover:text-white uppercase flex items-center justify-center gap-1.5 mobile-tap-active"
                  >
                    <Download size={13} />
                    <span>EXPORT TXT</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-2 bg-[#d8ff38] hover:bg-[#c9f028] text-black text-xs font-mono-num font-bold uppercase flex items-center justify-center gap-1.5 mobile-tap-active"
                  >
                    <Printer size={13} />
                    <span>PRINT</span>
                  </button>
                </div>
              </div>

              {/* Categorized Grocery Items */}
              <div className="space-y-6">
                {(['PROTEINS', 'CARBOHYDRATES', 'VEGETABLES', 'FRUITS', 'DAIRY_ALTERNATIVES', 'PANTRY', 'OTHER'] as const).map(category => {
                  const items = groceryList.filter(g => g.category === category);
                  if (items.length === 0) return null;

                  return (
                    <div key={category} className="space-y-2">
                      <h4 className="text-xs font-mono-num font-bold text-[#d8ff38] uppercase tracking-wider border-b border-white/10 pb-1">
                        {category.replace('_', ' / ')} ({items.length})
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {items.map(item => (
                          <label
                            key={item.id}
                            className={`flex items-center gap-3 p-2.5 border transition-colors cursor-pointer ${
                              item.checked 
                                ? 'border-zinc-800/40 bg-zinc-950/40 opacity-50' 
                                : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={item.checked}
                              onChange={() => toggleGroceryItemCheck(item.id)}
                              className="accent-[#d8ff38] h-4 w-4 rounded-none cursor-pointer"
                            />
                            <div className="font-mono-num text-xs">
                              <span className={`block font-bold ${item.checked ? 'line-through text-zinc-500' : 'text-white'}`}>
                                {item.name}
                              </span>
                              <span className="text-[10px] text-zinc-400">{item.totalQuantity}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-white/10 pt-4 flex justify-end">
                <button
                  onClick={() => setIsGroceryViewOpen(false)}
                  className="px-6 py-2.5 bg-white text-black font-mono-num font-bold text-xs uppercase"
                >
                  DONE
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
