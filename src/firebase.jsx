import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAX3z3G-wcTuMlT7OVnvMO55g5uUKFCsPM",
  authDomain: "focus-sprint-86.firebaseapp.com",
  projectId: "focus-sprint-86",
  storageBucket: "focus-sprint-86.firebasestorage.app",
  messagingSenderId: "1048796797350",
  appId: "1:1048796797350:web:09a60c4221c273ab5c5767",
  measurementId: "G-HRB17J1880",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

const analytics = getAnalytics(app);
