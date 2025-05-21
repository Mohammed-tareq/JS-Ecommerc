import { setDataToProductItem, productsContainer } from "./setDataToProductItem.js";
import { collection, getDocs, db, query, limit, startAfter } from "./firebaseFirestore.js";

const btnPagination = document.getElementsByClassName('btn-pagination');

let currentPage = 1;


for (let i = 0; i < btnPagination.length; i++) {
    btnPagination[i].addEventListener('click', function handlePagination(e) {
        const numOfPage = Number(e.target.parentElement.id);
        currentPage = numOfPage;
        fetchOnePage();
        setActivePaginationButton(numOfPage);
    })
}


let lastDoc;
async function fetchOnePage() {
    productsContainer.innerHTML = '';
    let q = query(collection(db, 'products'), limit(28));
    if (currentPage > 1) {
        q = query(collection(db, "products"), startAfter(lastDoc), limit(28));
    }
    const documentSnapshots = await getDocs(q);
    const docs = documentSnapshots.docs;
    lastDoc = docs[docs.length - 1];
    docs.forEach(doc => {
        let productId = doc.id;
        productsContainer.innerHTML += setDataToProductItem(doc.data(), productId);
    });


    // let cartBtns = document.getElementsByClassName('cart-btn');

    // for (let i = 0; i < cartBtns.length; i++) {
    //     cartBtns[i].addEventListener('click', () => {

    //     })

    // }
}

fetchOnePage();

function setActivePaginationButton(activeId) {
    for (let i = 0; i < btnPagination.length; i++) {
        btnPagination[i].classList.remove('active-page');
    }

    const activeBtn = document.getElementById(`${activeId}`);
    if (activeBtn) {
        activeBtn.classList.add('active-page');
    }
}




export { fetchOnePage, currentPage }



// import { db, collection, addDoc } from './firebaseFirestore.js'

