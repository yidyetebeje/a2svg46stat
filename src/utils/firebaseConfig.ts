// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD1PYqh9VwoT2p0uKlshH0Xx6PUChZvRRs",
    authDomain: "a2sv-7d07a.firebaseapp.com",
    projectId: "a2sv-7d07a",
    storageBucket: "a2sv-7d07a.appspot.com",
    messagingSenderId: "1072382331534",
    appId: "1:1072382331534:web:14f4618733e544147057df",
    measurementId: "G-ERY649THMB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);