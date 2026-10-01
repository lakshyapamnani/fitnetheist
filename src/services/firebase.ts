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
  set,
  get, 
  onValue,
  remove,
  Database 
} from 'firebase/database';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  deleteDoc,
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

/**
 * Realtime Database All Athletes / User Logins Listener
 */
export const listenToRealtimeAthletes = (callback: (athletes: any[]) => void) => {
  if (!db) {
    return () => {};
  }

  try {
    const athletesRef = ref(db, 'athletes');
    const unsubscribe = onValue(athletesRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const athletesList = Object.keys(val).map(key => {
          const item = val[key];
          const profile = item.profile || item;
          return {
            id: key,
            ...item,
            ...profile,
            userId: key
          };
        });
        callback(athletesList);
      } else {
        callback([]);
      }
    }, (error) => {
      console.warn('Realtime Database athletes listener notice:', error);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  } catch (err) {
    console.warn('Could not attach realtime athletes listener:', err);
    return () => {};
  }
};

/**
 * Realtime Database Leads Synchronization
 */
export const saveLeadToRealtimeDb = async (lead: Record<string, any>) => {
  if (!lead || !lead.id) return;

  const payload = {
    ...lead,
    lastSyncedAt: new Date().toISOString()
  };

  // 1. Push / set into Realtime Database
  if (db) {
    try {
      const leadRef = ref(db, `leads/${lead.id}`);
      await set(leadRef, payload);
    } catch (err) {
      console.warn('Realtime Database lead sync notice:', err);
    }
  }

  // 2. Mirror into Firestore
  if (firestore) {
    try {
      const leadDoc = doc(firestore, 'leads', lead.id);
      await setDoc(leadDoc, payload, { merge: true });
    } catch (err) {
      console.warn('Firestore lead sync notice:', err);
    }
  }
};

export const deleteLeadFromRealtimeDb = async (leadId: string) => {
  if (!leadId) return;
  if (db) {
    try {
      const leadRef = ref(db, `leads/${leadId}`);
      await remove(leadRef);
    } catch (err) {
      console.warn('Realtime Database lead delete notice:', err);
    }
  }
};

export const listenToRealtimeLeads = (callback: (leads: any[]) => void) => {
  if (!db) {
    return () => {};
  }

  try {
    const leadsRef = ref(db, 'leads');
    const unsubscribe = onValue(leadsRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const leadsList = Object.keys(val).map(key => ({
          ...val[key],
          id: val[key].id || key
        }));
        callback(leadsList);
      } else {
        callback([]);
      }
    }, (error) => {
      console.warn('Realtime Database leads listener notice:', error);
    });

    return () => {
      // Unsubscribe callback
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  } catch (err) {
    console.warn('Could not attach realtime leads listener:', err);
    return () => {};
  }
};

/**
 * Realtime Database Customer Synchronization
 */
export const saveCustomerToRealtimeDb = async (customer: Record<string, any>) => {
  if (!customer || !customer.id) return;

  const payload = {
    ...customer,
    lastSyncedAt: new Date().toISOString()
  };

  if (db) {
    try {
      const custRef = ref(db, `customers/${customer.id}`);
      await set(custRef, payload);
    } catch (err) {
      console.warn('Realtime Database customer sync notice:', err);
    }
  }

  if (firestore) {
    try {
      const custDoc = doc(firestore, 'customers', customer.id);
      await setDoc(custDoc, payload, { merge: true });
    } catch (err) {
      console.warn('Firestore customer sync notice:', err);
    }
  }
};

export const listenToRealtimeCustomers = (callback: (customers: any[]) => void) => {
  if (!db) {
    return () => {};
  }

  try {
    const custRef = ref(db, 'customers');
    const unsubscribe = onValue(custRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const custList = Object.keys(val).map(key => ({
          ...val[key],
          id: val[key].id || key
        }));
        callback(custList);
      } else {
        callback([]);
      }
    }, (error) => {
      console.warn('Realtime Database customers listener notice:', error);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  } catch (err) {
    console.warn('Could not attach realtime customers listener:', err);
    return () => {};
  }
};

/**
 * Realtime Database Diet Plans Synchronization
 */
