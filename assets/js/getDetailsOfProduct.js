import { doc, getDoc, db } from "./firebaseFirestore.js";
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
    } else {
        console.log("No such document!");
    }
}


getDetailsOfProduct();

export {getDetailsOfProduct}

