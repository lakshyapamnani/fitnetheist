import { 
  FoodItem, 
  SevenDayDietPlan, 
  DayDietPlan, 
  ScheduledMeal, 
  MealFoodPortion, 
  DietType, 
  CuisineType, 
  GroceryItem, 
  MealCategory,
  FitnessGoal,
  PriceTier
} from '../types';
import { FOOD_DATABASE } from '../data/nutritionDatabase';

export interface GenerateDietParams {
  targetCalories: number;
  dietType: DietType;
  cuisine?: CuisineType;
  mealsPerDay?: number;
  budget?: PriceTier | string;
  preferences?: string[];
  avoidances?: string[];
  goal?: FitnessGoal;
}

/**
 * Filter foods strictly respecting diet type, cuisine preference, and allergens/avoidances.
 */
export function filterEligibleFoods(
  database: FoodItem[],
  dietType: DietType,
  cuisine: CuisineType = 'INDIAN_INTERNATIONAL',
  avoidances: string[] = []
): FoodItem[] {
  return database.filter(item => {
    // 1. Strict Diet Type Constraint
    if (dietType === 'VEGAN') {
      if (item.dietType !== 'VEGAN') return false;
    } else if (dietType === 'VEGETARIAN') {
      if (item.dietType === 'NON-VEGETARIAN') return false;
    }
    // NON-VEGETARIAN allows Non-Veg, Vegetarian, and Vegan options

    // 2. Avoidances & Allergens check
    if (avoidances && avoidances.length > 0) {
      const lowerName = item.name.toLowerCase();
      const lowerServing = item.serving.toLowerCase();
      const itemTags = (item.tags || []).map(t => t.toLowerCase());

      for (const avoid of avoidances) {
        const term = avoid.trim().toLowerCase();
        if (!term) continue;
        if (lowerName.includes(term) || lowerServing.includes(term) || itemTags.includes(term)) {
          return false;
        }
      }
    }

    return true;
  });
}

/**
 * Distribute daily calorie budget across meals based on mealsPerDay.
 */
function getMealSplits(mealsPerDay: number): { category: MealCategory; percent: number; name: string }[] {
  if (mealsPerDay === 3) {
    return [
      { category: 'BREAKFAST', percent: 0.30, name: 'Power Breakfast' },
      { category: 'LUNCH', percent: 0.40, name: 'Performance Lunch' },
      { category: 'DINNER', percent: 0.30, name: 'Recovery Dinner' }
    ];
  } else if (mealsPerDay === 4) {
    return [
      { category: 'BREAKFAST', percent: 0.25, name: 'Morning Ignition' },
      { category: 'LUNCH', percent: 0.35, name: 'Performance Lunch' },
      { category: 'SNACK', percent: 0.15, name: 'Athletic Fuel Snack' },
      { category: 'DINNER', percent: 0.25, name: 'Night Recovery Dinner' }
    ];
  } else if (mealsPerDay === 5) {
    return [
      { category: 'BREAKFAST', percent: 0.22, name: 'Morning Breakfast' },
      { category: 'SNACK', percent: 0.13, name: 'Mid-Morning Fuel' },
      { category: 'LUNCH', percent: 0.32, name: 'Main Power Lunch' },
      { category: 'SNACK', percent: 0.13, name: 'Post-Workout Fuel' },
      { category: 'DINNER', percent: 0.20, name: 'Lean Night Dinner' }
    ];
  } else {
    // 6 meals per day
    return [
      { category: 'BREAKFAST', percent: 0.20, name: 'Morning Breakfast' },
      { category: 'SNACK', percent: 0.12, name: 'Mid-Morning Fuel' },
      { category: 'LUNCH', percent: 0.28, name: 'Performance Lunch' },
      { category: 'SNACK', percent: 0.12, name: 'Pre-Training Fuel' },
      { category: 'DINNER', percent: 0.20, name: 'Restoration Dinner' },
      { category: 'SNACK', percent: 0.08, name: 'Bedtime Protein Fuel' }
    ];
  }
}

/**
 * Score and sort food candidates by preference matching.
 */
