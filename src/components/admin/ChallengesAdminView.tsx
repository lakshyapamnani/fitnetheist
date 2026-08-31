import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAdmin } from '../../context/AdminContext';
import { Challenge } from '../../types';
import { 
  Trophy, 
  Plus, 
  Edit3, 
  Trash2, 
  Clock, 
  Flame, 
  CheckCircle2, 
  Save, 
  Users,
  DollarSign
} from 'lucide-react';

export const ChallengesAdminView: React.FC = () => {
  const { challenges, updateChallenge, addChallenge, deleteChallenge } = useApp();
  const { logAuditAction } = useAdmin();

  const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form states for Create/Edit
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [durationDays, setDurationDays] = useState(21);
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('$149');
  const [badgeName, setBadgeName] = useState('POPULAR');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80');

  const startEdit = (ch: Challenge) => {
    setEditingChallenge(ch);
    setTitle(ch.title);
    setTagline(ch.tagline || '');
    setDurationDays(ch.durationDays);
    setDifficulty(ch.difficulty);
    setDescription(ch.description);
    setPrice(ch.price || '$149');
    setBadgeName(ch.badgeName || 'POPULAR');
    setImage(ch.image);
  };

  const handleSaveChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingChallenge) {
      updateChallenge(editingChallenge.id, {
        title,
        tagline,
        durationDays: Number(durationDays),
        difficulty,
        description,
        price,
        badgeName,
        image
      });
      logAuditAction('UPDATED_CHALLENGE', title);
      setEditingChallenge(null);
    } else {
      const newCh: Challenge = {
        id: `c_${Date.now()}`,
        title,
        tagline: tagline || 'Structured athletic recomposition',
        durationDays: Number(durationDays),
        difficulty,
        goal: 'Hypertrophy & Leanness',
        image: image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
        description,
        price,
        badgeName,
        enrolledCount: 420,
        workoutOverview: 'Periodized full body and hypertrophy splits with daily accountability logs',
        nutritionOverview: 'Calculated macro targets with vegetarian and high protein meal swaps',
        whatIsIncluded: [
          'Daily progress telemetry & streak validation',
          'Periodized training matrix & video form guides',
          'Smart macro swap engine access',
          'Private athlete cohort leaderboard'
        ],
        accountabilityRules: [
          'Log training session within 24 hours of completion',
          'Hit ±5% daily caloric target range',
          'Submit weekly biometrics & check-in photos'
        ],
        faqs: [
          { q: 'Can I do this with home equipment?', a: 'Yes, full dumbbell and bodyweight variations are provided.' }
        ],
        testimonials: [
          { quote: 'Gained 4kg of pure muscle in 60 days.', author: 'Aman V.', stat: '-6% Body Fat' }
        ]
      };
      addChallenge(newCh);
      logAuditAction('CREATED_CHALLENGE', title);
      setIsCreateModalOpen(false);
    }

    // Reset fields
    setTitle('');
    setDescription('');
  };

  return (
    <div id="challenges-admin-view" className="space-y-6 font-mono-num text-xs">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 bg-[#d8ff38]"></span>
            <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#d8ff38]">
              COHORT & CHALLENGE CMS
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-display text-white">
            FITNESS CHALLENGES
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono-num mt-1">
            Manage cohort pricing, duration, accountability rules, and live publication status across the website.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            setEditingChallenge(null);
            setTitle('');
            setTagline('');
            setDescription('');
            setPrice('$149');
            setIsCreateModalOpen(true);
          }}
          className="px-4 py-2.5 bg-[#d8ff38] hover:bg-[#cbf425] text-black font-bold uppercase flex items-center gap-2 transition-colors"
        >
          <Plus size={14} />
          <span>CREATE NEW CHALLENGE</span>
        </button>
      </div>

      {/* Challenges Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {challenges.map(ch => (
          <div key={ch.id} className="bg-zinc-950 border border-white/10 p-6 flex flex-col justify-between space-y-4">
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-zinc-900 border border-white/10 text-white font-bold uppercase text-[10px]">
                  {ch.durationDays} Days • {ch.difficulty}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase border bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                  {ch.badgeName || 'ACTIVE'}
                </span>
              </div>

              <h3 className="text-xl font-bold uppercase text-white font-display">{ch.title}</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">{ch.description}</p>

              <div className="pt-2 border-t border-white/5 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-500 uppercase">TIER PRICE</span>
                  <span className="text-[#d8ff38] font-bold">{ch.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 uppercase">DURATION DAYS</span>
                  <span className="text-white font-bold">{ch.durationDays} Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 uppercase">ENROLLED ATHLETES</span>
                  <span className="text-white font-bold">{ch.enrolledCount.toLocaleString()} athletes</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] text-zinc-500 uppercase">ID: {ch.id}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => startEdit(ch)}
                  className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white uppercase text-[10px] font-bold flex items-center gap-1 transition-colors"
                >
                  <Edit3 size={12} />
                  <span>EDIT</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete challenge "${ch.title}"?`)) {
                      deleteChallenge(ch.id);
                      logAuditAction('DELETED_CHALLENGE', ch.title);
                    }
                  }}
                  className="p-1.5 bg-zinc-950 hover:bg-red-950 text-zinc-500 hover:text-red-400 border border-white/5"
                  title="Delete Challenge"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Create / Edit Modal */}
      {(isCreateModalOpen || editingChallenge) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e0e12] border border-white/20 p-6 sm:p-8 max-w-lg w-full font-mono-num text-xs space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold uppercase text-white">
                {editingChallenge ? `EDIT CHALLENGE: ${editingChallenge.title}` : 'CREATE NEW CHALLENGE'}
              </h3>
              <button 
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setEditingChallenge(null);
                }} 
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveChallenge} className="space-y-4">
              <div>
                <label className="block text-zinc-400 uppercase mb-1">CHALLENGE TITLE *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 21 Day Ignite"
                  className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">TAGLINE</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Build unbreakable habits"
                  className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">DAYS (NUMBER)</label>
                  <input
                    type="number"
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">PRICE</label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="$149"
                    className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">DIFFICULTY</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white uppercase font-bold"
                  >
                    <option value="Beginner">BEGINNER</option>
                    <option value="Intermediate">INTERMEDIATE</option>
                    <option value="Advanced">ADVANCED</option>
                    <option value="All Levels">ALL LEVELS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">BADGE</label>
                  <input
                    type="text"
                    value={badgeName}
                    onChange={(e) => setBadgeName(e.target.value)}
                    placeholder="POPULAR"
                    className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">DESCRIPTION</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Comprehensive cohort overview..."
                  className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingChallenge(null);
                  }}
                  className="px-4 py-2 bg-zinc-900 text-zinc-400 uppercase font-bold"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#d8ff38] text-black font-bold uppercase"
                >
                  SAVE CHALLENGE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
