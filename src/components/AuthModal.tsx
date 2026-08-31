import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DietType, CuisineType, ActivityLevel, FitnessGoal } from '../types';
import { X, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authModalMode, closeAuthModal, loginUser, signupUser } = useApp();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(authModalMode);
  const [step, setStep] = useState<'credentials' | 'profile'>(
    authModalMode === 'signup' ? 'credentials' : 'credentials'
  );

  // Credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Profile Onboarding variables
  const [age, setAge] = useState(25);
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [heightCm, setHeightCm] = useState(178);
  const [weightKg, setWeightKg] = useState(78);
  const [activity, setActivity] = useState<ActivityLevel>('MODERATE');
  const [dietType, setDietType] = useState<DietType>('NON-VEGETARIAN');
  const [cuisine, setCuisine] = useState<CuisineType>('INDIAN_INTERNATIONAL');
  const [goal, setGoal] = useState<FitnessGoal>('BUILD_MUSCLE');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(email || 'alex@fitnetheist.com', password || 'athlete123');
    closeAuthModal();
  };

  const handleSignupFirstStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('profile');
  };

  const handleCompleteSignup = (e: React.FormEvent) => {
    e.preventDefault();
    signupUser(
      name || 'Alex Morgan',
      email || 'athlete@fitnetheist.com',
      password || 'secure123',
      {
        age,
        sex,
        heightCm,
        weightKg,
        activityLevel: activity,
        dietType,
        cuisine,
        goal
      }
    );
    closeAuthModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0c0c0e] border border-white/20 max-w-lg w-full p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-mono-num uppercase tracking-widest text-[#d8ff38] block">
              ATHLETE SECURITY PROTOCOL
            </span>
            <h3 className="text-2xl font-bold uppercase font-display text-white mt-0.5">
              {mode === 'login' ? 'ACCESS PORTAL' : step === 'credentials' ? 'ATHLETE ENROLLMENT' : 'BIOMETRIC INITIALIZATION'}
            </h3>
          </div>
          <button
            onClick={closeAuthModal}
            className="text-zinc-400 hover:text-white p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Login Form */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 font-mono-num text-xs">
            <div>
              <label className="block text-zinc-400 uppercase mb-1">EMAIL ADDRESS</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="athlete@fitnetheist.com"
                className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-zinc-400 uppercase mb-1">PASSWORD</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2.5 text-white"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#d8ff38] hover:bg-[#c9f028] text-black font-bold uppercase tracking-wider text-xs"
              >
                SIGN IN & ACCESS DASHBOARD
              </button>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-zinc-400 text-[11px]">
              <button
                type="button"
                onClick={() => { setMode('signup'); setStep('credentials'); }}
                className="hover:text-white underline"
              >
                Need an account? Enroll here
              </button>
              <span className="text-zinc-600">|</span>
              <button
                type="button"
                onClick={() => loginUser('demo@fitnetheist.com', 'demo')}
                className="text-[#d8ff38] hover:underline"
              >
                Instant Demo Access
              </button>
            </div>
          </form>
        )}

        {/* Sign Up Form - Step 1: Credentials */}
        {mode === 'signup' && step === 'credentials' && (
          <form onSubmit={handleSignupFirstStep} className="space-y-4 font-mono-num text-xs">
            <div>
              <label className="block text-zinc-400 uppercase mb-1">FULL ATHLETE NAME</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Morgan"
                className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-zinc-400 uppercase mb-1">EMAIL ADDRESS</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@athlete.com"
                className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-zinc-400 uppercase mb-1">CHOOSE PASSWORD</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2.5 text-white"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#d8ff38] hover:bg-[#c9f028] text-black font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2"
              >
                <span>CONTINUE TO BIOMETRIC PROFILE</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="pt-4 border-t border-white/10 text-center text-zinc-400 text-[11px]">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="hover:text-white underline"
              >
                Already registered? Sign In
              </button>
            </div>
          </form>
        )}

        {/* Sign Up Form - Step 2: Biometric Onboarding */}
        {mode === 'signup' && step === 'profile' && (
          <form onSubmit={handleCompleteSignup} className="space-y-4 font-mono-num text-xs">
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 uppercase mb-1">SEX</label>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    type="button"
                    onClick={() => setSex('male')}
                    className={`py-2 text-[10px] uppercase font-bold border ${
                      sex === 'male' ? 'bg-white text-black border-white' : 'border-zinc-800 text-zinc-400 bg-zinc-900'
                    }`}
                  >
                    MALE
                  </button>
                  <button
                    type="button"
                    onClick={() => setSex('female')}
                    className={`py-2 text-[10px] uppercase font-bold border ${
                      sex === 'female' ? 'bg-white text-black border-white' : 'border-zinc-800 text-zinc-400 bg-zinc-900'
                    }`}
                  >
                    FEMALE
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">AGE</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 uppercase mb-1">HEIGHT (CM)</label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-zinc-400 uppercase mb-1">WEIGHT (KG)</label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 uppercase mb-1">DIET REGIME</label>
                <select
                  value={dietType}
                  onChange={(e) => setDietType(e.target.value as any)}
                  className="w-full bg-zinc-900 border border-zinc-800 px-2 py-2 text-white text-[11px]"
                >
                  <option value="NON-VEGETARIAN">NON-VEGETARIAN</option>
                  <option value="VEGETARIAN">VEGETARIAN</option>
                  <option value="VEGAN">VEGAN</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">PRIMARY GOAL</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value as any)}
                  className="w-full bg-zinc-900 border border-zinc-800 px-2 py-2 text-white text-[11px]"
                >
                  <option value="BUILD_MUSCLE">BUILD MUSCLE</option>
                  <option value="LOSE_WEIGHT">FAT LOSS</option>
                  <option value="MAINTAIN">MAINTAIN</option>
                  <option value="GAIN_WEIGHT">BULK</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep('credentials')}
                className="px-4 py-2 border border-zinc-800 text-zinc-400 hover:text-white uppercase"
              >
                BACK
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#d8ff38] hover:bg-[#c9f028] text-black font-bold uppercase tracking-wider"
              >
                INITIALIZE ACCOUNT
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