function rankFoodsByPreference(foods: FoodItem[], preferences: string[], cuisine: CuisineType): FoodItem[] {
  if (foods.length === 0) return [];
  
  const lowerPrefs = preferences.map(p => p.trim().toLowerCase()).filter(Boolean);

  return [...foods].sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;

    // Cuisine preference matching
    if (cuisine === 'INDIAN') {
      if (a.cuisine === 'INDIAN') scoreA += 5;
      if (b.cuisine === 'INDIAN') scoreB += 5;
    } else if (cuisine === 'INTERNATIONAL') {
      if (a.cuisine === 'INTERNATIONAL') scoreA += 5;
      if (b.cuisine === 'INTERNATIONAL') scoreB += 5;
    }

    // Liked food keywords matching
    const aText = (a.name + ' ' + a.serving + ' ' + (a.tags || []).join(' ')).toLowerCase();
    const bText = (b.name + ' ' + b.serving + ' ' + (b.tags || []).join(' ')).toLowerCase();

    for (const pref of lowerPrefs) {
      if (aText.includes(pref)) scoreA += 10;
      if (bText.includes(pref)) scoreB += 10;
    }

    return scoreB - scoreA;
  });
}

/**
 * Build a single ScheduledMeal with precise portion calculation and calculated macros.
 */
export function buildScaledMeal(
  food: FoodItem,
  targetMealCalories: number,
  category: MealCategory,
  mealIndex: number,
  dayIndex: number
): ScheduledMeal {
  const baseCalories = Math.max(1, food.calories);
  // Calculate quantity multiplier to hit the target calories for this meal
  const rawMultiplier = targetMealCalories / baseCalories;
  // Bounded between 0.5 and 2.2 to keep realistic portion sizes
  const boundedMultiplier = Math.max(0.5, Math.min(2.2, rawMultiplier));
  const roundedMultiplier = Math.round(boundedMultiplier * 100) / 100;

  const scaledGrams = Math.round(food.servingGrams * roundedMultiplier);
  const calories = Math.round(food.calories * roundedMultiplier);
  const protein = Math.round(food.protein * roundedMultiplier);
  const carbs = Math.round(food.carbs * roundedMultiplier);
  const fat = Math.round(food.fat * roundedMultiplier);

  let displayServing = `${food.serving} (${scaledGrams}g)`;
  if (Math.abs(roundedMultiplier - 1.0) > 0.05) {
    displayServing = `${food.serving} [Scaled to ${scaledGrams}g, ×${roundedMultiplier.toFixed(2)}]`;
  }

  const portion: MealFoodPortion = {
    food,
    quantityMultiplier: roundedMultiplier,
    displayServing,
    calories,
    protein,
    carbs,
    fat
  };

  return {
    id: `meal_d${dayIndex}_m${mealIndex}_${food.id}_${Date.now()}`,
    category,
    name: food.name,
    foods: [portion],
    totalCalories: calories,
    totalProtein: protein,
    totalCarbs: carbs,
    totalFat: fat
  };
}

/**
 * Main 7-Day Diet Generator Engine.
 * Supports both options object and positional arguments.
 */
