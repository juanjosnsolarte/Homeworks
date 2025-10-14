// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8aEviZ9VsvwmJ9jMHrGePm2rEwucI-K8",
  authDomain: "juanjoproyecto-d537e.firebaseapp.com",
  projectId: "juanjoproyecto-d537e",
  storageBucket: "juanjoproyecto-d537e.firebasestorage.app",
  messagingSenderId: "669871316203",
  appId: "1:669871316203:web:f846d6042da45b52e2b2ae",
  measurementId: "G-0EP49R554J"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(FirebaseApp);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(FirebaseApp);     
export const rtdb = getDatabase(FirebaseApp);