import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAdmin } from '../context/AdminContext';
import { Check, ArrowRight } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const { setActiveTab, openAuthModal, user } = useApp();
  const { trackLeadEvent, captureLead } = useAdmin();
  const [billingCycle, setBillingCycle] = useState<'MONTHLY' | 'ANNUAL'>('ANNUAL');

  const plans = [
    {
      id: 'free',
      name: 'FOUNDATION',
      tier: 'TIER 01',
      priceMonthly: '$0',
      priceAnnual: '$0',
      period: 'FOREVER',
      description: 'Essential calculations and starter 7-day diet generation.',
      features: [
        'Mifflin-St Jeor Calorie Calculator',
        'Basic 7-Day Diet Generator',
        'Standard Exercise Library access',
        'Basic daily water & step tracking',
        'Community Tribe public feed'
      ],
      cta: 'GET STARTED FREE',
      isPopular: false
    },
    {
      id: 'challenge',
      name: 'CHALLENGE PASS',
      tier: 'TIER 02',
      priceMonthly: '$49',
      priceAnnual: '$39',
      period: 'PER PROGRAM',
      description: 'Full enrollment in structured 21, 60, or 90 day challenge cohorts.',
      features: [
        'All Foundation features included',
        'Complete Challenge Program Curriculum',
        'Automated 7-Day Grocery List with 1-click Export',
        'Smart Meal Swap Engine with ±30 kcal parity',
        'Full Periodized Workout Split Generator',
        'Verified Leaderboard streak ranking'
      ],
      cta: 'JOIN NEXT COHORT',
      isPopular: true
    },
    {
      id: 'pro',
      name: 'PRO ATHLETE',
      tier: 'TIER 03',
      priceMonthly: '$79',
      priceAnnual: '$59',
      period: 'PER MONTH',
      description: 'Uncapped access to all future challenges, custom macro adjustments, and direct audit.',
      features: [
        'Unlimited Challenge Cohort entries',
        'Bi-weekly Coach Biometric Review',
        'Custom Indian / International recipe builder',
        'Advanced RPE & Progressive Overload tracker',
        'Direct priority athlete support queue'
      ],
      cta: 'JOIN PRO ATHLETE',
      isPopular: false
    }
  ];

  const handleSelectPlan = (planId: string) => {
    trackLeadEvent('PRICING_VIEWED', {
      source: 'PRICING_GRID',
      details: `Selected ${planId.toUpperCase()} tier (${billingCycle})`
    });

    if (!user) {
      openAuthModal('signup');
    } else {
      if (planId === 'free') {
        setActiveTab('calculate');
      } else {
        trackLeadEvent('CHECKOUT_STARTED', {
          source: 'PRICING_GRID',
          details: `Initiated checkout for ${planId.toUpperCase()} tier`
        });
        captureLead({
          name: user.name || 'Athlete Visitor',
          email: user.email,
          phone: user.phone || '+91 98000 00000',
          source: 'PRICING_TABLE',
          goal: 'MUSCLE_GAIN'
        });
        setActiveTab('challenges');
      }
    }
  };

  return (
    <div id="pricing-section-page" className="min-h-screen bg-[#08080a] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 bg-[#d8ff38]"></span>
              <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#d8ff38]">
                MEMBERSHIP ARCHITECTURE // 08
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight font-display">
              TRANSPARENT PRICING
            </h1>
            <p className="text-zinc-400 text-sm max-w-2xl mt-2">
              No hidden subscriptions. No deceptive upsells. Invest in your physical performance with transparent pricing.
            </p>
          </div>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-white/10 font-mono-num text-xs">
            <button
              onClick={() => setBillingCycle('MONTHLY')}
              className={`px-3 py-1.5 uppercase font-bold transition-colors ${
                billingCycle === 'MONTHLY' ? 'bg-[#d8ff38] text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              MONTHLY
            </button>
            <button
              onClick={() => setBillingCycle('ANNUAL')}
              className={`px-3 py-1.5 uppercase font-bold transition-colors ${
                billingCycle === 'ANNUAL' ? 'bg-[#d8ff38] text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              ANNUAL (SAVE 25%)
            </button>
          </div>
        </div>

        {/* Pricing Tiers Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map(plan => (
            <div
              key={plan.id}
              className={`bg-zinc-950 border flex flex-col justify-between p-8 transition-all relative ${
                plan.isPopular 
                  ? 'border-[#d8ff38] bg-zinc-950/90 shadow-[0_0_30px_rgba(216,255,56,0.1)]' 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3 left-8 px-3 py-0.5 bg-[#d8ff38] text-black text-[10px] font-mono-num font-extrabold uppercase tracking-wider">
                  MOST POPULAR CHOICE
                </span>
              )}

              <div>
                <span className="text-[10px] font-mono-num text-zinc-500 uppercase tracking-widest block">
                  {plan.tier}
                </span>
                <h3 className="text-2xl font-bold uppercase font-display text-white mt-1">
                  {plan.name}
                </h3>
                <p className="text-xs text-zinc-400 font-mono-num mt-2">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="my-6 pt-6 border-t border-white/10 flex items-baseline gap-2 font-mono-num">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white">
                    {billingCycle === 'ANNUAL' ? plan.priceAnnual : plan.priceMonthly}
                  </span>
                  <span className="text-xs text-zinc-500 uppercase">
                    / {plan.period}
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3 font-mono-num text-xs mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-zinc-300">
                      <Check size={14} className="text-[#d8ff38] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full py-3.5 text-xs font-mono-num font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  plan.isPopular
                    ? 'bg-[#d8ff38] hover:bg-[#c9f028] text-black'
                    : 'bg-zinc-900 hover:bg-white hover:text-black border border-white/15 text-white'
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
