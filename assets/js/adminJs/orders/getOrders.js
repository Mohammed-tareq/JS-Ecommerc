// import {app, analytics} from "../dataconfig.js";
// import {getFirestore, collection, getDocs, doc ,deleteDoc} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
//
// const db = getFirestore(app);
// let orderCollection = collection(db, "orders");
// let tbodyOrder = document.getElementById("tbodyOrder")
//
// async function getOrder() {
//     try {
//         let querySnapshot = await getDocs(orderCollection);
//         let table = '';
//         if (!querySnapshot.empty) {
//             let counter = 1;
//             querySnapshot.forEach((doc) => {
//                 const data = doc.data();
//                 console.log(data);
//                 table += `
//                <tr>
//                 <td>${counter++}</td>
//                 <td>${data.email}</td>
//                 <td>${Object.keys(data.items).length}</td>
//                 <td>${
//                     Object.values(data.items).reduce((total, item) => {
//                         return total + (item.quantity * item.price);
//                     }, 0)
//                 }</td>
//                 <td>Panding...</td>
//                 <td>
//                      ${Object.values(data.items).map(item => `
//                     <div>${item.title} (x${item.quantity})</div>
//                     `).join('')}
//                                 </td>
//                 <td>${data.createdAt.toDate().toLocaleString()}</td>
//                 <td><button class="btn btn-bd-primary btn-delete" id="${doc.id}">DELETE</button></td>
//
//
//                </tr>`;
//             })
//             tbodyOrder.innerHTML = table;
//
//             document.querySelectorAll(".btn-delete").forEach(button => {
//                 button.addEventListener('click', function() {
//                     deleteRow(this.id);
//                 });
//             });
//
//
//         } else {
//             tbodyOrder.innerHTML = `
//             <tr>
//             <td colspan="6">No Data Found</td>
//             `;
//         }
//     } catch (e) {
//         tbodyOrder.innerHTML = `
//                 <tr>
//                 <td colspan="6">No Data Found Pleace chick Connection in DB</td>
//                 </tr>
//                 `;
//     }
// }
//
// getOrder();
//
// // ============================delete===========================
//
// async function deleteRow(id) {
//     try {
//         if (confirm('Are you sure you want to delete this item?')) {
//             await deleteDoc(doc(db, "orders", id));
//             await getOrder();
//         }
//     } catch (error) {
//         console.error("Error deleting document:", error);
//         alert('Error deleting item. Please try again.');
//     }
// }
//
//


import { app, analytics } from "../dataconfig.js";
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const db = getFirestore(app);
let orderCollection = collection(db, "orders");
let tbodyOrder = document.getElementById("tbodyOrder");
let pagination = document.getElementById("pagination");

let allOrders = []; // تخزين كل الطلبات
let currentPage = 1;
const rowsPerPage = 10;

// ============= جلب الطلبات وتخزينها =============
async function getOrder() {
    try {
        const querySnapshot = await getDocs(orderCollection);
        allOrders = [];
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                allOrders.push({ id: doc.id, data: doc.data() });
            });

            displayOrders(currentPage);
            setupPagination();
        } else {
            tbodyOrder.innerHTML = `
        <tr><td colspan="8">No Data Found</td></tr>
      `;
        }
    } catch (e) {
        tbodyOrder.innerHTML = `
      <tr><td colspan="8">No Data Found. Please check DB connection.</td></tr>
    `;
    }
}

// ============= عرض الطلبات حسب الصفحة =============
function displayOrders(page) {
    tbodyOrder.innerHTML = "";
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageItems = allOrders.slice(start, end);

    let counter = start + 1;
    let table = "";

    pageItems.forEach(({ id, data }) => {
        table += `
      <tr>
        <td>${counter++}</td>
        <td>${data.email}</td>
        <td>${Object.keys(data.items).length}</td>
        <td>${
            Object.values(data.items).reduce((total, item) => {
                return total + item.quantity * item.price;
            }, 0)
        }</td>
        <td>Panding...</td>
        <td>
          ${Object.values(data.items)
            .map(
                (item) => `<div>${item.title} (x${item.quantity})</div>`
            )
            .join("")}
        </td>
        <td>${
            data.createdAt?.toDate
                ? data.createdAt.toDate().toLocaleString()
                : "N/A"
        }</td>
        <td><button class="btn btn-bd-primary btn-delete" id="${id}">DELETE</button></td>
      </tr>`;
    });

    tbodyOrder.innerHTML = table;

    document.querySelectorAll(".btn-delete").forEach((button) => {
        button.addEventListener("click", function () {
            deleteRow(this.id);
        });
    });
}

// ============= إنشاء أزرار التصفح =============
function setupPagination() {
    pagination.innerHTML = "";
    const pageCount = Math.ceil(allOrders.length / rowsPerPage);

    for (let i = 1; i <= pageCount; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = "btn btn-secondary m-1";
        if (i === currentPage) btn.classList.add("active");
        btn.addEventListener("click", () => {
            currentPage = i;
            displayOrders(currentPage);
            setupPagination();
        });
        pagination.appendChild(btn);
    }
}

// ============= حذف الطلب =============
async function deleteRow(id) {
    try {
        if (confirm("Are you sure you want to delete this item?")) {
            await deleteDoc(doc(db, "orders", id));
            await getOrder();
        }
    } catch (error) {
        console.error("Error deleting document:", error);
        alert("Error deleting item. Please try again.");
    }
}

getOrder();
