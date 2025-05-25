document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let subtotal = 0;

    cart.forEach(item => {
      subtotal += item.price * item.quantity;
    });

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