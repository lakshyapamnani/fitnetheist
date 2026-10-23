import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useAdmin } from '../../context/AdminContext';
import { Exercise, MuscleGroup, ExperienceLevel, EquipmentType, WorkoutPlan, WorkoutDay } from '../../types';
import { ExerciseVideoPlayer } from '../ExerciseVideoPlayer';
import { DriveVideoBankSection } from './DriveVideoBankSection';
import { VideoBankSelector } from './VideoBankSelector';
import { DriveVideoItem, DEFAULT_DRIVE_VIDEOS } from '../../data/driveVideoBankData';
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
  Check,
  UserCheck,
  Clock,
  Send,
  Sparkles,
  Layers,
  ChevronRight,
  AlertCircle,
  FolderPlus,
  Calendar,
  X,
  FileCheck
} from 'lucide-react';

export const ExerciseBankAdminView: React.FC = () => {
  const { 
    exercises, 
    addExercise, 
    updateExercise, 
    deleteExercise, 
    user, 
    workoutPlan, 
    setWorkoutPlan, 
    assignPersonalizedWorkoutToClient,
    setActiveTab: setAppActiveTab 
  } = useApp();
  const { customers, leads, updateCustomer, logAuditAction, selectedCustomerId } = useAdmin();

  // Active view inside Exercise Bank
  const [activeTab, setActiveTab] = useState<'LIBRARY' | 'VIDEO_BANK' | 'ASSIGN' | 'STATUS'>('LIBRARY');
  const [openDayPicker, setOpenDayPicker] = useState<{ dayIdx: number; category: string } | null>(null);
  const [daySearchQuery, setDaySearchQuery] = useState<Record<number, string>>({});

  // Categories Filter & Management
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [customCategories, setCustomCategories] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fitnetheist_custom_exercise_categories');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return ['CHEST', 'BACK', 'LEGS', 'SHOULDERS', 'ARMS', 'CORE', 'CARDIO', 'MOBILITY'];
  });
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  // Exercise Modal State (Add/Edit)
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [previewVideoExercise, setPreviewVideoExercise] = useState<Exercise | null>(null);

  // Exercise Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<MuscleGroup>('CHEST');
  const [targetMuscles, setTargetMuscles] = useState('');
  const [difficulty, setDifficulty] = useState<ExperienceLevel>('INTERMEDIATE');
  const [equipment, setEquipment] = useState<EquipmentType>('FULL_GYM');
  const [sets, setSets] = useState('4');
  const [reps, setReps] = useState('8-10');
  const [restSeconds, setRestSeconds] = useState(90);
  const [keyFormTip, setKeyFormTip] = useState('');
  const [videoUrl, setVideoUrl] = useState('https://drive.google.com/file/d/1qrB6aZDVWIbzrJ4ZRpGQSttBO0J8HvrL/view?usp=sharing');
  const [instructionsText, setInstructionsText] = useState('01 Set up with solid brace and stability.\n02 Execute movement through full active range.\n03 Control concentric and pause at peak contraction.');

  // ==========================================
  // CLIENT PERSONALIZED ASSIGNMENT STATE
  // ==========================================
  // List of all clients with clean names and emails (customers + CRM leads + active client)
  const allClients = React.useMemo(() => {
    const map = new Map<string, any>();

    // 1. Logged-in user
    if (user && user.email) {
      const emailLower = user.email.toLowerCase();
      const derivedName = user.name || (emailLower.includes('lakshya') ? 'Lakshya Pamnani' : user.email.split('@')[0]);
      map.set(emailLower, {
        id: user.id || 'current_user',
        name: derivedName,
        email: user.email,
        phone: user.phone || '+91 98765 43210',
        joinedDate: '2026-01-15',
        totalSpent: 149,
        dietGoal: user.goal || 'BUILD_MUSCLE',
        workoutSplit: user.assignedWorkoutPlan?.name || 'Awaiting Coach Assignment',
        streakDays: user.streakDays || 1,
        lastActivity: 'Today (Active Client)',
        orderIds: [],
        experienceLevel: user.trainingExperience || 'INTERMEDIATE',
        isWorkoutPersonalized: Boolean(user.isWorkoutPlanPersonalized || user.assignedWorkoutPlan?.isPersonalized),
        assignedWorkoutPlan: user.assignedWorkoutPlan
      });
    }

    // 2. Enrolled Customers from Admin CRM
    if (Array.isArray(customers)) {
      customers.forEach((c) => {
        if (!c) return;
        const key = (c.email || c.id || '').toLowerCase();
        if (key && !map.has(key)) {
          map.set(key, {
            ...c,
            name: c.name || (c.email ? c.email.split('@')[0] : 'Client'),
            email: c.email || 'client@fitnetheist.com',
            isWorkoutPersonalized: Boolean((c as any).isWorkoutPersonalized || (c as any).assignedWorkoutPlan?.isPersonalized),
            assignedWorkoutPlan: (c as any).assignedWorkoutPlan
          });
        }
      });
    }

    // 3. Captured Leads from CRM
    if (Array.isArray(leads)) {
      leads.forEach((l) => {
        if (!l) return;
        const key = (l.email || l.id || '').toLowerCase();
        if (key && !map.has(key)) {
          map.set(key, {
            id: l.id,
            name: l.name || (l.email ? l.email.split('@')[0] : 'Lead Client'),
            email: l.email || 'lead@fitnetheist.com',
            phone: l.phone || '+91 98000 00000',
            joinedDate: l.createdAt ? l.createdAt.split('T')[0] : '2026-01-20',
            totalSpent: l.estimatedValue || 149,
            dietGoal: l.goal || 'BUILD_MUSCLE',
            workoutSplit: 'Awaiting Coach Assignment',
            streakDays: 1,
            lastActivity: 'Lead CRM',
            orderIds: [],
            experienceLevel: l.workoutPreferences?.experience || 'INTERMEDIATE',
            isWorkoutPersonalized: false,
            assignedWorkoutPlan: null
          });
        }
      });
    }

    // 4. Default gym clients roster ensuring dropdown always has full roster of names & emails
    const defaultClients = [
      {
        id: 'cust_lakshya',
        name: 'Lakshya Pamnani',
        email: 'lakshyapamnani5@gmail.com',
        phone: '+91 98765 43210',
        dietGoal: 'BUILD_MUSCLE',
        experienceLevel: 'INTERMEDIATE',
        isWorkoutPersonalized: false,
        workoutSplit: 'Coach Neetu Bespoke 4-Day Protocol'
      },
      {
        id: 'cust_alex',
        name: 'Alex Mercer',
        email: 'client@fitnetheist.com',
        phone: '+91 98000 11223',
        dietGoal: 'FAT_LOSS',
        experienceLevel: 'INTERMEDIATE',
        isWorkoutPersonalized: false,
        workoutSplit: '4-Day Upper/Lower Strength Split'
      },
      {
        id: 'cust_priya',
        name: 'Priya Sharma',
        email: 'priya.sharma@fitnetheist.com',
        phone: '+91 98111 22334',
        dietGoal: 'FAT_LOSS',
        experienceLevel: 'BEGINNER',
        isWorkoutPersonalized: false,
        workoutSplit: 'Glutes & Core Recomposition Protocol'
      },
      {
        id: 'cust_rohan',
        name: 'Rohan Verma',
        email: 'rohan.verma@fitnetheist.com',
        phone: '+91 98222 33445',
        dietGoal: 'BUILD_MUSCLE',
        experienceLevel: 'ADVANCED',
        isWorkoutPersonalized: false,
        workoutSplit: 'Push-Pull-Legs Power Periodization'
      },
      {
        id: 'cust_ananya',
        name: 'Ananya Iyer',
        email: 'ananya.iyer@fitnetheist.com',
        phone: '+91 98333 44556',
        dietGoal: 'MAINTENANCE',
        experienceLevel: 'INTERMEDIATE',
        isWorkoutPersonalized: false,
        workoutSplit: 'Functional Hypertrophy & Mobility'
      }
    ];

    defaultClients.forEach((client) => {
      const key = client.email.toLowerCase();
      if (!map.has(key)) {
        map.set(key, client);
      }
    });

    return Array.from(map.values());
  }, [customers, leads, user]);

  const [selectedClientId, setSelectedClientId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        const preselected = sessionStorage.getItem('fitnetheist_exercise_assign_client');
        if (preselected) return preselected;
      } catch {}
    }
    if (selectedCustomerId) return selectedCustomerId;
    if (user?.id) return user.id;
    if (user?.email) return user.email;
    return 'cust_lakshya';
  });

  // Check if navigated from Client Profile "Assign Exercise Plan" button
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const preselected = sessionStorage.getItem('fitnetheist_exercise_assign_client');
        if (preselected) {
          setSelectedClientId(preselected);
          setActiveTab('ASSIGN');
          sessionStorage.removeItem('fitnetheist_exercise_assign_client');
        }
      } catch {}
    }
  }, []);

  const selectedClient = allClients.find(
    c => c.id === selectedClientId || 
         `cust_${(c.id || '').replace('lead_', '')}` === selectedClientId ||
         (c.convertedFromLeadId && c.convertedFromLeadId === selectedClientId) ||
         (c.email && c.email.toLowerCase() === selectedClientId.toLowerCase())
  ) || allClients[0];

  // Builder State for Selected Client
  const [splitName, setSplitName] = useState('Coach Neetu Bespoke 4-Day Protocol');
  const [daysPerWeek, setDaysPerWeek] = useState<number>(4);
  const [coachNotes, setCoachNotes] = useState(
    'Assigned personally by Coach Neetu. Progressive overload strictly on compound movements. Focus on form control, mind-muscle connection, and recovery between sessions.'
  );

  // Days breakdown for the personalized plan
  const [planDays, setPlanDays] = useState<WorkoutDay[]>([
    {
      dayName: 'Day 1',
      focus: 'CHEST & TRICEPS HYPERTROPHY',
      estimatedMinutes: 50,
      exercises: []
    },
    {
      dayName: 'Day 2',
      focus: 'BACK & BICEPS PULL DENSITY',
      estimatedMinutes: 50,
      exercises: []
    },
    {
      dayName: 'Day 3',
      focus: 'LEGS & GLUTES LOWER STRENGTH',
      estimatedMinutes: 55,
      exercises: []
    },
    {
      dayName: 'Day 4',
      focus: 'SHOULDERS & ARMS PUMP & RECOVERY',
      estimatedMinutes: 45,
      exercises: []
    }
  ]);

  const [assignmentSuccess, setAssignmentSuccess] = useState<string | null>(null);

  // Load existing assigned plan if client has one
  useEffect(() => {
    if (selectedClient?.assignedWorkoutPlan) {
      const p = selectedClient.assignedWorkoutPlan;
      if (p.name) setSplitName(p.name);
      if (p.daysPerWeek) setDaysPerWeek(p.daysPerWeek);
      if (p.coachNotes) setCoachNotes(p.coachNotes);
      if (Array.isArray(p.days) && p.days.length > 0) {
        setPlanDays(p.days);
      }
    } else if (selectedClient) {
      setSplitName(selectedClient.workoutSplit && selectedClient.workoutSplit !== 'Awaiting Coach Assignment' ? selectedClient.workoutSplit : 'Coach Neetu Bespoke 4-Day Protocol');
    }
  }, [selectedClientId, selectedClient?.id]);

  // Adjust number of days when daysPerWeek changes
  const handleDaysPerWeekChange = (newCount: number) => {
    setDaysPerWeek(newCount);
    setPlanDays(prev => {
      const updated = [...prev];
      if (newCount > prev.length) {
        for (let i = prev.length; i < newCount; i++) {
          updated.push({
            dayName: `Day ${i + 1}`,
            focus: `SESSION ${i + 1} HYPERTROPHY`,
            estimatedMinutes: 45,
            exercises: []
          });
        }
      } else {
        return updated.slice(0, newCount);
      }
      return updated;
    });
  };

  // Add an exercise to a specific day in builder
  const handleAddExerciseToDay = (dayIdx: number, ex: Exercise) => {
    setPlanDays(prev => {
      const copy = [...prev];
      const targetDay = { ...copy[dayIdx] };
      targetDay.exercises = [
        ...targetDay.exercises,
        {
          exercise: ex,
          customSets: ex.sets || '4',
          customReps: ex.reps || '8-10'
        }
      ];
      copy[dayIdx] = targetDay;
      return copy;
    });
  };

  // Remove exercise from a day
  const handleRemoveExerciseFromDay = (dayIdx: number, exIdx: number) => {
    setPlanDays(prev => {
      const copy = [...prev];
      const targetDay = { ...copy[dayIdx] };
      targetDay.exercises = targetDay.exercises.filter((_, i) => i !== exIdx);
      copy[dayIdx] = targetDay;
      return copy;
    });
  };

  // Update day title / focus
  const handleUpdateDayFocus = (dayIdx: number, focus: string) => {
    setPlanDays(prev => {
      const copy = [...prev];
      copy[dayIdx] = { ...copy[dayIdx], focus };
      return copy;
    });
  };

  // Save and Assign Personalized Plan to Client
  const handleAssignPersonalizedPlan = () => {
    if (!selectedClient) return;

    const personalizedWorkout: WorkoutPlan = {
      id: `plan_pers_${selectedClient.id}_${Date.now()}`,
      name: splitName.trim() || 'Coach Neetu Personalized Protocol',
      goal: selectedClient.dietGoal || 'BUILD_MUSCLE',
      experience: (selectedClient.experienceLevel as ExperienceLevel) || 'INTERMEDIATE',
      equipment: 'FULL_GYM',
      daysPerWeek: daysPerWeek,
      durationMinutes: 50,
      days: planDays,
      isPersonalized: true,
      assignedClientId: selectedClient.id,
      assignedClientName: selectedClient.name,
      assignedClientEmail: selectedClient.email,
      assignedAt: new Date().toISOString(),
      coachNotes: coachNotes.trim()
    };

    // 1. Update customer record in Admin (include name/email/phone so upsert works even for new leads or default clients)
    updateCustomer(selectedClient.id, {
      name: selectedClient.name,
      email: selectedClient.email,
      phone: selectedClient.phone,
      dietGoal: selectedClient.dietGoal,
      experienceLevel: selectedClient.experienceLevel,
      trainingDaysPerWeek: daysPerWeek,
      isWorkoutPersonalized: true,
      assignedWorkoutPlan: personalizedWorkout,
      workoutSplit: personalizedWorkout.name
    } as any);

    // 2. Persist in localStorage keys specifically for this client and globally
    try {
      localStorage.setItem(`fitnetheist_personalized_workout_${selectedClient.id}`, JSON.stringify(personalizedWorkout));
      localStorage.setItem(`fitnetheist_personalized_workout_${selectedClient.email}`, JSON.stringify(personalizedWorkout));
      localStorage.setItem(`fitnetheist_client_workout_${selectedClient.id}`, JSON.stringify(personalizedWorkout));
      localStorage.setItem('fitnetheist_assigned_workout', JSON.stringify(personalizedWorkout));
    } catch (e) {}

    // 3. Immediately update workout plan in AppContext so client views update in real time
    if (assignPersonalizedWorkoutToClient) {
      assignPersonalizedWorkoutToClient(
        { id: selectedClient.id, name: selectedClient.name, email: selectedClient.email },
        personalizedWorkout
      );
    } else {
      setWorkoutPlan(personalizedWorkout);
    }

    logAuditAction(
      'ASSIGN_PERSONALIZED_WORKOUT',
      `Client: ${selectedClient.name} (${selectedClient.email})`,
      'Pending Personalization',
      `Assigned: ${personalizedWorkout.name} (${daysPerWeek} days) by Coach Neetu`
    );

    setAssignmentSuccess(`Successfully assigned bespoke protocol to ${selectedClient.name} (${selectedClient.email})! The client app is now updated.`);
    setTimeout(() => setAssignmentSuccess(null), 8000);
  };

  // ==========================================
  // EXERCISE REPOSITORY ACTIONS
  // ==========================================
  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newCategoryName.trim().toUpperCase();
    if (!clean) return;
    if (!customCategories.includes(clean)) {
      const updated = [...customCategories, clean];
      setCustomCategories(updated);
      localStorage.setItem('fitnetheist_custom_exercise_categories', JSON.stringify(updated));
      setSelectedCategory(clean);
    }
    setNewCategoryName('');
    setIsAddingCategory(false);
  };

  const openAddModal = () => {
    setEditingExercise(null);
    setName('');
    setCategory((selectedCategory !== 'ALL' ? selectedCategory : 'CHEST') as MuscleGroup);
    setTargetMuscles('');
    setDifficulty('INTERMEDIATE');
    setEquipment('FULL_GYM');
    setSets('4');
    setReps('8-10');
    setRestSeconds(90);
    setKeyFormTip('');
    setVideoUrl('https://drive.google.com/file/d/1qrB6aZDVWIbzrJ4ZRpGQSttBO0J8HvrL/view?usp=sharing');
    setInstructionsText('01 Set up with solid brace and stability.\n02 Execute movement through full active range.\n03 Control eccentric and pause at peak contraction.');
    setIsExerciseModalOpen(true);
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
    setKeyFormTip(ex.keyFormTip || '');
    setVideoUrl(ex.videoUrl || '');
    setInstructionsText(Array.isArray(ex.instructions) ? ex.instructions.join('\n') : '');
    setIsExerciseModalOpen(true);
  };

  const handleSelectVideoFromBank = (video: DriveVideoItem) => {
    setName(video.name);
    setCategory(video.muscleGroup);
    setTargetMuscles(video.targetMuscles);
    setDifficulty(video.difficulty);
    setEquipment(video.equipment);
    setSets(video.suggestedSets);
    setReps(video.suggestedReps);
    setRestSeconds(video.suggestedRestSeconds);
    setKeyFormTip(video.keyFormTip);
    setVideoUrl(video.driveUrl);
    setInstructionsText(video.instructions.join('\n'));
  };

  const handleSaveExercise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const parsedInstructions = instructionsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const payload: Omit<Exercise, 'id'> = {
      name: name.trim(),
      category,
      targetMuscles: targetMuscles.trim() || `${category} focus`,
      difficulty,
      equipment,
      sets: sets.trim() || '4',
      reps: reps.trim() || '8-10',
      restSeconds: Number(restSeconds) || 90,
      instructions: parsedInstructions.length ? parsedInstructions : ['Execute with strict form.'],
      keyFormTip: keyFormTip.trim() || 'Maintain full control throughout the entire range of motion.',
      videoThumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80',
      videoUrl: videoUrl.trim() || 'https://drive.google.com/file/d/1qrB6aZDVWIbzrJ4ZRpGQSttBO0J8HvrL/view?usp=sharing'
    };

    if (editingExercise) {
      updateExercise(editingExercise.id, payload);
      logAuditAction('UPDATE_EXERCISE', payload.name);
    } else {
      addExercise(payload);
      logAuditAction('CREATE_EXERCISE', payload.name);
    }

    setIsExerciseModalOpen(false);
  };

  const safeExercises = Array.isArray(exercises) ? exercises : [];

  const filteredExercises = safeExercises.filter(ex => {
    if (!ex) return false;
    const term = searchTerm.toLowerCase();
    const nameMatch = (ex.name || '').toLowerCase().includes(term);
    const targetMatch = (ex.targetMuscles || '').toLowerCase().includes(term);
    const matchesSearch = !term || nameMatch || targetMatch;
    const matchesCategory = selectedCategory === 'ALL' || ex.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full flex flex-col bg-[#08080a] text-white overflow-hidden font-sans">
      
      {/* Top Header */}
      <div className="p-5 sm:p-6 border-b border-white/10 bg-[#0e0e12] shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#FFC515] animate-pulse" />
              <span className="text-[11px] font-mono-num font-bold uppercase tracking-[0.25em] text-[#FFC515]">
                COACHING OS // EXERCISE BANK & BESPOKE ASSIGNMENTS
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-display tracking-tight text-white mt-1">
              EXERCISE BANK
            </h1>
            <p className="text-zinc-400 text-xs font-mono-num mt-0.5">
              Categorized exercise repository with Google Drive video demonstrations. Assign personalized protocols to clients.
            </p>
          </div>

          {/* Tab Selector Buttons */}
          <div className="flex items-center gap-2 bg-[#141418] p-1 border border-white/10 rounded-[4px] font-mono-num text-xs overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('LIBRARY')}
              className={`px-3 py-1.5 font-bold uppercase rounded-[3px] transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'LIBRARY' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Layers size={14} />
              <span>Exercise Library ({safeExercises.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('VIDEO_BANK')}
              className={`px-3 py-1.5 font-bold uppercase rounded-[3px] transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'VIDEO_BANK' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Video size={14} className={activeTab === 'VIDEO_BANK' ? 'text-black' : 'text-[#FFC515]'} />
              <span>Drive Video Bank (638)</span>
            </button>
            <button
              onClick={() => setActiveTab('ASSIGN')}
              className={`px-3 py-1.5 font-bold uppercase rounded-[3px] transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'ASSIGN' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Send size={14} />
              <span>Assign to Client</span>
            </button>
            <button
              onClick={() => setActiveTab('STATUS')}
              className={`px-3 py-1.5 font-bold uppercase rounded-[3px] transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'STATUS' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <UserCheck size={14} />
              <span>Client Status</span>
            </button>
          </div>
        </div>

        {/* Success Banner */}
        {assignmentSuccess && (
          <div className="mt-4 p-3 bg-emerald-950/70 border border-emerald-500/50 rounded-[4px] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono-num text-emerald-300 animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>{assignmentSuccess}</span>
            </div>
            <button
              onClick={() => setAppActiveTab('plan')}
              className="px-3 py-1 bg-[#FFC515] hover:bg-[#eab308] text-black font-bold uppercase rounded text-[11px] shrink-0 transition-colors cursor-pointer"
            >
              Preview Live Client Workout Protocol →
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">

        {/* ========================================================================= */}
        {/* VIEW 1: EXERCISE REPOSITORY & CATEGORIES                                  */}
        {/* ========================================================================= */}
        {activeTab === 'LIBRARY' && (
          <div className="space-y-6">
            
            {/* Category Pills & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0e0e12] border border-white/10 p-4 rounded-[4px]">
              
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                <button
                  onClick={() => setSelectedCategory('ALL')}
                  className={`px-3 py-1 text-xs font-mono-num font-bold uppercase rounded-[3px] whitespace-nowrap transition-colors ${
                    selectedCategory === 'ALL'
                      ? 'bg-[#FFC515] text-black'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
                  }`}
                >
                  ALL ({safeExercises.length})
                </button>
                {customCategories.map(cat => {
                  const count = safeExercises.filter(e => e.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 text-xs font-mono-num font-bold uppercase rounded-[3px] whitespace-nowrap transition-colors ${
                        selectedCategory === cat
                          ? 'bg-[#FFC515] text-black'
                          : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}

                {/* Add Category Button / Form */}
                {isAddingCategory ? (
                  <form onSubmit={handleCreateCategory} className="flex items-center gap-1.5">
                    <input
                      type="text"
                      autoFocus
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="e.g. GLUTES"
                      className="px-2 py-1 text-xs bg-black border border-[#FFC515] text-white uppercase font-mono-num focus:outline-none w-28"
                    />
                    <button type="submit" className="p-1 bg-[#FFC515] text-black rounded text-xs font-bold">
                      <Check size={14} />
                    </button>
                    <button type="button" onClick={() => setIsAddingCategory(false)} className="p-1 text-zinc-400 hover:text-white text-xs">
                      <X size={14} />
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setIsAddingCategory(true)}
                    className="px-2.5 py-1 text-xs font-mono-num text-zinc-400 hover:text-[#FFC515] bg-zinc-900/50 hover:bg-zinc-900 border border-dashed border-white/20 rounded-[3px] flex items-center gap-1 whitespace-nowrap transition-colors"
                  >
                    <FolderPlus size={13} />
                    <span>+ Category</span>
                  </button>
                )}
              </div>

              {/* Search & Add Exercise Button */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="relative w-48 sm:w-60">
                  <Search size={14} className="absolute left-2.5 top-2.5 text-zinc-500" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search exercise / muscle..."
                    className="w-full bg-[#141418] border border-white/10 pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 rounded-[3px] focus:outline-none focus:border-[#FFC515]"
                  />
                </div>
                <button
                  onClick={() => setActiveTab('VIDEO_BANK')}
                  className="px-3.5 py-1.5 bg-[#14141a] hover:bg-[#1c1c24] text-[#FFC515] border border-[#FFC515]/40 hover:border-[#FFC515] font-mono-num font-bold text-xs uppercase rounded-[3px] flex items-center gap-1.5 transition-colors whitespace-nowrap"
                  title="Browse and import from Google Drive Video Bank"
                >
                  <Video size={14} />
                  <span>Drive Bank (638)</span>
                </button>
                <button
                  onClick={openAddModal}
                  className="px-4 py-1.5 bg-[#FFC515] hover:bg-[#eab308] text-black font-mono-num font-bold text-xs uppercase rounded-[3px] flex items-center gap-1.5 transition-colors whitespace-nowrap shadow-sm"
                >
                  <Plus size={15} />
                  <span>Add Exercise</span>
                </button>
              </div>

            </div>

            {/* Exercises Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredExercises.map((ex) => (
                <div
                  key={ex.id}
                  className="bg-[#0e0e12] border border-white/10 rounded-[5px] p-4 flex flex-col justify-between hover:border-white/25 transition-all group relative"
                >
                  <div className="space-y-3">
                    
                    {/* Top Badges */}
                    <div className="flex items-center justify-between text-[10px] font-mono-num">
                      <span className="px-2 py-0.5 bg-zinc-900 border border-white/10 text-[#FFC515] font-bold uppercase rounded-[2px]">
                        {ex.category}
                      </span>
                      <span className="text-zinc-400">
                        {ex.equipment.replace('_', ' ')} · {ex.difficulty}
                      </span>
                    </div>

                    {/* Exercise Name */}
                    <div>
                      <h3 className="text-base font-bold uppercase font-display text-white group-hover:text-[#FFC515] transition-colors">
                        {ex.name}
                      </h3>
                      <p className="text-xs text-zinc-400 font-mono-num mt-0.5 line-clamp-1">
                        {ex.targetMuscles}
                      </p>
                    </div>

                    {/* Prescribed Metrics */}
                    <div className="grid grid-cols-3 gap-2 py-2 px-2.5 bg-zinc-900/60 border border-white/5 rounded-[3px] text-center text-xs font-mono-num">
                      <div>
                        <span className="text-[10px] text-zinc-500 block">SETS</span>
                        <span className="font-bold text-white">{ex.sets}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 block">REPS</span>
                        <span className="font-bold text-white">{ex.reps}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 block">REST</span>
                        <span className="font-bold text-[#FFC515]">{ex.restSeconds}s</span>
                      </div>
                    </div>

                    {/* Coaching Tip */}
                    {ex.keyFormTip && (
                      <p className="text-[11px] text-zinc-400 italic line-clamp-2 bg-black/40 p-2 border-l border-[#FFC515] rounded-[1px]">
                        "{ex.keyFormTip}"
                      </p>
                    )}

                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-4 text-xs font-mono-num">
                    <button
                      onClick={() => setPreviewVideoExercise(ex)}
                      className="text-zinc-300 hover:text-[#FFC515] flex items-center gap-1.5 transition-colors"
                      title="Preview Video Form Demonstration"
                    >
                      <Video size={14} className="text-[#FFC515]" />
                      <span>Form Video</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEditModal(ex)}
                        className="p-1.5 text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded transition-colors"
                        title="Edit Exercise"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${ex.name}" from exercise repository?`)) {
                            deleteExercise(ex.id);
                          }
                        }}
                        className="p-1.5 text-zinc-500 hover:text-red-400 bg-zinc-900 hover:bg-red-950/40 rounded transition-colors"
                        title="Delete Exercise"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {filteredExercises.length === 0 && (
              <div className="p-12 text-center bg-[#0e0e12] border border-white/10 rounded-[4px] space-y-3 font-mono-num">
                <Dumbbell size={32} className="mx-auto text-zinc-600" />
                <p className="text-zinc-300 text-sm">No exercises found for category "{selectedCategory}".</p>
                <button
                  onClick={openAddModal}
                  className="px-4 py-2 bg-[#FFC515] text-black font-bold uppercase text-xs rounded transition-colors"
                >
                  + Add First Exercise to {selectedCategory}
                </button>
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW: GOOGLE DRIVE VIDEO BANK (638 CLIPS & REPOSITORY)                   */}
        {/* ========================================================================= */}
        {activeTab === 'VIDEO_BANK' && (
          <DriveVideoBankSection
            exercises={safeExercises}
            onAddExercise={addExercise}
            logAuditAction={logAuditAction}
          />
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: ASSIGN PERSONALIZED WORKOUT PLANS TO CLIENTS                      */}
        {/* ========================================================================= */}
        {activeTab === 'ASSIGN' && (
          <div className="space-y-6">
            
            {/* Step 1: Select Client */}
            <div className="bg-[#0e0e12] border border-white/10 p-5 rounded-[4px] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3 font-mono-num">
                <div>
                  <span className="text-[10px] text-[#FFC515] font-bold uppercase tracking-widest block">
                    STEP 1 // SELECT CLIENT
                  </span>
                  <h3 className="text-lg font-bold text-white uppercase font-display">
                    CLIENT PROTOCOL ASSIGNMENT
                  </h3>
                </div>

                {/* Client Selector Dropdown */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
                  <span className="text-xs font-bold text-[#FFC515] uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                    <UserCheck size={14} className="text-[#FFC515]" /> Target Client:
                  </span>
                  <select
                    id="target-client-select"
                    value={selectedClient?.id || selectedClientId}
                    onChange={(e) => setSelectedClientId(e.target.value)}
                    className="bg-[#141418] border border-[#FFC515]/40 hover:border-[#FFC515] text-white text-xs font-semibold px-3.5 py-2.5 rounded focus:outline-none focus:ring-1 focus:ring-[#FFC515] font-mono-num min-w-[320px] sm:min-w-[460px] max-w-full cursor-pointer shadow-inner"
                  >
                    {allClients.map((c) => {
                      const clientName = c.name?.trim() || 'Client';
                      const clientEmail = c.email?.trim() || 'No email registered';
                      const statusTag = c.isWorkoutPersonalized ? '✓ Active Protocol' : '⚡ Awaiting Personalization';
                      const displayText = `${clientName} (${clientEmail}) — ${statusTag}`;

                      return (
                        <option key={c.id} value={c.id} className="bg-[#141418] text-white py-1">
                          {displayText}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {/* Quick Client Switcher Chips */}
              <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-white/5 font-mono-num text-[11px]">
                <span className="text-zinc-500 uppercase text-[10px] font-bold tracking-wider">Quick Client Select:</span>
                {allClients.slice(0, 5).map((c) => {
                  const isSelected = selectedClient?.id === c.id;
                  const label = c.name || c.email || 'Client';
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedClientId(c.id)}
                      className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 border ${
                        isSelected
                          ? 'bg-[#FFC515] text-black border-[#FFC515] font-bold shadow-sm'
                          : 'bg-zinc-900/80 text-zinc-300 border-white/10 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      <span>{label}</span>
                      {c.email && (
                        <span className={`text-[10px] ${isSelected ? 'text-black/70' : 'text-zinc-500'}`}>
                          ({c.email})
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Selected Client Card Details */}
              {selectedClient && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-zinc-900/60 p-4 border border-white/5 rounded text-xs font-mono-num">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block">CLIENT NAME</span>
                    <span className="text-white font-bold text-sm">{selectedClient.name}</span>
                    <span className="text-zinc-400 block text-[11px]">{selectedClient.email}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block">PHONE (WHATSAPP)</span>
                    <span className="text-[#FFC515] font-bold">{selectedClient.phone || 'N/A'}</span>
                    <span className="text-zinc-400 block text-[11px]">Primary Coach: Coach Neetu</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block">PRIMARY GOAL</span>
                    <span className="text-white font-bold">{selectedClient.dietGoal?.replace('_', ' ') || 'BUILD MUSCLE'}</span>
                    <span className="text-zinc-400 block text-[11px]">Experience: {selectedClient.experienceLevel || 'Intermediate'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block">CURRENT STATUS</span>
                    {selectedClient.isWorkoutPersonalized ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold rounded text-[10px]">
                        <CheckCircle2 size={12} /> PERSONALIZED PLAN ACTIVE
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-950 border border-amber-500/50 text-amber-300 font-bold rounded text-[10px]">
                        <Clock size={12} /> AWAITING BESPOKE PLAN
                      </span>
                    )}
                    <span className="text-zinc-400 block text-[10px] mt-1">
                      {selectedClient.isWorkoutPersonalized
                        ? 'Client sees bespoke routine'
                        : 'Client currently sees "Plan will be personalized shortly"'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Configure Bespoke Split & Day Breakdown */}
            <div className="bg-[#0e0e12] border border-white/10 p-5 rounded-[4px] space-y-6">
              
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] text-[#FFC515] font-bold uppercase tracking-widest font-mono-num block">
                  STEP 2 // BESPOKE EXERCISE PRESCRIPTION
                </span>
                <h3 className="text-xl font-bold uppercase font-display text-white mt-0.5">
                  DESIGN WORKOUT SPLIT FOR {selectedClient?.name?.toUpperCase()}
                </h3>
              </div>

              {/* Protocol Parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono-num text-xs">
                <div>
                  <label className="text-zinc-400 uppercase text-[10px] block mb-1">PROTOCOL SPLIT NAME</label>
                  <input
                    type="text"
                    value={splitName}
                    onChange={(e) => setSplitName(e.target.value)}
                    className="w-full bg-[#141418] border border-white/15 px-3 py-2 text-white focus:border-[#FFC515] focus:outline-none"
                    placeholder="e.g. Coach Neetu 4-Day Recomp & Hypertrophy"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 uppercase text-[10px] block mb-1">TRAINING DAYS PER WEEK</label>
                  <select
                    value={daysPerWeek}
                    onChange={(e) => handleDaysPerWeekChange(Number(e.target.value))}
                    className="w-full bg-[#141418] border border-white/15 px-3 py-2 text-white focus:border-[#FFC515] focus:outline-none"
                  >
                    <option value={3}>3 Days / Week (Full Body / Upper-Lower)</option>
                    <option value={4}>4 Days / Week (Upper / Lower Split)</option>
                    <option value={5}>5 Days / Week (Push / Pull / Legs + Upper / Lower)</option>
                    <option value={6}>6 Days / Week (Push / Pull / Legs x 2)</option>
                  </select>
                </div>
                <div>
                  <label className="text-zinc-400 uppercase text-[10px] block mb-1">ASSIGNED BY</label>
                  <div className="px-3 py-2 bg-zinc-900 border border-white/10 text-[#FFC515] font-bold">
                    Coach Neetu (Founder & Head Coach)
                  </div>
                </div>
              </div>

              {/* Coach Notes Textarea */}
              <div className="font-mono-num text-xs">
                <label className="text-zinc-400 uppercase text-[10px] block mb-1">
                  COACH DIRECTIVES & PROGRESSIVE OVERLOAD NOTES (DISPLAYED TO CLIENT)
                </label>
                <textarea
                  rows={2}
                  value={coachNotes}
                  onChange={(e) => setCoachNotes(e.target.value)}
                  className="w-full bg-[#141418] border border-white/15 p-2.5 text-white focus:border-[#FFC515] focus:outline-none"
                  placeholder="Direct instructions from Coach Neetu for this client..."
                />
              </div>

              {/* Day-by-Day Exercise Assignment */}
              <div className="space-y-6 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold uppercase font-mono-num text-white tracking-wider">
                    DAILY EXERCISE PROTOCOLS ({planDays.length} SESSIONS)
                  </h4>
                  <span className="text-xs text-zinc-400 font-mono-num">
                    Pick exercises directly from Exercise Bank categories
                  </span>
                </div>

                <div className="space-y-6">
                  {planDays.map((day, dayIdx) => (
                    <div
                      key={dayIdx}
                      className="bg-zinc-900/40 border border-white/15 rounded-[4px] p-4 sm:p-5 space-y-4"
                    >
                      {/* Day Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3 font-mono-num">
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 bg-[#FFC515] text-black font-bold text-xs uppercase rounded-[2px]">
                            {day.dayName}
                          </span>
                          <input
                            type="text"
                            value={day.focus}
                            onChange={(e) => handleUpdateDayFocus(dayIdx, e.target.value)}
                            placeholder="e.g. CHEST & SHOULDERS HYPERTROPHY"
                            className="bg-transparent text-sm font-bold uppercase text-white border-b border-dashed border-white/30 focus:border-[#FFC515] focus:outline-none px-1"
                          />
                        </div>
                        <span className="text-xs text-zinc-400">
                          {day.exercises.length} prescribed exercises
                        </span>
                      </div>

                      {/* Prescribed Exercises List for this Day */}
                      <div className="space-y-2">
                        {day.exercises.map((item, exIdx) => (
                          <div
                            key={exIdx}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-black/60 border border-white/10 rounded text-xs font-mono-num"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-[#FFC515] font-bold">
                                {exIdx < 9 ? `0${exIdx + 1}` : exIdx + 1}
                              </span>
                              <div>
                                <span className="font-bold text-white uppercase block">
                                  {item.exercise.name}
                                </span>
                                <span className="text-zinc-400 text-[11px]">
                                  {item.exercise.category} · {item.exercise.targetMuscles}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] text-zinc-500">SETS:</span>
                                <input
                                  type="text"
                                  value={item.customSets || '4'}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setPlanDays(prev => prev.map((d, dIdx) => {
                                      if (dIdx !== dayIdx) return d;
                                      return {
                                        ...d,
                                        exercises: d.exercises.map((exItem, eIdx) =>
                                          eIdx === exIdx ? { ...exItem, customSets: val } : exItem
                                        )
                                      };
                                    }));
                                  }}
                                  className="w-14 bg-zinc-900 border border-white/20 px-1.5 py-0.5 text-center text-white"
                                />
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] text-zinc-500">REPS:</span>
                                <input
                                  type="text"
                                  value={item.customReps || '8-10'}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setPlanDays(prev => prev.map((d, dIdx) => {
                                      if (dIdx !== dayIdx) return d;
                                      return {
                                        ...d,
                                        exercises: d.exercises.map((exItem, eIdx) =>
                                          eIdx === exIdx ? { ...exItem, customReps: val } : exItem
                                        )
                                      };
                                    }));
                                  }}
                                  className="w-16 bg-zinc-900 border border-white/20 px-1.5 py-0.5 text-center text-white"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveExerciseFromDay(dayIdx, exIdx)}
                                className="p-1 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                                title="Remove exercise from day"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}

                        {day.exercises.length === 0 && (
                          <p className="text-xs text-zinc-500 italic py-2">
                            No exercises added yet for {day.dayName}. Click any muscle category below or search to add exercises.
                          </p>
                        )}
                      </div>

                      {/* Interactive Click & Search Exercise Add Bar from Bank & Drive Videos */}
                      <div className="pt-3 border-t border-white/10 space-y-2.5 font-mono-num text-xs">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[#FFC515] font-bold text-[11px] mr-1">+ Add Exercise:</span>
                            {customCategories.map(cat => {
                              const isOpen = openDayPicker?.dayIdx === dayIdx && openDayPicker?.category === cat;
                              return (
                                <button
                                  key={cat}
                                  type="button"
                                  onClick={() => setOpenDayPicker(isOpen ? null : { dayIdx, category: cat })}
                                  className={`px-2.5 py-1 text-[11px] font-bold uppercase rounded transition-colors cursor-pointer ${
                                    isOpen
                                      ? 'bg-[#FFC515] text-black'
                                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-white/10'
                                  }`}
                                >
                                  {cat} {isOpen ? '▴' : '▾'}
                                </button>
                              );
                            })}
                          </div>

                          {/* Search Any Exercise / Drive Video for this Day */}
                          <div className="relative min-w-[220px]">
                            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <input
                              type="text"
                              value={daySearchQuery[dayIdx] || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setDaySearchQuery(prev => ({ ...prev, [dayIdx]: val }));
                                if (val.trim()) {
                                  setOpenDayPicker({ dayIdx, category: 'SEARCH' });
                                }
                              }}
                              placeholder="Search 638+ exercises to add..."
                              className="w-full bg-[#141418] border border-white/15 pl-7 pr-6 py-1 text-[11px] text-white rounded focus:border-[#FFC515] focus:outline-none"
                            />
                            {daySearchQuery[dayIdx] && (
                              <button
                                type="button"
                                onClick={() => {
                                  setDaySearchQuery(prev => ({ ...prev, [dayIdx]: '' }));
                                  if (openDayPicker?.dayIdx === dayIdx && openDayPicker?.category === 'SEARCH') {
                                    setOpenDayPicker(null);
                                  }
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Expanded Exercise Picker Drawer for this Day */}
                        {openDayPicker?.dayIdx === dayIdx && (
                          <div className="bg-[#121218] border border-[#FFC515]/40 rounded p-3 space-y-2 shadow-xl">
                            <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                              <span className="text-[10px] text-[#FFC515] font-bold uppercase tracking-wider">
                                {openDayPicker.category === 'SEARCH'
                                  ? `SEARCH RESULTS FOR "${daySearchQuery[dayIdx] || ''}"`
                                  : `${openDayPicker.category} EXERCISES (CLICK TO ADD TO ${day.dayName.toUpperCase()})`}
                              </span>
                              <button
                                type="button"
                                onClick={() => setOpenDayPicker(null)}
                                className="text-[10px] text-zinc-400 hover:text-white uppercase font-bold cursor-pointer"
                              >
                                Close ✕
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5 max-h-56 overflow-y-auto pr-1">
                              {(() => {
                                const q = (daySearchQuery[dayIdx] || '').trim().toLowerCase();
                                const libMatches = safeExercises.filter(e =>
                                  openDayPicker.category === 'SEARCH'
                                    ? (e.name.toLowerCase().includes(q) || e.targetMuscles.toLowerCase().includes(q) || e.category.toLowerCase().includes(q))
                                    : e.category === openDayPicker.category
                                );

                                // Also include matching items from DEFAULT_DRIVE_VIDEOS not already in libMatches
                                const existingNames = new Set(libMatches.map(x => x.name.toLowerCase()));
                                const driveMatches: Exercise[] = DEFAULT_DRIVE_VIDEOS
                                  .filter(v => {
                                    if (existingNames.has(v.name.toLowerCase())) return false;
                                    if (openDayPicker.category === 'SEARCH') {
                                      return v.name.toLowerCase().includes(q) || v.muscleGroup.toLowerCase().includes(q) || v.targetMuscles.toLowerCase().includes(q);
                                    }
                                    return v.muscleGroup === openDayPicker.category;
                                  })
                                  .slice(0, 36)
                                  .map(v => ({
                                    id: v.id,
                                    name: v.name,
                                    category: v.muscleGroup,
                                    targetMuscles: v.targetMuscles,
                                    difficulty: v.difficulty,
                                    equipment: v.equipment,
                                    sets: v.suggestedSets || '4',
                                    reps: v.suggestedReps || '10-12',
                                    restSeconds: v.suggestedRestSeconds || 90,
                                    instructions: v.instructions,
                                    keyFormTip: v.keyFormTip,
                                    videoThumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80',
                                    videoUrl: v.driveUrl
                                  }));

                                const combined = [...libMatches, ...driveMatches];
                                if (combined.length === 0) {
                                  return (
                                    <p className="text-[11px] text-zinc-500 col-span-full py-2">
                                      No matching exercises found.
                                    </p>
                                  );
                                }

                                return combined.map(e => (
                                  <button
                                    key={e.id}
                                    type="button"
                                    onClick={() => handleAddExerciseToDay(dayIdx, e)}
                                    className="text-left px-2.5 py-1.5 bg-zinc-900/90 hover:bg-[#FFC515] text-zinc-200 hover:text-black border border-white/10 rounded text-[11px] flex items-center justify-between gap-2 transition-colors cursor-pointer group"
                                  >
                                    <span className="truncate font-semibold">+ {e.name}</span>
                                    <span className="text-[9px] opacity-70 shrink-0">{e.sets}×{e.reps}</span>
                                  </button>
                                ));
                              })()}
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  ))}
                </div>

              </div>

              {/* Final Submit / Assignment Action */}
              <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono-num">
                <div className="text-xs text-zinc-400">
                  <span>Target: </span>
                  <strong className="text-white">{selectedClient?.name}</strong>
                  <span> · Plan will be immediately live on their dashboard</span>
                </div>
                <button
                  onClick={handleAssignPersonalizedPlan}
                  className="px-6 py-3 bg-[#FFC515] hover:bg-[#eab308] text-black font-bold uppercase text-xs rounded-[3px] flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-[1.01]"
                >
                  <Send size={15} />
                  <span>SAVE & ASSIGN BESPOKE PROTOCOL TO {selectedClient?.name?.toUpperCase()}</span>
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: CLIENT PRESCRIPTION STATUS AUDIT                                  */}
        {/* ========================================================================= */}
        {activeTab === 'STATUS' && (
          <div className="bg-[#0e0e12] border border-white/10 rounded-[4px] p-5 space-y-4 font-mono-num">
            <div className="border-b border-white/10 pb-3">
              <span className="text-[10px] text-[#FFC515] font-bold uppercase tracking-widest block">
                AUDIT & TRACKING
              </span>
              <h3 className="text-lg font-bold uppercase font-display text-white">
                CLIENT WORKOUT PERSONALIZATION STATUS
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Overview of all registered clients. Clients without a personalized plan will display the waiting prompt.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-zinc-500 uppercase text-[10px]">
                    <th className="py-2.5 px-3">Client</th>
                    <th className="py-2.5 px-3">Phone (Compulsory)</th>
                    <th className="py-2.5 px-3">Goal</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Active Routine</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {allClients.map((c) => (
                    <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-3">
                        <span className="font-bold text-white block">{c.name}</span>
                        <span className="text-zinc-500 text-[11px]">{c.email}</span>
                      </td>
                      <td className="py-3 px-3 text-[#FFC515] font-bold">
                        {c.phone || 'N/A'}
                      </td>
                      <td className="py-3 px-3 text-zinc-300">
                        {c.dietGoal?.replace('_', ' ') || 'BUILD MUSCLE'}
                      </td>
                      <td className="py-3 px-3">
                        {c.isWorkoutPersonalized ? (
                          <span className="px-2 py-0.5 bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-[10px] font-bold uppercase rounded">
                            Personalized Active
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-amber-950 border border-amber-500/50 text-amber-300 text-[10px] font-bold uppercase rounded">
                            Waiting for Coach Review
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-zinc-400">
                        {c.assignedWorkoutPlan?.name || (c.isWorkoutPersonalized ? 'Coach Neetu Split' : 'Pending Custom Assignment')}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => {
                            setSelectedClientId(c.id);
                            setActiveTab('ASSIGN');
                          }}
                          className="px-3 py-1 bg-zinc-900 hover:bg-[#FFC515] text-zinc-300 hover:text-black font-bold uppercase text-[11px] rounded transition-colors"
                        >
                          {c.isWorkoutPersonalized ? 'Edit Plan' : 'Assign Plan →'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* ADD / EDIT EXERCISE MODAL                                                 */}
      {/* ========================================================================= */}
      {isExerciseModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e0e12] border border-white/20 rounded-[6px] max-w-2xl sm:max-w-3xl w-full p-6 space-y-4 my-auto shadow-2xl font-mono-num max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] text-[#FFC515] font-bold uppercase tracking-widest block">
                  COACHING OS // EXERCISE PROTOCOL
                </span>
                <h3 className="text-base font-bold uppercase text-white font-display mt-0.5">
                  {editingExercise ? 'EDIT EXERCISE IN BANK' : 'ADD NEW EXERCISE TO BANK'}
                </h3>
              </div>
              <button
                onClick={() => setIsExerciseModalOpen(false)}
                className="text-zinc-400 hover:text-white p-1"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveExercise} className="space-y-4 text-xs">
              
              {/* VIDEO BANK CATEGORY & SEARCHABLE VIDEO SELECTOR */}
              <VideoBankSelector
                onSelectVideo={handleSelectVideoFromBank}
                selectedVideoUrl={videoUrl}
                currentExerciseName={name}
              />
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 block mb-1 uppercase text-[10px]">EXERCISE NAME *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Incline Dumbbell Bench Press"
                    className="w-full bg-[#141418] border border-white/15 px-3 py-2 text-white focus:border-[#FFC515] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1 uppercase text-[10px]">CATEGORY *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as MuscleGroup)}
                    className="w-full bg-[#141418] border border-white/15 px-3 py-2 text-white focus:border-[#FFC515] focus:outline-none"
                  >
                    {customCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1 uppercase text-[10px]">TARGET MUSCLES</label>
                <input
                  type="text"
                  value={targetMuscles}
                  onChange={(e) => setTargetMuscles(e.target.value)}
                  placeholder="e.g. Clavicular head, Anterior deltoid, Triceps"
                  className="w-full bg-[#141418] border border-white/15 px-3 py-2 text-white focus:border-[#FFC515] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-zinc-400 block mb-1 uppercase text-[10px]">DEFAULT SETS</label>
                  <input
                    type="text"
                    value={sets}
                    onChange={(e) => setSets(e.target.value)}
                    className="w-full bg-[#141418] border border-white/15 px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1 uppercase text-[10px]">DEFAULT REPS</label>
                  <input
                    type="text"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    className="w-full bg-[#141418] border border-white/15 px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1 uppercase text-[10px]">REST (SECONDS)</label>
                  <input
                    type="number"
                    value={restSeconds}
                    onChange={(e) => setRestSeconds(Number(e.target.value))}
                    className="w-full bg-[#141418] border border-white/15 px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1 uppercase text-[10px]">COACH FORM TIP</label>
                <input
                  type="text"
                  value={keyFormTip}
                  onChange={(e) => setKeyFormTip(e.target.value)}
                  placeholder="e.g. Depress scapulae and pull elbows towards hips"
                  className="w-full bg-[#141418] border border-white/15 px-3 py-2 text-white focus:border-[#FFC515] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1 uppercase text-[10px]">EXECUTION PROTOCOL (1 PER LINE)</label>
                <textarea
                  rows={3}
                  value={instructionsText}
                  onChange={(e) => setInstructionsText(e.target.value)}
                  className="w-full bg-[#141418] border border-white/15 p-2 text-white focus:border-[#FFC515] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsExerciseModalOpen(false)}
                  className="px-4 py-2 text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FFC515] text-black font-bold uppercase rounded-[2px]"
                >
                  {editingExercise ? 'Update Exercise' : 'Save to Bank'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 16:9 RESPONSIVE WIDESCREEN VIDEO PREVIEW MODAL                             */}
      {/* ========================================================================= */}
      {previewVideoExercise && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e0e12] border border-white/20 rounded-[6px] max-w-3xl sm:max-w-4xl w-full p-5 sm:p-6 space-y-4 font-mono-num shadow-2xl relative my-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] text-[#FFC515] font-bold uppercase tracking-widest block">
                  16:9 FORM DEMO PREVIEW
                </span>
                <span className="text-base sm:text-lg font-bold text-white uppercase block mt-0.5">
                  {previewVideoExercise.name}
                </span>
              </div>
              <button
                onClick={() => setPreviewVideoExercise(null)}
                className="p-1.5 text-zinc-400 hover:text-white bg-zinc-900 border border-white/10 rounded text-xs transition-colors"
                aria-label="Close preview"
              >
                ✕
              </button>
            </div>

            <div className="w-full flex justify-center bg-black rounded-[6px] overflow-hidden">
              <ExerciseVideoPlayer
                videoUrl={previewVideoExercise.videoUrl}
                thumbnailUrl={previewVideoExercise.videoThumbnail}
                exerciseName={previewVideoExercise.name}
                aspectRatio="16/9"
                autoPlay={false}
                className="w-full shadow-2xl"
              />
            </div>

            <div className="p-3 bg-zinc-900/80 border border-white/5 rounded text-xs text-zinc-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <p className="text-zinc-400">
                  Target: <strong className="text-white">{previewVideoExercise.targetMuscles}</strong> · Sets: <strong className="text-[#FFC515]">{previewVideoExercise.sets}</strong> · Reps: <strong className="text-[#FFC515]">{previewVideoExercise.reps}</strong>
                </p>
                {previewVideoExercise.keyFormTip && (
                  <p className="text-[11px] text-zinc-400 italic">
                    "{previewVideoExercise.keyFormTip}"
                  </p>
                )}
              </div>
              {previewVideoExercise.videoUrl && (
                <a
                  href={previewVideoExercise.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFC515] hover:underline flex items-center gap-1 shrink-0 text-[11px]"
                >
                  <span>Open in Google Drive</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
