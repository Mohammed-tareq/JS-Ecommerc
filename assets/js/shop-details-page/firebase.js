// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
    apiKey: "AIzaSyBjRfUhrD8izFBizJxYvGS4PPoLjV5x6Mc",
    authDomain: "iti-e2.firebaseapp.com",
    projectId: "iti-e2",
    storageBucket: "iti-e2.firebasestorage.app",
    messagingSenderId: "394747800497",
    appId: "1:394747800497:web:46ffd532adfab5d7aa2b90"
  };




// Initialize Firebase
const app = initializeApp(firebaseConfig);


import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  limit,
  query,
  where,
  startAfter,
  setDoc,
  orderBy,
  getCountFromServer
} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, limit, query, startAfter, doc, getDoc, where, setDoc, orderBy, app, getCountFromServer, firebaseConfig }

