import React, { useState } from 'react';
import { Customer, ClientCheckIn, ClientCoachNote } from '../../types/admin';
import { useAdmin } from '../../context/AdminContext';
import { ClientIntakeModal } from './ClientIntakeModal';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Flame, 
  Dumbbell, 
  TrendingDown, 
  TrendingUp, 
  HeartPulse, 
  FileText, 
  MessageSquare, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Award, 
  ShieldCheck, 
  Droplet, 
  Utensils, 
  Activity, 
  ExternalLink,
  ChevronRight,
  Send,
  Zap
} from 'lucide-react';

interface ClientProfileDetailViewProps {
  customerId: string;
  onBack: () => void;
}

export const ClientProfileDetailView: React.FC<ClientProfileDetailViewProps> = ({
  customerId,
  onBack
}) => {
  const { 
    customers, 
    updateCustomer, 
    deleteCustomer, 
    addClientCheckIn, 
    addClientCoachNote,
    invoices,
    setActiveSubtab,
    currentRole
  } = useAdmin();

  const client = customers.find(c => c.id === customerId);

  const [activeProfileTab, setActiveProfileTab] = useState<'BIOMETRICS' | 'NUTRITION' | 'WORKOUT' | 'CHECKINS' | 'NOTES' | 'INVOICES'>('BIOMETRICS');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isCoachNoteModalOpen, setIsCoachNoteModalOpen] = useState(false);

  // New Check-in Form State
  const [checkInWeight, setCheckInWeight] = useState<number>(client?.currentWeightKg || 75);
  const [checkInWaist, setCheckInWaist] = useState<number | undefined>(undefined);
  const [checkInBodyFat, setCheckInBodyFat] = useState<number | undefined>(undefined);
  const [checkInAdherence, setCheckInAdherence] = useState<number>(9);
  const [checkInNotes, setCheckInNotes] = useState('');
  const [checkInFeedback, setCheckInFeedback] = useState('');

  // New Coach Note Form State
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteType, setNewNoteType] = useState<ClientCoachNote['type']>('GENERAL');

  if (!client) {
    return (
      <div className="p-8 text-center bg-[#0e0e12] border border-white/10 rounded-sm">
        <AlertCircle size={32} className="mx-auto text-amber-400 mb-3" />
        <h3 className="text-lg font-bold text-white uppercase font-display">Client Profile Not Found</h3>
        <p className="text-zinc-400 text-xs mt-1">The requested client record may have been removed or merged.</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-[#FFC515] text-black font-bold uppercase text-xs rounded-sm inline-flex items-center gap-2"
        >
          <ArrowLeft size={14} /> Back to Client Roster
        </button>
      </div>
    );
  }

  // Calculate weight progress metrics
  const startingWt = client.startingWeightKg || client.currentWeightKg || 75;
  const currentWt = client.currentWeightKg || startingWt;
  const targetWt = client.targetWeightKg || startingWt;
  const isLossGoal = client.dietGoal === 'LOSE_WEIGHT' || targetWt < startingWt;
  
  const totalChangeKg = currentWt - startingWt;
  const totalDistanceToCover = Math.abs(targetWt - startingWt);
  const distanceCovered = Math.abs(currentWt - startingWt);
  const progressPercent = totalDistanceToCover > 0 ? Math.min(Math.round((distanceCovered / totalDistanceToCover) * 100), 100) : 100;

  // Calculate BMI
  const heightM = (client.heightCm || 175) / 100;
  const bmi = heightM > 0 ? (currentWt / (heightM * heightM)).toFixed(1) : '22.0';

  // Client's linked invoices
  const clientInvoices = (invoices || []).filter(
    inv => (inv.clientEmail && inv.clientEmail.toLowerCase() === client.email.toLowerCase()) || 
           (inv.clientName && inv.clientName.toLowerCase() === client.name.toLowerCase())
  );

  // WhatsApp click handler
  const handleDirectWhatsApp = () => {
    const rawPhone = (client.phone || '').replace(/[^0-9]/g, '');
    const cleanPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;
    const msg = encodeURIComponent(
      `Hey ${client.name}! Coach ${client.assignedCoach.split(' ')[1] || 'Neetu'} here from FitneTheist. Checking in on your nutrition and workout protocol today! How are you feeling?`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  // Submit Check-in
  const handleCheckInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addClientCheckIn(client.id, {
      date: new Date().toISOString().split('T')[0],
      weightKg: Number(checkInWeight),
      waistCircumferenceCm: checkInWaist ? Number(checkInWaist) : undefined,
      bodyFatPercent: checkInBodyFat ? Number(checkInBodyFat) : undefined,
      adherenceScore: Number(checkInAdherence),
      clientNotes: checkInNotes.trim() || 'Weekly check-in logged by athlete/coach.',
      coachFeedback: checkInFeedback.trim() || 'Keep pushing! Maintain consistent hydration and protein intake.',
      photosUploaded: false
    });
    setIsCheckInModalOpen(false);
    setCheckInNotes('');
    setCheckInFeedback('');
  };

  // Submit Coach Note
  const handleAddCoachNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;
    addClientCoachNote(client.id, {
      author: currentRole === 'SUPER_ADMIN' ? 'Head Coach / Admin' : currentRole.replace('_', ' '),
      content: newNoteContent.trim(),
      type: newNoteType
    });
    setNewNoteContent('');
  };

  return (
    <div id={`client-profile-${client.id}`} className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0a0a0e] border border-white/10 p-4 rounded-sm">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white uppercase font-bold text-xs tracking-wider transition-colors"
        >
          <ArrowLeft size={16} />
          <span>BACK TO ALL CLIENTS</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {client.phone && (
            <button
              onClick={handleDirectWhatsApp}
              className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-black border border-emerald-500/40 uppercase font-bold text-xs flex items-center gap-1.5 transition-colors rounded-xs"
            >
              <MessageSquare size={13} />
              <span>WHATSAPP ATHLETE</span>
            </button>
          )}

          <button
            onClick={() => setIsCheckInModalOpen(true)}
            className="px-3 py-1.5 bg-sky-600/20 hover:bg-sky-600 text-sky-400 hover:text-white border border-sky-500/40 uppercase font-bold text-xs flex items-center gap-1.5 transition-colors rounded-xs"
          >
            <Plus size={13} />
            <span>LOG CHECK-IN</span>
          </button>

          <button
            onClick={() => {
              setActiveSubtab('invoices');
            }}
            className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/20 uppercase font-bold text-xs flex items-center gap-1.5 transition-colors rounded-xs"
          >
            <FileText size={13} />
            <span>GENERATE INVOICE</span>
          </button>

          <button
            onClick={() => setIsEditModalOpen(true)}
            className="px-3 py-1.5 bg-[#FFC515] hover:bg-[#e6b010] text-black font-extrabold uppercase text-xs flex items-center gap-1.5 transition-colors rounded-xs"
          >
            <Edit3 size={13} />
            <span>EDIT DOSSIER</span>
          </button>

          <button
            onClick={() => {
              if (confirm(`Are you sure you want to delete client record for ${client.name}?`)) {
                deleteCustomer(client.id);
                onBack();
              }
            }}
            className="p-1.5 bg-zinc-950 hover:bg-red-950 text-zinc-500 hover:text-red-400 border border-white/10 hover:border-red-500/40 rounded-xs transition-colors"
            title="Delete Client Record"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Main Profile Header Dossier */}
      <div className="bg-[#0f0f14] border border-white/10 p-6 rounded-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Athlete Avatar & Core Identity */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative shrink-0">
              <img
                src={client.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={client.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-sm object-cover border-2 border-[#FFC515]/60 shadow-lg"
              />
              <span className={`absolute -bottom-1 -right-1 px-1.5 py-0.5 text-[9px] font-black uppercase rounded-xs border ${
                client.status === 'ACTIVE' ? 'bg-emerald-500 text-black border-emerald-400' :
                client.status === 'ONBOARDING' ? 'bg-[#FFC515] text-black border-[#FFC515]' :
                client.status === 'PAUSED' ? 'bg-amber-500 text-black border-amber-400' :
                'bg-zinc-700 text-white border-zinc-600'
              }`}>
                {client.status}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-display">
                  {client.name}
                </h1>
                <span className="px-2.5 py-0.5 bg-[#FFC515]/20 text-[#FFC515] border border-[#FFC515]/40 text-xs font-extrabold uppercase rounded-xs">
                  {client.programTier || '90-Day VIP Transformation'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400 font-mono-num">
                <span className="flex items-center gap-1 text-white">
                  <Mail size={12} className="text-[#FFC515]" /> {client.email}
                </span>
                {client.phone && (
                  <span className="flex items-center gap-1 text-white">
                    <Phone size={12} className="text-[#FFC515]" /> {client.phone}
                  </span>
                )}
                {client.city && (
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-zinc-500" /> {client.city}
                  </span>
                )}
                <span>Age: <strong className="text-white">{client.age || 28} ({client.gender || 'MALE'})</strong></span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-zinc-400">
                <span>Coach: <strong className="text-white">{client.assignedCoach}</strong></span>
                <span>•</span>
                <span>Enrolled: <strong className="text-white">{client.startDate || client.joinedDate}</strong></span>
                {client.endDate && (
                  <>
                    <span>•</span>
                    <span>Renewal: <strong className="text-amber-400">{client.endDate}</strong></span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Quick Status Control & Goal Badge */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-400 uppercase font-bold">STATUS:</span>
              <select
                value={client.status}
                onChange={(e) => updateCustomer(client.id, { status: e.target.value as any })}
                className="bg-[#181822] border border-white/20 px-3 py-1 text-xs font-bold uppercase text-white rounded-xs focus:border-[#FFC515] focus:outline-none"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="ONBOARDING">ONBOARDING</option>
                <option value="PAUSED">PAUSED</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>

            <div className="bg-[#181824] border border-white/10 px-3 py-1.5 rounded-xs text-right">
              <span className="text-[10px] text-zinc-400 uppercase block">PRIMARY FITNESS GOAL</span>
              <span className="text-xs font-black text-[#FFC515] uppercase">
                {client.dietGoal?.replace(/_/g, ' ') || 'BUILD MUSCLE'}
              </span>
            </div>
          </div>

        </div>

        {/* Weight Progress Bar Ribbon */}
        <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold uppercase">
            <div className="flex items-center gap-2">
              <span className="text-zinc-400">START: <strong className="text-white">{startingWt} KG</strong></span>
              <ChevronRight size={12} className="text-zinc-600" />
              <span className="text-[#FFC515]">CURRENT: <strong className="text-[#FFC515]">{currentWt} KG</strong></span>
              <ChevronRight size={12} className="text-zinc-600" />
              <span className="text-emerald-400">TARGET: <strong className="text-emerald-400">{targetWt} KG</strong></span>
            </div>

            <span className="text-xs font-black font-mono-num text-white">
              {progressPercent}% TO GOAL ({totalChangeKg > 0 ? `+${totalChangeKg.toFixed(1)}` : totalChangeKg.toFixed(1)} KG DELTA)
            </span>
          </div>

          <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-[#FFC515] to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex bg-[#0b0b0f] border-b border-white/10 px-2 sm:px-4 py-1.5 overflow-x-auto gap-2">
        <button
          onClick={() => setActiveProfileTab('BIOMETRICS')}
          className={`px-3.5 py-2 uppercase font-bold text-xs rounded-sm transition-colors flex items-center gap-1.5 shrink-0 ${
            activeProfileTab === 'BIOMETRICS' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <HeartPulse size={14} />
          <span>Biometrics & Body Comp</span>
        </button>

        <button
          onClick={() => setActiveProfileTab('NUTRITION')}
          className={`px-3.5 py-2 uppercase font-bold text-xs rounded-sm transition-colors flex items-center gap-1.5 shrink-0 ${
            activeProfileTab === 'NUTRITION' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Utensils size={14} />
          <span>Nutrition & Macros</span>
        </button>

        <button
          onClick={() => setActiveProfileTab('WORKOUT')}
          className={`px-3.5 py-2 uppercase font-bold text-xs rounded-sm transition-colors flex items-center gap-1.5 shrink-0 ${
            activeProfileTab === 'WORKOUT' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Dumbbell size={14} />
          <span>Workout Split & PRs</span>
        </button>

        <button
          onClick={() => setActiveProfileTab('CHECKINS')}
          className={`px-3.5 py-2 uppercase font-bold text-xs rounded-sm transition-colors flex items-center gap-1.5 shrink-0 ${
            activeProfileTab === 'CHECKINS' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Activity size={14} />
          <span>Check-in Logs ({client.checkIns?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveProfileTab('NOTES')}
          className={`px-3.5 py-2 uppercase font-bold text-xs rounded-sm transition-colors flex items-center gap-1.5 shrink-0 ${
            activeProfileTab === 'NOTES' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <MessageSquare size={14} />
          <span>Coach Notes ({client.coachNotes?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveProfileTab('INVOICES')}
          className={`px-3.5 py-2 uppercase font-bold text-xs rounded-sm transition-colors flex items-center gap-1.5 shrink-0 ${
            activeProfileTab === 'INVOICES' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <FileText size={14} />
          <span>Billing & Invoices ({clientInvoices.length})</span>
        </button>
      </div>

      {/* TAB 1: BIOMETRICS & BODY COMPOSITION */}
      {activeProfileTab === 'BIOMETRICS' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Key Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-[#111116] border border-white/10 p-4 rounded-sm">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">Current Weight</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono-num">{currentWt}</span>
                <span className="text-xs text-zinc-400 font-bold">KG</span>
              </div>
              <span className="text-[11px] text-zinc-500 font-mono-num mt-1 block">
                Started at {startingWt} kg
              </span>
            </div>

            <div className="bg-[#111116] border border-white/10 p-4 rounded-sm">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">Target Weight</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono-num">{targetWt}</span>
                <span className="text-xs text-zinc-400 font-bold">KG</span>
              </div>
              <span className="text-[11px] text-zinc-500 font-mono-num mt-1 block">
                {Math.abs(currentWt - targetWt).toFixed(1)} kg to goal
              </span>
            </div>

            <div className="bg-[#111116] border border-white/10 p-4 rounded-sm">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">BMI & Height</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-black text-[#FFC515] font-mono-num">{bmi}</span>
                <span className="text-xs text-zinc-400 font-bold">BMI</span>
              </div>
              <span className="text-[11px] text-zinc-500 font-mono-num mt-1 block">
                Height: {client.heightCm || 175} cm
              </span>
            </div>

            <div className="bg-[#111116] border border-white/10 p-4 rounded-sm">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">Active Streak</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono-num">{client.streakDays || 1}</span>
                <span className="text-xs text-zinc-400 font-bold">DAYS</span>
              </div>
              <span className="text-[11px] text-zinc-500 font-mono-num mt-1 block">
                Last active: {client.lastActivity || 'Today'}
              </span>
            </div>
          </div>

          {/* Medical Conditions & Biomechanical Safety */}
          <div className="bg-[#111116] border border-white/10 p-5 rounded-sm">
            <div className="flex items-center gap-2 text-amber-400 font-bold uppercase text-xs mb-2">
              <ShieldCheck size={16} />
              <span>MEDICAL HISTORY, INJURIES & BIOMECHANICAL RESTRICTIONS</span>
            </div>
            <p className="text-xs text-zinc-300 font-mono-num leading-relaxed bg-[#171720] p-3 border border-white/5 rounded-xs">
              {client.injuriesOrMedicalConditions || 'No existing musculoskeletal limitations or chronic medical conditions reported.'}
            </p>
            {client.emergencyContact && (
              <div className="mt-3 text-xs text-zinc-400">
                Emergency Contact: <strong className="text-white">{client.emergencyContact}</strong>
              </div>
            )}
          </div>

          {/* Check-ins Progression Preview */}
          <div className="bg-[#111116] border border-white/10 p-5 rounded-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-[#FFC515] font-bold uppercase text-xs">
                <Activity size={16} />
                <span>RECENT CHECK-IN WEIGH-INS & ADHERENCE LOG</span>
              </div>
              <button
                onClick={() => setIsCheckInModalOpen(true)}
                className="px-2.5 py-1 bg-[#FFC515] text-black font-extrabold uppercase text-[10px] rounded-xs flex items-center gap-1"
              >
                <Plus size={12} /> Log Weigh-in
              </button>
            </div>

            {client.checkIns && client.checkIns.length > 0 ? (
              <div className="space-y-3">
                {client.checkIns.slice(0, 5).map((chk) => (
                  <div key={chk.id} className="bg-[#16161f] border border-white/5 p-3 rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono-num text-xs">
                    <div className="flex items-center gap-4">
                      <div className="px-2 py-1 bg-white/5 rounded-xs text-[11px] text-zinc-400 font-bold">
                        {chk.date}
                      </div>
                      <div>
                        <span className="font-extrabold text-white text-sm">{chk.weightKg} kg</span>
                        {chk.waistCircumferenceCm && (
                          <span className="text-zinc-400 text-xs ml-2">Waist: {chk.waistCircumferenceCm} cm</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 text-[10px] font-black rounded-xs ${
                        chk.adherenceScore >= 8 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                        chk.adherenceScore >= 6 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                        'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      }`}>
                        ADHERENCE: {chk.adherenceScore}/10
                      </span>
                      {chk.clientNotes && (
                        <span className="text-zinc-400 text-[11px] max-w-xs truncate" title={chk.clientNotes}>
                          "{chk.clientNotes}"
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-500 italic">No check-ins logged yet. Click '+ Log Weigh-in' to start tracking.</p>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: NUTRITION & DAILY MACROS */}
      {activeProfileTab === 'NUTRITION' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Calorie & Macro Target Banner */}
          <div className="bg-[#111116] border border-white/10 p-6 rounded-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Daily Energy Budget</span>
                <span className="text-3xl sm:text-4xl font-black text-white font-mono-num">{client.dailyCalories || 2100} KCAL</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-[#FFC515]/20 text-[#FFC515] border border-[#FFC515]/40 text-xs font-black uppercase rounded-xs">
                  {client.dietType || 'VEGETARIAN'}
                </span>
                <span className="px-3 py-1 bg-white/10 text-white border border-white/10 text-xs font-bold uppercase rounded-xs">
                  {client.mealsPerDay || 4} MEALS / DAY
                </span>
                <span className="px-3 py-1 bg-sky-500/20 text-sky-400 border border-sky-500/40 text-xs font-bold uppercase rounded-xs">
                  {client.waterLitres || 3.5}L WATER / DAY
                </span>
              </div>
            </div>

            {/* Macro Ratio Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#161622] border border-sky-500/30 p-4 rounded-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-400 uppercase">Protein Target</span>
                  <span className="text-xs font-mono-num text-zinc-400">
                    {Math.round(((client.proteinGrams || 150) * 4 / (client.dailyCalories || 2100)) * 100)}%
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white font-mono-num">{client.proteinGrams || 150}</span>
                  <span className="text-xs text-sky-400 font-bold">GRAMS</span>
                </div>
                <div className="text-[10px] text-zinc-400 mt-1">
                  {(client.proteinGrams || 150) * 4} kcal • ~{((client.proteinGrams || 150) / (client.currentWeightKg || 75)).toFixed(1)}g / kg bodyweight
                </div>
              </div>

              <div className="bg-[#161622] border border-amber-500/30 p-4 rounded-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase">Carbs Target</span>
                  <span className="text-xs font-mono-num text-zinc-400">
                    {Math.round(((client.carbsGrams || 220) * 4 / (client.dailyCalories || 2100)) * 100)}%
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white font-mono-num">{client.carbsGrams || 220}</span>
                  <span className="text-xs text-amber-400 font-bold">GRAMS</span>
                </div>
                <div className="text-[10px] text-zinc-400 mt-1">
                  {(client.carbsGrams || 220) * 4} kcal • Primary training fuel
                </div>
              </div>

              <div className="bg-[#161622] border border-rose-500/30 p-4 rounded-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-400 uppercase">Fats Target</span>
                  <span className="text-xs font-mono-num text-zinc-400">
                    {Math.round(((client.fatsGrams || 55) * 9 / (client.dailyCalories || 2100)) * 100)}%
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white font-mono-num">{client.fatsGrams || 55}</span>
                  <span className="text-xs text-rose-400 font-bold">GRAMS</span>
                </div>
                <div className="text-[10px] text-zinc-400 mt-1">
                  {(client.fatsGrams || 55) * 9} kcal • Hormonal & joint support
                </div>
              </div>
            </div>
          </div>

          {/* Dietary Protocols & Cheat Meal Guidelines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#111116] border border-white/10 p-5 rounded-sm space-y-2">
              <span className="text-xs font-bold uppercase text-[#FFC515] flex items-center gap-1.5">
                <AlertCircle size={14} /> FOOD ALLERGIES & RESTRICTIONS
              </span>
              <p className="text-xs text-zinc-300 font-mono-num bg-[#161620] p-3 rounded-xs border border-white/5">
                {client.allergiesOrRestrictions || 'None reported.'}
              </p>
            </div>

            <div className="bg-[#111116] border border-white/10 p-5 rounded-sm space-y-2">
              <span className="text-xs font-bold uppercase text-[#FFC515] flex items-center gap-1.5">
                <Flame size={14} /> CHEAT MEAL & REFEED PROTOCOL
              </span>
              <p className="text-xs text-zinc-300 font-mono-num bg-[#161620] p-3 rounded-xs border border-white/5">
                {client.cheatMealProtocol || '1 structured refeed meal weekly (keep fats moderate, prioritize carbohydrates).'}
              </p>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: WORKOUT SPLIT & STRENGTH PRs */}
      {activeProfileTab === 'WORKOUT' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Training Plan Summary */}
          <div className="bg-[#111116] border border-white/10 p-6 rounded-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Assigned Training Split</span>
                <span className="text-2xl sm:text-3xl font-black text-white font-mono-num uppercase">{client.workoutSplit || 'Push / Pull / Legs'}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-[#FFC515]/20 text-[#FFC515] border border-[#FFC515]/40 text-xs font-black uppercase rounded-xs">
                  {client.trainingDaysPerWeek || 5} DAYS / WEEK
                </span>
                <span className="px-3 py-1 bg-white/10 text-white border border-white/10 text-xs font-bold uppercase rounded-xs">
                  LEVEL: {client.experienceLevel || 'INTERMEDIATE'}
                </span>
              </div>
            </div>

            <div className="bg-[#161620] p-4 rounded-xs border border-white/5 mb-6">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">Cardio & Daily Steps Requirement</span>
              <p className="text-xs text-white font-mono-num">
                {client.cardioProtocol || '8,500 - 10,000 steps daily + 15 min post-workout incline treadmill walk'}
              </p>
            </div>

            {/* Strength Benchmarks */}
            <div>
              <span className="text-xs font-bold uppercase text-[#FFC515] block mb-3">
                1RM STRENGTH BENCHMARKS & LIFTING BASELINES
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#161622] border border-white/10 p-4 rounded-sm text-center">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold block">Bench Press</span>
                  <span className="text-2xl font-black text-white font-mono-num mt-1 block">
                    {client.strengthBenchmarks?.benchPressKg || 70} <span className="text-xs text-zinc-500">KG</span>
                  </span>
                </div>

                <div className="bg-[#161622] border border-white/10 p-4 rounded-sm text-center">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold block">Barbell Squat</span>
                  <span className="text-2xl font-black text-white font-mono-num mt-1 block">
                    {client.strengthBenchmarks?.squatKg || 90} <span className="text-xs text-zinc-500">KG</span>
                  </span>
                </div>

                <div className="bg-[#161622] border border-white/10 p-4 rounded-sm text-center">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold block">Deadlift</span>
                  <span className="text-2xl font-black text-white font-mono-num mt-1 block">
                    {client.strengthBenchmarks?.deadliftKg || 120} <span className="text-xs text-zinc-500">KG</span>
                  </span>
                </div>

                <div className="bg-[#161622] border border-white/10 p-4 rounded-sm text-center">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold block">Overhead Press</span>
                  <span className="text-2xl font-black text-white font-mono-num mt-1 block">
                    {client.strengthBenchmarks?.overheadPressKg || 40} <span className="text-xs text-zinc-500">KG</span>
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 4: CHECK-IN LOGS */}
      {activeProfileTab === 'CHECKINS' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white uppercase font-display">ATHLETE PROGRESS CHECK-IN LOG</h3>
              <p className="text-xs text-zinc-400 font-mono-num">Weekly bodyweight, adherence scores, and coach feedback history.</p>
            </div>
            <button
              onClick={() => setIsCheckInModalOpen(true)}
              className="px-4 py-2 bg-[#FFC515] text-black font-extrabold uppercase text-xs rounded-sm flex items-center gap-1.5 shadow-md"
            >
              <Plus size={14} /> Log New Check-in
            </button>
          </div>

          <div className="space-y-4">
            {client.checkIns && client.checkIns.length > 0 ? (
              client.checkIns.map((chk, idx) => (
                <div key={chk.id || idx} className="bg-[#111116] border border-white/10 p-5 rounded-sm font-mono-num text-xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 bg-white/10 text-white font-bold rounded-xs text-xs">
                        {chk.date}
                      </span>
                      <span className="text-lg font-black text-[#FFC515]">
                        {chk.weightKg} KG
                      </span>
                      {chk.waistCircumferenceCm && (
                        <span className="text-zinc-400 text-xs">Waist: {chk.waistCircumferenceCm} cm</span>
                      )}
                      {chk.bodyFatPercent && (
                        <span className="text-zinc-400 text-xs">BF: {chk.bodyFatPercent}%</span>
                      )}
                    </div>

                    <span className={`px-2.5 py-0.5 text-xs font-black uppercase rounded-xs self-start sm:self-auto ${
                      chk.adherenceScore >= 8 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                      chk.adherenceScore >= 6 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                      'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    }`}>
                      ADHERENCE SCORE: {chk.adherenceScore} / 10
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="bg-[#171722] p-3 rounded-xs border border-white/5">
                      <span className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">Athlete Comments:</span>
                      <p className="text-zinc-300 italic">{chk.clientNotes || 'No athlete comments.'}</p>
                    </div>

                    <div className="bg-[#171722] p-3 rounded-xs border border-white/5">
                      <span className="text-[10px] text-[#FFC515] uppercase font-bold block mb-1">Coach Feedback:</span>
                      <p className="text-zinc-300">{chk.coachFeedback || 'No coach notes attached.'}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-[#111116] border border-white/10 rounded-sm text-zinc-500 text-xs italic">
                No check-in entries logged yet. Click '+ Log New Check-in' to add the first report.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: COACH NOTES & STRATEGIC LOG */}
      {activeProfileTab === 'NOTES' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Add Note Form */}
          <form onSubmit={handleAddCoachNote} className="bg-[#111116] border border-white/10 p-5 rounded-sm space-y-3">
            <span className="text-xs font-bold uppercase text-[#FFC515] flex items-center gap-1.5">
              <Plus size={14} /> ADD NEW COACHING NOTE / CALL SUMMARY
            </span>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="sm:w-48 shrink-0">
                <select
                  value={newNoteType}
                  onChange={(e) => setNewNoteType(e.target.value as any)}
                  className="w-full bg-[#181824] border border-white/20 p-2 text-xs font-bold text-white uppercase rounded-xs focus:border-[#FFC515] focus:outline-none"
                >
                  <option value="GENERAL">GENERAL NOTE</option>
                  <option value="MACRO_ADJUSTMENT">MACRO ADJUSTMENT</option>
                  <option value="WORKOUT_CHANGE">WORKOUT CHANGE</option>
                  <option value="CALL_SUMMARY">CALL SUMMARY</option>
                  <option value="MILESTONE">MILESTONE HIT</option>
                </select>
              </div>

              <input
                type="text"
                required
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                placeholder="Log protocol adjustment, check-in call notes, or athlete feedback..."
                className="flex-1 bg-[#181824] border border-white/20 p-2 text-xs text-white rounded-xs focus:border-[#FFC515] focus:outline-none font-mono-num"
              />

              <button
                type="submit"
                className="px-4 py-2 bg-[#FFC515] text-black font-extrabold uppercase text-xs rounded-xs flex items-center justify-center gap-1.5 shrink-0 shadow-md"
              >
                <Send size={13} /> Save Note
              </button>
            </div>
          </form>

          {/* Notes List */}
          <div className="space-y-3">
            {client.coachNotes && client.coachNotes.length > 0 ? (
              client.coachNotes.map((note) => (
                <div key={note.id} className="bg-[#111116] border border-white/10 p-4 rounded-sm font-mono-num text-xs space-y-2">
                  <div className="flex items-center justify-between text-zinc-400 text-[11px] border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{note.author}</span>
                      <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded-xs ${
                        note.type === 'MACRO_ADJUSTMENT' ? 'bg-amber-500/20 text-amber-300' :
                        note.type === 'WORKOUT_CHANGE' ? 'bg-sky-500/20 text-sky-300' :
                        note.type === 'MILESTONE' ? 'bg-emerald-500/20 text-emerald-300' :
                        'bg-zinc-800 text-zinc-300'
                      }`}>
                        {note.type.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <span>{new Date(note.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-zinc-200 text-xs leading-relaxed">{note.content}</p>
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-[#111116] border border-white/10 rounded-sm text-zinc-500 text-xs italic">
                No coach notes recorded yet.
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 6: BILLING & INVOICES */}
      {activeProfileTab === 'INVOICES' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white uppercase font-display">INVOICES & FINANCIAL RECORDS</h3>
              <p className="text-xs text-zinc-400 font-mono-num">
                Total Lifetime Value (LTV): <strong className="text-emerald-400 font-bold">₹{(client.totalSpent || 0).toLocaleString('en-IN')}</strong>
              </p>
            </div>
            <button
              onClick={() => setActiveSubtab('invoices')}
              className="px-4 py-2 bg-[#FFC515] text-black font-extrabold uppercase text-xs rounded-sm flex items-center gap-1.5 shadow-md"
            >
              <Plus size={14} /> Create New GST Invoice
            </button>
          </div>

          <div className="space-y-3">
            {clientInvoices.length > 0 ? (
              clientInvoices.map((inv) => (
                <div key={inv.id} className="bg-[#111116] border border-white/10 p-4 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono-num text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-white text-sm">{inv.invoiceNumber}</span>
                      <span className={`px-2 py-0.5 text-[10px] font-black uppercase rounded-xs ${
                        inv.status === 'PAID' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                        inv.status === 'PENDING' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                        'bg-zinc-800 text-zinc-400'
                      }`}>
                        {inv.status}
                      </span>
                    </div>
                    <span className="text-zinc-400 text-[11px] block mt-0.5">
                      Date: {inv.issueDate} • Type: {inv.type}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-black text-emerald-400 block">
                      ₹{inv.totalAmount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-zinc-500 uppercase">
                      Payment Mode: {inv.paymentMethod}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-[#111116] border border-white/10 rounded-sm text-zinc-500 text-xs italic">
                No invoices found for this athlete under email {client.email}. Click '+ Create New GST Invoice' to issue one.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <ClientIntakeModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          existingClient={client}
        />
      )}

      {/* Log Check-in Modal */}
      {isCheckInModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e0e14] border border-white/20 p-6 max-w-lg w-full font-mono-num text-xs space-y-4 rounded-sm">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                LOG ATHLETE CHECK-IN: {client.name}
              </h3>
              <button onClick={() => setIsCheckInModalOpen(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCheckInSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">CURRENT WEIGHT (KG) *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={checkInWeight}
                    onChange={(e) => setCheckInWeight(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-white/20 p-2 text-white rounded-xs"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">ADHERENCE (1-10) *</label>
                  <select
                    value={checkInAdherence}
                    onChange={(e) => setCheckInAdherence(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-white/20 p-2 text-white rounded-xs"
                  >
                    {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((score) => (
                      <option key={score} value={score}>{score}/10 ({score >= 9 ? 'Strict Protocol' : score >= 7 ? 'Good Adherence' : 'Slacked/Missed Meals'})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">WAIST (CM, OPTIONAL)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={checkInWaist || ''}
                    onChange={(e) => setCheckInWaist(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="e.g. 82.5"
                    className="w-full bg-zinc-900 border border-white/20 p-2 text-white rounded-xs"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">BODY FAT % (OPTIONAL)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={checkInBodyFat || ''}
                    onChange={(e) => setCheckInBodyFat(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="e.g. 14.5"
                    className="w-full bg-zinc-900 border border-white/20 p-2 text-white rounded-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase font-bold mb-1">ATHLETE REFLECTIONS / NOTES</label>
                <textarea
                  rows={2}
                  value={checkInNotes}
                  onChange={(e) => setCheckInNotes(e.target.value)}
                  placeholder="Energy levels, hunger cues, sleep quality, workout recovery..."
                  className="w-full bg-zinc-900 border border-white/20 p-2 text-white rounded-xs"
                />
              </div>

              <div>
                <label className="block text-[#FFC515] uppercase font-bold mb-1">COACH FEEDBACK & NEXT DIRECTIVE</label>
                <textarea
                  rows={2}
                  value={checkInFeedback}
                  onChange={(e) => setCheckInFeedback(e.target.value)}
                  placeholder="Feedback on macro compliance, progressive overload adjustments..."
                  className="w-full bg-zinc-900 border border-white/20 p-2 text-white rounded-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsCheckInModalOpen(false)}
                  className="px-4 py-2 bg-zinc-900 text-zinc-400 uppercase font-bold rounded-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FFC515] text-black font-extrabold uppercase rounded-xs"
                >
                  Save Check-in
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
