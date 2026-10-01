import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  getSavedFirebaseConfig, 
  saveFirebaseConfigToStorage, 
  resetFirebaseConfigToDefault,
  FirebaseCustomConfig 
} from '../services/firebase';
import { X, Check, Database, Flame, RefreshCw } from 'lucide-react';

export const FirebaseConfigModal: React.FC = () => {
  const { isFirebaseModalOpen, closeFirebaseModal, isFirebaseConnected } = useApp();

  const [apiKey, setApiKey] = useState('');
  const [authDomain, setAuthDomain] = useState('');
  const [databaseURL, setDatabaseURL] = useState('');
  const [projectId, setProjectId] = useState('');
  const [storageBucket, setStorageBucket] = useState('');
  const [messagingSenderId, setMessagingSenderId] = useState('');
  const [appId, setAppId] = useState('');

  const [rawConfigJson, setRawConfigJson] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  useEffect(() => {
    if (isFirebaseModalOpen) {
      const current = getSavedFirebaseConfig();
      setApiKey(current.apiKey || '');
      setAuthDomain(current.authDomain || '');
      setDatabaseURL(current.databaseURL || '');
      setProjectId(current.projectId || '');
      setStorageBucket(current.storageBucket || '');
      setMessagingSenderId(current.messagingSenderId || '');
      setAppId(current.appId || '');
    }
  }, [isFirebaseModalOpen]);

  if (!isFirebaseModalOpen) return null;

  const handlePasteJson = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setRawConfigJson(val);
    setParseError(null);

    try {
      // Clean JS object or JSON: handles { apiKey: "...", ... } or { "apiKey": "..." }
      const cleanJson = val
        .replace(/const\s+firebaseConfig\s*=\s*/, '')
        .replace(/;\s*$/, '')
        .replace(/([a-zA-Z0-9_]+)\s*:/g, '"$1":')
        .replace(/'/g, '"');

      const parsed = JSON.parse(cleanJson);
      if (parsed.apiKey) setApiKey(parsed.apiKey);
      if (parsed.authDomain) setAuthDomain(parsed.authDomain);
      if (parsed.databaseURL) setDatabaseURL(parsed.databaseURL);
      if (parsed.projectId) setProjectId(parsed.projectId);
      if (parsed.storageBucket) setStorageBucket(parsed.storageBucket);
      if (parsed.messagingSenderId) setMessagingSenderId(parsed.messagingSenderId);
      if (parsed.appId) setAppId(parsed.appId);
    } catch {
      setParseError('Could not auto-parse entire snippet. Please fill individual fields or enter valid JSON.');
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const config: FirebaseCustomConfig = {
      apiKey: apiKey.trim(),
      authDomain: authDomain.trim(),
      databaseURL: databaseURL.trim() || `https://${projectId.trim()}-default-rtdb.firebaseio.com`,
      projectId: projectId.trim(),
      storageBucket: storageBucket.trim(),
      messagingSenderId: messagingSenderId.trim(),
      appId: appId.trim(),
    };

    saveFirebaseConfigToStorage(config);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      closeFirebaseModal();
    }, 1200);
  };

  const handleReset = () => {
    resetFirebaseConfigToDefault();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0C0C0E] border border-white/20 max-w-xl w-full p-6 sm:p-7 space-y-5 my-auto shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#d8ff38]/10 border border-[#d8ff38]/30 flex items-center justify-center text-[#d8ff38]">
              <Flame size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono-num uppercase tracking-widest text-[#d8ff38] font-bold">
                  DATABASE & AUTHENTICATION
                </span>
                <span className={`px-1.5 py-0.2 text-[9px] font-mono-num font-bold rounded ${
                  isFirebaseConnected ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {isFirebaseConnected ? 'CONNECTED: fitnetheist-b553b' : 'CREDENTIALS NEEDED'}
                </span>
              </div>
              <h3 className="text-xl font-bold font-display uppercase text-white mt-0.5">
                FIREBASE RTDB & AUTH CONFIG
              </h3>
            </div>
          </div>
          <button
            onClick={closeFirebaseModal}
            className="text-white/60 hover:text-white p-1 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Info */}
        <p className="text-xs text-white/70 leading-relaxed">
          Configured for <strong>Firebase Auth</strong> (Google & Email) and <strong>Realtime Database / Firestore</strong>.
          Calculated calorie blueprints, user profiles, and meal plans persist directly to your Firebase project.
        </p>

        {/* Form */}
        <form onSubmit={handleSaveConfig} className="space-y-3.5 font-mono-num text-xs">
          
          {/* Quick Paste Area */}
          <div>
            <label className="block text-white/80 uppercase mb-1 flex items-center justify-between">
              <span>PASTE CONFIG OBJECT</span>
              <span className="text-[10px] text-zinc-500">Auto-populates fields</span>
            </label>
            <textarea
              rows={2}
              value={rawConfigJson}
              onChange={handlePasteJson}
              placeholder='e.g. const firebaseConfig = { apiKey: "...", authDomain: "...", projectId: "..." };'
              className="w-full bg-[#14141A] border border-white/15 px-3 py-2 text-white text-[11px] focus:border-[#d8ff38] focus:outline-none"
            />
            {parseError && (
              <p className="text-[10px] text-amber-400/80 mt-1">{parseError}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-white/70 uppercase mb-1">API KEY</label>
              <input
                type="text"
                required
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-[#14141A] border border-white/15 px-3 py-2 text-white focus:border-[#d8ff38] focus:outline-none text-[11px]"
              />
            </div>
            <div>
              <label className="block text-white/70 uppercase mb-1">PROJECT ID</label>
              <input
                type="text"
                required
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                placeholder="fitnetheist-b553b"
                className="w-full bg-[#14141A] border border-white/15 px-3 py-2 text-white focus:border-[#d8ff38] focus:outline-none text-[11px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-white/70 uppercase mb-1">AUTH DOMAIN</label>
              <input
                type="text"
                value={authDomain}
                onChange={(e) => setAuthDomain(e.target.value)}
                placeholder="fitnetheist-b553b.firebaseapp.com"
                className="w-full bg-[#14141A] border border-white/15 px-3 py-2 text-white focus:border-[#d8ff38] focus:outline-none text-[11px]"
              />
            </div>
            <div>
              <label className="block text-white/70 uppercase mb-1">REALTIME DATABASE URL</label>
              <input
                type="text"
                value={databaseURL}
                onChange={(e) => setDatabaseURL(e.target.value)}
                placeholder="https://fitnetheist-b553b-default-rtdb.firebaseio.com"
                className="w-full bg-[#14141A] border border-white/15 px-3 py-2 text-white focus:border-[#d8ff38] focus:outline-none text-[11px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-white/70 uppercase mb-1">STORAGE BUCKET</label>
              <input
                type="text"
                value={storageBucket}
                onChange={(e) => setStorageBucket(e.target.value)}
                placeholder="fitnetheist-b553b.firebasestorage.app"
                className="w-full bg-[#14141A] border border-white/15 px-3 py-2 text-white focus:border-[#d8ff38] focus:outline-none text-[11px]"
              />
            </div>
            <div>
              <label className="block text-white/70 uppercase mb-1">APP ID</label>
              <input
                type="text"
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
                placeholder="1:841468936530:web:..."
                className="w-full bg-[#14141A] border border-white/15 px-3 py-2 text-white focus:border-[#d8ff38] focus:outline-none text-[11px]"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw size={12} />
              <span>Reset to fitnetheist-b553b defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closeFirebaseModal}
                className="px-4 py-2 border border-white/15 text-white/70 hover:text-white uppercase transition-colors text-xs"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#d8ff38] hover:bg-[#c9f028] text-black font-extrabold uppercase tracking-wider text-xs transition-colors"
              >
                {saveSuccess ? 'SAVED & RELOADING...' : 'SAVE & CONNECT'}
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
