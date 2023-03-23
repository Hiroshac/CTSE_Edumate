// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDqI0Rn7Ti9yz5ULnffRnnInas1uRZ5CNw',
  authDomain: 'edumate-c06a6.firebaseapp.com',
  projectId: 'edumate-c06a6',
  storageBucket: 'edumate-c06a6.appspot.com',
  messagingSenderId: '769885791348',
  appId: '1:769885791348:web:35d39d9e74da94ee9f1d21',
  measurementId: 'G-JWMVFCL8YG',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const storage = getStorage(app)