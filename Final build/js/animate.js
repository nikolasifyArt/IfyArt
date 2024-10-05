// Function to animate the nav menu collapse and expand
function animateMenuIn() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.remove('fadeOut'); // Remove any fade-out class
    navMenu.classList.add('fadeIn'); // Add fade-in class
    navMenu.classList.add('show'); // Ensure the menu is visible
}

function animateMenuOut() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.remove('fadeIn'); // Remove any fade-in class
    navMenu.classList.add('fadeOut'); // Add fade-out class
    setTimeout(() => {
        navMenu.classList.remove('show'); // Ensure the menu is hidden after fade-out
    }, 1500); // 1.5 seconds for the fade-out animation
}

// Toggle mobile menu on hamburger click
document.querySelector('.hamburger').addEventListener('click', function () {
    const navMenu = document.querySelector('.nav-menu');

    // Toggle the 'show' class on the nav menu with animation
    if (navMenu.classList.contains('show')) {
        animateMenuOut();
    } else {
        animateMenuIn();
    }

    // Outside click to close the nav menu
    document.addEventListener('click', function (event) {
        const isClickInside = navMenu.contains(event.target) || document.querySelector('.hamburger').contains(event.target);
        if (!isClickInside) {
            animateMenuOut();
        }
    });
});

// Close the menu on mouse leave with animation
document.querySelector('.nav-menu').addEventListener('mouseleave', function () {
    animateMenuOut();
});

// Click outside and mouseleave listener (to be run once)
function checkMenuStatus() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    document.addEventListener('click', function (event) {
        const isClickInside = navMenu.contains(event.target) || hamburger.contains(event.target);
        if (!isClickInside) {
            animateMenuOut();
        }
    });

    navMenu.addEventListener('mouseleave', function () {
        animateMenuOut();
    });
}

checkMenuStatus();
