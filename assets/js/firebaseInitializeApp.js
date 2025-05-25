//firebase initializeApp.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvgAkeEr6ai2yZIsX8z90zdtkHAWiSFPA",
  authDomain: "iti-e-commerce-47ba6.firebaseapp.com",
  projectId: "iti-e-commerce-47ba6",
  storageBucket: "iti-e-commerce-47ba6.firebasestorage.app",
  messagingSenderId: "719185540860",
  appId: "1:719185540860:web:77a8c68b749823f0e24979"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export {app}
const db = getFirestore(app);

// Export `app` and `db`
export { app, db };

//page1
