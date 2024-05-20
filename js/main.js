// work with slide
var swiper = new Swiper(".swiper", {
    pagination: {
        el: ".swiper-pagination",
        clickable: "true",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    loop: true,
});
