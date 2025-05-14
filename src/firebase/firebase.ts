// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUXA8m08FcZRDKf_r2_3c2VFruCa3ZGIc",
  authDomain: "e-commerce-app-e600c.firebaseapp.com",
  projectId: "e-commerce-app-e600c",
  storageBucket: "e-commerce-app-e600c.firebasestorage.app",
  messagingSenderId: "1037809725038",
  appId: "1:1037809725038:web:7ea3119751426dac84807f",
  measurementId: "G-10RS6LLH86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);