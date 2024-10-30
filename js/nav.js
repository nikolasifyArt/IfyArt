



// Carousel functionality
const carousel = document.getElementById("carousel");
const figures = carousel.getElementsByTagName("figure");
let currentIndex = 0;

function showNextImage() {
  figures[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + 1) % figures.length;
  figures[currentIndex].classList.add("active");
}

setInterval(showNextImage, 10000); // Change image every 5 seconds
