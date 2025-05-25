// //addToCart.js
// import { getDoc, doc, db, setDoc } from "./firebaseFirestore.js";

// async function addToCart(productId, productData, quantity = 1) {
//   try {
//     const userId = localStorage.getItem("authenticatedUserId");

//     if (!userId) {
//       console.warn(
//         "User not authenticated. Cannot add to cart. Please log in."
//       );
//       addToLocalStorage(productId, productData, quantity);
//       return;
//     }

//     const userCartRef = doc(db, "carts", userId);
//     const docSnap = await getDoc(userCartRef);

//     let cartItems = {}; 

//     if (docSnap.exists()) {
//       cartItems = docSnap.data().items || {};
//     }

//     if (cartItems[productId]) {
//       cartItems[productId].quantity += quantity;
//     } else {
//       cartItems[productId] = {
//         // title: productData.title,
//         // price: productData.price,
//         // imageUrl: "assets/img/product-9-1.jpg",
//         quantity: quantity,
//       };
//     }

//     await setDoc(userCartRef, { items: cartItems }, { merge: true });

//     console.log(
//       `Product "${productData.title}" added to cart successfully for user: ${userId} ${productId} `
//     );
//     alert("Product added to cart!");
//     saveCartToLocalStorage(userId, cartItems);
//   } catch (error) {
//     console.error("Error adding product to cart:", error);
//     alert("Failed to add product to cart. Please try again.");
//   }
// }

// // function addToLocalStorage(productId, productData, quantity) {
// //   let localStorageCart = JSON.parse(localStorage.getItem("cart")) || {};

// //   if (localStorageCart[productId]) {
// //     localStorageCart[productId].quantity += quantity;
// //   } else {
// //     localStorageCart[productId] = {
// //       quantity: quantity,
// //       title: productData.title,
// //       price: productData.price,
// //     };
// //   }

// //   localStorage.setItem("cart", JSON.stringify(localStorageCart));
// //   alert("Product added to cart in localStorage.");
// // }

// function addToLocalStorage(productId, productData, quantity) {
//   const userId = localStorage.getItem("authenticatedUserId") || "guest";
//   let localStorageCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || {};

//   if (localStorageCart[productId]) {
//     localStorageCart[productId].quantity += quantity;
//   } else {
//     localStorageCart[productId] = {
//       quantity: quantity,
//       title: productData.title,
//       price: productData.price,
//       imageUrl: productData.imageUrl || "assets/img/default.jpg",
//     };
//   }

//   localStorage.setItem(`cart_${userId}`, JSON.stringify(localStorageCart));
//   alert("Product added to cart in localStorage.");
// }


// function saveCartToLocalStorage(userId, cartItems) {
//   let localStorageCart = JSON.parse(localStorage.getItem("cart")) || {};

//   localStorageCart[userId] = cartItems;

//   localStorage.setItem("cart", JSON.stringify(localStorageCart));
// }

// export { addToCart };


import { doc, getDoc, setDoc, updateDoc, db } from "./firebaseFirestore.js";

async function addToCart(productId, productData, quantity = 1) {
  const userEmail = localStorage.getItem("currentUserEmail");

  if (!userEmail) {
    console.warn("User not authenticated. Please log in.");
    return;
  }

  const cartKey = `cart_${userEmail}`;
  const cartRef = doc(db, "cart", userEmail);

  // Load existing cart from Firestore (if any)
  let firebaseCart = {};
  const cartSnap = await getDoc(cartRef);
  if (cartSnap.exists()) {
    firebaseCart = cartSnap.data().items || {};
  }

  // Update Firebase cart
  if (firebaseCart[productId]) {
    firebaseCart[productId].quantity += quantity;
  } else {
    firebaseCart[productId] = {
      title: productData.title,
      price: productData.price,
      imageUrl: productData.imageUrl || "assets/img/default.jpg",
      quantity: quantity,
    };
  }

  // Save updated cart to Firestore
  await setDoc(cartRef, {
    email: userEmail,
    items: firebaseCart,
  });

  // Also update cart in localStorage
  localStorage.setItem(cartKey, JSON.stringify(firebaseCart));

  console.log(`Item ${productId} added to cart for ${userEmail}`);
}

export { addToCart };
