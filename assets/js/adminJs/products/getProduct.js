import {app, analytics} from "../dataconfig.js";
// import {getFirestore, collection, getDocs, doc ,deleteDoc} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
//
// const db = getFirestore(app);
// let productCollection = collection(db, "products");
// let tbody = document.getElementById("tbody")
//
// async function getProducts() {
//     try {
//         let querySnapshot = await getDocs(productCollection);
//         let table = '';
//         if (!querySnapshot.empty) {
//             let counter = 1;
//             querySnapshot.forEach((doc) => {
//                 const data = doc.data();
//                 table += `
//                <tr>
//                 <td>${data.title}</td>
//                 <td>${data.brand}</td>
//                 <td>${data.policy}</td>
//                 <td>${data.oldPrice}</td>
//                 <td>${data.badge}</td>
//                 <td>${data.price}</td>
//                 <td>${data.Count}</td>
//                 <td>${data.category}</td>
//                 <td><img src=" ${data.img1}" width="70px" height="70px"></td>
//                 <td><button class="btn btn-bd-primary btn-delete" id="${doc.id}">DELETE</button></td>
//
//                </tr>`;
//             })
//             tbody.innerHTML = table;
//
//             document.querySelectorAll(".btn-delete").forEach(button => {
//                 button.addEventListener('click', function() {
//                     deleteRow(this.id);
//                 });
//             });
//
//
//         } else {
//             tbody.innerHTML = `
//             <tr>
//             <td colspan="6">No Data Found</td>
//             `;
//         }
//     } catch (e) {
//             tbody.innerHTML = `
//                 <tr>
//                 <td colspan="6">No Data Found Pleace chick Connection in DB</td>
//                 </tr>
//                 `;
//     }
// }
//
// getProducts();
//
// // ============================delete===========================
//
// async function deleteRow(id) {
//     try {
//         if (confirm('Are you sure you want to delete this item?')) {
//             await deleteDoc(doc(db, "products", id));
//             await getProducts();
//         }
//     } catch (error) {
//         console.error("Error deleting document:", error);
//         alert('Error deleting item. Please try again.');
//     }
// }
//
//

import {
    getFirestore,
    collection,
    getDocs,
    doc,
    deleteDoc,
    query,
    orderBy,
    limit,
    startAfter,
    getCountFromServer
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";


const db = getFirestore(app);
let productCollection = collection(db, "products");
let tbody = document.getElementById("tbody");
let paginationContainer = document.getElementById("pagination");

const pageSize = 10;
let pageCursors = []; // لحفظ مؤشرات البداية لكل صفحة

async function setupPagination() {
    const countSnap = await getCountFromServer(productCollection);
    const totalItems = countSnap.data().count;
    const totalPages = Math.ceil(totalItems / pageSize);

    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.classList.add("btn", "btn-sm", "btn-outline-primary", "m-1");
        btn.addEventListener("click", () => loadPage(i));
        paginationContainer.appendChild(btn);
    }

    await loadPage(1); // أول مرة
}

async function loadPage(pageNumber) {
    let q = query(productCollection, orderBy("title"));

    if (pageNumber > 1 && pageCursors[pageNumber - 2]) {
        q = query(q, startAfter(pageCursors[pageNumber - 2]), limit(pageSize));
    } else {
        q = query(q, limit(pageSize));
    }

    const snapshot = await getDocs(q);

    // حفظ مؤشر الصفحة للانتقال للصفحات القادمة
    const docs = snapshot.docs;
    if (docs.length > 0) {
        pageCursors[pageNumber - 1] = docs[docs.length - 1];
    }

    let table = '';
    docs.forEach((doc) => {
        const data = doc.data();
        table += `
        <tr>
            <td>${data.title}</td>
            <td>${data.brand}</td>
            <td>${data.policy}</td>
            <td>${data.oldPrice}</td>
            <td>${data.badge}</td>
            <td>${data.price}</td>
            <td>${data.Count}</td>
            <td>${data.category}</td>
            <td><img src="${data.img1}" width="70px" height="70px"></td>
            <td><button class="btn btn-bd-primary btn-delete" id="${doc.id}">DELETE</button></td>
        </tr>`;
    });

    tbody.innerHTML = table;

    document.querySelectorAll(".btn-delete").forEach(button => {
        button.addEventListener('click', function () {
            deleteRow(this.id);
        });
    });
}

setupPagination();

async function deleteRow(id) {
    try {
        if (confirm('Are you sure you want to delete this item?')) {
            await deleteDoc(doc(db, "products", id));
            pageCursors = []; // إعادة تعيين المؤشرات
            await setupPagination(); // إعادة تحميل الصفحات
        }
    } catch (error) {
        console.error("Error deleting document:", error);
        alert('Error deleting item. Please try again.');
    }
}
