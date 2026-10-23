import React, { useState, useEffect } from 'react';
import {
  AdminDietPlan,
  AdminDietMeal,
  AdminDietFoodItem,
  DietType,
  MealCategory,
  FoodItem
} from '../../types';
import { FOOD_DATABASE } from '../../data/nutritionDatabase';
import {
  Customer,
  ClientCoachNote,
  PACKAGE_CATALOG,
  findPackageOption,
  getSubscriptionStatusInfo,
  getLocalDateString,
  calculateEndDateFromPackage,
  Invoice
} from '../../types/admin';
import { useAdmin } from '../../context/AdminContext';
import { ClientIntakeModal } from './ClientIntakeModal';
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  CalendarDays,
  Flame, 
  Dumbbell, 
  HeartPulse, 
  FileText, 
  MessageSquare, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Check,
  AlertCircle, 
  Clock, 
  ShieldCheck, 
  Utensils, 
  Activity, 
  ExternalLink,
  ChevronRight,
  Send,
  Zap,
  Sparkles,
  Package,
  IndianRupee,
  X,
  Layers,
  Coffee,
  Copy,
  Search,
  ChevronDown,
  Filter
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
    leads,
    updateCustomer, 
    deleteCustomer, 
    addClientCheckIn, 
    addClientCoachNote,
    convertLeadToCustomer,
    setSelectedCustomerId,
    invoices,
    createInvoice,
    customDietPlans,
    saveCustomDietPlan,
    assignDietPlanToClient,
    dailyDietTrackingByClient,
    setActiveSubtab,
    currentRole
  } = useAdmin();

  const [currentId, setCurrentId] = useState<string>(customerId);

  useEffect(() => {
    if (customerId) {
      setCurrentId(customerId);
    }
  }, [customerId]);

  // Resolve client from customers OR synthesized from leads
  const existingCustomer = (customers || []).find(
    c => c.id === currentId || 
         (c.convertedFromLeadId && c.convertedFromLeadId === currentId) ||
         (c.convertedFromLeadId && `cust_${c.convertedFromLeadId.replace('lead_', '')}` === currentId) ||
         ((c.email && currentId.includes('@')) && c.email.toLowerCase() === currentId.toLowerCase())
  );

  const matchingLead = !existingCustomer ? (leads || []).find(
    l => l.id === currentId || 
         `cust_${l.id.replace('lead_', '')}` === currentId ||
         l.id === currentId.replace('cust_', 'lead_') ||
         (l.email && currentId.includes('@') && l.email.toLowerCase() === currentId.toLowerCase())
  ) : null;

  const isLeadView = Boolean(!existingCustomer && matchingLead);

  const client: Customer | undefined = existingCustomer || (matchingLead ? (() => {
    const pkgName = matchingLead.packageName || matchingLead.challengeInterest || PACKAGE_CATALOG[0].name;
    const matchedOpt = findPackageOption(pkgName);
    const sDate = matchingLead.createdAt ? matchingLead.createdAt.split('T')[0] : getLocalDateString();
    const eDate = calculateEndDateFromPackage(sDate, pkgName);
    return {
      id: `cust_${matchingLead.id.replace('lead_', '')}`,
      name: matchingLead.name || 'Client Lead',
      email: matchingLead.email || 'client@fitnetheist.com',
      phone: matchingLead.phone || '',
      avatarUrl: matchingLead.sex === 'female' 
        ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      joinedDate: sDate,
      totalSpent: matchingLead.estimatedValue || matchedOpt?.priceINR || 8500,
      status: matchingLead.status === 'CONVERTED' ? 'ACTIVE' : 'ONBOARDING',
      programTier: pkgName,
      packageName: pkgName,
      packageCategory: matchingLead.packageCategory || matchedOpt?.category || 'Official Coaching Plan',
      packagePrice: matchingLead.estimatedValue || matchedOpt?.priceINR || 8500,
      assignedCoach: matchingLead.assignedTo && matchingLead.assignedTo !== 'Unassigned' ? matchingLead.assignedTo : 'Coach Neetu (Head Coach)',
      startDate: sDate,
      endDate: eDate,
      age: matchingLead.age || 28,
      gender: matchingLead.sex === 'female' ? 'FEMALE' : 'MALE',
      city: 'India',
      emergencyContact: '',
      heightCm: matchingLead.heightCm || 175,
      startingWeightKg: matchingLead.weightKg || 75,
      currentWeightKg: matchingLead.weightKg || 75,
      targetWeightKg: matchingLead.goal === 'LOSE_WEIGHT' ? (matchingLead.weightKg || 75) - 6 : (matchingLead.weightKg || 75) + 4,
      targetDate: '',
      injuriesOrMedicalConditions: 'Disclosed via CRM Intake',
      dietGoal: (matchingLead.goal as any) || 'BUILD_MUSCLE',
      dietType: (matchingLead.dietType as any) || 'VEGETARIAN',
      dailyCalories: matchingLead.calculatedCalories || 2150,
      proteinGrams: Math.round((matchingLead.weightKg || 75) * 2),
      carbsGrams: Math.round(((matchingLead.calculatedCalories || 2150) * 0.45) / 4),
      fatsGrams: Math.round(((matchingLead.calculatedCalories || 2150) * 0.25) / 9),
      waterLitres: 3.5,
      mealsPerDay: matchingLead.dietPreferences?.mealsPerDay || 4,
      allergiesOrRestrictions: matchingLead.dietPreferences?.restrictions?.join(', ') || 'None reported',
      cheatMealProtocol: '1 clean cheat meal weekly',
      workoutSplit: matchingLead.workoutPreferences?.daysPerWeek === 4 ? '4-Day Upper / Lower' : 'Push / Pull / Legs 6-Day',
      trainingDaysPerWeek: matchingLead.workoutPreferences?.daysPerWeek || 4,
      experienceLevel: (matchingLead.workoutPreferences?.experience as any) || 'INTERMEDIATE',
      cardioProtocol: '8,500 daily steps',
      strengthBenchmarks: { benchPressKg: 70, squatKg: 90, deadliftKg: 120, overheadPressKg: 40 },
      streakDays: 1,
      lastActivity: 'Active CRM Inquiry',
      orderIds: [],
      convertedFromLeadId: matchingLead.id,
      checkIns: [],
      coachNotes: Array.isArray(matchingLead.notes) ? matchingLead.notes.map((n: any, idx: number) => ({
        id: `cn_${idx}`,
        createdAt: n.createdAt || n.timestamp || new Date().toISOString(),
        author: n.author || 'Coach Neetu',
        type: 'GENERAL' as const,
        content: n.content || n.text || ''
      })) : []
    };
  })() : undefined);

  const [activeProfileTab, setActiveProfileTab] = useState<'BIOMETRICS' | 'NUTRITION' | 'WORKOUT' | 'CHECKINS' | 'NOTES' | 'INVOICES'>('BIOMETRICS');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isCreateInvoiceModalOpen, setIsCreateInvoiceModalOpen] = useState(false);
  const [selectedDietToAssignId, setSelectedDietToAssignId] = useState<string>('');
  const [convertSuccessMsg, setConvertSuccessMsg] = useState<string | null>(null);

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

  // Create Invoice Modal Form State
  const [invNumber, setInvNumber] = useState('');
  const [invDate, setInvDate] = useState(getLocalDateString());
  const [invPackageDesc, setInvPackageDesc] = useState('');
  const [invAmount, setInvAmount] = useState<number>(8500);
  const [invDiscount, setInvDiscount] = useState<number>(0);
  const [invTaxRate, setInvTaxRate] = useState<number>(0);
  const [invPaymentStatus, setInvPaymentStatus] = useState<'PAID' | 'PARTIALLY_PAID' | 'UNPAID'>('PAID');
  const [invAmountPaid, setInvAmountPaid] = useState<number>(8500);
  const [invPaymentMethod, setInvPaymentMethod] = useState<'UPI' | 'RAZORPAY' | 'BANK_TRANSFER' | 'CREDIT_DEBIT_CARD' | 'CASH'>('UPI');
  const [invNotes, setInvNotes] = useState('');

  // Add Diet Popup Form State (All fields optional / approx calories)
  const [isAddDietModalOpen, setIsAddDietModalOpen] = useState(false);
  const [dietPlanName, setDietPlanName] = useState('');
  const [dietType, setDietType] = useState<DietType>('VEGETARIAN');
  const [dietTargetCalories, setDietTargetCalories] = useState<number | ''>('');
  const [dietCoachNotes, setDietCoachNotes] = useState('');
  const [selectedWeeklyDays, setSelectedWeeklyDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
  const [scheduleNotes, setScheduleNotes] = useState('');
  const [mealsCountPreset, setMealsCountPreset] = useState<3 | 4>(4);

  interface ModalDietItem {
    id: string;
    name: string;
    approxCalories: number | '';
    serving: string;
    protein?: number | '';
    carbs?: number | '';
    fat?: number | '';
  }

  interface ModalDietMeal {
    id: string;
    name: string;
    category: MealCategory;
    scheduledTime: string;
    items: ModalDietItem[];
  }

  const [activeModalDay, setActiveModalDay] = useState<string>('Mon');
  const [weeklyMealsByDay, setWeeklyMealsByDay] = useState<Record<string, ModalDietMeal[]>>({
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: []
  });
  const [dishSearchQueries, setDishSearchQueries] = useState<Record<string, string>>({});
  const [viewingProfileDietDay, setViewingProfileDietDay] = useState<string>(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[new Date().getDay()] || 'Mon';
  });

  // Active day meals in the popup
  const modalMeals = weeklyMealsByDay[activeModalDay] || [];

  // Categorized food items for dropdown selection
  const categorizedFoods = React.useMemo(() => {
    const breakfast = FOOD_DATABASE.filter(f => f.mealCategory === 'BREAKFAST');
    const lunch = FOOD_DATABASE.filter(f => f.mealCategory === 'LUNCH');
    const snack = FOOD_DATABASE.filter(f => f.mealCategory === 'SNACK');
    const dinner = FOOD_DATABASE.filter(f => f.mealCategory === 'DINNER');
    const highProteinVeg = FOOD_DATABASE.filter(f => (f.dietType === 'VEGETARIAN' || f.dietType === 'VEGAN') && (f.protein || 0) >= 12);
    const highProteinNonVeg = FOOD_DATABASE.filter(f => f.dietType === 'NON-VEGETARIAN' && (f.protein || 0) >= 20);
    return {
      breakfast,
      lunch,
      snack,
      dinner,
      highProteinVeg,
      highProteinNonVeg
    };
  }, []);

  if (!client) {
    return (
      <div className="p-8 text-center bg-[#0e0e12] border border-white/10 rounded-sm font-mono-num">
        <AlertCircle size={32} className="mx-auto text-amber-400 mb-3" />
        <h3 className="text-lg font-bold text-white uppercase font-display">Client Profile Not Found</h3>
        <p className="text-zinc-400 text-xs mt-1">The requested client record may have been removed or merged.</p>
        
        <div className="mt-4 max-w-xs mx-auto">
          <select
            defaultValue=""
            onChange={(e) => {
              if (e.target.value) {
                setCurrentId(e.target.value);
                setSelectedCustomerId(e.target.value);
              }
            }}
            className="w-full bg-zinc-900 border border-[#FFC515]/40 text-[#FFC515] font-bold p-2 text-xs rounded-sm focus:outline-none"
          >
            <option value="" disabled>⚡ Pick Client from CRM...</option>
            <optgroup label="Enrolled Customers">
              {(customers || []).map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.email})
                </option>
              ))}
            </optgroup>
            <optgroup label="Active Leads">
              {(leads || []).map(l => (
                <option key={l.id} value={l.id}>
                  {l.name} ({l.email || l.goal})
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold uppercase text-xs rounded-sm inline-flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to Client Roster
        </button>
      </div>
    );
  }

  // Package & Subscription details
  const pkgName = client.packageName || client.programTier || PACKAGE_CATALOG[0].name;
  const matchedPkgOpt = findPackageOption(pkgName);
  const pkgCategory = client.packageCategory || matchedPkgOpt?.category || 'Official Coaching Plan';
  const pkgPrice = client.packagePrice || client.totalSpent || matchedPkgOpt?.price || 8000;
  const subInfo = getSubscriptionStatusInfo(client.startDate, client.endDate);

  // Calculate weight progress metrics
  const startingWt = client.startingWeightKg || client.currentWeightKg || 75;
  const currentWt = client.currentWeightKg || startingWt;
  const targetWt = client.targetWeightKg || startingWt;
  const totalChangeKg = currentWt - startingWt;
  const totalDistanceToCover = Math.abs(targetWt - startingWt);
  const distanceCovered = Math.abs(currentWt - startingWt);
  const progressPercent = totalDistanceToCover > 0 ? Math.min(Math.round((distanceCovered / totalDistanceToCover) * 100), 100) : 100;

  // Calculate BMI
  const heightM = (client.heightCm || 175) / 100;
  const bmi = heightM > 0 ? (currentWt / (heightM * heightM)).toFixed(1) : '22.0';

  // Client's linked invoices
  const clientInvoices = (invoices || []).filter(
    inv =>
      inv.clientId === client.id ||
      (inv.clientEmail && inv.clientEmail.toLowerCase() === client.email.toLowerCase()) || 
      (inv.clientName && inv.clientName.toLowerCase() === client.name.toLowerCase())
  );

  const totalBilledAmount = clientInvoices.reduce((s, inv) => s + (inv.totalAmount || 0), 0);
  const totalPaidAmount = clientInvoices.reduce((s, inv) => {
    if (typeof inv.amountPaid === 'number') return s + inv.amountPaid;
    return s + (inv.status === 'PAID' ? inv.totalAmount : 0);
  }, 0);
  const totalOutstandingAmount = Math.max(0, totalBilledAmount - totalPaidAmount);
  const overallPaymentStatus =
    clientInvoices.length === 0
      ? 'PAID'
      : totalOutstandingAmount <= 0
        ? 'PAID'
        : totalPaidAmount > 0
          ? 'PARTIALLY PAID'
          : 'UNPAID';

  // Generate unique non-duplicate invoice number & open modal
  const handleOpenCreateInvoiceModal = () => {
    const todayCompact = getLocalDateString().replace(/-/g, '');
    const existingNums = new Set((invoices || []).map(i => i.invoiceNumber));
    let candidate = '';
    do {
      const rand4 = Math.floor(1000 + Math.random() * 9000);
      candidate = `INV-${todayCompact}-${rand4}`;
    } while (existingNums.has(candidate));

    setInvNumber(candidate);
    setInvDate(getLocalDateString());
    setInvPackageDesc(pkgName);
    setInvAmount(pkgPrice);
    setInvDiscount(0);
    setInvTaxRate(0);
    setInvPaymentStatus('PAID');
    setInvAmountPaid(pkgPrice);
    setInvPaymentMethod('UPI');
    setInvNotes(`Subscription Period: ${client.startDate || getLocalDateString()} to ${client.endDate || 'N/A'}`);
    setIsCreateInvoiceModalOpen(true);
  };

  // Auto-calculated invoice totals
  const invTaxableBase = Math.max(0, (Number(invAmount) || 0) - (Number(invDiscount) || 0));
  const invTaxAmount = Math.round(invTaxableBase * ((Number(invTaxRate) || 0) / 100));
  const invFinalPayable = invTaxableBase + invTaxAmount;
  const effectiveAmountPaid =
    invPaymentStatus === 'PAID'
      ? invFinalPayable
      : invPaymentStatus === 'UNPAID'
        ? 0
        : Math.min(invFinalPayable, Math.max(0, Number(invAmountPaid) || 0));
  const invOutstandingBalance = Math.max(0, invFinalPayable - effectiveAmountPaid);

  const handleCreateClientInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInv: Invoice = {
      id: `inv_${Date.now()}`,
      invoiceNumber: invNumber,
      issueDate: invDate,
      dueDate: invDate,
      type: invTaxRate > 0 ? 'TAX_INVOICE' : 'BILL_OF_SUPPLY',
      status: invPaymentStatus,
      clientId: client.id,
      clientName: client.name,
      clientEmail: client.email,
      clientPhone: client.phone || '+91 98000 00000',
      clientAddress: client.city || 'India',
      packageName: invPackageDesc || pkgName,
      businessName: 'FITNETHEIST COACHING STUDIO',
      businessAddress: 'Mumbai, Maharashtra, India',
      businessEmail: 'support@fitnetheist.com',
      businessPhone: '+91 98200 11223',
      items: [
        {
          id: `li_${Date.now()}`,
          description: invPackageDesc || pkgName,
          category: pkgCategory,
          quantity: 1,
          unitPrice: Number(invAmount) || 0,
          discountAmount: Number(invDiscount) || 0,
          taxRatePercent: Number(invTaxRate) || 0,
          total: invFinalPayable
        }
      ],
      subtotal: Number(invAmount) || 0,
      discountTotal: Number(invDiscount) || 0,
      taxTotal: invTaxAmount,
      totalAmount: invFinalPayable,
      amountPaid: effectiveAmountPaid,
      outstandingBalance: invOutstandingBalance,
      currency: 'INR',
      paymentMethod: invPaymentMethod,
      notes: invNotes.trim() || `Coaching Package: ${invPackageDesc}`,
      createdAt: new Date().toISOString()
    };

    createInvoice(newInv);
    updateCustomer(client.id, {
      totalSpent: (client.totalSpent || 0) + effectiveAmountPaid
    });
    setIsCreateInvoiceModalOpen(false);
    setActiveProfileTab('INVOICES');
    setConvertSuccessMsg(`Invoice ${newInv.invoiceNumber} (₹${invFinalPayable.toLocaleString('en-IN')}) created & saved!`);
    setTimeout(() => setConvertSuccessMsg(null), 4000);
  };

  // WhatsApp click handler
  const handleDirectWhatsApp = () => {
    const rawPhone = (client.phone || '').replace(/[^0-9]/g, '');
    const cleanPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;
    const msg = encodeURIComponent(
      `Hey ${client.name}! Coach ${client.assignedCoach.split(' ')[1] || 'Neetu'} here from FitneTheist. Checking in on your ${pkgName} nutrition and workout protocol today! How are you feeling?`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  // Submit Check-in
  const handleCheckInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addClientCheckIn(client.id, {
      date: getLocalDateString(),
      weightKg: Number(checkInWeight),
      waistCircumferenceCm: checkInWaist ? Number(checkInWaist) : undefined,
      bodyFatPercent: checkInBodyFat ? Number(checkInBodyFat) : undefined,
      adherenceScore: Number(checkInAdherence),
      clientNotes: checkInNotes.trim() || 'Weekly check-in logged by client/coach.',
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

  // Quick presets for fast 1-click addition to any meal
  const QUICK_FOOD_PRESETS = [
    { name: 'Moong Dal Chilla + Low-Fat Paneer', approxCalories: 320, serving: '2 chillas + 50g paneer', protein: 24, carbs: 36, fat: 8 },
    { name: 'Oats with Scoop Whey & Almonds', approxCalories: 360, serving: '1 bowl (50g oats + 1 scoop)', protein: 28, carbs: 45, fat: 6 },
    { name: '2 Phulkas + Dal Tadka + Paneer Bhurji', approxCalories: 480, serving: '1 plate', protein: 28, carbs: 56, fat: 14 },
    { name: '150g Grilled Chicken Breast + Brown Rice', approxCalories: 450, serving: '1 bowl', protein: 38, carbs: 52, fat: 7 },
    { name: 'Greek Yogurt + Berries & Chia Seeds', approxCalories: 180, serving: '1 cup (150g)', protein: 18, carbs: 18, fat: 2 },
    { name: '3 Whole Boiled Eggs + 2 Multigrain Toast', approxCalories: 310, serving: '1 plate', protein: 22, carbs: 26, fat: 12 },
    { name: 'Whey Protein Isolate Shake (in water)', approxCalories: 130, serving: '1 scoop (30g)', protein: 26, carbs: 2, fat: 1 },
    { name: 'Roasted Makhana + Green Tea', approxCalories: 120, serving: '1 bowl (30g)', protein: 4, carbs: 22, fat: 1 },
    { name: 'Clear Veg Soup + Stir-fried Tofu Bowl', approxCalories: 350, serving: '1 large bowl', protein: 24, carbs: 22, fat: 12 },
    { name: 'Soya Chunks Curry + 1 Roti + Salad', approxCalories: 390, serving: '1 plate', protein: 32, carbs: 42, fat: 8 },
    { name: 'Tandoori Chicken Breast + Mint Dip', approxCalories: 280, serving: '180g cooked', protein: 44, carbs: 3, fat: 7 },
    { name: 'Steamed Idlis (3) + Sambar Bowl', approxCalories: 240, serving: '3 idlis + 1 bowl', protein: 8, carbs: 48, fat: 2 },
    { name: 'Besan Chilla + Steamed Sprouts', approxCalories: 320, serving: '2 chillas + 1 katori', protein: 20, carbs: 42, fat: 6 },
    { name: 'Quinoa & Mixed Veg Khichdi', approxCalories: 310, serving: '1 bowl', protein: 12, carbs: 54, fat: 4 },
    { name: 'Salmon Fillet + Tossed Greens', approxCalories: 340, serving: '150g fillet', protein: 34, carbs: 4, fat: 12 }
  ];

  const WEEK_DAYS = [
    { id: 'Mon', label: 'Mon', full: 'Monday' },
    { id: 'Tue', label: 'Tue', full: 'Tuesday' },
    { id: 'Wed', label: 'Wed', full: 'Wednesday' },
    { id: 'Thu', label: 'Thu', full: 'Thursday' },
    { id: 'Fri', label: 'Fri', full: 'Friday' },
    { id: 'Sat', label: 'Sat', full: 'Saturday' },
    { id: 'Sun', label: 'Sun', full: 'Sunday' }
  ];

  // Builds a calibrated 7-day variation where every single day has distinct, nutritious meals
  const buildDefault7DayMeals = (dType: DietType, mealsCount: 3 | 4): Record<string, ModalDietMeal[]> => {
    const isNonVeg = dType === 'NON-VEGETARIAN';

    const rawPlan: Record<string, { b: ModalDietItem[]; l: ModalDietItem[]; s: ModalDietItem[]; d: ModalDietItem[] }> = {
      Mon: {
        b: isNonVeg
          ? [
              { id: 'm_nb1', name: '3 Whole Eggs Scramble with Spinach', approxCalories: 240, serving: '3 farm eggs', protein: 20, carbs: 3, fat: 16 },
              { id: 'm_nb2', name: 'Sourdough or Multigrain Toast', approxCalories: 160, serving: '2 slices', protein: 6, carbs: 30, fat: 2 }
            ]
          : [
              { id: 'm_b1', name: 'Moong Dal Chilla with Mint Chutney', approxCalories: 260, serving: '2 chillas (120g)', protein: 16, carbs: 34, fat: 5 },
              { id: 'm_b2', name: 'Low-Fat Paneer Cubes / Bhurji', approxCalories: 150, serving: '60g', protein: 14, carbs: 2, fat: 9 }
            ],
        l: isNonVeg
          ? [
              { id: 'm_nl1', name: '150g Grilled Chicken Breast with Herbs', approxCalories: 240, serving: '150g', protein: 38, carbs: 0, fat: 5 },
              { id: 'm_nl2', name: 'Steamed Brown Rice / Quinoa', approxCalories: 180, serving: '1 cup (130g)', protein: 4, carbs: 38, fat: 2 },
              { id: 'm_nl3', name: 'Fresh Green Garden Salad', approxCalories: 40, serving: '1 bowl', protein: 1, carbs: 6, fat: 1 }
            ]
          : [
              { id: 'm_l1', name: '2 Multigrain Phulkas (No Oil)', approxCalories: 160, serving: '2 rotis', protein: 6, carbs: 32, fat: 1 },
              { id: 'm_l2', name: 'Yellow Moong Dal Tadka', approxCalories: 140, serving: '1 katori (150g)', protein: 9, carbs: 20, fat: 3 },
              { id: 'm_l3', name: 'Paneer Shimlamirch Subzi', approxCalories: 210, serving: '1 bowl (120g)', protein: 16, carbs: 8, fat: 13 },
              { id: 'm_l4', name: 'Fresh Cucumber Tomato Salad', approxCalories: 35, serving: '1 plate', protein: 1, carbs: 7, fat: 0 }
            ],
        s: isNonVeg
          ? [
              { id: 'm_ns1', name: 'Whey Protein Isolate Shake in Water', approxCalories: 130, serving: '1 scoop (30g)', protein: 26, carbs: 2, fat: 1 },
              { id: 'm_ns2', name: 'Roasted Almonds', approxCalories: 80, serving: '10-12 almonds', protein: 3, carbs: 3, fat: 7 }
            ]
          : [
              { id: 'm_s1', name: 'Roasted Spiced Makhana', approxCalories: 110, serving: '1 medium bowl (30g)', protein: 3, carbs: 20, fat: 1 },
              { id: 'm_s2', name: 'Green Tea or Black Coffee', approxCalories: 5, serving: '1 cup', protein: 0, carbs: 1, fat: 0 }
            ],
        d: isNonVeg
          ? [
              { id: 'm_nd1', name: 'Grilled Fish Tikka or Chicken Skewers', approxCalories: 220, serving: '150g', protein: 34, carbs: 2, fat: 6 },
              { id: 'm_nd2', name: 'Stir-Fried Broccoli & Zucchini', approxCalories: 90, serving: '1 plate', protein: 4, carbs: 12, fat: 3 }
            ]
          : [
              { id: 'm_d1', name: 'Clear Vegetable & Herb Soup', approxCalories: 70, serving: '1 large bowl', protein: 2, carbs: 12, fat: 1 },
              { id: 'm_d2', name: 'Grilled Low-Fat Paneer / Tofu Sauté', approxCalories: 250, serving: '140g portion', protein: 24, carbs: 6, fat: 14 }
            ]
      },
      Tue: {
        b: isNonVeg
          ? [
              { id: 't_nb1', name: 'Spiced Egg White Bhurji (5 Whites + 1 Whole)', approxCalories: 210, serving: '1 plate', protein: 24, carbs: 4, fat: 7 },
              { id: 't_nb2', name: 'Multigrain Roti or Toast', approxCalories: 150, serving: '2 slices / 1 roti', protein: 5, carbs: 28, fat: 2 }
            ]
          : [
              { id: 't_b1', name: 'Besan Chilla with Grated Veggies', approxCalories: 240, serving: '2 chillas (110g)', protein: 14, carbs: 32, fat: 6 },
              { id: 't_b2', name: 'Steamed Moong Sprouts Salad', approxCalories: 120, serving: '1 katori (80g)', protein: 10, carbs: 18, fat: 1 }
            ],
        l: isNonVeg
          ? [
              { id: 't_nl1', name: 'Chicken & Bell Pepper Rice Bowl', approxCalories: 460, serving: '150g chicken + 1 cup rice', protein: 36, carbs: 50, fat: 8 },
              { id: 't_nl2', name: 'Low-Fat Cucumber Mint Raita', approxCalories: 60, serving: '1 katori', protein: 4, carbs: 5, fat: 2 }
            ]
          : [
              { id: 't_l1', name: 'Steamed Jeera Rice', approxCalories: 170, serving: '1 cup', protein: 4, carbs: 36, fat: 1 },
              { id: 't_l2', name: 'Soya Chunks Curry (High Protein)', approxCalories: 240, serving: '50g soya chunks (dry wt)', protein: 26, carbs: 18, fat: 4 },
              { id: 't_l3', name: 'Curd / Plain Greek Yogurt', approxCalories: 90, serving: '1 katori (100g)', protein: 6, carbs: 5, fat: 4 },
              { id: 't_l4', name: 'Kachumber Salad', approxCalories: 30, serving: '1 bowl', protein: 1, carbs: 6, fat: 0 }
            ],
        s: isNonVeg
          ? [
              { id: 't_ns1', name: '4 Boiled Egg Whites with Chaat Masala', approxCalories: 70, serving: '4 whites', protein: 16, carbs: 1, fat: 0 },
              { id: 't_ns2', name: 'Lemon Green Tea', approxCalories: 5, serving: '1 cup', protein: 0, carbs: 1, fat: 0 }
            ]
          : [
              { id: 't_s1', name: 'Plain Greek Yogurt with Fresh Berries', approxCalories: 140, serving: '1 cup (150g)', protein: 15, carbs: 14, fat: 1 },
              { id: 't_s2', name: 'Chia Seeds', approxCalories: 45, serving: '1 tsp', protein: 2, carbs: 3, fat: 3 }
            ],
        d: isNonVeg
          ? [
              { id: 't_nd1', name: 'Herb Baked Chicken Breast', approxCalories: 230, serving: '160g', protein: 38, carbs: 1, fat: 5 },
              { id: 't_nd2', name: 'Steamed Broccoli, Carrots & Green Beans', approxCalories: 85, serving: '1 large bowl', protein: 4, carbs: 14, fat: 1 }
            ]
          : [
              { id: 't_d1', name: 'Palak Paneer (Low-Oil)', approxCalories: 260, serving: '1 bowl (140g paneer)', protein: 22, carbs: 8, fat: 15 },
              { id: 't_d2', name: '1 Jowar / Multigrain Phulka', approxCalories: 90, serving: '1 roti', protein: 3, carbs: 18, fat: 1 }
            ]
      },
      Wed: {
        b: isNonVeg
          ? [
              { id: 'w_nb1', name: 'Smoked Turkey & 3 Eggs Scramble', approxCalories: 340, serving: '3 eggs + 50g turkey', protein: 32, carbs: 3, fat: 18 },
              { id: 'w_nb2', name: 'Whole Wheat Toast with 1 tsp Peanut Butter', approxCalories: 150, serving: '1 slice', protein: 6, carbs: 16, fat: 7 }
            ]
          : [
              { id: 'w_b1', name: 'Rolled Oats with Almond Milk & Whey', approxCalories: 330, serving: '40g oats + 1 scoop whey', protein: 28, carbs: 40, fat: 5 },
              { id: 'w_b2', name: 'Crushed Almonds & Cinnamon', approxCalories: 60, serving: '8 almonds', protein: 2, carbs: 2, fat: 5 }
            ],
        l: isNonVeg
          ? [
              { id: 'w_nl1', name: 'Salmon / White Fish Bowl with Rice', approxCalories: 440, serving: '140g fish + 1 cup rice', protein: 34, carbs: 42, fat: 11 },
              { id: 'w_nl2', name: 'Lemon Herb Tossed Greens', approxCalories: 40, serving: '1 plate', protein: 1, carbs: 6, fat: 1 }
            ]
          : [
              { id: 'w_l1', name: '2 Phulkas (Multigrain)', approxCalories: 160, serving: '2 rotis', protein: 6, carbs: 32, fat: 1 },
              { id: 'w_l2', name: 'Slow-Cooked Rajma Masala', approxCalories: 220, serving: '1 big katori (180g)', protein: 14, carbs: 34, fat: 3 },
              { id: 'w_l3', name: 'Low-Fat Dahi / Curd', approxCalories: 80, serving: '1 katori (100g)', protein: 5, carbs: 5, fat: 3 },
              { id: 'w_l4', name: 'Tomato Cucumber Onion Salad', approxCalories: 35, serving: '1 bowl', protein: 1, carbs: 7, fat: 0 }
            ],
        s: isNonVeg
          ? [
              { id: 'w_ns1', name: 'Protein Bar or Whey Shake', approxCalories: 170, serving: '1 bar / scoop', protein: 20, carbs: 14, fat: 3 },
              { id: 'w_ns2', name: 'Black Coffee with Stevia', approxCalories: 5, serving: '1 cup', protein: 0, carbs: 1, fat: 0 }
            ]
          : [
              { id: 'w_s1', name: 'Roasted Chana with Lemon Drops', approxCalories: 130, serving: '40g', protein: 8, carbs: 20, fat: 2 },
              { id: 'w_s2', name: 'Fresh Mint Buttermilk (Chaas)', approxCalories: 45, serving: '1 tall glass (250ml)', protein: 3, carbs: 4, fat: 1 }
            ],
        d: isNonVeg
          ? [
              { id: 'w_nd1', name: 'Grilled Lemon Herb Chicken Breast', approxCalories: 250, serving: '160g', protein: 40, carbs: 2, fat: 6 },
              { id: 'w_nd2', name: 'Sautéed Zucchini, Bell Peppers & Mushrooms', approxCalories: 95, serving: '1 bowl', protein: 4, carbs: 14, fat: 2 }
            ]
          : [
              { id: 'w_d1', name: 'Tofu & Vegetable Stir-Fry in Soy Garlic', approxCalories: 260, serving: '150g tofu + exotic veggies', protein: 22, carbs: 12, fat: 12 },
              { id: 'w_d2', name: 'Clear Veg Broth', approxCalories: 50, serving: '1 bowl', protein: 1, carbs: 8, fat: 1 }
            ]
      },
      Thu: {
        b: isNonVeg
          ? [
              { id: 'th_nb1', name: '3 Whole Boiled Eggs + Fresh Papaya Bowl', approxCalories: 280, serving: '3 eggs + 120g papaya', protein: 20, carbs: 18, fat: 14 },
              { id: 'th_nb2', name: '1 Slice Whole Wheat Toast', approxCalories: 80, serving: '1 slice', protein: 3, carbs: 15, fat: 1 }
            ]
          : [
              { id: 'th_b1', name: 'Vegetable Poha with Roasted Peanuts', approxCalories: 260, serving: '1 plate (150g)', protein: 7, carbs: 44, fat: 7 },
              { id: 'th_b2', name: 'Boiled Sprouts with Lemon & Onion', approxCalories: 110, serving: '1 small katori (70g)', protein: 9, carbs: 16, fat: 1 }
            ],
        l: isNonVeg
          ? [
              { id: 'th_nl1', name: 'Lean Chicken Keema (Home-Style, Low Oil)', approxCalories: 280, serving: '160g cooked', protein: 36, carbs: 6, fat: 10 },
              { id: 'th_nl2', name: '2 Multigrain Rotis + Sliced Onions & Mint', approxCalories: 170, serving: '2 rotis', protein: 6, carbs: 34, fat: 1 }
            ]
          : [
              { id: 'th_l1', name: 'Quinoa & Mixed Vegetable Khichdi', approxCalories: 310, serving: '1 large bowl', protein: 12, carbs: 54, fat: 4 },
              { id: 'th_l2', name: 'Low-Fat Curd (Dahi) with Roasted Jeera', approxCalories: 90, serving: '1 katori (100g)', protein: 6, carbs: 5, fat: 4 }
            ],
        s: isNonVeg
          ? [
              { id: 'th_ns1', name: 'Whey Protein Shake + 4 Walnut Halves', approxCalories: 180, serving: '1 shake + walnuts', protein: 26, carbs: 4, fat: 7 }
            ]
          : [
              { id: 'th_s1', name: 'Crisp Green Apple Slices + 1 tbsp Peanut Butter', approxCalories: 160, serving: '1 apple + 15g PB', protein: 5, carbs: 22, fat: 8 },
              { id: 'th_s2', name: 'Herbal Green Tea', approxCalories: 5, serving: '1 mug', protein: 0, carbs: 1, fat: 0 }
            ],
        d: isNonVeg
          ? [
              { id: 'th_nd1', name: 'Pan-Seared White Fish Fillet', approxCalories: 210, serving: '180g', protein: 36, carbs: 1, fat: 5 },
              { id: 'th_nd2', name: 'Asparagus & Mushroom Garlic Sauté', approxCalories: 80, serving: '1 plate', protein: 4, carbs: 10, fat: 2 }
            ]
          : [
              { id: 'th_d1', name: 'Soya & Paneer Bhurji', approxCalories: 280, serving: '150g portion', protein: 28, carbs: 8, fat: 14 },
              { id: 'th_d2', name: '1 Multigrain Phulka + Clear Mushroom Soup', approxCalories: 130, serving: '1 roti + 1 bowl soup', protein: 5, carbs: 22, fat: 2 }
            ]
      },
      Fri: {
        b: isNonVeg
          ? [
              { id: 'f_nb1', name: '4 Egg White French Toast with Cinnamon & 1 Whole Egg', approxCalories: 290, serving: '2 slices + eggs', protein: 22, carbs: 30, fat: 7 }
            ]
          : [
              { id: 'f_b1', name: 'Low-Fat Paneer Bhurji with Onions & Tomato', approxCalories: 240, serving: '120g paneer', protein: 20, carbs: 6, fat: 14 },
              { id: 'f_b2', name: '2 Slices 100% Whole Wheat Toast', approxCalories: 150, serving: '2 slices', protein: 6, carbs: 28, fat: 2 }
            ],
        l: isNonVeg
          ? [
              { id: 'f_nl1', name: 'Tandoori / Grilled Chicken Tikka Breast', approxCalories: 250, serving: '160g', protein: 40, carbs: 3, fat: 6 },
              { id: 'f_nl2', name: 'Jeera Brown Rice + Mint Dip', approxCalories: 190, serving: '1 cup', protein: 5, carbs: 40, fat: 2 },
              { id: 'f_nl3', name: 'Kachumber Salad with Lemon', approxCalories: 35, serving: '1 bowl', protein: 1, carbs: 7, fat: 0 }
            ]
          : [
              { id: 'f_l1', name: '2 Phulkas (Soft Wheat / Jowar)', approxCalories: 160, serving: '2 rotis', protein: 6, carbs: 32, fat: 1 },
              { id: 'f_l2', name: 'Chole Masala (Chickpeas in Mild Gravy)', approxCalories: 230, serving: '1 katori (170g)', protein: 12, carbs: 36, fat: 4 },
              { id: 'f_l3', name: 'Fresh Mint Cucumber Raita', approxCalories: 70, serving: '1 small katori', protein: 4, carbs: 5, fat: 3 }
            ],
        s: isNonVeg
          ? [
              { id: 'f_ns1', name: '3 Hard Boiled Egg Whites + Green Tea', approxCalories: 55, serving: '3 whites', protein: 12, carbs: 1, fat: 0 },
              { id: 'f_ns2', name: 'Roasted Makhana', approxCalories: 90, serving: '25g', protein: 3, carbs: 16, fat: 1 }
            ]
          : [
              { id: 'f_s1', name: 'Spiced Buttermilk with Cumin', approxCalories: 40, serving: '250ml', protein: 3, carbs: 4, fat: 1 },
              { id: 'f_s2', name: 'Roasted Almonds & Pumpkin Seeds', approxCalories: 110, serving: '20g mix', protein: 4, carbs: 3, fat: 9 }
            ],
        d: isNonVeg
          ? [
              { id: 'f_nd1', name: 'Chicken Clear Soup with Shredded Meat', approxCalories: 130, serving: '1 big bowl', protein: 22, carbs: 4, fat: 2 },
              { id: 'f_nd2', name: 'Grilled Chicken Skewers with Bell Peppers', approxCalories: 210, serving: '140g chicken', protein: 32, carbs: 4, fat: 5 }
            ]
          : [
              { id: 'f_d1', name: 'Stir-Fried Broccoli, Mushrooms & Soya Chunks', approxCalories: 240, serving: '1 large bowl', protein: 24, carbs: 16, fat: 6 },
              { id: 'f_d2', name: 'Clear Vegetable Soup with Black Pepper', approxCalories: 60, serving: '1 bowl', protein: 2, carbs: 10, fat: 1 }
            ]
      },
      Sat: {
        b: isNonVeg
          ? [
              { id: 's_nb1', name: 'Smoked Salmon or Poached Eggs on Toast', approxCalories: 330, serving: '2 eggs + 1 toast + greens', protein: 24, carbs: 20, fat: 14 }
            ]
          : [
              { id: 's_b1', name: 'Steamed Idlis with Vegetable Sambar', approxCalories: 240, serving: '3 idlis + sambar bowl', protein: 8, carbs: 48, fat: 2 },
              { id: 's_b2', name: 'Coconut Chutney (Portion Controlled)', approxCalories: 70, serving: '2 tbsp', protein: 1, carbs: 2, fat: 6 }
            ],
        l: isNonVeg
          ? [
              { id: 's_nl1', name: 'Grilled Chicken Breast with Sweet Potato Mash', approxCalories: 430, serving: '160g chicken + 120g sweet potato', protein: 42, carbs: 36, fat: 7 },
              { id: 's_nl2', name: 'Fresh Avocado Garden Salad', approxCalories: 95, serving: '1 bowl', protein: 2, carbs: 6, fat: 7 }
            ]
          : [
              { id: 's_l1', name: 'Jeera Brown Rice with Dal Fry', approxCalories: 290, serving: '1 plate', protein: 11, carbs: 54, fat: 4 },
              { id: 's_l2', name: 'Paneer Bhurji / Soya chunks Dry', approxCalories: 190, serving: '100g', protein: 16, carbs: 4, fat: 11 },
              { id: 's_l3', name: 'Cucumber Slices with Himalayan Salt', approxCalories: 25, serving: '1 plate', protein: 1, carbs: 5, fat: 0 }
            ],
        s: isNonVeg
          ? [
              { id: 's_ns1', name: 'Protein Cold Coffee with Whey', approxCalories: 140, serving: '1 tall glass', protein: 25, carbs: 4, fat: 2 }
            ]
          : [
              { id: 's_s1', name: 'Papaya & Pomegranate Bowl with Chia', approxCalories: 140, serving: '1 cup', protein: 3, carbs: 30, fat: 2 },
              { id: 's_s2', name: 'Warm Green Tea', approxCalories: 5, serving: '1 cup', protein: 0, carbs: 1, fat: 0 }
            ],
        d: isNonVeg
          ? [
              { id: 's_nd1', name: 'Tandoori Chicken (Skinless, 2 Breasts)', approxCalories: 280, serving: '180g', protein: 44, carbs: 4, fat: 7 },
              { id: 's_nd2', name: 'Mint Chutney + Grilled Onion Rings', approxCalories: 40, serving: '2 tbsp', protein: 1, carbs: 6, fat: 1 }
            ]
          : [
              { id: 's_d1', name: 'Baked Cottage Cheese (Paneer) Steak', approxCalories: 280, serving: '150g paneer with herbs', protein: 26, carbs: 6, fat: 16 },
              { id: 's_d2', name: 'Roasted Vegetables (Carrots, Beans, Bell Peppers)', approxCalories: 90, serving: '1 portion', protein: 3, carbs: 14, fat: 2 }
            ]
      },
      Sun: {
        b: isNonVeg
          ? [
              { id: 'su_nb1', name: 'Sunday 3-Egg Omelette with Mushrooms & Sourdough', approxCalories: 380, serving: '3 eggs + sourdough', protein: 26, carbs: 26, fat: 18 }
            ]
          : [
              { id: 'su_b1', name: 'High-Protein Banana Oat Pancakes with Whey', approxCalories: 340, serving: '3 small pancakes with whey', protein: 26, carbs: 48, fat: 6 },
              { id: 'su_b2', name: 'Fresh Berries & 1 tsp Honey', approxCalories: 50, serving: '1/2 cup', protein: 1, carbs: 12, fat: 0 }
            ],
        l: isNonVeg
          ? [
              { id: 'su_nl1', name: 'Home-Style Chicken Biryani (Portion Controlled)', approxCalories: 480, serving: '1 plate (150g chicken + 150g rice)', protein: 38, carbs: 54, fat: 12 },
              { id: 'su_nl2', name: 'Cooling Cucumber Mint Onion Raita', approxCalories: 70, serving: '1 katori', protein: 4, carbs: 6, fat: 3 }
            ]
          : [
              { id: 'su_l1', name: 'Sunday Wholesome Balanced Thali (2 Phulkas, Paneer, Dal, Curd, Salad)', approxCalories: 520, serving: '1 full plate', protein: 30, carbs: 62, fat: 16 }
            ],
        s: isNonVeg
          ? [
              { id: 'su_ns1', name: 'Whey Protein Smoothie with Ice & Berries', approxCalories: 150, serving: '1 large glass', protein: 26, carbs: 8, fat: 1 }
            ]
          : [
              { id: 'su_s1', name: 'Dark Chocolate (70%+) & Handful Almonds', approxCalories: 130, serving: '1 square + 10 almonds', protein: 3, carbs: 8, fat: 9 },
              { id: 'su_s2', name: 'Chamomile Tea', approxCalories: 5, serving: '1 mug', protein: 0, carbs: 1, fat: 0 }
            ],
        d: isNonVeg
          ? [
              { id: 'su_nd1', name: 'Light Chicken Clear Broth with Shredded Chicken', approxCalories: 220, serving: '1 large bowl (140g chicken)', protein: 32, carbs: 8, fat: 4 }
            ]
          : [
              { id: 'su_d1', name: 'Light Moong Dal Khichdi with 1 tsp Pure Desi Ghee', approxCalories: 280, serving: '1 bowl', protein: 10, carbs: 46, fat: 6 },
              { id: 'su_d2', name: 'Low-Fat Curd with Roasted Cumin', approxCalories: 80, serving: '1 katori', protein: 5, carbs: 5, fat: 3 }
            ]
      }
    };

    const result: Record<string, ModalDietMeal[]> = {};

    WEEK_DAYS.forEach(day => {
      const dayData = rawPlan[day.id] || rawPlan['Mon'];
      const meals: ModalDietMeal[] = [];

      // Breakfast
      meals.push({
        id: `meal_${day.id}_b`,
        name: 'Breakfast',
        category: 'BREAKFAST',
        scheduledTime: '08:30 AM',
        items: dayData.b
      });

      // Lunch
      meals.push({
        id: `meal_${day.id}_l`,
        name: 'Lunch',
        category: 'LUNCH',
        scheduledTime: '01:30 PM',
        items: dayData.l
      });

      // Snack (if 4 meals)
      if (mealsCount === 4) {
        meals.push({
          id: `meal_${day.id}_s`,
          name: 'Evening Snack',
          category: 'SNACK',
          scheduledTime: '05:30 PM',
          items: dayData.s
        });
      }

      // Dinner
      meals.push({
        id: `meal_${day.id}_d`,
        name: 'Dinner',
        category: 'DINNER',
        scheduledTime: '08:30 PM',
        items: dayData.d
      });

      result[day.id] = meals;
    });

    return result;
  };

  const normalizeDietType = (dt?: string): DietType => {
    if (!dt) return 'VEGETARIAN';
    if (dt === 'NON_VEGETARIAN' || dt === 'NON-VEGETARIAN' || dt === 'EGGETARIAN') return 'NON-VEGETARIAN';
    if (dt === 'VEGAN') return 'VEGAN';
    return 'VEGETARIAN';
  };

  const handleOpenAddDietModal = () => {
    if (!client) return;
    const currentAssigned = client.assignedDietPlan;
    if (currentAssigned && (currentAssigned.weeklySchedule || (currentAssigned.meals && currentAssigned.meals.length > 0))) {
      setDietPlanName(currentAssigned.name || `${client.name}'s Bespoke Protocol`);
      setDietType(currentAssigned.dietType || normalizeDietType(client.dietType));
      setDietTargetCalories(currentAssigned.targetDailyCalories || currentAssigned.targetCalories || client.dailyCalories || 1800);
      setDietCoachNotes(currentAssigned.coachNotes || 'Drink 3.5L water daily. Hydrate well.');
      setSelectedWeeklyDays(
        currentAssigned.applicableDays && currentAssigned.applicableDays.length > 0
          ? currentAssigned.applicableDays
          : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      );
      setMealsCountPreset(currentAssigned.meals.length === 3 ? 3 : 4);

      if (currentAssigned.weeklySchedule && Object.keys(currentAssigned.weeklySchedule).length > 0) {
        const loaded: Record<string, ModalDietMeal[]> = {};
        WEEK_DAYS.forEach(d => {
          const rawMeals = currentAssigned.weeklySchedule![d.id] || currentAssigned.meals || [];
          loaded[d.id] = rawMeals.map(m => ({
            id: m.id || `meal_${d.id}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            name: m.name,
            category: (m.category as any) || 'LUNCH',
            scheduledTime: m.scheduledTime || m.time || '12:00 PM',
            items: (m.items || []).map(i => ({
              id: i.id || `item_${d.id}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
              name: i.name,
              approxCalories: i.calories,
              serving: i.serving || '1 serving',
              protein: i.protein,
              carbs: i.carbs,
              fat: i.fat
            }))
          }));
        });
        setWeeklyMealsByDay(loaded);
      } else {
        const singleMeals: ModalDietMeal[] = currentAssigned.meals.map(m => ({
          id: m.id || `meal_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
          name: m.name,
          category: (m.category as any) || 'LUNCH',
          scheduledTime: m.scheduledTime || m.time || '12:00 PM',
          items: (m.items || []).map(i => ({
            id: i.id || `item_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            name: i.name,
            approxCalories: i.calories,
            serving: i.serving || '1 serving',
            protein: i.protein,
            carbs: i.carbs,
            fat: i.fat
          }))
        }));
        const initialMap: Record<string, ModalDietMeal[]> = {};
        WEEK_DAYS.forEach(d => {
          initialMap[d.id] = JSON.parse(JSON.stringify(singleMeals));
        });
        setWeeklyMealsByDay(initialMap);
      }
    } else {
      setDietPlanName(`${client.name}'s Tailored Nutrition Protocol`);
      const defaultType = normalizeDietType(client.dietType);
      setDietType(defaultType);
      setDietTargetCalories(client.dailyCalories || 1800);
      setDietCoachNotes('Drink 3.5L water daily. Weigh portions cooked when possible.');
      setSelectedWeeklyDays(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
      setScheduleNotes('All 7 Days (Mon - Sun) Custom Daily Protocol');
      setMealsCountPreset(4);

      // Generate complete 7 distinct days variation out of the box
      const generated = buildDefault7DayMeals(defaultType, 4);
      setWeeklyMealsByDay(generated);
    }
    setActiveModalDay('Mon');
    setIsAddDietModalOpen(true);
  };

  const handleToggleMealsPreset = (count: 3 | 4) => {
    setMealsCountPreset(count);
    setWeeklyMealsByDay(prev => {
      const next: Record<string, ModalDietMeal[]> = {};
      WEEK_DAYS.forEach(d => {
        const dayMeals = prev[d.id] || [];
        if (count === 3) {
          if (dayMeals.length >= 4) {
            const withoutSnack = dayMeals.filter(m => m.category !== 'SNACK');
            next[d.id] = withoutSnack.length >= 3 ? withoutSnack.slice(0, 3) : dayMeals.slice(0, 3);
          } else {
            next[d.id] = dayMeals;
          }
        } else if (count === 4) {
          if (dayMeals.length === 3) {
            const snackMeal: ModalDietMeal = {
              id: `meal_${d.id}_snk_${Date.now()}`,
              name: 'Evening Snack',
              category: 'SNACK',
              scheduledTime: '05:30 PM',
              items: [
                {
                  id: `item_${d.id}_snk1`,
                  name: 'Roasted Makhana / Greek Yogurt with Fruit',
                  approxCalories: 180,
                  serving: '1 bowl',
                  protein: 15,
                  carbs: 20,
                  fat: 3
                }
              ]
            };
            const updated = [...dayMeals];
            updated.splice(2, 0, snackMeal);
            next[d.id] = updated;
          } else {
            next[d.id] = dayMeals;
          }
        }
      });
      return next;
    });
  };

  const handleAddCustomMeal = () => {
    const current = weeklyMealsByDay[activeModalDay] || [];
    const nextIdx = current.length + 1;
    const newMeal: ModalDietMeal = {
      id: `meal_${activeModalDay}_${Date.now()}_${nextIdx}`,
      name: `Meal ${nextIdx}`,
      category: 'SNACK',
      scheduledTime: '04:00 PM',
      items: [
        {
          id: `item_${Date.now()}_init`,
          name: '',
          approxCalories: '',
          serving: '1 serving',
          protein: '',
          carbs: '',
          fat: ''
        }
      ]
    };
    setWeeklyMealsByDay(prev => ({
      ...prev,
      [activeModalDay]: [...current, newMeal]
    }));
  };

  const handleRemoveMeal = (mealId: string) => {
    const current = weeklyMealsByDay[activeModalDay] || [];
    if (current.length <= 1) return;
    setWeeklyMealsByDay(prev => ({
      ...prev,
      [activeModalDay]: current.filter(m => m.id !== mealId)
    }));
  };

  const handleUpdateMealHeader = (mealId: string, field: 'name' | 'scheduledTime', value: string) => {
    setWeeklyMealsByDay(prev => ({
      ...prev,
      [activeModalDay]: (prev[activeModalDay] || []).map(m =>
        m.id === mealId ? { ...m, [field]: value } : m
      )
    }));
  };

  const handleAddItemToMeal = (mealId: string, itemData?: Partial<ModalDietItem>) => {
    const newItem: ModalDietItem = {
      id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      name: itemData?.name || '',
      approxCalories: itemData?.approxCalories !== undefined ? itemData.approxCalories : '',
      serving: itemData?.serving || '1 serving',
      protein: itemData?.protein !== undefined ? itemData.protein : '',
      carbs: itemData?.carbs !== undefined ? itemData.carbs : '',
      fat: itemData?.fat !== undefined ? itemData.fat : ''
    };
    setWeeklyMealsByDay(prev => ({
      ...prev,
      [activeModalDay]: (prev[activeModalDay] || []).map(m =>
        m.id === mealId ? { ...m, items: [...m.items, newItem] } : m
      )
    }));
  };

  // Add a dish directly from the dropdown selector
  const handleAddDishFromSelector = (mealId: string, selectionValue: string) => {
    const foundFood = FOOD_DATABASE.find(f => f.id === selectionValue);
    if (foundFood) {
      handleAddItemToMeal(mealId, {
        name: foundFood.name,
        approxCalories: foundFood.calories,
        serving: foundFood.serving || `${foundFood.servingGrams || 100}g`,
        protein: foundFood.protein,
        carbs: foundFood.carbs,
        fat: foundFood.fat
      });
      return;
    }
    const foundPreset = QUICK_FOOD_PRESETS.find(p => p.name === selectionValue);
    if (foundPreset) {
      handleAddItemToMeal(mealId, {
        name: foundPreset.name,
        approxCalories: foundPreset.approxCalories,
        serving: foundPreset.serving,
        protein: foundPreset.protein,
        carbs: foundPreset.carbs,
        fat: foundPreset.fat
      });
      return;
    }
    handleAddItemToMeal(mealId, {
      name: selectionValue,
      approxCalories: 250,
      serving: '1 serving'
    });
  };

  const handleUpdateMealItem = (mealId: string, itemId: string, field: keyof ModalDietItem, value: any) => {
    setWeeklyMealsByDay(prev => ({
      ...prev,
      [activeModalDay]: (prev[activeModalDay] || []).map(m => {
        if (m.id !== mealId) return m;
        return {
          ...m,
          items: m.items.map(it => it.id === itemId ? { ...it, [field]: value } : it)
        };
      })
    }));
  };

  const handleRemoveItemFromMeal = (mealId: string, itemId: string) => {
    setWeeklyMealsByDay(prev => ({
      ...prev,
      [activeModalDay]: (prev[activeModalDay] || []).map(m => {
        if (m.id !== mealId) return m;
        return {
          ...m,
          items: m.items.filter(it => it.id !== itemId)
        };
      })
    }));
  };

  const handleToggleWeeklyDay = (dayId: string) => {
    if (selectedWeeklyDays.includes(dayId)) {
      if (selectedWeeklyDays.length === 1) return;
      setSelectedWeeklyDays(selectedWeeklyDays.filter(d => d !== dayId));
    } else {
      setSelectedWeeklyDays([...selectedWeeklyDays, dayId]);
    }
  };

  // Day copying utilities
  const handleCopyActiveDayToAll = () => {
    const currentMeals = weeklyMealsByDay[activeModalDay] || [];
    const updated: Record<string, ModalDietMeal[]> = {};
    WEEK_DAYS.forEach(d => {
      updated[d.id] = currentMeals.map(m => ({
        ...m,
        id: `meal_${d.id}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        items: m.items.map(it => ({
          ...it,
          id: `item_${d.id}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`
        }))
      }));
    });
    setWeeklyMealsByDay(updated);
    setConvertSuccessMsg(`Copied ${activeModalDay}'s meals to all 7 days!`);
    setTimeout(() => setConvertSuccessMsg(null), 3000);
  };

  const handleCopyActiveDayToNext = () => {
    const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const curIdx = dayOrder.indexOf(activeModalDay);
    const nextDay = dayOrder[(curIdx + 1) % dayOrder.length];
    const currentMeals = weeklyMealsByDay[activeModalDay] || [];
    setWeeklyMealsByDay(prev => ({
      ...prev,
      [nextDay]: currentMeals.map(m => ({
        ...m,
        id: `meal_${nextDay}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        items: m.items.map(it => ({
          ...it,
          id: `item_${nextDay}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`
        }))
      }))
    }));
    setActiveModalDay(nextDay);
    setConvertSuccessMsg(`Copied to ${nextDay}! Now viewing ${nextDay}.`);
    setTimeout(() => setConvertSuccessMsg(null), 3000);
  };

  const handleLoad7DayVariety = () => {
    const generated = buildDefault7DayMeals(dietType, mealsCountPreset);
    setWeeklyMealsByDay(generated);
    setConvertSuccessMsg('Loaded 7 distinct daily menus across the week!');
    setTimeout(() => setConvertSuccessMsg(null), 3500);
  };

  // Calorie calculations for current active day in modal
  const modalTotalApproxCalories = modalMeals.reduce((sum, meal) => {
    const mealSum = meal.items.reduce((s, it) => s + (Number(it.approxCalories) || 0), 0);
    return sum + mealSum;
  }, 0);

  const modalTotalApproxProtein = modalMeals.reduce((sum, meal) => {
    const mealSum = meal.items.reduce((s, it) => s + (Number(it.protein) || 0), 0);
    return sum + mealSum;
  }, 0);

  // Overall weekly average calories
  const modalWeeklyAvgCalories = Math.round(
    WEEK_DAYS.reduce((total, d) => {
      const dayMeals = weeklyMealsByDay[d.id] || [];
      const daySum = dayMeals.reduce((mSum, m) => mSum + m.items.reduce((iSum, i) => iSum + (Number(i.approxCalories) || 0), 0), 0);
      return total + daySum;
    }, 0) / 7
  );

  const handleSaveAndAssignDietSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!client) return;

    // Normalize weekly schedule
    const normalizedWeeklySchedule: Record<string, AdminDietMeal[]> = {};

    WEEK_DAYS.forEach(day => {
      const dayMeals = weeklyMealsByDay[day.id] || [];
      normalizedWeeklySchedule[day.id] = dayMeals.map((meal, mIdx) => {
        const items: AdminDietFoodItem[] = meal.items.map((it, iIdx) => {
          const cal = Number(it.approxCalories) || 0;
          const p = Number(it.protein) || 0;
          const c = Number(it.carbs) || 0;
          const f = Number(it.fat) || 0;
          return {
            id: it.id || `dfi_${day.id}_${Date.now()}_${mIdx}_${iIdx}`,
            name: it.name.trim() || `Nutritious Item ${iIdx + 1}`,
            serving: it.serving.trim() || '1 serving',
            quantity: 1,
            calories: cal,
            protein: p,
            carbs: c,
            fat: f
          };
        });

        const totalCalories = items.reduce((s, i) => s + i.calories, 0);
        const totalProtein = items.reduce((s, i) => s + i.protein, 0);
        const totalCarbs = items.reduce((s, i) => s + i.carbs, 0);
        const totalFat = items.reduce((s, i) => s + i.fat, 0);

        return {
          id: meal.id || `meal_${day.id}_${Date.now()}_${mIdx}`,
          name: meal.name.trim() || `Meal ${mIdx + 1}`,
          category: meal.category || 'LUNCH',
          scheduledTime: meal.scheduledTime.trim() || '12:00 PM',
          totalCalories,
          totalProtein,
          totalCarbs,
          totalFat,
          items
        };
      });
    });

    // Primary/default meals for backwards compatibility:
    const activeMeals = normalizedWeeklySchedule[activeModalDay] || normalizedWeeklySchedule['Mon'] || [];
    const totalDailyCalories = activeMeals.reduce((s, m) => s + m.totalCalories, 0);
    const totalDailyProtein = activeMeals.reduce((s, m) => s + m.totalProtein, 0);
    const totalDailyCarbs = activeMeals.reduce((s, m) => s + m.totalCarbs, 0);
    const totalDailyFat = activeMeals.reduce((s, m) => s + m.totalFat, 0);

    const targetCal = Number(dietTargetCalories) || (totalDailyCalories > 0 ? totalDailyCalories : client.dailyCalories || 1800);

    const newPlan: AdminDietPlan = {
      id: `diet_client_${client.id}_${Date.now()}`,
      name: dietPlanName.trim() || `${client.name}'s Bespoke Protocol`,
      description: `Assigned nutrition plan for ${client.name} with different meals for each day.`,
      targetDailyCalories: targetCal,
      targetCalories: targetCal,
      totalDailyCalories,
      totalPlannedCalories: totalDailyCalories,
      totalDailyProtein,
      totalProteinGrams: totalDailyProtein,
      totalDailyCarbs,
      totalCarbsGrams: totalDailyCarbs,
      totalDailyFat,
      totalFatGrams: totalDailyFat,
      dietType: dietType,
      meals: activeMeals,
      weeklySchedule: normalizedWeeklySchedule,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isTemplate: false,
      assignedClientId: client.id,
      assignedClientName: client.name,
      assignedClientEmail: client.email,
      assignedAt: new Date().toISOString(),
      coachNotes: dietCoachNotes.trim() || (scheduleNotes.trim() ? `Schedule: ${scheduleNotes}` : 'Hydrate with at least 3.5L of water daily. Adhere strictly to meal timings.'),
      applicableDays: selectedWeeklyDays.length > 0 ? selectedWeeklyDays : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      mealsCount: activeMeals.length
    };

    saveCustomDietPlan(newPlan);
    assignDietPlanToClient(client, newPlan);
    setIsAddDietModalOpen(false);
    setConvertSuccessMsg(`Diet plan "${newPlan.name}" (${totalDailyCalories} approx kcal/day, 7 distinct days) assigned to ${client.name}!`);
    setTimeout(() => setConvertSuccessMsg(null), 4500);
  };

  // Assigned Diet Plan & Today's Adherence
  const assignedDiet = client.assignedDietPlan;
  const todayLocal = getLocalDateString();
  const clientTrackMap =
    dailyDietTrackingByClient[client.id] ||
    dailyDietTrackingByClient[client.email.toLowerCase()] ||
    {};
  const todayDietRecord = clientTrackMap[todayLocal];

  return (
    <div id={`client-profile-${client.id}`} className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0a0a0e] border border-white/10 p-4 rounded-sm">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white uppercase font-bold text-xs tracking-wider transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>ROSTER</span>
          </button>

          <span className="text-zinc-600 hidden sm:inline">•</span>

          {/* Client Quick Dropdown Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-400 uppercase font-bold whitespace-nowrap hidden lg:inline">
              SELECT CLIENT:
            </span>
            <select
              value={currentId}
              onChange={(e) => {
                const val = e.target.value;
                if (val) {
                  setCurrentId(val);
                  setSelectedCustomerId(val);
                }
              }}
              className="bg-[#14141c] hover:bg-[#181822] border border-[#FFC515]/50 hover:border-[#FFC515] text-[#FFC515] font-bold px-3 py-1.5 text-xs rounded-xs focus:border-[#FFC515] focus:outline-none min-w-[200px] max-w-[280px] truncate cursor-pointer shadow-sm"
            >
              <optgroup label="⭐ Enrolled Coaching Clients (Customers)">
                {(customers || []).map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.phone ? `(${c.phone})` : c.email ? `(${c.email})` : ''}
                  </option>
                ))}
              </optgroup>
              <optgroup label="⚡ Inquiries & Leads">
                {(leads || []).map(l => (
                  <option key={l.id} value={l.id}>
                    {l.name} [Lead: {l.status}]
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {client.phone && (
            <button
              onClick={handleDirectWhatsApp}
              className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-black border border-emerald-500/40 uppercase font-bold text-xs flex items-center gap-1.5 transition-colors rounded-xs"
            >
              <MessageSquare size={13} />
              <span>WHATSAPP</span>
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
            onClick={handleOpenCreateInvoiceModal}
            className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-xs flex items-center gap-1.5 transition-colors rounded-xs shadow-sm cursor-pointer"
          >
            <FileText size={13} />
            <span>CREATE INVOICE</span>
          </button>

          <button
            onClick={handleOpenAddDietModal}
            className="px-3.5 py-1.5 bg-[#FFC515] hover:bg-[#e6b010] text-black font-black uppercase text-xs flex items-center gap-1.5 transition-colors rounded-xs shadow-sm cursor-pointer"
          >
            <Utensils size={13} />
            <span>+ ADD DIET</span>
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

      {/* Lead Notification Banner if viewing an unconverted lead dossier */}
      {isLeadView && matchingLead && (
        <div className="bg-amber-500/10 border border-amber-500/40 p-4 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FFC515]/20 text-[#FFC515] rounded-xs border border-[#FFC515]/40 shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-white uppercase">
                  CRM Client Inquiry / Lead Dossier
                </span>
                <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] font-bold uppercase rounded-xs">
                  {matchingLead.status}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                This client inquiry was fetched from the CRM pipeline ({matchingLead.source?.replace(/_/g, ' ') || 'Website'}). Convert them to create their official enrolled client record in Realtime DB.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              const newCustomer = convertLeadToCustomer(matchingLead.id);
              setCurrentId(newCustomer.id);
              setSelectedCustomerId(newCustomer.id);
              setConvertSuccessMsg(`Successfully converted ${matchingLead.name} into an active client!`);
              setTimeout(() => setConvertSuccessMsg(null), 4000);
            }}
            className="px-4 py-2 bg-[#FFC515] hover:bg-[#e6b010] text-black font-black uppercase text-xs flex items-center justify-center gap-1.5 transition-transform active:scale-95 rounded-xs shrink-0 cursor-pointer shadow-lg"
          >
            <Zap size={14} className="fill-black" />
            <span>CONVERT INTO ACTIVE CLIENT ROSTER</span>
          </button>
        </div>
      )}

      {convertSuccessMsg && (
        <div className="bg-emerald-950/60 border border-emerald-500/60 text-emerald-300 p-3 rounded-sm flex items-center gap-2 text-xs font-bold uppercase">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{convertSuccessMsg}</span>
        </div>
      )}

      {/* Main Profile Header Dossier + Complete Package & Subscription Overview */}
      <div className="bg-[#0f0f14] border border-white/10 p-6 rounded-sm relative overflow-hidden space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Client Avatar & Core Identity */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative shrink-0">
              <img
                src={client.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={client.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-sm object-cover border-2 border-[#FFC515]/60 shadow-lg"
              />
              <span className={`absolute -bottom-1 -right-1 px-1.5 py-0.5 text-[9px] font-black uppercase rounded-xs border ${
                subInfo.status === 'SUBSCRIPTION_OVER' ? 'bg-red-500 text-white border-red-400' :
                subInfo.status === 'EXPIRING_SOON' ? 'bg-amber-500 text-black border-amber-400' :
                'bg-emerald-500 text-black border-emerald-400'
              }`}>
                {subInfo.label}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-display">
                  {client.name}
                </h1>
                <span className="px-2.5 py-0.5 bg-[#FFC515]/20 text-[#FFC515] border border-[#FFC515]/40 text-xs font-extrabold uppercase rounded-xs">
                  {pkgName}
                </span>
                <span className="px-2 py-0.5 bg-white/10 text-zinc-200 border border-white/15 text-[10px] font-bold uppercase rounded-xs">
                  {pkgCategory}
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

              <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-zinc-400 font-mono-num">
                <span>Coach: <strong className="text-white">{client.assignedCoach}</strong></span>
                <span>•</span>
                <span>Goal: <strong className="text-[#FFC515] uppercase">{client.dietGoal?.replace(/_/g, ' ') || 'FAT LOSS'}</strong></span>
              </div>
            </div>
          </div>

          {/* Prominent Subscription Status Badge & Quick Package Switch */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-2.5 shrink-0 font-mono-num">
            <div className={`px-3.5 py-2 rounded-xs border text-xs font-black uppercase flex items-center gap-2 ${
              subInfo.status === 'SUBSCRIPTION_OVER'
                ? 'bg-red-500/20 text-red-400 border-red-500/50'
                : subInfo.status === 'EXPIRING_SOON'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
            }`}>
              <Calendar size={14} />
              <span>{subInfo.badgeText}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-400 uppercase font-bold">ASSIGNED PACKAGE:</span>
              <select
                value={matchedPkgOpt ? matchedPkgOpt.name : pkgName}
                onChange={(e) => {
                  const newPkg = e.target.value;
                  const opt = findPackageOption(newPkg);
                  const newEnd = calculateEndDateFromPackage(client.startDate || getLocalDateString(), newPkg);
                  updateCustomer(client.id, {
                    programTier: newPkg,
                    packageName: newPkg,
                    packageCategory: opt?.category || 'Official Coaching Plan',
                    packagePrice: opt?.priceINR || pkgPrice,
                    endDate: newEnd
                  });
                }}
                className="bg-[#181822] border border-[#FFC515]/40 px-2.5 py-1 text-xs font-bold text-white rounded-xs focus:border-[#FFC515] focus:outline-none"
              >
                {!matchedPkgOpt && pkgName && <option value={pkgName}>{pkgName}</option>}
                {PACKAGE_CATALOG.map(p => (
                  <option key={p.id} value={p.name}>
                    {p.name} (₹{p.priceINR.toLocaleString('en-IN')})
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* Complete Client Report Summary Grid: Package, Dates, Status, Calories, Diet, Exercise, Payment */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-white/10 font-mono-num text-xs">
          <div className="bg-[#15151e] border border-white/10 p-3 rounded-xs">
            <span className="text-[10px] text-zinc-400 uppercase font-bold block">Selected Package</span>
            <span className="text-white font-extrabold block mt-0.5 truncate" title={pkgName}>{pkgName}</span>
            <span className="text-[10px] text-[#FFC515] font-bold">₹{pkgPrice.toLocaleString('en-IN')} • {pkgCategory}</span>
          </div>

          <div className="bg-[#15151e] border border-white/10 p-3 rounded-xs">
            <span className="text-[10px] text-zinc-400 uppercase font-bold block">Subscription Start</span>
            <span className="text-white font-extrabold text-sm block mt-0.5">{client.startDate || client.joinedDate || 'N/A'}</span>
            <span className="text-[10px] text-zinc-500">Enrolled Date</span>
          </div>

          <div className="bg-[#15151e] border border-white/10 p-3 rounded-xs">
            <span className="text-[10px] text-zinc-400 uppercase font-bold block">Subscription End</span>
            <span className={`font-extrabold text-sm block mt-0.5 ${
              subInfo.status === 'SUBSCRIPTION_OVER' ? 'text-red-400' :
              subInfo.status === 'EXPIRING_SOON' ? 'text-amber-300' : 'text-emerald-400'
            }`}>
              {client.endDate || 'N/A'}
            </span>
            <span className="text-[10px] text-zinc-400 font-bold uppercase">{subInfo.label}</span>
          </div>

          <div className="bg-[#15151e] border border-white/10 p-3 rounded-xs">
            <span className="text-[10px] text-zinc-400 uppercase font-bold block">Daily Calorie Target</span>
            <span className="text-[#FFC515] font-black text-base block mt-0.5">
              {(assignedDiet?.targetDailyCalories || assignedDiet?.targetCalories || client.dailyCalories || 2100).toLocaleString()} kcal
            </span>
            <span className="text-[10px] text-zinc-400">
              {assignedDiet ? `Plan: ${assignedDiet.totalDailyCalories || assignedDiet.totalPlannedCalories} kcal` : `${client.proteinGrams || 150}g Protein`}
            </span>
          </div>

          <div className="bg-[#15151e] border border-white/10 p-3 rounded-xs">
            <span className="text-[10px] text-zinc-400 uppercase font-bold block">Assigned Protocols</span>
            <span className="text-white font-bold block mt-0.5 truncate">
              Diet: {assignedDiet ? assignedDiet.name : 'No diet plan assigned'}
            </span>
            <span className="text-[10px] text-zinc-400 block truncate">
              Workout: {client.assignedWorkoutPlan ? client.assignedWorkoutPlan.name : 'No exercise plan assigned'}
            </span>
          </div>

          <div className="bg-[#15151e] border border-white/10 p-3 rounded-xs">
            <span className="text-[10px] text-zinc-400 uppercase font-bold block">Billing & Payment</span>
            <span className={`font-extrabold text-xs uppercase block mt-0.5 ${
              overallPaymentStatus === 'PAID' ? 'text-emerald-400' :
              overallPaymentStatus === 'PARTIALLY PAID' ? 'text-amber-300' : 'text-red-400'
            }`}>
              {overallPaymentStatus}
            </span>
            <span className="text-[10px] text-zinc-400">
              LTV: ₹{(client.totalSpent || 0).toLocaleString('en-IN')} ({clientInvoices.length} Inv)
            </span>
          </div>
        </div>

        {/* Weight Progress Bar Ribbon */}
        <div className="pt-2 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold uppercase font-mono-num">
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
          <span>1. Complete Report & Biometrics</span>
        </button>

        <button
          onClick={() => setActiveProfileTab('NUTRITION')}
          className={`px-3.5 py-2 uppercase font-bold text-xs rounded-sm transition-colors flex items-center gap-1.5 shrink-0 ${
            activeProfileTab === 'NUTRITION' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Utensils size={14} />
          <span>2. Assigned Diet Plan & Macros</span>
        </button>

        <button
          onClick={() => setActiveProfileTab('WORKOUT')}
          className={`px-3.5 py-2 uppercase font-bold text-xs rounded-sm transition-colors flex items-center gap-1.5 shrink-0 ${
            activeProfileTab === 'WORKOUT' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Dumbbell size={14} />
          <span>3. Assigned Exercise Plan</span>
        </button>

        <button
          onClick={() => setActiveProfileTab('INVOICES')}
          className={`px-3.5 py-2 uppercase font-bold text-xs rounded-sm transition-colors flex items-center gap-1.5 shrink-0 ${
            activeProfileTab === 'INVOICES' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <FileText size={14} />
          <span>4. Billing & Invoices ({clientInvoices.length})</span>
        </button>

        <button
          onClick={() => setActiveProfileTab('CHECKINS')}
          className={`px-3.5 py-2 uppercase font-bold text-xs rounded-sm transition-colors flex items-center gap-1.5 shrink-0 ${
            activeProfileTab === 'CHECKINS' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Activity size={14} />
          <span>5. Check-in Logs ({client.checkIns?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveProfileTab('NOTES')}
          className={`px-3.5 py-2 uppercase font-bold text-xs rounded-sm transition-colors flex items-center gap-1.5 shrink-0 ${
            activeProfileTab === 'NOTES' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <MessageSquare size={14} />
          <span>6. Coach Notes ({client.coachNotes?.length || 0})</span>
        </button>
      </div>

      {/* TAB 1: COMPLETE CLIENT REPORT & BIOMETRICS */}
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
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">Today's Diet Adherence</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono-num">
                  {todayDietRecord ? `${todayDietRecord.consumedCalories}` : '0'}
                </span>
                <span className="text-xs text-zinc-400 font-bold">
                  / {assignedDiet?.targetDailyCalories || assignedDiet?.targetCalories || client.dailyCalories || 2100} KCAL
                </span>
              </div>
              <span className="text-[11px] text-zinc-500 font-mono-num mt-1 block">
                {todayDietRecord ? `${todayDietRecord.checkedItemIds.length} items checked today` : 'No items checked off today yet'}
              </span>
            </div>
          </div>

          {/* Side-by-Side Quick Report: Assigned Exercise Plan & Assigned Diet Plan */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 font-mono-num text-xs">
            {/* Assigned Diet Plan Card */}
            <div className="bg-[#111116] border border-white/10 p-5 rounded-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                  <span className="text-xs font-extrabold uppercase text-[#FFC515] flex items-center gap-1.5">
                    <Utensils size={14} /> ASSIGNED DIET PLAN
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleOpenAddDietModal}
                      className="px-2 py-1 bg-[#FFC515] hover:bg-[#e6b010] text-black font-extrabold uppercase text-[10px] rounded-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Plus size={11} /> + Add / Edit Diet
                    </button>
                    <button
                      onClick={() => setActiveProfileTab('NUTRITION')}
                      className="text-[10px] text-zinc-300 hover:text-[#FFC515] uppercase font-bold underline"
                    >
                      Full Diet Tab →
                    </button>
                  </div>
                </div>

                {assignedDiet ? (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-white uppercase">{assignedDiet.name}</span>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold rounded-xs">
                        {assignedDiet.totalDailyCalories || assignedDiet.totalPlannedCalories} KCAL / DAY
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      Target: {assignedDiet.targetDailyCalories || assignedDiet.targetCalories} kcal • P: {assignedDiet.totalDailyProtein ?? assignedDiet.totalProteinGrams}g • C: {assignedDiet.totalDailyCarbs ?? assignedDiet.totalCarbsGrams}g • F: {assignedDiet.totalDailyFat ?? assignedDiet.totalFatGrams}g
                    </p>
                    <div className="space-y-1.5 pt-1">
                      {(assignedDiet.meals || []).map(meal => (
                        <div key={meal.id} className="bg-[#161620] px-3 py-2 rounded-xs border border-white/5 flex items-center justify-between">
                          <div>
                            <span className="text-white font-bold">{meal.name}</span>
                            <span className="text-zinc-500 text-[10px] ml-2">({meal.scheduledTime || meal.time})</span>
                            <span className="text-[10px] text-zinc-400 block">
                              {(meal.items || []).map(i => i.name).join(', ')}
                            </span>
                          </div>
                          <span className="text-[#FFC515] font-bold shrink-0">{meal.totalCalories} kcal</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center bg-[#161620] border border-dashed border-white/15 rounded-xs space-y-2">
                    <p className="text-zinc-300 font-bold uppercase text-xs">No diet plan assigned</p>
                    <p className="text-zinc-500 text-[11px]">Assign a custom diet plan below or launch the bespoke diet popup builder.</p>
                    <button
                      type="button"
                      onClick={handleOpenAddDietModal}
                      className="px-3.5 py-1.5 bg-[#FFC515] hover:bg-[#e6b010] text-black font-black uppercase text-xs rounded-xs inline-flex items-center gap-1.5 mt-1 cursor-pointer"
                    >
                      <Plus size={12} /> + Add Client Diet (Popup)
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Assign Diet Plan Selector */}
              <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                <select
                  value={selectedDietToAssignId}
                  onChange={(e) => setSelectedDietToAssignId(e.target.value)}
                  className="flex-1 bg-[#181822] border border-white/15 px-2.5 py-1.5 text-white text-xs rounded-xs focus:border-[#FFC515] focus:outline-none"
                >
                  <option value="">Select Diet Plan to Assign...</option>
                  {customDietPlans.map(dp => (
                    <option key={dp.id} value={dp.id}>
                      {dp.name} ({dp.totalDailyCalories || dp.totalPlannedCalories} kcal)
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => {
                    if (!selectedDietToAssignId) return;
                    assignDietPlanToClient(client.id, selectedDietToAssignId);
                    setConvertSuccessMsg(`Assigned diet plan to ${client.name}!`);
                    setTimeout(() => setConvertSuccessMsg(null), 3500);
                  }}
                  className="px-3 py-1.5 bg-[#FFC515] hover:bg-[#e6b010] text-black font-extrabold uppercase text-[10px] rounded-xs shrink-0"
                >
                  Assign Diet
                </button>
              </div>
            </div>

            {/* Assigned Exercise Plan Card */}
            <div className="bg-[#111116] border border-white/10 p-5 rounded-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                  <span className="text-xs font-extrabold uppercase text-[#FFC515] flex items-center gap-1.5">
                    <Dumbbell size={14} /> ASSIGNED EXERCISE PLAN
                  </span>
                  <button
                    onClick={() => setActiveProfileTab('WORKOUT')}
                    className="text-[10px] text-zinc-300 hover:text-[#FFC515] uppercase font-bold underline"
                  >
                    Open Full Workout View →
                  </button>
                </div>

                {client.assignedWorkoutPlan && Array.isArray(client.assignedWorkoutPlan.days) && client.assignedWorkoutPlan.days.length > 0 ? (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-white uppercase">{client.assignedWorkoutPlan.name}</span>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold rounded-xs">
                        {client.assignedWorkoutPlan.days.length} DAYS / WEEK
                      </span>
                    </div>
                    <div className="space-y-1.5 pt-1">
                      {client.assignedWorkoutPlan.days.slice(0, 4).map((d, idx) => (
                        <div key={idx} className="bg-[#161620] px-3 py-2 rounded-xs border border-white/5 flex items-center justify-between">
                          <div>
                            <span className="text-[#FFC515] font-bold mr-2">{d.dayName}</span>
                            <span className="text-white font-semibold">{d.focus}</span>
                          </div>
                          <span className="text-zinc-400 text-[10px]">{(d.exercises || []).length} exercises</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center bg-[#161620] border border-dashed border-white/15 rounded-xs space-y-2">
                    <p className="text-zinc-300 font-bold uppercase text-xs">No exercise plan assigned</p>
                    <p className="text-zinc-500 text-[11px]">
                      Default split: {client.workoutSplit || 'Push / Pull / Legs'}. Click below to assign a bespoke exercise plan.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedCustomerId(client.id);
                    try {
                      sessionStorage.setItem('fitnetheist_exercise_assign_client', client.id);
                    } catch {}
                    setActiveSubtab('exercises');
                  }}
                  className="px-3.5 py-1.5 bg-[#FFC515] hover:bg-[#e6b010] text-black font-extrabold uppercase text-[10px] rounded-xs flex items-center gap-1.5"
                >
                  <Dumbbell size={12} />
                  <span>{client.assignedWorkoutPlan ? 'Edit Assigned Exercise Plan' : 'Assign Exercise Plan'}</span>
                </button>
              </div>
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
        </div>
      )}

      {/* TAB 2: ASSIGNED DIET PLAN & DAILY MACROS */}
      {activeProfileTab === 'NUTRITION' && (
        <div className="space-y-6 animate-in fade-in duration-150 font-mono-num">
          
          {/* Assign or Switch Diet Plan Bar */}
          <div className="bg-[#111116] border border-[#FFC515]/40 p-5 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-[#FFC515] uppercase font-extrabold tracking-wider block">
                ADMIN DIET ASSIGNMENT & SNAPSHOT CONTROL
              </span>
              <h3 className="text-lg font-black text-white uppercase font-display">
                {assignedDiet ? `ASSIGNED PLAN: ${assignedDiet.name}` : 'NO DIET PLAN ASSIGNED YET'}
              </h3>
              <p className="text-xs text-zinc-400">
                {assignedDiet
                  ? `Target: ${assignedDiet.targetDailyCalories || assignedDiet.targetCalories} kcal • Planned Meals Total: ${assignedDiet.totalDailyCalories || assignedDiet.totalPlannedCalories} kcal`
                  : 'Assign a diet plan from your library or create a bespoke meal plan in the Diet Management tab.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedDietToAssignId}
                onChange={(e) => setSelectedDietToAssignId(e.target.value)}
                className="bg-[#181822] border border-white/20 px-3 py-2 text-xs text-white font-bold rounded-xs focus:border-[#FFC515] focus:outline-none"
              >
                <option value="">Choose Diet Plan from Library...</option>
                {customDietPlans.map(dp => (
                  <option key={dp.id} value={dp.id}>
                    {dp.name} ({dp.totalDailyCalories || dp.totalPlannedCalories} kcal)
                  </option>
                ))}
              </select>

              <button
                onClick={() => {
                  if (!selectedDietToAssignId) return;
                  assignDietPlanToClient(client.id, selectedDietToAssignId);
                  setConvertSuccessMsg(`Assigned diet plan to ${client.name}!`);
                  setTimeout(() => setConvertSuccessMsg(null), 3500);
                }}
                className="px-3.5 py-2 bg-[#FFC515] hover:bg-[#e6b010] text-black font-black uppercase text-xs rounded-xs"
              >
                Assign Selected Plan
              </button>

              <button
                type="button"
                onClick={handleOpenAddDietModal}
                className="px-3.5 py-2 bg-[#FFC515] hover:bg-[#e6b010] text-black font-black uppercase text-xs rounded-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Plus size={13} />
                <span>+ ADD / EDIT DIET (POPUP)</span>
              </button>

              <button
                onClick={() => setActiveSubtab('diet')}
                className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-white/20 text-white font-bold uppercase text-xs rounded-xs"
              >
                Open Full Diet Builder →
              </button>
            </div>
          </div>

          {/* Full Meal-by-Meal Breakdown of Assigned Diet Plan */}
          {assignedDiet ? (
            <div className="bg-[#111116] border border-white/10 p-6 rounded-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-extrabold uppercase text-emerald-400 block">
                    ACTIVE CLIENT DIET SNAPSHOT
                  </span>
                  <h4 className="text-xl font-black text-white uppercase font-display">
                    {assignedDiet.name}
                  </h4>
                  {assignedDiet.coachNotes && (
                    <p className="text-xs text-zinc-400 mt-1">{assignedDiet.coachNotes}</p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <div className="px-3 py-1.5 bg-[#161622] border border-white/10 rounded-xs">
                    <span className="text-[10px] text-zinc-400 block">TARGET CALORIES</span>
                    <span className="text-sm font-black text-[#FFC515]">{assignedDiet.targetDailyCalories || assignedDiet.targetCalories} kcal</span>
                  </div>
                  <div className="px-3 py-1.5 bg-[#161622] border border-white/10 rounded-xs">
                    <span className="text-[10px] text-zinc-400 block">PLANNED MEALS SUM</span>
                    <span className="text-sm font-black text-emerald-400">{assignedDiet.totalDailyCalories || assignedDiet.totalPlannedCalories} kcal</span>
                  </div>
                  <div className="px-3 py-1.5 bg-[#161622] border border-white/10 rounded-xs">
                    <span className="text-[10px] text-zinc-400 block">TODAY CHECKED OFF</span>
                    <span className="text-sm font-black text-white">
                      {todayDietRecord ? `${todayDietRecord.consumedCalories} kcal` : '0 kcal'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 7-DAY WEEKLY MENU SELECTOR (Allows viewing each day's distinct meals) */}
              {assignedDiet.weeklySchedule && Object.keys(assignedDiet.weeklySchedule).length > 0 && (
                <div className="bg-[#14141e] border border-white/10 p-3 rounded-xs space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
                    <span className="text-[10px] text-[#FFC515] uppercase font-black tracking-wider flex items-center gap-1.5">
                      <CalendarDays size={13} />
                      <span>7-DAY SCHEDULE (SELECT DAY TO VIEW THAT DAY'S MEAL PROTOCOL)</span>
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      Viewing: <strong className="text-white">{WEEK_DAYS.find(d => d.id === viewingProfileDietDay)?.full || viewingProfileDietDay}</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                    {WEEK_DAYS.map(day => {
                      const isViewing = viewingProfileDietDay === day.id;
                      const dayMeals = assignedDiet.weeklySchedule?.[day.id] || [];
                      const dayCals = dayMeals.reduce((s, m) => s + (m.totalCalories || 0), 0);
                      const isApplicable = !assignedDiet.applicableDays || assignedDiet.applicableDays.includes(day.id);

                      return (
                        <button
                          key={day.id}
                          type="button"
                          onClick={() => setViewingProfileDietDay(day.id)}
                          className={`p-2 rounded-xs border text-center transition-all cursor-pointer ${
                            isViewing
                              ? 'bg-[#FFC515] text-black border-[#FFC515] font-black shadow-md'
                              : 'bg-[#181824] text-zinc-300 border-white/10 hover:border-[#FFC515]/60 hover:text-white'
                          }`}
                        >
                          <span className="block text-xs font-black uppercase">{day.label}</span>
                          <span className={`block text-[10px] font-bold mt-0.5 ${isViewing ? 'text-black' : 'text-[#FFC515]'}`}>
                            {dayCals} kcal
                          </span>
                          <span className={`block text-[8px] font-mono ${isViewing ? 'text-black/80' : 'text-zinc-500'}`}>
                            {dayMeals.length} meals {isApplicable ? '' : '• OFF'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Meals Grid for Currently Selected Day */}
              {(() => {
                const profileMealsToShow = (assignedDiet.weeklySchedule && assignedDiet.weeklySchedule[viewingProfileDietDay])
                  ? assignedDiet.weeklySchedule[viewingProfileDietDay]
                  : (assignedDiet.meals || []);

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profileMealsToShow.map((meal) => (
                      <div key={meal.id} className="bg-[#161620] border border-white/10 p-4 rounded-sm space-y-3">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                          <div>
                            <span className="text-xs font-extrabold text-white uppercase">{meal.name}</span>
                            <span className="text-[10px] text-[#FFC515] ml-2 font-bold">{meal.scheduledTime || meal.time}</span>
                          </div>
                          <span className="text-xs font-black text-emerald-400">{meal.totalCalories} kcal</span>
                        </div>

                        <div className="space-y-1.5">
                          {(meal.items || []).map((item) => {
                            const isCheckedToday = todayDietRecord?.checkedItemIds?.includes(item.id);
                            return (
                              <div
                                key={item.id}
                                className={`flex items-center justify-between text-xs px-2.5 py-2 rounded-xs border ${
                                  isCheckedToday
                                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                                    : 'bg-black/40 border-white/5 text-zinc-200'
                                }`}
                              >
                                <div>
                                  <span className="font-bold">{item.name}</span>
                                  <span className="text-[10px] text-zinc-400 block">
                                    Qty: {item.quantity} × {item.serving || item.servingUnit} • P:{item.protein ?? item.proteinGrams}g C:{item.carbs ?? item.carbsGrams}g F:{item.fat ?? item.fatGrams}g
                                  </span>
                                </div>
                                <div className="text-right shrink-0">
                                  <span className="font-bold text-[#FFC515] block">{item.calories} kcal</span>
                                  {isCheckedToday && (
                                    <span className="text-[9px] text-emerald-400 font-bold uppercase">✓ Eaten Today</span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="p-8 text-center bg-[#111116] border border-dashed border-white/15 rounded-sm space-y-3">
              <Utensils size={28} className="mx-auto text-zinc-500" />
              <h4 className="text-sm font-bold text-white uppercase">No Diet Plan Assigned</h4>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                Use the dropdown above to assign a custom diet plan to {client.name}, or launch the fast-entry weekly diet popup below.
              </p>
              <button
                type="button"
                onClick={handleOpenAddDietModal}
                className="px-4 py-2 bg-[#FFC515] hover:bg-[#e6b010] text-black font-black uppercase text-xs rounded-xs inline-flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Plus size={14} />
                <span>+ ADD CLIENT DIET PLAN (POPUP)</span>
              </button>
            </div>
          )}

          {/* Calorie & Macro Target Banner */}
          <div className="bg-[#111116] border border-white/10 p-6 rounded-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Baseline Daily Energy Budget</span>
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
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WORKOUT SPLIT & STRENGTH PRs */}
      {activeProfileTab === 'WORKOUT' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          <div className="bg-[#111116] border border-white/10 p-6 rounded-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold block">Assigned Training Split</span>
                  {client.assignedWorkoutPlan ? (
                    <span className="px-2 py-0.5 bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-[9px] font-bold uppercase rounded-xs">
                      Personalized Active
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-amber-950 border border-amber-500/40 text-amber-300 text-[9px] font-bold uppercase rounded-xs">
                      No exercise plan assigned
                    </span>
                  )}
                </div>
                <span className="text-2xl sm:text-3xl font-black text-white font-mono-num uppercase">
                  {client.assignedWorkoutPlan?.name || client.workoutSplit || 'Push / Pull / Legs'}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-[#FFC515]/20 text-[#FFC515] border border-[#FFC515]/40 text-xs font-black uppercase rounded-xs">
                  {client.assignedWorkoutPlan?.daysPerWeek || client.trainingDaysPerWeek || 5} DAYS / WEEK
                </span>
                <button
                  onClick={() => {
                    setSelectedCustomerId(client.id);
                    try {
                      sessionStorage.setItem('fitnetheist_exercise_assign_client', client.id);
                    } catch {}
                    setActiveSubtab('exercises');
                  }}
                  className="px-3.5 py-1.5 bg-[#FFC515] hover:bg-[#eab308] text-black font-black uppercase text-xs rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  <Dumbbell size={13} />
                  {client.assignedWorkoutPlan ? 'Edit Exercise Plan' : 'Assign Exercise Plan'}
                </button>
              </div>
            </div>

            {client.assignedWorkoutPlan && Array.isArray(client.assignedWorkoutPlan.days) ? (
              <div className="mb-6 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {client.assignedWorkoutPlan.days.map((day: any, dIdx: number) => (
                    <div key={dIdx} className="bg-[#161620] border border-white/10 p-4 rounded-sm space-y-2.5 font-mono-num">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <div>
                          <span className="px-2 py-0.5 bg-[#FFC515] text-black font-black text-[10px] uppercase rounded-xs mr-2">
                            {day.dayName || `Day ${dIdx + 1}`}
                          </span>
                          <span className="text-xs font-bold text-white uppercase">{day.focus}</span>
                        </div>
                        <span className="text-[10px] text-zinc-400">{(day.exercises || []).length} Exercises</span>
                      </div>

                      {Array.isArray(day.exercises) && day.exercises.length > 0 ? (
                        <div className="space-y-1.5">
                          {day.exercises.map((item: any, eIdx: number) => (
                            <div key={eIdx} className="flex items-center justify-between text-xs bg-black/40 px-2.5 py-1.5 rounded-xs border border-white/5">
                              <div className="truncate pr-2">
                                <span className="text-[#FFC515] font-bold mr-1.5">{eIdx + 1}.</span>
                                <span className="text-white font-semibold">{item.exercise?.name || 'Exercise'}</span>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-[10px] text-zinc-300 bg-white/10 px-1.5 py-0.5 rounded-xs">
                                  {item.customSets || item.exercise?.sets || '4'} × {item.customReps || item.exercise?.reps || '8-10'}
                                </span>
                                {item.exercise?.videoUrl && (
                                  <a
                                    href={item.exercise.videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#FFC515] hover:underline text-[10px] flex items-center gap-0.5"
                                    title="Watch Demo Video"
                                  >
                                    <ExternalLink size={11} />
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[11px] text-zinc-500 italic">No exercises added to this session yet.</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mb-6 p-6 text-center bg-[#161620] border border-dashed border-white/15 rounded-xs font-mono-num">
                <p className="text-xs font-bold text-white uppercase">No exercise plan assigned</p>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Click "Assign Exercise Plan" above to build and assign a custom workout protocol from the Exercise Bank.
                </p>
              </div>
            )}

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

      {/* TAB 4: BILLING & INVOICES */}
      {activeProfileTab === 'INVOICES' && (
        <div className="space-y-6 animate-in fade-in duration-150 font-mono-num">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111116] border border-white/10 p-5 rounded-sm">
            <div>
              <h3 className="text-base font-bold text-white uppercase font-display">INVOICES & FINANCIAL RECORDS</h3>
              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 mt-1">
                <span>Total Billed: <strong className="text-white">₹{totalBilledAmount.toLocaleString('en-IN')}</strong></span>
                <span>Total Paid: <strong className="text-emerald-400">₹{totalPaidAmount.toLocaleString('en-IN')}</strong></span>
                <span>Outstanding: <strong className={totalOutstandingAmount > 0 ? 'text-red-400' : 'text-zinc-400'}>₹{totalOutstandingAmount.toLocaleString('en-IN')}</strong></span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenCreateInvoiceModal}
                className="px-4 py-2 bg-[#FFC515] hover:bg-[#e6b010] text-black font-extrabold uppercase text-xs rounded-sm flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Plus size={14} /> Create Invoice for {client.name}
              </button>
              <button
                onClick={() => setActiveSubtab('invoices')}
                className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-zinc-300 text-xs font-bold uppercase rounded-sm"
              >
                All Invoices →
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {clientInvoices.length > 0 ? (
              clientInvoices.map((inv) => (
                <div key={inv.id} className="bg-[#111116] border border-white/10 p-4 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-white text-sm">{inv.invoiceNumber}</span>
                      <span className={`px-2 py-0.5 text-[10px] font-black uppercase rounded-xs border ${
                        inv.status === 'PAID' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' :
                        inv.status === 'PARTIALLY_PAID' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                        'bg-red-500/20 text-red-400 border-red-500/40'
                      }`}>
                        {inv.status.replace('_', ' ')}
                      </span>
                      <span className="text-zinc-400 text-[11px]">
                        {inv.items?.[0]?.description || inv.packageName || pkgName}
                      </span>
                    </div>
                    <span className="text-zinc-400 text-[11px] block mt-1">
                      Invoice Date: {inv.issueDate} • Mode: {inv.paymentMethod}
                      {inv.notes ? ` • ${inv.notes}` : ''}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-black text-emerald-400 block">
                      ₹{inv.totalAmount.toLocaleString('en-IN')}
                    </span>
                    {typeof inv.outstandingBalance === 'number' && inv.outstandingBalance > 0 && (
                      <span className="text-[10px] text-red-400 font-bold uppercase block">
                        Balance Due: ₹{inv.outstandingBalance.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-[#111116] border border-white/10 rounded-sm text-zinc-500 text-xs italic">
                No invoices found for {client.name}. Click '+ Create Invoice for {client.name}' above to generate a prefilled invoice.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: CHECK-IN LOGS */}
      {activeProfileTab === 'CHECKINS' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white uppercase font-display">CLIENT PROGRESS CHECK-IN LOG</h3>
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
                      <span className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">Client Comments:</span>
                      <p className="text-zinc-300 italic">{chk.clientNotes || 'No client comments.'}</p>
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

      {/* TAB 6: COACH NOTES */}
      {activeProfileTab === 'NOTES' && (
        <div className="space-y-6 animate-in fade-in duration-150">
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
                placeholder="Log protocol adjustment, check-in call notes, or client feedback..."
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

          <div className="space-y-3">
            {client.coachNotes && client.coachNotes.length > 0 ? (
              client.coachNotes.map((note) => (
                <div key={note.id} className="bg-[#111116] border border-white/10 p-4 rounded-sm font-mono-num text-xs space-y-2">
                  <div className="flex items-center justify-between text-zinc-400 text-[11px] border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{note.author}</span>
                      <span className="px-2 py-0.5 text-[9px] font-black uppercase rounded-xs bg-zinc-800 text-zinc-300">
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

      {/* Edit Dossier Modal */}
      {isEditModalOpen && (
        <ClientIntakeModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          existingClient={client}
        />
      )}

      {/* Prefilled Create Invoice Modal from Client Profile */}
      {isCreateInvoiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e0e14] border border-white/20 p-6 max-w-2xl w-full font-mono-num text-xs space-y-5 rounded-sm">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                  <FileText size={16} className="text-[#FFC515]" />
                  CREATE INVOICE FOR {client.name}
                </h3>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Client details & selected package prefilled automatically. Saved directly to Firebase Realtime DB.
                </p>
              </div>
              <button onClick={() => setIsCreateInvoiceModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateClientInvoiceSubmit} className="space-y-4">
              {/* Prefilled Client Info Banner */}
              <div className="bg-[#15151e] border border-white/10 p-3.5 rounded-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block">Client Name</span>
                  <span className="text-white font-bold">{client.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block">Contact Details</span>
                  <span className="text-white font-bold block truncate">{client.phone || 'N/A'}</span>
                  <span className="text-[10px] text-zinc-400 block truncate">{client.email}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block">Subscription Dates</span>
                  <span className="text-[#FFC515] font-bold">{client.startDate || 'N/A'} → {client.endDate || 'N/A'}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">UNIQUE INVOICE NUMBER *</label>
                  <input
                    type="text"
                    required
                    value={invNumber}
                    onChange={(e) => setInvNumber(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/20 p-2 text-[#FFC515] font-bold rounded-xs"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">INVOICE DATE *</label>
                  <input
                    type="date"
                    required
                    value={invDate}
                    onChange={(e) => setInvDate(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/20 p-2 text-white rounded-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase font-bold mb-1">PACKAGE / SERVICE DESCRIPTION *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <select
                    value={findPackageOption(invPackageDesc)?.name || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (!val) return;
                      setInvPackageDesc(val);
                      const opt = findPackageOption(val);
                      if (opt) {
                        setInvAmount(opt.priceINR);
                        if (invPaymentStatus === 'PAID') {
                          setInvAmountPaid(opt.priceINR);
                        }
                      }
                    }}
                    className="bg-zinc-900 border border-[#FFC515]/40 p-2 text-white font-bold rounded-xs"
                  >
                    <option value="">Select Official Package...</option>
                    {PACKAGE_CATALOG.map(p => (
                      <option key={p.id} value={p.name}>
                        {p.name} (₹{p.priceINR.toLocaleString('en-IN')})
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    required
                    value={invPackageDesc}
                    onChange={(e) => setInvPackageDesc(e.target.value)}
                    placeholder="Custom package or service description..."
                    className="bg-zinc-900 border border-white/20 p-2 text-white rounded-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">PACKAGE AMOUNT (₹) *</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={invAmount}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setInvAmount(val);
                      if (invPaymentStatus === 'PAID') {
                        setInvAmountPaid(Math.max(0, val - invDiscount));
                      }
                    }}
                    className="w-full bg-zinc-900 border border-white/20 p-2 text-white font-bold rounded-xs"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">DISCOUNT (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={invDiscount}
                    onChange={(e) => setInvDiscount(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-white/20 p-2 text-white rounded-xs"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">GST TAX (%)</label>
                  <select
                    value={invTaxRate}
                    onChange={(e) => setInvTaxRate(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-white/20 p-2 text-white rounded-xs"
                  >
                    <option value={0}>0% (Non-GST)</option>
                    <option value={5}>5% GST</option>
                    <option value={12}>12% GST</option>
                    <option value={18}>18% GST</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">PAYMENT STATUS *</label>
                  <select
                    value={invPaymentStatus}
                    onChange={(e) => {
                      const st = e.target.value as 'PAID' | 'PARTIALLY_PAID' | 'UNPAID';
                      setInvPaymentStatus(st);
                      if (st === 'PAID') setInvAmountPaid(invFinalPayable);
                      if (st === 'UNPAID') setInvAmountPaid(0);
                    }}
                    className="w-full bg-zinc-900 border border-white/20 p-2 text-white font-bold rounded-xs"
                  >
                    <option value="PAID">PAID IN FULL</option>
                    <option value="PARTIALLY_PAID">PARTIALLY PAID</option>
                    <option value="UNPAID">UNPAID / PENDING</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">AMOUNT PAID (₹)</label>
                  <input
                    type="number"
                    min={0}
                    max={invFinalPayable}
                    disabled={invPaymentStatus !== 'PARTIALLY_PAID'}
                    value={effectiveAmountPaid}
                    onChange={(e) => setInvAmountPaid(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-white/20 p-2 text-emerald-400 font-bold rounded-xs disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">PAYMENT METHOD</label>
                  <select
                    value={invPaymentMethod}
                    onChange={(e) => setInvPaymentMethod(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-white/20 p-2 text-white rounded-xs"
                  >
                    <option value="UPI">UPI (GPay / PhonePe)</option>
                    <option value="CARD">CREDIT / DEBIT CARD</option>
                    <option value="NET_BANKING">NEFT / IMPS / BANK</option>
                    <option value="RAZORPAY">RAZORPAY LINK</option>
                    <option value="CASH">CASH</option>
                  </select>
                </div>
              </div>

              {/* Auto-Calculated Financial Breakdown Banner */}
              <div className="bg-[#15151e] border border-[#FFC515]/30 p-3.5 rounded-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block">Final Payable Amount</span>
                  <span className="text-xl font-black text-[#FFC515]">₹{invFinalPayable.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block">Amount Paid</span>
                  <span className="text-base font-extrabold text-emerald-400">₹{effectiveAmountPaid.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block">Outstanding Balance</span>
                  <span className={`text-base font-extrabold ${invOutstandingBalance > 0 ? 'text-red-400' : 'text-zinc-400'}`}>
                    ₹{invOutstandingBalance.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase font-bold mb-1">INVOICE NOTES / SUBSCRIPTION REMARKS</label>
                <input
                  type="text"
                  value={invNotes}
                  onChange={(e) => setInvNotes(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/20 p-2 text-white rounded-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsCreateInvoiceModalOpen(false)}
                  className="px-4 py-2 bg-zinc-900 text-zinc-400 uppercase font-bold rounded-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FFC515] hover:bg-[#e6b010] text-black font-black uppercase rounded-xs flex items-center gap-1.5"
                >
                  <CheckCircle2 size={14} />
                  <span>Save & Issue Invoice</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Client Diet Popup Form Modal */}
      {isAddDietModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-[#0e0e14] border border-[#FFC515]/40 max-w-4xl w-full rounded-sm shadow-2xl font-mono-num text-xs flex flex-col my-auto max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-[#12121a] shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#FFC515]/20 text-[#FFC515] rounded-xs border border-[#FFC515]/40 shrink-0">
                  <Utensils size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-white font-display">
                      ASSIGN BESPOKE DIET — {client.name}
                    </h3>
                    <span className="px-2 py-0.5 bg-[#FFC515]/20 text-[#FFC515] border border-[#FFC515]/40 text-[10px] font-bold uppercase rounded-xs">
                      POPUP BUILDER
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Weekly calendar scheduler • 3 or 4 meal count preset • All fields optional with approx calories
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddDietModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xs transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSaveAndAssignDietSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              
              {/* SECTION 1: WEEKLY CALENDAR & ACTIVE DAYS */}
              <div className="bg-[#14141e] border border-white/10 p-4 rounded-sm space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-[#FFC515]" />
                    <span className="text-xs font-black uppercase text-white tracking-wider">
                      1. WEEKLY CALENDAR & DAY SELECTOR
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      (Click any day below to configure its distinct meals)
                    </span>
                  </div>

                  {/* Quick Week Presets */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSelectedWeeklyDays(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])}
                      className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-xs border transition-colors ${
                        selectedWeeklyDays.length === 7
                          ? 'bg-[#FFC515] text-black border-[#FFC515]'
                          : 'bg-zinc-900 text-zinc-300 border-white/10 hover:border-white/30'
                      }`}
                    >
                      All 7 Days
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedWeeklyDays(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])}
                      className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-xs border transition-colors ${
                        selectedWeeklyDays.length === 5 && !selectedWeeklyDays.includes('Sat') && !selectedWeeklyDays.includes('Sun')
                          ? 'bg-[#FFC515] text-black border-[#FFC515]'
                          : 'bg-zinc-900 text-zinc-300 border-white/10 hover:border-white/30'
                      }`}
                    >
                      Mon - Fri (Weekdays)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedWeeklyDays(['Sat', 'Sun'])}
                      className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-xs border transition-colors ${
                        selectedWeeklyDays.length === 2 && selectedWeeklyDays.includes('Sat') && selectedWeeklyDays.includes('Sun')
                          ? 'bg-[#FFC515] text-black border-[#FFC515]'
                          : 'bg-zinc-900 text-zinc-300 border-white/10 hover:border-white/30'
                      }`}
                    >
                      Sat - Sun (Weekends)
                    </button>
                  </div>
                </div>

                {/* 7 Days Cards - Click to Switch Active Editing Day, Toggle Checkbox */}
                <div className="grid grid-cols-7 gap-1.5 sm:gap-2 pt-1">
                  {WEEK_DAYS.map(day => {
                    const isSelected = selectedWeeklyDays.includes(day.id);
                    const isCurrent = activeModalDay === day.id;
                    const dayMeals = weeklyMealsByDay[day.id] || [];
                    const dayCals = dayMeals.reduce((s, m) => s + m.items.reduce((iSum, it) => iSum + (Number(it.approxCalories) || 0), 0), 0);

                    return (
                      <div
                        key={day.id}
                        onClick={() => setActiveModalDay(day.id)}
                        className={`p-2 sm:p-2.5 rounded-xs border text-center transition-all cursor-pointer relative ${
                          isCurrent
                            ? 'bg-[#FFC515] text-black border-[#FFC515] font-black shadow-md ring-2 ring-[#FFC515]/50 scale-[1.02]'
                            : isSelected
                              ? 'bg-[#181824] text-zinc-200 border-white/20 hover:border-[#FFC515]/60 hover:text-white'
                              : 'bg-zinc-900/60 text-zinc-500 border-white/5 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[9px] mb-0.5">
                          <span className="font-mono font-black">{day.label}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleWeeklyDay(day.id);
                            }}
                            title={isSelected ? 'Day is active in schedule' : 'Day is off'}
                            className={`text-[8px] px-1 py-0.2 rounded-xs font-bold ${
                              isSelected
                                ? isCurrent ? 'bg-black text-[#FFC515]' : 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-zinc-800 text-zinc-400'
                            }`}
                          >
                            {isSelected ? 'ON' : 'OFF'}
                          </button>
                        </div>
                        <span className={`block text-xs sm:text-sm font-black ${isCurrent ? 'text-black' : 'text-white'}`}>
                          {day.full.slice(0, 3)}
                        </span>
                        <span className={`block text-[10px] font-bold mt-0.5 ${isCurrent ? 'text-black/90' : 'text-[#FFC515]'}`}>
                          ~{dayCals} kcal
                        </span>
                        <span className={`block text-[8px] font-mono mt-0.5 ${isCurrent ? 'text-black/75' : 'text-zinc-400'}`}>
                          {dayMeals.length} meals
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Day Utility Tools: Load 7-Day Variety, Copy to All, Copy to Next */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-xs">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleLoad7DayVariety}
                      className="px-2.5 py-1 bg-[#FFC515]/15 hover:bg-[#FFC515] text-[#FFC515] hover:text-black border border-[#FFC515]/40 text-[10px] font-extrabold uppercase rounded-xs transition-colors cursor-pointer flex items-center gap-1"
                      title="Auto-fill 7 distinct nutritious daily menus for the whole week"
                    >
                      <Sparkles size={11} />
                      <span>⚡ Load 7-Day Distinct Variety Preset</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyActiveDayToAll}
                      className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-[10px] font-bold uppercase rounded-xs transition-colors cursor-pointer flex items-center gap-1"
                      title={`Copy ${activeModalDay}'s meals to all 7 days`}
                    >
                      <Copy size={11} />
                      <span>Copy {activeModalDay} to All Days</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyActiveDayToNext}
                      className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-[10px] font-bold uppercase rounded-xs transition-colors cursor-pointer flex items-center gap-1"
                      title={`Duplicate ${activeModalDay}'s meals to the next day`}
                    >
                      <ChevronRight size={11} />
                      <span>Copy to Next Day →</span>
                    </button>
                  </div>

                  <span className="text-[10px] text-zinc-400">
                    Weekly Avg: <strong className="text-white font-mono">{modalWeeklyAvgCalories} kcal/day</strong>
                  </span>
                </div>

                <div className="pt-1">
                  <input
                    type="text"
                    value={scheduleNotes}
                    onChange={(e) => setScheduleNotes(e.target.value)}
                    placeholder="Schedule Notes (Optional — e.g. Mon-Fri: Deficit • Sat: High Carb Refeed • Sun: Rest)"
                    className="w-full bg-[#101018] border border-white/10 px-3 py-1.5 text-zinc-300 text-xs rounded-xs focus:border-[#FFC515] focus:outline-none placeholder:text-zinc-600"
                  />
                </div>
              </div>

              {/* SECTION 2: 3 OR 4 MEALS TOGGLE & PLAN BASICS */}
              <div className="bg-[#14141e] border border-white/10 p-4 rounded-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-[#FFC515]" />
                    <span className="text-xs font-black uppercase text-white tracking-wider">
                      2. MEAL COUNT PRESET & TIMINGS
                    </span>
                    <span className="text-[10px] text-[#FFC515] font-bold">
                      ({modalMeals.length} Meals for {activeModalDay})
                    </span>
                  </div>

                  {/* 3 or 4 Meals Toggle Buttons */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-400 uppercase font-bold hidden sm:inline">PRESET:</span>
                    <button
                      type="button"
                      onClick={() => handleToggleMealsPreset(3)}
                      className={`px-3 py-1.5 text-xs font-black uppercase rounded-xs border transition-all cursor-pointer ${
                        mealsCountPreset === 3 && modalMeals.length === 3
                          ? 'bg-[#FFC515] text-black border-[#FFC515] shadow-sm'
                          : 'bg-zinc-900 text-zinc-300 border-white/15 hover:border-white/30'
                      }`}
                    >
                      ⚡ 3 MEALS (Breakfast, Lunch, Dinner)
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleMealsPreset(4)}
                      className={`px-3 py-1.5 text-xs font-black uppercase rounded-xs border transition-all cursor-pointer ${
                        mealsCountPreset === 4 && modalMeals.length === 4
                          ? 'bg-[#FFC515] text-black border-[#FFC515] shadow-sm'
                          : 'bg-zinc-900 text-zinc-300 border-white/15 hover:border-white/30'
                      }`}
                    >
                      ⚡ 4 MEALS (Breakfast, Lunch, Snack, Dinner)
                    </button>

                    <button
                      type="button"
                      onClick={handleAddCustomMeal}
                      className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase rounded-xs border border-white/10 cursor-pointer"
                      title="Add an extra custom meal"
                    >
                      + Add Meal
                    </button>
                  </div>
                </div>

                {/* Protocol Info (All Optional) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div>
                    <label className="block text-[10px] text-zinc-400 uppercase font-bold mb-1">
                      Plan Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={dietPlanName}
                      onChange={(e) => setDietPlanName(e.target.value)}
                      placeholder={`e.g. ${client.name}'s Custom Diet Protocol`}
                      className="w-full bg-[#101018] border border-white/10 px-3 py-1.5 text-white text-xs rounded-xs focus:border-[#FFC515] focus:outline-none placeholder:text-zinc-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-zinc-400 uppercase font-bold mb-1">
                      Diet Type (Optional)
                    </label>
                    <select
                      value={dietType}
                      onChange={(e) => setDietType(e.target.value as DietType)}
                      className="w-full bg-[#101018] border border-white/10 px-3 py-1.5 text-white text-xs rounded-xs focus:border-[#FFC515] focus:outline-none"
                    >
                      <option value="VEGETARIAN">Vegetarian (Pure/Dairy)</option>
                      <option value="NON-VEGETARIAN">Non-Vegetarian (Eggs, Chicken, Fish)</option>
                      <option value="VEGAN">Vegan (Plant-Based)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#FFC515] uppercase font-bold mb-1">
                      Daily Calorie Target (Optional / Approx)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        value={dietTargetCalories}
                        onChange={(e) => setDietTargetCalories(e.target.value ? Number(e.target.value) : '')}
                        placeholder={`e.g. ${modalTotalApproxCalories || client.dailyCalories || 1800}`}
                        className="flex-1 bg-[#101018] border border-white/10 px-3 py-1.5 text-[#FFC515] font-black text-xs rounded-xs focus:border-[#FFC515] focus:outline-none placeholder:text-zinc-600"
                      />
                      <button
                        type="button"
                        onClick={() => setDietTargetCalories(modalTotalApproxCalories)}
                        className="px-2 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-bold uppercase rounded-xs border border-white/10 shrink-0 cursor-pointer"
                        title="Sync with current sum of meals"
                      >
                        Sync ({modalTotalApproxCalories})
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: ASSIGN ALL THE FOOD (MEAL-BY-MEAL WITH DISH DROPDOWN) */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#181826] border border-[#FFC515]/30 p-3 rounded-xs">
                  <div className="flex items-center gap-2">
                    <Utensils size={16} className="text-[#FFC515]" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase text-white tracking-wider">
                          3. MEALS FOR {WEEK_DAYS.find(d => d.id === activeModalDay)?.full?.toUpperCase() || activeModalDay}
                        </span>
                        <span className="px-1.5 py-0.2 bg-[#FFC515] text-black text-[9px] font-black uppercase rounded-xs">
                          {activeModalDay}
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-400">
                        Pick dishes from the dropdown under each meal. Every day has a different meal!
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-zinc-400">
                      Day Total: <strong className="text-[#FFC515] font-black">{modalTotalApproxCalories.toLocaleString()} kcal</strong>
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-zinc-400">
                      Protein: <strong className="text-white font-bold">{modalTotalApproxProtein}g</strong>
                    </span>
                  </div>
                </div>

                {modalMeals.map((meal, mIdx) => {
                  const mealCalories = meal.items.reduce((s, it) => s + (Number(it.approxCalories) || 0), 0);
                  const mealProtein = meal.items.reduce((s, it) => s + (Number(it.protein) || 0), 0);

                  // Determine recommended food list based on meal category/name
                  const mealNameLower = (meal.name || '').toLowerCase();
                  let recommendedFoods = categorizedFoods.lunch;
                  if (mealNameLower.includes('breakfast') || meal.category === 'BREAKFAST') {
                    recommendedFoods = categorizedFoods.breakfast;
                  } else if (mealNameLower.includes('snack') || meal.category === 'SNACK') {
                    recommendedFoods = categorizedFoods.snack;
                  } else if (mealNameLower.includes('dinner') || meal.category === 'DINNER') {
                    recommendedFoods = categorizedFoods.dinner;
                  }

                  return (
                    <div key={meal.id} className="bg-[#14141e] border border-white/10 p-4 rounded-sm space-y-3.5">
                      {/* Meal Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                        <div className="flex flex-wrap items-center gap-2 flex-1">
                          <span className="px-2 py-0.5 bg-[#FFC515]/20 text-[#FFC515] border border-[#FFC515]/40 text-[10px] font-black uppercase rounded-xs">
                            Meal {mIdx + 1}
                          </span>
                          <input
                            type="text"
                            value={meal.name}
                            onChange={(e) => handleUpdateMealHeader(meal.id, 'name', e.target.value)}
                            placeholder="Meal Name (e.g. Breakfast)"
                            className="bg-[#101018] border border-white/10 px-2.5 py-1 text-white font-bold text-xs rounded-xs focus:border-[#FFC515] focus:outline-none min-w-[140px] max-w-[200px]"
                          />
                          <div className="flex items-center gap-1">
                            <Clock size={12} className="text-zinc-500" />
                            <input
                              type="text"
                              value={meal.scheduledTime}
                              onChange={(e) => handleUpdateMealHeader(meal.id, 'scheduledTime', e.target.value)}
                              placeholder="Time (e.g. 08:30 AM)"
                              className="bg-[#101018] border border-white/10 px-2 py-1 text-zinc-300 text-xs rounded-xs focus:border-[#FFC515] focus:outline-none w-24"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="px-2.5 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-black rounded-xs">
                            Approx {mealCalories} kcal {mealProtein > 0 ? `• ${mealProtein}g P` : ''}
                          </span>
                          {modalMeals.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveMeal(meal.id)}
                              className="p-1 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                              title="Delete this meal"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* DISH SELECTION DROPDOWN */}
                      <div className="bg-[#101018] border border-[#FFC515]/30 p-2.5 rounded-xs space-y-2">
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-1 text-xs">
                          <label className="text-[10px] text-[#FFC515] uppercase font-black flex items-center gap-1">
                            <Utensils size={12} />
                            <span>Add Dish to {meal.name} (Dropdown Selector):</span>
                          </label>
                          <span className="text-[10px] text-zinc-400">
                            Selecting auto-fills approx calories & nutrition
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                          <div className="relative flex-1">
                            <select
                              defaultValue=""
                              onChange={(e) => {
                                if (!e.target.value) return;
                                handleAddDishFromSelector(meal.id, e.target.value);
                                e.target.value = '';
                              }}
                              className="w-full bg-[#181824] border border-white/20 hover:border-[#FFC515] px-3 py-2 text-xs text-white font-bold rounded-xs focus:border-[#FFC515] focus:outline-none appearance-none cursor-pointer pr-8"
                            >
                              <option value="">▼ Select Dish from Food Database to Add...</option>

                              {/* Recommended for this Meal */}
                              <optgroup label={`⭐ Recommended for ${meal.name}`}>
                                {recommendedFoods.slice(0, 15).map(food => (
                                  <option key={food.id} value={food.id}>
                                    {food.name} (~{food.calories} kcal • {food.protein}g P)
                                  </option>
                                ))}
                              </optgroup>

                              {/* High-Protein Vegetarian */}
                              <optgroup label="🌱 High-Protein Vegetarian (Paneer, Soya, Tofu, Dals)">
                                {categorizedFoods.highProteinVeg.slice(0, 20).map(food => (
                                  <option key={food.id} value={food.id}>
                                    {food.name} (~{food.calories} kcal • {food.protein}g P)
                                  </option>
                                ))}
                              </optgroup>

                              {/* High-Protein Non-Vegetarian */}
                              <optgroup label="🍗 High-Protein Lean Meats, Fish & Eggs">
                                {categorizedFoods.highProteinNonVeg.slice(0, 20).map(food => (
                                  <option key={food.id} value={food.id}>
                                    {food.name} (~{food.calories} kcal • {food.protein}g P)
                                  </option>
                                ))}
                              </optgroup>

                              {/* Quick Fitness Combos */}
                              <optgroup label="⚡ Quick Combos & Shakes">
                                {QUICK_FOOD_PRESETS.map((preset, idx) => (
                                  <option key={idx} value={preset.name}>
                                    {preset.name} (~{preset.approxCalories} kcal • {preset.protein}g P)
                                  </option>
                                ))}
                              </optgroup>
                            </select>
                            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#FFC515] pointer-events-none" />
                          </div>

                          <button
                            type="button"
                            onClick={() => handleAddItemToMeal(meal.id)}
                            className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/20 text-xs font-bold uppercase rounded-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
                          >
                            <Plus size={13} />
                            <span>+ Custom Blank Dish</span>
                          </button>
                        </div>
                      </div>

                      {/* 1-Click Quick Food Preset Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 py-1.5 bg-[#101018]/60 p-2 rounded-xs border border-white/5">
                        <span className="text-[10px] text-zinc-400 uppercase font-bold flex items-center gap-1 mr-1">
                          <Sparkles size={11} className="text-[#FFC515]" />
                          <span>1-Click Add:</span>
                        </span>
                        {QUICK_FOOD_PRESETS.slice(0, 6).map((preset, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => handleAddItemToMeal(meal.id, {
                              name: preset.name,
                              approxCalories: preset.approxCalories,
                              serving: preset.serving,
                              protein: preset.protein,
                              carbs: preset.carbs,
                              fat: preset.fat
                            })}
                            className="px-2 py-0.5 bg-zinc-900 hover:bg-[#FFC515] text-zinc-300 hover:text-black border border-white/10 hover:border-[#FFC515] text-[10px] font-bold rounded-xs transition-colors cursor-pointer"
                          >
                            + {preset.name.split('+')[0].trim()} (~{preset.approxCalories})
                          </button>
                        ))}
                      </div>

                      {/* Food Items Rows */}
                      <div className="space-y-2">
                        {meal.items.map((item) => (
                          <div
                            key={item.id}
                            className="bg-[#101018] border border-white/10 p-2.5 rounded-xs flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                          >
                            <div className="flex-1">
                              <input
                                type="text"
                                value={item.name}
                                onChange={(e) => handleUpdateMealItem(meal.id, item.id, 'name', e.target.value)}
                                placeholder="Food Item Name (Optional — e.g. 2 Rotis + Dal + Paneer, Oats Bowl)"
                                className="w-full bg-[#181824] border border-white/10 px-2.5 py-1 text-white font-bold text-xs rounded-xs focus:border-[#FFC515] focus:outline-none placeholder:text-zinc-600"
                              />
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <div className="w-28">
                                <input
                                  type="number"
                                  value={item.approxCalories}
                                  onChange={(e) => handleUpdateMealItem(meal.id, item.id, 'approxCalories', e.target.value ? Number(e.target.value) : '')}
                                  placeholder="Approx kcal"
                                  className="w-full bg-[#181824] border border-[#FFC515]/30 px-2 py-1 text-[#FFC515] font-black text-xs rounded-xs focus:border-[#FFC515] focus:outline-none text-right placeholder:text-zinc-600"
                                  title="Approx Calories (Optional)"
                                />
                              </div>

                              <div className="w-28">
                                <input
                                  type="text"
                                  value={item.serving}
                                  onChange={(e) => handleUpdateMealItem(meal.id, item.id, 'serving', e.target.value)}
                                  placeholder="Qty / Serving"
                                  className="w-full bg-[#181824] border border-white/10 px-2 py-1 text-zinc-300 text-xs rounded-xs focus:border-[#FFC515] focus:outline-none placeholder:text-zinc-600"
                                  title="Serving or portion size (Optional)"
                                />
                              </div>

                              <div className="w-16">
                                <input
                                  type="number"
                                  value={item.protein}
                                  onChange={(e) => handleUpdateMealItem(meal.id, item.id, 'protein', e.target.value ? Number(e.target.value) : '')}
                                  placeholder="Prot g"
                                  className="w-full bg-[#181824] border border-sky-500/20 px-1.5 py-1 text-sky-400 font-bold text-xs rounded-xs focus:border-sky-500 focus:outline-none text-right placeholder:text-zinc-600"
                                  title="Protein grams (Optional)"
                                />
                              </div>

                              <button
                                type="button"
                                onClick={() => handleRemoveItemFromMeal(meal.id, item.id)}
                                disabled={meal.items.length <= 1}
                                className="p-1 text-zinc-500 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                title="Remove item"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-1 flex justify-start">
                        <button
                          type="button"
                          onClick={() => handleAddItemToMeal(meal.id)}
                          className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-xs font-bold uppercase rounded-xs flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Plus size={12} />
                          <span>+ Add Another Food Item</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Coach Directives Note (Optional) */}
              <div className="bg-[#14141e] border border-white/10 p-4 rounded-sm space-y-1.5">
                <label className="block text-[10px] text-zinc-400 uppercase font-bold">
                  Coach Directives & Hydration Guidelines (Optional)
                </label>
                <textarea
                  rows={2}
                  value={dietCoachNotes}
                  onChange={(e) => setDietCoachNotes(e.target.value)}
                  placeholder="e.g. Drink 3.5L of water daily. Post-workout whey shake within 30 mins. Keep sodium moderate."
                  className="w-full bg-[#101018] border border-white/10 p-2.5 text-zinc-200 text-xs rounded-xs focus:border-[#FFC515] focus:outline-none placeholder:text-zinc-600"
                />
              </div>

              {/* Sticky Bottom Actions Bar */}
              <div className="p-4 sm:p-5 border-t border-white/10 bg-[#12121a] -mx-4 -mb-4 sm:-mx-6 sm:-mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sticky bottom-0 z-10">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <span>Total Approx Calories:</span>
                    <span className="text-base font-black text-[#FFC515]">{modalTotalApproxCalories.toLocaleString()} kcal</span>
                  </div>
                  <span className="text-zinc-600 hidden sm:inline">•</span>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <span>Approx Protein:</span>
                    <span className="text-white font-bold">{modalTotalApproxProtein}g</span>
                  </div>
                  <span className="text-zinc-600 hidden sm:inline">•</span>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <span>Coverage:</span>
                    <span className="text-emerald-400 font-bold">{selectedWeeklyDays.length} Days / Week</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddDietModalOpen(false)}
                    className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white uppercase font-bold text-xs rounded-xs border border-white/10 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#FFC515] hover:bg-[#e6b010] text-black font-black uppercase text-xs rounded-xs flex items-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
                  >
                    <CheckCircle2 size={15} />
                    <span>ASSIGN & SAVE DIET TO CLIENT</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
