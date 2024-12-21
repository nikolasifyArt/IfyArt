// Function to animate the nav menu collapse and expand
async function animateMenuIn() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.remove('fadeOut'); // Remove any fade-out class
    navMenu.classList.add('fadeIn', 'show'); // Add fade-in and show classes
}

async function animateMenuOut() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.remove('fadeIn'); // Remove any fade-in class
    navMenu.classList.add('fadeOut'); // Add fade-out class
    await new Promise(resolve => setTimeout(resolve, 2500)); // Wait for 1.5 seconds for the fade-out animation
    navMenu.classList.remove('show'); // Ensure the menu is hidden after fade-out
}

// Toggle mobile menu on hamburger click
document.querySelector('.hamburger').addEventListener('click', async function () {
    const navMenu = document.querySelector('.nav-menu');

    // Toggle the 'show' class on the nav menu with animation
    if (navMenu.classList.contains('show')) {
        await animateMenuOut();
    } else {
        await animateMenuIn();
    }
});

// Close the menu on mouse leave with animation
document.querySelector('.nav-menu').addEventListener('mouseleave', async () => {
    await animateMenuOut();
});

// Outside click to close the nav menu
document.addEventListener('click', async function (event) {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    const isClickInside = navMenu.contains(event.target) || hamburger.contains(event.target);
    if (!isClickInside) {
        await animateMenuOut();
    }
});

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', async () => {
        await animateMenuOut();
    });
});
