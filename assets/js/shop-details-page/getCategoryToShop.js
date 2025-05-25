const categories = document.getElementsByClassName('category-title');


function getCategory() {
    for (let i = 0; i < categories.length; i++) {
        categories[i].addEventListener('click', function (e) {
            let category = e.target.id;
            window.location.href = `shop.html?category=${category}`;
        })
    }
}


getCategory()