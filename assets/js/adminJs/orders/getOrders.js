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

async function getOrder() {
    try {
        const querySnapshot = await getDocs(orderCollection);
        console.log("Query Snapshot:", querySnapshot);
        allOrders = [];
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                const orderData = doc.data();
                console.log("Order Data:", orderData);
                allOrders.push({ id: doc.id, data: orderData });
            });
            console.log("All Orders:", allOrders);
            displayOrders(currentPage);
            setupPagination();
        } else {
            tbodyOrder.innerHTML = `
        <tr><td colspan="7">No Data Found</td></tr>
      `;
        }
    } catch (e) {
        console.error("Error fetching orders:", e);
        tbodyOrder.innerHTML = `
      <tr><td colspan="7">No Data Found. Please check DB connection.</td></tr>
    `;
    }
}

function displayOrders(page) {
    tbodyOrder.innerHTML = "";
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageItems = allOrders.slice(start, end);
    console.log("Page Items:", pageItems);

    let counter = start + 1;
    let table = "";

    pageItems.forEach(({ id, data }) => {
        const createdAt = data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleString() : "N/A";
        table += `
      <tr>
        <td>${counter++}</td>
        <td>${data.email}</td>
        <td>${Object.keys(data.items).length}</td>
        <td>$${Object.values(data.items).reduce((total, item) => {
            return total + (item.quantity * item.price);
        }, 0)}</td>
        <td>Pending</td>
        <td>${createdAt}</td>
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
