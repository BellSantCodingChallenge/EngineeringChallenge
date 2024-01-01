// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBaCtwzND_8Ky0jj3nAr89NmAWoY5iwzYo',
  authDomain: 'bell-sant-coding-challenge.firebaseapp.com',
  projectId: 'bell-sant-coding-challenge',
  storageBucket: 'bell-sant-coding-challenge.appspot.com',
  messagingSenderId: '525222292110',
  appId: '1:525222292110:web:7a6bfada5d2bac6d8277df',
  measurementId: 'G-6B21DJ0G37', // For Firebase JS SDK v7.20.0 and later, measurementId is optional
};

// Initialize the Firebase app if necessary
let app;
if (!app) {
  app = initializeApp(firebaseConfig);
}

// Initialize Firebase auth if necessary
let auth;
if (!auth) {
  auth = getAuth(app);
}

export { app, auth };