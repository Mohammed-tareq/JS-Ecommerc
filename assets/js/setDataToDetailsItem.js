const detailsContainer = document.getElementById('main-details');
function setDataToDetailsItem({ title, price, oldPrice, badge, category }) {
    detailsContainer.innerHTML += `
    <div class="details-group">
        <h3 class="details-title">${title}</h3>

        <p class="details-brand">Brands: <span>adidas</span></p>

        <div class="details-price flex">
            <span class="new-price">${price}</span>
            <span class="old-price">${oldPrice}</span>
            <span class="save-price">${badge}</span>
        </div>

        <p class="short-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam.
        </p>

        <ul class="product-list">
            <li class="list-item flex">
                <i class="fi-rs-crown"></i>
                1 Year AL Jazeera Brand Warranty
            </li>
            <li class="list-item flex">
                <i class="fi-rs-refresh"></i>
                30 Days Return Policy
            </li>
            <li class="list-item flex">
                <i class="fi-rs-credit"></i>
                Cash on Delivery Available
            </li>
        </ul>

        <div class="details-color flex">
            <span class="details-color-title">Color:</span>
            <ul class="color-list">
                <li><a href="#" class="color-link" style="background-color: hsl(37,100%,65%)"></a></li>
                <li><a href="#" class="color-link" style="background-color: hsl(353,100%,67%)"></a></li>
                <li><a href="#" class="color-link" style="background-color: hsl(49,100%,60%)"></a></li>
                <li><a href="#" class="color-link" style="background-color: hsl(304,100%,78%)"></a></li>
                <li><a href="#" class="color-link" style="background-color: hsl(126,61%,52%)"></a></li>
            </ul>
        </div>

        <div class="details-size flex">
            <span class="details-size-title">Size:</span>
            <ul class="size-list">
                <li><a href="#" class="size-link size-active">M</a></li>
                <li><a href="#" class="size-link">L</a></li>
                <li><a href="#" class="size-link">XL</a></li>
                <li><a href="#" class="size-link">XXL</a></li>
            </ul>
        </div>

        <div class="details-action">
            <input type="number" class="quantity" value="3">
            <a href="#" class="btn btn-sm">ADD TO CART</a>
            <a href="#" class="details-action-btn">
                <i class="fi fi-rs-heart"></i>
            </a>
        </div>

        <ul class="details-meta">
            <li class="meta-list flex"><span>SUK:</span> FWM15VKT</li>
            <li class="meta-list flex"><span>Tags:</span> Cloth, Women, Dress</li>
            <li class="meta-list flex"><span>Availability:</span> 8 Items In Stock</li>
        </ul>
    </div>
`;

}


export { setDataToDetailsItem }

