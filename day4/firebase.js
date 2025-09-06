// firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9ZTFTWSRLGLF5yVmFFO4OvIQmazbkgaY",
  authDomain: "reactauth-8782c.firebaseapp.com",
  projectId: "reactauth-8782c",
  storageBucket: "reactauth-8782c.firebasestorage.app",
  messagingSenderId: "625318071926",
  appId: "1:625318071926:web:603d7b8377a0866bbd5957",
  measurementId: "G-1GVSX4E4E4",
};

// Avoid re-initializing
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
