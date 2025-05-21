
"use strict"

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-analytics.js";
import { getAuth , onAuthStateChanged ,createUserWithEmailAndPassword , signInWithEmailAndPassword , signOut , GoogleAuthProvider ,signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";

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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


//============================signup =========================

const name = document.getElementById("name");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const confirmPassword = document.getElementById("confirmPassword");
const registerBtn = document.getElementById("registerBtn");
const googleSignUp = document.getElementById("googleSignUp");



// =====================================login ==========================

const email = document.getElementById("email");
const password = document.getElementById("password");
const logSubmit = document.getElementById("logSubmit");

const googleLog = document.getElementById("googleLog");


// =====================================log Out ==========================

const logOutBtn = document.getElementById("logOutBtn");
//=========================== onclick event  ======================================

if (registerBtn) {
    registerBtn.addEventListener("click", createUserSignup);
}
if (logSubmit) {
    logSubmit.addEventListener("click", loginUser);
}
if (logOutBtn) {
    logOutBtn.addEventListener("click", logOut);
}
if (googleLog) {
    googleLog.addEventListener("click", loginWithGoogle);
}
if (googleSignUp) {
    googleSignUp.addEventListener("click", loginWithGoogle);
}

//========================check user status======================================


onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "../index.html";
    }

    else if (user.email !== "admin@admin.com") {
        window.location.href = "../index.html";
    }

    else {
        console.log("Admin logged in:", user.email);
    }
});

//================ createUserWithEmailAndPassword==========================

function createUserSignup(e){
    e.preventDefault();

    createUserWithEmailAndPassword(auth, registerEmail.value, registerPassword.value)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("user => " , user.email);
            alert("Creating Account");
            window.location.href = "index.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });

    name.value = "";
    registerEmail.value = "";
    registerPassword.value = "";
    confirmPassword.value = "";
}


//===============================login==================================

function loginUser(e){
    e.preventDefault();

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("user =>", user.email);
            if (user.email === "admin@admin.com") {
                window.location.href = "admin/admin.html";
            } else {
                window.location.href = "index.html";
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });

    email.value = "";
    password.value = "";
}

// ============================Google login===========================


function loginWithGoogle(e){
    e.preventDefault();

    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            alert("Google Sign-In successful: " + user.email);
            window.location.href = "index.html";
        }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });

}
//===============================logOut==================================

function logOut(e){
    e.preventDefault();

    signOut(auth).then(() => {
        console.log("Logging Out");
        alert("Logging Out");
    }).catch((error) => {
        console.log(error);
    });
}


export { auth, onAuthStateChanged };
//===========================================================================


window.addEventListener("DOMContentLoaded", () => {
    const myAccountLink = document.getElementById("myAccount");
    const loggedIn = document.getElementById("loggedIn");
    const loggedOut = document.getElementById("logOutBtn");

    onAuthStateChanged(auth, (user) => {
        const myAccountLink = document.getElementById("myAccount");
        const loginLink = document.getElementById("loggedIn");
        const logoutLink = document.getElementById("logOutBtn");

        if (user) {
            // User is logged in
            if (myAccountLink) myAccountLink.style.display = "block";
            if (logoutLink) logoutLink.style.display = "block";
            if (loginLink) loginLink.style.display = "none";
        } else {
            // User is logged out
            if (myAccountLink) myAccountLink.style.display = "none";
            if (logoutLink) logoutLink.style.display = "none";
            if (loginLink) loginLink.style.display = "block";
        }
    });
});

   