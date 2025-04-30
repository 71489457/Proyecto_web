let currentIndex = 0;
const images = document.querySelectorAll(".carousel-image");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

function showImage(index) {
    images.forEach((img, i) => {
        img.classList.remove("active");
        if (i === index) img.classList.add("active");
    });
}

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    showImage(currentIndex);
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    showImage(currentIndex);
});

showImage(currentIndex);

