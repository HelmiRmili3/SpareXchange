// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyN-qhJrq3rztyxiRGLk4l9KP9KC2ADNs",
  authDomain: "sparexchange-323c8.firebaseapp.com",
  databaseURL:
    "https://sparexchange-323c8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sparexchange-323c8",
  storageBucket: "sparexchange-323c8.firebasestorage.app",
  messagingSenderId: "489377059750",
  appId: "1:489377059750:web:da633a2da0b774d3cc7567",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export Firebase services
export {
  db,
  auth,
  storage,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
};
