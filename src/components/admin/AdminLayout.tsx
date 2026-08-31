import React, { useState } from 'react';
import { useAdmin, AdminSubtab } from '../../context/AdminContext';
import { useApp } from '../../context/AppContext';
import { AdminRole } from '../../types/admin';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Trophy, 
  Dumbbell, 
  Activity, 
  Utensils, 
  Sparkles, 
  MessageSquare, 
  ShoppingBag, 
  CreditCard, 
  Layers, 
  FileText, 
  HelpCircle, 
  Image as ImageIcon, 
  Compass, 
  Search, 
  ShieldCheck, 
  History, 
  Settings, 
  Bell, 
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Plus
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { 
    currentRole, 
    setCurrentRole, 
    activeSubtab, 
    setActiveSubtab, 
    notifications,
    markNotificationRead,
    clearAllNotifications,
    leads,
    orders
  } = useAdmin();
  
  const { setActiveTab } = useApp();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  const roles: { role: AdminRole; label: string; desc: string }[] = [
    { role: 'SUPER_ADMIN', label: 'SUPER ADMIN', desc: 'Unrestricted master access to all operations & settings' },
    { role: 'ADMIN', label: 'ADMIN', desc: 'Business operations, CRM, orders & full CMS control' },
    { role: 'COACH', label: 'COACH', desc: 'Workouts, exercises, nutrition & athlete progress' },
    { role: 'CONTENT_MANAGER', label: 'CONTENT MANAGER', desc: 'Pages, blog, media, testimonials & FAQs' },
    { role: 'SALES_LEAD_MANAGER', label: 'SALES / LEAD MANAGER', desc: 'CRM pipeline, leads, follow-ups & conversions' }
  ];

  // RBAC permission check
  const isAllowed = (subtab: AdminSubtab): boolean => {
    if (currentRole === 'SUPER_ADMIN' || currentRole === 'ADMIN') return true;
    if (currentRole === 'COACH') {
      return ['dashboard', 'workouts', 'exercises', 'diets', 'foods', 'challenges', 'transformations', 'customers'].includes(subtab);
    }
    if (currentRole === 'CONTENT_MANAGER') {
      return ['dashboard', 'cms-pages', 'cms-sections', 'cms-blog', 'cms-faq', 'cms-media', 'cms-navigation', 'cms-seo', 'testimonials', 'transformations'].includes(subtab);
    }
    if (currentRole === 'SALES_LEAD_MANAGER') {
      return ['dashboard', 'leads', 'leads-detail', 'customers', 'orders', 'subscriptions', 'payments'].includes(subtab);
    }
    return true;
  };

  const navGroups = [
    {
      group: 'OPERATIONS & CRM',
      items: [
        { id: 'dashboard' as AdminSubtab, label: 'Dashboard', icon: LayoutDashboard, badge: undefined },
        { id: 'leads' as AdminSubtab, label: 'Leads & CRM', icon: Users, badge: `${leads.length}` },
        { id: 'customers' as AdminSubtab, label: 'Customers', icon: UserCheck, badge: undefined },
        { id: 'challenges' as AdminSubtab, label: 'Challenges', icon: Trophy, badge: undefined },
        { id: 'workouts' as AdminSubtab, label: 'Workout Programs', icon: Dumbbell, badge: undefined },
        { id: 'exercises' as AdminSubtab, label: 'Exercise Library', icon: Activity, badge: undefined },
        { id: 'foods' as AdminSubtab, label: 'Food Database', icon: Utensils, badge: undefined },
        { id: 'diets' as AdminSubtab, label: 'Diet & Macro Rules', icon: Utensils, badge: undefined },
        { id: 'transformations' as AdminSubtab, label: 'Transformations', icon: Sparkles, badge: undefined },
        { id: 'testimonials' as AdminSubtab, label: 'Testimonials', icon: MessageSquare, badge: undefined },
        { id: 'orders' as AdminSubtab, label: 'Orders & Sales', icon: ShoppingBag, badge: `${orders.length}` },
        { id: 'subscriptions' as AdminSubtab, label: 'Subscriptions', icon: CreditCard, badge: undefined },
      ]
    },
    {
      group: 'CONTENT MANAGEMENT (CMS)',
      items: [
        { id: 'cms-pages' as AdminSubtab, label: 'Page & Sections', icon: Layers, badge: 'Live' },
        { id: 'cms-blog' as AdminSubtab, label: 'Blog & Articles', icon: FileText, badge: undefined },
        { id: 'cms-faq' as AdminSubtab, label: 'FAQ Database', icon: HelpCircle, badge: undefined },
        { id: 'cms-media' as AdminSubtab, label: 'Media Library', icon: ImageIcon, badge: undefined },
        { id: 'cms-navigation' as AdminSubtab, label: 'Navigation & Links', icon: Compass, badge: undefined },
        { id: 'cms-seo' as AdminSubtab, label: 'Global SEO', icon: Search, badge: undefined }
      ]
    },
    {
      group: 'SYSTEM & GOVERNANCE',
      items: [
        { id: 'users' as AdminSubtab, label: 'User Directory', icon: ShieldCheck, badge: undefined },
        { id: 'activity' as AdminSubtab, label: 'Audit Logs', icon: History, badge: undefined },
        { id: 'settings' as AdminSubtab, label: 'Settings & Scoring', icon: Settings, badge: undefined }
      ]
    }
  ];

  return (
    <div id="fitnetheist-admin-app" className="min-h-screen bg-[#08080a] text-zinc-100 flex flex-col font-sans selection:bg-[#d8ff38] selection:text-black">
      
      {/* Top Admin Status Bar */}
      <header className="h-16 border-b border-white/10 bg-[#0c0c0f] sticky top-0 z-40 px-4 sm:px-6 flex items-center justify-between">
        
        {/* Left Branding & Mobile Trigger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white border border-white/10"
            aria-label="Toggle admin navigation"
          >
            {isMobileNavOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div className="flex items-center gap-3">
            <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
              FITNETHEIST <span className="text-[#d8ff38] text-xs font-mono-num font-bold px-1.5 py-0.5 border border-[#d8ff38]/40 bg-[#d8ff38]/10 uppercase">ADMIN OS</span>
            </span>
          </div>
        </div>

        {/* Right Admin Controls: Role Switcher, Notifications, Public Site Exit */}
        <div className="flex items-center gap-3 sm:gap-4 font-mono-num text-xs">
          
          {/* Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="px-3 py-1.5 bg-zinc-900 border border-white/15 hover:border-[#d8ff38]/50 flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
            >
              <span className="h-2 w-2 rounded-full bg-[#d8ff38]"></span>
              <span className="font-bold text-white uppercase">{currentRole.replace('_', ' ')}</span>
              <ChevronDown size={14} className="text-zinc-500" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#0d0d11] border border-white/15 p-2 shadow-2xl z-50">
                <div className="px-3 py-2 border-b border-white/10 text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                  SWITCH ACTIVE ROLE
                </div>
                <div className="space-y-1 mt-1">
                  {roles.map(r => (
                    <button
                      key={r.role}
                      onClick={() => {
                        setCurrentRole(r.role);
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left p-2.5 transition-colors flex flex-col ${
                        currentRole === r.role ? 'bg-zinc-800 text-[#d8ff38] border-l-2 border-[#d8ff38]' : 'hover:bg-zinc-900 text-zinc-300'
                      }`}
                    >
                      <span className="font-bold text-xs uppercase text-white">{r.label}</span>
                      <span className="text-[10px] text-zinc-400 mt-0.5 leading-snug">{r.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notifications Center */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 bg-zinc-900 border border-white/10 hover:border-white/30 text-zinc-300 relative"
              aria-label="View notifications"
            >
              <Bell size={16} />
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-[#d8ff38] text-black font-extrabold text-[9px] flex items-center justify-center rounded-full">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0d0d11] border border-white/15 shadow-2xl z-50 p-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white uppercase text-xs">NOTIFICATIONS</span>
                    <span className="text-[10px] bg-zinc-800 text-[#d8ff38] px-1.5 py-0.5 font-bold">
                      {notifications.length}
                    </span>
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearAllNotifications}
                      className="text-[10px] text-zinc-400 hover:text-white uppercase underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <p className="text-zinc-500 text-center py-6 text-xs">No new notifications.</p>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationRead(n.id);
                          if (n.linkSubtab) setActiveSubtab(n.linkSubtab as AdminSubtab);
                          setIsNotificationsOpen(false);
                        }}
                        className={`p-3 border transition-colors cursor-pointer ${
                          n.read ? 'bg-zinc-950/40 border-white/5 opacity-70' : 'bg-zinc-900/90 border-[#d8ff38]/30 shadow-[0_0_10px_rgba(216,255,56,0.05)]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs text-white">{n.title}</span>
                          <span className="text-[10px] text-zinc-500">{n.timestamp}</span>
                        </div>
                        <p className="text-zinc-400 text-xs leading-relaxed">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Exit to Public Website */}
          <button
            onClick={() => setActiveTab('home')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-zinc-300 hover:text-white uppercase font-bold tracking-wider transition-colors"
          >
            <span>LIVE SITE</span>
            <ExternalLink size={12} />
          </button>

        </div>

      </header>

      {/* Main Admin Body: Sidebar + Main Content Canvas */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Admin Sidebar */}
        <aside className={`
          fixed lg:static inset-y-16 left-0 z-30 w-64 bg-[#0a0a0d] border-r border-white/10 flex flex-col justify-between overflow-y-auto transition-transform duration-200
          ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          
          <div className="p-4 space-y-6">
            {navGroups.map(group => (
              <div key={group.group} className="space-y-1">
                <div className="px-3 py-1.5 text-[10px] font-mono-num font-bold text-zinc-500 uppercase tracking-widest">
                  {group.group}
                </div>
                {group.items.map(item => {
                  const allowed = isAllowed(item.id);
                  const isActive = activeSubtab === item.id;
                  const Icon = item.icon;

                  if (!allowed) return null;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSubtab(item.id);
                        setIsMobileNavOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-mono-num font-semibold uppercase tracking-wider transition-all border ${
                        isActive
                          ? 'bg-[#d8ff38] text-black border-[#d8ff38] font-bold shadow-[0_0_15px_rgba(216,255,56,0.2)]'
                          : 'border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={15} className={isActive ? 'text-black' : 'text-zinc-400'} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[10px] px-1.5 py-0.2 font-mono-num font-bold ${
                          isActive ? 'bg-black text-[#d8ff38]' : 'bg-zinc-800 text-zinc-300 border border-white/10'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Quick Support / Version Info */}
          <div className="p-4 border-t border-white/10 bg-zinc-950 font-mono-num text-[11px] text-zinc-500">
            <div className="flex items-center justify-between text-zinc-400">
              <span>ENGINE: v2.4.0</span>
              <span className="text-[#d8ff38]">ONLINE</span>
            </div>
            <p className="mt-1 text-[10px] text-zinc-600">FITNETHEIST ADMINISTRATIVE SUITE</p>
          </div>

        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#08080a] p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
};
