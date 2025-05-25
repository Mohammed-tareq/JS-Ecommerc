// assets/js/payment-handler.js
import { db } from "./firebaseInitializeApp.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

window.addEventListener("DOMContentLoaded", async () => {
  if (window.location.pathname.includes("success.html")) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) return;

    const order = {
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, "successfulOrders"), order);
      localStorage.removeItem("cart");
      alert("✅ Order saved to Firebase!");
    } catch (err) {
      console.error("❌ Firebase error:", err);
    }
  }
});
