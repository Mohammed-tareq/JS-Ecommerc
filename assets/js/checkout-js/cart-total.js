document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem("authenticatedUserId") || "guest";
  const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || {};

  const tableBody = document.querySelector("table.table");
  let subtotal = 0;

  // Clear table (skip the first row — headers)
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

  Object.keys(cart).forEach(productId => {
    const item = cart[productId];
    const itemSubtotal = item.price * item.quantity;
    subtotal += itemSubtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${item.imageUrl || 'assets/img/default.jpg'}" class="table-img"></td>
      <td>
        <h3 class="table-title">${item.title}</h3>
        <p class="table-description">${item.description || ""}</p>
      </td>
      <td><span class="table-price">$${item.price}</span></td>
      <td><input type="number" value="${item.quantity}" class="quantity" data-id="${productId}"></td>
      <td><span class="table-subtotal">$${itemSubtotal.toFixed(2)}</span></td>
      <td><i class="fi fi-rs-trash table-trash" data-id="${productId}"></i></td>
    `;
    tableBody.appendChild(row);
  });

  const shipping = subtotal > 0 ? 40 : 0;
  const total = subtotal + shipping;

  document.getElementById("cartSubtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("shippingCost").textContent = `$${shipping.toFixed(2)}`;
  document.getElementById("cartTotal").textContent = `$${total.toFixed(2)}`;
});













  const userId = localStorage.getItem("authenticatedUserId") || "guest";
const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || {};
const tableBody = document.querySelector("table.table");
tableBody.innerHTML = "";

Object.keys(cart).forEach(productId => {
  const item = cart[productId];
  const row = document.createElement("tr");

  row.innerHTML = `
    <td><img src="${item.imageUrl || 'assets/img/default.jpg'}" class="table-img"></td>
    <td>
      <h3 class="table-title">${item.title}</h3>
      <p class="table-description">Quantity: ${item.quantity}</p>
    </td>
    <td><span class="table-price">$${item.price}</span></td>
    <td>${item.quantity}</td>
    <td>$${(item.price * item.quantity).toFixed(2)}</td>
    <td><i class="fi fi-rs-trash table-trash"></i></td>
  `;
  tableBody.appendChild(row);
});
