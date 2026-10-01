import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { DietType, CuisineType, ActivityLevel, FitnessGoal } from '../types';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Database } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    authModalMode, 
    authPromptReason, 
    pendingAthleteDetails, 
    closeAuthModal, 
    loginUser, 
    signupUser, 
    loginWithGoogle,
    openFirebaseConfigModal,
    isFirebaseConnected 
  } = useApp();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [step, setStep] = useState<'credentials' | 'profile'>('credentials');
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Profile Onboarding variables
  const [age, setAge] = useState(26);
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [heightCm, setHeightCm] = useState(178);
  const [weightKg, setWeightKg] = useState(78);
  const [activity, setActivity] = useState<ActivityLevel>('MODERATE');
  const [dietType, setDietType] = useState<DietType>('NON-VEGETARIAN');
  const [cuisine, setCuisine] = useState<CuisineType>('INDIAN_INTERNATIONAL');
  const [goal, setGoal] = useState<FitnessGoal>('BUILD_MUSCLE');

  // Synchronize initial mode and metrics whenever modal opens
  useEffect(() => {
    if (isAuthModalOpen) {
      setMode(authModalMode === 'signup' ? 'signup' : 'login');
      setStep('credentials');
      setAuthError(null);

      // Auto-populate from pending metrics if available
      if (pendingAthleteDetails?.userMetrics) {
        const m = pendingAthleteDetails.userMetrics;
        if (m.age) setAge(m.age);
        if (m.sex) setSex(m.sex);
        if (m.heightCm) setHeightCm(m.heightCm);
        if (m.weightKg) setWeightKg(m.weightKg);
        if (m.activityLevel) setActivity(m.activityLevel);
        if (m.goal) setGoal(m.goal as FitnessGoal);
      }
    }
  }, [isAuthModalOpen, authModalMode, pendingAthleteDetails]);

  if (!isAuthModalOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setAuthError(null);
    try {
      await loginWithGoogle();
      closeAuthModal();
    } catch (err: any) {
      setAuthError(err?.message || 'Google authentication could not be completed.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setAuthError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    setAuthError(null);
    try {
      await loginUser(email.trim(), password.trim());
      closeAuthModal();
    } catch (err: any) {
      setAuthError(err?.message || 'Failed to sign in. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupFirstStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setAuthError('Please enter your full name, email, and password.');
      return;
    }
    // If pending athlete details exist, proceed directly to complete signup!
    if (pendingAthleteDetails?.userMetrics) {
      handleCompleteSignup(e);
    } else {
      setStep('profile');
    }
  };

  const handleCompleteSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setAuthError('Please provide a valid email and password.');
      return;
    }
    setLoading(true);
    setAuthError(null);
    try {
      await signupUser(
        name.trim() || email.split('@')[0],
        email.trim(),
        password.trim(),
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
    } catch (err: any) {
      setAuthError(err?.message || 'Failed to initialize athlete profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0c0c0e] border border-white/20 max-w-md w-full p-6 sm:p-7 space-y-5 my-auto shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-mono-num uppercase tracking-widest text-[#d8ff38] font-bold block">
              ATHLETE SECURITY & CLOUD SYNC
            </span>
            <h3 className="text-xl font-bold uppercase font-display text-white mt-0.5 tracking-wide">
              {mode === 'login' ? 'SIGN IN TO PROFILE' : step === 'credentials' ? 'SAVE & SYNC BLUEPRINT' : 'BIOMETRIC INITIALIZATION'}
            </h3>
          </div>
          <button
            onClick={closeAuthModal}
            className="text-white/60 hover:text-white p-1 transition-colors"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Auth Prompt Callout if triggered by calculator/plan */}
        {authPromptReason && (
          <div className="bg-[#d8ff38]/10 border border-[#d8ff38]/30 p-3 flex items-start gap-2.5">
            <CheckCircle2 size={16} className="text-[#d8ff38] shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-white block uppercase tracking-wider">Targets Calculated</span>
              <p className="text-zinc-300 text-[11px] leading-relaxed mt-0.5">{authPromptReason}</p>
            </div>
          </div>
        )}

        {/* Pending Details Summary Pill */}
        {pendingAthleteDetails && (
          <div className="bg-zinc-900/90 border border-white/10 px-3 py-2 flex items-center justify-between text-[11px] font-mono-num">
            <span className="text-zinc-400">Buffered Blueprint:</span>
            <span className="text-[#d8ff38] font-bold truncate max-w-[240px]">
              {pendingAthleteDetails.summaryText || pendingAthleteDetails.title}
            </span>
          </div>
        )}

        {/* Error Notification */}
        {authError && (
          <div className="p-3 bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono-num">
            {authError}
          </div>
        )}

        {/* One-Click Google Authentication */}
        <div>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-2.5 px-4 bg-white hover:bg-zinc-100 text-black font-mono-num font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-colors shadow-sm disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-white/10 w-full"></div>
            <span className="bg-[#0c0c0e] px-2 text-[10px] uppercase font-mono-num text-zinc-500 tracking-wider">
              OR EMAIL & PASSWORD
            </span>
          </div>
        </div>

        {/* Login Form */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 font-mono-num text-xs">
            <div>
              <label className="block text-white/70 uppercase mb-1">EMAIL ADDRESS</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full bg-[#14141a] border border-white/15 px-3 py-2.5 text-white focus:border-[#d8ff38] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-white/70 uppercase mb-1">PASSWORD</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-[#14141a] border border-white/15 px-3 py-2.5 text-white focus:border-[#d8ff38] focus:outline-none transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#d8ff38] hover:bg-[#c9f028] text-black font-extrabold uppercase tracking-wider text-xs transition-colors disabled:opacity-50"
              >
                {loading ? 'SIGNING IN...' : 'SIGN IN & SYNC PROFILE'}
              </button>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-center text-white/60 text-[11px]">
              <button
                type="button"
                onClick={() => { setMode('signup'); setStep('credentials'); }}
                className="hover:text-[#d8ff38] underline transition-colors"
              >
                Need an account? Enroll here
              </button>
            </div>
          </form>
        )}

        {/* Sign Up Form - Step 1: Credentials */}
        {mode === 'signup' && step === 'credentials' && (
          <form onSubmit={handleSignupFirstStep} className="space-y-4 font-mono-num text-xs">
            <div>
              <label className="block text-white/70 uppercase mb-1">FULL ATHLETE NAME</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Mercer"
                className="w-full bg-[#14141a] border border-white/15 px-3 py-2.5 text-white focus:border-[#d8ff38] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-white/70 uppercase mb-1">EMAIL ADDRESS</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="athlete@fitnetheist.com"
                className="w-full bg-[#14141a] border border-white/15 px-3 py-2.5 text-white focus:border-[#d8ff38] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-white/70 uppercase mb-1">CHOOSE PASSWORD</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#14141a] border border-white/15 px-3 py-2.5 text-white focus:border-[#d8ff38] focus:outline-none transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#d8ff38] hover:bg-[#c9f028] text-black font-extrabold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                <span>{pendingAthleteDetails ? 'SAVE BLUEPRINT & INITIALIZE' : 'CONTINUE TO BIOMETRIC PROFILE'}</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="pt-4 border-t border-white/10 text-center text-white/60 text-[11px]">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="hover:text-[#d8ff38] underline transition-colors"
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
                <label className="block text-white/70 uppercase mb-1">SEX</label>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    type="button"
                    onClick={() => setSex('male')}
                    className={`py-2 text-[10px] uppercase font-bold border transition-colors ${
                      sex === 'male' ? 'bg-[#d8ff38] text-black border-[#d8ff38]' : 'border-white/15 text-white/70 bg-[#14141a] hover:text-white'
                    }`}
                  >
                    MALE
                  </button>
                  <button
                    type="button"
                    onClick={() => setSex('female')}
                    className={`py-2 text-[10px] uppercase font-bold border transition-colors ${
                      sex === 'female' ? 'bg-[#d8ff38] text-black border-[#d8ff38]' : 'border-white/15 text-white/70 bg-[#14141a] hover:text-white'
                    }`}
                  >
                    FEMALE
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-white/70 uppercase mb-1">AGE</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full bg-[#14141a] border border-white/15 px-3 py-2 text-white focus:border-[#d8ff38] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-white/70 uppercase mb-1">HEIGHT (CM)</label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full bg-[#14141a] border border-white/15 px-3 py-2 text-white focus:border-[#d8ff38] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-white/70 uppercase mb-1">WEIGHT (KG)</label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full bg-[#14141a] border border-white/15 px-3 py-2 text-white focus:border-[#d8ff38] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-white/70 uppercase mb-1">DIET REGIME</label>
                <select
                  value={dietType}
                  onChange={(e) => setDietType(e.target.value as any)}
                  className="w-full bg-[#14141a] border border-white/15 px-2 py-2 text-white text-[11px] focus:border-[#d8ff38] focus:outline-none"
                >
                  <option value="NON-VEGETARIAN">NON-VEGETARIAN</option>
                  <option value="VEGETARIAN">VEGETARIAN</option>
                  <option value="VEGAN">VEGAN</option>
                </select>
              </div>

              <div>
                <label className="block text-white/70 uppercase mb-1">PRIMARY GOAL</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value as any)}
                  className="w-full bg-[#14141a] border border-white/15 px-2 py-2 text-white text-[11px] focus:border-[#d8ff38] focus:outline-none"
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
                className="px-4 py-2 border border-white/15 text-white/70 hover:text-white uppercase transition-colors"
              >
                BACK
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-[#d8ff38] hover:bg-[#c9f028] text-black font-extrabold uppercase tracking-wider transition-colors disabled:opacity-50"
              >
                {loading ? 'INITIALIZING...' : 'INITIALIZE ACCOUNT'}
              </button>
            </div>
          </form>
        )}

        {/* Footer actions: Firebase Config & Guest continue */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono-num">
          <button
            type="button"
            onClick={() => { closeAuthModal(); openFirebaseConfigModal(); }}
            className="text-zinc-500 hover:text-zinc-300 flex items-center gap-1.5 transition-colors"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isFirebaseConnected ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
            <span>Firebase RTDB: {isFirebaseConnected ? 'Connected' : 'Configure'}</span>
          </button>
          <button
            type="button"
            onClick={closeAuthModal}
            className="text-zinc-400 hover:text-white underline transition-colors"
          >
            Continue as Guest
          </button>
        </div>

      </div>
    </div>
  );
};
