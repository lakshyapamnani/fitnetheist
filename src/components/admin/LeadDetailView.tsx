import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { LeadStatus, LeadTag } from '../../types/admin';
import { ClientIntakeModal } from './ClientIntakeModal';
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
  Trash2,
  IndianRupee,
  Sparkles
} from 'lucide-react';

export const LeadDetailView: React.FC = () => {
  const { 
    leads, 
    selectedLeadId, 
    setActiveSubtab, 
    setSelectedCustomerId,
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
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);

  const currentLead = leads.find(l => l.id === selectedLeadId) || leads[0];

  if (!currentLead) {
    return (
      <div className="text-center py-16 font-mono-num text-zinc-400">
        <p>No lead selected.</p>
        <button
          onClick={() => setActiveSubtab('leads')}
          className="mt-4 px-4 py-2 bg-[#FFC515] text-black font-bold uppercase rounded-sm"
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
    <div id="lead-detail-dossier" className="space-y-6 font-mono-num text-xs max-w-7xl mx-auto">
      
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
            className="px-3.5 py-2 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-black border border-emerald-500/40 uppercase font-bold flex items-center gap-1.5 transition-colors rounded-sm"
          >
            <MessageSquare size={14} />
            <span>DIRECT WHATSAPP</span>
          </button>

          <button
            onClick={() => setIsFollowUpModalOpen(true)}
            className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-white/20 text-white uppercase font-bold flex items-center gap-1.5 transition-colors rounded-sm"
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
            className="p-2 bg-zinc-950 hover:bg-red-950 border border-white/10 hover:border-red-500/40 text-zinc-500 hover:text-red-400 rounded-sm"
            title="Delete Lead"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Athlete Header Card */}
      <div className="bg-zinc-950 border border-white/10 p-6 relative rounded-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Main identity */}
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white font-display">
                {currentLead.name}
              </h2>
              <span className={`px-2.5 py-0.5 text-xs font-extrabold border rounded-xs ${
                currentLead.scoreClassification === 'HOT' 
                  ? 'bg-[#FFC515]/20 text-[#FFC515] border-[#FFC515]' 
                  : currentLead.scoreClassification === 'WARM' 
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500' 
                    : 'bg-zinc-800 text-zinc-400 border-white/10'
              }`}>
                INTENT SCORE: {currentLead.score} / 100 ({currentLead.scoreClassification})
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-2 text-zinc-400">
              <span className="flex items-center gap-1.5 text-white">
                <Phone size={12} className="text-[#FFC515]" /> {currentLead.phone}
              </span>
              <span className="flex items-center gap-1.5 text-white">
                <Mail size={12} className="text-[#FFC515]" /> {currentLead.email}
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
                className="bg-zinc-900 border border-white/20 px-3 py-2 text-white font-bold uppercase focus:border-[#FFC515] focus:outline-none rounded-xs"
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
                className="bg-zinc-900 border border-white/20 px-3 py-2 text-white font-bold uppercase focus:border-[#FFC515] focus:outline-none rounded-xs"
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
                className={`px-2 py-1 text-[10px] font-bold uppercase transition-colors border rounded-xs ${
                  isSelected 
                    ? 'bg-[#FFC515] text-black border-[#FFC515]' 
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
        <div className="lg:col-span-4 bg-zinc-950 border border-white/10 p-5 space-y-4 rounded-sm">
          <div className="border-b border-white/10 pb-3">
            <h3 className="text-xs font-bold uppercase text-white tracking-wider flex items-center gap-2">
              <Activity size={14} className="text-[#FFC515]" />
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
              <span className="text-[#FFC515] font-bold">{currentLead.challengeInterest || 'Not specified'}</span>
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
              <span className="text-[#FFC515] font-extrabold text-sm">₹{currentLead.estimatedValue.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Follow-up reminder box */}
          {currentLead.nextFollowUpDate && (
            <div className="p-3 bg-[#FFC515]/10 border border-[#FFC515]/30 space-y-1 rounded-sm">
              <div className="flex items-center gap-2 text-[#FFC515] font-bold uppercase text-[11px]">
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
        <div className="lg:col-span-4 bg-zinc-950 border border-white/10 p-5 space-y-5 rounded-sm">
          
          {/* Follow-up History */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="text-xs font-bold uppercase text-white tracking-wider flex items-center gap-2">
                <Calendar size={14} className="text-[#FFC515]" />
                FOLLOW-UP LOG ({currentLead.followUpHistory.length})
              </h3>
            </div>

            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {currentLead.followUpHistory.length === 0 ? (
                <p className="text-zinc-500 py-2">No follow-ups recorded yet.</p>
              ) : (
                currentLead.followUpHistory.map((fu, idx) => (
                  <div key={idx} className="p-2.5 bg-zinc-900 border border-white/5 text-[11px] rounded-xs">
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
              <FileText size={14} className="text-[#FFC515]" />
              COACH & SALES NOTES ({currentLead.notes.length})
            </h3>

            {/* Add note form */}
            <form onSubmit={handleAddNote} className="space-y-2">
              <textarea
                rows={2}
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Log internal note, call summary, or objection..."
                className="w-full bg-zinc-900 border border-white/10 p-2 text-white focus:border-[#FFC515] focus:outline-none rounded-xs"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#FFC515] text-black font-bold uppercase text-[10px] rounded-xs"
              >
                POST NOTE
              </button>
            </form>

            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {currentLead.notes.map(note => (
                <div key={note.id} className="p-2.5 bg-zinc-900/40 border border-white/5 rounded-xs text-[11px]">
                  <div className="flex justify-between text-zinc-500 mb-1">
                    <span className="font-bold text-white">{note.author}</span>
                    <span>{new Date(note.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-zinc-300">{note.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Col 3: Lead Journey & Scoring Audit (4 cols) */}
        <div className="lg:col-span-4 bg-zinc-950 border border-white/10 p-5 space-y-4 rounded-sm">
          <div className="border-b border-white/10 pb-3">
            <h3 className="text-xs font-bold uppercase text-white tracking-wider flex items-center gap-2">
              <Clock size={14} className="text-[#FFC515]" />
              LEAD JOURNEY & AUDIT TRAIL
            </h3>
          </div>

          <div className="space-y-3">
            {currentLead.timeline.map((event, idx) => (
              <div key={idx} className="flex items-start gap-3 text-[11px]">
                <div className="mt-1 h-2 w-2 rounded-full bg-[#FFC515] flex-shrink-0" />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold uppercase">{event.event.replace(/_/g, ' ')}</span>
                    <span className="text-zinc-500 text-[10px]">{event.date}</span>
                  </div>
                  <p className="text-zinc-400">{event.details}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Action to convert to Customer */}
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => setIsConvertModalOpen(true)}
              className="w-full py-2.5 bg-[#FFC515] hover:bg-[#e6b010] text-black font-extrabold uppercase tracking-wider text-xs flex items-center justify-center gap-2 rounded-sm shadow-md transition-transform active:scale-95"
            >
              <Sparkles size={16} />
              <span>CONVERT TO ACTIVE ATHLETE (CLIENT PROFILE)</span>
            </button>
          </div>
        </div>

      </div>

      {/* Convert Lead to Client Intake Modal */}
      {isConvertModalOpen && (
        <ClientIntakeModal
          isOpen={isConvertModalOpen}
          onClose={() => setIsConvertModalOpen(false)}
          leadToConvert={currentLead}
          onSuccess={(createdCustomer) => {
            setIsConvertModalOpen(false);
            setSelectedCustomerId(createdCustomer.id);
            setActiveSubtab('clients');
          }}
        />
      )}

      {/* Follow Up Modal */}
      {isFollowUpModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e0e12] border border-white/20 p-6 max-w-md w-full font-mono-num text-xs space-y-4 rounded-sm">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                SCHEDULE FOLLOW-UP: {currentLead.name}
              </h3>
              <button onClick={() => setIsFollowUpModalOpen(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleScheduleFollowUpSubmit} className="space-y-3">
              <div>
                <label className="block text-zinc-400 uppercase mb-1">DATE & TIME *</label>
                <input
                  type="date"
                  required
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 p-2 text-white rounded-xs"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">CHANNEL TYPE</label>
                <select
                  value={followUpType}
                  onChange={(e) => setFollowUpType(e.target.value as any)}
                  className="w-full bg-zinc-900 border border-zinc-800 p-2 text-white rounded-xs"
                >
                  <option value="WHATSAPP">WHATSAPP MESSAGE</option>
                  <option value="CALL">VOICE PHONE CALL</option>
                  <option value="EMAIL">EMAIL PROPOSAL</option>
                  <option value="MEETING">VIDEO CONSULTATION</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">AGENDA / NOTES *</label>
                <textarea
                  rows={3}
                  required
                  value={followUpNotes}
                  onChange={(e) => setFollowUpNotes(e.target.value)}
                  placeholder="Review custom macro target and challenge enrollment pricing in INR..."
                  className="w-full bg-zinc-900 border border-zinc-800 p-2 text-white rounded-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsFollowUpModalOpen(false)}
                  className="px-3 py-1.5 bg-zinc-900 text-zinc-400 uppercase font-bold rounded-xs"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#FFC515] text-black font-bold uppercase rounded-xs"
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
