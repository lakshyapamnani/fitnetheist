import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut, 
  onAuthStateChanged, 
  User as FirebaseUser,
  Auth
} from 'firebase/auth';
import { 
  getDatabase, 
  ref, 
  update, 
  get, 
  Database 
} from 'firebase/database';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  Firestore 
} from 'firebase/firestore';

export interface FirebaseCustomConfig {
  apiKey?: string;
  authDomain?: string;
  databaseURL?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  measurementId?: string;
}

// User-provided Firebase Project Configuration
export const DEFAULT_FIREBASE_CONFIG: FirebaseCustomConfig = {
  apiKey: "AIzaSyC9pgWG9eYGM5X4Zi4txyo6T-FMOrj6b4Q",
  authDomain: "fitnetheist-b553b.firebaseapp.com",
  projectId: "fitnetheist-b553b",
  storageBucket: "fitnetheist-b553b.firebasestorage.app",
  messagingSenderId: "841468936530",
  appId: "1:841468936530:web:fe4f479e3169fc024efa8b",
  measurementId: "G-RDBD7XJJET",
  databaseURL: "https://fitnetheist-b553b-default-rtdb.firebaseio.com"
};

// Storage key for custom user credentials if updated through UI
const LOCAL_FIREBASE_CONFIG_KEY = 'fitnetheist_firebase_config';

export const getSavedFirebaseConfig = (): FirebaseCustomConfig => {
  // 1. Check localStorage in case user modified credentials via the UI
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(LOCAL_FIREBASE_CONFIG_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.apiKey) return parsed;
      }
    } catch {
      // ignore
    }
  }

  // 2. Check environment variables
  const metaEnv = ((import.meta as any).env || {}) as Record<string, string | undefined>;
  if (metaEnv.VITE_FIREBASE_API_KEY) {
    return {
      apiKey: metaEnv.VITE_FIREBASE_API_KEY,
      authDomain: metaEnv.VITE_FIREBASE_AUTH_DOMAIN || DEFAULT_FIREBASE_CONFIG.authDomain,
      databaseURL: metaEnv.VITE_FIREBASE_DATABASE_URL || DEFAULT_FIREBASE_CONFIG.databaseURL,
      projectId: metaEnv.VITE_FIREBASE_PROJECT_ID || DEFAULT_FIREBASE_CONFIG.projectId,
      storageBucket: metaEnv.VITE_FIREBASE_STORAGE_BUCKET || DEFAULT_FIREBASE_CONFIG.storageBucket,
      messagingSenderId: metaEnv.VITE_FIREBASE_MESSAGING_SENDER_ID || DEFAULT_FIREBASE_CONFIG.messagingSenderId,
      appId: metaEnv.VITE_FIREBASE_APP_ID || DEFAULT_FIREBASE_CONFIG.appId,
      measurementId: metaEnv.VITE_FIREBASE_MEASUREMENT_ID || DEFAULT_FIREBASE_CONFIG.measurementId
    };
  }

  // 3. Default to project credentials
  return DEFAULT_FIREBASE_CONFIG;
};

export const saveFirebaseConfigToStorage = (config: FirebaseCustomConfig) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_FIREBASE_CONFIG_KEY, JSON.stringify(config));
    window.location.reload();
  }
};

export const resetFirebaseConfigToDefault = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LOCAL_FIREBASE_CONFIG_KEY);
    window.location.reload();
  }
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Database | null = null;
let firestore: Firestore | null = null;

