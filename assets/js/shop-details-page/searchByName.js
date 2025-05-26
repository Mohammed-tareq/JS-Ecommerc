import { collection, query, where, getDocs, db } from "./firebase.js";
import { fetchOnePage } from "./shop.js";
import { productsContainer, setDataToProductItem } from "./setDataToProductItem.js";
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', handleChange)



export async function handleChange() {
    let value = searchInput.value.trim();
    console.log(value);

    try {
        const q = query(collection(db, "products"), where("title", "==", value));
        const querySnapshot = await getDocs(q);
        if (value) {
            querySnapshot.forEach((doc) => {
                let productId = doc.id;
                setDataToProductItem(doc.data(), productId)
            });
        } else {
            productsContainer.innerHTML = '';
            fetchOnePage();
        }
    } catch (error) {
        console.log(error);
    }

}