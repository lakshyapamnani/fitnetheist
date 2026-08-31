import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAdmin } from '../context/AdminContext';
import { CHALLENGES_DATA } from '../data/challengesData';
import { Challenge } from '../types';
import { Trophy, Check, ArrowRight, ShieldCheck, Flame, ChevronRight, X, Users } from 'lucide-react';

export const ChallengesSection: React.FC = () => {
  const { user, enrollInChallenge, setActiveTab, openAuthModal } = useApp();
  const { trackLeadEvent, captureLead } = useAdmin();
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [enrollmentSuccessMessage, setEnrollmentSuccessMessage] = useState<string | null>(null);

  const handleEnroll = (challengeId: string) => {
    const cObj = CHALLENGES_DATA.find(c => c.id === challengeId);
    trackLeadEvent('CHALLENGE_VIEWED', {
      source: 'CHALLENGE_CARD',
      details: `User inspected or enrolled in ${cObj?.title || challengeId}`
    });

    if (!user) {
      openAuthModal('signup');
      return;
    }
    enrollInChallenge(challengeId);
    trackLeadEvent('PURCHASE_COMPLETED', {
      source: 'CHALLENGE_ENROLL',
      details: `Enrolled in ${cObj?.title || challengeId}`
    });

    captureLead({
      name: user.name || 'Athlete Visitor',
      email: user.email,
      phone: user.phone || '+91 98000 00000',
      source: 'CHALLENGE_ENROLL',
      goal: 'MUSCLE_GAIN'
    });

    setEnrollmentSuccessMessage(`Enrolled in ${cObj?.title || 'Challenge'}! Head to your Dashboard to track Day 1.`);
    setTimeout(() => {
      setEnrollmentSuccessMessage(null);
    }, 4000);
  };

  return (
    <div id="challenges-section-page" className="min-h-screen bg-[#08080a] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="border-b border-white/10 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 bg-[#d8ff38]"></span>
              <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#d8ff38]">
                ACCOUNTABILITY PROTOCOLS // 08
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight font-display">
              CHOOSE YOUR CHALLENGE.
            </h1>
            <p className="text-zinc-400 text-sm max-w-2xl mt-2 font-mono-num">
              Transformative time-bound regimes engineered for radical discipline. Four structured tiers to ignite consistency, forge habits, or undergo total physical recomposition.
            </p>
          </div>

          {user?.joinedChallengeId && (
            <div className="p-3 bg-zinc-900 border border-[#d8ff38]/40 flex items-center gap-3">
              <Flame size={18} className="text-[#d8ff38]" />
              <div className="font-mono-num text-xs">
                <span className="text-zinc-400 block text-[10px] uppercase">ACTIVE ENROLLMENT</span>
                <span className="text-white font-bold">
                  {CHALLENGES_DATA.find(c => c.id === user.joinedChallengeId)?.title || 'ACTIVE PROTOCOL'}
                </span>
              </div>
              <button
                onClick={() => setActiveTab('dashboard')}
                className="px-3 py-1 bg-[#d8ff38] text-black text-xs font-mono-num font-bold uppercase ml-2"
              >
                VIEW LOGS
              </button>
            </div>
          )}
        </div>

        {/* Enrollment Confirmation Alert */}
        {enrollmentSuccessMessage && (
          <div className="mb-8 p-4 bg-[#d8ff38]/10 border border-[#d8ff38] text-[#d8ff38] font-mono-num text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check size={16} />
              <span>{enrollmentSuccessMessage}</span>
            </div>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="underline font-bold uppercase"
            >
              GO TO DASHBOARD
            </button>
          </div>
        )}

        {/* 4 Large Editorial Challenge Blocks */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {CHALLENGES_DATA.map((challenge, idx) => {
            const isEnrolled = user?.joinedChallengeId === challenge.id;
            const blockNumber = `0${idx + 1}`;

            return (
              <div
                key={challenge.id}
                className={`border bg-zinc-950 flex flex-col justify-between p-6 sm:p-7 transition-all ${
                  isEnrolled 
                    ? 'border-[#d8ff38] bg-zinc-950/90 shadow-[0_0_25px_rgba(216,255,56,0.15)]' 
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                <div>
                  {/* Top Block Number & Duration */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 font-mono-num">
                    <span className="text-xs font-bold text-[#d8ff38]">
                      {blockNumber} // {challenge.durationDays} DAYS
                    </span>
                    <span className="text-[10px] text-zinc-500 uppercase px-2 py-0.5 bg-zinc-900 border border-white/5">
                      {challenge.difficulty}
                    </span>
                  </div>

                  {/* Title & Editorial Tagline */}
                  <h3 className="text-xl sm:text-2xl font-bold font-display uppercase text-white mb-1">
                    {challenge.title}
                  </h3>
                  <p className="text-xs text-[#d8ff38] font-mono-num font-semibold mb-4 italic">
                    {challenge.tagline}
                  </p>

                  {/* Parameter Matrix: Goal, Workout, Nutrition, Community */}
                  <div className="space-y-2 font-mono-num text-[11px] border-t border-white/10 pt-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-zinc-500 uppercase">GOAL:</span>
                      <span className="text-zinc-300 font-bold">{challenge.goal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 uppercase">WORKOUT:</span>
                      <span className="text-zinc-300 font-bold truncate max-w-[170px] text-right">{challenge.workoutOverview}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 uppercase">NUTRITION:</span>
                      <span className="text-zinc-300 font-bold truncate max-w-[170px] text-right">{challenge.nutritionOverview}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 uppercase">ACCOUNTABILITY:</span>
                      <span className="text-zinc-300 font-bold">Daily Streak Logs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 uppercase">COMMUNITY:</span>
                      <span className="text-[#d8ff38] font-bold">{challenge.enrolledCount} Athletes</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="space-y-2 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono-num text-zinc-300 mb-2">
                    <span className="text-zinc-500 uppercase text-[10px]">ACCESS:</span>
                    <span className="font-bold text-white">{challenge.price}</span>
                  </div>

                  <button
                    onClick={() => setSelectedChallenge(challenge)}
                    className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-mono-num font-bold text-white uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <span>VIEW CHALLENGE</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    onClick={() => handleEnroll(challenge.id)}
                    className={`w-full py-3 text-xs font-mono-num font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      isEnrolled
                        ? 'bg-zinc-800 text-[#d8ff38] border border-[#d8ff38]'
                        : 'bg-[#d8ff38] hover:bg-[#c9f028] text-black'
                    }`}
                  >
                    {isEnrolled ? (
                      <>
                        <Check size={14} />
                        <span>CURRENTLY ACTIVE</span>
                      </>
                    ) : (
                      <>
                        <span>JOIN CHALLENGE</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Challenge Detailed Full Modal */}
        {selectedChallenge && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0c0c0e] border border-white/20 max-w-3xl w-full p-6 sm:p-8 space-y-8 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono-num uppercase tracking-widest text-[#d8ff38] block">
                    {selectedChallenge.durationDays} DAYS // {selectedChallenge.difficulty} DIFFICULTY
                  </span>
                  <h3 className="text-3xl font-extrabold uppercase font-display text-white mt-1">
                    {selectedChallenge.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedChallenge(null)}
                  className="text-zinc-400 hover:text-white p-1"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Description & Overview */}
              <div className="space-y-3">
                <p className="text-sm text-zinc-300 font-mono-num leading-relaxed">
                  {selectedChallenge.description}
                </p>
              </div>

              {/* Workout & Nutrition Summary */}
              <div className="grid sm:grid-cols-2 gap-4 font-mono-num text-xs">
                <div className="p-4 bg-zinc-950 border border-white/10">
                  <span className="text-[10px] uppercase text-[#d8ff38] font-bold block mb-1">WORKOUT ARCHITECTURE</span>
                  <p className="text-zinc-300">{selectedChallenge.workoutOverview}</p>
                </div>
                <div className="p-4 bg-zinc-950 border border-white/10">
                  <span className="text-[10px] uppercase text-[#d8ff38] font-bold block mb-1">NUTRITION STRATEGY</span>
                  <p className="text-zinc-300">{selectedChallenge.nutritionOverview}</p>
                </div>
              </div>

              {/* Accountability Rules */}
              <div className="bg-zinc-950 border border-white/10 p-5 space-y-3">
                <h4 className="text-xs font-mono-num font-bold uppercase tracking-wider text-[#d8ff38] flex items-center gap-2">
                  <ShieldCheck size={16} />
                  <span>NON-NEGOTIABLE ACCOUNTABILITY CODES</span>
                </h4>
                <div className="space-y-2 font-mono-num text-xs text-zinc-300">
                  {selectedChallenge.accountabilityRules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-white font-bold">RULE {idx + 1}:</span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frequently Asked Questions */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono-num font-bold uppercase tracking-wider text-white">
                  FREQUENTLY ASKED QUESTIONS
                </h4>
                <div className="space-y-3 font-mono-num text-xs">
                  {selectedChallenge.faqs.map((faq, fIdx) => (
                    <div key={fIdx} className="border border-white/10 p-3 bg-zinc-950">
                      <p className="font-bold text-white mb-1">Q: {faq.q}</p>
                      <p className="text-zinc-400">A: {faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-mono-num text-zinc-400">
                  Price: {selectedChallenge.price} • Badge: {selectedChallenge.badgeName}
                </span>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedChallenge(null)}
                    className="px-4 py-2.5 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-mono-num uppercase"
                  >
                    CLOSE
                  </button>
                  <button
                    onClick={() => {
                      handleEnroll(selectedChallenge.id);
                      setSelectedChallenge(null);
                    }}
                    className="px-6 py-2.5 bg-[#d8ff38] hover:bg-[#c9f028] text-black font-mono-num font-bold text-xs uppercase flex items-center gap-2"
                  >
                    <span>ENROLL NOW</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
