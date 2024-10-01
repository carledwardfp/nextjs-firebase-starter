// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./config";
// Firestore (optional): uncomment the next line if you want to create a database for your users
// import { getFirestore } from "firebase/firestore";

// Initialize Firebase
export const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0];
export const auth = getAuth(app);
// Firestore (optional): uncomment the next line if you want to create a database for your users/
// export const db = getFirestore(app);
