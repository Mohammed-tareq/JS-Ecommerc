window.checkout = async function () {
  const userEmail = localStorage.getItem("currentUserEmail");
    const cartKey = `cart_${userEmail}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || {};

    const cartArray = Object.values(cart);
    if (cartArray.length === 0) return alert("Cart is empty");

    // Get shipping details
    const city = document.getElementById("citySelect")?.value || "Unknown City";
    const zip = document.querySelector('input[placeholder="PostCode / ZIP"]')?.value || "00000";

    // Calculate total
    const subtotal = cartArray.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 40 : 0;
    const total = subtotal + shipping;

    const response = await fetch("https://adel.dev/scripts/stripe.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: total.toFixed(2),
        name: "Eva-Shop",
       secretKey: "sk_test_51RPrHHH48QZxOjj9m0d3VgziDynMUFdIX6UTgHkles1EsSQN8kb8tN9Pi5xRzz1dta0gmY0XRvUqEIRf4gpzRAJk00zALmjBhn",
        onSuccess: "http://127.0.0.1:5501/success.html",
        onCancel: "http://127.0.0.1:5501/success.html",
        shipping: {
          city: city,
          zip: zip
        }
      }),
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Stripe error: " + data.error);
    }

};


// window.checkout = async function () {
//   const userEmail = localStorage.getItem("currentUserEmail");
//   const cartKey = `cart_${userEmail}`;
//   const cart = JSON.parse(localStorage.getItem(cartKey)) || {};
//
//   const cartArray = Object.values(cart);
//   if (cartArray.length === 0) return alert("Cart is empty");
//
//   // Get shipping details
//   const city = document.getElementById("citySelect")?.value || "Unknown City";
//   const zip = document.querySelector('input[placeholder="PostCode / ZIP"]')?.value || "00000";
//
//   // Calculate total
//   const subtotal = cartArray.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const shipping = subtotal > 0 ? 40 : 0;
//   const total = subtotal + shipping;
//
//   try {
//     const response = await fetch("https://adel.dev/scripts/stripe.php", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         amount: total.toFixed(2),
//         name: "Eva-Shop",
//         secretKey: "sk_test_51RPrHHH48QZxOjj9m0d3VgziDynMUFdIX6UTgHkles1EsSQN8kb8tN9Pi5xRzz1dta0gmY0XRvUqEIRf4gpzRAJk00zALmjBhn",
//         onSuccess: "http://127.0.0.1:5501/success.html",
//         onCancel: "http://127.0.0.1:5501/cancel.html",
//         shipping: {
//           city: city,
//           zip: zip
//         }
//       }),
//     });
//
//     const data = await response.json();
//     console.log("Stripe response:", data);
//
//     if (data.url) {
//       window.location.href = data.url;
//     } else {
//       alert("Stripe error: " + (data.error || "Unknown error"));
//       window.location.href = "http://127.0.0.1:5501/cancel.html";
//     }
//   } catch (error) {
//     alert("Network or server error: " + error.message);
//     window.location.href = "http://127.0.0.1:5501/cancel.html";
//   }
// };
