import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AdminProvider } from './context/AdminContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { FitnessToolsPage } from './components/FitnessToolsPage';
import { ChallengesSection } from './components/ChallengesSection';
import { TransformationsSection } from './components/TransformationsSection';
import { CoachSection } from './components/CoachSection';
import { CommunitySection } from './components/CommunitySection';
import { PricingSection } from './components/PricingSection';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { CalorieCalculatorModal } from './components/CalorieCalculatorModal';
import { FirebaseConfigModal } from './components/FirebaseConfigModal';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ClientPlanView } from './components/ClientPlanView';
import { ClientProgressView } from './components/ClientProgressView';
import { ClientMeProfileView } from './components/ClientMeProfileView';

const AppContent: React.FC = () => {
  const { activeTab, user, openCalorieModal } = useApp();
  const isAdmin = activeTab === 'admin';

  // Scroll to top upon tab switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [activeTab]);

  return (
    <div className={`bg-[#08080a] text-white flex flex-col selection:bg-[#FFC515] selection:text-black ${isAdmin ? 'h-screen overflow-hidden' : 'min-h-screen justify-between'}`}>
      {/* Top Navigation (hidden on Admin OS to avoid overlapping admin header) */}
      {!isAdmin && <Navbar />}

      {/* Main Content Area */}
      <main className={`flex-1 w-full ${!isAdmin ? 'pb-20 lg:pb-0' : 'h-full overflow-hidden'}`}>
        {activeTab === 'home' && <HomePage />}

        {/* Plan Core Pillar */}
        {(activeTab === 'plan' || activeTab === 'tools' || activeTab === 'calculate' || activeTab === 'nutrition' || activeTab === 'train') && (
          <ClientPlanView />
        )}

        {/* Progress Core Pillar */}
        {(activeTab === 'progress' || activeTab === 'transform' || activeTab === 'results') && (
          <ClientProgressView />
        )}

        {/* Me / Profile Core Pillar */}
        {(activeTab === 'me' || activeTab === 'dashboard') && (
          <ClientMeProfileView />
        )}

        {/* Secondary Views */}
        {activeTab === 'challenges' && <ChallengesSection />}
        {activeTab === 'community' && <CommunitySection />}
        {activeTab === 'coach' && <CoachSection />}
        {activeTab === 'pricing' && <PricingSection />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Footer (hidden on Admin OS) */}
      {!isAdmin && <Footer />}

      {/* Mobile Sticky Navigation (hidden on Admin OS) */}
      {!isAdmin && <MobileBottomNav />}

      {/* Global Auth & Onboarding Modal */}
      <AuthModal />

      {/* Feature Popup: Calorie & Macro Calculator */}
      <CalorieCalculatorModal />

      {/* Firebase & Realtime DB Configuration Modal */}
      <FirebaseConfigModal />

      {/* Floating Quick Action: Calculate Targets (for guests) */}
      {!user && !isAdmin && (
        <button
          id="floating-calculate-calories-btn"
          onClick={openCalorieModal}
          className="fixed bottom-20 lg:bottom-6 right-6 z-40 bg-[#d8ff38] hover:bg-[#c9f028] text-black font-extrabold font-mono-num text-[11px] px-3.5 py-2.5 shadow-[0_0_25px_rgba(216,255,56,0.35)] flex items-center gap-2 uppercase tracking-wider transition-all hover:scale-105 border border-black/20"
        >
          <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
          <span>Calculate Calories & Macros</span>
        </button>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AdminProvider>
        <AppContent />
      </AdminProvider>
    </AppProvider>
  );
}
