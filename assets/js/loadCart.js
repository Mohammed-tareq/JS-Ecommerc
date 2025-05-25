import { doc, getDoc, db } from "./firebaseFirestore.js";

document.addEventListener("DOMContentLoaded", async () => {
  const userEmail = localStorage.getItem("currentUserEmail");
  if (!userEmail) {
    console.warn("User not logged in.");
    return;
  }

  const cartRef = doc(db, "cart", userEmail);
  const cartSnap = await getDoc(cartRef);

  if (!cartSnap.exists()) {
    console.warn("No cart found for user.");
    return;
  }

  const cartItems = cartSnap.data().items || {};
  const tableBody = document.querySelector("table.table");
  tableBody.innerHTML = `
    <tr>
      <th>Image</th>
      <th>Name</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Subtotal</th>
      <th>Remove</th>
    </tr>
  `;

  let subtotal = 0;
  Object.keys(cartItems).forEach((productId) => {
    const item = cartItems[productId];
    const totalPrice = item.price * item.quantity;
    subtotal += totalPrice;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${item.imageUrl}" alt="${item.title}" class="table-img"></td>
      <td>
        <h3 class="table-title">${item.title}</h3>
        <p class="table-description">ID: ${productId}</p>
      </td>
      <td><span class="table-price">$${item.price}</span></td>
      <td><input type="number" value="${item.quantity}" class="quantity" disabled></td>
      <td><span class="table-subtotal">$${totalPrice.toFixed(2)}</span></td>
      <td><i class="fi fi-rs-trash table-trash" data-id="${productId}"></i></td>
    `;
    tableBody.appendChild(row);
  });

  // Shipping rate handling
  const subtotalElem = document.getElementById("cartSubtotal");
  const shippingElem = document.getElementById("shippingCost");
  const totalElem = document.getElementById("cartTotal");

  const shippingRates = {
    "Cairo": 40,
    "Alex": 80,
    "Giza": 55,
    "Lower Egypt": 100
  };

  function updateTotals(selectedCity) {
    const shipping = shippingRates[selectedCity] || 0;
    subtotalElem.textContent = `$${subtotal.toFixed(2)}`;
    shippingElem.textContent = `$${shipping.toFixed(2)}`;
    totalElem.textContent = `$${(subtotal + shipping).toFixed(2)}`;
  }

  const defaultCity = document.getElementById("citySelect").value;
  updateTotals(defaultCity);

  document.getElementById("shippingForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const city = document.getElementById("citySelect").value;
    updateTotals(city);
  });
});
