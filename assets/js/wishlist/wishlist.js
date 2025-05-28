import { addToCart } from "../shop-details-page/addtocart.js";
import {
  doc,
  setDoc,
  deleteDoc,
  db,
  collection,
  query,
  where,
  getDocs,
} from "../shop-details-page/firebase.js";

document.addEventListener("click", async (e) => {
  if (e.target.closest(".details-action-btn")) {
    e.preventDefault();

    const btn = e.target.closest(".details-action-btn");
    const productId = btn.getAttribute("data-product-id");

    const productData = getCurrentProductData(productId);
    if (!productData) return;

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isDuplicate = existing.some(
      (item) => item.productId === productData.productId
    );
    if (!isDuplicate) {
      const updated = [...existing, productData];
      localStorage.setItem("wishlist", JSON.stringify(updated));
    }

    // Save to Firestore
    const userEmail = localStorage.getItem("currentUserEmail");
    if (userEmail) {
      const docRef = doc(
        db,
        "wishlist",
        `${userEmail}_${productData.productId}`
      );
      await setDoc(docRef, {
        ...productData,
        userEmail,
        addedAt: new Date().toISOString(),
      });
    }

    renderWishlistRow(productData);
  }
});

function getCurrentProductData(productId) {
  const container = document.getElementById("main-details");
  if (!container) return null;

  return {
    productId,
    title: container.querySelector(".details-title")?.innerText || "",
    price:
      container.querySelector(".new-price")?.innerText?.replace("$", "") || "0",
    oldPrice:
      container.querySelector(".old-price")?.innerText?.replace("$", "") || "0",
    badge: container.querySelector(".save-price")?.innerText || "",
    description: container.querySelector(".short-description")?.innerText || "",
    brand: container.querySelector(".details-brand span")?.innerText || "",
    policy: container.querySelector(".details-policy")?.innerText || "",
    img1: container.querySelector(".details-img")?.src || "",
    count: parseInt(
      container
        .querySelector(".details-meta li:last-child")
        ?.innerText.match(/\d+/)?.[0] || "0"
    ),
  };
}

function renderWishlistRow(product) {
  const tableBody = document.querySelector(".table tbody");
  if (!tableBody || !product) return;

  const row = document.createElement("tr");
  row.innerHTML = `
    <td><img src="${product.img1}" alt="" class="table-img"></td>
    <td>
      <h3 class="table-title">${product.title}</h3>
      <p class="table-description">${product.description}</p>
    </td>
    <td><span class="table-price">$${product.price}</span></td>
    <td><span class="table-stock">${
      product.count > 0 ? "In stock" : "Out of stock"
    }</span></td>
    <td><a href="#" class="btn btn-sm add-to-cart-btn">Add to Cart</a></td>
    <td><i class="fi fi-rs-trash table-trash" style="cursor: pointer;"></i></td>
  `;
  const deleteBtn = row.querySelector(".table-trash");
  deleteBtn.addEventListener("click", () => {
    deleteWishlistItem(product.productId);
    row.remove();
  });
  const addToCartBtn = row.querySelector(".add-to-cart-btn");
  addToCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addToCart(product.productId, {
      title: product.title,
      price: product.price,
      imageUrl: product.img1,
    });
  });
  tableBody.appendChild(row);
}

async function deleteWishlistItem(productId) {
  // Remove from localStorage
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const updatedWishlist = wishlist.filter(
    (item) => item.productId !== productId
  );
  localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

  //Remove from Firestore
  const userEmail = localStorage.getItem("currentUserEmail");
  if (!userEmail) return;

  try {
    const docRef = doc(db, "wishlist", `${userEmail}_${productId}`);
    await deleteDoc(docRef);
    console.log(`Deleted ${productId} from Firestore`);
  } catch (error) {
    console.error("Error deleting wishlist item from Firestore:", error);
  }
}

async function loadWishlistOnPageLoad() {
  const userEmail = localStorage.getItem("currentUserEmail");

  if (userEmail) {
    const q = query(
      collection(db, "wishlist"),
      where("userEmail", "==", userEmail)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      renderWishlistRow(doc.data());
    });
  } else {
    const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlistItems.forEach((item) => {
      renderWishlistRow(item);
    });
  }
}

// function handleClickCartBtn(productId, productData) {
//   const cartBtn = document.getElementById("cartBtn");
//   if (!cartBtn) {
//     console.warn("No Add to Cart button found in details.html");
//     return;
//   }

//   cartBtn.addEventListener("click", () => {
//     addToCart(productId, productData);
//   });
// }
document.addEventListener("DOMContentLoaded", loadWishlistOnPageLoad);
