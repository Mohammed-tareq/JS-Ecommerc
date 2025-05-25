function setDataToRelatedProducts({ category, title, price, oldPrice, badge, rating }, productId) {
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
        starsHtml += i < rating
            ? `<i id = "star" class="fa-solid fa-star"></i>`
            : `<i id = "star" class="fa-regular fa-star"></i>`;
    }

    let relatedProductsContainer = document.getElementById('relatedProducts');
    relatedProductsContainer.innerHTML += `<div class="product-item">
                    <div class="product-banner">
                        <a href="details.html?id=${productId}" class="product-imgs">
                            <img src="assets/img/product-9-1.jpg" class="product-img default" alt="product-1">

                            <img src="assets/img/product-9-2.jpg" class="product-img hover" alt="product-1">

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

                        <div class="product-badge light-pink">${badge}</div>

                    </div>

                    <div class="product-content">
                        <span class="product-category">${category}</span>

                        <a href="details.html?id=${productId}">
                            <h3 class="product-title">
                                ${title}
                            </h3>
                        </a>

                        <div class="product-rating">
                           ${starsHtml}
                        </div>
                        <div class="flex-content" style="padding: 5px">

                            <div class="product-price flex">
                                <span class="new-price">$${price}</span>
                                <span class="old-price">$${oldPrice}</span>
                            </div>

                            <a href="#" class="action-btn cart-btn" aria-label="Add to Cart">
                                <i class="fi fi-rs-shopping-bag-add"></i>
                            </a>
                        </div>
                    </div>
                </div>`
}


export { setDataToRelatedProducts }