import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useAdmin } from '../../context/AdminContext';
import {
  AdminDietPlan,
  AdminDietMeal,
  AdminDietFoodItem,
  DietType,
  MealCategory,
  FoodItem
} from '../../types';
import { getLocalDateString } from '../../types/admin';
import {
  Utensils,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  UserCheck,
  Search,
  Flame,
  Clock,
  Save,
  Copy,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Database,
  Sparkles,
  FileText,
  ArrowRight
} from 'lucide-react';

export const DietManagementAdminView: React.FC = () => {
  const { foodDatabase, addFoodToDatabase, deleteFoodFromDatabase, assignPersonalizedDietToClient } = useApp();
  const {
    customers,
    leads,
    customDietPlans,
    saveCustomDietPlan,
    deleteCustomDietPlan,
    assignDietPlanToClient,
    dailyDietTrackingByClient,
    selectedCustomerId,
    setSelectedCustomerId,
    setActiveSubtab
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<'BUILDER' | 'ASSIGN' | 'CLIENT_TRACKING' | 'FOOD_DB'>('BUILDER');
  const [statusBanner, setStatusBanner] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Builder State
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [planName, setPlanName] = useState('1800 kcal High-Protein Fat Loss & Postpartum Protocol');
  const [planDescription, setPlanDescription] = useState('Tailored clinical nutrition blueprint with balanced macro timing and sustainable Indian meals.');
  const [targetDailyCalories, setTargetDailyCalories] = useState<number>(1800);
  const [planDietType, setPlanDietType] = useState<DietType>('VEGETARIAN');
  const [coachNotes, setCoachNotes] = useState('Maintain 3.5L daily hydration. Weigh portions cooked unless specified.');
  const [meals, setMeals] = useState<AdminDietMeal[]>([
    {
      id: `meal_${Date.now()}_1`,
      name: 'Breakfast',
      category: 'BREAKFAST',
      scheduledTime: '08:30 AM',
      notes: 'Morning protein & complex carbohydrate fuel',
      totalCalories: 380,
      totalProtein: 26,
      totalCarbs: 42,
      totalFat: 11,
      items: [
        {
          id: `item_${Date.now()}_101`,
          name: 'Moong Dal Chilla + Low-Fat Paneer Stuffing',
          serving: '2 medium chillas + 60g paneer',
          quantity: 1,
          calories: 380,
          protein: 26,
          carbs: 42,
          fat: 11
        }
      ]
    },
    {
      id: `meal_${Date.now()}_2`,
      name: 'Lunch',
      category: 'LUNCH',
      scheduledTime: '01:30 PM',
      notes: 'Balanced lunch with green salad bowl',
      totalCalories: 520,
      totalProtein: 32,
      totalCarbs: 58,
      totalFat: 16,
      items: [
        {
          id: `item_${Date.now()}_102`,
          name: 'Whole Wheat Roti + Soya/Paneer Bhurji + Salad',
          serving: '2 rotis + 150g subzi + cucumber salad',
          quantity: 1,
          calories: 520,
          protein: 32,
          carbs: 58,
          fat: 16
        }
      ]
    },
    {
      id: `meal_${Date.now()}_3`,
      name: 'Evening Pre-Workout Snack',
      category: 'SNACK',
      scheduledTime: '05:00 PM',
      notes: 'Light pre-training energy & amino acids',
      totalCalories: 280,
      totalProtein: 26,
      totalCarbs: 28,
      totalFat: 6,
      items: [
        {
          id: `item_${Date.now()}_103`,
          name: 'Whey Isolate Shake + Roasted Makhana',
          serving: '1 scoop whey + 30g makhana',
          quantity: 1,
          calories: 280,
          protein: 26,
          carbs: 28,
          fat: 6
        }
      ]
    },
    {
      id: `meal_${Date.now()}_4`,
      name: 'Dinner',
      category: 'DINNER',
      scheduledTime: '08:30 PM',
      notes: 'Light evening recovery meal 2h before sleep',
      totalCalories: 490,
      totalProtein: 30,
      totalCarbs: 38,
      totalFat: 20,
      items: [
        {
          id: `item_${Date.now()}_104`,
          name: 'Grilled Paneer/Tofu Tikka + Dal Tadka Bowl',
          serving: '120g paneer + 150g yellow dal + sautéed veggies',
          quantity: 1,
          calories: 490,
          protein: 30,
          carbs: 38,
          fat: 20
        }
      ]
    }
  ]);

  // Quick Add Food Item State per Meal
  const [activeMealForFoodModal, setActiveMealForFoodModal] = useState<string | null>(null);
  const [foodSearchQuery, setFoodSearchQuery] = useState('');
  const [customFoodName, setCustomFoodName] = useState('');
  const [customFoodServing, setCustomFoodServing] = useState('100g cooked / 1 serving');
  const [customFoodQuantity, setCustomFoodQuantity] = useState<number>(1);
  const [customFoodCalories, setCustomFoodCalories] = useState<number>(220);
  const [customFoodProtein, setCustomFoodProtein] = useState<number>(18);
  const [customFoodCarbs, setCustomFoodCarbs] = useState<number>(22);
  const [customFoodFat, setCustomFoodFat] = useState<number>(7);

  // Client Assignment State
  const allAssignableClients = useMemo(() => {
    const map = new Map<string, { id: string; name: string; email: string; phone: string; packageName?: string; assignedDietPlan?: AdminDietPlan; dailyCalories?: number }>();
    (customers || []).forEach(c => {
      if (c && c.id) {
        map.set(c.id, {
          id: c.id,
          name: c.name,
          email: c.email,
          phone: c.phone || '',
          packageName: c.packageName || c.programTier,
          assignedDietPlan: c.assignedDietPlan,
          dailyCalories: c.dailyCalories
        });
      }
    });
    (leads || []).filter(l => l && l.status === 'CONVERTED').forEach(l => {
      const cid = `cust_${l.id.replace('lead_', '')}`;
      const alreadyByEmail = Array.from(map.values()).some(
        existing => existing.email && l.email && existing.email.toLowerCase() === l.email.toLowerCase()
      );
      if (!map.has(cid) && !alreadyByEmail) {
        map.set(cid, {
          id: cid,
          name: l.name,
          email: l.email,
          phone: l.phone || '',
          packageName: l.packageName || l.challengeInterest,
          dailyCalories: l.calculatedCalories
        });
      }
    });
    return Array.from(map.values());
  }, [customers, leads]);

  const [selectedClientIdForAssign, setSelectedClientIdForAssign] = useState<string>(() => {
    return selectedCustomerId || allAssignableClients[0]?.id || '';
  });
  const [selectedTemplateIdForAssign, setSelectedTemplateIdForAssign] = useState<string>(() => {
    return customDietPlans[0]?.id || '';
  });

  // Food DB New Food State
  const [isAddFoodDbOpen, setIsAddFoodDbOpen] = useState(false);
  const [newDbFood, setNewDbFood] = useState<Partial<FoodItem>>({
    name: '',
    serving: '100g',
    servingGrams: 100,
    calories: 180,
    protein: 15,
    carbs: 20,
    fat: 5,
    fiber: 3,
    dietType: 'VEGETARIAN',
    cuisine: 'INDIAN',
    mealCategory: 'LUNCH',
    priceTier: 'STANDARD'
  });

  const showNotice = (type: 'success' | 'error', text: string) => {
    setStatusBanner({ type, text });
    setTimeout(() => setStatusBanner(null), 5000);
  };

  // Automatic Dynamic Calorie & Macro Calculation
  const computedMeals = useMemo(() => {
    return meals.map(meal => {
      const items = meal.items || [];
      const totalCalories = items.reduce((sum, item) => sum + (Number(item.calories) || 0), 0);
      const totalProtein = items.reduce((sum, item) => sum + (Number(item.protein) || 0), 0);
      const totalCarbs = items.reduce((sum, item) => sum + (Number(item.carbs) || 0), 0);
      const totalFat = items.reduce((sum, item) => sum + (Number(item.fat) || 0), 0);
      return {
        ...meal,
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFat
      };
    });
  }, [meals]);

  const planTotals = useMemo(() => {
    return computedMeals.reduce(
      (acc, m) => ({
        calories: acc.calories + m.totalCalories,
        protein: acc.protein + m.totalProtein,
        carbs: acc.carbs + m.totalCarbs,
        fat: acc.fat + m.totalFat
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [computedMeals]);

  const handleAddMealSlot = () => {
    const newMeal: AdminDietMeal = {
      id: `meal_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      name: `Meal ${meals.length + 1}`,
      category: 'SNACK',
      scheduledTime: '04:30 PM',
      notes: '',
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      items: []
    };
    setMeals(prev => [...prev, newMeal]);
  };

  const handleRemoveMealSlot = (mealId: string) => {
    if (meals.length <= 1) {
      showNotice('error', 'A diet plan must contain at least one meal.');
      return;
    }
    setMeals(prev => prev.filter(m => m.id !== mealId));
  };

  const handleUpdateMealMeta = (mealId: string, updates: Partial<AdminDietMeal>) => {
    setMeals(prev => prev.map(m => (m.id === mealId ? { ...m, ...updates } : m)));
  };

  const handleUpdateFoodItemInMeal = (mealId: string, itemId: string, updates: Partial<AdminDietFoodItem>) => {
    setMeals(prev =>
      prev.map(m => {
        if (m.id !== mealId) return m;
        const updatedItems = m.items.map(it => {
          if (it.id !== itemId) return it;
          // If quantity multiplier changed and user didn't directly override calories, scale proportionally if desired, or let direct calorie edits work seamlessly
          if (updates.quantity !== undefined && updates.calories === undefined && it.quantity > 0) {
            const ratio = Math.max(0.25, Number(updates.quantity) || 1) / it.quantity;
            return {
              ...it,
              ...updates,
              calories: Math.round(it.calories * ratio),
              protein: Math.round(it.protein * ratio),
              carbs: Math.round(it.carbs * ratio),
              fat: Math.round(it.fat * ratio)
            };
          }
          return { ...it, ...updates };
        });
        return { ...m, items: updatedItems };
      })
    );
  };

  const handleRemoveFoodItemFromMeal = (mealId: string, itemId: string) => {
    setMeals(prev =>
      prev.map(m => (m.id === mealId ? { ...m, items: m.items.filter(i => i.id !== itemId) } : m))
    );
  };

  const handleAddCustomFoodToMeal = (mealId: string) => {
    if (!customFoodName.trim()) {
      showNotice('error', 'Please enter a food item name.');
      return;
    }
    const newItem: AdminDietFoodItem = {
      id: `dfi_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: customFoodName.trim(),
      serving: customFoodServing.trim() || '1 serving',
      quantity: Math.max(0.25, Number(customFoodQuantity) || 1),
      calories: Math.max(0, Math.round(Number(customFoodCalories) || 0)),
      protein: Math.max(0, Math.round(Number(customFoodProtein) || 0)),
      carbs: Math.max(0, Math.round(Number(customFoodCarbs) || 0)),
      fat: Math.max(0, Math.round(Number(customFoodFat) || 0))
    };

    setMeals(prev =>
      prev.map(m => (m.id === mealId ? { ...m, items: [...m.items, newItem] } : m))
    );
    setCustomFoodName('');
    setCustomFoodServing('100g cooked / 1 serving');
    setCustomFoodQuantity(1);
    setCustomFoodCalories(200);
    setCustomFoodProtein(15);
    setCustomFoodCarbs(20);
    setCustomFoodFat(6);
  };

  const handleAddDatabaseFoodToMeal = (mealId: string, food: FoodItem) => {
    const newItem: AdminDietFoodItem = {
      id: `dfi_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      foodId: food.id,
      name: food.name,
      serving: food.serving,
      quantity: 1,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat
    };
    setMeals(prev =>
      prev.map(m => (m.id === mealId ? { ...m, items: [...m.items, newItem] } : m))
    );
    showNotice('success', `Added "${food.name}" (${food.calories} kcal) to meal.`);
  };

  const buildCurrentPlanObject = (): AdminDietPlan | null => {
    if (!planName.trim()) {
      showNotice('error', 'Please provide a Diet Plan Name before saving.');
      return null;
    }
    const totalFoodCount = computedMeals.reduce((s, m) => s + m.items.length, 0);
    if (totalFoodCount === 0) {
      showNotice('error', 'Please add at least one food item to the meal schedule.');
      return null;
    }

    return {
      id: editingPlanId || `diet_plan_${Date.now()}`,
      name: planName.trim(),
      description: planDescription.trim(),
      targetDailyCalories: Number(targetDailyCalories) || planTotals.calories,
      totalDailyCalories: planTotals.calories,
      totalDailyProtein: planTotals.protein,
      totalDailyCarbs: planTotals.carbs,
      totalDailyFat: planTotals.fat,
      dietType: planDietType,
      meals: computedMeals,
      coachNotes: coachNotes.trim(),
      isTemplate: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  };

  const handleSaveDietPlan = () => {
    const planObj = buildCurrentPlanObject();
    if (!planObj) return;
    saveCustomDietPlan(planObj);
    setEditingPlanId(planObj.id);
    setSelectedTemplateIdForAssign(planObj.id);
    showNotice(
      'success',
      `Saved "${planObj.name}" (${planObj.totalDailyCalories} kcal total across ${planObj.meals.length} meals) to Diet Library & Realtime DB!`
    );
  };

  const handleLoadPlanIntoEditor = (plan: AdminDietPlan) => {
    setEditingPlanId(plan.id);
    setPlanName(plan.name);
    setPlanDescription(plan.description || '');
    setTargetDailyCalories(plan.targetDailyCalories || plan.totalDailyCalories);
    setPlanDietType(plan.dietType || 'VEGETARIAN');
    setCoachNotes(plan.coachNotes || '');
    // Deep clone meals for editing
    setMeals(
      (plan.meals || []).map(m => ({
        ...m,
        items: (m.items || []).map(i => ({ ...i }))
      }))
    );
    setActiveTab('BUILDER');
    showNotice('success', `Loaded "${plan.name}" into the Diet Plan Builder.`);
  };

  const handleStartFreshPlan = () => {
    setEditingPlanId(null);
    setPlanName('Custom Client Nutrition Protocol');
    setPlanDescription('Personalized daily meal schedule and macro targets.');
    setTargetDailyCalories(1900);
    setPlanDietType('VEGETARIAN');
    setCoachNotes('Drink 3.5L water daily. Follow serving sizes strictly.');
    setMeals([
      {
        id: `meal_${Date.now()}_bf`,
        name: 'Breakfast',
        category: 'BREAKFAST',
        scheduledTime: '08:30 AM',
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        items: []
      },
      {
        id: `meal_${Date.now()}_ln`,
        name: 'Lunch',
        category: 'LUNCH',
        scheduledTime: '01:30 PM',
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        items: []
      },
      {
        id: `meal_${Date.now()}_sn`,
        name: 'Snack',
        category: 'SNACK',
        scheduledTime: '05:00 PM',
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        items: []
      },
      {
        id: `meal_${Date.now()}_dn`,
        name: 'Dinner',
        category: 'DINNER',
        scheduledTime: '08:30 PM',
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        items: []
      }
    ]);
  };

  const handleAssignBuilderPlanDirectly = (clientId: string) => {
    const client = allAssignableClients.find(c => c.id === clientId);
    if (!client) {
      showNotice('error', 'Please select a valid client to assign this diet plan.');
      return;
    }
    const planObj = buildCurrentPlanObject();
    if (!planObj) return;

    // Also save to templates library
    saveCustomDietPlan(planObj);
    // Assign deep-cloned snapshot to client in AdminContext + AppContext
    assignDietPlanToClient({ id: client.id, name: client.name, email: client.email }, planObj);
    assignPersonalizedDietToClient({ id: client.id, name: client.name, email: client.email }, planObj);

    showNotice(
      'success',
      `Assigned "${planObj.name}" (${planObj.totalDailyCalories} kcal/day) to ${client.name}! It is now live on their Profile & User Dashboard.`
    );
  };

  const handleAssignTemplateToClient = () => {
    const client = allAssignableClients.find(c => c.id === selectedClientIdForAssign);
    const tpl = customDietPlans.find(p => p.id === selectedTemplateIdForAssign);
    if (!client) {
      showNotice('error', 'Please select a client.');
      return;
    }
    if (!tpl) {
      showNotice('error', 'Please select a diet plan template.');
      return;
    }
    assignDietPlanToClient({ id: client.id, name: client.name, email: client.email }, tpl);
    assignPersonalizedDietToClient({ id: client.id, name: client.name, email: client.email }, tpl);
    showNotice(
      'success',
      `Assigned "${tpl.name}" (${tpl.totalDailyCalories} kcal/day) to ${client.name}!`
    );
  };

  const filteredFoodDb = useMemo(() => {
    const q = foodSearchQuery.trim().toLowerCase();
    return (foodDatabase || []).filter(f => !q || f.name.toLowerCase().includes(q) || f.mealCategory.toLowerCase().includes(q));
  }, [foodDatabase, foodSearchQuery]);

  const todayLocalStr = getLocalDateString();

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-[#101014] border border-white/10 p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono-num uppercase tracking-widest text-[#FFC515] font-bold">
            <Utensils size={14} />
            <span>ADMIN-ONLY CLINICAL NUTRITION ENGINE // REALTIME DB SYNC</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white uppercase tracking-tight mt-1">
            DIET MANAGEMENT & CALORIE PROTOCOLS
          </h1>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
            Create custom multi-meal diet plans with automatic food-to-meal-to-daily calorie calculation, assign independent diet snapshots to clients, and monitor real-time daily meal check-offs.
          </p>
        </div>

        {/* Sub-Navigation Pills */}
        <div className="flex flex-wrap items-center gap-2 font-mono-num text-xs">
          <button
            onClick={() => setActiveTab('BUILDER')}
            className={`px-3.5 py-2 font-bold uppercase border transition-all flex items-center gap-1.5 ${
              activeTab === 'BUILDER'
                ? 'bg-[#FFC515] text-black border-[#FFC515]'
                : 'bg-[#14141a] text-white/70 border-white/10 hover:text-white'
            }`}
          >
            <Edit3 size={13} />
            <span>1. Diet Builder & Library ({customDietPlans.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('ASSIGN')}
            className={`px-3.5 py-2 font-bold uppercase border transition-all flex items-center gap-1.5 ${
              activeTab === 'ASSIGN'
                ? 'bg-[#FFC515] text-black border-[#FFC515]'
                : 'bg-[#14141a] text-white/70 border-white/10 hover:text-white'
            }`}
          >
            <UserCheck size={13} />
            <span>2. Assign to Client</span>
          </button>
          <button
            onClick={() => setActiveTab('CLIENT_TRACKING')}
            className={`px-3.5 py-2 font-bold uppercase border transition-all flex items-center gap-1.5 ${
              activeTab === 'CLIENT_TRACKING'
                ? 'bg-[#FFC515] text-black border-[#FFC515]'
                : 'bg-[#14141a] text-white/70 border-white/10 hover:text-white'
            }`}
          >
            <Flame size={13} />
            <span>3. Client Daily Adherence</span>
          </button>
          <button
            onClick={() => setActiveTab('FOOD_DB')}
            className={`px-3.5 py-2 font-bold uppercase border transition-all flex items-center gap-1.5 ${
              activeTab === 'FOOD_DB'
                ? 'bg-[#FFC515] text-black border-[#FFC515]'
                : 'bg-[#14141a] text-white/70 border-white/10 hover:text-white'
            }`}
          >
            <Database size={13} />
            <span>4. Food Database ({foodDatabase.length})</span>
          </button>
        </div>
      </div>

      {/* Status Notification Banner */}
      {statusBanner && (
        <div
          className={`p-4 border flex items-center justify-between font-mono-num text-xs ${
            statusBanner.type === 'success'
              ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
              : 'bg-red-950/50 border-red-500/40 text-red-300'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {statusBanner.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span className="font-bold">{statusBanner.text}</span>
          </div>
          <button onClick={() => setStatusBanner(null)} className="text-white/60 hover:text-white">
            <X size={15} />
          </button>
        </div>
      )}

      {/* TAB 1: DIET BUILDER & SAVED TEMPLATES */}
      {activeTab === 'BUILDER' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 8 Columns: Interactive Diet Plan Builder */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-[#101014] border border-white/10 p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono-num uppercase tracking-widest text-[#FFC515] font-bold">
                    {editingPlanId ? 'EDITING EXISTING DIET PLAN' : 'CREATE NEW CUSTOM DIET PLAN'}
                  </span>
                  <h2 className="text-lg font-display font-bold text-white uppercase">
                    DIET PLAN CONFIGURATION & AUTOMATIC CALORIE ENGINE
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleStartFreshPlan}
                    className="px-3 py-1.5 bg-[#14141a] hover:bg-white/10 border border-white/15 text-xs font-mono-num uppercase text-white/80"
                  >
                    + New Blank Plan
                  </button>
                  <button
                    onClick={handleSaveDietPlan}
                    className="px-4 py-1.5 bg-[#FFC515] hover:bg-[#e5b012] text-black font-mono-num text-xs font-extrabold uppercase flex items-center gap-1.5"
                  >
                    <Save size={14} />
                    <span>Save Diet Plan</span>
                  </button>
                </div>
              </div>

              {/* Plan Metadata Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-6">
                  <label className="block text-[10px] font-mono-num uppercase text-zinc-400 mb-1 font-bold">
                    DIET PLAN NAME *
                  </label>
                  <input
                    type="text"
                    value={planName}
                    onChange={e => setPlanName(e.target.value)}
                    placeholder="e.g., 1800 kcal Postpartum Fat Loss Diet"
                    className="w-full bg-[#08080a] border border-white/15 px-3 py-2 text-sm text-white focus:border-[#FFC515] focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-[10px] font-mono-num uppercase text-zinc-400 mb-1 font-bold">
                    TARGET DAILY CALORIES (KCAL) *
                  </label>
                  <input
                    type="number"
                    value={targetDailyCalories}
                    onChange={e => setTargetDailyCalories(Math.max(800, Number(e.target.value) || 0))}
                    className="w-full bg-[#08080a] border border-white/15 px-3 py-2 text-sm font-mono-num font-bold text-[#FFC515] focus:border-[#FFC515] focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-[10px] font-mono-num uppercase text-zinc-400 mb-1 font-bold">
                    DIET PREFERENCE
                  </label>
                  <select
                    value={planDietType}
                    onChange={e => setPlanDietType(e.target.value as DietType)}
                    className="w-full bg-[#08080a] border border-white/15 px-3 py-2 text-xs font-mono-num text-white focus:border-[#FFC515] focus:outline-none"
                  >
                    <option value="VEGETARIAN">VEGETARIAN</option>
                    <option value="NON-VEGETARIAN">NON-VEGETARIAN</option>
                    <option value="VEGAN">VEGAN</option>
                  </select>
                </div>
                <div className="sm:col-span-6">
                  <label className="block text-[10px] font-mono-num uppercase text-zinc-400 mb-1 font-bold">
                    DESCRIPTION / PROTOCOL SUMMARY
                  </label>
                  <input
                    type="text"
                    value={planDescription}
                    onChange={e => setPlanDescription(e.target.value)}
                    placeholder="Brief description of the protocol goals..."
                    className="w-full bg-[#08080a] border border-white/15 px-3 py-2 text-xs text-white focus:border-[#FFC515] focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-6">
                  <label className="block text-[10px] font-mono-num uppercase text-zinc-400 mb-1 font-bold">
                    COACH NOTES & HYDRATION RULES
                  </label>
                  <input
                    type="text"
                    value={coachNotes}
                    onChange={e => setCoachNotes(e.target.value)}
                    placeholder="e.g., Drink 3.5L water daily, 15m walk after dinner..."
                    className="w-full bg-[#08080a] border border-white/15 px-3 py-2 text-xs text-white focus:border-[#FFC515] focus:outline-none"
                  />
                </div>
              </div>

              {/* Live Auto-Calculated Daily Macro & Calorie Bar */}
              <div className="bg-[#08080a] border border-[#FFC515]/40 p-4 grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono-num">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block">TARGET CALORIES</span>
                  <span className="text-lg font-extrabold text-white">{targetDailyCalories} kcal</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#FFC515] uppercase block font-bold">AUTO-CALCULATED TOTAL</span>
                  <span className="text-lg font-extrabold text-[#FFC515]">{planTotals.calories} kcal</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block">TOTAL PROTEIN</span>
                  <span className="text-lg font-bold text-emerald-400">{planTotals.protein}g</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block">TOTAL CARBS</span>
                  <span className="text-lg font-bold text-sky-400">{planTotals.carbs}g</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block">TOTAL FATS</span>
                  <span className="text-lg font-bold text-amber-400">{planTotals.fat}g</span>
                </div>
              </div>

              {/* Meals Schedule List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono-num font-bold uppercase tracking-wider text-white">
                    MEAL SCHEDULE & FOOD ITEMS ({computedMeals.length} MEALS)
                  </h3>
                  <button
                    onClick={handleAddMealSlot}
                    className="px-3 py-1.5 bg-[#14141a] hover:bg-[#FFC515] hover:text-black text-[#FFC515] border border-[#FFC515]/40 text-xs font-mono-num font-bold uppercase flex items-center gap-1 transition-colors"
                  >
                    <Plus size={13} />
                    <span>Add Meal Slot</span>
                  </button>
                </div>

                {computedMeals.map((meal, mIdx) => (
                  <div key={meal.id} className="bg-[#0c0c10] border border-white/15 p-4 space-y-4">
                    {/* Meal Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                      <div className="flex flex-wrap items-center gap-2.5 flex-1">
                        <span className="px-2 py-1 bg-[#FFC515] text-black font-mono-num font-extrabold text-[11px]">
                          MEAL #{mIdx + 1}
                        </span>
                        <input
                          type="text"
                          value={meal.name}
                          onChange={e => handleUpdateMealMeta(meal.id, { name: e.target.value })}
                          className="bg-[#14141a] border border-white/15 px-2.5 py-1 text-xs font-bold text-white focus:border-[#FFC515] focus:outline-none"
                          placeholder="Meal Name (e.g. Breakfast)"
                        />
                        <select
                          value={meal.category}
                          onChange={e => handleUpdateMealMeta(meal.id, { category: e.target.value as MealCategory })}
                          className="bg-[#14141a] border border-white/15 px-2 py-1 text-[11px] font-mono-num text-zinc-300"
                        >
                          <option value="BREAKFAST">BREAKFAST</option>
                          <option value="LUNCH">LUNCH</option>
                          <option value="SNACK">SNACK</option>
                          <option value="DINNER">DINNER</option>
                        </select>
                        <div className="flex items-center gap-1 bg-[#14141a] border border-white/15 px-2 py-1">
                          <Clock size={12} className="text-[#FFC515]" />
                          <input
                            type="text"
                            value={meal.scheduledTime}
                            onChange={e => handleUpdateMealMeta(meal.id, { scheduledTime: e.target.value })}
                            className="bg-transparent text-[11px] font-mono-num text-white w-20 focus:outline-none"
                            placeholder="08:30 AM"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 font-mono-num">
                        <div className="text-right">
                          <span className="text-xs font-extrabold text-[#FFC515]">{meal.totalCalories} kcal</span>
                          <span className="block text-[10px] text-zinc-400">
                            P:{meal.totalProtein}g · C:{meal.totalCarbs}g · F:{meal.totalFat}g
                          </span>
                        </div>
                        <button
                          onClick={() => handleRemoveMealSlot(meal.id)}
                          className="p-1.5 text-zinc-500 hover:text-red-400 border border-white/10 hover:border-red-500/40"
                          title="Remove Meal"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Food Items Table inside Meal */}
                    {meal.items.length === 0 ? (
                      <div className="p-4 bg-[#101015] border border-dashed border-white/10 text-center text-xs text-zinc-500 font-mono-num">
                        No food items in {meal.name} yet. Click "Add Food Item" below to add foods.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-white/10 text-[10px] font-mono-num text-zinc-400 uppercase">
                              <th className="py-1.5 pr-2">Food Item Name</th>
                              <th className="py-1.5 px-2">Serving / Portion Size</th>
                              <th className="py-1.5 px-2 w-20">Qty</th>
                              <th className="py-1.5 px-2 w-24">Calories</th>
                              <th className="py-1.5 px-2 w-16">Prot (g)</th>
                              <th className="py-1.5 px-2 w-16">Carb (g)</th>
                              <th className="py-1.5 px-2 w-16">Fat (g)</th>
                              <th className="py-1.5 pl-2 w-10"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-xs">
                            {meal.items.map(item => (
                              <tr key={item.id} className="hover:bg-white/[0.02]">
                                <td className="py-2 pr-2">
                                  <input
                                    type="text"
                                    value={item.name}
                                    onChange={e => handleUpdateFoodItemInMeal(meal.id, item.id, { name: e.target.value })}
                                    className="w-full bg-[#14141a] border border-white/10 px-2 py-1 text-xs text-white font-medium"
                                  />
                                </td>
                                <td className="py-2 px-2">
                                  <input
                                    type="text"
                                    value={item.serving}
                                    onChange={e => handleUpdateFoodItemInMeal(meal.id, item.id, { serving: e.target.value })}
                                    className="w-full bg-[#14141a] border border-white/10 px-2 py-1 text-xs text-zinc-300"
                                  />
                                </td>
                                <td className="py-2 px-2">
                                  <input
                                    type="number"
                                    step="0.5"
                                    min="0.25"
                                    value={item.quantity}
                                    onChange={e => handleUpdateFoodItemInMeal(meal.id, item.id, { quantity: Number(e.target.value) })}
                                    className="w-full bg-[#14141a] border border-white/10 px-2 py-1 text-xs font-mono-num text-white"
                                  />
                                </td>
                                <td className="py-2 px-2">
                                  <input
                                    type="number"
                                    min="0"
                                    value={item.calories}
                                    onChange={e => handleUpdateFoodItemInMeal(meal.id, item.id, { calories: Math.max(0, Number(e.target.value) || 0) })}
                                    className="w-full bg-[#14141a] border border-[#FFC515]/40 px-2 py-1 text-xs font-mono-num font-bold text-[#FFC515]"
                                  />
                                </td>
                                <td className="py-2 px-2">
                                  <input
                                    type="number"
                                    min="0"
                                    value={item.protein}
                                    onChange={e => handleUpdateFoodItemInMeal(meal.id, item.id, { protein: Math.max(0, Number(e.target.value) || 0) })}
                                    className="w-full bg-[#14141a] border border-white/10 px-2 py-1 text-xs font-mono-num text-emerald-400"
                                  />
                                </td>
                                <td className="py-2 px-2">
                                  <input
                                    type="number"
                                    min="0"
                                    value={item.carbs}
                                    onChange={e => handleUpdateFoodItemInMeal(meal.id, item.id, { carbs: Math.max(0, Number(e.target.value) || 0) })}
                                    className="w-full bg-[#14141a] border border-white/10 px-2 py-1 text-xs font-mono-num text-sky-400"
                                  />
                                </td>
                                <td className="py-2 px-2">
                                  <input
                                    type="number"
                                    min="0"
                                    value={item.fat}
                                    onChange={e => handleUpdateFoodItemInMeal(meal.id, item.id, { fat: Math.max(0, Number(e.target.value) || 0) })}
                                    className="w-full bg-[#14141a] border border-white/10 px-2 py-1 text-xs font-mono-num text-amber-400"
                                  />
                                </td>
                                <td className="py-2 pl-2 text-right">
                                  <button
                                    onClick={() => handleRemoveFoodItemFromMeal(meal.id, item.id)}
                                    className="text-zinc-500 hover:text-red-400 p-1"
                                    title="Remove food item"
                                  >
                                    <X size={14} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Add Food Item Trigger / Drawer for this Meal */}
                    <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
                      <input
                        type="text"
                        value={meal.notes || ''}
                        onChange={e => handleUpdateMealMeta(meal.id, { notes: e.target.value })}
                        placeholder="Optional meal note (e.g., Cook in 1 tsp olive oil / ghee)..."
                        className="flex-1 min-w-[220px] bg-[#14141a] border border-white/10 px-2.5 py-1 text-[11px] text-zinc-300"
                      />
                      <button
                        onClick={() => setActiveMealForFoodModal(activeMealForFoodModal === meal.id ? null : meal.id)}
                        className="px-3 py-1.5 bg-white/10 hover:bg-[#FFC515] hover:text-black text-white font-mono-num text-[11px] font-bold uppercase flex items-center gap-1.5 transition-colors"
                      >
                        <Plus size={12} />
                        <span>{activeMealForFoodModal === meal.id ? 'Close Food Picker' : 'Add Food Item to Meal'}</span>
                      </button>
                    </div>

                    {/* Inline Food Picker & Custom Entry Panel */}
                    {activeMealForFoodModal === meal.id && (
                      <div className="bg-[#14141c] border border-[#FFC515]/40 p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Custom Food Entry */}
                          <div className="space-y-2.5 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4">
                            <span className="text-[10px] font-mono-num uppercase text-[#FFC515] font-bold block">
                              OPTION A: ENTER CUSTOM FOOD ITEM & MACROS
                            </span>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={customFoodName}
                                onChange={e => setCustomFoodName(e.target.value)}
                                placeholder="Food Name (e.g. Paneer Bhurji)"
                                className="col-span-2 bg-[#08080a] border border-white/15 px-2.5 py-1.5 text-xs text-white"
                              />
                              <input
                                type="text"
                                value={customFoodServing}
                                onChange={e => setCustomFoodServing(e.target.value)}
                                placeholder="Serving (e.g. 150g bowl)"
                                className="bg-[#08080a] border border-white/15 px-2.5 py-1.5 text-xs text-white"
                              />
                              <div className="flex items-center gap-1 bg-[#08080a] border border-white/15 px-2 py-1.5">
                                <span className="text-[10px] font-mono-num text-zinc-400">KCAL:</span>
                                <input
                                  type="number"
                                  value={customFoodCalories}
                                  onChange={e => setCustomFoodCalories(Number(e.target.value))}
                                  className="w-full bg-transparent text-xs font-mono-num font-bold text-[#FFC515] focus:outline-none"
                                />
                              </div>
                              <div className="grid grid-cols-3 gap-1.5 col-span-2">
                                <div className="bg-[#08080a] border border-white/15 px-2 py-1">
                                  <span className="text-[9px] font-mono-num text-zinc-400 block">PROT (g)</span>
                                  <input
                                    type="number"
                                    value={customFoodProtein}
                                    onChange={e => setCustomFoodProtein(Number(e.target.value))}
                                    className="w-full bg-transparent text-xs font-mono-num text-emerald-400 focus:outline-none"
                                  />
                                </div>
                                <div className="bg-[#08080a] border border-white/15 px-2 py-1">
                                  <span className="text-[9px] font-mono-num text-zinc-400 block">CARB (g)</span>
                                  <input
                                    type="number"
                                    value={customFoodCarbs}
                                    onChange={e => setCustomFoodCarbs(Number(e.target.value))}
                                    className="w-full bg-transparent text-xs font-mono-num text-sky-400 focus:outline-none"
                                  />
                                </div>
                                <div className="bg-[#08080a] border border-white/15 px-2 py-1">
                                  <span className="text-[9px] font-mono-num text-zinc-400 block">FAT (g)</span>
                                  <input
                                    type="number"
                                    value={customFoodFat}
                                    onChange={e => setCustomFoodFat(Number(e.target.value))}
                                    className="w-full bg-transparent text-xs font-mono-num text-amber-400 focus:outline-none"
                                  />
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => handleAddCustomFoodToMeal(meal.id)}
                              className="w-full py-2 bg-[#FFC515] text-black font-mono-num text-xs font-extrabold uppercase"
                            >
                              + Add Custom Food to {meal.name}
                            </button>
                          </div>

                          {/* Pick from Verified Food Database */}
                          <div className="space-y-2">
                            <span className="text-[10px] font-mono-num uppercase text-[#d8ff38] font-bold block">
                              OPTION B: PICK FROM VERIFIED FOOD DATABASE
                            </span>
                            <div className="relative">
                              <Search size={13} className="absolute left-2.5 top-2.5 text-zinc-500" />
                              <input
                                type="text"
                                value={foodSearchQuery}
                                onChange={e => setFoodSearchQuery(e.target.value)}
                                placeholder="Search Indian & International foods..."
                                className="w-full bg-[#08080a] border border-white/15 pl-8 pr-3 py-1.5 text-xs text-white"
                              />
                            </div>
                            <div className="max-h-40 overflow-y-auto space-y-1 pr-1">
                              {filteredFoodDb.slice(0, 25).map(food => (
                                <button
                                  key={food.id}
                                  onClick={() => handleAddDatabaseFoodToMeal(meal.id, food)}
                                  className="w-full text-left p-2 bg-[#08080a] hover:bg-white/10 border border-white/10 flex items-center justify-between text-xs transition-colors"
                                >
                                  <div>
                                    <span className="font-bold text-white block">{food.name}</span>
                                    <span className="text-[10px] text-zinc-400 font-mono-num">
                                      {food.serving} · P:{food.protein}g C:{food.carbs}g F:{food.fat}g
                                    </span>
                                  </div>
                                  <span className="font-mono-num font-bold text-[#FFC515] text-xs">
                                    +{food.calories} kcal
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom Save & Direct Client Assignment Bar */}
              <div className="bg-[#14141c] border border-white/15 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <select
                    value={selectedClientIdForAssign}
                    onChange={e => setSelectedClientIdForAssign(e.target.value)}
                    className="bg-[#08080a] border border-white/20 px-3 py-2 text-xs font-mono-num text-white"
                  >
                    <option value="">-- Select Client to Assign Directly --</option>
                    {allAssignableClients.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.email}) {c.packageName ? `· ${c.packageName}` : ''}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleAssignBuilderPlanDirectly(selectedClientIdForAssign)}
                    className="px-4 py-2 bg-[#d8ff38] hover:bg-[#c8ef28] text-black font-mono-num text-xs font-extrabold uppercase flex items-center gap-1.5"
                  >
                    <UserCheck size={14} />
                    <span>Save & Assign to Client</span>
                  </button>
                </div>

                <button
                  onClick={handleSaveDietPlan}
                  className="px-5 py-2 bg-[#FFC515] hover:bg-[#e5b012] text-black font-mono-num text-xs font-extrabold uppercase flex items-center justify-center gap-1.5"
                >
                  <Save size={14} />
                  <span>Save to Diet Library</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right 4 Columns: Saved Custom Diet Templates Library */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#101014] border border-white/10 p-5 space-y-4">
              <div className="border-b border-white/10 pb-3">
                <span className="text-[10px] font-mono-num uppercase tracking-widest text-[#FFC515] font-bold">
                  SAVED TEMPLATES REPOSITORY
                </span>
                <h3 className="text-base font-display font-bold text-white uppercase mt-0.5">
                  DIET PLANS LIBRARY ({customDietPlans.length})
                </h3>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Click any template to load it into the builder, customize macros, or assign a snapshot to a client.
                </p>
              </div>

              <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
                {customDietPlans.map(plan => (
                  <div
                    key={plan.id}
                    className={`p-4 border transition-all space-y-3 ${
                      editingPlanId === plan.id
                        ? 'bg-[#16161f] border-[#FFC515]'
                        : 'bg-[#0c0c10] border-white/10 hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono-num uppercase px-2 py-0.5 bg-white/10 text-[#FFC515] font-bold">
                          {plan.dietType}
                        </span>
                        <h4 className="font-bold text-sm text-white mt-1.5 leading-snug">{plan.name}</h4>
                      </div>
                      <button
                        onClick={() => deleteCustomDietPlan(plan.id)}
                        className="text-zinc-500 hover:text-red-400 p-1"
                        title="Delete Template"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <p className="text-xs text-zinc-400 line-clamp-2">{plan.description}</p>

                    <div className="grid grid-cols-4 gap-1.5 bg-[#08080a] p-2.5 border border-white/5 font-mono-num text-center">
                      <div>
                        <span className="text-[9px] text-zinc-500 block">CALORIES</span>
                        <span className="text-xs font-extrabold text-[#FFC515]">{plan.totalDailyCalories}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-zinc-500 block">PROTEIN</span>
                        <span className="text-xs font-bold text-emerald-400">{plan.totalDailyProtein}g</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-zinc-500 block">CARBS</span>
                        <span className="text-xs font-bold text-sky-400">{plan.totalDailyCarbs}g</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-zinc-500 block">FAT</span>
                        <span className="text-xs font-bold text-amber-400">{plan.totalDailyFat}g</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleLoadPlanIntoEditor(plan)}
                        className="flex-1 py-1.5 bg-white/10 hover:bg-white hover:text-black text-white font-mono-num text-[11px] font-bold uppercase transition-colors"
                      >
                        Edit / Customize
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTemplateIdForAssign(plan.id);
                          setActiveTab('ASSIGN');
                        }}
                        className="flex-1 py-1.5 bg-[#FFC515] hover:bg-[#e5b012] text-black font-mono-num text-[11px] font-extrabold uppercase transition-colors"
                      >
                        Assign to Client
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ASSIGN DIET PLAN TO CLIENT */}
      {activeTab === 'ASSIGN' && (
        <div className="bg-[#101014] border border-white/10 p-6 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <span className="text-[10px] font-mono-num uppercase tracking-widest text-[#FFC515] font-bold">
              SNAPSHOT ASSIGNMENT // ZERO TEMPLATE OVERWRITE
            </span>
            <h2 className="text-xl font-display font-bold text-white uppercase mt-0.5">
              ASSIGN CUSTOM DIET PROTOCOL TO CLIENT
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Assigning a diet plan creates an independent deep-cloned snapshot on the client's profile and User Dashboard so future template edits never overwrite their active plan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-xs font-mono-num uppercase text-white font-bold">
                1. SELECT TARGET CLIENT ({allAssignableClients.length} CLIENTS)
              </label>
              <select
                value={selectedClientIdForAssign}
                onChange={e => setSelectedClientIdForAssign(e.target.value)}
                className="w-full bg-[#08080a] border border-white/20 p-3 text-sm text-white font-mono-num focus:border-[#FFC515] focus:outline-none"
              >
                <option value="">-- Choose Client --</option>
                {allAssignableClients.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.email}) {c.packageName ? `— [${c.packageName}]` : ''}
                  </option>
                ))}
              </select>

              {selectedClientIdForAssign && (() => {
                const clientObj = allAssignableClients.find(c => c.id === selectedClientIdForAssign);
                if (!clientObj) return null;
                return (
                  <div className="p-4 bg-[#08080a] border border-white/10 space-y-2 text-xs font-mono-num">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">CLIENT NAME:</span>
                      <span className="text-white font-bold">{clientObj.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">PACKAGE / TIER:</span>
                      <span className="text-[#FFC515] font-bold">{clientObj.packageName || 'Standard Coaching'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">CURRENT ASSIGNED DIET:</span>
                      <span className="text-emerald-400 font-bold">
                        {clientObj.assignedDietPlan ? `${clientObj.assignedDietPlan.name} (${clientObj.assignedDietPlan.totalDailyCalories} kcal)` : 'No diet plan assigned'}
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-mono-num uppercase text-white font-bold">
                2. SELECT DIET PROTOCOL TO ASSIGN
              </label>
              <select
                value={selectedTemplateIdForAssign}
                onChange={e => setSelectedTemplateIdForAssign(e.target.value)}
                className="w-full bg-[#08080a] border border-white/20 p-3 text-sm text-white font-mono-num focus:border-[#FFC515] focus:outline-none"
              >
                <option value="">-- Choose Diet Plan --</option>
                {customDietPlans.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.totalDailyCalories} kcal · {p.meals.length} Meals · {p.dietType})
                  </option>
                ))}
              </select>

              {selectedTemplateIdForAssign && (() => {
                const tpl = customDietPlans.find(p => p.id === selectedTemplateIdForAssign);
                if (!tpl) return null;
                return (
                  <div className="p-4 bg-[#08080a] border border-[#FFC515]/30 space-y-2 text-xs font-mono-num">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">DAILY CALORIES:</span>
                      <span className="text-[#FFC515] font-extrabold">{tpl.totalDailyCalories} kcal (Target: {tpl.targetDailyCalories} kcal)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">MACROS:</span>
                      <span className="text-white">
                        Protein: {tpl.totalDailyProtein}g · Carbs: {tpl.totalDailyCarbs}g · Fat: {tpl.totalDailyFat}g
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-400 pt-1 border-t border-white/10">
                      Meals: {tpl.meals.map(m => `${m.name} (${m.totalCalories} kcal)`).join(' → ')}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-white/10">
            {selectedTemplateIdForAssign && (
              <button
                onClick={() => {
                  const tpl = customDietPlans.find(p => p.id === selectedTemplateIdForAssign);
                  if (tpl) handleLoadPlanIntoEditor(tpl);
                }}
                className="px-4 py-2.5 bg-[#14141a] hover:bg-white/10 border border-white/15 text-white font-mono-num text-xs font-bold uppercase"
              >
                Customize Meals Before Assigning
              </button>
            )}
            <button
              onClick={handleAssignTemplateToClient}
              className="px-6 py-2.5 bg-[#d8ff38] hover:bg-[#c8ef28] text-black font-mono-num text-xs font-extrabold uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(216,255,56,0.25)]"
            >
              <UserCheck size={15} />
              <span>Assign Diet Plan to Client Now</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: CLIENT DAILY ADHERENCE & ASSIGNED DIET STATUS */}
      {activeTab === 'CLIENT_TRACKING' && (
        <div className="bg-[#101014] border border-white/10 p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono-num uppercase tracking-widest text-[#FFC515] font-bold">
                LIVE CLIENT CALORIE CHECK-OFF MONITOR ({todayLocalStr})
              </span>
              <h2 className="text-xl font-display font-bold text-white uppercase mt-0.5">
                ASSIGNED CLIENT DIET PLANS & DAILY TRACKING
              </h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[10px] font-mono-num text-zinc-400 uppercase">
                  <th className="py-3 px-3">Client</th>
                  <th className="py-3 px-3">Package</th>
                  <th className="py-3 px-3">Assigned Diet Plan</th>
                  <th className="py-3 px-3">Target Calories</th>
                  <th className="py-3 px-3">Today Consumed ({todayLocalStr})</th>
                  <th className="py-3 px-3">Remaining</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs font-mono-num">
                {allAssignableClients.map(client => {
                  const clientTrackingMap = dailyDietTrackingByClient[client.id] || {};
                  const todayRecord = clientTrackingMap[todayLocalStr];
                  const targetCal = client.assignedDietPlan?.targetDailyCalories || client.dailyCalories || 2000;
                  const consumedCal = todayRecord?.consumedCalories || 0;
                  const remainingCal = Math.max(0, targetCal - consumedCal);
                  const pct = targetCal > 0 ? Math.min(100, Math.round((consumedCal / targetCal) * 100)) : 0;

                  return (
                    <tr key={client.id} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-3">
                        <div className="font-sans font-bold text-white">{client.name}</div>
                        <div className="text-[10px] text-zinc-400">{client.email}</div>
                      </td>
                      <td className="py-3.5 px-3 text-[#FFC515] font-bold">
                        {client.packageName || '3 Months Protocol'}
                      </td>
                      <td className="py-3.5 px-3">
                        {client.assignedDietPlan ? (
                          <div>
                            <span className="text-emerald-400 font-bold block">{client.assignedDietPlan.name}</span>
                            <span className="text-[10px] text-zinc-400">
                              {client.assignedDietPlan.meals.length} Meals · P:{client.assignedDietPlan.totalDailyProtein}g C:{client.assignedDietPlan.totalDailyCarbs}g F:{client.assignedDietPlan.totalDailyFat}g
                            </span>
                          </div>
                        ) : (
                          <span className="text-zinc-500 italic">No diet plan assigned</span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 font-bold text-white">
                        {client.assignedDietPlan ? `${targetCal} kcal` : '—'}
                      </td>
                      <td className="py-3.5 px-3">
                        {client.assignedDietPlan ? (
                          <div className="space-y-1">
                            <span className="text-[#d8ff38] font-bold">{consumedCal} kcal ({pct}%)</span>
                            <div className="w-28 h-1.5 bg-zinc-800 overflow-hidden">
                              <div className="h-full bg-[#d8ff38]" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        ) : (
                          <span className="text-zinc-500">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-zinc-300">
                        {client.assignedDietPlan ? `${remainingCal} kcal` : '—'}
                      </td>
                      <td className="py-3.5 px-3 text-right space-x-2">
                        <button
                          onClick={() => {
                            setSelectedClientIdForAssign(client.id);
                            setActiveTab('ASSIGN');
                          }}
                          className="px-2.5 py-1 bg-[#FFC515] text-black font-bold text-[10px] uppercase"
                        >
                          {client.assignedDietPlan ? 'Change Diet' : 'Assign Diet'}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCustomerId(client.id);
                            setActiveSubtab('clients');
                          }}
                          className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white font-bold text-[10px] uppercase"
                        >
                          Client Report
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: VERIFIED FOOD & MACRO DATABASE */}
      {activeTab === 'FOOD_DB' && (
        <div className="bg-[#101014] border border-white/10 p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono-num uppercase tracking-widest text-[#FFC515] font-bold">
                MASTER NUTRITION REPOSITORY
              </span>
              <h2 className="text-xl font-display font-bold text-white uppercase mt-0.5">
                VERIFIED FOOD & MACRO DATABASE ({foodDatabase.length} ITEMS)
              </h2>
            </div>
            <button
              onClick={() => setIsAddFoodDbOpen(!isAddFoodDbOpen)}
              className="px-4 py-2 bg-[#FFC515] text-black font-mono-num text-xs font-extrabold uppercase flex items-center gap-1.5"
            >
              <Plus size={14} />
              <span>Add Food to Master DB</span>
            </button>
          </div>

          {isAddFoodDbOpen && (
            <div className="p-4 bg-[#0c0c10] border border-[#FFC515]/40 grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono-num text-xs">
              <input
                type="text"
                placeholder="Food Name *"
                value={newDbFood.name || ''}
                onChange={e => setNewDbFood({ ...newDbFood, name: e.target.value })}
                className="bg-[#08080a] border border-white/15 px-3 py-2 text-white"
              />
              <input
                type="text"
                placeholder="Serving (e.g. 100g cooked)"
                value={newDbFood.serving || ''}
                onChange={e => setNewDbFood({ ...newDbFood, serving: e.target.value })}
                className="bg-[#08080a] border border-white/15 px-3 py-2 text-white"
              />
              <input
                type="number"
                placeholder="Calories (kcal)"
                value={newDbFood.calories || 0}
                onChange={e => setNewDbFood({ ...newDbFood, calories: Number(e.target.value) })}
                className="bg-[#08080a] border border-white/15 px-3 py-2 text-[#FFC515] font-bold"
              />
              <select
                value={newDbFood.dietType || 'VEGETARIAN'}
                onChange={e => setNewDbFood({ ...newDbFood, dietType: e.target.value as DietType })}
                className="bg-[#08080a] border border-white/15 px-3 py-2 text-white"
              >
                <option value="VEGETARIAN">VEGETARIAN</option>
                <option value="NON-VEGETARIAN">NON-VEGETARIAN</option>
                <option value="VEGAN">VEGAN</option>
              </select>
              <input
                type="number"
                placeholder="Protein (g)"
                value={newDbFood.protein || 0}
                onChange={e => setNewDbFood({ ...newDbFood, protein: Number(e.target.value) })}
                className="bg-[#08080a] border border-white/15 px-3 py-2 text-emerald-400"
              />
              <input
                type="number"
                placeholder="Carbs (g)"
                value={newDbFood.carbs || 0}
                onChange={e => setNewDbFood({ ...newDbFood, carbs: Number(e.target.value) })}
                className="bg-[#08080a] border border-white/15 px-3 py-2 text-sky-400"
              />
              <input
                type="number"
                placeholder="Fat (g)"
                value={newDbFood.fat || 0}
                onChange={e => setNewDbFood({ ...newDbFood, fat: Number(e.target.value) })}
                className="bg-[#08080a] border border-white/15 px-3 py-2 text-amber-400"
              />
              <button
                onClick={() => {
                  if (!newDbFood.name) return;
                  addFoodToDatabase({
                    id: `food_custom_${Date.now()}`,
                    name: newDbFood.name,
                    serving: newDbFood.serving || '100g',
                    servingGrams: 100,
                    calories: Number(newDbFood.calories) || 0,
                    protein: Number(newDbFood.protein) || 0,
                    carbs: Number(newDbFood.carbs) || 0,
                    fat: Number(newDbFood.fat) || 0,
                    fiber: 3,
                    dietType: (newDbFood.dietType as DietType) || 'VEGETARIAN',
                    cuisine: 'INDIAN',
                    mealCategory: 'LUNCH',
                    priceTier: 'STANDARD'
                  });
                  setIsAddFoodDbOpen(false);
                  showNotice('success', `Added "${newDbFood.name}" to Master Food Database.`);
                }}
                className="bg-[#d8ff38] text-black font-extrabold uppercase px-4 py-2"
              >
                Save Food Item
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[540px] overflow-y-auto pr-1">
            {foodDatabase.map(f => (
              <div key={f.id} className="p-3.5 bg-[#0c0c10] border border-white/10 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-white block">{f.name}</span>
                  <span className="text-[10px] font-mono-num text-zinc-400">
                    {f.serving} · <strong className="text-[#FFC515]">{f.calories} kcal</strong> · P:{f.protein}g C:{f.carbs}g F:{f.fat}g
                  </span>
                </div>
                <button
                  onClick={() => deleteFoodFromDatabase(f.id)}
                  className="text-zinc-500 hover:text-red-400 p-1"
                  title="Delete food item"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
