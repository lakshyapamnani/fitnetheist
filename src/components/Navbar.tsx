import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, activeTab, setActiveTab, openAuthModal, logoutUser } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string, tabFallback: string = 'home') => {
    setIsMobileMenuOpen(false);
    if (activeTab !== 'home') {
      setActiveTab('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        setActiveTab(tabFallback);
      }
    }
  };

  const navItems = [
    { id: 'about', label: 'ABOUT', targetSection: 'coach-story-section' },
    { id: 'coaching', label: 'COACHING', targetSection: 'coaching-philosophy-section' },
    { id: 'pricing', label: 'PRICING', targetSection: 'rate-cards-section' },
    { id: 'transformations', label: 'TRANSFORMATIONS', targetSection: 'real-transformations-section' },
    { id: 'tools', label: 'TOOLS', isDirectTab: true, tabName: 'tools' },
  ];

  return (
    <header 
      id="main-navigation-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#08080a]/95 backdrop-blur-md border-b border-white/10 py-3.5' 
          : 'bg-transparent border-b border-white/5 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          id="nav-brand-logo"
          onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="group flex items-center gap-2 text-left text-white focus:outline-none"
        >
          <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tighter text-white group-hover:text-[#FFC515] transition-colors">
            FITNETHEIST
          </span>
          <span className="h-1.5 w-1.5 bg-[#FFC515] rounded-full inline-block"></span>
        </button>

        {/* Desktop Navigation Links */}
        <nav id="desktop-navigation-links" className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isToolsActive = item.id === 'tools' && activeTab === 'tools';
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => {
                  if (item.isDirectTab) {
                    setActiveTab(item.tabName);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    handleNavClick(item.targetSection);
                  }
                }}
                className={`text-xs font-mono-num font-semibold tracking-wider transition-all uppercase ${
                  isToolsActive
                    ? 'text-[#FFC515] border-b-2 border-[#FFC515] pb-0.5' 
                    : 'text-white/65 hover:text-[#FFC515]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions: CONNECT, LOGIN, START NOW */}
        <div id="nav-right-actions" className="hidden lg:flex items-center gap-4">
          
          <button
            id="nav-connect-button"
            onClick={() => handleNavClick('connect-with-us-section')}
            className="text-xs font-mono-num font-semibold tracking-wider text-white/70 hover:text-white px-3 py-1.5 uppercase transition-colors"
          >
            CONNECT
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <button
                id="nav-dashboard-button"
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-1.5 text-xs font-mono-num font-semibold tracking-wider uppercase border transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-white text-black border-white'
                    : 'text-white border-white/20 hover:border-white/50 bg-[#101014]'
                }`}
              >
                PROFILE ({user.streakDays}D)
              </button>
              
              <button
                id="nav-logout-button"
                onClick={logoutUser}
                title="Sign out"
                className="text-xs text-white/50 hover:text-white font-mono-num tracking-wide"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <button
              id="nav-login-button"
              onClick={() => openAuthModal('login')}
              className="text-xs font-mono-num font-semibold tracking-wider text-white/70 hover:text-white px-3 py-1.5 uppercase"
            >
              LOGIN
            </button>
          )}

          {/* Primary Action: START NOW */}
          <button
            id="nav-start-now-button"
            onClick={() => handleNavClick('rate-cards-section')}
            className="px-4 py-2 text-xs font-mono-num font-extrabold tracking-wider text-black bg-[#FFC515] hover:bg-[#E6AF0F] transition-colors uppercase shadow-[0_0_15px_rgba(255,197,21,0.25)]"
          >
            START NOW
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <button
            onClick={() => handleNavClick('rate-cards-section')}
            className="px-3 py-1.5 text-[11px] font-mono-num font-extrabold text-black bg-[#FFC515] uppercase"
          >
            START NOW
          </button>
          <button
            id="mobile-hamburger-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2 border border-white/10 hover:border-white/30"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-navigation-drawer" className="lg:hidden fixed inset-x-0 top-[60px] bg-[#08080a]/98 backdrop-blur-2xl border-b border-white/15 px-5 py-6 space-y-4 max-h-[calc(100vh-60px)] overflow-y-auto shadow-2xl">
          
          <div className="space-y-2 font-mono-num text-xs">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.isDirectTab) {
                    setActiveTab(item.tabName);
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    handleNavClick(item.targetSection);
                  }
                }}
                className="w-full text-left py-3 px-4 border border-white/10 bg-[#101014] text-white hover:border-[#FFC515] hover:text-[#FFC515] uppercase font-bold tracking-wider flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ArrowRight size={14} className="text-[#FFC515]" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 space-y-2">
            <button
              onClick={() => handleNavClick('connect-with-us-section')}
              className="w-full py-3 text-center border border-white/20 text-white font-mono-num text-xs uppercase font-bold"
            >
              CONNECT WITH US
            </button>
            
            {user ? (
              <button
                onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }}
                className="w-full py-3 bg-white text-black font-mono-num text-xs uppercase font-bold"
              >
                DASHBOARD ({user.name})
              </button>
            ) : (
              <button
                onClick={() => { openAuthModal('login'); setIsMobileMenuOpen(false); }}
                className="w-full py-3 border border-white/15 text-white/80 font-mono-num text-xs uppercase"
              >
                LOGIN
              </button>
            )}

            <button
              onClick={() => handleNavClick('rate-cards-section')}
              className="w-full py-3.5 bg-[#FFC515] text-black font-mono-num font-extrabold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(255,197,21,0.25)]"
            >
              START YOUR TRANSFORMATION →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