export const saveDietPlanToRealtimeDb = async (userId: string, dietPlan: Record<string, any>) => {
  if (!dietPlan) return;
  const payload = {
    ...dietPlan,
    userId: userId || 'anonymous',
    generatedAt: new Date().toISOString()
  };

  if (db) {
    try {
      const planRef = ref(db, `dietPlans/${userId}`);
      await set(planRef, payload);
    } catch (err) {
      console.warn('Realtime Database diet plan sync notice:', err);
    }
  }

  if (firestore) {
    try {
      const planDoc = doc(firestore, 'dietPlans', userId);
      await setDoc(planDoc, payload, { merge: true });
    } catch (err) {
      console.warn('Firestore diet plan sync notice:', err);
    }
  }
};

export const getDietPlanFromRealtimeDb = async (userId: string) => {
  if (!userId) return null;
  if (db) {
    try {
      const planRef = ref(db, `dietPlans/${userId}`);
      const snap = await get(planRef);
      if (snap.exists()) return snap.val();
    } catch (e) {}
  }
  return null;
};

/**
 * Realtime Database Workout Plans Synchronization
 */
export const saveWorkoutPlanToRealtimeDb = async (userId: string, workoutPlan: Record<string, any>) => {
  if (!workoutPlan) return;
  const payload = {
    ...workoutPlan,
    userId: userId || 'anonymous',
    generatedAt: new Date().toISOString()
  };

  if (db) {
    try {
      const workoutRef = ref(db, `workoutPlans/${userId}`);
      await set(workoutRef, payload);
    } catch (err) {
      console.warn('Realtime Database workout plan sync notice:', err);
    }
  }

  if (firestore) {
    try {
      const workoutDoc = doc(firestore, 'workoutPlans', userId);
      await setDoc(workoutDoc, payload, { merge: true });
    } catch (err) {
      console.warn('Firestore workout plan sync notice:', err);
    }
  }
};

export const getWorkoutPlanFromRealtimeDb = async (userId: string) => {
  if (!userId) return null;
  if (db) {
    try {
      const workoutRef = ref(db, `workoutPlans/${userId}`);
      const snap = await get(workoutRef);
      if (snap.exists()) return snap.val();
    } catch (e) {}
  }
  return null;
};

export const listenToRealtimeWorkoutPlans = (callback: (workoutPlans: any[]) => void) => {
  if (!db) return () => {};
  try {
    const workoutRef = ref(db, 'workoutPlans');
    const unsubscribe = onValue(workoutRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const plansList = Object.keys(val).map(key => ({ ...val[key], id: val[key].id || key }));
        callback(plansList);
      } else {
        callback([]);
      }
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  } catch (e) {
    return () => {};
  }
};

export const saveCustomWorkoutToRealtimeDb = async (workout: Record<string, any>) => {
  if (!workout || !workout.id) return;
  const payload = {
    ...workout,
    lastSyncedAt: new Date().toISOString()
  };
  if (db) {
    try {
      const wRef = ref(db, `workouts/${workout.id}`);
      await set(wRef, payload);
    } catch (err) {
      console.warn('Realtime Database workout sync notice:', err);
    }
  }
  if (firestore) {
    try {
      const wDoc = doc(firestore, 'workouts', workout.id);
      await setDoc(wDoc, payload, { merge: true });
    } catch (err) {
      console.warn('Firestore workout sync notice:', err);
    }
  }
};

export const deleteCustomWorkoutFromRealtimeDb = async (workoutId: string) => {
  if (!workoutId) return;
  if (db) {
    try {
      const wRef = ref(db, `workouts/${workoutId}`);
      await remove(wRef);
    } catch (err) {
      console.warn('Realtime Database workout deletion notice:', err);
    }
  }
  if (firestore) {
    try {
      const wDoc = doc(firestore, 'workouts', workoutId);
      await deleteDoc(wDoc);
    } catch (err) {
      console.warn('Firestore workout deletion notice:', err);
    }
  }
};

export const listenToRealtimeWorkouts = (callback: (workouts: any[]) => void) => {
  if (!db) return () => {};
  try {
    const wRef = ref(db, 'workouts');
    const unsubscribe = onValue(wRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const list = Object.keys(val).map(key => ({ ...val[key], id: val[key].id || key }));
        callback(list);
      } else {
        callback([]);
      }
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  } catch (e) {
    return () => {};
  }
};

