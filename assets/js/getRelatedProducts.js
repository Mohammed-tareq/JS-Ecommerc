//getrelatedProducts.js
import { collection, db, getDocs, limit, query, where } from "./firebaseFirestore.js";
import { setDataToRelatedProducts } from "./setDataToRelatedProducts.js";
import { addToCart } from "./addToCart.js";

async function getRelatedProducts({ category }) {
  let q = query(collection(db, 'products'), where("category", "==", category), limit(4));
  const documentSnapshots = await getDocs(q);
  const docs = documentSnapshots.docs;
  let relatedProductsContainer = document.getElementById("relatedProducts"); // Get container once
  relatedProductsContainer.innerHTML = ''; // Clear previous content

  docs.forEach(async docItem => { // Use async forEach to await getDoc if needed, though not strictly required here
    const productData = docItem.data();
    const productId = docItem.id;

    setDataToRelatedProducts(productData, productId); // This function now *adds* the HTML

    // --- NEW: Attach event listener to the newly added product item's cart button ---
    // Select the last added product item's cart button
    // This needs to be done *after* setDataToRelatedProducts has added the HTML
    const newProductItem = relatedProductsContainer.lastElementChild;
    if (newProductItem) {
      const cartBtn = newProductItem.querySelector(".cart-btn");
      if (cartBtn) {
        cartBtn.addEventListener("click", async (event) => {
          event.preventDefault(); // Prevent page refresh
          // The productData is already available from docItem.data()
          addToCart(productId, productData, 1); // Add with default quantity 1
        });
      }
    }
    // --- END NEW ---
  });
}


export { getRelatedProducts };