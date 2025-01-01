// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'notion-clone-7f657.firebaseapp.com',
  projectId: 'notion-clone-7f657',
  storageBucket: 'notion-clone-7f657.firebasestorage.app',
  messagingSenderId: '1016605785664',
  appId: '1:1016605785664:web:6e32dffe21de4964c4a9a5',
  measurementId: 'G-P7VYVZMWYZ',
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
