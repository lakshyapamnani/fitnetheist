import React from 'react';
import { HeroSection } from './HeroSection';
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

      {/* 2. CONNECT WITH US */}
      <ConnectWithUsSection />

      {/* 3. COACH / BRAND STORY */}
      <CoachStorySection />

      {/* 4. COACHING PHILOSOPHY */}
      <CoachingPhilosophySection />

      {/* 5. RATE CARDS (MAIN FEATURE) */}
      <RateCardsSection />

      {/* 6. ACCESS FITNESS TOOLS & FEATURES */}
      <AccessFitnessToolsSection />

      {/* 7. REAL CLIENT TRANSFORMATIONS & TESTIMONIALS */}
      <RealTransformationsSection />

      {/* 8. FINAL CTA */}
      <FinalCtaSection />
    </div>
  );
};
