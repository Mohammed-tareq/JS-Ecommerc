// window.checkout = async function () {
//   const cart = JSON.parse(localStorage.getItem("cart")) || [];
//   if (cart.length === 0) return alert("Cart is empty");

//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const response = await fetch("https://adel.dev/scripts/stripe.php", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       amount: total,
//       name: "Eva-Shop",
//       secertKey: "sk_test_51RPrHHH48QZxOjj9m0d3VgziDynMUFdIX6UTgHkles1EsSQN8kb8tN9Pi5xRzz1dta0gmY0XRvUqEIRf4gpzRAJk00zALmjBhn",
//       onSuccess: "http://127.0.0.1:5500/success.html",
//       onCancel: "http://127.0.0.1:5500/cart.html"
//     }),
//   });

//   const data = await response.json();
//   if (data.url) {
//     window.location.href = data.url;
//   } else {
//     alert("Stripe error: " + data.error);
//   }
// };