export function generateSevenDayDiet(
  paramsOrCalories: GenerateDietParams | number,
  dietTypeArg?: DietType,
  cuisineArg?: CuisineType,
  mealsPerDayArg?: number,
  budgetArg?: string,
  preferencesArg?: string[],
  avoidancesArg?: string[],
  customDatabaseArg?: FoodItem[]
): SevenDayDietPlan {
  let targetCalories = 2050;
  let dietType: DietType = 'NON-VEGETARIAN';
  let cuisine: CuisineType = 'INDIAN_INTERNATIONAL';
  let mealsPerDay = 4;
  let preferences: string[] = [];
  let avoidances: string[] = [];
  let customDatabase = FOOD_DATABASE;

  if (typeof paramsOrCalories === 'object' && paramsOrCalories !== null) {
    targetCalories = paramsOrCalories.targetCalories || 2050;
    dietType = paramsOrCalories.dietType || 'NON-VEGETARIAN';
    cuisine = paramsOrCalories.cuisine || 'INDIAN_INTERNATIONAL';
    mealsPerDay = paramsOrCalories.mealsPerDay || 4;
    preferences = paramsOrCalories.preferences || [];
    avoidances = paramsOrCalories.avoidances || [];
    if (dietTypeArg && Array.isArray(dietTypeArg)) {
      customDatabase = dietTypeArg as any;
    }
  } else {
    targetCalories = Number(paramsOrCalories) || 2050;
    if (dietTypeArg) dietType = dietTypeArg;
    if (cuisineArg) cuisine = cuisineArg;
    if (mealsPerDayArg) mealsPerDay = mealsPerDayArg;
    if (preferencesArg) preferences = preferencesArg;
    if (avoidancesArg) avoidances = avoidancesArg;
    if (customDatabaseArg) customDatabase = customDatabaseArg;
  }

  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const eligibleFoods = filterEligibleFoods(customDatabase, dietType, cuisine, avoidances);

  // Fallback safe pool if filters are too restrictive
  const basePool = eligibleFoods.length > 0 
    ? eligibleFoods 
    : filterEligibleFoods(customDatabase, dietType, 'INDIAN_INTERNATIONAL', []);

  const mealSplits = getMealSplits(mealsPerDay);

  const days: DayDietPlan[] = dayNames.map((dayName, dayIndex) => {
    const meals: ScheduledMeal[] = mealSplits.map((split, mealIndex) => {
      const mealTargetCal = Math.round(targetCalories * split.percent);
      
      // Get category-specific foods
      let categoryFoods = basePool.filter(f => f.mealCategory === split.category);

      // Apply cuisine filter if specific cuisine requested
      if (cuisine === 'INDIAN') {
        const indianOnly = categoryFoods.filter(f => f.cuisine === 'INDIAN');
        if (indianOnly.length > 0) categoryFoods = indianOnly;
      } else if (cuisine === 'INTERNATIONAL') {
        const intlOnly = categoryFoods.filter(f => f.cuisine === 'INTERNATIONAL');
        if (intlOnly.length > 0) categoryFoods = intlOnly;
      }

      if (categoryFoods.length === 0) {
        categoryFoods = basePool.filter(f => f.mealCategory === split.category);
      }
      if (categoryFoods.length === 0) {
        categoryFoods = basePool;
      }

      // Rank by preferences
      const rankedFoods = rankFoodsByPreference(categoryFoods, preferences, cuisine);

      // Rotational index to ensure variety across the 7 days
      const rotationIdx = (dayIndex + (mealIndex * 2)) % rankedFoods.length;
      const selectedFood = rankedFoods[rotationIdx] || rankedFoods[0];

      return buildScaledMeal(selectedFood, mealTargetCal, split.category, mealIndex, dayIndex);
    });

    // Daily Macro Calculations
    const dailyCalories = meals.reduce((sum, m) => sum + m.totalCalories, 0);
    const dailyProtein = meals.reduce((sum, m) => sum + m.totalProtein, 0);
    const dailyCarbs = meals.reduce((sum, m) => sum + m.totalCarbs, 0);
    const dailyFat = meals.reduce((sum, m) => sum + m.totalFat, 0);

    return {
      dayNumber: dayIndex + 1,
      dayName,
      meals,
      dailyCalories,
      dailyProtein,
      dailyCarbs,
      dailyFat
    };
  });

  return {
    id: `plan_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    targetCalories,
    dietType,
    cuisine,
    mealsPerDay,
    days
  };
}

/**
 * Generate Smart Meal Swap Alternatives with exact portion scaling and calculated macros.
 */
export function getMealAlternatives(
  currentMeal: ScheduledMeal,
  dietType: DietType,
  cuisine: CuisineType = 'INDIAN_INTERNATIONAL',
  avoidances: string[] = [],
  database: FoodItem[] = FOOD_DATABASE
): ScheduledMeal[] {
  const targetCalories = currentMeal.totalCalories;
  const eligiblePool = filterEligibleFoods(database, dietType, cuisine, avoidances);

  // Filter foods that match the meal category and aren't the current food
  const candidateFoods = eligiblePool.filter(f => {
    if (f.mealCategory !== currentMeal.category) return false;
    if (currentMeal.foods.some(pf => pf.food.id === f.id)) return false;
    return true;
  });

  return candidateFoods.slice(0, 6).map((food, idx) => {
    return buildScaledMeal(food, targetCalories, currentMeal.category, idx, 0);
  });
}

/**
 * Consolidate 7-day meal plan into a structured, categorized grocery list.
 */
export function generateGroceryList(plan: SevenDayDietPlan): GroceryItem[] {
  const foodQuantities: Record<string, { 
    category: GroceryItem['category']; 
    totalGrams: number; 
    totalPortions: number; 
    sampleServing: string;
  }> = {};

  plan.days.forEach(day => {
    day.meals.forEach(meal => {
      meal.foods.forEach(pf => {
        const name = pf.food.name;
        if (!foodQuantities[name]) {
          let category: GroceryItem['category'] = 'OTHER';
          const lower = name.toLowerCase();

          if (
            lower.includes('chicken') || 
            lower.includes('salmon') || 
            lower.includes('egg') || 
            lower.includes('whey') || 
            lower.includes('fish') || 
            lower.includes('tuna') || 
            lower.includes('turkey') || 
            lower.includes('shrimp') ||
            lower.includes('paneer') || 
            lower.includes('tofu') || 
            lower.includes('tempeh') || 
            lower.includes('seitan') || 
            lower.includes('soya') || 
            lower.includes('pea protein')
          ) {
            category = 'PROTEINS';
          } else if (
            lower.includes('rice') || 
            lower.includes('oats') || 
            lower.includes('roti') || 
            lower.includes('sourdough') || 
            lower.includes('bagel') || 
            lower.includes('quinoa') || 
            lower.includes('sweet potato') || 
            lower.includes('potato') || 
            lower.includes('pasta') || 
            lower.includes('soba') ||
            lower.includes('chickpea') ||
            lower.includes('chole') ||
            lower.includes('rajma')
          ) {
            category = 'CARBOHYDRATES';
          } else if (
            lower.includes('broccoli') || 
            lower.includes('spinach') || 
            lower.includes('salad') || 
            lower.includes('zucchini') || 
            lower.includes('asparagus') || 
            lower.includes('pumpkin') || 
            lower.includes('peppers') || 
            lower.includes('greens') || 
            lower.includes('bok choy') ||
            lower.includes('cucumber')
          ) {
            category = 'VEGETABLES';
          } else if (
            lower.includes('banana') || 
            lower.includes('berries') || 
            lower.includes('apple') || 
            lower.includes('blueberries') || 
            lower.includes('raspberries')
          ) {
            category = 'FRUITS';
          } else if (
            lower.includes('milk') || 
            lower.includes('yogurt') || 
            lower.includes('curd') || 
            lower.includes('cottage cheese') || 
            lower.includes('ricotta') ||
            lower.includes('soy milk') ||
            lower.includes('almond milk')
          ) {
            category = 'DAIRY_ALTERNATIVES';
          } else {
            category = 'PANTRY';
          }

          foodQuantities[name] = {
            category,
            totalGrams: 0,
            totalPortions: 0,
            sampleServing: pf.food.serving
          };
        }

        const currentPortionGrams = Math.round(pf.food.servingGrams * pf.quantityMultiplier);
        foodQuantities[name].totalGrams += currentPortionGrams;
        foodQuantities[name].totalPortions += pf.quantityMultiplier;
      });
    });
  });

  return Object.keys(foodQuantities).map((name, idx) => {
    const info = foodQuantities[name];
    const roundedGrams = Math.round(info.totalGrams);
    const weightString = roundedGrams >= 1000 
      ? `${(roundedGrams / 1000).toFixed(2)} kg` 
      : `${roundedGrams}g`;

    return {
      id: `grocery_${idx}_${Date.now()}`,
      name,
      category: info.category,
      totalQuantity: `${weightString} (~${info.totalPortions.toFixed(1)} portions / week)`,
      checked: false
    };
  });
}
