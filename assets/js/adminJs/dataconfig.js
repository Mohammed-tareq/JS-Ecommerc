
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
    apiKey: "AIzaSyB1u8q8gL6jGZXs6lys4Pzd-C6E4XpMdWU",
    authDomain: "js-php-nc.firebaseapp.com",
    projectId: "js-php-nc",
    storageBucket: "js-php-nc.firebasestorage.app",
    messagingSenderId: "871514624564",
    appId: "1:871514624564:web:79bc38e5214fa0b1147061"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export {app, analytics};