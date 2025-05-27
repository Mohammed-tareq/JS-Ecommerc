//
//
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
// import {
//   getAnalytics,
//   getFirestore,
//   collection,
//   getDocs,
//   doc,
//   getDoc,
//   limit,
//   query,
//   where,
//   startAfter,
//   setDoc,
//   orderBy,
//   getCountFromServer
// } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
// import { addDoc } from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js';
//
//
// const firebaseConfig = {
//   apiKey: "AIzaSyBjRfUhrD8izFBizJxYvGS4PPoLjV5x6Mc",
//   authDomain: "iti-e2.firebaseapp.com",
//   projectId: "iti-e2",
//   storageBucket: "iti-e2.firebasestorage.app",
//   messagingSenderId: "394747800497",
//   appId: "1:394747800497:web:46ffd532adfab5d7aa2b90"
// };
//
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
//
//
//
// // Initialize Cloud Firestore and get a reference to the service
// const db = getFirestore(app);
//
// export { db, collection, addDoc, getDocs, limit, query, startAfter, doc, getDoc, where, setDoc, orderBy, app, getCountFromServer }
//
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  limit,
  query,
  where,
  startAfter,
  setDoc,
  orderBy,
  getCountFromServer,
  addDoc,
    deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

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
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

export {
  db,
  collection,
  addDoc,
  getDocs,
  limit,
  query,
  startAfter,
  doc,
  getDoc,
  where,
  setDoc,
  orderBy,
  app,
  getCountFromServer,
  firebaseConfig,
  deleteDoc
};
