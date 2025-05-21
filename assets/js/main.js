/*=============== SHOW MENU ===============*/

/*===== Menu Show =====*/
/* Validate if constant exists */

/*===== Hide Show =====*/
/* Validate if constant exists */

/*=============== IMAGE GALLERY ===============*/
// function imgGallery() {
    const imgActive=document.querySelector('.details-img');
     const smallImg = document.querySelectorAll('.details-small-img');

    smallImg.forEach(img => {
        img.addEventListener('click', function() {
            imgActive.src = this.src;

        })
    })
// }
// imgGallery();
/*=============== SWIPER CATEGORIES ===============*/
var swiperCategory = new Swiper(".categories-content", {
    spaceBetween: 500,
    loop: true,

    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
    }
    ,
    breakpoints: {
        640: {
            spaceBetween: 20,
            slidesPerView: 2,
        },
        768: {
            spaceBetween: 40,
            slidesPerView: 3,
        },
        1024: {
            spaceBetween: 50,
            slidesPerView:4,
        },
        1280: {
            spaceBetween: 60,
            slidesPerView: 5,
        }
    }

});

/*=============== SWIPER PRODUCTS ===============*/
var swiperProduct = new Swiper(".new-content", {
    spaceBetween: 500,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
    }
    ,
    breakpoints: {
        640: {
            spaceBetween: 20,
            slidesPerView: 2,
        },
        768: {
            spaceBetween: 40,
            slidesPerView: 3,
        },
        1024: {
            spaceBetween: 50,
            slidesPerView: 4,
        },
        1280: {
            spaceBetween: 60,
            slidesPerView: 5,
        }
    }

});
/*=============== PRODUCTS TABS ===============*/
const tabs = document.querySelectorAll('[data-target]');
tabContents = document.querySelectorAll('[data-content]');

    tabs.forEach(tab=>{
        tab.addEventListener('click',()=>{
            const target =document.querySelector(tab.dataset.target);
            tabContents.forEach(tabContent=>{
                tabContent.classList.remove('active-tab');
                })
            target.classList.add('active-tab');

            tabs.forEach(tab=>{
                tab.classList.remove('active-tab');
                })
            tab.classList.add('active-tab');

        })
    })


    


// ========================active link =========================



























