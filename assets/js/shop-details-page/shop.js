import { collection, getDocs, db, query, limit, startAfter, doc, getCountFromServer, where } from "./firebase.js";
import { setDataToProductItem, productsContainer } from "./setDataToProductItem.js";
import { addToCart } from "./addtocart.js";


let currentPage = 1;


let totalPages = 0;
const pageSize = 28;
const countProducts = document.getElementById('count');
const params = new URLSearchParams(window.location.search);
const category = params.get("category");

async function getTotalDocumentCount() {
    let q = collection(db, "products");
    if (category) {
        console.log(category);
        q = query(q, where("category", "==", category));
    }
    const snapshot = await getCountFromServer(q);
    const totalDocs = snapshot.data().count;
    countProducts.textContent = totalDocs;
    totalPages = Math.ceil(totalDocs / pageSize);
    createPagination(totalPages);
}

const paginationContainer = document.getElementById('paginationContainer');


function createPagination(totalPages) {
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        let li = document.createElement('li');
        li.innerHTML = `
        <button class="btn-pagination" id="${i}">
        <a href="#" class="pagination-link ${i === currentPage ? 'active-page' : ''}">0${i}</a>
        </button>
        `;
        paginationContainer.appendChild(li);
    }

    const btnsPagination = document.querySelectorAll(".btn-pagination");
    btnsPagination.forEach(btn => {
        btn.addEventListener("click", () => {
            const selectedPage = Number(btn.id);
            if (selectedPage !== currentPage) {
                currentPage = selectedPage;
                fetchOnePage(category);
                updateActivePagination();
            }
        });
    });
}

function updateActivePagination() {
    const paginationLinks = document.querySelectorAll(".pagination-link");

    paginationLinks.forEach(link => {
        link.classList.remove("active-page");
    });

    const activeLink = paginationContainer.querySelector(`button[id="${currentPage}"] .pagination-link`);
    if (activeLink) {
        activeLink.classList.add("active-page");
    }
}
getTotalDocumentCount();






let lastDoc;
async function fetchOnePage(category) {
    productsContainer.innerHTML = '';
    let q = query(collection(db, 'products'), limit(pageSize));

    if (category) {
        console.log(category);
        q = query(collection(db, "products"), where("category", "==", category), limit(pageSize));
    }

    if (currentPage > 1 && lastDoc && !category) {
        q = query(collection(db, "products"), startAfter(lastDoc), limit(pageSize));
    }
    const documentSnapshots = await getDocs(q);
    const docs = documentSnapshots.docs;
    lastDoc = docs[docs.length - 1];

    if (documentSnapshots.empty) {
        productsContainer.innerHTML = '<p class="no-products">no products found</p>'
    }
    docs.forEach(doc => {
        let productId = doc.id;
        productsContainer.innerHTML += setDataToProductItem(doc.data(), productId);
    });


    
}


/////////////helmyyyyy
productsContainer.addEventListener('click', (e) => {
  const button = e.target.closest('.add-to-cart-btn');
  if (!button) return; // Not an add-to-cart button

  const productId = button.getAttribute('data-id');
  const productData = {
    title: button.getAttribute('data-title'),
    price: parseFloat(button.getAttribute('data-price')),
    imageUrl: button.getAttribute('data-image'),
  };
  addToCart(productId, productData);
});

/////////////////

if (category) {
    fetchOnePage(category);
} else {
    fetchOnePage()
}






export { fetchOnePage, currentPage }