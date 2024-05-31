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

// work with stories
const storiesItem = document.querySelectorAll(".js-story");
const modalElem = document.querySelector(".js-modal");
const modalImg = document.querySelector(".js-img-modal");

const preventDefault = (e) => {
    e.preventDefault();
};

const disableScroll = () => {
    window.addEventListener("wheel", preventDefault, { passive: false });
    window.addEventListener("touchmove", preventDefault, { passive: false });
    window.addEventListener("keydown", preventDefaultForScrollKeys, {
        passive: false,
    });
};

const enableScroll = () => {
    window.removeEventListener("wheel", preventDefault, { passive: false });
    window.removeEventListener("touchmove", preventDefault, { passive: false });
    window.removeEventListener("keydown", preventDefaultForScrollKeys, {
        passive: false,
    });
};

const preventDefaultForScrollKeys = (e) => {
    if ([37, 38, 39, 40, 32].includes(e.keyCode)) {
        preventDefault(e);
    }
};

const handleOpenModal = (source) => {
    modalElem.classList.add("active");
    modalImg.setAttribute("src", source);
    disableScroll();
};

const handleCloseModal = () => {
    modalElem.classList.remove("active");
    enableScroll();
};

storiesItem.forEach((story) => {
    story.addEventListener("click", () => {
        const storyImage = story
            .querySelector(".hero__story_wrapper img")
            .getAttribute("src");
        const storyImageWrapper = story.querySelector(".hero__story_wrapper");

        handleOpenModal(storyImage);
        storyImageWrapper.classList.add("active");
    });
});

modalElem.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
        handleCloseModal();
    } else {
        return;
    }
});

// work with menu
const menuElement = document.querySelector(".js-menu");
const menuBurger = document.querySelector(".js-burger");
let menuToggle = false;

menuBurger.addEventListener("click", () => {
    menuToggle = !menuToggle;

    if (menuToggle) {
        menuBurger
            .querySelector("img")
            .setAttribute("src", "img/close-icon.svg");
        menuElement.classList.add("active");
    } else {
        menuBurger
            .querySelector("img")
            .setAttribute("src", "img/burger-icon.svg");
        menuElement.classList.remove("active");
    }
});

// order
// main work with form calc sum
const totalPrice = document.querySelector(".js-total");
let basePrice = 109.99;
let finalPrice = basePrice;
totalPrice.innerHTML = finalPrice.toFixed(2);

const handleChageTotalPrice = () => {
    totalPrice.innerHTML = Number(finalPrice).toFixed(2);
};

const updateFinalPrice = () => {
    const selectedCount = document.querySelector(".order__count_item.active");
    if (selectedCount) {
        const sum = Number(selectedCount.getAttribute("data-price"));
        const count = Number(selectedCount.getAttribute("data-count"));
        basePrice = sum * count;
    }

    // Учитываем стоимость выбранного метода
    const selectedMetodRadio = document.querySelector(".metod__radio:checked");
    if (selectedMetodRadio) {
        const metodPrice = Number(
            selectedMetodRadio.getAttribute("data-price")
        );
        basePrice += metodPrice;
    }

    finalPrice = basePrice; // сбрасываем цену к базовой

    const selectedRadio = document.querySelector(".delivery__radio:checked");
    if (selectedRadio) {
        const priceAddition = Number(selectedRadio.getAttribute("data-price"));
        finalPrice += priceAddition;
    }

    const selectedCheckboxes = document.querySelectorAll(
        ".plus__checkbox:checked"
    );
    selectedCheckboxes.forEach((checkbox) => {
        const checkboxPrice = Number(checkbox.getAttribute("data-price"));
        finalPrice += checkboxPrice;
    });

    handleChageTotalPrice();
};
// count
const countItems = document.querySelectorAll(".order__count_item");

countItems.forEach((item) => {
    item.addEventListener("click", (event) => {
        countItems.forEach((i) => {
            i.classList.remove("active");
        });
        event.currentTarget.classList.add("active");

        const sum = Number(event.currentTarget.getAttribute("data-price"));
        const count = event.currentTarget.getAttribute("data-count");

        if (count == "1") {
            finalPrice = sum;
        } else if (count == "2") {
            basePrice = sum * 2;
        } else {
            basePrice = sum * 3;
        }

        updateFinalPrice();
    });
});

// add class to label from radio
const radios = document.querySelectorAll(".delivery__radio");

radios.forEach((radio) => {
    radio.addEventListener("change", function () {
        document.querySelectorAll(".delivery__label").forEach((label) => {
            label.classList.remove("delivery__label_selected");
        });
        if (radio.checked) {
            radio.parentElement.classList.add("delivery__label_selected");
        }
        updateFinalPrice();
    });

    if (radio.checked) {
        radio.parentElement.classList.add("delivery__label_selected");
    }
});

updateFinalPrice();

// add class to label from checkbox
const checkboxes = document.querySelectorAll(".plus__checkbox");

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            checkbox.parentElement.classList.add("plus__label_selected");
        } else {
            checkbox.parentElement.classList.remove("plus__label_selected");
        }

        // Обновляем finalPrice, учитывая выбранный метод
        updateFinalPrice();
    });
});

// add class to label from metod radio
const metodRadios = document.querySelectorAll(".metod__radio");

metodRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
        document.querySelectorAll(".metod__label").forEach((label) => {
            label.classList.remove("metod__label_selected");
        });
        if (radio.checked) {
            radio.parentElement.classList.add("metod__label_selected");
        }

        const price = Number(radio.getAttribute("data-price"));
        finalPrice = basePrice;

        // Учитываем стоимость доставки
        const selectedDeliveryRadio = document.querySelector(
            ".delivery__radio:checked"
        );
        if (selectedDeliveryRadio) {
            const deliveryPrice = Number(
                selectedDeliveryRadio.getAttribute("data-price")
            );
            finalPrice += deliveryPrice;
        }

        // Учитываем стоимость выбранных чекбоксов
        const selectedCheckboxes = document.querySelectorAll(
            ".plus__checkbox:checked"
        );
        selectedCheckboxes.forEach((checkbox) => {
            const checkboxPrice = Number(checkbox.getAttribute("data-price"));
            finalPrice += checkboxPrice;
        });

        finalPrice += price;

        handleChageTotalPrice();
    });
});

// work with gallery
const gallery = new SimpleLightbox(".gallery li a", { captionDelay: 250 });
