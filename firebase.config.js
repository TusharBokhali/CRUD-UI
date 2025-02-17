// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApIt3BsOE53SeCbb65QsL8ZYiomajRlK0",
  authDomain: "reels-demo-a9f25.firebaseapp.com",
  projectId: "reels-demo-a9f25",
  storageBucket: "reels-demo-a9f25.firebasestorage.app",
  messagingSenderId: "356223715807",
  appId: "1:356223715807:web:f499877676a925ad185c6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export default db;