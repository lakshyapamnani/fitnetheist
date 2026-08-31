import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { LeadStatus, LeadTag } from '../../types/admin';
import { 
  ArrowLeft, 
  Flame, 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar, 
  Clock, 
  UserCheck, 
  Tag as TagIcon, 
  Plus, 
  CheckCircle2, 
  FileText, 
  Activity, 
  Utensils, 
  Dumbbell, 
  AlertCircle,
  ExternalLink,
  Trash2
} from 'lucide-react';

export const LeadDetailView: React.FC = () => {
  const { 
    leads, 
    selectedLeadId, 
    setActiveSubtab, 
    updateLeadStatus, 
    assignLead, 
    addLeadNote, 
    scheduleFollowUp, 
    toggleLeadTag, 
    deleteLead 
  } = useAdmin();

  const [newNoteText, setNewNoteText] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [followUpType, setFollowUpType] = useState<'CALL' | 'WHATSAPP' | 'EMAIL' | 'MEETING'>('WHATSAPP');
  const [followUpNotes, setFollowUpNotes] = useState('');
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);

  const currentLead = leads.find(l => l.id === selectedLeadId) || leads[0];

  if (!currentLead) {
    return (
      <div className="text-center py-16 font-mono-num text-zinc-400">
        <p>No lead selected.</p>
        <button
          onClick={() => setActiveSubtab('leads')}
          className="mt-4 px-4 py-2 bg-[#d8ff38] text-black font-bold uppercase"
        >
          Return to Leads
        </button>
      </div>
    );
  }

  const availableTags: LeadTag[] = [
    'HOT', 'WARM', 'COLD', 'HIGH_VALUE', 
    '21_DAY', '60_DAY', '90_DAY', 
    'WEIGHT_LOSS', 'MUSCLE_GAIN', 
    'VEGETARIAN', 'NON_VEGETARIAN', 'VEGAN'
  ];

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    addLeadNote(currentLead.id, newNoteText.trim());
    setNewNoteText('');
  };

  const handleScheduleFollowUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpDate || !followUpNotes.trim()) return;
    scheduleFollowUp(currentLead.id, followUpDate, followUpType, followUpNotes.trim());
    setIsFollowUpModalOpen(false);
    setFollowUpNotes('');
    setFollowUpDate('');
  };

  const handleWhatsAppDirect = () => {
    const cleanPhone = currentLead.phone.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(`Hi ${currentLead.name}, this is the Fitnetheist coaching team regarding your ${currentLead.goal?.replace(/_/g, ' ') || 'transformation'} inquiry. Are you ready to review your personalized protocol?`);
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  return (
    <div id="lead-detail-dossier" className="space-y-6 font-mono-num text-xs">
      
      {/* Back button & Quick Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <button
          onClick={() => setActiveSubtab('leads')}
          className="flex items-center gap-2 text-zinc-400 hover:text-white font-bold uppercase tracking-wider transition-colors"
        >
          <ArrowLeft size={16} />
          <span>BACK TO LEADS PIPELINE</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleWhatsAppDirect}
            className="px-3 py-2 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-black border border-emerald-500/40 uppercase font-bold flex items-center gap-1.5 transition-colors"
          >
            <MessageSquare size={14} />
            <span>DIRECT WHATSAPP</span>
          </button>

          <button
            onClick={() => setIsFollowUpModalOpen(true)}
            className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border border-white/20 text-white uppercase font-bold flex items-center gap-1.5 transition-colors"
          >
            <Calendar size={14} />
            <span>SCHEDULE FOLLOW-UP</span>
          </button>

          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this lead?')) {
                deleteLead(currentLead.id);
                setActiveSubtab('leads');
              }
            }}
            className="p-2 bg-zinc-950 hover:bg-red-950 border border-white/10 hover:border-red-500/40 text-zinc-500 hover:text-red-400"
            title="Delete Lead"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Athlete Header Card */}
      <div className="bg-zinc-950 border border-white/10 p-6 relative">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Main identity */}
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white font-display">
                {currentLead.name}
              </h2>
              <span className={`px-2.5 py-0.5 text-xs font-extrabold border ${
                currentLead.scoreClassification === 'HOT' 
                  ? 'bg-[#d8ff38]/20 text-[#d8ff38] border-[#d8ff38]' 
                  : currentLead.scoreClassification === 'WARM' 
                    ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500' 
                    : 'bg-zinc-800 text-zinc-400 border-white/10'
              }`}>
                SCORE: {currentLead.score} / 100 ({currentLead.scoreClassification})
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-2 text-zinc-400">
              <span className="flex items-center gap-1.5 text-white">
                <Phone size={12} className="text-[#d8ff38]" /> {currentLead.phone}
              </span>
              <span className="flex items-center gap-1.5 text-white">
                <Mail size={12} className="text-[#d8ff38]" /> {currentLead.email}
              </span>
              <span>Source: <strong className="text-white">{currentLead.source.replace(/_/g, ' ')}</strong></span>
              <span>Captured: <strong className="text-white">{new Date(currentLead.createdAt).toLocaleDateString()}</strong></span>
            </div>
          </div>

          {/* Status & Assignment Quick Switches */}
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <label className="block text-[10px] text-zinc-500 uppercase font-bold mb-1">STAGE STATUS</label>
              <select
                value={currentLead.status}
                onChange={(e) => updateLeadStatus(currentLead.id, e.target.value as LeadStatus)}
                className="bg-zinc-900 border border-white/20 px-3 py-2 text-white font-bold uppercase focus:border-[#d8ff38] focus:outline-none"
              >
                <option value="NEW">NEW</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="QUALIFIED">QUALIFIED</option>
                <option value="INTERESTED">INTERESTED</option>
                <option value="FOLLOW_UP">FOLLOW-UP</option>
                <option value="CONVERTED">CONVERTED (WON)</option>
                <option value="LOST">LOST / DISQUALIFIED</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 uppercase font-bold mb-1">ASSIGNED STAFF</label>
              <select
                value={currentLead.assignedTo}
                onChange={(e) => assignLead(currentLead.id, e.target.value)}
                className="bg-zinc-900 border border-white/20 px-3 py-2 text-white font-bold uppercase focus:border-[#d8ff38] focus:outline-none"
              >
                <option value="Alex Mercer (Head Coach)">Alex Mercer (Head Coach)</option>
                <option value="Vikram Mehta (Sales Lead)">Vikram Mehta (Sales Lead)</option>
                <option value="Ananya Roy (Coach/Advisor)">Ananya Roy (Coach/Advisor)</option>
                <option value="Unassigned">Unassigned</option>
              </select>
            </div>
          </div>

        </div>

        {/* Tag pills bar */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-[10px] text-zinc-500 uppercase font-bold flex items-center gap-1 mr-2">
            <TagIcon size={12} /> TAGS:
          </span>
          {availableTags.map(tag => {
            const isSelected = currentLead.tags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleLeadTag(currentLead.id, tag)}
                className={`px-2 py-1 text-[10px] font-bold uppercase transition-colors border ${
                  isSelected 
                    ? 'bg-[#d8ff38] text-black border-[#d8ff38]' 
                    : 'bg-zinc-900 text-zinc-400 border-white/10 hover:border-white/30'
                }`}
              >
                {tag.replace(/_/g, ' ')}
              </button>
            );
          })}
        </div>

      </div>

      {/* Grid: Biometrics & Calculators (4 cols) + Followups & Notes (4 cols) + Activity Timeline (4 cols) */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Col 1: Athlete Biometrics & Preferences (4 cols) */}
        <div className="lg:col-span-4 bg-zinc-950 border border-white/10 p-5 space-y-4">
          <div className="border-b border-white/10 pb-3">
            <h3 className="text-xs font-bold uppercase text-white tracking-wider flex items-center gap-2">
              <Activity size={14} className="text-[#d8ff38]" />
              BIOMETRICS & CALCULATED DATA
            </h3>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-500 uppercase">PRIMARY GOAL</span>
              <span className="text-white font-bold">{currentLead.goal.replace(/_/g, ' ')}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-500 uppercase">CHALLENGE INTEREST</span>
              <span className="text-[#d8ff38] font-bold">{currentLead.challengeInterest || 'Not specified'}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-500 uppercase">CALCULATED CALORIES</span>
              <span className="text-white font-bold">
                {currentLead.calculatedCalories ? `${currentLead.calculatedCalories} kcal / day` : 'Pending calculation'}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-500 uppercase">DIETARY LIFESTYLE</span>
              <span className="text-white font-bold">{currentLead.dietType || 'Vegetarian'}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-500 uppercase">PREFERRED CUISINE</span>
              <span className="text-white font-bold">{currentLead.preferredCuisine || 'Indian Traditional'}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-500 uppercase">AGE / SEX</span>
              <span className="text-white font-bold">
                {currentLead.age ? `${currentLead.age} yrs, ${currentLead.sex || 'Male'}` : 'Not provided'}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-500 uppercase">HEIGHT & WEIGHT</span>
              <span className="text-white font-bold">
                {currentLead.heightCm && currentLead.weightKg 
                  ? `${currentLead.heightCm} cm • ${currentLead.weightKg} kg` 
                  : 'Not provided'}
              </span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-zinc-500 uppercase">ESTIMATED VALUE</span>
              <span className="text-[#d8ff38] font-bold">${currentLead.estimatedValue}</span>
            </div>
          </div>

          {/* Follow-up reminder box */}
          {currentLead.nextFollowUpDate && (
            <div className="p-3 bg-[#d8ff38]/10 border border-[#d8ff38]/30 space-y-1">
              <div className="flex items-center gap-2 text-[#d8ff38] font-bold uppercase text-[11px]">
                <Clock size={13} />
                <span>FOLLOW-UP SCHEDULED: {currentLead.nextFollowUpDate}</span>
              </div>
              <p className="text-zinc-300 text-[11px]">
                Check follow-up history below for specific agenda and deliverables.
              </p>
            </div>
          )}
        </div>

        {/* Col 2: Notes & Follow-up History (4 cols) */}
        <div className="lg:col-span-4 bg-zinc-950 border border-white/10 p-5 space-y-5">
          
          {/* Follow-up History */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="text-xs font-bold uppercase text-white tracking-wider flex items-center gap-2">
                <Calendar size={14} className="text-[#d8ff38]" />
                FOLLOW-UP LOG ({currentLead.followUpHistory.length})
              </h3>
            </div>

            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {currentLead.followUpHistory.length === 0 ? (
                <p className="text-zinc-500 py-2">No follow-ups recorded yet.</p>
              ) : (
                currentLead.followUpHistory.map((fu, idx) => (
                  <div key={idx} className="p-2.5 bg-zinc-900 border border-white/5 text-[11px]">
                    <div className="flex justify-between text-zinc-400 mb-1">
                      <span className="text-white font-bold">{fu.type} • {fu.date}</span>
                      <span>by {fu.loggedBy}</span>
                    </div>
                    <p className="text-zinc-300">{fu.notes}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Internal Notes Feed */}
          <div className="space-y-3 pt-3 border-t border-white/10">
            <h3 className="text-xs font-bold uppercase text-white tracking-wider flex items-center gap-2">
              <FileText size={14} className="text-[#d8ff38]" />
              COACH & SALES NOTES ({currentLead.notes.length})
            </h3>

            {/* Add note form */}
            <form onSubmit={handleAddNote} className="space-y-2">
              <textarea
                rows={2}
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Log internal note, call summary, or objection..."
                className="w-full bg-zinc-900 border border-white/10 p-2 text-white focus:border-[#d8ff38] focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold uppercase transition-colors"
              >
                + ADD NOTE
              </button>
            </form>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {currentLead.notes.map(note => (
                <div key={note.id} className="p-2.5 bg-zinc-900/60 border border-white/5 text-[11px]">
                  <div className="flex justify-between text-zinc-400 mb-1">
                    <span className="text-white font-bold">{note.author}</span>
                    <span>{new Date(note.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                  </div>
                  <p className="text-zinc-300 leading-relaxed">{note.content}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Col 3: Chronological Activity Timeline (4 cols) */}
        <div className="lg:col-span-4 bg-zinc-950 border border-white/10 p-5 space-y-4">
          <div className="border-b border-white/10 pb-3">
            <h3 className="text-xs font-bold uppercase text-white tracking-wider flex items-center gap-2">
              <Clock size={14} className="text-[#d8ff38]" />
              CHRONOLOGICAL TIMELINE
            </h3>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {currentLead.activities.map(act => (
              <div key={act.id} className="p-3 bg-zinc-900/30 border-l-2 border-[#d8ff38] space-y-1">
                <div className="flex justify-between text-[10px] text-zinc-500">
                  <span className="text-[#d8ff38] font-bold uppercase">{act.type.replace(/_/g, ' ')}</span>
                  <span>{new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-zinc-300 leading-relaxed">{act.description}</p>
                <span className="text-[10px] text-zinc-500 block">by {act.performedBy}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Schedule Follow-Up Modal */}
      {isFollowUpModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e0e12] border border-white/20 p-6 sm:p-8 max-w-md w-full font-mono-num text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold uppercase text-white">SCHEDULE OUTREACH / FOLLOW-UP</h3>
              <button onClick={() => setIsFollowUpModalOpen(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleScheduleFollowUpSubmit} className="space-y-3">
              <div>
                <label className="block text-zinc-400 uppercase mb-1">DATE *</label>
                <input
                  type="date"
                  required
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">COMMUNICATION CHANNEL</label>
                <select
                  value={followUpType}
                  onChange={(e) => setFollowUpType(e.target.value as any)}
                  className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white"
                >
                  <option value="WHATSAPP">WHATSAPP</option>
                  <option value="CALL">PHONE CALL</option>
                  <option value="EMAIL">EMAIL</option>
                  <option value="MEETING">VIDEO CONSULTATION</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">OUTREACH AGENDA / NOTES *</label>
                <textarea
                  rows={3}
                  required
                  value={followUpNotes}
                  onChange={(e) => setFollowUpNotes(e.target.value)}
                  placeholder="e.g. Send 21-Day vegetarian meal plan PDF & confirm onboarding date..."
                  className="w-full bg-zinc-900 border border-zinc-800 p-3 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsFollowUpModalOpen(false)}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 uppercase font-bold"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#d8ff38] hover:bg-[#cbf425] text-black font-bold uppercase"
                >
                  SAVE SCHEDULE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