// let products = [
//     {
//         "brand": "Adidas",
//         "policy": "Refundable",
//         "size": "XL",
//         "oldPrice": 70.91,
//         "badge": "Limited",
//         "category": "Clothing",
//         "title": "Fitness Tracker",
//         "price": 137.98,
//         "count": 28,
//         "description": "Durable and reliable for everyday use.",
//         "rating": 5
//     },
//     {
//         "brand": "Nike",
//         "policy": "Exchange only",
//         "size": "M",
//         "oldPrice": 80.99,
//         "badge": "Bestseller",
//         "category": "Shoes",
//         "title": "Fitness Tracker",
//         "price": 138.4,
//         "count": 5,
//         "description": "Perfect for training and casual wear.",
//         "rating": 1
//     },
//     {
//         "brand": "Reebok",
//         "policy": "Refundable",
//         "size": "XL",
//         "oldPrice": 107.13,
//         "badge": "Exclusive",
//         "category": "Gear",
//         "title": "Sports T-Shirt",
//         "price": 80.63,
//         "count": 97,
//         "description": "Lightweight and comfortable.",
//         "rating": 3
//     },
//     {
//         "brand": "Adidas",
//         "policy": "30-day return",
//         "size": "XL",
//         "oldPrice": 122.94,
//         "badge": "Limited",
//         "category": "Clothing",
//         "title": "Gym Bag",
//         "price": 135.66,
//         "count": 24,
//         "description": "Lightweight and comfortable.",
//         "rating": 1
//     },
//     {
//         "brand": "Adidas",
//         "policy": "Refundable",
//         "size": "M",
//         "oldPrice": 141.26,
//         "badge": "Bestseller",
//         "category": "Gear",
//         "title": "Sneakers",
//         "price": 127.91,
//         "count": 51,
//         "description": "Perfect for training and casual wear.",
//         "rating": 2
//     },
//     {
//         "brand": "Puma",
//         "policy": "No return",
//         "size": "L",
//         "oldPrice": 55.17,
//         "badge": "New",
//         "category": "Shoes",
//         "title": "Gym Bag",
//         "price": 107.22,
//         "count": 42,
//         "description": "Perfect for training and casual wear.",
//         "rating": 5
//     },
//     {
//         "brand": "Under Armour",
//         "policy": "30-day return",
//         "size": "M",
//         "oldPrice": 85.78,
//         "badge": "Exclusive",
//         "category": "Shoes",
//         "title": "Sneakers",
//         "price": 95.68,
//         "count": 7,
//         "description": "High-quality product with modern design.",
//         "rating": 5
//     },
//     {
//         "brand": "Under Armour",
//         "policy": "30-day return",
//         "size": "L",
//         "oldPrice": 176.73,
//         "badge": "New",
//         "category": "Clothing",
//         "title": "Sneakers",
//         "price": 43.06,
//         "count": 29,
//         "description": "Perfect for training and casual wear.",
//         "rating": 5
//     },
//     {
//         "brand": "Reebok",
//         "policy": "30-day return",
//         "size": "L",
//         "oldPrice": 168.48,
//         "badge": "New",
//         "category": "Clothing",
//         "title": "Running Shoes",
//         "price": 120.7,
//         "count": 99,
//         "description": "Top-rated item by customers.",
//         "rating": 1
//     },
//     {
//         "brand": "Puma",
//         "policy": "Refundable",
//         "size": "XL",
//         "oldPrice": 107.03,
//         "badge": "New",
//         "category": "Shoes",
//         "title": "Fitness Tracker",
//         "price": 66.32,
//         "count": 66,
//         "description": "Lightweight and comfortable.",
//         "rating": 2
//     },
//     {
//         "brand": "Puma",
//         "policy": "30-day return",
//         "size": "L",
//         "oldPrice": 124.99,
//         "badge": "Exclusive",
//         "category": "Gear",
//         "title": "Sports T-Shirt",
//         "price": 50.17,
//         "count": 22,
//         "description": "Lightweight and comfortable.",
//         "rating": 1
//     },
//     {
//         "brand": "Puma",
//         "policy": "Refundable",
//         "size": "XL",
//         "oldPrice": 158.11,
//         "badge": "Sale",
//         "category": "Accessories",
//         "title": "Running Shoes",
//         "price": 56.59,
//         "count": 91,
//         "description": "High-quality product with modern design.",
//         "rating": 2
//     },
//     {
//         "brand": "Adidas",
//         "policy": "Refundable",
//         "size": "M",
//         "oldPrice": 55.61,
//         "badge": "Limited",
//         "category": "Gear",
//         "title": "Gym Bag",
//         "price": 148.96,
//         "count": 6,
//         "description": "Top-rated item by customers.",
//         "rating": 2
//     },
//     {
//         "brand": "Puma",
//         "policy": "Refundable",
//         "size": "L",
//         "oldPrice": 109.18,
//         "badge": "Sale",
//         "category": "Gear",
//         "title": "Sports T-Shirt",
//         "price": 114.95,
//         "count": 22,
//         "description": "Perfect for training and casual wear.",
//         "rating": 4
//     },
//     {
//         "brand": "Nike",
//         "policy": "30-day return",
//         "size": "XL",
//         "oldPrice": 183.66,
//         "badge": "Limited",
//         "category": "Gear",
//         "title": "Sneakers",
//         "price": 104.5,
//         "count": 95,
//         "description": "Lightweight and comfortable.",
//         "rating": 4
//     },
//     {
//         "brand": "Under Armour",
//         "policy": "Exchange only",
//         "size": "XL",
//         "oldPrice": 149.56,
//         "badge": "Sale",
//         "category": "Clothing",
//         "title": "Running Shoes",
//         "price": 90.97,
//         "count": 25,
//         "description": "Perfect for training and casual wear.",
//         "rating": 1
//     },
//     {
//         "brand": "Under Armour",
//         "policy": "Refundable",
//         "size": "S",
//         "oldPrice": 120.11,
//         "badge": "New",
//         "category": "Shoes",
//         "title": "Gym Bag",
//         "price": 74.57,
//         "count": 49,
//         "description": "Top-rated item by customers.",
//         "rating": 5
//     },
//     {
//         "brand": "Reebok",
//         "policy": "No return",
//         "size": "L",
//         "oldPrice": 154.89,
//         "badge": "Limited",
//         "category": "Accessories",
//         "title": "Sneakers",
//         "price": 44.02,
//         "count": 15,
//         "description": "Top-rated item by customers.",
//         "rating": 4
//     },
//     {
//         "brand": "Reebok",
//         "policy": "Refundable",
//         "size": "XL",
//         "oldPrice": 71.77,
//         "badge": "Bestseller",
//         "category": "Clothing",
//         "title": "Gym Bag",
//         "price": 21.97,
//         "count": 6,
//         "description": "Perfect for training and casual wear.",
//         "rating": 5
//     },
//     {
//         "brand": "Adidas",
//         "policy": "30-day return",
//         "size": "L",
//         "oldPrice": 199.57,
//         "badge": "Exclusive",
//         "category": "Clothing",
//         "title": "Sneakers",
//         "price": 124.52,
//         "count": 86,
//         "description": "Durable and reliable for everyday use.",
//         "rating": 4
//     },
//     {
//         "brand": "Reebok",
//         "policy": "No return",
//         "size": "L",
//         "oldPrice": 111.82,
//         "badge": "Exclusive",
//         "category": "Accessories",
//         "title": "Fitness Tracker",
//         "price": 94.48,
//         "count": 61,
//         "description": "Top-rated item by customers.",
//         "rating": 1
//     },
//     {
//         "brand": "Puma",
//         "policy": "Refundable",
//         "size": "L",
//         "oldPrice": 51.9,
//         "badge": "Bestseller",
//         "category": "Gear",
//         "title": "Fitness Tracker",
//         "price": 113.26,
//         "count": 54,
//         "description": "High-quality product with modern design.",
//         "rating": 5
//     },
//     {
//         "brand": "Puma",
//         "policy": "Exchange only",
//         "size": "L",
//         "oldPrice": 94.17,
//         "badge": "Bestseller",
//         "category": "Accessories",
//         "title": "Running Shoes",
//         "price": 130.81,
//         "count": 46,
//         "description": "Lightweight and comfortable.",
//         "rating": 2
//     },
//
// ]
//     async function addProductsToDB() {
//         for (let i = 0; products.length; i++) {
//             try {

//                 const docRef = await addDoc(collection(db, "products"),
//                     products[i]
//                 );
//                 console.log("Document written with ID: ", docRef.id);
//             } catch (e) {
//                 console.error("Error adding document: ", e);
//             }
//         }
//     }


// addProductsToDB()
