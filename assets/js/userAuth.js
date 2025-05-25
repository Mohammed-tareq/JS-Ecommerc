
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";






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
  if (user) {
    console.log(user.email, "is logged in");
    localStorage.setItem("authenticatedUserId", user.uid);
    localStorage.setItem("currentUserEmail", user.email);
  } else {
    console.log("user is logged out");
    localStorage.removeItem("authenticatedUserId");
    localStorage.removeItem("currentUserEmail");
  }
});


//================ createUserWithEmailAndPassword==========================

function createUserSignup(e) {
  e.preventDefault();

  createUserWithEmailAndPassword(
    auth,
    registerEmail.value,
    registerPassword.value
  )
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log("user => ", user.email);
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

function loginUser(e) {
  e.preventDefault();

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("user =>", user.email);
      if (user.email === "admin@admin.com") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "index.html";
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alert(`Error logging in: ${errorMessage}`);
    });

  email.value = "";
  password.value = "";
}

// ============================Google login===========================

function loginWithGoogle(e) {
  e.preventDefault();

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      alert("Google Sign-In successful: " + user.email);
      window.location.href = "index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}
//===============================logOut==================================

function logOut(e) {
  e.preventDefault();

  signOut(auth)
    .then(() => {
      console.log("Logging Out");
      alert("Logging Out");
    })
    .catch((error) => {
      console.log(error);
    });
}

export { auth, onAuthStateChanged };
//===========================================================================
