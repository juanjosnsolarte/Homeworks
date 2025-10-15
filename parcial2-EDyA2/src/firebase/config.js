// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgg4t1B63WDhbpGj_t4cpW7jZi2GbJVOY",
  authDomain: "parcial2-edya2.firebaseapp.com",
  projectId: "parcial2-edya2",
  storageBucket: "parcial2-edya2.firebasestorage.app",
  messagingSenderId: "438866849341",
  appId: "1:438866849341:web:aff1d725bb5011664b8454",
  measurementId: "G-175CPZHKRL"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(FirebaseApp);
export const db = getFirestore(FirebaseApp); 