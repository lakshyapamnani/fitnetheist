import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { useAdmin } from '../context/AdminContext';
import { WorkoutPlanner } from './WorkoutPlanner';
import { CalorieCalculator } from './CalorieCalculator';
import {
  getLocalDateString,
  getSubscriptionStatusInfo,
  PACKAGE_CATALOG
} from '../types/admin';
import { 
  Utensils, 
  Dumbbell, 
  Moon, 
  Droplet, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar,
  Flame,
  Package,
  Clock,
  AlertTriangle,
  CheckSquare,
  Square
} from 'lucide-react';

export const ClientPlanView: React.FC = () => {
  const {
    user,
    calorieResult,
    workoutPlan,
    assignedDietPlan,
    getDailyDietTrackingForDate,
    toggleDietFoodItemCheck,
    setActiveTab
  } = useApp();

  const { customers, customDietPlans } = useAdmin();

  // Active sub-tab in Plan: 'OVERVIEW' | 'NUTRITION' | 'WORKOUT' | 'CALCULATOR'
  const [activeSubTab, setActiveSubTab] = useState<'OVERVIEW' | 'NUTRITION' | 'WORKOUT' | 'CALCULATOR'>('OVERVIEW');

  // Local calendar date for daily diet check-off tracking (resets cleanly on each new calendar day)
  const todayLocal = getLocalDateString();
  const [selectedTrackingDate, setSelectedTrackingDate] = useState<string>(todayLocal);

  // Interactive quick hydration tracker for the day
  const [waterLoggedMl, setWaterLoggedMl] = useState<number>(1750);
  const waterTargetMl = Math.round((user?.weightKg || 78) * 38);

  // Match customer record from AdminContext if available for package & subscription dates
  const matchedCustomer = useMemo(() => {
    if (!user) return undefined;
    const uEmail = (user.email || '').toLowerCase().trim();
    const uPhone = (user.phone || '').trim();
    return (customers || []).find(
      c =>
        c.id === user.id ||
        (uEmail && (c.email || '').toLowerCase().trim() === uEmail) ||
        (uPhone && (c.phone || '').trim() === uPhone)
    );
  }, [customers, user]);

  // Resolve active read-only diet plan assigned by Admin (or default read-only protocol if none assigned yet)
  const effectiveDietPlan = useMemo(() => {
    if (assignedDietPlan && Array.isArray(assignedDietPlan.meals) && assignedDietPlan.meals.length > 0) {
      return assignedDietPlan;
    }
    if (matchedCustomer?.assignedDietPlan && Array.isArray(matchedCustomer.assignedDietPlan.meals)) {
      return matchedCustomer.assignedDietPlan;
    }
    return customDietPlans?.[0] || null;
  }, [assignedDietPlan, matchedCustomer, customDietPlans]);

  const isExplicitlyAssignedDiet = Boolean(
    (assignedDietPlan && assignedDietPlan.meals?.length) ||
    (matchedCustomer?.assignedDietPlan && matchedCustomer.assignedDietPlan.meals?.length)
  );

  // Subscription & Package Details
  const packageName =
    user?.packageName ||
    matchedCustomer?.packageName ||
    matchedCustomer?.programTier ||
    PACKAGE_CATALOG[0].name;
  const packageCategory =
    user?.packageCategory ||
    matchedCustomer?.packageCategory ||
    'Official Coaching Plan';
  const subStartDate =
    user?.subscriptionStartDate ||
    matchedCustomer?.startDate ||
    matchedCustomer?.joinedDate ||
    todayLocal;
  const subEndDate =
    user?.subscriptionEndDate ||
    matchedCustomer?.endDate ||
    '';
  const subStatusInfo = getSubscriptionStatusInfo(subStartDate, subEndDate);

  // Daily Calorie & Check-Off Calculations for selectedTrackingDate
  const dailyTrackingRecord = getDailyDietTrackingForDate(selectedTrackingDate);
  const checkedSet = useMemo(
    () => new Set(dailyTrackingRecord?.checkedItemIds || []),
    [dailyTrackingRecord]
  );

  // Day of week mapping for selectedTrackingDate ('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun')
  const WEEK_DAYS_LIST = useMemo(() => [
    { id: 'Mon', label: 'Mon', full: 'Monday' },
    { id: 'Tue', label: 'Tue', full: 'Tuesday' },
    { id: 'Wed', label: 'Wed', full: 'Wednesday' },
    { id: 'Thu', label: 'Thu', full: 'Thursday' },
    { id: 'Fri', label: 'Fri', full: 'Friday' },
    { id: 'Sat', label: 'Sat', full: 'Saturday' },
    { id: 'Sun', label: 'Sun', full: 'Sunday' }
  ], []);

  const trackingDayInfo = useMemo(() => {
    if (!selectedTrackingDate) return { id: 'Mon', label: 'Mon', full: 'Monday' };
    const [y, m, d] = selectedTrackingDate.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    const dayIdx = dateObj.getDay(); // 0 is Sun, 1 is Mon...
    const map = [
      { id: 'Sun', label: 'Sun', full: 'Sunday' },
      { id: 'Mon', label: 'Mon', full: 'Monday' },
      { id: 'Tue', label: 'Tue', full: 'Tuesday' },
      { id: 'Wed', label: 'Wed', full: 'Wednesday' },
      { id: 'Thu', label: 'Thu', full: 'Thursday' },
      { id: 'Fri', label: 'Fri', full: 'Friday' },
      { id: 'Sat', label: 'Sat', full: 'Saturday' }
    ];
    return map[dayIdx] || { id: 'Mon', label: 'Mon', full: 'Monday' };
  }, [selectedTrackingDate]);

  // Compute ISO date for any day of current week for quick switching
  const getWeekDateForDay = (targetDayId: string) => {
    const current = new Date();
    const currentDay = current.getDay(); // 0 is Sun
    const currentMonOffset = currentDay === 0 ? -6 : 1 - currentDay;
    const dayOffsets: Record<string, number> = {
      Mon: 0,
      Tue: 1,
      Wed: 2,
      Thu: 3,
      Fri: 4,
      Sat: 5,
      Sun: 6
    };
    const monday = new Date(current);
    monday.setDate(current.getDate() + currentMonOffset);
    const targetDate = new Date(monday);
    targetDate.setDate(monday.getDate() + (dayOffsets[targetDayId] || 0));
    const y = targetDate.getFullYear();
    const m = String(targetDate.getMonth() + 1).padStart(2, '0');
    const d = String(targetDate.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // Resolve distinct daily meals for the active day from weeklySchedule or fallback to meals
  const effectiveDayMeals = useMemo(() => {
    if (effectiveDietPlan?.weeklySchedule && effectiveDietPlan.weeklySchedule[trackingDayInfo.id]) {
      return effectiveDietPlan.weeklySchedule[trackingDayInfo.id];
    }
    return effectiveDietPlan?.meals || [];
  }, [effectiveDietPlan, trackingDayInfo.id]);

  const totalPlannedDayCalories = useMemo(() => {
    return effectiveDayMeals.reduce((s, m) => s + (m.totalCalories || 0), 0);
  }, [effectiveDayMeals]);

  const targetDailyCalories =
    effectiveDietPlan?.targetDailyCalories ||
    effectiveDietPlan?.targetCalories ||
    (totalPlannedDayCalories > 0 ? totalPlannedDayCalories : (matchedCustomer?.dailyCalories || calorieResult?.currentTargetCalories || 2050));

  const {
    consumedCalories,
    consumedProtein,
    consumedCarbs,
    consumedFat,
    totalItemsCount,
    checkedItemsCount
  } = useMemo(() => {
    let cals = 0;
    let p = 0;
    let c = 0;
    let f = 0;
    let totalItems = 0;
    let checkedItems = 0;

    if (Array.isArray(effectiveDayMeals)) {
      effectiveDayMeals.forEach(meal => {
        (meal.items || []).forEach(item => {
          totalItems += 1;
          if (checkedSet.has(item.id)) {
            checkedItems += 1;
            cals += Number(item.calories) || 0;
            p += Number(item.protein ?? item.proteinGrams) || 0;
            c += Number(item.carbs ?? item.carbsGrams) || 0;
            f += Number(item.fat ?? item.fatGrams) || 0;
          }
        });
      });
    }

    return {
      consumedCalories: Math.round(cals),
      consumedProtein: Math.round(p),
      consumedCarbs: Math.round(c),
      consumedFat: Math.round(f),
      totalItemsCount: totalItems,
      checkedItemsCount: checkedItems
    };
  }, [effectiveDayMeals, checkedSet]);

  const remainingCalories = Math.max(0, targetDailyCalories - consumedCalories);
  const calorieProgressPercent =
    targetDailyCalories > 0
      ? Math.min(100, Math.round((consumedCalories / targetDailyCalories) * 100))
      : 0;

  const protein = effectiveDietPlan?.totalDailyProtein || effectiveDietPlan?.totalProteinGrams || calorieResult?.recommendedProteinGramsMin || 150;
  const carbs = effectiveDietPlan?.totalDailyCarbs || effectiveDietPlan?.totalCarbsGrams || calorieResult?.recommendedCarbsGrams || 205;
  const fat = effectiveDietPlan?.totalDailyFat || effectiveDietPlan?.totalFatGrams || calorieResult?.recommendedFatGrams || 55;

  const handleAddWater = (amount: number) => {
    setWaterLoggedMl(prev => Math.max(0, prev + amount));
  };

  return (
    <div id="client-plan-page" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Top Header & Sub-Nav */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-8 border-b border-[#242424] gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 bg-[#FFC515]"></span>
            <span className="text-[11px] font-mono-num font-bold uppercase tracking-[0.25em] text-[#FFC515]">
              USER DASHBOARD & DAILY TRACKER
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#F5F5F5] font-display">
            YOUR CUSTOM PLAN.
          </h1>
          <p className="text-xs sm:text-sm text-[#9A9A9A] font-mono-num mt-1">
            Synchronized with Coach Neetu's protocol: {user?.weightKg || 75} kg · {packageName}
          </p>
        </div>

        {/* Plan Mode Switcher */}
        <div className="inline-flex flex-wrap p-1 bg-[#121214] border border-[#242426] rounded-lg font-mono-num text-xs">
          <button
            onClick={() => setActiveSubTab('OVERVIEW')}
            className={`px-4 py-2 rounded transition-colors ${
              activeSubTab === 'OVERVIEW'
                ? 'bg-[#FFC515] text-black font-bold'
                : 'text-[#9A9A9A] hover:text-[#F5F5F5]'
            }`}
          >
            Dashboard & Today's Diet
          </button>
          <button
            onClick={() => setActiveSubTab('NUTRITION')}
            className={`px-4 py-2 rounded transition-colors ${
              activeSubTab === 'NUTRITION'
                ? 'bg-[#FFC515] text-black font-bold'
                : 'text-[#9A9A9A] hover:text-[#F5F5F5]'
            }`}
          >
            Assigned Diet Tracker
          </button>
          <button
            onClick={() => setActiveSubTab('WORKOUT')}
            className={`px-4 py-2 rounded transition-colors ${
              activeSubTab === 'WORKOUT'
                ? 'bg-[#FFC515] text-black font-bold'
                : 'text-[#9A9A9A] hover:text-[#F5F5F5]'
            }`}
          >
            Workout Plan
          </button>
          <button
            onClick={() => setActiveSubTab('CALCULATOR')}
            className={`px-4 py-2 rounded transition-colors ${
              activeSubTab === 'CALCULATOR'
                ? 'bg-[#FFC515] text-black font-bold'
                : 'text-[#9A9A9A] hover:text-[#F5F5F5]'
            }`}
          >
            Calorie Targets
          </button>
        </div>
      </div>

      {/* Subscription & Package Status Banner (Always Visible on User Dashboard) */}
      <div className="bg-[#0E0E10] border border-[#242424] rounded-xl p-5 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono-num text-xs">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="p-2.5 bg-[#FFC515]/10 border border-[#FFC515]/30 rounded text-[#FFC515] shrink-0">
            <Package size={18} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[#F5F5F5] font-bold text-sm uppercase">{packageName}</span>
              <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-[10px] text-zinc-300 uppercase rounded">
                {packageCategory}
              </span>
              <span className={`px-2 py-0.5 text-[10px] font-extrabold uppercase rounded border flex items-center gap-1 ${
                subStatusInfo.status === 'SUBSCRIPTION_OVER'
                  ? 'bg-red-500/20 text-red-400 border-red-500/40'
                  : subStatusInfo.status === 'EXPIRING_SOON'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              }`}>
                {subStatusInfo.status === 'SUBSCRIPTION_OVER' && <AlertTriangle size={11} />}
                {subStatusInfo.status === 'EXPIRING_SOON' && <Clock size={11} />}
                <span>{subStatusInfo.badgeText}</span>
              </span>
            </div>
            <p className="text-[#9A9A9A] text-[11px] mt-1">
              Subscription Start: <strong className="text-white">{subStartDate}</strong>
              {subEndDate && (
                <>
                  {' '}· Expiry Date: <strong className="text-[#FFC515]">{subEndDate}</strong>
                </>
              )}
              {' '}· Assigned Coach: <strong className="text-white">Coach Neetu</strong>
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('me')}
          className="px-3.5 py-2 bg-[#161618] hover:bg-[#202024] border border-[#2A2A2E] text-[#FFC515] hover:text-white rounded transition-colors self-start md:self-auto"
        >
          View Profile in ME →
        </button>
      </div>

      {/* =========================================================================
          SUB-VIEW 1: OVERVIEW + TODAY'S DIET & CALORIE CHECK-OFF TRACKER
          ========================================================================= */}
      {activeSubTab === 'OVERVIEW' && (
        <div className="space-y-8">
          
          {/* Daily Calorie Progress Summary Card */}
          <div className="bg-[#0E0E10] border border-[#242424] rounded-xl p-6 space-y-5 font-mono-num">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#202022] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Flame size={16} className="text-[#FFC515]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FFC515]">
                    TODAY'S DIET & DAILY CALORIE TRACKER
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#F5F5F5] font-display uppercase mt-1">
                  {effectiveDietPlan?.name || 'COACH NEETU ASSIGNED NUTRITION PROTOCOL'}
                </h2>
                <p className="text-xs text-[#9A9A9A] mt-0.5">
                  {isExplicitlyAssignedDiet
                    ? 'Assigned directly by Coach Neetu. Check off each food item as you eat it today.'
                    : 'Standard Coach Neetu baseline diet active. Check off each food item below to track your daily calorie intake.'}
                </p>
              </div>

              {/* Date Selector for Daily Tracking */}
              <div className="flex items-center gap-2 bg-[#141418] border border-[#26262C] px-3 py-2 rounded-lg text-xs">
                <Calendar size={14} className="text-[#FFC515]" />
                <span className="text-[#9A9A9A] uppercase text-[10px] font-bold">TRACKING DATE:</span>
                <input
                  type="date"
                  value={selectedTrackingDate}
                  onChange={(e) => setSelectedTrackingDate(e.target.value || todayLocal)}
                  className="bg-transparent text-white font-bold focus:outline-none text-xs"
                />
                {selectedTrackingDate !== todayLocal && (
                  <button
                    type="button"
                    onClick={() => setSelectedTrackingDate(todayLocal)}
                    className="px-2 py-0.5 bg-[#FFC515] text-black font-bold text-[10px] uppercase rounded"
                  >
                    Today
                  </button>
                )}
              </div>
            </div>

            {/* 7-Day Week Calendar Strip (Click day to switch to that day's distinct meals) */}
            <div className="bg-[#141418] border border-[#26262C] p-3 rounded-lg space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <span className="text-[10px] text-[#FFC515] uppercase font-bold tracking-wider flex items-center gap-1.5">
                  <Calendar size={13} />
                  <span>Weekly Meal Schedule (Click day to switch daily menu):</span>
                </span>
                <span className="text-[10px] text-[#9A9A9A]">
                  Active: <strong className="text-white">{trackingDayInfo.full}</strong> ({effectiveDayMeals.length} Meals • {totalPlannedDayCalories} kcal)
                </span>
              </div>

              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {WEEK_DAYS_LIST.map(day => {
                  const isCurrentDay = trackingDayInfo.id === day.id;
                  const dayMeals = (effectiveDietPlan?.weeklySchedule && effectiveDietPlan.weeklySchedule[day.id]) || effectiveDietPlan?.meals || [];
                  const dayCals = dayMeals.reduce((s, m) => s + (m.totalCalories || 0), 0);

                  return (
                    <button
                      key={day.id}
                      type="button"
                      onClick={() => setSelectedTrackingDate(getWeekDateForDay(day.id))}
                      className={`p-2 rounded border text-center transition-all cursor-pointer ${
                        isCurrentDay
                          ? 'bg-[#FFC515] text-black border-[#FFC515] font-black shadow-md'
                          : 'bg-[#18181E] text-zinc-300 border-white/10 hover:border-[#FFC515]/60 hover:text-white'
                      }`}
                    >
                      <span className="block text-xs font-black uppercase">{day.label}</span>
                      <span className={`block text-[10px] font-bold mt-0.5 ${isCurrentDay ? 'text-black' : 'text-[#FFC515]'}`}>
                        {dayCals} kcal
                      </span>
                      <span className={`block text-[8px] font-mono ${isCurrentDay ? 'text-black/80' : 'text-zinc-500'}`}>
                        {dayMeals.length} meals
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4 Calorie KPI Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#141416] border border-[#222226] p-4 rounded-lg">
                <span className="text-[10px] text-[#9A9A9A] uppercase block">Daily Target Calories</span>
                <span className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] mt-1 block">
                  {targetDailyCalories.toLocaleString()} <span className="text-xs font-normal text-[#9A9A9A]">kcal</span>
                </span>
              </div>

              <div className="bg-[#141416] border border-emerald-500/30 p-4 rounded-lg">
                <span className="text-[10px] text-emerald-400 uppercase font-bold block">Consumed Calories</span>
                <span className="text-2xl sm:text-3xl font-bold text-emerald-400 mt-1 block">
                  {consumedCalories.toLocaleString()} <span className="text-xs font-normal text-emerald-400/70">kcal</span>
                </span>
              </div>

              <div className="bg-[#141416] border border-[#FFC515]/30 p-4 rounded-lg">
                <span className="text-[10px] text-[#FFC515] uppercase font-bold block">Remaining Calories</span>
                <span className="text-2xl sm:text-3xl font-bold text-[#FFC515] mt-1 block">
                  {remainingCalories.toLocaleString()} <span className="text-xs font-normal text-[#FFC515]/70">kcal</span>
                </span>
              </div>

              <div className="bg-[#141416] border border-[#222226] p-4 rounded-lg">
                <span className="text-[10px] text-[#9A9A9A] uppercase block">Meals Checked Off</span>
                <span className="text-2xl sm:text-3xl font-bold text-white mt-1 block">
                  {checkedItemsCount} / {totalItemsCount} <span className="text-xs font-normal text-[#9A9A9A]">({calorieProgressPercent}%)</span>
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#9A9A9A]">
                  Consumed Macros: <strong className="text-sky-400">{consumedProtein}g P</strong> · <strong className="text-amber-400">{consumedCarbs}g C</strong> · <strong className="text-rose-400">{consumedFat}g F</strong>
                </span>
                <span className="text-[#FFC515] font-bold">{calorieProgressPercent}% of Daily Target</span>
              </div>
              <div className="w-full bg-[#1C1C20] h-2.5 rounded-full overflow-hidden border border-white/5">
                <div
                  className="bg-gradient-to-r from-[#FFC515] to-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${calorieProgressPercent}%` }}
                />
              </div>
            </div>

            {/* Interactive Meal-by-Meal Check-Off List on User Dashboard */}
            {effectiveDayMeals.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {effectiveDayMeals.map((meal) => {
                  const mealConsumedCals = (meal.items || []).reduce(
                    (sum, it) => sum + (checkedSet.has(it.id) ? Number(it.calories) || 0 : 0),
                    0
                  );
                  return (
                    <div key={meal.id} className="bg-[#141416] border border-[#222226] rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-[#222226] pb-2.5">
                        <div>
                          <span className="text-xs font-bold uppercase text-white">{meal.name}</span>
                          <span className="text-[11px] text-[#FFC515] ml-2 font-bold">{meal.scheduledTime || meal.time}</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-400">
                          {mealConsumedCals} / {meal.totalCalories} kcal
                        </span>
                      </div>

                      <div className="space-y-2">
                        {(meal.items || []).map((item) => {
                          const isChecked = checkedSet.has(item.id);
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => toggleDietFoodItemCheck(item.id, selectedTrackingDate)}
                              className={`w-full text-left p-2.5 rounded border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                                isChecked
                                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                                  : 'bg-[#0E0E10] hover:bg-[#18181C] border-[#242428] text-[#F5F5F5]'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                {isChecked ? (
                                  <CheckSquare size={16} className="text-emerald-400 shrink-0" />
                                ) : (
                                  <Square size={16} className="text-zinc-500 shrink-0" />
                                )}
                                <div className="truncate">
                                  <span className={`font-bold text-xs block truncate ${isChecked ? 'line-through text-emerald-300' : 'text-white'}`}>
                                    {item.name}
                                  </span>
                                  <span className="text-[10px] text-[#9A9A9A] block">
                                    Qty: {item.quantity} × {item.serving || item.servingUnit} · P:{item.protein ?? item.proteinGrams}g C:{item.carbs ?? item.carbsGrams}g F:{item.fat ?? item.fatGrams}g
                                  </span>
                                </div>
                              </div>

                              <div className="text-right shrink-0">
                                <span className={`text-xs font-bold block ${isChecked ? 'text-emerald-400' : 'text-[#FFC515]'}`}>
                                  {item.calories} kcal
                                </span>
                                <span className="text-[9px] uppercase text-[#9A9A9A]">
                                  {isChecked ? 'Consumed' : 'Tap to log'}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3 Core Pillars: NUTRITION, TRAINING, RECOVERY */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* 1. NUTRITION */}
            <div className="bg-[#0E0E10] border border-[#242424] rounded-xl p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#202022]">
                  <div className="flex items-center gap-2">
                    <Utensils size={16} className="text-[#FFC515]" />
                    <h2 className="text-sm font-bold uppercase tracking-wider font-mono-num text-[#F5F5F5]">
                      ASSIGNED DIET
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono-num text-[#9A9A9A]">
                    {effectiveDietPlan?.meals?.length || 4} meals/day
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-[#9A9A9A] font-mono-num block">DAILY CALORIES</span>
                  <div className="flex items-baseline gap-1 mt-0.5 font-mono-num">
                    <span className="text-3xl font-bold text-[#F5F5F5]">
                      {targetDailyCalories.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#9A9A9A]">kcal / day</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-[11px] text-[#9A9A9A] font-mono-num block">MACRONUTRIENT TARGETS</span>
                  <div className="grid grid-cols-3 gap-2 text-xs font-mono-num">
                    <div className="p-2.5 bg-[#141416] rounded border border-[#222226]">
                      <span className="text-[#9A9A9A] block text-[10px]">PROTEIN</span>
                      <span className="text-sm font-bold text-[#FFC515]">{protein}g</span>
                    </div>
                    <div className="p-2.5 bg-[#141416] rounded border border-[#222226]">
                      <span className="text-[#9A9A9A] block text-[10px]">CARBS</span>
                      <span className="text-sm font-bold text-[#F5F5F5]">{carbs}g</span>
                    </div>
                    <div className="p-2.5 bg-[#141416] rounded border border-[#222226]">
                      <span className="text-[#9A9A9A] block text-[10px]">FAT</span>
                      <span className="text-sm font-bold text-[#9A9A9A]">{fat}g</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveSubTab('NUTRITION')}
                className="w-full py-2.5 px-4 bg-[#141416] hover:bg-[#1E1E22] border border-[#26262A] text-[#F5F5F5] font-semibold text-xs font-mono-num uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
              >
                <span>OPEN FULL DIET TRACKER</span>
                <ChevronRight size={14} className="text-[#9A9A9A]" />
              </button>
            </div>

            {/* 2. TRAINING */}
            <div className="bg-[#0E0E10] border border-[#242424] rounded-xl p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#202022]">
                  <div className="flex items-center gap-2">
                    <Dumbbell size={16} className="text-[#FFC515]" />
                    <h2 className="text-sm font-bold uppercase tracking-wider font-mono-num text-[#F5F5F5]">
                      TRAINING
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono-num text-[#9A9A9A]">
                    {user?.trainingDaysPerWeek || 4} days / week
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-[#9A9A9A] font-mono-num block">
                    {workoutPlan?.isPersonalized ? 'PERSONALIZED PROTOCOL' : 'TRAINING STATUS'}
                  </span>
                  <span className="text-lg font-bold text-[#F5F5F5] block mt-0.5">
                    {workoutPlan?.isPersonalized ? workoutPlan.name : 'Your plan will be personalized shortly'}
                  </span>
                </div>

                <div className="p-3 bg-[#141416] rounded border border-[#222226] text-xs font-mono-num space-y-1.5">
                  <div className="flex justify-between text-[#9A9A9A]">
                    <span>Location:</span>
                    <span className="text-[#F5F5F5] font-medium">{user?.trainingLocation || 'Commercial Gym'}</span>
                  </div>
                  <div className="flex justify-between text-[#9A9A9A]">
                    <span>Assigned Coach:</span>
                    <span className="text-[#FFC515] font-medium">Coach Neetu</span>
                  </div>
                  <div className="flex justify-between text-[#9A9A9A]">
                    <span>Exercise Delivery:</span>
                    <span className={workoutPlan?.isPersonalized ? "text-emerald-400 font-medium" : "text-[#FFC515] font-medium"}>
                      {workoutPlan?.isPersonalized ? 'Active & Assigned' : 'In Coach Review'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveSubTab('WORKOUT')}
                className="w-full py-2.5 px-4 bg-[#141416] hover:bg-[#1E1E22] border border-[#26262A] text-[#F5F5F5] font-semibold text-xs font-mono-num uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
              >
                <span>VIEW WORKOUT PLAN</span>
                <ChevronRight size={14} className="text-[#9A9A9A]" />
              </button>
            </div>

            {/* 3. RECOVERY */}
            <div className="bg-[#0E0E10] border border-[#242424] rounded-xl p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#202022]">
                  <div className="flex items-center gap-2">
                    <Droplet size={16} className="text-[#FFC515]" />
                    <h2 className="text-sm font-bold uppercase tracking-wider font-mono-num text-[#F5F5F5]">
                      RECOVERY
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono-num text-[#9A9A9A]">
                    DAILY PROTOCOL
                  </span>
                </div>

                {/* Hydration Tracker */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono-num">
                    <span className="text-[#9A9A9A]">HYDRATION</span>
                    <span className="text-[#F5F5F5] font-semibold">
                      {waterLoggedMl} / {waterTargetMl} ml
                    </span>
                  </div>
                  <div className="w-full bg-[#1C1C20] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#FFC515] h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.round((waterLoggedMl / waterTargetMl) * 100))}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleAddWater(250)}
                      className="px-2.5 py-1 bg-[#141416] hover:bg-[#1E1E22] border border-[#242428] rounded text-[11px] font-mono-num text-[#9A9A9A] hover:text-[#F5F5F5] transition-colors"
                    >
                      +250 ml
                    </button>
                    <button
                      onClick={() => handleAddWater(500)}
                      className="px-2.5 py-1 bg-[#141416] hover:bg-[#1E1E22] border border-[#242428] rounded text-[11px] font-mono-num text-[#9A9A9A] hover:text-[#F5F5F5] transition-colors"
                    >
                      +500 ml
                    </button>
                    <button
                      onClick={() => handleAddWater(-250)}
                      className="px-2 py-1 bg-[#141416] hover:bg-[#1E1E22] border border-[#242428] rounded text-[11px] font-mono-num text-[#9A9A9A] hover:text-[#F5F5F5] transition-colors ml-auto"
                    >
                      -250 ml
                    </button>
                  </div>
                </div>

                {/* Sleep Info */}
                <div className="p-3 bg-[#141416] rounded border border-[#222226] text-xs font-mono-num space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[#F5F5F5]">
                      <Moon size={13} className="text-[#FFC515]" />
                      <span>SLEEP TARGET</span>
                    </div>
                    <span className="font-semibold text-[#F5F5F5]">
                      {user?.sleepHoursTarget || 7.5} hours / night
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center py-2 text-[11px] text-[#9A9A9A] font-mono-num">
                Synced with your daily progress
              </div>
            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
          SUB-VIEW 2: READ-ONLY ASSIGNED DIET PLAN & DAILY CHECK-OFF TRACKER
          (Regular users cannot create, edit, or assign their own diet plans)
          ========================================================================= */}
      {activeSubTab === 'NUTRITION' && (
        <div className="space-y-6 font-mono-num">
          <div className="bg-[#0E0E10] border border-[#242424] rounded-xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#202022] pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#FFC515]" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#FFC515]">
                    COACH-PRESCRIBED NUTRITION (READ-ONLY)
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-display uppercase mt-1">
                  {effectiveDietPlan?.name || 'ASSIGNED DAILY DIET PLAN'}
                </h2>
                <p className="text-xs text-[#9A9A9A] mt-1">
                  Diet plans are created and assigned exclusively by Coach Neetu. Check off each food item below as you consume it to track your daily calories.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-[#141418] border border-[#26262C] px-3.5 py-2 rounded-lg text-xs shrink-0">
                <Calendar size={14} className="text-[#FFC515]" />
                <span className="text-[#9A9A9A] uppercase text-[10px] font-bold">DATE:</span>
                <input
                  type="date"
                  value={selectedTrackingDate}
                  onChange={(e) => setSelectedTrackingDate(e.target.value || todayLocal)}
                  className="bg-transparent text-white font-bold focus:outline-none text-xs"
                />
              </div>
            </div>

            {/* 7-Day Day Menu Selector Tabs */}
            <div className="bg-[#141418] border border-[#26262C] p-3 rounded-lg space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <span className="text-[10px] text-[#FFC515] uppercase font-bold tracking-wider flex items-center gap-1.5">
                  <Calendar size={13} />
                  <span>7-Day Meal Selector (Click day to view distinct daily meals):</span>
                </span>
                <span className="text-[10px] text-[#9A9A9A]">
                  Viewing: <strong className="text-white">{trackingDayInfo.full}</strong> ({effectiveDayMeals.length} Meals • {totalPlannedDayCalories} kcal)
                </span>
              </div>

              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {WEEK_DAYS_LIST.map(day => {
                  const isCurrentDay = trackingDayInfo.id === day.id;
                  const dayMeals = (effectiveDietPlan?.weeklySchedule && effectiveDietPlan.weeklySchedule[day.id]) || effectiveDietPlan?.meals || [];
                  const dayCals = dayMeals.reduce((s, m) => s + (m.totalCalories || 0), 0);

                  return (
                    <button
                      key={day.id}
                      type="button"
                      onClick={() => setSelectedTrackingDate(getWeekDateForDay(day.id))}
                      className={`p-2 rounded border text-center transition-all cursor-pointer ${
                        isCurrentDay
                          ? 'bg-[#FFC515] text-black border-[#FFC515] font-black shadow-md'
                          : 'bg-[#18181E] text-zinc-300 border-white/10 hover:border-[#FFC515]/60 hover:text-white'
                      }`}
                    >
                      <span className="block text-xs font-black uppercase">{day.label}</span>
                      <span className={`block text-[10px] font-bold mt-0.5 ${isCurrentDay ? 'text-black' : 'text-[#FFC515]'}`}>
                        {dayCals} kcal
                      </span>
                      <span className={`block text-[8px] font-mono ${isCurrentDay ? 'text-black/80' : 'text-zinc-500'}`}>
                        {dayMeals.length} meals
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Calorie Summary Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#141418] border border-white/10 p-4 rounded-lg">
                <span className="text-[10px] text-[#9A9A9A] uppercase block">Daily Target Calorie Intake</span>
                <span className="text-2xl font-bold text-white mt-1 block">{targetDailyCalories} kcal</span>
              </div>
              <div className="bg-[#141418] border border-emerald-500/30 p-4 rounded-lg">
                <span className="text-[10px] text-emerald-400 uppercase font-bold block">Consumed Calories So Far</span>
                <span className="text-2xl font-bold text-emerald-400 mt-1 block">{consumedCalories} kcal</span>
              </div>
              <div className="bg-[#141418] border border-[#FFC515]/30 p-4 rounded-lg">
                <span className="text-[10px] text-[#FFC515] uppercase font-bold block">Remaining Calories</span>
                <span className="text-2xl font-bold text-[#FFC515] mt-1 block">{remainingCalories} kcal</span>
              </div>
            </div>

            {effectiveDietPlan?.coachNotes && (
              <div className="p-4 bg-[#FFC515]/10 border border-[#FFC515]/30 rounded-lg text-xs text-zinc-200">
                <strong className="text-[#FFC515] uppercase text-[10px] block mb-1">Coach Neetu's Nutrition Directives:</strong>
                {effectiveDietPlan.coachNotes}
              </div>
            )}

            {/* Meal Cards */}
            {effectiveDayMeals.length > 0 ? (
              <div className="space-y-4">
                {effectiveDayMeals.map((meal) => {
                  const mealDoneCals = (meal.items || []).reduce(
                    (s, i) => s + (checkedSet.has(i.id) ? Number(i.calories) || 0 : 0),
                    0
                  );
                  return (
                    <div key={meal.id} className="bg-[#141416] border border-[#242428] rounded-xl p-5 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#222226] pb-3">
                        <div>
                          <span className="text-sm font-bold text-white uppercase">{meal.name}</span>
                          <span className="text-xs text-[#FFC515] font-bold ml-3">{meal.scheduledTime || meal.time}</span>
                        </div>
                        <div className="text-xs font-bold">
                          <span className="text-emerald-400">{mealDoneCals} kcal eaten</span>
                          <span className="text-[#9A9A9A]"> / {meal.totalCalories} kcal planned</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {(meal.items || []).map((item) => {
                          const isChecked = checkedSet.has(item.id);
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => toggleDietFoodItemCheck(item.id, selectedTrackingDate)}
                              className={`text-left p-3.5 rounded-lg border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                                isChecked
                                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                                  : 'bg-[#0E0E10] hover:bg-[#18181C] border-[#242428] text-[#F5F5F5]'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                {isChecked ? (
                                  <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                                ) : (
                                  <Square size={18} className="text-zinc-500 shrink-0" />
                                )}
                                <div className="truncate">
                                  <span className={`font-bold text-xs block truncate ${isChecked ? 'line-through text-emerald-300' : 'text-white'}`}>
                                    {item.name}
                                  </span>
                                  <span className="text-[11px] text-[#9A9A9A] block mt-0.5">
                                    Quantity: {item.quantity} × {item.serving || item.servingUnit || '1 serving'} · P:{item.protein ?? item.proteinGrams ?? 0}g · C:{item.carbs ?? item.carbsGrams ?? 0}g · F:{item.fat ?? item.fatGrams ?? 0}g
                                  </span>
                                </div>
                              </div>

                              <div className="text-right shrink-0">
                                <span className={`text-sm font-extrabold block ${isChecked ? 'text-emerald-400' : 'text-[#FFC515]'}`}>
                                  {item.calories} kcal
                                </span>
                                <span className="text-[10px] uppercase text-[#9A9A9A]">
                                  {isChecked ? 'Checked Off' : 'Check Off'}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center text-[#9A9A9A] text-xs">
                No diet plan assigned yet. Coach Neetu will assign your custom meal plan shortly.
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-VIEW 3: WORKOUT PROGRAM (Workout Planner)
          ========================================================================= */}
      {activeSubTab === 'WORKOUT' && (
        <div>
          <WorkoutPlanner />
        </div>
      )}

      {/* =========================================================================
          SUB-VIEW 4: CALORIE & MACRO TARGETS (Calorie Calculator)
          ========================================================================= */}
      {activeSubTab === 'CALCULATOR' && (
        <div>
          <CalorieCalculator />
        </div>
      )}

    </div>
  );
};
