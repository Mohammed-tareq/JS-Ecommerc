
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyBvgAkeEr6ai2yZIsX8z90zdtkHAWiSFPA",
    authDomain: "iti-e-commerce-47ba6.firebaseapp.com",
    projectId: "iti-e-commerce-47ba6",
    storageBucket: "iti-e-commerce-47ba6.firebasestorage.app",
    messagingSenderId: "719185540860",
    appId: "1:719185540860:web:77a8c68b749823f0e24979"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export {app, analytics};