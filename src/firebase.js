// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

let app = null;
let auth = null;
let analytics = null;
let storage = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    storage = getStorage(app);

    // Analytics only works in browser contexts and may fail in unsupported environments
    if (typeof window !== "undefined") {
      try {
        analytics = getAnalytics(app);
      } catch (analyticsError) {
        console.warn("Firebase analytics unavailable:", analyticsError?.message || analyticsError);
      }
    }
  } catch (initError) {
    console.error("Firebase initialization failed:", initError);
    app = null;
    auth = null;
    analytics = null;
    storage = null;
  }
} else if (typeof window !== "undefined") {
  console.warn("Firebase configuration missing. Auth/storage/messaging features are disabled.");
}

// Debug: Log Firebase initialization status
if (typeof window !== "undefined" && isFirebaseConfigured && auth) {
  console.log("🔥 Firebase initialized:", {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    authInitialized: !!auth,
    storageInitialized: !!storage
  });

  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("🔐 Firebase user logged in:", {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName
      });
    } else {
      console.log("Firebase user logged out");
    }
  });
}

// Initialize messaging if supported
let messaging = null;
if (typeof window !== "undefined" && app) {
  isSupported().then((supported) => {
    if (supported) {
      messaging = getMessaging(app);
    }
  });
}

export { app, auth, storage, analytics, messaging, isFirebaseConfigured };
