import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AdminProvider } from './context/AdminContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ConnectWithUsSection } from './components/ConnectWithUsSection';
import { BrandIntroSection } from './components/BrandIntroSection';
import { CorePlatformIntroSection } from './components/CorePlatformIntroSection';
import { CalorieCalculator } from './components/CalorieCalculator';
import { DietGenerator } from './components/DietGenerator';
import { SmartMealSwapSection } from './components/SmartMealSwapSection';
import { WorkoutPlanner } from './components/WorkoutPlanner';
import { ChallengesSection } from './components/ChallengesSection';
import { TransformationsSection } from './components/TransformationsSection';
import { CoachSection } from './components/CoachSection';
import { CommunitySection } from './components/CommunitySection';
import { ProgressExperienceSection } from './components/ProgressExperienceSection';
import { FinalCtaSection } from './components/FinalCtaSection';
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
    <div className="min-h-screen bg-[#08080a] text-white flex flex-col justify-between selection:bg-[#d8ff38] selection:text-black">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full pb-20 lg:pb-0">
        {activeTab === 'home' && (
          <div id="fitnetheist-complete-homepage">
            {/* HERO SECTION (Preserved) */}
            <HeroSection />

            {/* 01 — CONNECT WITH US */}
            <ConnectWithUsSection />

            {/* 02 — BRAND INTRODUCTION */}
            <BrandIntroSection />

            {/* 03 — CORE PLATFORM INTRO */}
            <CorePlatformIntroSection />

            {/* 04 — CALORIE CALCULATOR */}
            <CalorieCalculator />

            {/* 05 — DIET GENERATOR */}
            <DietGenerator />

            {/* 06 — SMART MEAL SWAP */}
            <SmartMealSwapSection />

            {/* 07 — WORKOUT PLANNER */}
            <WorkoutPlanner />

            {/* 08 — FITNESS CHALLENGES */}
            <ChallengesSection />

            {/* 09 — TRANSFORMATIONS */}
            <TransformationsSection />

            {/* 10 — THE COACH */}
            <CoachSection />

            {/* 11 — COMMUNITY / THE TRIBE */}
            <CommunitySection />

            {/* 12 — PROGRESS EXPERIENCE */}
            <ProgressExperienceSection />

            {/* 13 — FINAL CTA */}
            <FinalCtaSection />
          </div>
        )}

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

      {/* 14 — FOOTER */}
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
