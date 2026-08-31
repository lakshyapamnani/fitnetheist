import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, RefreshCw, Check, Scale, Sliders, Utensils, Zap, Sparkles } from 'lucide-react';

interface MealOption {
  id: string;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  portion: string;
  tag: string;
}

const BASE_MEAL: MealOption = {
  id: 'base-chicken',
  name: 'CHICKEN RICE BOWL',
  category: 'Non-Vegetarian',
  calories: 520,
  protein: 45,
  carbs: 55,
  fat: 12,
  portion: '160g Grilled Chicken Breast, 180g Steamed Basmati Rice, 80g Steamed Broccoli',
  tag: 'ORIGINAL PRESCRIBED MEAL'
};

const SWAP_OPTIONS: MealOption[] = [
  {
    id: 'swap-paneer',
    name: 'PANEER RICE BOWL',
    category: 'Vegetarian',
    calories: 510,
    protein: 32,
    carbs: 58,
    fat: 16,
    portion: '140g Low-Fat Spiced Paneer, 180g Basmati Rice, 80g Grilled Capsicum & Onion',
    tag: 'HIGH-PROTEIN VEG PARITY'
  },
  {
    id: 'swap-egg',
    name: 'EGG RICE BOWL',
    category: 'Eggetarian',
    calories: 505,
    protein: 36,
    carbs: 52,
    fat: 14,
    portion: '3 Whole Eggs + 2 Egg Whites Scrambled, 180g Jeera Brown Rice, Steamed Spinach',
    tag: 'BIOAVAILABLE AMINO PARITY'
  },
  {
    id: 'swap-dal-soya',
    name: 'DAL RICE & CRISPY SOYA BOWL',
    category: 'Vegetarian / Vegan',
    calories: 495,
    protein: 38,
    carbs: 62,
    fat: 8,
    portion: '150ml Thick Yellow Dal Tadka, 45g Roasted Soya Chunks, 180g Steamed Rice',
    tag: 'PLANT-BASED MUSCLE FUEL'
  },
  {
    id: 'swap-tofu',
    name: 'TOFU EDAMAME RICE BOWL',
    category: 'Vegan',
    calories: 500,
    protein: 35,
    carbs: 50,
    fat: 15,
    portion: '180g Pan-Seared Firm Tofu, 50g Steamed Edamame, 160g Jasmine Rice, Bok Choy',
    tag: 'CLEAN VEGAN ISOLATE'
  }
];

// Single Item Ingredient Database for the 1:1 Macro Solver (per 100g raw/standard)
interface FoodItemProfile {
  id: string;
  name: string;
  category: 'VEG' | 'NON_VEG' | 'VEGAN';
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  defaultServingGrams: number;
  unitLabel: string;
}

