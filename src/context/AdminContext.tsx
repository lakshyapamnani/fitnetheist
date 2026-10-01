import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AdminRole, 
  Lead, 
  LeadStatus, 
  LeadSource, 
  LeadTag, 
  Customer, 
  ClientCheckIn,
  ClientCoachNote,
  Order, 
  Invoice,
  InvoiceStatus,
  Subscription, 
  CMSPage, 
  CMSSection, 
  BlogPost, 
  FAQItem, 
  MediaItem, 
  NavigationItem, 
  SEOConfig, 
  AuditLog, 
  AdminNotification,
  LeadScoringRules,
  OrderStatus,
  SubscriptionStatus
} from '../types/admin';
import {
  INITIAL_LEADS,
  INITIAL_CUSTOMERS,
  INITIAL_ORDERS,
  INITIAL_INVOICES,
  INITIAL_SUBSCRIPTIONS,
  INITIAL_CMS_PAGES,
  INITIAL_BLOG_POSTS,
  INITIAL_FAQS,
  INITIAL_MEDIA_LIBRARY,
  INITIAL_NAVIGATION_ITEMS,
  INITIAL_SEO_CONFIG,
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_LEAD_SCORING_RULES
} from '../data/adminInitialData';

export type AdminSubtab = 
  | 'dashboard'
  | 'cms'
  | 'leads'
  | 'leads-detail'
  | 'clients'
  | 'clients-detail'
  | 'workouts'
  | 'exercises'
  | 'invoices'
  | 'customers'
  | 'challenges'
  | 'diets'
  | 'foods'
  | 'transformations'
  | 'testimonials'
  | 'users'
  | 'orders'
  | 'subscriptions'
  | 'payments'
  | 'cms-pages'
  | 'cms-sections'
  | 'cms-media'
  | 'cms-blog'
  | 'cms-faq'
  | 'cms-navigation'
  | 'cms-seo'
  | 'activity'
  | 'settings';

interface AdminContextType {
  // Access control & navigation
  currentRole: AdminRole;
  setCurrentRole: (role: AdminRole) => void;
  activeSubtab: AdminSubtab;
  setActiveSubtab: (tab: AdminSubtab) => void;
  selectedLeadId: string | null;
  setSelectedLeadId: (id: string | null) => void;
  selectedCustomerId: string | null;
  setSelectedCustomerId: (id: string | null) => void;
  
  // Invoices & Receipts
  invoices: Invoice[];
  createInvoice: (invoice: Invoice) => void;
  updateInvoiceStatus: (id: string, status: InvoiceStatus) => void;
  deleteInvoice: (id: string) => void;
  
  // Leads CRM
  leads: Lead[];
  scoringRules: LeadScoringRules;
  updateScoringRules: (newRules: Partial<LeadScoringRules>) => void;
  trackLeadEvent: (
    eventType: string,
    payload?: {
      source?: string;
      details?: string;
      [key: string]: any;
    }
  ) => void;
  captureLead: (data: {
    name: string;
    email: string;
    phone?: string;
    source: LeadSource;
    goal?: any;
    dietType?: any;
    preferredCuisine?: any;
    age?: number;
    sex?: 'male' | 'female';
    heightCm?: number;
    weightKg?: number;
    activityLevel?: any;
    calculatedCalories?: number;
    challengeInterest?: string;
    workoutPreferences?: any;
    dietPreferences?: any;
    customNote?: string;
  }) => Lead;
  updateLeadStatus: (leadId: string, status: LeadStatus, note?: string) => void;
  assignLead: (leadId: string, assignedTo: string) => void;
  addLeadNote: (leadId: string, noteText: string) => void;
  scheduleFollowUp: (leadId: string, date: string, type: 'CALL' | 'WHATSAPP' | 'EMAIL' | 'MEETING', notes: string) => void;
  toggleLeadTag: (leadId: string, tag: LeadTag) => void;
  deleteLead: (leadId: string) => void;

  // Customers & Clients Management
  customers: Customer[];
  addCustomer: (data: Partial<Customer>) => Customer;
  convertLeadToCustomer: (leadId: string, clientDetails?: Partial<Customer>) => Customer;
  updateCustomer: (customerId: string, data: Partial<Customer>) => void;
  deleteCustomer: (customerId: string) => void;
  addClientCheckIn: (customerId: string, checkIn: Omit<ClientCheckIn, 'id'>) => void;
  addClientCoachNote: (customerId: string, note: Omit<ClientCoachNote, 'id' | 'createdAt'>) => void;

  // Orders & Subscriptions
  orders: Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  subscriptions: Subscription[];
  updateSubscriptionStatus: (subId: string, status: SubscriptionStatus) => void;

  // CMS
  cmsPages: CMSPage[];
  activePage: CMSPage;
  toggleSection: (pageId: string, sectionId: string) => void;
  reorderSection: (pageId: string, sectionId: string, direction: 'UP' | 'DOWN') => void;
  updateSection: (pageId: string, sectionId: string, updates: Partial<CMSSection>) => void;
  savePageDraft: (pageId: string) => void;
  publishPage: (pageId: string) => void;
  
