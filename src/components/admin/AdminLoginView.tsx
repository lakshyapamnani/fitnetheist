import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useApp } from '../../context/AppContext';
import { 
  Lock, 
  User, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ArrowLeft
} from 'lucide-react';

export const AdminLoginView: React.FC = () => {
  const { adminLogin } = useAdmin();
  const { setActiveTab } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const success = adminLogin(username.trim(), password, rememberMe);
      if (!success) {
        setError('Invalid username or password. Please try again.');
        setIsLoading(false);
      }
    }, 300);
  };

  return (
    <div id="admin-login-screen" className="min-h-screen w-full bg-[#09090b] text-zinc-100 flex flex-col justify-between selection:bg-zinc-700 selection:text-white font-sans">
      
      {/* Top Header */}
      <header className="h-16 border-b border-zinc-800/80 px-6 sm:px-10 flex items-center justify-between bg-[#0c0c0e]">
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-lg tracking-tight text-white flex items-center gap-2">
            FITNETHEIST <span className="text-zinc-400 text-xs font-mono font-medium px-2 py-0.5 border border-zinc-700 bg-zinc-850 rounded-xs uppercase">ADMIN PORTAL</span>
          </span>
        </div>

        <button
          onClick={() => setActiveTab('home')}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-100 uppercase tracking-wider transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Back to Site</span>
        </button>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-[#121215] border border-zinc-800 rounded-sm p-6 sm:p-8 shadow-xl">
          
          {/* Header Title */}
          <div className="space-y-1.5 mb-6 text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800/70 border border-zinc-700 text-zinc-300 mb-2">
              <Lock size={18} />
            </div>

            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-tight font-display text-white">
              Administrator Login
            </h1>

            <p className="text-xs text-zinc-400 font-mono">
              Sign in with your administrative credentials to continue.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3 bg-red-950/40 border border-red-800/60 text-red-200 text-xs font-mono rounded-xs flex items-start gap-2">
              <AlertCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Authentication Failed</strong>
                <span className="text-zinc-300 text-[11px]">{error}</span>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            
            {/* Username Field */}
            <div>
              <label className="block text-zinc-300 uppercase font-medium mb-1.5 tracking-wider text-[11px]">
                Username
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  required
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full bg-[#18181c] border border-zinc-700/80 focus:border-zinc-400 focus:bg-[#1a1a20] rounded-xs pl-10 pr-4 py-2.5 text-white placeholder-zinc-500 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-zinc-300 uppercase font-medium mb-1.5 tracking-wider text-[11px]">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-[#18181c] border border-zinc-700/80 focus:border-zinc-400 focus:bg-[#1a1a20] rounded-xs pl-10 pr-10 py-2.5 text-white placeholder-zinc-500 outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-200 p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-[11px]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-zinc-400 rounded-xs w-3.5 h-3.5"
                />
                <span>Remember session</span>
              </label>
              <span className="text-[10px] text-zinc-500">Secure Protocol</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-white hover:bg-zinc-200 text-zinc-950 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 rounded-xs transition-colors disabled:opacity-60 mt-3 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="h-3.5 w-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>

          </form>

        </div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="py-4 border-t border-zinc-800/80 text-center font-mono text-[11px] text-zinc-500 px-4 bg-[#0c0c0e]">
        <span>Fitnetheist Administrative Console</span>
      </footer>

    </div>
  );
};