const INGREDIENT_DATABASE: FoodItemProfile[] = [
  { id: 'chicken_breast', name: 'Raw Chicken Breast', category: 'NON_VEG', caloriesPer100g: 165, proteinPer100g: 31, carbsPer100g: 0, fatPer100g: 3.6, defaultServingGrams: 150, unitLabel: 'g' },
  { id: 'paneer_lowfat', name: 'Low-Fat Paneer', category: 'VEG', caloriesPer100g: 200, proteinPer100g: 25, carbsPer100g: 4, fatPer100g: 9, defaultServingGrams: 120, unitLabel: 'g' },
  { id: 'paneer_regular', name: 'Standard Malai Paneer', category: 'VEG', caloriesPer100g: 295, proteinPer100g: 18, carbsPer100g: 3, fatPer100g: 24, defaultServingGrams: 120, unitLabel: 'g' },
  { id: 'soya_chunks', name: 'Raw Soya Chunks (Dry)', category: 'VEGAN', caloriesPer100g: 345, proteinPer100g: 52, carbsPer100g: 33, fatPer100g: 0.5, defaultServingGrams: 50, unitLabel: 'g' },
  { id: 'eggs_whole', name: 'Whole Eggs (Large)', category: 'NON_VEG', caloriesPer100g: 143, proteinPer100g: 12.6, carbsPer100g: 0.7, fatPer100g: 9.5, defaultServingGrams: 150, unitLabel: 'g (approx 3 eggs)' },
  { id: 'egg_whites', name: 'Liquid Egg Whites', category: 'NON_VEG', caloriesPer100g: 52, proteinPer100g: 11, carbsPer100g: 0.7, fatPer100g: 0.2, defaultServingGrams: 200, unitLabel: 'g (approx 6 whites)' },
  { id: 'whey_isolate', name: 'Whey Protein Isolate Powder', category: 'VEG', caloriesPer100g: 375, proteinPer100g: 88, carbsPer100g: 2, fatPer100g: 1, defaultServingGrams: 30, unitLabel: 'g (1 scoop)' },
  { id: 'greek_yogurt', name: '0% Fat Greek Yogurt', category: 'VEG', caloriesPer100g: 59, proteinPer100g: 10, carbsPer100g: 3.6, fatPer100g: 0.4, defaultServingGrams: 200, unitLabel: 'g' },
  { id: 'tofu_firm', name: 'Firm Tofu (Soy)', category: 'VEGAN', caloriesPer100g: 144, proteinPer100g: 15.5, carbsPer100g: 2.8, fatPer100g: 8.7, defaultServingGrams: 180, unitLabel: 'g' },
  { id: 'tempeh', name: 'Organic Tempeh', category: 'VEGAN', caloriesPer100g: 192, proteinPer100g: 20.3, carbsPer100g: 7.6, fatPer100g: 10.8, defaultServingGrams: 150, unitLabel: 'g' },
  { id: 'salmon', name: 'Wild Atlantic Salmon', category: 'NON_VEG', caloriesPer100g: 208, proteinPer100g: 20, carbsPer100g: 0, fatPer100g: 13, defaultServingGrams: 150, unitLabel: 'g' },
  { id: 'dal_uncooked', name: 'Yellow Moong Dal (Dry)', category: 'VEGAN', caloriesPer100g: 347, proteinPer100g: 24, carbsPer100g: 60, fatPer100g: 1.2, defaultServingGrams: 60, unitLabel: 'g' }
];

