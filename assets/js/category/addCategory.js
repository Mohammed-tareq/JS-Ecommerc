import {app, analytics} from "../adminJs/dataconfig.js";
import {getFirestore, collection, addDoc  } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

const db = getFirestore(app);
let categoryCollection = collection(db, "categories");

// ============================================ arr of objects for category===========================================


const categories = [
    {
        name:"Bags",
        img:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747786570/category-2_nzbh3x.jpg"
    },
    {
        name:"Shoes",
        img:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747786632/category-5_aafhj4.jpg"
    },
    {
        name:"T-shirt",
        img: "https://res.cloudinary.com/dwjyrqiij/image/upload/v1747786830/category-1_ltrbk6.jpg"

    },
    {
        name:"Sandal",
        img: "https://res.cloudinary.com/dwjyrqiij/image/upload/v1747786858/category-3_ogxuhy.jpg"
    },
    {
        name:"Scarf Cap",
        img:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747786859/category-4_uswccm.jpg"
    },
    {
        name:"Pillowcase",
        img:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747786859/category-6_mjuflo.jpg"
    },
    {
        name:"Jumpsuit",
        img:"https://res.cloudinary.com/dwjyrqiij/image/upload/v1747786860/category-7_s7kvtx.jpg"
    }

]



async function addcategoryDB() {

     for(let i = 0; i < categories.length; i++){

        try {

            const docRef = await addDoc(categoryCollection, categories[i]);
            console.log("data added successfully", docRef.id);

        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Error adding product. Please try again.");
        }

     }
}




 addcategoryDB();