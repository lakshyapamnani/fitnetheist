import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAdmin } from '../../context/AdminContext';
import { Exercise, MuscleGroup, ExperienceLevel, EquipmentType } from '../../types';
import { 
  Dumbbell, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  Play, 
  Filter,
  CheckCircle2
} from 'lucide-react';

export const WorkoutsAndExercisesAdminView: React.FC = () => {
  const { exercises, addExercise } = useApp();
  const { logAuditAction } = useAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState<MuscleGroup>('CHEST');
  const [targetMuscles, setTargetMuscles] = useState('Pectoralis major, Anterior deltoid, Triceps');
  const [difficulty, setDifficulty] = useState<ExperienceLevel>('INTERMEDIATE');
  const [equipment, setEquipment] = useState<EquipmentType>('FULL_GYM');
  const [sets, setSets] = useState('4');
  const [reps, setReps] = useState('8-10');
  const [restSeconds, setRestSeconds] = useState(90);
  const [keyFormTip, setKeyFormTip] = useState('Retract scapulae and drive heels into floor');
  const [videoThumbnail, setVideoThumbnail] = useState('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80');

  const filteredExercises = exercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ex.targetMuscles.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || ex.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddExercise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newEx: Exercise = {
      id: `ex_${Date.now()}`,
      name,
      category,
      targetMuscles,
      difficulty,
      equipment,
      sets,
      reps,
      restSeconds: Number(restSeconds),
      keyFormTip,
      videoThumbnail,
      instructions: [
        'Establish proper biomechanical setup and brace core',
        'Execute controlled eccentric phase under tension',
        'Drive through concentric contraction forcefully'
      ]
    };

    addExercise(newEx);
    logAuditAction('ADDED_EXERCISE', name);
    setIsAddModalOpen(false);
    setName('');
  };

  return (
    <div id="workouts-exercises-admin" className="space-y-6 font-mono-num text-xs">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 bg-[#d8ff38]"></span>
            <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#d8ff38]">
              EXERCISE CMS & SPLIT PROTOCOLS
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-display text-white">
            EXERCISE LIBRARY & WORKOUT ENGINE
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono-num mt-1">
            Manage movement mechanics, target muscular groups, form coaching cues, and progressive overload defaults.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-[#d8ff38] hover:bg-[#cbf425] text-black font-bold uppercase flex items-center gap-1.5 transition-colors"
        >
          <Plus size={14} />
          <span>ADD EXERCISE</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search exercises by name or anatomical muscle (Bench, Deadlift, Quads, Lats...)"
            className="w-full bg-zinc-950 border border-white/10 pl-9 pr-4 py-2 text-white placeholder-zinc-500"
          />
        </div>
        <div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full bg-zinc-950 border border-white/10 px-3 py-2 text-zinc-300 uppercase"
          >
            <option value="ALL">ALL MUSCLE GROUPS</option>
            <option value="CHEST">CHEST</option>
            <option value="BACK">BACK</option>
            <option value="SHOULDERS">SHOULDERS</option>
            <option value="ARMS">ARMS</option>
            <option value="LEGS">LEGS</option>
            <option value="CORE">CORE</option>
            <option value="HIIT">HIIT / CARDIO</option>
            <option value="MOBILITY">MOBILITY</option>
          </select>
        </div>
      </div>

      {/* Exercises Table */}
      <div className="bg-zinc-950 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-900/80 border-b border-white/10 text-[10px] text-zinc-400 uppercase tracking-wider font-bold">
                <th className="p-3.5">MOVEMENT NAME</th>
                <th className="p-3.5">CATEGORY</th>
                <th className="p-3.5">TARGET MUSCLES</th>
                <th className="p-3.5">SETS / REPS</th>
                <th className="p-3.5">REST</th>
                <th className="p-3.5">DIFFICULTY</th>
                <th className="p-3.5">EQUIPMENT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredExercises.map(ex => (
                <tr key={ex.id} className="hover:bg-zinc-900/40 transition-colors">
                  <td className="p-3.5 font-bold text-white">
                    <span className="flex items-center gap-2">
                      <Dumbbell size={14} className="text-[#d8ff38]" />
                      {ex.name}
                    </span>
                  </td>

                  <td className="p-3.5">
                    <span className="px-2 py-0.5 bg-zinc-900 border border-white/10 text-white font-bold uppercase text-[10px]">
                      {ex.category}
                    </span>
                  </td>

                  <td className="p-3.5 text-zinc-400 max-w-xs truncate">
                    {ex.targetMuscles}
                  </td>

                  <td className="p-3.5 text-white font-bold">
                    {ex.sets} × {ex.reps}
                  </td>

                  <td className="p-3.5 text-zinc-400">
                    {ex.restSeconds}s
                  </td>

                  <td className="p-3.5">
                    <span className="text-[10px] text-[#d8ff38] font-bold uppercase">
                      {ex.difficulty}
                    </span>
                  </td>

                  <td className="p-3.5 text-zinc-400 text-[10px] uppercase">
                    {ex.equipment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Exercise Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e0e12] border border-white/20 p-6 sm:p-8 max-w-lg w-full font-mono-num text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold uppercase text-white">ADD EXERCISE TO DATABASE</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddExercise} className="space-y-3">
              <div>
                <label className="block text-zinc-400 uppercase mb-1">EXERCISE NAME *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Incline Dumbbell Press"
                  className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">CATEGORY</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
                  >
                    <option value="CHEST">CHEST</option>
                    <option value="BACK">BACK</option>
                    <option value="SHOULDERS">SHOULDERS</option>
                    <option value="ARMS">ARMS</option>
                    <option value="LEGS">LEGS</option>
                    <option value="CORE">CORE</option>
                    <option value="HIIT">HIIT</option>
                    <option value="MOBILITY">MOBILITY</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">EQUIPMENT</label>
                  <select
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
                  >
                    <option value="FULL_GYM">FULL GYM</option>
                    <option value="DUMBBELLS_ONLY">DUMBBELLS ONLY</option>
                    <option value="BODYWEIGHT_HOME">BODYWEIGHT HOME</option>
                    <option value="MINIMAL_RESISTANCE">MINIMAL RESISTANCE</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">TARGET MUSCLES</label>
                <input
                  type="text"
                  value={targetMuscles}
                  onChange={(e) => setTargetMuscles(e.target.value)}
                  placeholder="e.g. Clavicular head, Triceps, Anterior Deltoid"
                  className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">SETS</label>
                  <input
                    type="text"
                    value={sets}
                    onChange={(e) => setSets(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">REPS</label>
                  <input
                    type="text"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">REST (S)</label>
                  <input
                    type="number"
                    value={restSeconds}
                    onChange={(e) => setRestSeconds(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">COACHING FORM CUE</label>
                <input
                  type="text"
                  value={keyFormTip}
                  onChange={(e) => setKeyFormTip(e.target.value)}
                  placeholder="e.g. Set bench to 30 degrees to minimize anterior deltoid dominance."
                  className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
                />
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
                  SAVE EXERCISE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
