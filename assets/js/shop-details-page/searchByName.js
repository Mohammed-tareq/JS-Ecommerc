import { collection, query, where, getDocs, db } from "./firebase.js";
import { fetchOnePage, currentPage } from "./shop.js";
import { productsContainer, setDataToProductItem } from "./setDataToProductItem.js";
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', handleChange)



export async function handleChange() {
    productsContainer.innerHTML = '';
    const value = searchInput.value.trim();

    try {
        console.log(value);
        if (value) {
            const q = query(collection(db, "products"), where("title", "==", value));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const productId = doc.id;
                const productHTML = setDataToProductItem(doc.data(), productId);
                productsContainer.innerHTML += productHTML;
            });
        } else {
            fetchOnePage();
        }
    } catch (error) {
        console.log(error);
    }
}