/**
 * Realtime Database Invoices Synchronization
 */
export const saveInvoiceToRealtimeDb = async (invoice: Record<string, any>) => {
  if (!invoice || !invoice.id) return;
  const payload = {
    ...invoice,
    lastSyncedAt: new Date().toISOString()
  };
  if (db) {
    try {
      const invRef = ref(db, `invoices/${invoice.id}`);
      await set(invRef, payload);
    } catch (err) {
      console.warn('Realtime Database invoice sync notice:', err);
    }
  }
  if (firestore) {
    try {
      const invDoc = doc(firestore, 'invoices', invoice.id);
      await setDoc(invDoc, payload, { merge: true });
    } catch (err) {
      console.warn('Firestore invoice sync notice:', err);
    }
  }
};

export const deleteInvoiceFromRealtimeDb = async (invoiceId: string) => {
  if (!invoiceId) return;
  if (db) {
    try {
      const invRef = ref(db, `invoices/${invoiceId}`);
      await remove(invRef);
    } catch (err) {
      console.warn('Realtime Database invoice deletion notice:', err);
    }
  }
  if (firestore) {
    try {
      const invDoc = doc(firestore, 'invoices', invoiceId);
      await deleteDoc(invDoc);
    } catch (err) {
      console.warn('Firestore invoice deletion notice:', err);
    }
  }
};

export const listenToRealtimeInvoices = (callback: (invoices: any[]) => void) => {
  if (!db) return () => {};
  try {
    const invRef = ref(db, 'invoices');
    const unsubscribe = onValue(invRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const list = Object.keys(val).map(key => ({ ...val[key], id: val[key].id || key }));
        callback(list);
      } else {
        callback([]);
      }
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  } catch (e) {
    return () => {};
  }
};

/**
 * Realtime Database Calorie Target Calculations
 */
export const saveCalorieCalculationToRealtimeDb = async (userId: string, calculation: Record<string, any>) => {
  if (!calculation) return;
  const payload = {
    ...calculation,
    userId: userId || 'anonymous',
    calculatedAt: new Date().toISOString()
  };

  if (db) {
    try {
      const calcRef = ref(db, `calorieCalculations/${userId}`);
      await set(calcRef, payload);
    } catch (err) {
      console.warn('Realtime Database calorie target sync notice:', err);
    }
  }
};

/**
 * Realtime Database Daily Logs & Tracking
 */
export const saveDailyLogToRealtimeDb = async (userId: string, log: Record<string, any>) => {
  if (!log || !log.id) return;
  if (db) {
    try {
      const logRef = ref(db, `dailyLogs/${userId}/${log.id}`);
      await set(logRef, log);
    } catch (err) {
      console.warn('Realtime Database daily log sync notice:', err);
    }
  }
};

export const listenToUserDailyLogs = (userId: string, callback: (logs: any[]) => void) => {
  if (!db || !userId) return () => {};
  try {
    const logsRef = ref(db, `dailyLogs/${userId}`);
    const unsubscribe = onValue(logsRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const logsList = Object.keys(val).map(key => ({ ...val[key], id: val[key].id || key }));
        callback(logsList);
      } else {
        callback([]);
      }
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  } catch (e) {
    return () => {};
  }
};

/**
 * Realtime Database Community Posts & Interactions
 */
export const saveCommunityPostToRealtimeDb = async (post: Record<string, any>) => {
  if (!post || !post.id) return;
  if (db) {
    try {
      const postRef = ref(db, `communityPosts/${post.id}`);
      await set(postRef, post);
    } catch (err) {
      console.warn('Realtime Database post sync notice:', err);
    }
  }
};

export const listenToCommunityPosts = (callback: (posts: any[]) => void) => {
  if (!db) return () => {};
  try {
    const postsRef = ref(db, 'communityPosts');
    const unsubscribe = onValue(postsRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const postsList = Object.keys(val).map(key => ({ ...val[key], id: val[key].id || key }));
        callback(postsList);
      } else {
        callback([]);
      }
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  } catch (e) {
    return () => {};
  }
};

