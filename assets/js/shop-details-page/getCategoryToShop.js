import { fetchOnePage } from "./shop.js";

function getCategory() {
    let category = window.location.href.split('?')[1].split('=')[1];
    if (category) {
        fetchOnePage(category);
        // console.log(category);
    }
}




getCategory()

