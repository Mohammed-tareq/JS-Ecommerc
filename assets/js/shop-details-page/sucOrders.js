// sucOrders.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {getAnalytics} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";


const firebaseConfig = {
  apiKey: "AIzaSyBjRfUhrD8izFBizJxYvGS4PPoLjV5x6Mc",
  authDomain: "iti-e2.firebaseapp.com",
  projectId: "iti-e2",
  storageBucket: "iti-e2.firebasestorage.app",
  messagingSenderId: "394747800497",
  appId: "1:394747800497:web:46ffd532adfab5d7aa2b90"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

document.addEventListener("DOMContentLoaded", async () => {
  const email = localStorage.getItem("currentUserEmail");
  const ordersTable = document.getElementById("orders-table");

  if (!email || !ordersTable) return;

  try {
    const q = query(collection(db, "orders"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    let index = 1;
    querySnapshot.forEach((docSnap) => {
      const order = docSnap.data();
      const orderId = docSnap.id;
      const createdAt = new Date(order.createdAt?.seconds * 1000 || Date.now()).toLocaleDateString();
      const status = order.status || "Processing";
      const total = Object.values(order.items || {}).reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

      const row = document.createElement("tr");
      row.dataset.orderId = orderId;
      row.innerHTML = `
        <td>#${index++}</td>
        <td>${createdAt}</td>
        <td>${status}</td>
        <td>$${total}</td>
        <td><a href="#" class="view-order">View</a></td>
      `;
      ordersTable.appendChild(row);
    });
  } catch (err) {
    console.error("Failed to fetch orders:", err);
  }
});

// View Order Details Logic
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("view-order")) {
    e.preventDefault();

    const row = e.target.closest("tr");
    const orderId = row.dataset.orderId;

    let detailsRow = row.nextElementSibling;
    if (detailsRow && detailsRow.classList.contains("order-details-row")) {
      detailsRow.remove();
      return;
    }

    try {
      const orderRef = doc(db, "orders", orderId);
      const orderSnap = await getDoc(orderRef);
      const orderData = orderSnap.data();
      const items = orderData.items || {};

      let detailsHTML = `<td colspan="5"><div class="order-details">`;
      for (const [key, item] of Object.entries(items)) {
        detailsHTML += `
          <div class="order-item">
            <img src="${item.imageUrl}" alt="${item.title}" class="order-item-img">
            <div>
              <p><strong>${item.title}</strong></p>
              <p>Price: $${item.price}</p>
              <p>Quantity: ${item.quantity}</p>
            </div>
          </div>
          <hr>
        `;
      }
      detailsHTML += `</div></td>`;

      detailsRow = document.createElement("tr");
      detailsRow.classList.add("order-details-row");
      detailsRow.innerHTML = detailsHTML;
      row.parentNode.insertBefore(detailsRow, row.nextSibling);
    } catch (err) {
      console.error("Error fetching order details:", err);
    }
  }
});
