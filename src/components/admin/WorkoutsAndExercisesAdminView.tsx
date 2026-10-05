import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAdmin } from '../../context/AdminContext';
import { Exercise, MuscleGroup, ExperienceLevel, EquipmentType } from '../../types';
import { ExerciseVideoPlayer } from '../ExerciseVideoPlayer';
import { 
  Dumbbell, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  Play, 
  Filter,
  CheckCircle2,
  Video,
  ExternalLink,
  Eye,
  Check
} from 'lucide-react';

export const WorkoutsAndExercisesAdminView: React.FC = () => {
  const { exercises, addExercise, updateExercise, deleteExercise } = useApp();
  const { logAuditAction } = useAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [previewVideoExercise, setPreviewVideoExercise] = useState<Exercise | null>(null);

  // Form states (for Add & Edit)
  const [name, setName] = useState('');
  const [category, setCategory] = useState<MuscleGroup>('CHEST');
  const [targetMuscles, setTargetMuscles] = useState('Pectoralis major, Anterior deltoid, Triceps');
  const [difficulty, setDifficulty] = useState<ExperienceLevel>('INTERMEDIATE');
  const [equipment, setEquipment] = useState<EquipmentType>('FULL_GYM');
  const [sets, setSets] = useState('4');
  const [reps, setReps] = useState('8-10');
  const [restSeconds, setRestSeconds] = useState(90);
  const [keyFormTip, setKeyFormTip] = useState('Retract scapulae and drive heels into floor');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoThumbnail, setVideoThumbnail] = useState('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80');

  const safeExercises = Array.isArray(exercises) ? exercises : [];

  const filteredExercises = safeExercises.filter(ex => {
    if (!ex) return false;
    const term = (searchTerm || '').toLowerCase();
    const nameMatch = (ex.name || '').toLowerCase().includes(term);
    const targetMatch = (ex.targetMuscles || '').toLowerCase().includes(term);
    const matchesSearch = !term || nameMatch || targetMatch;
    const matchesCategory = categoryFilter === 'ALL' || ex.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const resetForm = () => {
    setName('');
    setCategory('CHEST');
    setTargetMuscles('');
    setDifficulty('INTERMEDIATE');
    setEquipment('FULL_GYM');
    setSets('4');
    setReps('8-10');
    setRestSeconds(90);
    setKeyFormTip('');
    setVideoUrl('');
    setVideoThumbnail('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80');
    setEditingExercise(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const openEditModal = (ex: Exercise) => {
    setEditingExercise(ex);
    setName(ex.name);
    setCategory(ex.category);
    setTargetMuscles(ex.targetMuscles);
    setDifficulty(ex.difficulty);
    setEquipment(ex.equipment);
    setSets(ex.sets);
    setReps(ex.reps);
    setRestSeconds(ex.restSeconds);
    setKeyFormTip(ex.keyFormTip);
    setVideoUrl(ex.videoUrl || '');
    setVideoThumbnail(ex.videoThumbnail || 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80');
    setIsAddModalOpen(true);
  };

  const handleSaveExercise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingExercise) {
      updateExercise(editingExercise.id, {
        name,
        category,
        targetMuscles,
        difficulty,
        equipment,
        sets,
        reps,
        restSeconds: Number(restSeconds),
        keyFormTip,
        videoUrl: videoUrl.trim(),
        videoThumbnail: videoThumbnail.trim() || editingExercise.videoThumbnail
      });
      logAuditAction('UPDATED_EXERCISE', `${name} (Video URL updated)`);
    } else {
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
        videoUrl: videoUrl.trim(),
        videoThumbnail: videoThumbnail.trim() || 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80',
        instructions: [
          'Establish proper biomechanical setup and brace core',
          'Execute controlled eccentric phase under tension',
          'Drive through concentric contraction forcefully'
        ]
      };

      addExercise(newEx);
      logAuditAction('ADDED_EXERCISE', `${name} with Form Video URL`);
    }

    setIsAddModalOpen(false);
    resetForm();
  };

  const handleDelete = (id: string, exName: string) => {
    if (confirm(`Are you sure you want to delete ${exName}?`)) {
      deleteExercise(id);
      logAuditAction('DELETED_EXERCISE', exName);
    }
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
            EXERCISE LIBRARY & FORM VIDEOS
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono-num mt-1">
            Add exercises with proper form video URLs (YouTube, Vimeo, MP4, Loom) that clients can view directly in their workouts.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-[#d8ff38] hover:bg-[#cbf425] text-black font-bold uppercase flex items-center gap-1.5 transition-colors"
        >
          <Plus size={14} />
          <span>ADD EXERCISE + VIDEO URL</span>
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
            <option value="ALL">ALL MUSCLE GROUPS ({safeExercises.length})</option>
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
                <th className="p-3.5">FORM VIDEO</th>
                <th className="p-3.5">CATEGORY</th>
                <th className="p-3.5">TARGET MUSCLES</th>
                <th className="p-3.5">SETS / REPS</th>
                <th className="p-3.5">REST</th>
                <th className="p-3.5">DIFFICULTY</th>
                <th className="p-3.5">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredExercises.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-zinc-500 font-mono-num">
                    No exercises found. Click "Add Exercise" to register your first movement.
                  </td>
                </tr>
              ) : (
                filteredExercises.map(ex => {
                  const hasVideo = Boolean(ex.videoUrl && ex.videoUrl.trim().length > 0);
                  return (
                    <tr key={ex.id} className="hover:bg-zinc-900/40 transition-colors">
                      <td className="p-3.5 font-bold text-white">
                        <div className="flex items-center gap-2">
                          <Dumbbell size={14} className="text-[#d8ff38] shrink-0" />
                          <span>{ex.name}</span>
                        </div>
                      </td>

                      <td className="p-3.5">
                        {hasVideo ? (
                          <button
                            onClick={() => setPreviewVideoExercise(ex)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#d8ff38]/10 hover:bg-[#d8ff38] text-[#d8ff38] hover:text-black border border-[#d8ff38]/30 rounded text-[10px] font-bold uppercase transition-colors"
                            title="Preview Proper Form Video"
                          >
                            <Play size={10} fill="currentColor" />
                            <span>Preview Video</span>
                          </button>
                        ) : (
                          <span className="text-[10px] text-zinc-500 uppercase flex items-center gap-1">
                            <Video size={11} className="text-zinc-600" />
                            <span>No URL</span>
                          </span>
                        )}
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

                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(ex)}
                            className="p-1.5 bg-zinc-900 hover:bg-white hover:text-black border border-white/10 text-zinc-300 transition-colors"
                            title="Edit Exercise & Video Link"
                          >
                            <Edit3 size={12} />
                          </button>
                          <button
                            onClick={() => handleDelete(ex.id, ex.name)}
                            className="p-1.5 bg-zinc-900 hover:bg-red-500 hover:text-white border border-white/10 text-zinc-400 hover:border-red-500 transition-colors"
                            title="Delete Exercise"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Exercise Modal with Video URL Input */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e0e12] border border-white/20 p-6 sm:p-8 max-w-xl w-full font-mono-num text-xs space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] text-[#d8ff38] font-bold uppercase tracking-widest block">EXERCISE PROTOCOL</span>
                <h3 className="text-sm sm:text-base font-bold uppercase text-white">
                  {editingExercise ? `EDIT EXERCISE: ${editingExercise.name}` : 'ADD EXERCISE TO DATABASE'}
                </h3>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-zinc-400 hover:text-white p-1">✕</button>
            </div>

            <form onSubmit={handleSaveExercise} className="space-y-4">
              
              {/* Exercise Name */}
              <div>
                <label className="block text-zinc-300 uppercase font-bold mb-1">EXERCISE NAME *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Incline Dumbbell Press"
                  className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-white focus:border-[#d8ff38] outline-none"
                />
              </div>

              {/* VIDEO URL INPUT FIELD (Google Drive, YouTube, Vimeo, MP4, Loom) */}
              <div className="p-3.5 bg-black/60 border border-[#d8ff38]/40 rounded-sm space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-[#d8ff38] uppercase font-extrabold text-[11px] flex items-center gap-1.5">
                    <Video size={13} />
                    <span>PROPER FORM VIDEO URL (GOOGLE DRIVE / YOUTUBE / VIMEO / MP4 / LOOM)</span>
                  </label>
                  {videoUrl && (
                    <span className="text-[10px] text-green-400 font-bold flex items-center gap-1">
                      <Check size={10} /> Valid link provided
                    </span>
                  )}
                </div>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/.../view or https://youtu.be/..."
                  className="w-full bg-zinc-950 border border-zinc-700 p-2.5 text-white font-mono text-xs focus:border-[#d8ff38] outline-none"
                />
                <p className="text-[10px] text-zinc-400 leading-relaxed">
                  Paste the URL of the proper form demo video. <strong>Google Drive links work seamlessly</strong> (make sure file sharing is set to <em>"Anyone with the link can view"</em>). Clients can play the video directly inside their workout plan.
                </p>
              </div>

              {/* Category & Equipment */}
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
                    <option value="DUMBBELLS">DUMBBELLS ONLY</option>
                    <option value="HOME_GYM">HOME GYM / RACK</option>
                    <option value="NO_EQUIPMENT">NO EQUIPMENT / BODYWEIGHT</option>
                  </select>
                </div>
              </div>

              {/* Target Muscles */}
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

              {/* Sets / Reps / Rest */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">SETS</label>
                  <input
                    type="text"
                    value={sets}
                    onChange={(e) => setSets(e.target.value)}
                    placeholder="4"
                    className="w-full bg-zinc-900 border border-zinc-800 p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">REPS</label>
                  <input
                    type="text"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    placeholder="8-10"
                    className="w-full bg-zinc-900 border border-zinc-800 p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">REST (S)</label>
                  <input
                    type="number"
                    value={restSeconds}
                    onChange={(e) => setRestSeconds(Number(e.target.value))}
                    placeholder="90"
                    className="w-full bg-zinc-900 border border-zinc-800 p-2 text-white"
                  />
                </div>
              </div>

              {/* Coaching Form Cue */}
              <div>
                <label className="block text-zinc-400 uppercase mb-1">COACHING BIOMECHANICAL CUE</label>
                <input
                  type="text"
                  value={keyFormTip}
                  onChange={(e) => setKeyFormTip(e.target.value)}
                  placeholder="e.g. Retract scapulae and tuck elbows at 45 degrees"
                  className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
                />
              </div>

              {/* Thumbnail Image URL */}
              <div>
                <label className="block text-zinc-400 uppercase mb-1">COVER THUMBNAIL IMAGE URL</label>
                <input
                  type="text"
                  value={videoThumbnail}
                  onChange={(e) => setVideoThumbnail(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-zinc-900 border border-zinc-800 p-2 text-white text-[11px]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-zinc-900 text-zinc-400 uppercase font-bold hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#d8ff38] text-black font-bold uppercase tracking-wider hover:bg-[#cbf425]"
                >
                  {editingExercise ? 'UPDATE EXERCISE' : 'SAVE EXERCISE'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Preview Modal for Admin QA */}
      {previewVideoExercise && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e0e12] border border-white/20 max-w-2xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] text-[#d8ff38] font-bold uppercase tracking-widest block">FORM DEMO PREVIEW</span>
                <h3 className="text-lg font-bold text-white uppercase">{previewVideoExercise.name}</h3>
              </div>
              <button
                onClick={() => setPreviewVideoExercise(null)}
                className="text-zinc-400 hover:text-white text-xs uppercase px-3 py-1 border border-zinc-800"
              >
                CLOSE
              </button>
            </div>

            <div className="space-y-3">
              <ExerciseVideoPlayer
                videoUrl={previewVideoExercise.videoUrl}
                thumbnailUrl={previewVideoExercise.videoThumbnail}
                exerciseName={previewVideoExercise.name}
                autoPlay={true}
              />

              <div className="p-3 bg-zinc-900 border border-white/5 text-xs text-zinc-300 space-y-1">
                <p><strong className="text-[#d8ff38]">Direct Link:</strong> {previewVideoExercise.videoUrl || 'None'}</p>
                <p><strong className="text-white">Coach Cue:</strong> {previewVideoExercise.keyFormTip}</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setPreviewVideoExercise(null)}
                className="px-4 py-2 bg-white text-black font-bold uppercase text-xs"
              >
                DONE
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
