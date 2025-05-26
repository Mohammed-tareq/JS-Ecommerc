import { addToCart } from "./addtocart.js";
import { doc, getDoc, db } from "./firebase.js";
import { getRelatedProducts } from "./getRelatedProducts.js";
import { setDataToDetailsItem } from "./setDataToDetailsItem.js";


function getDetailsOfProduct() {
    let queryString = window.location.search;
    let id = queryString.split('=')[1];

    fetchOneProduct(id)
}




async function fetchOneProduct(id) {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        getRelatedProducts(docSnap.data());
        setDataToDetailsItem(docSnap.data());
        handleClickCartBtn();
    } else {
        console.log("No such document!");
    }
}

getDetailsOfProduct();

export { getDetailsOfProduct }


function handleClickCartBtn(params) {
    const cartBtn = document.getElementById('cart-btn');
    cartBtn.addEventListener('click', addToCart)
}


