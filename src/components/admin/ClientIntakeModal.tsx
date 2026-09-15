import React, { useState, useEffect } from 'react';
import { Customer, ClientCheckIn, ClientCoachNote, Lead } from '../../types/admin';
import { FitnessGoal } from '../../types';
import { useAdmin } from '../../context/AdminContext';
import { 
  UserPlus, 
  X, 
  CheckCircle2, 
  Sparkles, 
  Dumbbell, 
  Utensils, 
  HeartPulse, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Calculator, 
  ShieldAlert,
  Flame,
  Award
} from 'lucide-react';

interface ClientIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadToConvert?: Lead | null;
  existingClient?: Customer | null;
  onSuccess?: (client: Customer) => void;
}

export const ClientIntakeModal: React.FC<ClientIntakeModalProps> = ({
  isOpen,
  onClose,
  leadToConvert,
  existingClient,
  onSuccess
}) => {
  const { 
    addCustomer, 
    updateCustomer, 
    convertLeadToCustomer, 
    currentRole 
  } = useAdmin();

  const [activeFormTab, setActiveFormTab] = useState<'PERSONAL' | 'BIOMETRICS' | 'PROGRAM' | 'NUTRITION' | 'WORKOUT'>('PERSONAL');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [age, setAge] = useState<number>(28);
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | 'OTHER'>('MALE');
  const [city, setCity] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');

  // Biometrics
  const [heightCm, setHeightCm] = useState<number>(175);
  const [startingWeightKg, setStartingWeightKg] = useState<number>(78);
  const [currentWeightKg, setCurrentWeightKg] = useState<number>(78);
  const [targetWeightKg, setTargetWeightKg] = useState<number>(72);
  const [targetDate, setTargetDate] = useState('');
  const [injuries, setInjuries] = useState('');

  // Program & Coaching
  const [programTier, setProgramTier] = useState('90-Day VIP 1-on-1 Transformation');
  const [assignedCoach, setAssignedCoach] = useState('Coach Neetu (Head Coach)');
  const [status, setStatus] = useState<'ACTIVE' | 'ONBOARDING' | 'PAUSED' | 'COMPLETED'>('ACTIVE');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0]);
  const [totalSpent, setTotalSpent] = useState<number>(15000);

  // Nutrition Protocol
  const [dietGoal, setDietGoal] = useState<FitnessGoal>('BUILD_MUSCLE');
  const [dietType, setDietType] = useState<'VEGAN' | 'VEGETARIAN' | 'EGGETARIAN' | 'NON_VEGETARIAN' | 'JAIN' | 'KETO'>('VEGETARIAN');
  const [dailyCalories, setDailyCalories] = useState<number>(2200);
  const [proteinGrams, setProteinGrams] = useState<number>(155);
  const [carbsGrams, setCarbsGrams] = useState<number>(240);
  const [fatsGrams, setFatsGrams] = useState<number>(55);
  const [waterLitres, setWaterLitres] = useState<number>(3.5);
  const [mealsPerDay, setMealsPerDay] = useState<number>(4);
  const [allergies, setAllergies] = useState('None');
  const [cheatMealRule, setCheatMealRule] = useState('1 clean cheat meal weekly on Sunday');

  // Workout Protocol
  const [workoutSplit, setWorkoutSplit] = useState('Push / Pull / Legs (6-Day)');
  const [trainingDaysPerWeek, setTrainingDaysPerWeek] = useState<number>(5);
  const [experienceLevel, setExperienceLevel] = useState<'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'>('INTERMEDIATE');
  const [cardioProtocol, setCardioProtocol] = useState('8,500 daily steps + 15 min incline walk');
  const [benchPressKg, setBenchPressKg] = useState<number>(70);
  const [squatKg, setSquatKg] = useState<number>(90);
  const [deadliftKg, setDeadliftKg] = useState<number>(120);
  const [overheadPressKg, setOverheadPressKg] = useState<number>(40);

  // Initial Coach Note
  const [initialCoachNote, setInitialCoachNote] = useState('');

  // Populate when modal opens
  useEffect(() => {
    if (existingClient) {
      setName(existingClient.name || '');
      setEmail(existingClient.email || '');
      setPhone(existingClient.phone || '');
      setAvatarUrl(existingClient.avatarUrl || '');
      setAge(existingClient.age || 28);
      setGender(existingClient.gender || 'MALE');
      setCity(existingClient.city || '');
      setEmergencyContact(existingClient.emergencyContact || '');
      setHeightCm(existingClient.heightCm || 175);
      setStartingWeightKg(existingClient.startingWeightKg || existingClient.currentWeightKg || 78);
      setCurrentWeightKg(existingClient.currentWeightKg || 78);
      setTargetWeightKg(existingClient.targetWeightKg || 72);
      setTargetDate(existingClient.targetDate || '');
      setInjuries(existingClient.injuriesOrMedicalConditions || '');
      setProgramTier(existingClient.programTier || '90-Day VIP 1-on-1 Transformation');
      setAssignedCoach(existingClient.assignedCoach || 'Coach Neetu (Head Coach)');
      setStatus(existingClient.status || 'ACTIVE');
      setStartDate(existingClient.startDate || new Date().toISOString().split('T')[0]);
      setEndDate(existingClient.endDate || new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0]);
      setTotalSpent(existingClient.totalSpent || 0);
      setDietGoal(existingClient.dietGoal || 'BUILD_MUSCLE');
      setDietType(existingClient.dietType || 'VEGETARIAN');
      setDailyCalories(existingClient.dailyCalories || 2200);
      setProteinGrams(existingClient.proteinGrams || 150);
      setCarbsGrams(existingClient.carbsGrams || 230);
      setFatsGrams(existingClient.fatsGrams || 55);
      setWaterLitres(existingClient.waterLitres || 3.5);
      setMealsPerDay(existingClient.mealsPerDay || 4);
      setAllergies(existingClient.allergiesOrRestrictions || 'None');
      setCheatMealRule(existingClient.cheatMealProtocol || '1 clean cheat meal weekly');
      setWorkoutSplit(existingClient.workoutSplit || 'Push / Pull / Legs');
      setTrainingDaysPerWeek(existingClient.trainingDaysPerWeek || 5);
      setExperienceLevel(existingClient.experienceLevel || 'INTERMEDIATE');
      setCardioProtocol(existingClient.cardioProtocol || '8,500 daily steps');
      if (existingClient.strengthBenchmarks) {
        setBenchPressKg(existingClient.strengthBenchmarks.benchPressKg || 70);
        setSquatKg(existingClient.strengthBenchmarks.squatKg || 90);
        setDeadliftKg(existingClient.strengthBenchmarks.deadliftKg || 120);
        setOverheadPressKg(existingClient.strengthBenchmarks.overheadPressKg || 40);
      }
    } else if (leadToConvert) {
      setName(leadToConvert.name || '');
      setEmail(leadToConvert.email || '');
      setPhone(leadToConvert.phone || '');
      setAge(leadToConvert.age || 28);
      setGender(leadToConvert.sex === 'female' ? 'FEMALE' : 'MALE');
      setHeightCm(leadToConvert.heightCm || 175);
      const wt = leadToConvert.weightKg || 78;
      setStartingWeightKg(wt);
      setCurrentWeightKg(wt);
      const isLose = leadToConvert.goal === 'LOSE_WEIGHT';
      setTargetWeightKg(isLose ? Math.max(wt - 7, 50) : wt + 4);
      setDietGoal(leadToConvert.goal || 'BUILD_MUSCLE');
      setDietType((leadToConvert.dietType as any) || 'VEGETARIAN');
      setTotalSpent(leadToConvert.estimatedValue || 12000);
      setProgramTier(leadToConvert.challengeInterest || '90-Day VIP 1-on-1 Transformation');
      setAssignedCoach(leadToConvert.assignedTo && leadToConvert.assignedTo !== 'Unassigned' ? leadToConvert.assignedTo : 'Coach Neetu (Head Coach)');
      
      const cals = leadToConvert.calculatedCalories || (isLose ? 1800 : 2500);
      setDailyCalories(cals);
      setProteinGrams(Math.round(wt * 2.0));
      setCarbsGrams(Math.round((cals * 0.45) / 4));
      setFatsGrams(Math.round((cals * 0.25) / 9));
      
      if (leadToConvert.workoutPreferences?.daysPerWeek) {
        setTrainingDaysPerWeek(leadToConvert.workoutPreferences.daysPerWeek);
        setWorkoutSplit(leadToConvert.workoutPreferences.daysPerWeek >= 5 ? 'Push / Pull / Legs (6-Day)' : '4-Day Upper / Lower Split');
      }
      if (leadToConvert.workoutPreferences?.experience) {
        setExperienceLevel(leadToConvert.workoutPreferences.experience as any);
      }
      setInitialCoachNote(`Converted from CRM Lead (${leadToConvert.source}). Captured on ${new Date(leadToConvert.createdAt).toLocaleDateString()}.`);
    } else {
      // Clean New Client default
      setName('');
      setEmail('');
      setPhone('');
      setAvatarUrl('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80');
      setAge(28);
      setGender('MALE');
      setCity('Mumbai, India');
      setHeightCm(175);
      setStartingWeightKg(75);
      setCurrentWeightKg(75);
      setTargetWeightKg(70);
      setDailyCalories(2100);
      setProteinGrams(150);
      setCarbsGrams(220);
      setFatsGrams(50);
      setTotalSpent(15000);
      setInitialCoachNote('');
    }
  }, [existingClient, leadToConvert, isOpen]);

  if (!isOpen) return null;

  // Auto calculate recommended macros
  const handleAutoCalculateMacros = () => {
    // Mifflin-St Jeor formula
    const s = gender === 'MALE' ? 5 : -161;
    const bmr = 10 * currentWeightKg + 6.25 * heightCm - 5 * age + s;
    const tdee = bmr * 1.45; // intermediate active factor
    
    let targetCals = Math.round(tdee);
    if (dietGoal === 'LOSE_WEIGHT') {
      targetCals = Math.round(tdee - 450);
    } else if (dietGoal === 'BUILD_MUSCLE') {
      targetCals = Math.round(tdee + 250);
    } else if (dietGoal === 'STRENGTH') {
      targetCals = Math.round(tdee + 150);
    }

    const targetProtein = Math.round(currentWeightKg * 2.1);
    const fatCals = targetCals * 0.24;
    const targetFats = Math.round(fatCals / 9);
    const remainingCalsForCarbs = targetCals - (targetProtein * 4 + targetFats * 9);
    const targetCarbs = Math.round(remainingCalsForCarbs / 4);

    setDailyCalories(targetCals);
    setProteinGrams(targetProtein);
    setFatsGrams(targetFats);
    setCarbsGrams(Math.max(targetCarbs, 50));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert('Please enter at least the Athlete Name and Email Address.');
      return;
    }

    const clientPayload: Partial<Customer> = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      avatarUrl: avatarUrl || (gender === 'FEMALE' ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'),
      age: Number(age) || 28,
      gender,
      city: city.trim(),
      emergencyContact: emergencyContact.trim(),
      heightCm: Number(heightCm) || 175,
      startingWeightKg: Number(startingWeightKg) || 75,
      currentWeightKg: Number(currentWeightKg) || Number(startingWeightKg) || 75,
      targetWeightKg: Number(targetWeightKg) || 70,
      targetDate,
      injuriesOrMedicalConditions: injuries.trim() || 'None reported.',
      programTier,
      assignedCoach,
      status,
      startDate,
      endDate,
      totalSpent: Number(totalSpent) || 0,
      dietGoal,
      dietType,
      dailyCalories: Number(dailyCalories) || 2100,
      proteinGrams: Number(proteinGrams) || 150,
      carbsGrams: Number(carbsGrams) || 220,
      fatsGrams: Number(fatsGrams) || 55,
      waterLitres: Number(waterLitres) || 3.5,
      mealsPerDay: Number(mealsPerDay) || 4,
      allergiesOrRestrictions: allergies.trim() || 'None',
      cheatMealProtocol: cheatMealRule.trim(),
      workoutSplit,
      trainingDaysPerWeek: Number(trainingDaysPerWeek) || 5,
      experienceLevel,
      cardioProtocol: cardioProtocol.trim(),
      strengthBenchmarks: {
        benchPressKg: Number(benchPressKg) || 0,
        squatKg: Number(squatKg) || 0,
        deadliftKg: Number(deadliftKg) || 0,
        overheadPressKg: Number(overheadPressKg) || 0
      }
    };

    let resultClient: Customer;

    if (existingClient) {
      updateCustomer(existingClient.id, clientPayload);
      resultClient = { ...existingClient, ...clientPayload };
    } else if (leadToConvert) {
      resultClient = convertLeadToCustomer(leadToConvert.id, clientPayload);
    } else {
      resultClient = addCustomer(clientPayload);
    }

    if (onSuccess) {
      onSuccess(resultClient);
    }
    onClose();
  };

  const calculatedTotalMacroCals = (proteinGrams * 4) + (carbsGrams * 4) + (fatsGrams * 9);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#0c0c10] border border-white/20 w-full max-w-4xl max-h-[92vh] flex flex-col font-mono-num text-xs shadow-2xl rounded-sm overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-[#121218] border-b border-white/10 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FFC515]/20 border border-[#FFC515]/40 text-[#FFC515] rounded-sm">
              <UserPlus size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-wider text-white font-display">
                  {existingClient ? `EDIT CLIENT PROFILE: ${existingClient.name}` : leadToConvert ? `CONVERT LEAD TO ACTIVE CLIENT: ${leadToConvert.name}` : 'DIRECT CLIENT ONBOARDING INTAKE'}
                </h2>
                {leadToConvert && (
                  <span className="px-2 py-0.5 bg-[#FFC515] text-black font-extrabold text-[10px] rounded-xs uppercase">
                    FROM CRM LEAD
                  </span>
                )}
              </div>
              <p className="text-zinc-400 text-[11px] font-mono-num mt-0.5">
                Set required identity, physical biometrics, macro prescription, workout split, and coach assignment.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Multi-step Form Navigation Tabs */}
        <div className="flex bg-[#08080a] border-b border-white/10 px-4 py-1.5 overflow-x-auto gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setActiveFormTab('PERSONAL')}
            className={`px-3 py-2 uppercase font-bold text-xs rounded-sm transition-colors flex items-center gap-1.5 shrink-0 ${
              activeFormTab === 'PERSONAL' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Mail size={13} />
            <span>1. Identity & Contact</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFormTab('BIOMETRICS')}
            className={`px-3 py-2 uppercase font-bold text-xs rounded-sm transition-colors flex items-center gap-1.5 shrink-0 ${
              activeFormTab === 'BIOMETRICS' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <HeartPulse size={13} />
            <span>2. Biometrics & Goals</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFormTab('PROGRAM')}
            className={`px-3 py-2 uppercase font-bold text-xs rounded-sm transition-colors flex items-center gap-1.5 shrink-0 ${
              activeFormTab === 'PROGRAM' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Award size={13} />
            <span>3. Coaching & Plan</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFormTab('NUTRITION')}
            className={`px-3 py-2 uppercase font-bold text-xs rounded-sm transition-colors flex items-center gap-1.5 shrink-0 ${
              activeFormTab === 'NUTRITION' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Utensils size={13} />
            <span>4. Nutrition & Macros</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFormTab('WORKOUT')}
            className={`px-3 py-2 uppercase font-bold text-xs rounded-sm transition-colors flex items-center gap-1.5 shrink-0 ${
              activeFormTab === 'WORKOUT' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Dumbbell size={13} />
            <span>5. Training Split</span>
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* TAB 1: PERSONAL & CONTACT */}
          {activeFormTab === 'PERSONAL' && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2 text-[#FFC515] font-bold uppercase text-xs">
                <span>ATHLETE IDENTIFICATION & CONTACT CHANNELS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    ATHLETE FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vikramaditya Malhotra"
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. athlete@example.com"
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    WHATSAPP / PHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98112 34567"
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    CITY & REGION
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. South Delhi, Delhi, India"
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    AGE (YEARS)
                  </label>
                  <input
                    type="number"
                    min={14}
                    max={90}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    BIOLOGICAL GENDER
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none uppercase"
                  >
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                    <option value="OTHER">OTHER</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    EMERGENCY CONTACT & RELATION
                  </label>
                  <input
                    type="text"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    placeholder="e.g. +91 98112 99001 (Spouse / Sibling)"
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BIOMETRICS & GOALS */}
          {activeFormTab === 'BIOMETRICS' && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2 text-[#FFC515] font-bold uppercase text-xs">
                <span>ANTHROPOMETRIC METRICS & TARGET PROJECTIONS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    HEIGHT (CM) *
                  </label>
                  <input
                    type="number"
                    required
                    min={100}
                    max={250}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    STARTING WEIGHT (KG) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={startingWeightKg}
                    onChange={(e) => setStartingWeightKg(Number(e.target.value))}
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    CURRENT WEIGHT (KG) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={currentWeightKg}
                    onChange={(e) => setCurrentWeightKg(Number(e.target.value))}
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    TARGET WEIGHT (KG) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={targetWeightKg}
                    onChange={(e) => setTargetWeightKg(Number(e.target.value))}
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    TARGET COMPLETION DATE
                  </label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    PRIMARY GOAL
                  </label>
                  <select
                    value={dietGoal}
                    onChange={(e) => setDietGoal(e.target.value as any)}
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none uppercase"
                  >
                    <option value="LOSE_WEIGHT">FAT LOSS / CUTTING</option>
                    <option value="BUILD_MUSCLE">LEAN MUSCLE HYPERTROPHY</option>
                    <option value="STRENGTH">MAX STRENGTH & POWERLIFTING</option>
                    <option value="EVERYDAY_HEALTH">BODY RECOMPOSITION & HEALTH</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    INJURIES, LIMITATIONS & MEDICAL CONDITIONS
                  </label>
                  <textarea
                    rows={2}
                    value={injuries}
                    onChange={(e) => setInjuries(e.target.value)}
                    placeholder="e.g. Mild lumbar tightness, previous left ACL surgery in 2023. Avoid heavy overhead pressing..."
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROGRAM & COACHING */}
          {activeFormTab === 'PROGRAM' && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2 text-[#FFC515] font-bold uppercase text-xs">
                <span>ENROLLMENT PACKAGE & COACHING ASSIGNMENT</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    PROGRAM / PACKAGE TIER *
                  </label>
                  <select
                    value={programTier}
                    onChange={(e) => setProgramTier(e.target.value)}
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none uppercase"
                  >
                    <option value="90-Day VIP 1-on-1 Transformation">90-Day VIP 1-on-1 Transformation</option>
                    <option value="60-Day Recomp Challenge">60-Day Recomp Challenge</option>
                    <option value="21-Day Ignite Shred">21-Day Ignite Shred</option>
                    <option value="Monthly Nutrition & Training Coaching">Monthly Nutrition & Training Coaching</option>
                    <option value="Custom Elite Athlete Protocol">Custom Elite Athlete Protocol</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    ASSIGNED HEAD COACH *
                  </label>
                  <select
                    value={assignedCoach}
                    onChange={(e) => setAssignedCoach(e.target.value)}
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none"
                  >
                    <option value="Coach Neetu (Head Coach)">Coach Neetu (Head Coach)</option>
                    <option value="Coach Vikram (Strength Specialist)">Coach Vikram (Strength Specialist)</option>
                    <option value="Coach Rahul (Metabolic Coach)">Coach Rahul (Metabolic Coach)</option>
                    <option value="Coach Priya (Physique & Nutrition)">Coach Priya (Physique & Nutrition)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    MEMBERSHIP STATUS
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none uppercase"
                  >
                    <option value="ACTIVE">ACTIVE (TRAINING)</option>
                    <option value="ONBOARDING">ONBOARDING (ASSESSMENT PHASE)</option>
                    <option value="PAUSED">PAUSED (HOLD)</option>
                    <option value="COMPLETED">COMPLETED (ALUMNI)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    TOTAL FEE / LTV AMOUNT (₹)
                  </label>
                  <input
                    type="number"
                    value={totalSpent}
                    onChange={(e) => setTotalSpent(Number(e.target.value))}
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    START DATE
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    END / RENEWAL DATE
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: NUTRITION & MACROS */}
          {activeFormTab === 'NUTRITION' && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
                <span className="text-[#FFC515] font-bold uppercase text-xs flex items-center gap-1.5">
                  <Flame size={14} /> DAILY NUTRITION TARGETS & MACRONUTRIENTS
                </span>
                <button
                  type="button"
                  onClick={handleAutoCalculateMacros}
                  className="px-2.5 py-1 bg-white/10 hover:bg-[#FFC515] text-zinc-300 hover:text-black font-bold uppercase text-[10px] rounded-xs flex items-center gap-1 transition-colors self-start sm:self-auto"
                >
                  <Calculator size={12} /> Auto-Calculate Macros from Biometrics
                </button>
              </div>

              {/* Macro Summary Strip */}
              <div className="bg-[#15151e] border border-white/10 p-3 rounded-sm flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block">Total Calorie Target</span>
                  <span className="text-xl font-black text-white font-mono-num">{dailyCalories} kcal</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold">
                  <span className="text-sky-400">P: {proteinGrams}g ({Math.round((proteinGrams * 4 / (dailyCalories || 1)) * 100)}%)</span>
                  <span className="text-amber-400">C: {carbsGrams}g ({Math.round((carbsGrams * 4 / (dailyCalories || 1)) * 100)}%)</span>
                  <span className="text-rose-400">F: {fatsGrams}g ({Math.round((fatsGrams * 9 / (dailyCalories || 1)) * 100)}%)</span>
                </div>
                <div className="text-[10px] text-zinc-500">
                  Macro Sum: <strong className="text-white">{calculatedTotalMacroCals} kcal</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    CALORIES (KCAL) *
                  </label>
                  <input
                    type="number"
                    required
                    value={dailyCalories}
                    onChange={(e) => setDailyCalories(Number(e.target.value))}
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sky-400 uppercase font-bold mb-1">
                    PROTEIN (G) *
                  </label>
                  <input
                    type="number"
                    required
                    value={proteinGrams}
                    onChange={(e) => setProteinGrams(Number(e.target.value))}
                    className="w-full bg-[#15151c] border border-sky-500/30 px-3 py-2 text-white font-mono-num rounded-sm focus:border-sky-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-amber-400 uppercase font-bold mb-1">
                    CARBS (G) *
                  </label>
                  <input
                    type="number"
                    required
                    value={carbsGrams}
                    onChange={(e) => setCarbsGrams(Number(e.target.value))}
                    className="w-full bg-[#15151c] border border-amber-500/30 px-3 py-2 text-white font-mono-num rounded-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-rose-400 uppercase font-bold mb-1">
                    FATS (G) *
                  </label>
                  <input
                    type="number"
                    required
                    value={fatsGrams}
                    onChange={(e) => setFatsGrams(Number(e.target.value))}
                    className="w-full bg-[#15151c] border border-rose-500/30 px-3 py-2 text-white font-mono-num rounded-sm focus:border-rose-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    DIETARY PREFERENCE
                  </label>
                  <select
                    value={dietType}
                    onChange={(e) => setDietType(e.target.value as any)}
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none uppercase"
                  >
                    <option value="VEGETARIAN">VEGETARIAN (DAIRY / PANEER)</option>
                    <option value="EGGETARIAN">EGGETARIAN (EGGS + DAIRY)</option>
                    <option value="NON_VEGETARIAN">NON-VEGETARIAN (CHICKEN / FISH)</option>
                    <option value="VEGAN">VEGAN (100% PLANT-BASED)</option>
                    <option value="JAIN">JAIN VEGETARIAN (NO ROOT VEGGIES)</option>
                    <option value="KETO">KETOGENIC PROTOCOL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    MEALS PER DAY
                  </label>
                  <select
                    value={mealsPerDay}
                    onChange={(e) => setMealsPerDay(Number(e.target.value))}
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none"
                  >
                    <option value={3}>3 Main Meals</option>
                    <option value={4}>4 Meals (3 Meals + 1 Snack)</option>
                    <option value={5}>5 Meals (Frequent Feeds)</option>
                    <option value={2}>2 Meals (Intermittent Fasting)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    WATER INTAKE (LITRES/DAY)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={waterLitres}
                    onChange={(e) => setWaterLitres(Number(e.target.value))}
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    ALLERGIES & FOOD RESTRICTIONS
                  </label>
                  <input
                    type="text"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    placeholder="e.g. Lactose sensitive, Tree nut allergy, Gluten intolerance..."
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    CHEAT MEAL & REFEED PROTOCOL
                  </label>
                  <input
                    type="text"
                    value={cheatMealRule}
                    onChange={(e) => setCheatMealRule(e.target.value)}
                    placeholder="e.g. 1 clean refeed meal on Sunday (max 700 kcal extra, prioritize carbs)..."
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: WORKOUT & SPLIT */}
          {activeFormTab === 'WORKOUT' && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2 text-[#FFC515] font-bold uppercase text-xs">
                <span>TRAINING PROGRAM SPLIT & STRENGTH BASELINES</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    ASSIGNED WORKOUT SPLIT *
                  </label>
                  <select
                    value={workoutSplit}
                    onChange={(e) => setWorkoutSplit(e.target.value)}
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none"
                  >
                    <option value="Push / Pull / Legs (6-Day)">Push / Pull / Legs (6-Day Split)</option>
                    <option value="4-Day Upper / Lower Split">4-Day Upper / Lower Split</option>
                    <option value="3-Day Full Body Hypertrophy">3-Day Full Body Hypertrophy</option>
                    <option value="5-Day Bro Split (Single Muscle)">5-Day Bro Split (Single Muscle)</option>
                    <option value="Arnold Split (Chest/Back, Shoulders/Arms, Legs)">Arnold Split (Chest/Back, Shoulders/Arms, Legs)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    TRAINING DAYS / WEEK
                  </label>
                  <select
                    value={trainingDaysPerWeek}
                    onChange={(e) => setTrainingDaysPerWeek(Number(e.target.value))}
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none"
                  >
                    <option value={3}>3 Days / Week</option>
                    <option value={4}>4 Days / Week</option>
                    <option value={5}>5 Days / Week</option>
                    <option value={6}>6 Days / Week</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    EXPERIENCE LEVEL
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value as any)}
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none uppercase"
                  >
                    <option value="BEGINNER">BEGINNER (&lt; 1 YEAR)</option>
                    <option value="INTERMEDIATE">INTERMEDIATE (1 - 3 YEARS)</option>
                    <option value="ADVANCED">ADVANCED (3+ YEARS)</option>
                  </select>
                </div>

                <div className="md:col-span-3">
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    CARDIO & DAILY STEP PROTOCOL
                  </label>
                  <input
                    type="text"
                    value={cardioProtocol}
                    onChange={(e) => setCardioProtocol(e.target.value)}
                    placeholder="e.g. 10,000 steps daily + 20 min LISS treadmill post-workout..."
                    className="w-full bg-[#15151c] border border-white/15 px-3 py-2 text-white font-mono-num rounded-sm focus:border-[#FFC515] focus:outline-none"
                  />
                </div>
              </div>

              {/* Strength PRs / Benchmarks */}
              <div className="pt-2 border-t border-white/10">
                <span className="text-zinc-400 uppercase font-bold text-[11px] block mb-2">
                  STRENGTH BENCHMARKS / 1RM ESTIMATES (KG)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-zinc-500 uppercase text-[10px] mb-1">BENCH PRESS</label>
                    <input
                      type="number"
                      value={benchPressKg}
                      onChange={(e) => setBenchPressKg(Number(e.target.value))}
                      className="w-full bg-[#15151c] border border-white/15 p-2 text-white rounded-sm font-mono-num"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-500 uppercase text-[10px] mb-1">BARBELL SQUAT</label>
                    <input
                      type="number"
                      value={squatKg}
                      onChange={(e) => setSquatKg(Number(e.target.value))}
                      className="w-full bg-[#15151c] border border-white/15 p-2 text-white rounded-sm font-mono-num"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-500 uppercase text-[10px] mb-1">DEADLIFT</label>
                    <input
                      type="number"
                      value={deadliftKg}
                      onChange={(e) => setDeadliftKg(Number(e.target.value))}
                      className="w-full bg-[#15151c] border border-white/15 p-2 text-white rounded-sm font-mono-num"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-500 uppercase text-[10px] mb-1">OVERHEAD PRESS</label>
                    <input
                      type="number"
                      value={overheadPressKg}
                      onChange={(e) => setOverheadPressKg(Number(e.target.value))}
                      className="w-full bg-[#15151c] border border-white/15 p-2 text-white rounded-sm font-mono-num"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer Actions */}
          <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="text-zinc-500 text-[11px]">
              {existingClient ? 'Editing existing athlete dossier.' : leadToConvert ? `Converting CRM Lead #${leadToConvert.id}.` : 'Directly creating new athlete record.'}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white uppercase font-bold rounded-sm border border-white/10"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 sm:flex-none px-6 py-2.5 bg-[#FFC515] hover:bg-[#e6b010] text-black font-extrabold uppercase rounded-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
              >
                <CheckCircle2 size={16} />
                <span>{existingClient ? 'Save Profile Changes' : leadToConvert ? 'Complete Conversion & Open Profile' : 'Complete Intake & Create Client'}</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
