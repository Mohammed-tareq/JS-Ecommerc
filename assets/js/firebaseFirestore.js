import { app } from "./firebaseInitializeApp.js";
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
    orderBy
} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, limit, query, startAfter, doc, getDoc, where, setDoc, orderBy }

