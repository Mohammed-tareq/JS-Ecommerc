
import {app, analytics} from "../adminJs/dataconfig.js";
import {getFirestore, collection, getDocs, doc ,deleteDoc} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";


const db = getFirestore(app);
let categoryCollection = collection(db, "categories");

let categoryContent = document.getElementById("categoryContent");

    async function getCategories() {

    try {
        let querySnapshot = await getDocs(categoryCollection);
        let category = '';


            querySnapshot.forEach((doc) => {
                const data = doc.data();
                category += ` 
                    <a href="shop.html" class="category-item swiper-slide">
                        <img src="${data.img}">
                        <h3 class="category-title">${data.name}</h3>
                    </a>
               `;
            })
        categoryContent.innerHTML = category;


    } catch (e) {
        console.error("Error getting documents in category: ", e);
    }
}

getCategories();