import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAdmin } from '../../context/AdminContext';
import { FoodItem, DietType, MealCategory, PriceTier } from '../../types';
import { 
  Utensils, 
  Search, 
  Plus, 
  Trash2, 
  Scale, 
  Check, 
  ArrowRightLeft,
  Flame,
  Filter
} from 'lucide-react';

export const FoodAndDietAdminView: React.FC = () => {
  const { foodDatabase, addFoodToDatabase } = useApp();
  const { logAuditAction } = useAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [dietFilter, setDietFilter] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [mealCategory, setMealCategory] = useState<MealCategory>('LUNCH');
  const [dietType, setDietType] = useState<DietType>('VEGETARIAN');
  const [cuisine, setCuisine] = useState<'INDIAN' | 'INTERNATIONAL'>('INDIAN');
  const [serving, setServing] = useState('100g cooked portion');
  const [calories, setCalories] = useState(250);
  const [protein, setProtein] = useState(20);
  const [carbs, setCarbs] = useState(15);
  const [fat, setFat] = useState(8);
  const [fiber, setFiber] = useState(2);

  const filteredFoods = foodDatabase.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDiet = dietFilter === 'ALL' || food.dietType === dietFilter;
    return matchesSearch && matchesDiet;
  });

  const handleAddFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newFood: FoodItem = {
      id: `food_${Date.now()}`,
      name,
      serving,
      servingGrams: 100,
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fat: Number(fat),
      fiber: Number(fiber),
      dietType,
      cuisine,
      mealCategory,
      priceTier: 'STANDARD',
      tags: ['verified-macro']
    };

    addFoodToDatabase(newFood);
    logAuditAction('ADDED_FOOD_ITEM', name);
    setIsAddModalOpen(false);
    setName('');
  };

  return (
    <div id="food-diet-admin" className="space-y-6 font-mono-num text-xs">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 bg-[#d8ff38]"></span>
            <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#d8ff38]">
              NUTRITION CALIBRATION MATRIX
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-display text-white">
            FOOD DATABASE & MACRO RULES
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono-num mt-1">
            Verified caloric values, macronutrient compositions, and 1:1 Smart Meal Swap equivalence engine rules.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-[#d8ff38] hover:bg-[#cbf425] text-black font-bold uppercase flex items-center gap-1.5 transition-colors"
        >
          <Plus size={14} />
          <span>ADD FOOD ITEM</span>
        </button>
      </div>

      {/* Filter bar */}
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search food item (Paneer, Chicken, Soya, Oats, Tofu...)"
            className="w-full bg-zinc-950 border border-white/10 pl-9 pr-4 py-2 text-white placeholder-zinc-500"
          />
        </div>
        <div>
          <select
            value={dietFilter}
            onChange={(e) => setDietFilter(e.target.value)}
            className="w-full bg-zinc-950 border border-white/10 px-3 py-2 text-zinc-300 uppercase"
          >
            <option value="ALL">ALL DIET LIFESTYLES</option>
            <option value="VEGETARIAN">VEGETARIAN</option>
            <option value="NON-VEGETARIAN">NON-VEGETARIAN</option>
            <option value="VEGAN">VEGAN</option>
          </select>
        </div>
      </div>

      {/* Food Items Table */}
      <div className="bg-zinc-950 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-900/80 border-b border-white/10 text-[10px] text-zinc-400 uppercase tracking-wider font-bold">
                <th className="p-3.5">FOOD NAME</th>
                <th className="p-3.5">DIET & CUISINE</th>
                <th className="p-3.5">SERVING</th>
                <th className="p-3.5">CALORIES</th>
                <th className="p-3.5">PROTEIN</th>
                <th className="p-3.5">CARBS</th>
                <th className="p-3.5">FATS</th>
                <th className="p-3.5">MEAL CATEGORY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredFoods.map(food => (
                <tr key={food.id} className="hover:bg-zinc-900/40 transition-colors">
                  <td className="p-3.5 font-bold text-white">
                    <span className="flex items-center gap-1.5">
                      {food.name}
                      <span className="h-1.5 w-1.5 rounded-full bg-[#d8ff38]" title="Verified Macro Calibrated" />
                    </span>
                  </td>

                  <td className="p-3.5">
                    <span className="text-zinc-300 block">{food.dietType}</span>
                    <span className="text-[10px] text-zinc-500 uppercase">{food.cuisine}</span>
                  </td>

                  <td className="p-3.5 text-zinc-400">{food.serving}</td>

                  <td className="p-3.5 font-bold text-white">
                    {food.calories} kcal
                  </td>

                  <td className="p-3.5 text-[#d8ff38] font-bold">
                    {food.protein}g
                  </td>

                  <td className="p-3.5 text-blue-400 font-bold">
                    {food.carbs}g
                  </td>

                  <td className="p-3.5 text-yellow-400 font-bold">
                    {food.fat}g
                  </td>

                  <td className="p-3.5 text-zinc-400 text-[10px] uppercase">
                    {food.mealCategory}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Food Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e0e12] border border-white/20 p-6 sm:p-8 max-w-md w-full font-mono-num text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold uppercase text-white">ADD FOOD ITEM TO VERIFIED MATRIX</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddFood} className="space-y-3">
              <div>
                <label className="block text-zinc-400 uppercase mb-1">FOOD NAME *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Soya Chunks (Raw Defatted)"
                  className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">DIET LIFESTYLE</label>
                  <select
                    value={dietType}
                    onChange={(e) => setDietType(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
                  >
                    <option value="VEGETARIAN">VEGETARIAN</option>
                    <option value="NON-VEGETARIAN">NON-VEGETARIAN</option>
                    <option value="VEGAN">VEGAN</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">SERVING SIZE</label>
                  <input
                    type="text"
                    value={serving}
                    onChange={(e) => setServing(e.target.value)}
                    placeholder="e.g. 100g cooked"
                    className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">KCAL</label>
                  <input
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">PROTEIN (G)</label>
                  <input
                    type="number"
                    value={protein}
                    onChange={(e) => setProtein(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">CARBS (G)</label>
                  <input
                    type="number"
                    value={carbs}
                    onChange={(e) => setCarbs(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">FAT (G)</label>
                  <input
                    type="number"
                    value={fat}
                    onChange={(e) => setFat(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">MEAL CATEGORY</label>
                  <select
                    value={mealCategory}
                    onChange={(e) => setMealCategory(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
                  >
                    <option value="BREAKFAST">BREAKFAST</option>
                    <option value="LUNCH">LUNCH</option>
                    <option value="SNACK">SNACK</option>
                    <option value="DINNER">DINNER</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">CUISINE</label>
                  <select
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
                  >
                    <option value="INDIAN">INDIAN</option>
                    <option value="INTERNATIONAL">INTERNATIONAL</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-zinc-900 text-zinc-400 uppercase font-bold"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#d8ff38] text-black font-bold uppercase"
                >
                  SAVE FOOD ITEM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
