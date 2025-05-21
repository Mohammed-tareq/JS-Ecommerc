import {app, analytics} from "./dataconfig.js";
import {getFirestore, collection, addDoc  } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";


const db = getFirestore(app);
let productCollection = collection(db, "products")
let newProduct = collection(db, "newProducts")

//  =======================the  input product========================

let productID = document.getElementById("productID");
let brandName = document.getElementById("brandName");
let policy = document.getElementById("policy");
let size = document.getElementById("size");
let oldPrice = document.getElementById("oldPrice");
let badge = document.getElementById("badge");
let categoryName = document.getElementById("categoryName");
let productName = document.getElementById("productName");
let priceProduct = document.getElementById("priceProduct");
let productCount = document.getElementById("productCount");
let productImg = document.getElementById("productImg");
let descriptionProduct = document.getElementById("descriptionProduct");
let addProductBtn = document.getElementById("addProductBtn");
let imgShow = document.getElementById("img");
// ==================================================================

// ===========================add product event=========================

addProductBtn.addEventListener("click", addProductDB);

//=============================================================================





//========================================= add function =====================

async function addProductDB(e) {
    e.preventDefault();
    try {
        // Disable button and show loading state
        addProductBtn.disabled = true;
        addProductBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Adding...';

        if (!categoryName.value || !productName.value ||
            !priceProduct.value || !productCount.value || !productImg.value ||
            !descriptionProduct.value) {
            alert("Please fill in all fields");
            // Reset button state
            addProductBtn.disabled = false;
            addProductBtn.innerHTML = 'Add Product';
            return;
        }

        // Upload image to Cloudinary and get URL
        const file = productImg.files[0];
        if (!file) {
            alert("Please select an image");
            // Reset button state
            addProductBtn.disabled = false;
            addProductBtn.innerHTML = 'Add Product';
            return;
        }

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'images');
        data.append('cloud_name', 'dwjyrqiij');

        const response = await fetch('https://api.cloudinary.com/v1_1/dwjyrqiij/image/upload', {
            method: 'POST',
            body: data
        });
        
        const result = await response.json();
        const imgUrl = result.url;
        console.log(imgUrl);

        let productObj = {
            ID: productID.value,
            brand: brandName.value,
            policy: policy.value,
            size: size.value,
            oldPrice: oldPrice.value,
            badge: badge.value,
            category: categoryName.value,
            title: productName.value,
            price: priceProduct.value,
            Count: productCount.value,
            Img: imgUrl,
            description: descriptionProduct.value,
            createdAt: new Date().toLocaleString(),
        };

        const docRef = await addDoc(productCollection, productObj);
        const docRef2 = await addDoc(newProduct, productObj);

        console.log("data added successfully", docRef.id);

        // Clear form fields
        categoryName.value = '';
        productName.value = '';
        priceProduct.value = '';
        productCount.value = '';
        productImg.value = null;
        descriptionProduct.value = '';
        productID.value = '';
        brandName.value = '';
        policy.value = '';
        size.value = '';
        oldPrice.value = '';
        badge.value = '';
        imgShow.classList.add("d-none");

        console.log("Product added successfully!");

    } catch (e) {
        console.error("Error adding document: ", e);
        alert("Error adding product. Please try again.");
    } finally {
        // Reset button state regardless of success or failure
        addProductBtn.disabled = false;
        addProductBtn.innerHTML = 'Add Product';
    }
}



