import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Flame, 
  Wrench, 
  Sparkles, 
  User, 
  MoreHorizontal, 
  Trophy, 
  Users, 
  CreditCard, 
  Shield, 
  X,
  Zap,
  PhoneCall
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { activeTab, setActiveTab, user, openAuthModal } = useApp();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const primaryNavItems = [
    { id: 'home', label: 'HOME', icon: Flame },
    { id: 'tools', label: 'TOOLS', icon: Wrench },
    { id: 'transform', label: 'RESULTS', icon: Sparkles },
    { id: 'dashboard', label: user ? 'ME' : 'LOGIN', icon: User },
  ];

  const secondaryNavItems = [
    { id: 'home_pricing', label: 'RATE CARDS', icon: CreditCard, desc: 'Monthly & 90-Day Plans', isSection: true, targetId: 'rate-cards-section' },
    { id: 'home_connect', label: 'CONNECT', icon: PhoneCall, desc: 'WhatsApp & Direct Desk', isSection: true, targetId: 'connect-with-us-section' },
    { id: 'challenges', label: 'CHALLENGES', icon: Trophy, desc: 'Earn badges & streaks' },
    { id: 'community', label: 'THE TRIBE', icon: Users, desc: 'Athlete feed & leaderboard' },
    { id: 'admin', label: 'ADMIN HUB', icon: Shield, desc: 'Leads & analytics backend' },
  ];

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setIsMoreMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionJump = (targetId: string) => {
    setIsMoreMenuOpen(false);
    if (activeTab !== 'home') {
      setActiveTab('home');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Quick Access "More" Sheet Modal for Mobile */}
      {isMoreMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="absolute inset-0"
            onClick={() => setIsMoreMenuOpen(false)}
          />
          <div className="relative z-10 bg-[#0c0c10] border-t border-white/15 rounded-t-2xl p-5 pb-8 space-y-4 max-h-[80vh] overflow-y-auto shadow-2xl">
            
            {/* Grab Handle */}
            <div className="w-12 h-1.5 bg-zinc-700 rounded-full mx-auto mb-2 opacity-60" />

            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 bg-[#FFC515]" />
                <span className="text-xs font-mono-num font-bold text-white uppercase tracking-widest">
                  FITNETHEIST NAVIGATION
                </span>
              </div>
              <button 
                onClick={() => setIsMoreMenuOpen(false)}
                className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Grid of Secondary Features */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              {secondaryNavItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    id={`mobile-sheet-${item.id}`}
                    onClick={() => {
                      if (item.isSection) {
                        handleSectionJump(item.targetId!);
                      } else {
                        handleSelectTab(item.id);
                      }
                    }}
                    className="text-left p-3.5 border border-white/10 bg-[#101014] hover:bg-white/5 text-white/80 transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon size={18} className="text-[#FFC515]" />
                    </div>
                    <div>
                      <span className="block font-mono-num font-bold text-xs uppercase tracking-wider text-white">
                        {item.label}
                      </span>
                      <span className="block text-[10px] text-white/50 font-sans truncate">
                        {item.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* User Session Bar */}
            <div className="pt-3 border-t border-white/10">
              {user ? (
                <div className="flex items-center justify-between bg-[#101014] p-3 border border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#FFC515] text-black flex items-center justify-center font-bold text-xs font-mono-num">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="block font-bold text-xs text-white">{user.name}</span>
                      <span className="block text-[10px] text-[#FFC515] font-mono-num">{user.streakDays} DAY STREAK 🔥</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSelectTab('dashboard')}
                    className="px-3 py-1.5 bg-white text-black font-mono-num text-[11px] font-bold uppercase tracking-wider"
                  >
                    DASHBOARD
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setIsMoreMenuOpen(false); openAuthModal('login'); }}
                  className="w-full py-3 bg-[#FFC515] text-black font-mono-num font-bold text-xs uppercase tracking-wider text-center shadow-[0_0_15px_rgba(255,197,21,0.25)]"
                >
                  SIGN IN / CREATE ACCOUNT
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Main Sticky Bottom Navigation Bar */}
      <nav 
        id="mobile-bottom-bar"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#08080a]/92 backdrop-blur-xl border-t border-white/10 px-2 pt-2 pb-[max(env(safe-area-inset-bottom,8px),10px)] flex items-center justify-around shadow-[0_-8px_24px_rgba(0,0,0,0.7)]"
      >
        {primaryNavItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              id={`mobile-bottom-${item.id}`}
              onClick={() => {
                if (item.id === 'dashboard' && !user) {
                  openAuthModal('login');
                } else {
                  handleSelectTab(item.id);
                }
              }}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 min-w-[56px] min-h-[46px] rounded-lg transition-all ${
                isActive 
                  ? 'text-[#FFC515] font-bold' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {/* Active Indicator Bar */}
              {isActive && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-7 h-1 bg-[#FFC515] rounded-full shadow-[0_0_8px_#FFC515]" />
              )}

              <Icon 
                size={20} 
                strokeWidth={isActive ? 2.4 : 1.8} 
                className={isActive ? 'stroke-[#FFC515] drop-shadow-[0_0_6px_rgba(255,197,21,0.4)]' : 'stroke-current'} 
              />
              <span className="mt-1 font-mono-num text-[10px] tracking-wider uppercase">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* More Options Tab */}
        <button
          id="mobile-bottom-more-btn"
          onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
          className={`relative flex flex-col items-center justify-center py-1.5 px-3 min-w-[56px] min-h-[46px] rounded-lg transition-all ${
            isMoreMenuOpen ? 'text-[#FFC515]' : 'text-white/60 hover:text-white'
          }`}
          aria-label="More navigation links"
        >
          <MoreHorizontal size={20} strokeWidth={isMoreMenuOpen ? 2.4 : 1.8} />
          <span className="mt-1 font-mono-num text-[10px] tracking-wider uppercase">
            MORE
          </span>
        </button>
      </nav>
    </>
  );
};
