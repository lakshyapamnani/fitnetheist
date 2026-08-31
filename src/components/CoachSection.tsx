import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Award, CheckCircle2, Shield, Calendar, Send, Check } from 'lucide-react';

export const CoachSection: React.FC = () => {
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [consultSubmitted, setConsultSubmitted] = useState(false);
  const [athleteName, setAthleteName] = useState('');
  const [athleteEmail, setAthleteEmail] = useState('');
  const [athleteGoal, setAthleteGoal] = useState('Aggressive Body Recomposition');

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultSubmitted(true);
    setTimeout(() => {
      setConsultSubmitted(false);
      setIsConsultModalOpen(false);
    }, 2500);
  };

  return (
    <div id="coach-section-page" className="min-h-screen bg-[#08080a] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 bg-[#FFC515]"></span>
              <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#FFC515]">
                HUMAN LEADERSHIP // 10
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight font-display">
              SOMEONE HAS<br />
              <span className="text-[#FFC515]">YOUR BACK.</span>
            </h1>
            <p className="text-white/70 text-sm max-w-2xl mt-2 font-mono-num">
              Behind the algorithms and code is a strict, battle-tested coaching methodology developed through over a decade of coaching competitive athletes and busy professionals.
            </p>
          </div>
        </div>

        {/* Coach Profile Card */}
        <div className="grid lg:grid-cols-12 border border-white/10 bg-[#101014] mb-16">
          
          {/* Coach Photo */}
          <div className="lg:col-span-5 h-[460px] lg:h-auto bg-[#14141a] border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80"
              alt="Head Coach Marcus Vance"
              className="w-full h-full object-cover object-top filter grayscale contrast-125"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <span className="px-2 py-0.5 bg-[#FFC515] text-black text-[10px] font-mono-num font-extrabold uppercase">
                FOUNDER & HEAD COACH
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display uppercase text-white mt-1">
                VIKRAMADITYA "VIK" RATHORE
              </h2>
              <p className="text-xs font-mono-num text-white/60 mt-0.5">
                CSCS • Precision Nutrition L2 • 12+ Years Competitive Prep
              </p>
            </div>
          </div>

          {/* Coach Details & Philosophy */}
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono-num text-[#FFC515] uppercase tracking-widest block mb-2 font-bold">
                  THE FITNETHEIST MANIFESTO
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold uppercase font-display text-white">
                  "WE DO NOT NEGOTIATE WITH BIOLOGY."
                </h3>
                <p className="text-white/70 text-sm font-mono-num leading-relaxed mt-3">
                  Fitness isn't motivation. Motivation evaporates at 6:00 AM on a cold winter morning. Fitness is system architecture: non-negotiable caloric targets, mathematically structured load progression, and uncompromising daily accountability.
                </p>
              </div>

              {/* Credentials Grid */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 font-mono-num text-xs">
                <div className="border border-white/10 p-3 bg-white/5">
                  <span className="text-white/40 uppercase block text-[10px]">CERTIFICATIONS</span>
                  <p className="text-white font-bold mt-1">CSCS (NSCA) & ISSN Sports Nutritionist</p>
                </div>
                <div className="border border-white/10 p-3 bg-white/5">
                  <span className="text-white/40 uppercase block text-[10px]">ATHLETES COACHED</span>
                  <p className="text-white font-bold mt-1">1,400+ 1-on-1 Transformations</p>
                </div>
                <div className="border border-white/10 p-3 bg-white/5">
                  <span className="text-white/40 uppercase block text-[10px]">SPECIALIZATION</span>
                  <p className="text-white font-bold mt-1">Natural Hypertrophy & Fat Loss Kinetics</p>
                </div>
                <div className="border border-white/10 p-3 bg-white/5">
                  <span className="text-white/40 uppercase block text-[10px]">ADHERENCE RATE</span>
                  <p className="text-[#FFC515] font-extrabold mt-1">91.4% Program Completion</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono-num text-white/60">
                Direct 1-on-1 Consultation & Program Audits
              </span>

              <button
                onClick={() => setIsConsultModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#FFC515] hover:bg-[#E6AF0F] text-black font-mono-num font-extrabold text-xs uppercase tracking-wider transition-colors shadow-[0_0_15px_rgba(255,197,21,0.25)]"
              >
                REQUEST COACH AUDIT
              </button>
            </div>

          </div>
        </div>

        {/* Consultation Modal */}
        {isConsultModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0c0c0e] border border-white/20 max-w-lg w-full p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono-num uppercase tracking-widest text-[#FFC515] font-bold block">
                    1-ON-1 PROGRAM AUDIT
                  </span>
                  <h3 className="text-2xl font-bold uppercase font-display text-white mt-0.5">
                    REQUEST COACH CONSULTATION
                  </h3>
                </div>
                <button
                  onClick={() => setIsConsultModalOpen(false)}
                  className="text-white/60 hover:text-white font-mono-num text-xs uppercase"
                >
                  CLOSE
                </button>
              </div>

              {consultSubmitted ? (
                <div className="p-6 bg-[#FFC515]/10 border border-[#FFC515] text-[#FFC515] font-mono-num text-xs text-center space-y-2">
                  <Check size={24} className="mx-auto" />
                  <p className="font-bold text-sm">CONSULTATION REQUEST LOGGED</p>
                  <p className="text-white/80">Coach Vik's team will review your target biometrics within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleConsultSubmit} className="space-y-4 font-mono-num text-xs">
                  <div>
                    <label className="block text-white/60 uppercase mb-1">FULL NAME</label>
                    <input
                      type="text"
                      required
                      value={athleteName}
                      onChange={(e) => setAthleteName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full bg-[#14141a] border border-white/10 px-3 py-2 text-white placeholder-white/20 focus:border-[#FFC515] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 uppercase mb-1">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      value={athleteEmail}
                      onChange={(e) => setAthleteEmail(e.target.value)}
                      placeholder="alex@athlete.com"
                      className="w-full bg-[#14141a] border border-white/10 px-3 py-2 text-white placeholder-white/20 focus:border-[#FFC515] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 uppercase mb-1">PRIMARY ROADBLOCK / GOAL</label>
                    <textarea
                      rows={3}
                      value={athleteGoal}
                      onChange={(e) => setAthleteGoal(e.target.value)}
                      className="w-full bg-[#14141a] border border-white/10 p-3 text-white placeholder-white/20 focus:border-[#FFC515] outline-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsConsultModalOpen(false)}
                      className="px-4 py-2 border border-white/10 text-white/60 hover:text-white uppercase font-mono-num"
                    >
                      CANCEL
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#FFC515] hover:bg-[#E6AF0F] text-black font-extrabold uppercase font-mono-num transition-colors shadow-[0_0_15px_rgba(255,197,21,0.25)]"
                    >
                      SUBMIT REQUEST
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
