// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "brushpixel-546fa.firebaseapp.com",
  projectId: "brushpixel-546fa",
  storageBucket: "brushpixel-546fa.firebasestorage.app",
  messagingSenderId: "108126888239",
  appId: "1:108126888239:web:851fc4530bf87349c641da"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);