/**
 * Realtime Database Exercise Database & Form Video Synchronization
 */
export const saveExerciseDatabaseToRealtimeDb = async (exercises: any[]) => {
  if (!exercises || !Array.isArray(exercises)) return;
  if (db) {
    try {
      const exercisesRef = ref(db, 'exercisesLibrary');
      const dataObj: Record<string, any> = {};
      exercises.forEach(ex => {
        if (ex && ex.id) dataObj[ex.id] = ex;
      });
      await set(exercisesRef, dataObj);
    } catch (err) {
      console.warn('Realtime Database exercises sync notice:', err);
    }
  }
};

export const saveSingleExerciseToRealtimeDb = async (exercise: any) => {
  if (!exercise || !exercise.id) return;
  if (db) {
    try {
      const exRef = ref(db, `exercisesLibrary/${exercise.id}`);
      await set(exRef, exercise);
    } catch (err) {
      console.warn('Realtime Database exercise sync notice:', err);
    }
  }
};

export const deleteSingleExerciseFromRealtimeDb = async (exerciseId: string) => {
  if (!exerciseId) return;
  if (db) {
    try {
      const exRef = ref(db, `exercisesLibrary/${exerciseId}`);
      await remove(exRef);
    } catch (err) {}
  }
};

export const listenToRealtimeExercises = (callback: (exercises: any[]) => void) => {
  if (!db) return () => {};
  try {
    const exercisesRef = ref(db, 'exercisesLibrary');
    const unsubscribe = onValue(exercisesRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const list = Object.keys(val).map(key => ({ ...val[key], id: val[key].id || key }));
        callback(list);
      } else {
        callback([]);
      }
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  } catch (e) {
    return () => {};
  }
};

/**
 * Realtime Database Food & Nutrition Database Synchronization
 */
export const saveFoodDatabaseToRealtimeDb = async (foods: any[]) => {
  if (!foods || !Array.isArray(foods)) return;
  if (db) {
    try {
      const foodsRef = ref(db, 'foodDatabase');
      const dataObj: Record<string, any> = {};
      foods.forEach(f => {
        if (f && f.id) dataObj[f.id] = f;
      });
      await set(foodsRef, dataObj);
    } catch (err) {
      console.warn('Realtime Database food database sync notice:', err);
    }
  }
};

export const saveSingleFoodToRealtimeDb = async (food: any) => {
  if (!food || !food.id) return;
  if (db) {
    try {
      const foodRef = ref(db, `foodDatabase/${food.id}`);
      await set(foodRef, food);
    } catch (err) {}
  }
};

export const deleteSingleFoodFromRealtimeDb = async (foodId: string) => {
  if (!foodId) return;
  if (db) {
    try {
      const foodRef = ref(db, `foodDatabase/${foodId}`);
      await remove(foodRef);
    } catch (err) {}
  }
};

export const listenToRealtimeFoods = (callback: (foods: any[]) => void) => {
  if (!db) return () => {};
  try {
    const foodsRef = ref(db, 'foodDatabase');
    const unsubscribe = onValue(foodsRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const list = Object.keys(val).map(key => ({ ...val[key], id: val[key].id || key }));
        callback(list);
      } else {
        callback([]);
      }
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  } catch (e) {
    return () => {};
  }
};

/**
 * Realtime Database CMS Synchronization
 */
export const saveCMSPagesToRealtimeDb = async (pages: any[]) => {
  if (!pages || !Array.isArray(pages)) return;
  if (db) {
    try {
      const pagesRef = ref(db, 'cmsPages');
      const dataObj: Record<string, any> = {};
      pages.forEach(p => {
        if (p && p.id) dataObj[p.id] = p;
      });
      await set(pagesRef, dataObj);
    } catch (err) {}
  }
};

export const listenToRealtimeCMSPages = (callback: (pages: any[]) => void) => {
  if (!db) return () => {};
  try {
    const pagesRef = ref(db, 'cmsPages');
    const unsubscribe = onValue(pagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const list = Object.keys(val).map(key => ({ ...val[key], id: val[key].id || key }));
        callback(list);
      } else {
        callback([]);
      }
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  } catch (e) {
    return () => {};
  }
};
