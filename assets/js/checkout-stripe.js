window.checkout = async function () {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) return alert("Cart is empty");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  //// ======================  api stripe ======================

  const data = await response.json();
  if (data.url) {
    window.location.href = data.url;
  } else {
    alert("Stripe error: " + data.error);
  }
};