export const initFirebase = () => {
  const config = getSavedFirebaseConfig();
  if (!config.apiKey || (!config.projectId && !config.databaseURL)) {
    return { isConfigured: false, app: null, auth: null, db: null, firestore: null };
  }

  try {
    if (!getApps().length) {
      app = initializeApp({
        apiKey: config.apiKey,
        authDomain: config.authDomain || `${config.projectId}.firebaseapp.com`,
        databaseURL: config.databaseURL || (config.projectId ? `https://${config.projectId}-default-rtdb.firebaseio.com` : undefined),
        projectId: config.projectId,
        storageBucket: config.storageBucket || `${config.projectId}.firebasestorage.app`,
        messagingSenderId: config.messagingSenderId,
        appId: config.appId,
        measurementId: config.measurementId
      });
    } else {
      app = getApp();
    }

    auth = getAuth(app);

    // Initialize Realtime Database
    try {
      db = getDatabase(app, config.databaseURL);
    } catch (e) {
      console.warn('Realtime Database init notice:', e);
    }

    // Initialize Firestore for dual-persistence support
    try {
      firestore = getFirestore(app);
    } catch (e) {
      console.warn('Firestore init notice:', e);
    }

    return { isConfigured: true, app, auth, db, firestore };
  } catch (err) {
    console.warn('Firebase initialization notice:', err);
    return { isConfigured: false, app: null, auth: null, db: null, firestore: null };
  }
};

// Auto initialize on module load
const initialized = initFirebase();
app = initialized.app;
auth = initialized.auth;
db = initialized.db;
firestore = initialized.firestore;

export { app, auth, db, firestore };

/**
 * Authentication methods with Google OAuth & Email/Password
 */
export const signInWithGoogle = async () => {
  if (!auth) {
    initFirebase();
  }
  if (!auth) throw new Error('Firebase Auth is not initialized.');
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  try {
    return await signInWithPopup(auth, provider);
  } catch (err: any) {
    // If popup was blocked in iframe, suggest opening in new tab
    if (err?.code === 'auth/popup-blocked') {
      throw new Error('Google Sign-In popup was blocked by your browser. Please allow popups or open this app in a new tab.');
    }
    throw err;
  }
};

export const signInWithEmail = async (email: string, pass: string) => {
  if (!auth) initFirebase();
  if (!auth) throw new Error('Firebase Auth is not configured.');
  return await signInWithEmailAndPassword(auth, email, pass);
};

export const registerWithEmail = async (email: string, pass: string) => {
  if (!auth) initFirebase();
  if (!auth) throw new Error('Firebase Auth is not configured.');
  return await createUserWithEmailAndPassword(auth, email, pass);
};

export const logoutFirebase = async () => {
  if (auth) {
    await firebaseSignOut(auth);
  }
};

export const onAuthChange = (callback: (user: FirebaseUser | null) => void) => {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};

/**
 * Realtime Database & Firestore Synchronization
 */
export const syncUserDataToRealtimeDb = async (userId: string, data: Record<string, any>) => {
  const payload = {
    ...data,
    lastUpdatedAt: new Date().toISOString()
  };

  // 1. Try Realtime Database
  if (db) {
    try {
      const userRef = ref(db, `athletes/${userId}`);
      await update(userRef, payload);
    } catch (err) {
      console.warn('Notice syncing to Realtime Database:', err);
    }
  }

  // 2. Mirror to Firestore as well
  if (firestore) {
    try {
      const athleteDoc = doc(firestore, 'athletes', userId);
      await setDoc(athleteDoc, payload, { merge: true });
    } catch (err) {
      console.warn('Notice syncing to Firestore:', err);
    }
  }

  // 3. Update localStorage fallback
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`fitnetheist_profile_${userId}`, JSON.stringify(payload));
    } catch {
      // ignore
    }
  }
};

export const getUserDataFromRealtimeDb = async (userId: string) => {
  // 1. Try Realtime Database first
  if (db) {
    try {
      const userRef = ref(db, `athletes/${userId}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        return snapshot.val();
      }
    } catch (err) {
      console.warn('Notice reading from Realtime Database:', err);
    }
  }

  // 2. Try Firestore
  if (firestore) {
    try {
      const athleteDoc = doc(firestore, 'athletes', userId);
      const snap = await getDoc(athleteDoc);
      if (snap.exists()) {
        return snap.data();
      }
    } catch (err) {
      console.warn('Notice reading from Firestore:', err);
    }
  }

  // 3. Try localStorage cache
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(`fitnetheist_profile_${userId}`);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
  }

  return null;
};
