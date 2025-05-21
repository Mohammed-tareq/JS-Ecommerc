
import {app, analytics} from "../adminJs/dataconfig.js";
import {getFirestore, collection, getDocs, doc ,deleteDoc} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";


const db = getFirestore(app);
let hotReleasesCollection = collection(db, "hotReleasesProducts")
let OutletCollection = collection(db, "OutletProducts")
let BrandCollection = collection(db, "BrandProducts")
let lastPieceCollection = collection(db, "lastPieceProducts")
let newProductCollection = collection(db, "newProducts")




// ================ div to view product =====================
let newProduct = document.getElementById("newProduct");
let hotReleases = document.getElementById("hotReleases");
let Outlet = document.getElementById("Outlet");
let brand = document.getElementById("brand");
let lastPiece = document.getElementById("lastPiece");


// ========================== new Products ============================================
async function getNewProducts() {

    try {
        let querySnapshot = await getDocs(newProductCollection);
        let product = '';


        querySnapshot.forEach((doc) => {
            const data = doc.data();
            product += ` 
                     <div class="product-item swiper-slide" >
                        <div class="product-banner">
                            <a href="details.html" class="product-imgs">
                                <img src="${data.Img}" class="product-img " alt="product-1">

                            </a>

                            <div class="product-actions">
                                <a href="#" class="action-btn" aria-label="Quick View">
                                    <i class="fi fi-rs-eye"></i>
                                </a>

                                <a href="#" class="action-btn" aria-label="Add to Wishlist">
                                    <i class="fi fi-rs-heart"></i>
                                </a>

                                <a href="#" class="action-btn" aria-label="Compare">
                                    <i class="fi fi-rs-shuffle"></i>
                                </a>

                            </div>

                            <div class="product-badge light-pink">Hot</div>

                        </div>

                        <div class="product-content">
                            <span class="product-category">${data.category}</span>

                            <a href="details.html">
                                <h3 class="product-title">
                                    ${data.title}
                                </h3>
                            </a>

                            <div class="product-rating">
                                <i class="fi fi-rs-star"></i>
                                <i class="fi fi-rs-star"></i>
                                <i class="fi fi-rs-star"></i>
                                <i class="fi fi-rs-star"></i>
                                <i class="fi fi-rs-star"></i>
                            </div>
                            <div class="flex-content" style="padding: 5px">

                                <div class="product-price flex">
                                    <span class="new-price">${data.price}</span>
                                    <span class="old-price">${data.oldPrice}</span>
                                </div>

                                <a href="#" class="action-btn cart-btn" aria-label="Add to Cart">
                                    <i class="fi fi-rs-shopping-bag-add"></i>
                                </a>
                            </div>
                        </div>
                    
               `;
        })
        newProduct.innerHTML += product;


    } catch (e) {
        console.error("Error getting documents in product lastPiece: ", e);
    }
}

// ================================================= get hotCollection ================
async function gethotReleases() {

    try {
        let querySnapshot = await getDocs(hotReleasesCollection);
        let product = '';


        querySnapshot.forEach((doc) => {
            const data = doc.data();
            product += ` 
                    <div class="showcase-item">
                        <a href="details.html" class="showcase-img-box">
                            <img class="showcase-img" src="${data.img1}">
                        </a>

                        <div class="showcase-content">
                            <a href="details.html">
                                <h4 class="showcase-title">${data.description}</h4>
                            </a>

                            <div class="showcase-price flex">
                                <span class="new-price">${data.oldPrice}</span>
                                <span class="old-price">${data.price}</span>
                            </div>
                        </div>
                    </div>
               `;
        })
        hotReleases.innerHTML += product;


    } catch (e) {
        console.error("Error getting documents in product hot: ", e);
    }
}

//======================================================

async function getOutlet() {

    try {
        let querySnapshot = await getDocs(OutletCollection);
        let product = '';


        querySnapshot.forEach((doc) => {
            const data = doc.data();
            product += ` 
                    <div class="showcase-item">
                        <a href="details.html" class="showcase-img-box">
                            <img class="showcase-img" src="${data.img1}">
                        </a>

                        <div class="showcase-content">
                            <a href="details.html">
                                <h4 class="showcase-title">${data.description}</h4>
                            </a>

                            <div class="showcase-price flex">
                                <span class="new-price">${data.oldPrice}</span>
                                <span class="old-price">${data.price}</span>
                            </div>
                        </div>
                    </div>
               `;
        })
        Outlet.innerHTML += product;


    } catch (e) {
        console.error("Error getting documents in product outlet: ", e);
    }
}

// ======================== brand collection ============================

async function getBrand() {

    try {
        let querySnapshot = await getDocs(BrandCollection);
        let product = '';


        querySnapshot.forEach((doc) => {
            const data = doc.data();
            product += ` 
                    <div class="showcase-item">
                        <a href="details.html" class="showcase-img-box">
                            <img class="showcase-img" src="${data.img1}">
                        </a>

                        <div class="showcase-content">
                            <a href="details.html">
                                <h4 class="showcase-title">${data.description}</h4>
                            </a>

                            <div class="showcase-price flex">
                                <span class="new-price">${data.oldPrice}</span>
                                <span class="old-price">${data.price}</span>
                            </div>
                        </div>
                    </div>
               `;
        })
        brand.innerHTML += product;


    } catch (e) {
        console.error("Error getting documents in product brand: ", e);
    }
}


//================================ get last piece============================

async function getLastPiece() {

    try {
        let querySnapshot = await getDocs(lastPieceCollection);
        let product = '';


        querySnapshot.forEach((doc) => {
            const data = doc.data();
            product += ` 
                    <div class="showcase-item">
                        <a href="details.html" class="showcase-img-box">
                            <img class="showcase-img" src="${data.img1}">
                        </a>

                        <div class="showcase-content">
                            <a href="details.html">
                                <h4 class="showcase-title">${data.description}</h4>
                            </a>

                            <div class="showcase-price flex">
                                <span class="new-price">${data.oldPrice}</span>
                                <span class="old-price">${data.price}</span>
                            </div>
                        </div>
                    </div>
               `;
        })
        lastPiece.innerHTML += product;


    } catch (e) {
        console.error("Error getting documents in product lastPiece: ", e);
    }
}
//======================== call all fun =====================
getNewProducts();
gethotReleases();
getOutlet();
getBrand();
getLastPiece();