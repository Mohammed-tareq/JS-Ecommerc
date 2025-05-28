import { addToCart } from "./addtocart.js";
import { doc, getDoc, db } from "./firebase.js";
import { getRelatedProducts } from "./getRelatedProducts.js";
import { setDataToDetailsItem } from "./setDataToDetailsItem.js";

function getDetailsOfProduct() {
  let queryString = window.location.search;
  let id = queryString.split("=")[1];

  fetchOneProduct(id);
}

// async function fetchOneProduct(id) {
//     const docRef = doc(db, "products", id);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//         getRelatedProducts(docSnap.data());
//         setDataToDetailsItem(docSnap.data());
//         handleClickCartBtn(docSnap.data(), docSnap.id);
//     } else {
//         console.log("No such document!");
//     }
// }

async function fetchOneProduct(id) {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const productData = docSnap.data();

    getRelatedProducts(productData);
    setDataToDetailsItem(productData, docSnap.id);
    handleClickCartBtn(id, {
      title: productData.title,
      price: productData.price,
      imageUrl: productData.img1,
    });
  } else {
    console.log("No such document!");
  }
}

getDetailsOfProduct();

function handleClickCartBtn(productId, productData) {
  const cartBtn = document.getElementById("cartBtn");
  if (!cartBtn) {
    console.warn("No Add to Cart button found in details.html");
    return;
  }

  cartBtn.addEventListener("click", () => {
    addToCart(productId, productData);
  });
}

export { getDetailsOfProduct };
