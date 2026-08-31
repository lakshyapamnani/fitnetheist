import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Menu, X, User, ShieldCheck } from 'lucide-react';

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

  const navLinks = [
    { id: 'calculate', label: 'CALCULATE' },
    { id: 'nutrition', label: 'NUTRITION' },
    { id: 'train', label: 'TRAIN' },
    { id: 'challenges', label: 'CHALLENGES' },
    { id: 'transform', label: 'TRANSFORM' },
    { id: 'community', label: 'THE TRIBE' },
    { id: 'coach', label: 'COACH' },
    { id: 'pricing', label: 'PRICING' },
    { id: 'admin', label: 'ADMIN' },
  ];

  return (
    <header 
      id="main-navigation-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#09090b]/95 backdrop-blur-md border-b border-white/10 py-3.5' 
          : 'bg-transparent border-b border-white/5 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          id="nav-brand-logo"
          onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }}
          className="group flex items-center gap-2 text-left text-white focus:outline-none"
        >
          <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tighter text-white group-hover:text-[#d8ff38] transition-colors">
            FITNETHEIST
          </span>
          <span className="h-1.5 w-1.5 bg-[#d8ff38] rounded-full inline-block"></span>
        </button>

        {/* Desktop Navigation Links */}
        <nav id="desktop-navigation-links" className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => setActiveTab(link.id)}
                className={`text-xs font-mono-num font-semibold tracking-wider transition-all uppercase ${
                  isActive 
                    ? 'text-[#d8ff38] border-b-2 border-[#d8ff38] pb-1' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div id="nav-right-actions" className="hidden lg:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <button
                id="nav-dashboard-button"
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-1.5 text-xs font-mono-num font-semibold tracking-wider uppercase border transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-white text-black border-white'
                    : 'text-white border-white/20 hover:border-white/50 bg-zinc-900/60'
                }`}
              >
                DASHBOARD ({user.streakDays}D)
              </button>
              
              <button
                id="nav-logout-button"
                onClick={logoutUser}
                title="Sign out"
                className="text-xs text-zinc-500 hover:text-zinc-300 font-mono-num tracking-wide"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                id="nav-login-button"
                onClick={() => openAuthModal('login')}
                className="text-xs font-mono-num font-semibold tracking-wider text-zinc-300 hover:text-white px-3 py-1.5"
              >
                LOGIN
              </button>
              <button
                id="nav-start-now-button"
                onClick={() => setActiveTab('calculate')}
                className="px-4 py-2 text-xs font-mono-num font-bold tracking-wider text-black bg-[#d8ff38] hover:bg-[#ccf52b] transition-colors uppercase rounded-none glow-accent-subtle"
              >
                START NOW
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          {user && (
            <button
              onClick={() => setActiveTab('dashboard')}
              className="text-xs font-mono-num text-[#d8ff38] px-2 py-1 border border-[#d8ff38]/40"
            >
              {user.streakDays}D STREAK
            </button>
          )}
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
        <div id="mobile-navigation-drawer" className="lg:hidden fixed inset-x-0 top-[60px] bg-[#09090b]/98 backdrop-blur-2xl border-b border-white/15 px-5 py-6 space-y-5 max-h-[calc(100vh-60px)] overflow-y-auto animate-in slide-in-from-top-2 duration-200 shadow-2xl">
          
          <div className="flex items-center justify-between text-xs font-mono-num text-zinc-400 border-b border-white/10 pb-3">
            <span className="text-[#d8ff38] font-bold tracking-widest uppercase">DIRECT EXPLORATION</span>
            <span>{navLinks.length} MODULES</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`mobile-nav-${link.id}`}
                onClick={() => {
                  setActiveTab(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left px-3.5 py-3 text-xs font-mono-num font-bold tracking-wider uppercase border transition-all mobile-tap-active flex items-center justify-between ${
                  activeTab === link.id
                    ? 'border-[#d8ff38] text-[#d8ff38] bg-[#d8ff38]/10'
                    : 'border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <span>{link.label}</span>
                {activeTab === link.id && <span className="h-1.5 w-1.5 bg-[#d8ff38] rounded-full" />}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-800 flex flex-col gap-2.5">
            {user ? (
              <>
                <button
                  onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }}
                  className="w-full py-3.5 bg-[#d8ff38] text-black text-xs font-mono-num font-extrabold tracking-wider uppercase mobile-tap-active"
                >
                  VIEW ATHLETE DASHBOARD ({user.streakDays}D STREAK)
                </button>
                <button
                  onClick={() => { logoutUser(); setIsMobileMenuOpen(false); }}
                  className="w-full py-2.5 border border-white/10 text-zinc-400 text-xs font-mono-num uppercase hover:text-white"
                >
                  LOGOUT ({user.name})
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => { openAuthModal('login'); setIsMobileMenuOpen(false); }}
                  className="py-3 border border-white/20 text-white text-xs font-mono-num font-bold uppercase hover:bg-zinc-800"
                >
                  LOGIN
                </button>
                <button
                  onClick={() => { setActiveTab('calculate'); setIsMobileMenuOpen(false); }}
                  className="py-3 bg-[#d8ff38] text-black text-xs font-mono-num font-extrabold uppercase hover:bg-[#ccf52b]"
                >
                  CALCULATE CALORIES
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
