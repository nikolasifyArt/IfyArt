// Add your JavaScript code here
document.addEventListener('DOMContentLoaded', (event) => {
    // Carousel functionality
    const carousel = document.getElementById('carousel');
    const figures = carousel.getElementsByTagName('figure');
    let currentIndex = 0;

    function showNextImage() {
        figures[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % figures.length;
        figures[currentIndex].style.display = 'block';
    }

    // Change image every 5 seconds
    setInterval(showNextImage, 5000);

    // Mobile menu toggle
    const menuToggle = document.querySelector('.nav-container ☰');
    const navLinks = document.querySelector('.nav-container ul');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
});