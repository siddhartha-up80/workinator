// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyARDDvCb6Q8_g2YKSUNG4lvxu_p5dXnfV8",
  authDomain: "workinator-6bb69.firebaseapp.com",
  projectId: "workinator-6bb69",
  storageBucket: "workinator-6bb69.appspot.com",
  messagingSenderId: "658201481241",
  appId: "1:658201481241:web:1e8d65797133b4697dda88",
  measurementId: "G-T72TRBQ780",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