  // Blog CMS
  blogPosts: BlogPost[];
  saveBlogPost: (post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;

  // FAQ CMS
  faqs: FAQItem[];
  saveFaq: (faq: Partial<FAQItem>) => void;
  deleteFaq: (id: string) => void;

  // Media Library
  mediaLibrary: MediaItem[];
  addMediaItem: (item: Omit<MediaItem, 'id' | 'uploadDate'>) => void;
  deleteMediaItem: (id: string) => void;

  // Navigation & SEO
  navItems: NavigationItem[];
  updateNavItems: (items: NavigationItem[]) => void;
  seoConfig: SEOConfig;
  updateSeoConfig: (config: Partial<SEOConfig>) => void;

  // Audit Logs & Notifications
  auditLogs: AuditLog[];
  logAuditAction: (action: string, targetResource: string, oldValue?: string, newValue?: string) => void;
  notifications: AdminNotification[];
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Testimonials queue
  testimonials: {
    id: string;
    name: string;
    photo: string;
    quote: string;
    goal: string;
    challengeName: string;
    rating: number;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    submittedDate: string;
  }[];
  updateTestimonialStatus: (id: string, status: 'APPROVED' | 'REJECTED') => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<AdminRole>('SUPER_ADMIN');
  const [activeSubtab, setActiveSubtab] = useState<AdminSubtab>('cms');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  // Leads state
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem('fitnetheist_crm_leads');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const clean = parsed.filter((l: any) => !/^(lead_10[1-9])/i.test(l.id));
          return clean.map((l: any) => ({
            ...l,
            tags: Array.isArray(l.tags) ? l.tags : [],
            notes: Array.isArray(l.notes) ? l.notes : [],
            timeline: Array.isArray(l.timeline) ? l.timeline : [],
            followUpHistory: Array.isArray(l.followUpHistory) ? l.followUpHistory : [],
            activities: Array.isArray(l.activities) ? l.activities : []
          }));
        }
      }
    } catch (e) {
      console.error('Error parsing leads from localStorage', e);
    }
    return INITIAL_LEADS;
  });

  const [scoringRules, setScoringRules] = useState<LeadScoringRules>(INITIAL_LEAD_SCORING_RULES);

  // Customers state
  const [customers, setCustomers] = useState<Customer[]>(() => {
    try {
      const saved = localStorage.getItem('fitnetheist_customers');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((c: any) => !/^(cust_0[1-9]|cust_10[1-9])/i.test(c.id));
        }
      }
    } catch (e) {
      console.error('Error parsing customers from localStorage', e);
    }
    return INITIAL_CUSTOMERS;
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('fitnetheist_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((o: any) => !/^(ORD-984[0-9])/i.test(o.id));
        }
      }
    } catch (e) {
      console.error('Error parsing orders from localStorage', e);
    }
    return INITIAL_ORDERS;
  });

  // Invoices state
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    try {
      const saved = localStorage.getItem('fitnetheist_invoices');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((i: any) => !/^(inv_100[1-9])/i.test(i.id));
        }
      }
    } catch (e) {
      console.error('Error parsing invoices from localStorage', e);
    }
    return INITIAL_INVOICES;
  });

  // Subscriptions state
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    try {
      const saved = localStorage.getItem('fitnetheist_subscriptions');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((s: any) => !/^(sub_00[1-9])/i.test(s.id));
        }
      }
    } catch (e) {
      console.error('Error parsing subscriptions from localStorage', e);
    }
    return INITIAL_SUBSCRIPTIONS;
  });

  // CMS state
  const [cmsPages, setCmsPages] = useState<CMSPage[]>(() => {
    try {
      const saved = localStorage.getItem('fitnetheist_cms_pages');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error parsing cms pages from localStorage', e);
    }
    return INITIAL_CMS_PAGES;
  });

  // Blog state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('fitnetheist_cms_blog');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error parsing blog posts from localStorage', e);
    }
    return INITIAL_BLOG_POSTS;
  });

  // FAQ state
  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    try {
      const saved = localStorage.getItem('fitnetheist_cms_faqs');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error parsing faqs from localStorage', e);
    }
    return INITIAL_FAQS;
  });

  // Media Library state
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>(() => {
    try {
      const saved = localStorage.getItem('fitnetheist_cms_media');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error parsing media from localStorage', e);
    }
    return INITIAL_MEDIA_LIBRARY;
  });

  // Navigation & SEO
  const [navItems, setNavItems] = useState<NavigationItem[]>(INITIAL_NAVIGATION_ITEMS);
  const [seoConfig, setSeoConfig] = useState<SEOConfig>(INITIAL_SEO_CONFIG);

  // Audit Logs & Notifications
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [notifications, setNotifications] = useState<AdminNotification[]>(INITIAL_NOTIFICATIONS);

  // Testimonials queue
  const [testimonials, setTestimonials] = useState<{
    id: string;
    name: string;
    photo: string;
    quote: string;
    goal: string;
    challengeName: string;
    rating: number;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    submittedDate: string;
  }[]>([
    {
      id: 't_01',
      name: 'Rhea Chakraborty',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      quote: 'The Mifflin-St Jeor accuracy combined with Indian vegetarian meal swaps helped me lose 8.5kg while retaining lean muscle!',
      goal: 'Fat Loss',
      challengeName: '21 Day Ignite',
      rating: 5,
      status: 'APPROVED',
      submittedDate: '2026-08-20'
    },
    {
      id: 't_02',
      name: 'Sahil Deshmukh',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      quote: 'Zero fluff, straight science. Smashed my deadlift PR to 190kg during the 60 Day Transform cohort.',
      goal: 'Strength & Hypertrophy',
      challengeName: '60 Day Transform',
      rating: 5,
      status: 'APPROVED',
      submittedDate: '2026-08-22'
    },
    {
      id: 't_03',
      name: 'Varun Grover',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      quote: 'The accountability check-ins in the app keep you dialed in even on days you do not feel motivated.',
      goal: 'Body Recomp',
      challengeName: '90 Day Beast Mode',
      rating: 5,
      status: 'PENDING',
      submittedDate: '2026-08-26'
    }
  ]);

  // Persist important data
  useEffect(() => {
    localStorage.setItem('fitnetheist_crm_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('fitnetheist_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('fitnetheist_cms_pages', JSON.stringify(cmsPages));
  }, [cmsPages]);

  useEffect(() => {
    localStorage.setItem('fitnetheist_invoices', JSON.stringify(invoices));
  }, [invoices]);

  // Log an audit action helper
  const logAuditAction = (action: string, targetResource: string, oldValue?: string, newValue?: string) => {
    const newLog: AuditLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      actor: currentRole === 'SUPER_ADMIN' ? 'Head Administrator' : currentRole.replace('_', ' '),
      actorRole: currentRole,
      action,
      targetResource,
      oldValue,
      newValue
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Automated Lead Score Calculator
  const computeScore = (source: LeadSource, hasChallenge: boolean, hasCalories: boolean, hasPreferences: boolean): number => {
    let score = 15; // base score
    if (source === 'CALORIE_CALCULATOR') score += scoringRules.calculatorCompleted;
    if (source === 'DIET_GENERATOR') score += scoringRules.dietGenerated;
    if (source === 'WORKOUT_PLANNER') score += scoringRules.workoutGenerated;
    if (source === 'CONTACT_FORM') score += scoringRules.contactFormSubmitted;
    if (source === 'CHALLENGE' || hasChallenge) score += scoringRules.challengeViewed + 20;
    if (hasCalories) score += 15;
    if (hasPreferences) score += 10;
    return Math.min(100, score);
  };

  // Track user and lead events throughout tool interactions
  const trackLeadEvent = (
    eventType: string,
    payload?: {
      source?: string;
      details?: string;
      [key: string]: any;
    }
  ) => {
    const source = payload?.source || 'APP';
    const details = payload?.details || `User performed action: ${eventType}`;
    logAuditAction(`EVENT_${eventType}`, source, undefined, details);

    if (
      eventType === 'PURCHASE_COMPLETED' || 
      eventType === 'CHECKOUT_STARTED' || 
      eventType === 'CONTACT_FORM_SUBMITTED'
    ) {
      const newNotif: AdminNotification = {
        id: `notif_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
        timestamp: 'Just now',
        title: eventType.replace(/_/g, ' '),
        message: details,
        type: eventType === 'PURCHASE_COMPLETED' 
          ? 'CHALLENGE_ENROLLMENT' 
          : eventType === 'CONTACT_FORM_SUBMITTED' 
            ? 'CONTACT_FORM' 
            : 'HOT_LEAD',
        read: false,
        linkSubtab: 'leads'
      };
      setNotifications(prev => [newNotif, ...prev]);
    }
  };

  // Lead Capture
  const captureLead = (data: {
    name: string;
    email: string;
    phone?: string;
    source: LeadSource;
    goal?: any;
    dietType?: any;
    preferredCuisine?: any;
    age?: number;
    sex?: 'male' | 'female';
    heightCm?: number;
    weightKg?: number;
    activityLevel?: any;
    calculatedCalories?: number;
    challengeInterest?: string;
    workoutPreferences?: any;
    dietPreferences?: any;
    customNote?: string;
  }): Lead => {
    const cleanEmail = data.email.trim().toLowerCase();
    const existingIndex = leads.findIndex(l => l.email.toLowerCase() === cleanEmail);
    const calculatedScore = computeScore(
      data.source, 
      !!data.challengeInterest, 
      !!data.calculatedCalories, 
      !!(data.dietPreferences || data.workoutPreferences)
    );

    const classification = calculatedScore >= 70 ? 'HOT' : calculatedScore >= 35 ? 'WARM' : 'COLD';
    const assignedStaff = data.challengeInterest ? 'Vikram Mehta (Sales Lead)' : 'Ananya Roy (Advisor)';

    if (existingIndex >= 0) {
      // Update existing lead without duplicate
      const existing = leads[existingIndex];
      const updatedScore = Math.min(100, existing.score + 25);
      const updatedClassification = updatedScore >= 70 ? 'HOT' : 'WARM';

      const newActivity = {
        id: `act_${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'TOOL_INTERACTION' as const,
        description: `Lead re-engaged via ${data.source.replace(/_/g, ' ')}${data.challengeInterest ? ` (${data.challengeInterest})` : ''}`,
        performedBy: 'SYSTEM_BOT'
      };

      const updatedLead: Lead = {
        ...existing,
        name: data.name || existing.name,
        phone: data.phone || existing.phone,
        goal: data.goal || existing.goal,
        dietType: data.dietType || existing.dietType,
        preferredCuisine: data.preferredCuisine || existing.preferredCuisine,
        age: data.age || existing.age,
        sex: data.sex || existing.sex,
        heightCm: data.heightCm || existing.heightCm,
        weightKg: data.weightKg || existing.weightKg,
        calculatedCalories: data.calculatedCalories || existing.calculatedCalories,
        challengeInterest: data.challengeInterest || existing.challengeInterest,
        score: updatedScore,
        scoreClassification: updatedClassification,
        activities: [newActivity, ...existing.activities]
      };

      if (data.customNote) {
        updatedLead.notes = [
          {
            id: `n_${Date.now()}`,
            createdAt: new Date().toISOString(),
            author: 'SYSTEM_BOT',
            content: data.customNote
          },
          ...existing.notes
        ];
      }

      const updatedLeads = [...leads];
      updatedLeads[existingIndex] = updatedLead;
      setLeads(updatedLeads);

      // Notification
      const newNotif: AdminNotification = {
        id: `notif_${Date.now()}`,
        timestamp: 'Just now',
        title: `Lead Activity: ${updatedLead.name}`,
        message: `Interacted with ${data.source}. Score updated to ${updatedScore}/100.`,
        type: updatedClassification === 'HOT' ? 'HOT_LEAD' : 'NEW_LEAD',
        read: false,
        linkSubtab: 'leads'
      };
      setNotifications(prev => [newNotif, ...prev]);

      return updatedLead;
    } else {
      // Create new lead
      const defaultTags: LeadTag[] = [];
      if (classification === 'HOT') defaultTags.push('HOT');
      else if (classification === 'WARM') defaultTags.push('WARM');
      else defaultTags.push('COLD');

      if (data.challengeInterest) {
        if (data.challengeInterest.includes('21')) defaultTags.push('21_DAY');
        if (data.challengeInterest.includes('60')) defaultTags.push('60_DAY');
        if (data.challengeInterest.includes('90')) defaultTags.push('90_DAY');
      }
      if (data.dietType === 'VEGETARIAN') defaultTags.push('VEGETARIAN');
      if (data.dietType === 'NON-VEGETARIAN') defaultTags.push('NON_VEGETARIAN');
      if (data.dietType === 'VEGAN') defaultTags.push('VEGAN');

      const initialNotes = data.customNote ? [{
        id: `n_${Date.now()}`,
        createdAt: new Date().toISOString(),
        author: 'SYSTEM_BOT',
        content: data.customNote
      }] : [];

      const newLead: Lead = {
        id: `lead_${Date.now()}`,
        name: data.name || 'Anonymous Athlete',
        phone: data.phone || 'Pending capture',
        email: cleanEmail,
        source: data.source,
        goal: data.goal || 'BUILD_MUSCLE',
        dietType: data.dietType,
        preferredCuisine: data.preferredCuisine,
        status: 'NEW',
        assignedTo: assignedStaff,
        createdAt: new Date().toISOString(),
        estimatedValue: data.challengeInterest ? 249 : 149,
        score: calculatedScore,
        scoreClassification: classification,
        age: data.age,
        sex: data.sex,
        heightCm: data.heightCm,
        weightKg: data.weightKg,
        activityLevel: data.activityLevel,
        calculatedCalories: data.calculatedCalories,
        challengeInterest: data.challengeInterest,
        workoutPreferences: data.workoutPreferences,
        dietPreferences: data.dietPreferences,
        tags: defaultTags,
        notes: initialNotes,
        activities: [
          {
            id: `act_${Date.now()}`,
            timestamp: new Date().toISOString(),
            type: 'CREATED',
            description: `Lead auto-captured via ${data.source.replace(/_/g, ' ')} with score ${calculatedScore}`,
            performedBy: 'SYSTEM_BOT'
          }
        ],
        followUpHistory: []
      };

      setLeads(prev => [newLead, ...prev]);

      // Notification
      const newNotif: AdminNotification = {
        id: `notif_${Date.now()}`,
        timestamp: 'Just now',
        title: `New Lead: ${newLead.name} (${classification})`,
        message: `Captured via ${data.source}. Score: ${calculatedScore}. Assigned to ${assignedStaff}.`,
        type: classification === 'HOT' ? 'HOT_LEAD' : 'NEW_LEAD',
        read: false,
        linkSubtab: 'leads'
      };
      setNotifications(prev => [newNotif, ...prev]);

      return newLead;
    }
  };

  const updateLeadStatus = (leadId: string, status: LeadStatus, note?: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        const oldStatus = l.status;
        const newActivities = [
          {
            id: `act_${Date.now()}`,
            timestamp: new Date().toISOString(),
            type: 'STATUS_CHANGE' as const,
            description: `Status updated from ${oldStatus} to ${status}${note ? `: ${note}` : ''}`,
            performedBy: currentRole.replace('_', ' ')
          },
          ...l.activities
        ];

        let updatedNotes = l.notes;
        if (note) {
          updatedNotes = [
            {
              id: `n_${Date.now()}`,
              createdAt: new Date().toISOString(),
              author: currentRole.replace('_', ' '),
              content: note
            },
            ...l.notes
          ];
        }

        // If converted, add to customer list
        if (status === 'CONVERTED' && oldStatus !== 'CONVERTED') {
          const newCust: Customer = {
            id: `cust_${Date.now()}`,
            name: l.name,
            email: l.email,
            phone: l.phone,
            joinedDate: new Date().toISOString().split('T')[0],
            totalSpent: l.estimatedValue || 149,
            activeChallengeName: l.challengeInterest || '21 Day Ignite',
            lastActivity: 'Just now',
            dietGoal: l.goal,
            workoutSplit: '4-Day Athletic Split',
            streakDays: 1,
            orderIds: [`ORD-${Math.floor(1000 + Math.random() * 9000)}`]
          };
          setCustomers(cPrev => [newCust, ...cPrev]);
        }

        return {
          ...l,
          status,
          activities: newActivities,
          notes: updatedNotes
        };
      }
      return l;
    }));

    logAuditAction('UPDATED_LEAD_STATUS', leadId, undefined, status);
  };

  const assignLead = (leadId: string, assignedTo: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        const oldStaff = l.assignedTo;
        return {
          ...l,
          assignedTo,
          activities: [
            {
              id: `act_${Date.now()}`,
              timestamp: new Date().toISOString(),
              type: 'NOTE' as const,
              description: `Reassigned from ${oldStaff} to ${assignedTo}`,
              performedBy: currentRole.replace('_', ' ')
            },
            ...l.activities
          ]
        };
      }
      return l;
    }));
    logAuditAction('ASSIGNED_LEAD', leadId, undefined, assignedTo);
  };

  const addLeadNote = (leadId: string, noteText: string) => {
    if (!noteText.trim()) return;
    const newNote = {
      id: `n_${Date.now()}`,
      createdAt: new Date().toISOString(),
      author: currentRole.replace('_', ' '),
      content: noteText
    };

    setLeads(prev => (prev || []).map(l => {
      if (l.id === leadId) {
        const currentNotes = Array.isArray(l.notes) ? l.notes : [];
        const currentActivities = Array.isArray(l.activities) ? l.activities : [];
        return {
          ...l,
          notes: [newNote, ...currentNotes],
          activities: [
            {
              id: `act_${Date.now()}`,
              timestamp: new Date().toISOString(),
              type: 'NOTE' as const,
              description: `Added note: "${noteText.length > 40 ? noteText.substring(0, 40) + '...' : noteText}"`,
              performedBy: currentRole.replace('_', ' ')
            },
            ...currentActivities
          ]
        };
      }
      return l;
    }));
  };

  const scheduleFollowUp = (leadId: string, date: string, type: 'CALL' | 'WHATSAPP' | 'EMAIL' | 'MEETING', notes: string) => {
    setLeads(prev => (prev || []).map(l => {
      if (l.id === leadId) {
        const entry = {
          date,
          type,
          notes,
          loggedBy: currentRole.replace('_', ' ')
        };
        const currentFollowUps = Array.isArray(l.followUpHistory) ? l.followUpHistory : [];
        const currentActivities = Array.isArray(l.activities) ? l.activities : [];
        return {
          ...l,
          nextFollowUpDate: date,
          status: 'FOLLOW_UP',
          followUpHistory: [entry, ...currentFollowUps],
          activities: [
            {
              id: `act_${Date.now()}`,
              timestamp: new Date().toISOString(),
              type: 'FOLLOW_UP' as const,
              description: `Scheduled ${type} follow-up on ${date}: ${notes}`,
              performedBy: currentRole.replace('_', ' ')
            },
            ...currentActivities
          ]
        };
      }
      return l;
    }));
  };

  const toggleLeadTag = (leadId: string, tag: LeadTag) => {
    setLeads(prev => (prev || []).map(l => {
      if (l.id === leadId) {
        const currentTags = Array.isArray(l.tags) ? l.tags : [];
        const hasTag = currentTags.includes(tag);
        const newTags = hasTag ? currentTags.filter(t => t !== tag) : [...currentTags, tag];
        return {
          ...l,
          tags: newTags
        };
      }
      return l;
    }));
  };

  const deleteLead = (leadId: string) => {
    setLeads(prev => prev.filter(l => l.id !== leadId));
    logAuditAction('DELETED_LEAD', leadId);
  };

  const updateScoringRules = (newRules: Partial<LeadScoringRules>) => {
    setScoringRules(prev => ({ ...prev, ...newRules }));
    logAuditAction('UPDATED_SCORING_RULES', 'Global Lead Scoring Matrix');
  };

  const updateCustomer = (customerId: string, data: Partial<Customer>) => {
    setCustomers(prev => (prev || []).map(c => c.id === customerId ? { ...c, ...data } : c));
    logAuditAction('UPDATED_CUSTOMER_PROFILE', customerId);
  };

  const addCustomer = (data: Partial<Customer>): Customer => {
    const newId = `cust_${Date.now()}`;
    const startingWeight = data.startingWeightKg || 78;
    const currentWeight = data.currentWeightKg || startingWeight;
    const targetWeight = data.targetWeightKg || (data.dietGoal === 'LOSE_WEIGHT' ? startingWeight - 6 : startingWeight + 4);
    const calTarget = data.dailyCalories || 2100;

    const newCustomer: Customer = {
      id: newId,
      name: data.name || 'New Athlete',
      email: data.email || `athlete_${Date.now()}@domain.com`,
      phone: data.phone || '',
      avatarUrl: data.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      joinedDate: data.joinedDate || new Date().toISOString().split('T')[0],
      totalSpent: data.totalSpent ?? 0,
      status: data.status || 'ACTIVE',
      programTier: data.programTier || '90-Day VIP 1-on-1 Transformation',
      assignedCoach: data.assignedCoach || (currentRole === 'COACH' ? 'Assigned Coach' : 'Coach Neetu (Head Coach)'),
      startDate: data.startDate || new Date().toISOString().split('T')[0],
      endDate: data.endDate || new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
      age: data.age || 28,
      gender: data.gender || 'MALE',
      city: data.city || 'India',
      emergencyContact: data.emergencyContact || '',
      heightCm: data.heightCm || 175,
      startingWeightKg: startingWeight,
      currentWeightKg: currentWeight,
      targetWeightKg: targetWeight,
      targetDate: data.targetDate || '',
      injuriesOrMedicalConditions: data.injuriesOrMedicalConditions || 'None reported.',
      dietGoal: data.dietGoal || 'BUILD_MUSCLE',
      dietType: data.dietType || 'VEGETARIAN',
      dailyCalories: calTarget,
      proteinGrams: data.proteinGrams || Math.round(startingWeight * 2),
      carbsGrams: data.carbsGrams || Math.round((calTarget * 0.45) / 4),
      fatsGrams: data.fatsGrams || Math.round((calTarget * 0.25) / 9),
      waterLitres: data.waterLitres || 3.5,
      mealsPerDay: data.mealsPerDay || 4,
      allergiesOrRestrictions: data.allergiesOrRestrictions || 'None',
      cheatMealProtocol: data.cheatMealProtocol || '1 clean cheat meal weekly',
      workoutSplit: data.workoutSplit || 'Push / Pull / Legs',
      trainingDaysPerWeek: data.trainingDaysPerWeek || 5,
      experienceLevel: data.experienceLevel || 'INTERMEDIATE',
      cardioProtocol: data.cardioProtocol || '8,000 steps daily',
      strengthBenchmarks: data.strengthBenchmarks || { benchPressKg: 70, squatKg: 90, deadliftKg: 120, overheadPressKg: 40 },
      streakDays: 1,
      lastActivity: 'Just enrolled',
      orderIds: [],
      checkIns: data.checkIns || [
        {
          id: `chk_${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          weightKg: currentWeight,
          adherenceScore: 10,
          clientNotes: 'Athlete profile initialized. Ready to begin training.',
          coachFeedback: 'Welcome to the team! Protocol assigned and active.',
          photosUploaded: false
        }
      ],
      coachNotes: data.coachNotes || [
        {
          id: `cn_${Date.now()}`,
          createdAt: new Date().toISOString(),
          author: currentRole === 'SUPER_ADMIN' ? 'Admin' : currentRole.replace('_', ' '),
          type: 'GENERAL',
          content: `Athlete enrolled into ${data.programTier || 'Coaching Program'}. Initial protocol active.`
        }
      ]
    };

    setCustomers(prev => [newCustomer, ...(prev || [])]);
    logAuditAction('CREATED_NEW_CLIENT', newCustomer.name, undefined, `${newCustomer.programTier} (Assigned: ${newCustomer.assignedCoach})`);

    const newNotif: AdminNotification = {
      id: `notif_${Date.now()}`,
      timestamp: 'Just now',
      title: `New Client Enrolled: ${newCustomer.name}`,
      message: `Directly onboarded to ${newCustomer.programTier}. Assigned to ${newCustomer.assignedCoach}.`,
      type: 'NEW_LEAD',
      read: false,
      linkSubtab: 'clients'
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newCustomer;
  };

  const convertLeadToCustomer = (leadId: string, clientDetails?: Partial<Customer>): Customer => {
    const lead = leads.find(l => l.id === leadId);
    const existingCust = customers.find(c => lead && (c.email.toLowerCase() === lead.email.toLowerCase() || (lead.phone && c.phone === lead.phone)));
    
    const startingWeight = clientDetails?.startingWeightKg || lead?.weightKg || 75;
    const currentWeight = clientDetails?.currentWeightKg || lead?.weightKg || startingWeight;
    const targetWeight = clientDetails?.targetWeightKg || (lead?.goal === 'LOSE_WEIGHT' ? startingWeight - 6 : startingWeight + 4);
    const calTarget = clientDetails?.dailyCalories || lead?.calculatedCalories || 2000;

    const newCustomer: Customer = {
      id: existingCust ? existingCust.id : `cust_${Date.now()}`,
      name: clientDetails?.name || lead?.name || 'New Client',
      email: clientDetails?.email || lead?.email || `client_${Date.now()}@domain.com`,
      phone: clientDetails?.phone || lead?.phone || '',
      avatarUrl: clientDetails?.avatarUrl || existingCust?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      joinedDate: new Date().toISOString().split('T')[0],
      totalSpent: clientDetails?.totalSpent ?? (lead?.estimatedValue || 7500),
      status: clientDetails?.status || 'ACTIVE',
      programTier: clientDetails?.programTier || lead?.challengeInterest || '90-Day VIP 1-on-1 Transformation',
      assignedCoach: clientDetails?.assignedCoach || (lead?.assignedTo && lead.assignedTo !== 'Unassigned' ? lead.assignedTo : 'Coach Neetu (Head Coach)'),
      startDate: clientDetails?.startDate || new Date().toISOString().split('T')[0],
      endDate: clientDetails?.endDate || new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
      age: clientDetails?.age || lead?.age || 29,
      gender: clientDetails?.gender || (lead?.sex === 'female' ? 'FEMALE' : 'MALE'),
      city: clientDetails?.city || 'India',
      emergencyContact: clientDetails?.emergencyContact || '',
      heightCm: clientDetails?.heightCm || lead?.heightCm || 175,
      startingWeightKg: startingWeight,
      currentWeightKg: currentWeight,
      targetWeightKg: targetWeight,
      targetDate: clientDetails?.targetDate || '',
      injuriesOrMedicalConditions: clientDetails?.injuriesOrMedicalConditions || 'None reported.',
      dietGoal: clientDetails?.dietGoal || (lead?.goal as any) || 'BUILD_MUSCLE',
      dietType: clientDetails?.dietType || (lead?.dietType as any) || 'VEGETARIAN',
      dailyCalories: calTarget,
      proteinGrams: clientDetails?.proteinGrams || Math.round(startingWeight * 2),
      carbsGrams: clientDetails?.carbsGrams || Math.round((calTarget * 0.45) / 4),
      fatsGrams: clientDetails?.fatsGrams || Math.round((calTarget * 0.25) / 9),
      waterLitres: clientDetails?.waterLitres || 3.5,
      mealsPerDay: clientDetails?.mealsPerDay || (lead?.dietPreferences?.mealsPerDay || 4),
      allergiesOrRestrictions: clientDetails?.allergiesOrRestrictions || (lead?.dietPreferences?.restrictions?.join(', ') || 'None'),
      cheatMealProtocol: clientDetails?.cheatMealProtocol || '1 clean cheat meal weekly',
      workoutSplit: clientDetails?.workoutSplit || (lead?.workoutPreferences?.daysPerWeek === 4 ? '4-Day Upper / Lower' : 'Push / Pull / Legs 6-Day'),
      trainingDaysPerWeek: clientDetails?.trainingDaysPerWeek || (lead?.workoutPreferences?.daysPerWeek || 4),
      experienceLevel: clientDetails?.experienceLevel || (lead?.workoutPreferences?.experience as any) || 'INTERMEDIATE',
      cardioProtocol: clientDetails?.cardioProtocol || '8,500 daily steps',
      strengthBenchmarks: clientDetails?.strengthBenchmarks || { benchPressKg: 70, squatKg: 90, deadliftKg: 120, overheadPressKg: 40 },
      streakDays: 1,
      lastActivity: 'Converted from Lead',
      orderIds: existingCust ? existingCust.orderIds : [],
      convertedFromLeadId: leadId,
      checkIns: existingCust?.checkIns || [
        {
          id: `chk_${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          weightKg: currentWeight,
          adherenceScore: 10,
          clientNotes: 'Initial onboarding check-in. Ready to begin protocol.',
          coachFeedback: 'Welcome aboard! Dial in water and initial meal prep today.',
          photosUploaded: false
        }
      ],
      coachNotes: [
        {
          id: `cn_${Date.now()}`,
          createdAt: new Date().toISOString(),
          author: currentRole === 'SUPER_ADMIN' ? 'Admin' : currentRole.replace('_', ' '),
          type: 'GENERAL',
          content: `Converted from CRM Lead (${lead?.source?.replace(/_/g, ' ') || 'CRM'}). Starting: ${startingWeight}kg, Goal: ${targetWeight}kg.`
        },
        ...(existingCust?.coachNotes || [])
      ]
    };

    if (existingCust) {
      setCustomers(prev => (prev || []).map(c => c.id === existingCust.id ? newCustomer : c));
    } else {
      setCustomers(prev => [newCustomer, ...(prev || [])]);
    }

    // Update the lead status to CONVERTED
    setLeads(prev => (prev || []).map(l => {
      if (l.id === leadId) {
        return {
          ...l,
          status: 'CONVERTED' as LeadStatus,
          activities: [
            {
              id: `act_${Date.now()}`,
              timestamp: new Date().toISOString(),
              type: 'CONVERTED' as const,
              description: `Successfully converted to active Client Profile (#${newCustomer.id})`,
              performedBy: currentRole.replace('_', ' ')
            },
            ...(Array.isArray(l.activities) ? l.activities : [])
          ]
        };
      }
      return l;
    }));

    logAuditAction('CONVERTED_LEAD_TO_CLIENT', newCustomer.name, lead?.status, 'CONVERTED');

    const newNotif: AdminNotification = {
      id: `notif_${Date.now()}`,
      timestamp: 'Just now',
      title: `Lead Converted: ${newCustomer.name}`,
      message: `Enrolled into ${newCustomer.programTier}. Client profile created.`,
      type: 'NEW_PURCHASE',
      read: false,
      linkSubtab: 'clients'
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newCustomer;
  };

  const deleteCustomer = (customerId: string) => {
    setCustomers(prev => (prev || []).filter(c => c.id !== customerId));
    logAuditAction('DELETED_CUSTOMER_PROFILE', customerId);
  };

  const addClientCheckIn = (customerId: string, checkIn: Omit<ClientCheckIn, 'id'>) => {
    const newCheckIn: ClientCheckIn = {
      id: `chk_${Date.now()}`,
      ...checkIn
    };
    setCustomers(prev => (prev || []).map(c => {
      if (c.id === customerId) {
        const existingCheckIns = Array.isArray(c.checkIns) ? c.checkIns : [];
        return {
          ...c,
          currentWeightKg: checkIn.weightKg || c.currentWeightKg,
          lastActivity: 'Logged Check-in',
          streakDays: (c.streakDays || 0) + 1,
          checkIns: [newCheckIn, ...existingCheckIns]
        };
      }
      return c;
    }));
    logAuditAction('LOGGED_CLIENT_CHECKIN', customerId, undefined, `Weight: ${checkIn.weightKg}kg | Adherence: ${checkIn.adherenceScore}/10`);
  };

  const addClientCoachNote = (customerId: string, note: Omit<ClientCoachNote, 'id' | 'createdAt'>) => {
    const newNote: ClientCoachNote = {
      id: `cn_${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...note
    };
    setCustomers(prev => (prev || []).map(c => {
      if (c.id === customerId) {
        const existingNotes = Array.isArray(c.coachNotes) ? c.coachNotes : [];
        return {
          ...c,
          lastActivity: 'Coach Note Added',
          coachNotes: [newNote, ...existingNotes]
        };
      }
      return c;
    }));
    logAuditAction('ADDED_CLIENT_COACH_NOTE', customerId, undefined, note.type);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, paymentStatus: status } : o));
    logAuditAction('UPDATED_ORDER_STATUS', orderId, undefined, status);
  };

  const updateSubscriptionStatus = (subId: string, status: SubscriptionStatus) => {
    setSubscriptions(prev => prev.map(s => s.id === subId ? { ...s, status } : s));
    logAuditAction('UPDATED_SUBSCRIPTION_STATUS', subId, undefined, status);
  };

  // Invoice & Receipt operations
  const createInvoice = (invoice: Invoice) => {
    setInvoices(prev => [invoice, ...(prev || [])]);
    logAuditAction('CREATED_INVOICE_RECEIPT', invoice.invoiceNumber, undefined, `₹${invoice.totalAmount} (${invoice.type}) for ${invoice.clientName}`);
  };

  const updateInvoiceStatus = (id: string, status: InvoiceStatus) => {
    setInvoices(prev => (prev || []).map(inv => inv.id === id ? { ...inv, status } : inv));
    logAuditAction('UPDATED_INVOICE_STATUS', id, undefined, status);
  };

  const deleteInvoice = (id: string) => {
    setInvoices(prev => (prev || []).filter(inv => inv.id !== id));
    logAuditAction('DELETED_INVOICE', id);
  };

  // CMS Section controls
  const activePage = cmsPages.find(p => p.slug === 'home') || cmsPages[0];

  const toggleSection = (pageId: string, sectionId: string) => {
    setCmsPages(prev => prev.map(page => {
      if (page.id === pageId) {
        const updatedSections = page.sections.map(s => s.id === sectionId ? { ...s, enabled: !s.enabled } : s);
        return { ...page, sections: updatedSections, lastUpdated: new Date().toISOString() };
      }
      return page;
    }));
    logAuditAction('TOGGLED_CMS_SECTION', sectionId);
  };

  const reorderSection = (pageId: string, sectionId: string, direction: 'UP' | 'DOWN') => {
    setCmsPages(prev => prev.map(page => {
      if (page.id === pageId) {
        const sorted = [...page.sections].sort((a, b) => a.order - b.order);
        const index = sorted.findIndex(s => s.id === sectionId);
        if (index < 0) return page;

        if (direction === 'UP' && index > 0) {
          const currentOrder = sorted[index].order;
          sorted[index].order = sorted[index - 1].order;
          sorted[index - 1].order = currentOrder;
        } else if (direction === 'DOWN' && index < sorted.length - 1) {
          const currentOrder = sorted[index].order;
          sorted[index].order = sorted[index + 1].order;
          sorted[index + 1].order = currentOrder;
        }

        return { ...page, sections: sorted.sort((a, b) => a.order - b.order), lastUpdated: new Date().toISOString() };
      }
      return page;
    }));
    logAuditAction('REORDERED_CMS_SECTION', sectionId, undefined, direction);
  };

  const updateSection = (pageId: string, sectionId: string, updates: Partial<CMSSection>) => {
    setCmsPages(prev => prev.map(page => {
      if (page.id === pageId) {
        const updatedSections = page.sections.map(s => s.id === sectionId ? { ...s, ...updates } : s);
        return { ...page, sections: updatedSections, lastUpdated: new Date().toISOString() };
      }
      return page;
    }));
    logAuditAction('EDITED_CMS_SECTION_CONTENT', sectionId);
  };

  const savePageDraft = (pageId: string) => {
    logAuditAction('SAVED_PAGE_DRAFT', pageId);
  };

  const publishPage = (pageId: string) => {
    setCmsPages(prev => prev.map(p => p.id === pageId ? { ...p, isPublished: true, lastUpdated: new Date().toISOString(), updatedBy: currentRole } : p));
    logAuditAction('PUBLISHED_CMS_PAGE_LIVE', pageId);
  };

  // Blog CMS
  const saveBlogPost = (post: Partial<BlogPost>) => {
    if (post.id) {
      setBlogPosts(prev => prev.map(p => p.id === post.id ? { ...p, ...post } as BlogPost : p));
      logAuditAction('UPDATED_BLOG_POST', post.title || post.id);
    } else {
      const newPost: BlogPost = {
        id: `blog_${Date.now()}`,
        title: post.title || 'Untitled Protocol Guide',
        slug: post.slug || `article-${Date.now()}`,
        featuredImage: post.featuredImage || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
        excerpt: post.excerpt || '',
        content: post.content || '',
        author: post.author || 'Fitnetheist Research Group',
        category: post.category || 'Nutrition',
        tags: post.tags || ['Fitness', 'Protocol'],
        seoTitle: post.seoTitle || post.title || '',
        seoDescription: post.seoDescription || post.excerpt || '',
        status: post.status || 'PUBLISHED',
        publishDate: new Date().toISOString().split('T')[0]
      };
      setBlogPosts(prev => [newPost, ...prev]);
      logAuditAction('CREATED_BLOG_POST', newPost.title);
    }
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(p => p.id !== id));
    logAuditAction('DELETED_BLOG_POST', id);
  };

  // FAQ CMS
  const saveFaq = (faq: Partial<FAQItem>) => {
    if (faq.id) {
      setFaqs(prev => prev.map(f => f.id === faq.id ? { ...f, ...faq } as FAQItem : f));
      logAuditAction('UPDATED_FAQ_ITEM', faq.question || faq.id);
    } else {
      const newFaq: FAQItem = {
        id: `faq_${Date.now()}`,
        question: faq.question || 'New FAQ Question',
        answer: faq.answer || 'Detailed answer protocol explanation.',
        category: faq.category || 'GENERAL',
        order: faqs.length + 1,
        isPublished: faq.isPublished ?? true
      };
      setFaqs(prev => [...prev, newFaq]);
      logAuditAction('CREATED_FAQ_ITEM', newFaq.question);
    }
  };

  const deleteFaq = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
    logAuditAction('DELETED_FAQ_ITEM', id);
  };

  // Media Library
  const addMediaItem = (item: Omit<MediaItem, 'id' | 'uploadDate'>) => {
    const newItem: MediaItem = {
      ...item,
      id: `med_${Date.now()}`,
      uploadDate: new Date().toISOString().split('T')[0]
    };
    setMediaLibrary(prev => [newItem, ...prev]);
    logAuditAction('UPLOADED_MEDIA_ASSET', newItem.filename);
  };

  const deleteMediaItem = (id: string) => {
    setMediaLibrary(prev => prev.filter(m => m.id !== id));
    logAuditAction('DELETED_MEDIA_ASSET', id);
  };

  // Nav & SEO
  const updateNavItems = (items: NavigationItem[]) => {
    setNavItems(items);
    logAuditAction('UPDATED_NAVIGATION_ARCHITECTURE', 'Header/Footer Nav Matrix');
  };

  const updateSeoConfig = (config: Partial<SEOConfig>) => {
    setSeoConfig(prev => ({ ...prev, ...config }));
    logAuditAction('UPDATED_GLOBAL_SEO_METADATA', 'Meta OpenGraph Configuration');
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Testimonials
  const updateTestimonialStatus = (id: string, status: 'APPROVED' | 'REJECTED') => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    logAuditAction('MODERATED_TESTIMONIAL', id, undefined, status);
  };

  return (
    <AdminContext.Provider value={{
      currentRole,
      setCurrentRole,
      activeSubtab,
      setActiveSubtab,
      selectedLeadId,
      setSelectedLeadId,
      selectedCustomerId,
      setSelectedCustomerId,
      invoices,
      createInvoice,
      updateInvoiceStatus,
      deleteInvoice,
      leads,
      scoringRules,
      updateScoringRules,
      trackLeadEvent,
      captureLead,
      updateLeadStatus,
      assignLead,
      addLeadNote,
      scheduleFollowUp,
      toggleLeadTag,
      deleteLead,
      customers,
      addCustomer,
      convertLeadToCustomer,
      updateCustomer,
      deleteCustomer,
      addClientCheckIn,
      addClientCoachNote,
      orders,
      updateOrderStatus,
      subscriptions,
      updateSubscriptionStatus,
      cmsPages,
      activePage,
      toggleSection,
      reorderSection,
      updateSection,
      savePageDraft,
      publishPage,
      blogPosts,
      saveBlogPost,
      deleteBlogPost,
      faqs,
      saveFaq,
      deleteFaq,
      mediaLibrary,
      addMediaItem,
      deleteMediaItem,
      navItems,
      updateNavItems,
      seoConfig,
      updateSeoConfig,
      auditLogs,
      logAuditAction,
      notifications,
      markNotificationRead,
      clearAllNotifications,
      testimonials,
      updateTestimonialStatus
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
