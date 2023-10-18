import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqMFq0QTVLYvETBS7gV4drrJbSjy8aWaY",
  authDomain: "house-marketplace-app-f0e0d.firebaseapp.com",
  projectId: "house-marketplace-app-f0e0d",
  storageBucket: "house-marketplace-app-f0e0d.appspot.com",
  messagingSenderId: "167910702944",
  appId: "1:167910702944:web:903a6a325e7b326cb0e805",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
