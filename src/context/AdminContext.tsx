import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AdminRole, 
  Lead, 
  LeadStatus, 
  LeadSource, 
  LeadTag, 
  Customer, 
  Order, 
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
  | 'leads'
  | 'leads-detail'
  | 'customers'
  | 'challenges'
  | 'workouts'
  | 'exercises'
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

  // Customers
  customers: Customer[];
  updateCustomer: (customerId: string, data: Partial<Customer>) => void;

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
  const [activeSubtab, setActiveSubtab] = useState<AdminSubtab>('dashboard');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  // Leads state
  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('fitnetheist_crm_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [scoringRules, setScoringRules] = useState<LeadScoringRules>(INITIAL_LEAD_SCORING_RULES);

  // Customers state
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('fitnetheist_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('fitnetheist_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Subscriptions state
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    const saved = localStorage.getItem('fitnetheist_subscriptions');
    return saved ? JSON.parse(saved) : INITIAL_SUBSCRIPTIONS;
  });

  // CMS state
  const [cmsPages, setCmsPages] = useState<CMSPage[]>(() => {
    const saved = localStorage.getItem('fitnetheist_cms_pages');
    return saved ? JSON.parse(saved) : INITIAL_CMS_PAGES;
  });

  // Blog state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('fitnetheist_cms_blog');
    return saved ? JSON.parse(saved) : INITIAL_BLOG_POSTS;
  });

  // FAQ state
  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    const saved = localStorage.getItem('fitnetheist_cms_faqs');
    return saved ? JSON.parse(saved) : INITIAL_FAQS;
  });

  // Media Library state
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>(() => {
    const saved = localStorage.getItem('fitnetheist_cms_media');
    return saved ? JSON.parse(saved) : INITIAL_MEDIA_LIBRARY;
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
    localStorage.setItem('fitnetheist_cms_pages', JSON.stringify(cmsPages));
  }, [cmsPages]);

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

    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        return {
          ...l,
          notes: [newNote, ...l.notes],
          activities: [
            {
              id: `act_${Date.now()}`,
              timestamp: new Date().toISOString(),
              type: 'NOTE' as const,
              description: `Added note: "${noteText.length > 40 ? noteText.substring(0, 40) + '...' : noteText}"`,
              performedBy: currentRole.replace('_', ' ')
            },
            ...l.activities
          ]
        };
      }
      return l;
    }));
  };

  const scheduleFollowUp = (leadId: string, date: string, type: 'CALL' | 'WHATSAPP' | 'EMAIL' | 'MEETING', notes: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        const entry = {
          date,
          type,
          notes,
          loggedBy: currentRole.replace('_', ' ')
        };
        return {
          ...l,
          nextFollowUpDate: date,
          status: 'FOLLOW_UP',
          followUpHistory: [entry, ...l.followUpHistory],
          activities: [
            {
              id: `act_${Date.now()}`,
              timestamp: new Date().toISOString(),
              type: 'FOLLOW_UP' as const,
              description: `Scheduled ${type} follow-up on ${date}: ${notes}`,
              performedBy: currentRole.replace('_', ' ')
            },
            ...l.activities
          ]
        };
      }
      return l;
    }));
  };

  const toggleLeadTag = (leadId: string, tag: LeadTag) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        const hasTag = l.tags.includes(tag);
        const newTags = hasTag ? l.tags.filter(t => t !== tag) : [...l.tags, tag];
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
    setCustomers(prev => prev.map(c => c.id === customerId ? { ...c, ...data } : c));
    logAuditAction('UPDATED_CUSTOMER_PROFILE', customerId);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, paymentStatus: status } : o));
    logAuditAction('UPDATED_ORDER_STATUS', orderId, undefined, status);
  };

  const updateSubscriptionStatus = (subId: string, status: SubscriptionStatus) => {
    setSubscriptions(prev => prev.map(s => s.id === subId ? { ...s, status } : s));
    logAuditAction('UPDATED_SUBSCRIPTION_STATUS', subId, undefined, status);
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
      updateCustomer,
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
