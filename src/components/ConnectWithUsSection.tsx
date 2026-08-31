import React from 'react';
import { useApp } from '../context/AppContext';
import { useAdmin } from '../context/AdminContext';
import { ArrowRight } from 'lucide-react';

export const ConnectWithUsSection: React.FC = () => {
  const { setActiveTab } = useApp();
  const { trackLeadEvent } = useAdmin();

  const handleContactAction = (channel: string) => {
    trackLeadEvent('CONTACT_FORM_SUBMITTED', {
      source: `CONNECT_${channel.toUpperCase()}`,
      details: `User clicked on ${channel} direct contact destination.`
    });
    if (channel === 'instagram') {
      window.open('https://instagram.com/fitnetheist', '_blank', 'noopener,noreferrer');
    } else if (channel === 'whatsapp') {
      window.open('https://wa.me/?text=Hello%20Fitnetheist%20Team%2C%20I%20want%20to%20start%20my%20fitness%20transformation.', '_blank', 'noopener,noreferrer');
    } else if (channel === 'email') {
      window.location.href = 'mailto:contact@fitnetheist.com?subject=Fitnetheist%20Transformation%20Inquiry';
    }
  };

  return (
    <section 
      id="connect-with-us-section"
      className="relative bg-[#08080a] text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden"
    >
      {/* Ambient background light */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#FFC515]/5 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header Indicator */}
        <div className="flex items-center gap-2 mb-8">
          <span className="h-2 w-2 bg-[#FFC515]"></span>
          <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#FFC515]">
            01 // CONNECT WITH US
          </span>
        </div>

        {/* Large Editorial Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Huge Display Typography & Headline */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-extrabold uppercase tracking-tight leading-[0.92] font-display text-white">
              LET'S BUILD<br />
              <span className="text-white/60">YOUR STRONGER</span><br />
              <span className="text-[#FFC515]">SELF.</span>
            </h2>

            <p className="text-white/70 text-base sm:text-lg max-w-xl font-mono-num leading-relaxed pt-2">
              Your transformation starts with one conversation.
            </p>

            <div className="pt-6">
              <button
                id="connect-cta-start-journey"
                onClick={() => setActiveTab('calculate')}
                className="px-8 py-4 bg-[#FFC515] hover:bg-[#E6AF0F] text-black font-mono-num font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-3 transition-colors shadow-[0_0_20px_rgba(255,197,21,0.25)]"
              >
                <span>START YOUR JOURNEY</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Contact Destinations (Thin Dividers, Strong Spacing, No generic cards) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-12 pt-8 lg:pt-0">
            
            {/* 3 Contact Channels */}
            <div className="space-y-6 divide-y divide-white/10 font-mono-num">
              
              {/* Instagram */}
              <div 
                onClick={() => handleContactAction('instagram')}
                className="pt-6 first:pt-0 group cursor-pointer"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-white group-hover:text-[#FFC515] transition-colors font-display">
                    INSTAGRAM
                  </span>
                  <span className="text-xs text-white/40 group-hover:text-[#FFC515] transition-colors">
                    @FITNETHEIST ↗
                  </span>
                </div>
                <p className="text-xs text-white/60 mt-1">
                  Follow the journey.
                </p>
              </div>

              {/* WhatsApp */}
              <div 
                onClick={() => handleContactAction('whatsapp')}
                className="pt-6 group cursor-pointer"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-white group-hover:text-[#FFC515] transition-colors font-display">
                    WHATSAPP
                  </span>
                  <span className="text-xs text-white/40 group-hover:text-[#FFC515] transition-colors">
                    DIRECT DESK ↗
                  </span>
                </div>
                <p className="text-xs text-white/60 mt-1">
                  Talk to the Fitnetheist team.
                </p>
              </div>

              {/* Email */}
              <div 
                onClick={() => handleContactAction('email')}
                className="pt-6 group cursor-pointer"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-white group-hover:text-[#FFC515] transition-colors font-display">
                    EMAIL
                  </span>
                  <span className="text-xs text-white/40 group-hover:text-[#FFC515] transition-colors">
                    CONTACT@FITNETHEIST.COM ↗
                  </span>
                </div>
                <p className="text-xs text-white/60 mt-1">
                  Get in touch.
                </p>
              </div>

            </div>

            {/* Secondary Movement Subtext */}
            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono-num text-white/40">
              <span className="uppercase tracking-widest text-[#FFC515] font-bold">
                FOLLOW THE MOVEMENT
              </span>
              <span className="text-white font-bold tracking-wider">
                @FITNETHEIST
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
