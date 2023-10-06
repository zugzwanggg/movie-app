import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth } from 'firebase/auth'



const firebaseConfig = {
  apiKey: "AIzaSyBH4a0gnqJfey6IAPoqyRaSU5eZOzQH914",
  authDomain: "movie-app-30bae.firebaseapp.com",
  projectId: "movie-app-30bae",
  storageBucket: "movie-app-30bae.appspot.com",
  messagingSenderId: "1041522453263",
  appId: "1:1041522453263:web:ac8b9322e73b0651ea6c7a",
  measurementId: "G-SB2MSQVDKM"
};



const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)