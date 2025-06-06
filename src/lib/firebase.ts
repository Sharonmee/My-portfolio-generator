import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider, browserLocalPersistence } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Configure auth
const auth = getAuth(app);
auth.useDeviceLanguage();

// Configure GitHub provider
const githubProvider = new GithubAuthProvider();

// Set persistence to LOCAL to maintain session
auth.setPersistence(browserLocalPersistence);

export { app, auth, githubProvider };
