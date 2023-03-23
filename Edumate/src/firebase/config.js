// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdyJfiGYdKgREA9sjrEKbar38pLiKq6cg",
  authDomain: "edumate2023-d209f.firebaseapp.com",
  projectId: "edumate2023-d209f",
  storageBucket: "edumate2023-d209f.appspot.com",
  messagingSenderId: "850360430796",
  appId: "1:850360430796:web:6c6f8937718363bd2e5269",
  measurementId: "G-W79HJ33DX6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Initialize Firestore
export const db = getFirestore(app);
