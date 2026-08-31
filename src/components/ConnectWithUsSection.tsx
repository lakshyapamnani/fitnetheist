import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export const ConnectWithUsSection: React.FC = () => {
  const { trackLeadEvent } = useAdmin();

  const handleContactAction = (channel: string) => {
    trackLeadEvent('CONTACT_FORM_SUBMITTED', {
      source: `CONNECT_${channel.toUpperCase()}`,
      details: `User clicked on ${channel} direct contact destination.`
    });
    if (channel === 'instagram') {
      window.open('https://instagram.com/fitnetheist', '_blank', 'noopener,noreferrer');
    } else if (channel === 'whatsapp') {
      window.open('https://wa.me/?text=Hello%20Coach%20Neetu%2C%20I%20want%20to%20start%20my%20Fitnetheist%20transformation.', '_blank', 'noopener,noreferrer');
    } else if (channel === 'email') {
      window.location.href = 'mailto:contact@fitnetheist.com?subject=Fitnetheist%20Coaching%20Inquiry%20-%20Coach%20Neetu';
    }
  };

  return (
    <section 
      id="connect-with-us-section"
      className="relative bg-[#08080a] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header Indicator */}
        <div className="flex items-center gap-2 mb-6">
          <span className="h-1.5 w-1.5 bg-[#FFC515]"></span>
          <span className="text-[11px] font-mono-num font-bold uppercase tracking-[0.25em] text-[#FFC515]">
            CONNECT WITH US
          </span>
        </div>

        {/* Editorial Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Typography & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight leading-[0.94] font-display text-white">
              LET'S BUILD<br />
              <span className="text-[#FFC515]">YOUR STRONGER</span><br />
              <span className="text-white">SELF.</span>
            </h2>

            <p className="text-white/70 text-base sm:text-lg max-w-xl font-mono-num leading-relaxed">
              Your transformation starts with the right guidance.
            </p>

            <div className="pt-2">
              <button
                id="connect-cta-talk-to-us"
                onClick={() => handleContactAction('whatsapp')}
                className="px-8 py-4 bg-[#FFC515] hover:bg-[#E6AF0F] text-black font-mono-num font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-3 transition-colors shadow-[0_0_18px_rgba(255,197,21,0.22)]"
              >
                <span>TALK TO US</span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Right Column: Minimal Editorial Contact Destinations (Thin Dividers, Strong Spacing) */}
          <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-10 pt-8 lg:pt-0">
            <div className="space-y-6 divide-y divide-white/10 font-mono-num">
              
              {/* Instagram */}
              <div 
                id="contact-instagram-btn"
                onClick={() => handleContactAction('instagram')}
                className="pt-6 first:pt-0 group cursor-pointer"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-xl sm:text-2xl font-extrabold tracking-tight uppercase text-white group-hover:text-[#FFC515] transition-colors font-display">
                    INSTAGRAM
                  </span>
                  <span className="text-xs text-[#FFC515] group-hover:underline">
                    @FITNETHEIST ↗
                  </span>
                </div>
                <p className="text-xs text-white/50 mt-1">
                  Follow Coach Neetu and daily fitness insights.
                </p>
              </div>

              {/* WhatsApp */}
              <div 
                id="contact-whatsapp-btn"
                onClick={() => handleContactAction('whatsapp')}
                className="pt-6 group cursor-pointer"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-xl sm:text-2xl font-extrabold tracking-tight uppercase text-white group-hover:text-[#FFC515] transition-colors font-display">
                    WHATSAPP
                  </span>
                  <span className="text-xs text-[#FFC515] group-hover:underline">
                    DIRECT DESK ↗
                  </span>
                </div>
                <p className="text-xs text-white/50 mt-1">
                  Chat directly about your goals and onboarding.
                </p>
              </div>

              {/* Email */}
              <div 
                id="contact-email-btn"
                onClick={() => handleContactAction('email')}
                className="pt-6 group cursor-pointer"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-xl sm:text-2xl font-extrabold tracking-tight uppercase text-white group-hover:text-[#FFC515] transition-colors font-display">
                    EMAIL
                  </span>
                  <span className="text-xs text-[#FFC515] group-hover:underline">
                    CONTACT@FITNETHEIST.COM ↗
                  </span>
                </div>
                <p className="text-xs text-white/50 mt-1">
                  Detailed coaching inquiries and corporate consultations.
                </p>
              </div>

            </div>

            {/* Sub-label */}
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono-num text-white/40">
              <span className="uppercase tracking-widest text-[#FFC515]">DIRECT ACCESS</span>
              <span>24-HOUR RESPONSE TIME</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
