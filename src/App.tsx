import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AdminProvider } from './context/AdminContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { CalorieCalculator } from './components/CalorieCalculator';
import { DietGenerator } from './components/DietGenerator';
import { WorkoutPlanner } from './components/WorkoutPlanner';
import { ChallengesSection } from './components/ChallengesSection';
import { TransformationsSection } from './components/TransformationsSection';
import { CoachSection } from './components/CoachSection';
import { CommunitySection } from './components/CommunitySection';
import { PricingSection } from './components/PricingSection';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  // Scroll to top upon tab switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#08080a] text-white flex flex-col justify-between selection:bg-[#FFC515] selection:text-black">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full pb-20 lg:pb-0">
        {activeTab === 'home' && <HomePage />}

        {/* Individual Focused Tab Views */}
        {activeTab === 'calculate' && <CalorieCalculator />}
        {activeTab === 'nutrition' && <DietGenerator />}
        {activeTab === 'train' && <WorkoutPlanner />}
        {activeTab === 'challenges' && <ChallengesSection />}
        {activeTab === 'transform' && <TransformationsSection />}
        {activeTab === 'community' && <CommunitySection />}
        {activeTab === 'coach' && <CoachSection />}
        {activeTab === 'pricing' && <PricingSection />}
        {activeTab === 'dashboard' && <UserDashboard />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Navigation */}
      <MobileBottomNav />

      {/* Global Auth & Onboarding Modal */}
      <AuthModal />
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