export const SmartMealSwapSection: React.FC = () => {
  const { setActiveTab } = useApp();
  
  // Showcase Preset Swap State
  const [selectedSwap, setSelectedSwap] = useState<MealOption>(SWAP_OPTIONS[0]);
  const [activeTab, setActiveSectionTab] = useState<'PRESET_MEALS' | 'CUSTOM_SOLVER'>('PRESET_MEALS');

  // Custom 1:1 Solver State
  const [sourceFoodId, setSourceFoodId] = useState<string>('chicken_breast');
  const [sourceGrams, setSourceGrams] = useState<number>(150);
  const [targetFoodId, setTargetFoodId] = useState<string>('paneer_lowfat');
  const [solverMode, setSolverMode] = useState<'PROTEIN' | 'CALORIE'>('PROTEIN');

  const calorieDelta = selectedSwap.calories - BASE_MEAL.calories;

  // Custom Solver Computations
  const sourceFood = INGREDIENT_DATABASE.find(f => f.id === sourceFoodId) || INGREDIENT_DATABASE[0];
  const targetFood = INGREDIENT_DATABASE.find(f => f.id === targetFoodId) || INGREDIENT_DATABASE[1];

  const sourceMultiplier = sourceGrams / 100;
  const sourceMacros = {
    calories: Math.round(sourceFood.caloriesPer100g * sourceMultiplier),
    protein: Math.round(sourceFood.proteinPer100g * sourceMultiplier * 10) / 10,
    carbs: Math.round(sourceFood.carbsPer100g * sourceMultiplier * 10) / 10,
    fat: Math.round(sourceFood.fatPer100g * sourceMultiplier * 10) / 10
  };

  // Required grams calculation
  let requiredTargetGrams = 100;
  if (solverMode === 'PROTEIN') {
    // exact protein matching
    if (targetFood.proteinPer100g > 0) {
      requiredTargetGrams = Math.round((sourceMacros.protein / targetFood.proteinPer100g) * 100);
    }
  } else {
    // exact calorie matching
    if (targetFood.caloriesPer100g > 0) {
      requiredTargetGrams = Math.round((sourceMacros.calories / targetFood.caloriesPer100g) * 100);
    }
  }

  const targetMultiplier = requiredTargetGrams / 100;
  const targetMacros = {
    calories: Math.round(targetFood.caloriesPer100g * targetMultiplier),
    protein: Math.round(targetFood.proteinPer100g * targetMultiplier * 10) / 10,
    carbs: Math.round(targetFood.carbsPer100g * targetMultiplier * 10) / 10,
    fat: Math.round(targetFood.fatPer100g * targetMultiplier * 10) / 10
  };

  const deltaCalories = targetMacros.calories - sourceMacros.calories;
  const deltaProtein = Math.round((targetMacros.protein - sourceMacros.protein) * 10) / 10;
  const deltaCarbs = Math.round((targetMacros.carbs - sourceMacros.carbs) * 10) / 10;
  const deltaFat = Math.round((targetMacros.fat - sourceMacros.fat) * 10) / 10;

  return (
    <section 
      id="smart-meal-swap-section"
      className="relative bg-[#08080a] text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#FFC515]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="border-b border-white/10 pb-12 mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 bg-[#FFC515]"></span>
            <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#FFC515]">
              06 // SMART MEAL SWAP & MACRO EQUIVALENCE ENGINE
            </span>
          </div>
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-extrabold uppercase tracking-tight leading-[0.92] font-display text-white">
                DON'T LIKE IT?<br />
                <span className="text-[#FFC515]">SWAP IT.</span>
              </h2>
            </div>
            <div className="lg:col-span-4 font-mono-num text-sm text-white/70">
              <p>
                Strict diets fail when they are rigid. Fitnetheist calculates 1:1 bioavailable protein and calorie parity in real time so you can swap any food without disrupting your metabolic trajectory.
              </p>
            </div>
          </div>

          {/* Engine Mode Tabs */}
          <div className="flex items-center gap-2 mt-8 font-mono-num text-xs">
            <button
              onClick={() => setActiveSectionTab('PRESET_MEALS')}
              className={`px-4 py-2 uppercase font-extrabold border transition-colors ${
                activeTab === 'PRESET_MEALS' ? 'bg-[#FFC515] text-black border-[#FFC515]' : 'bg-[#14141a] border-white/10 text-white/60 hover:text-white'
              }`}
            >
              PRESET MEAL BENCHMARKS
            </button>
            <button
              onClick={() => setActiveSectionTab('CUSTOM_SOLVER')}
              className={`px-4 py-2 uppercase font-extrabold border transition-colors flex items-center gap-1.5 ${
                activeTab === 'CUSTOM_SOLVER' ? 'bg-[#FFC515] text-black border-[#FFC515]' : 'bg-[#14141a] border-white/10 text-white/60 hover:text-white'
              }`}
            >
              <Scale size={13} />
              <span>CUSTOM 1:1 MACRO EQUIVALENCE CALCULATOR</span>
            </button>
          </div>
        </div>

        {/* View Mode 1: Preset Meal Benchmarks */}
        {activeTab === 'PRESET_MEALS' && (
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Base Prescribed Meal */}
            <div className="lg:col-span-5 border border-white/10 bg-[#101014] p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <span className="text-[11px] font-mono-num text-white/40 uppercase tracking-widest">
                    BASELINE PRESCRIPTION
                  </span>
                  <span className="text-[10px] font-mono-num px-2 py-0.5 bg-white/5 border border-white/10 text-white uppercase">
                    {BASE_MEAL.category}
                  </span>
                </div>

                <span className="text-xs font-mono-num text-[#FFC515] font-bold block mb-1">
                  MEAL 02 // LUNCH
                </span>
                <h3 className="text-3xl font-extrabold font-display uppercase tracking-tight text-white mb-2">
                  {BASE_MEAL.name}
                </h3>
                
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-mono-num font-extrabold text-white">
                    {BASE_MEAL.calories}
                  </span>
                  <span className="text-sm font-mono-num text-white/50 uppercase">
                    KCAL
                  </span>
                </div>

                <div className="p-4 bg-[#08080a] border border-white/10 mb-6">
                  <span className="text-[10px] font-mono-num text-white/40 uppercase tracking-wider block mb-1">
                    PORTION COMPOSITION
                  </span>
                  <p className="text-xs font-mono-num text-white/80">
                    {BASE_MEAL.portion}
                  </p>
                </div>

                {/* Macros breakdown */}
                <div className="grid grid-cols-3 gap-2 font-mono-num text-center">
                  <div className="p-3 bg-white/5 border border-white/5">
                    <span className="text-[10px] text-white/40 uppercase block">PROTEIN</span>
                    <span className="text-base font-bold text-[#FFC515] block mt-0.5">{BASE_MEAL.protein}g</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/5">
                    <span className="text-[10px] text-white/40 uppercase block">CARBS</span>
                    <span className="text-base font-bold text-white block mt-0.5">{BASE_MEAL.carbs}g</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/5">
                    <span className="text-[10px] text-white/40 uppercase block">FATS</span>
                    <span className="text-base font-bold text-white block mt-0.5">{BASE_MEAL.fat}g</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 text-xs font-mono-num text-white/50 flex items-center justify-between">
                <span>ACTIVE PROTOCOL</span>
                <span className="text-white font-bold">LUNCH SLOT</span>
              </div>
            </div>

            {/* Center Connector / Direction Arrow */}
            <div className="lg:col-span-2 flex lg:flex-col items-center justify-center py-4 lg:py-0">
              <div className="p-4 bg-[#14141a] border border-white/15 text-[#FFC515] flex flex-col items-center gap-2">
                <span className="text-[11px] font-mono-num font-bold uppercase tracking-widest">
                  SWAP TO
                </span>
                <ArrowRight className="hidden lg:block" size={20} />
                <span className="text-xs font-mono-num text-white/60">±15 KCAL</span>
              </div>
            </div>

            {/* Right Column: Swap Options Matrix */}
            <div className="lg:col-span-5 border border-white/10 bg-[#101014] p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <span className="text-[11px] font-mono-num text-white/40 uppercase tracking-widest">
                    CALORIE-MATCHED ALTERNATIVES
                  </span>
                  <span className="text-[10px] font-mono-num text-[#FFC515] uppercase font-bold">
                    {calorieDelta === 0 ? 'PERFECT MATCH' : `${calorieDelta > 0 ? '+' : ''}${calorieDelta} KCAL DIFFERENCE`}
                  </span>
                </div>

                {/* Selector Buttons */}
                <div className="space-y-2 mb-6">
                  {SWAP_OPTIONS.map((opt) => {
                    const isSelected = selectedSwap.id === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedSwap(opt)}
                        className={`w-full text-left p-3.5 border font-mono-num transition-all flex items-center justify-between ${
                          isSelected 
                            ? 'border-[#FFC515] bg-[#FFC515]/10 text-white' 
                            : 'border-white/10 bg-[#14141a] text-white/60 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold uppercase text-white font-display">
                              {opt.name}
                            </span>
                            <span className="text-[10px] text-white/40 uppercase">
                              ({opt.category})
                            </span>
                          </div>
                          <span className="text-[11px] text-white/60 block mt-0.5">
                            {opt.tag}
                          </span>
                        </div>
                        <div className="text-right shrink-0 ml-4">
                          <span className="text-sm font-bold text-white block">
                            {opt.calories} KCAL
                          </span>
                          <span className="text-[10px] text-[#FFC515] font-bold">
                            {opt.protein}g Protein
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Swap Detail Card */}
                <div className="p-4 bg-[#08080a] border border-white/10 space-y-3 font-mono-num text-xs">
                  <div className="flex items-center justify-between text-white/60">
                    <span className="text-[10px] uppercase tracking-wider text-white/40">SELECTED REPLACEMENT DETAILS</span>
                    <span className="text-[#FFC515] font-bold">READY TO DEPLOY</span>
                  </div>
                  <p className="text-white/80">
                    {selectedSwap.portion}
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-white/5">
                    <div>
                      <span className="text-[10px] text-white/40 block">PROTEIN</span>
                      <span className="text-white font-bold">{selectedSwap.protein}g</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/40 block">CARBS</span>
                      <span className="text-white font-bold">{selectedSwap.carbs}g</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/40 block">FATS</span>
                      <span className="text-white font-bold">{selectedSwap.fat}g</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <button
                  onClick={() => setActiveTab('nutrition')}
                  className="w-full py-3.5 bg-[#FFC515] hover:bg-[#E6AF0F] text-black font-mono-num font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-[0_0_15px_rgba(255,197,21,0.25)]"
                >
                  <span>OPEN FULL 7-DAY DIET GENERATOR</span>
                  <ArrowRight size={15} />
                </button>
              </div>

            </div>

          </div>
        )}

        {/* View Mode 2: Custom 1:1 Macro Equivalence Solver */}
        {activeTab === 'CUSTOM_SOLVER' && (
          <div className="bg-[#101014] border border-white/15 p-6 sm:p-10 space-y-8">
            
            {/* Solver Controls */}
            <div className="grid md:grid-cols-3 gap-6 border-b border-white/10 pb-8">
              
              {/* Source Food */}
              <div>
                <label className="block text-xs font-mono-num text-white/60 uppercase tracking-wider mb-2">
                  01 // SOURCE INGREDIENT TO REPLACE
                </label>
                <select
                  value={sourceFoodId}
                  onChange={(e) => setSourceFoodId(e.target.value)}
                  className="w-full bg-[#14141a] border border-white/10 p-3 text-xs font-mono-num text-white uppercase focus:border-[#FFC515] focus:outline-none mb-3"
                >
                  {INGREDIENT_DATABASE.map(food => (
                    <option key={food.id} value={food.id}>
                      {food.name} ({food.category})
                    </option>
                  ))}
                </select>

                <div className="flex items-center justify-between text-xs font-mono-num text-white/60 mb-1">
                  <span>PORTION SIZE</span>
                  <span className="text-white font-bold">{sourceGrams} grams</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="400"
                  step="5"
                  value={sourceGrams}
                  onChange={(e) => setSourceGrams(Number(e.target.value))}
                  className="w-full accent-[#FFC515] bg-zinc-800 h-1.5 cursor-pointer"
                />
              </div>

              {/* Equivalence Strategy */}
              <div>
                <label className="block text-xs font-mono-num text-white/60 uppercase tracking-wider mb-2">
                  02 // MATHEMATICAL PARITY TARGET
                </label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setSolverMode('PROTEIN')}
                    className={`w-full text-left p-3 border font-mono-num transition-all ${
                      solverMode === 'PROTEIN'
                        ? 'border-[#FFC515] bg-[#FFC515]/10 text-white'
                        : 'border-white/10 bg-[#14141a] text-white/60 hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-bold uppercase block text-[#FFC515]">1:1 PROTEIN PARITY</span>
                    <span className="text-[10px] text-white/50 block mt-0.5">Calculates exact replacement grams to preserve daily protein synthesis.</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSolverMode('CALORIE')}
                    className={`w-full text-left p-3 border font-mono-num transition-all ${
                      solverMode === 'CALORIE'
                        ? 'border-[#FFC515] bg-[#FFC515]/10 text-white'
                        : 'border-white/10 bg-[#14141a] text-white/60 hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-bold uppercase block text-white">1:1 CALORIE PARITY</span>
                    <span className="text-[10px] text-white/50 block mt-0.5">Calculates exact replacement grams to preserve daily energy deficit/surplus.</span>
                  </button>
                </div>
              </div>

              {/* Replacement Target Food */}
              <div>
                <label className="block text-xs font-mono-num text-white/60 uppercase tracking-wider mb-2">
                  03 // DESIRED REPLACEMENT INGREDIENT
                </label>
                <select
                  value={targetFoodId}
                  onChange={(e) => setTargetFoodId(e.target.value)}
                  className="w-full bg-[#14141a] border border-white/10 p-3 text-xs font-mono-num text-white uppercase focus:border-[#FFC515] focus:outline-none"
                >
                  {INGREDIENT_DATABASE.map(food => (
                    <option key={food.id} value={food.id}>
                      {food.name} ({food.category})
                    </option>
                  ))}
                </select>
                <div className="p-3 bg-[#14141a] border border-white/5 mt-3 text-xs font-mono-num text-white/60">
                  <span className="text-[10px] text-white/40 uppercase block mb-1">DENSITY (PER 100G RAW):</span>
                  <div className="flex justify-between text-white/80">
                    <span>{targetFood.caloriesPer100g} kcal</span>
                    <span className="text-[#FFC515] font-bold">{targetFood.proteinPer100g}g protein</span>
                    <span>{targetFood.fatPer100g}g fat</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Calculated Solution Display */}
            <div className="grid md:grid-cols-12 gap-6 items-center">
              
              {/* Baseline Source Card */}
              <div className="md:col-span-5 p-6 bg-[#0c0c10] border border-white/10 space-y-4 font-mono-num">
                <span className="text-[10px] text-white/40 uppercase tracking-widest block">ORIGINAL PORTION</span>
                <div>
                  <h4 className="text-xl font-bold uppercase text-white">{sourceFood.name}</h4>
                  <span className="text-2xl font-extrabold text-white mt-1 block">{sourceGrams} GRAMS</span>
                </div>
                <div className="grid grid-cols-4 gap-1 text-center text-xs pt-2 border-t border-white/5">
                  <div className="p-2 bg-black/40">
                    <span className="text-[9px] text-white/40 block">KCAL</span>
                    <span className="font-bold text-white">{sourceMacros.calories}</span>
                  </div>
                  <div className="p-2 bg-black/40">
                    <span className="text-[9px] text-white/40 block">PRO</span>
                    <span className="font-bold text-[#FFC515]">{sourceMacros.protein}g</span>
                  </div>
                  <div className="p-2 bg-black/40">
                    <span className="text-[9px] text-white/40 block">CARB</span>
                    <span className="font-bold text-white">{sourceMacros.carbs}g</span>
                  </div>
                  <div className="p-2 bg-black/40">
                    <span className="text-[9px] text-white/40 block">FAT</span>
                    <span className="font-bold text-white">{sourceMacros.fat}g</span>
                  </div>
                </div>
              </div>

              {/* Equivalence Operator */}
              <div className="md:col-span-2 text-center font-mono-num">
                <div className="inline-flex flex-col items-center justify-center p-3 bg-[#0c0c0f] border border-[#FFC515]/30">
                  <span className="text-[10px] font-bold text-[#FFC515] uppercase">EXACT SWAP</span>
                  <ArrowRight size={18} className="text-white my-1" />
                  <span className="text-[9px] text-white/50 uppercase">{solverMode} MATCH</span>
                </div>
              </div>

              {/* Calculated Replacement Card */}
              <div className="md:col-span-5 p-6 bg-[#0c0c0f] border-2 border-[#FFC515] space-y-4 font-mono-num relative overflow-hidden">
                <div className="absolute top-0 right-0 px-3 py-1 bg-[#FFC515] text-black text-[10px] font-extrabold uppercase">
                  SOLVED PORTION
                </div>
                <span className="text-[10px] text-[#FFC515] uppercase tracking-widest block font-bold">REPLACEMENT REQUIRED</span>
                <div>
                  <h4 className="text-xl font-bold uppercase text-white">{targetFood.name}</h4>
                  <span className="text-3xl font-extrabold text-[#FFC515] mt-1 block">
                    {requiredTargetGrams} GRAMS
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1 text-center text-xs pt-2 border-t border-white/10">
                  <div className="p-2 bg-white/5">
                    <span className="text-[9px] text-white/40 block">KCAL</span>
                    <span className="font-bold text-white">{targetMacros.calories}</span>
                  </div>
                  <div className="p-2 bg-white/5">
                    <span className="text-[9px] text-white/40 block">PRO</span>
                    <span className="font-bold text-[#FFC515]">{targetMacros.protein}g</span>
                  </div>
                  <div className="p-2 bg-white/5">
                    <span className="text-[9px] text-white/40 block">CARB</span>
                    <span className="font-bold text-white">{targetMacros.carbs}g</span>
                  </div>
                  <div className="p-2 bg-white/5">
                    <span className="text-[9px] text-white/40 block">FAT</span>
                    <span className="font-bold text-white">{targetMacros.fat}g</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Macro Delta Summary Banner */}
            <div className="p-4 bg-[#14141a] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono-num text-xs">
              <div className="flex items-center gap-2">
                <Zap size={15} className="text-[#FFC515]" />
                <span className="text-white font-bold uppercase">NET VARIANCE:</span>
                <span className="text-white/70">
                  Calories: {deltaCalories >= 0 ? `+${deltaCalories}` : deltaCalories} kcal | 
                  Protein: {deltaProtein >= 0 ? `+${deltaProtein}` : deltaProtein}g | 
                  Carbs: {deltaCarbs >= 0 ? `+${deltaCarbs}` : deltaCarbs}g | 
                  Fat: {deltaFat >= 0 ? `+${deltaFat}` : deltaFat}g
                </span>
              </div>
              <button
                onClick={() => setActiveTab('nutrition')}
                className="px-4 py-2 bg-[#FFC515] hover:bg-[#E6AF0F] text-black font-extrabold uppercase text-[11px] shrink-0 transition-colors"
              >
                APPLY TO 7-DAY MEAL PLAN →
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
