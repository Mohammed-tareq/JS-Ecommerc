


import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";

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

export {app, analytics};