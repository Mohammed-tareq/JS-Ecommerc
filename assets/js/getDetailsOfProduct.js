//getDetailsOfProduct.js
import { doc, getDoc, db } from "./firebaseFirestore.js";
import { getRelatedProducts } from "./getRelatedProducts.js";
import { setDataToDetailsItem } from "./setDataToDetailsItem.js";
import { addToCart } from "./addToCart.js";

function getDetailsOfProduct() {
  let queryString = window.location.search;
  let id = queryString.split("=")[1];
  fetchOneProduct(id);
}

async function fetchOneProduct(id) {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const productData = docSnap.data(); // Get product data here
    setDataToDetailsItem(productData); // Pass data for rendering main details
    getRelatedProducts(productData); // Pass data for rendering related products

    // --- NEW: Add to Cart functionality for the details page ---
    const addToCartBtn = document.querySelector(".details-action .btn-sm"); // Assuming this is your "ADD TO CART" button
    const quantityInput = document.querySelector(".details-action .quantity"); // Assuming you have a quantity input field

    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default form submission if it's in a form
        const quantity = parseInt(quantityInput.value, 10) || 1; // Get quantity from input, default to 1
        addToCart(id, productData, quantity); // Call addToCart
      });
    }
    // --- END NEW ---
  } else {
    console.log("No such document!");
  }
}

getDetailsOfProduct();

export { getDetailsOfProduct };
