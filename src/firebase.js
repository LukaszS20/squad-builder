// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPTQWE_1MO-eDF8cYgMRPMngI7TW2mcjU",
  authDomain: "squad-builder-ed18e.firebaseapp.com",
  projectId: "squad-builder-ed18e",
  storageBucket: "squad-builder-ed18e.firebasestorage.app",
  messagingSenderId: "162132655201",
  appId: "1:162132655201:web:2f47d5c3682d4df5d63e20",
  measurementId: "G-YKYLHE1C7C"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { 
  db, 
  analytics, 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut 
};
export default app;