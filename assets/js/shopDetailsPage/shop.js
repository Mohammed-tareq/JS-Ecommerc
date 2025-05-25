import { collection, getDocs, db, query, limit, startAfter, doc, getCountFromServer } from "./firebase.js";
import { setDataToProductItem, productsContainer } from "./setDataToProductItem.js";


let currentPage = 1;


let totalPages = 0;
const pageSize = 28;

async function getTotalDocumentCount() {
    const snapshot = await getCountFromServer(collection(db, "products"));
    const totalDocs = snapshot.data().count;
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
        <a href="#" class="pagination-link ${i === currentPage ? 'active' : ''}">0${i}</a>
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
                fetchOnePage();
                updateActivePagination();
            }
        });
    });
}

function updateActivePagination() {
    const paginationLinks = document.querySelectorAll(".pagination-link");

    paginationLinks.forEach(link => {
        link.classList.remove("active");
    });

    const activeLink = paginationContainer.querySelector(`button[id="${currentPage}"] .pagination-link`);
    if (activeLink) {
        activeLink.classList.add("active");
    }
}
getTotalDocumentCount();






let lastDoc;
async function fetchOnePage() {
    productsContainer.innerHTML = '';
    let q = query(collection(db, 'products'), limit(pageSize));

    if (currentPage > 1) {
        q = query(collection(db, "products"), startAfter(lastDoc), limit(pageSize));
    }
    const documentSnapshots = await getDocs(q);
    const docs = documentSnapshots.docs;
    lastDoc = docs[docs.length - 1];

    docs.forEach(doc => {
        let productId = doc.id;
        productsContainer.innerHTML += setDataToProductItem(doc.data(), productId);
    });
}

fetchOnePage();




export { fetchOnePage, currentPage }


