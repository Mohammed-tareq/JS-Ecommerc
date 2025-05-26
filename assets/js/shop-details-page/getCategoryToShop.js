<<<<<<< HEAD
import { fetchOnePage } from "./shop.js";

function getCategory() {
    let category = window.location.href.split('?')[1].split('=')[1];
    if (category) {
        fetchOnePage(category);
        // console.log(category);
=======
const categories = document.getElementsByClassName('category-title');


function getCategory() {
    for (let i = 0; i < categories.length; i++) {
        categories[i].addEventListener('click', function (e) {
            let category = e.target.id;
            window.location.href = `shop.html?category=${category}`;
        })
>>>>>>> karim
    }
}


<<<<<<< HEAD


getCategory()

=======
getCategory()
>>>>>>> karim
