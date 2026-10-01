import React from 'react';
import { HeroSection } from './HeroSection';
import { ClientHomeDashboard } from './ClientHomeDashboard';
import { ConnectWithUsSection } from './ConnectWithUsSection';
import { CoachStorySection } from './CoachStorySection';
import { RealTransformationsSection } from './RealTransformationsSection';
import { CoachingPhilosophySection } from './CoachingPhilosophySection';
import { RateCardsSection } from './RateCardsSection';
import { AccessFitnessToolsSection } from './AccessFitnessToolsSection';
import { FinalCtaSection } from './FinalCtaSection';

export const HomePage: React.FC = () => {
  return (
    <div id="fitnetheist-coaching-homepage" className="w-full">
      {/* 1. HERO */}
      <HeroSection />

      {/* 2. ATHLETE STATUS DASHBOARD */}
      <section id="athlete-status-overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
        <ClientHomeDashboard />
      </section>

      {/* 3. CONNECT WITH US */}
      <ConnectWithUsSection />

      {/* 4. COACH / BRAND STORY */}
      <CoachStorySection />

      {/* 5. COACHING PHILOSOPHY */}
      <CoachingPhilosophySection />

      {/* 6. RATE CARDS (MAIN FEATURE) */}
      <RateCardsSection />

      {/* 7. ACCESS FITNESS TOOLS & FEATURES */}
      <AccessFitnessToolsSection />

      {/* 8. REAL CLIENT TRANSFORMATIONS & TESTIMONIALS */}
      <RealTransformationsSection />

      {/* 9. FINAL CTA */}
      <FinalCtaSection />
    </div>
  );
};
