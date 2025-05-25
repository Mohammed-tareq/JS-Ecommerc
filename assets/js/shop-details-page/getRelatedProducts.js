import { collection, db, getDocs, limit, query, where } from "./firebase.js";
import { setDataToRelatedProducts } from "./setDataToRelatedProducts.js";

async function getRelatedProducts({ category }) {
    try {
        // First get all products in the category
        let q = query(collection(db, 'products'), where("category", "==", category));
        const documentSnapshots = await getDocs(q);
        const docs = documentSnapshots.docs;

        // If we have less than 4 products, get some products from other categories
        if (docs.length < 4) {
            // Get remaining products from other categories
            let remainingProducts = 4 - docs.length;
            let otherProductsQuery = query(
                collection(db, 'products'),
                where("category", "!=", category),
                limit(remainingProducts)
            );
            const otherProductsSnapshots = await getDocs(otherProductsQuery);
            const otherDocs = otherProductsSnapshots.docs;

            // Combine both sets of products
            const allDocs = [...docs, ...otherDocs];

            // Display all products
            allDocs.forEach(doc => {
                setDataToRelatedProducts(doc.data(), doc.id);
            });
        } else {
            // If we have enough products in the same category, just show those
            docs.slice(0, 4).forEach(doc => {
                setDataToRelatedProducts(doc.data(), doc.id);
            });
        }
    } catch (error) {
        console.error("Error fetching related products:", error);
    }
}

export { getRelatedProducts };