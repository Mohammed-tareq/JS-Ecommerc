import {app, analytics} from "../adminJs/dataconfig.js";
import {getFirestore, collection, addDoc  } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

const db = getFirestore(app);
let productCollection = collection(db, "products");
let hotReleases = collection(db, "hotReleasesProducts")
let Outlet = collection(db, "OutletProducts")
let Brand = collection(db, "BrandProducts")
let lastPiece = collection(db, "lastPieceProducts")


let products = [
    {
        "brand": "ZARA",
        "policy": "Refundable",
        "size": ["xl","l","m","s"],
        "oldPrice": 70.91,
        "badge": "Limited",
        "category": "Clothing",
        "title": "T-shirt",
        "price": 137.98,
        "count": 28,
        "description": "Durable and reliable for everyday use.",
        "rating": 5,
        img1:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747789589/product-1-1_d0azbt.jpg",
        img2:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747789592/product-1-2_xcxyzw.jpg",
    },
    {
        "brand": "ZARA",
        "policy": "Refundable",
        "size": ["xl","l","m","s"],
        "oldPrice": 70.91,
        "badge": "Limited",
        "category": "Clothing",
        "title": "T-shirt",
        "price": 137.98,
        "count": 28,
        "description": "Durable and reliable for everyday use.",
        "rating": 5,
        img1:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747789592/product-2-1_nnvnok.jpg",
        img2:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747789602/product-2-2_yxpvra.jpg",
    },
    {
        "brand": "ZARA",
        "policy": "Refundable",
        "size": ["xl","l","m","s"],
        "oldPrice": 70.91,
        "badge": "Limited",
        "category": "Clothing",
        "title": "Jumpsuit",
        "price": 137.98,
        "count": 28,
        "description": "Durable and reliable for everyday use.",
        "rating": 5,
        img1:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747789591/product-4-1_czrmc3.jpg",
        img2:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747789593/product-4-2_ki2ipv.jpg",
    },
    {
        "brand": "ZARA",
        "policy": "Refundable",
        "oldPrice": 70.91,
        "badge": "Limited",
        "category": "Scarf Cap",
        "title": "Scarf Cap",
        "price": 137.98,
        "count": 28,
        "description": "Durable and reliable for everyday use.",
        "rating": 5,
        img1:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747789594/product-5-1_gpdexv.jpg",
        img2:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747789596/product-5-2_lsmgk9.jpg",
    },
    {
        "brand": "ZARA",
        "policy": "Refundable",
        "size": ["xl","l","m","s"],
        "oldPrice": 70.91,
        "badge": "Limited",
        "category": "Clothing",
        "title": "T-shirt",
        "price": 137.98,
        "count": 28,
        "description": "Durable and reliable for everyday use.",
        "rating": 5,
        img1:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747789601/product-6-1_u1ihcg.jpg",
        img2:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747789601/product-6-2_hv82sb.jpg",
    },
    {
        "brand": "ZARA",
        "policy": "Refundable",
        "size": ["xl","l","m","s"],
        "oldPrice": 70.91,
        "badge": "Limited",
        "category": "Clothing",
        "title": "T-shirt",
        "price": 137.98,
        "count": 28,
        "description": "Durable and reliable for everyday use.",
        "rating": 5,
        img1:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747789602/product-7-1_askegj.jpg",
        img2:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747789607/product-7-2_qtdltb.jpg",
    },
    {
        "brand": "ZARA",
        "policy": "Refundable",
        "size": ["xl","l","m","s"],
        "oldPrice": 70.91,
        "badge": "Limited",
        "category": "Clothing",
        "title": "T-shirt",
        "price": 137.98,
        "count": 28,
        "description": "Durable and reliable for everyday use.",
        "rating": 5,
        img1:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747789607/product-8-1_npkebp.jpg",
        img2:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747789621/product-8-2_ukolm2.jpg",
    },
    {
        "brand": "ZARA",
        "policy": "Refundable",
        "size": ["xl","l","m","s"],
        "oldPrice": 70.91,
        "badge": "Limited",
        "category": "Clothing",
        "title": "T-shirt",
        "price": 137.98,
        "count": 28,
        "description": "Durable and reliable for everyday use.",
        "rating": 5,
        img1:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747789615/product-9-1_hknubf.jpg",
        img2:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747789613/product-9-2_csifso.jpg",
    },
    {
        "brand": "ZARA",
        "policy": "Refundable",
        "size": "39 - 41",
        "oldPrice": 70.91,
        "badge": "Limited",
        "category": "Shoes",
        "title": "Sandal",
        "price": 137.98,
        "count": 28,
        "description": "Durable and reliable for everyday use.",
        "rating": 5,
        img1:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747789621/product-10-1_bimbeu.jpg",
        img2:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747789612/product-10-2_jmuh7f.jpg",
    },
    {
        "brand": "ZARA",
        "policy": "Refundable",
        "size": "39 - 41",
        "oldPrice": 70.91,
        "badge": "Limited",
        "category": "Shoes",
        "title": "Shoes",
        "price": 137.98,
        "count": 28,
        "description": "Durable and reliable for everyday use.",
        "rating": 5,
        img1:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747789618/product-11-1_dgwnd5.jpg",
        img2:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747789616/product-11-2_lrsdmw.jpg",
    },
    {
        "brand": "ZARA",
        "policy": "Refundable",
        "size": ["xl","l","m","s"],
        "oldPrice": 70.91,
        "badge": "Limited",
        "category": "Clothing",
        "title": "T-shirt",
        "price": 137.98,
        "count": 28,
        "description": "Durable and reliable for everyday use.",
        "rating": 5,
        img1:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747789617/product-12-1_ljcene.jpg",
        img2:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747789619/product-12-2_fv90b5.jpg",
    },
    {
        "brand": "ZARA",
        "policy": "Refundable",
        "oldPrice": 70.91,
        "badge": "Limited",
        "category": "Bags",
        "title": "Bags",
        "price": 137.98,
        "count": 28,
        "description": "Durable and reliable for everyday use.",
        "rating": 5,
        img1:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747789618/product-13-1_xgrua2.jpg",
        img2:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747789619/product-13-2_j03h8n.jpg",
    },
];

// =====================add  main content of product in home page this function is run one time and
// ====================== commented ofter first run ====================================
    async function addProductsToDB() {
        for (let i = 0; i < products.length; i++) {
            try {

                const docRef = await addDoc(productCollection,
                    products[i]
                );
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }



// ===================================== Hot Releases product home page ===========

async function addHotReleasesProductsToDB() {
    for (let i = 0;i < 3; i++) {
        try {

            const docRef = await addDoc(hotReleases,
                products[i]
            );
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}
// ==================== Deals & Outlet ==================================
async function addOutletToDB() {
    for (let i = 3; i < 6; i++) {
        try {

            const docRef = await addDoc(Outlet,
                products[i]
            );
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}
// =================== Brands ==============================
async function addBrandProductsToDB() {
    for (let i = 6; i < 9; i++) {
        try {

            const docRef = await addDoc(Brand,
                products[i]
            );
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}


//  ================== last Piece ===================
async function addLastPieceProductsToDB() {
    for (let i = 9; i < 12; i++) {
        try {

            const docRef = await addDoc(lastPiece,
                products[i]
            );
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}
// =========================== call all fun==============================
    addProductsToDB();
    addHotReleasesProductsToDB();
    addOutletToDB();
    addBrandProductsToDB();
    addLastPieceProductsToDB();