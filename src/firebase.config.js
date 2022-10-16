// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyADCib2cCnY8XgOcIf0OAPq7V69kPUTeXU",
    authDomain: "jekyll-os-ea687.firebaseapp.com",
    projectId: "jekyll-os-ea687",
    storageBucket: "jekyll-os-ea687.appspot.com",
    messagingSenderId: "1018924113458",
    appId: "1:1018924113458:web:8e8cd46834f408f545262b"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { db, auth };