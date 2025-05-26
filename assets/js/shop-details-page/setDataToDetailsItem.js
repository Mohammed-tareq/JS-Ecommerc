function setDataToDetailsItem({
  title,
  price,
  oldPrice,
  badge,
  description,
  brand,
  policy,
  img1,
  img2,
  count,
  productId,
}) {
  const detailsContainer = document.getElementById("main-details");
  detailsContainer.innerHTML += `
    <div class="details-group">
        <img src="${img1}" class="details-img">
        <div class="details-small-images grid">
            <img src="${img2}" class="details-small-img">
            <img src="${img1}" class="details-small-img">
            <img src="${img2}" class="details-small-img">
            <img src="${img1}" class="details-small-img">
        </div>
    </div>

    <div class="details-group">
        <h3 class="details-title">${title}</h3>

        <p class="details-brand">Brands: <span>${brand}</span></p>

        <div class="details-price flex">
            <span class="new-price">$${price}</span>
            <span class="old-price">$${oldPrice}</span>
            <span class="save-price">${badge}</span>
        </div>

        <p class="short-description">
            ${description}
        </p>

        <ul class="product-list">
            <li class="list-item flex">
                <i class="fi-rs-crown"></i>
                1 Year AL Jazeera Brand Warranty
            </li>
            <li class="list-item flex">
                <i class="fi-rs-refresh"></i>
                30 Days Return Policy${policy}
            </li>
            <li class="list-item flex">
                <i class="fi-rs-credit"></i>
                Cash on Delivery Available
            </li>
        </ul>

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
            <a href="#" class="details-action-btn" data-product-id="${productId}">
                <i class="fi fi-rs-heart"></i>
            </a>
        </div>

        <ul class="details-meta">
            <li class="meta-list flex"><span>SUK:</span> FWM15VKT</li>
            <li class="meta-list flex"><span>Tags:</span> Cloth, Women, Dress</li>
            <li class="meta-list flex"><span>Availability:</span> ${count} Items In Stock</li>
        </ul>
    </div>
`;
}

export { setDataToDetailsItem };
