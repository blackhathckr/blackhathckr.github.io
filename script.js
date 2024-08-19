document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuClose = document.getElementById('menu-close');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.remove('-translate-x-full');
        mobileMenu.classList.add('translate-x-0');
    });

    menuClose.addEventListener('click', () => {
        mobileMenu.classList.add('-translate-x-full');
        mobileMenu.classList.remove('translate-x-0');
    });

    // Close menu when clicking outside of the menu
    window.addEventListener('click', (event) => {
        if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            mobileMenu.classList.add('-translate-x-full');
            mobileMenu.classList.remove('translate-x-0');
        }
    });
});
// Get the button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// When the user scrolls down 100px from the top of the document, show the button
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.classList.remove('hidden');
    } else {
        scrollToTopBtn.classList.add('hidden');
    }
};

// When the user clicks on the button, scroll to the top of the document
scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
const slides = document.getElementById('carouselSlides');
const totalSlides = slides.children.length;
let currentSlide = 0;

document.getElementById('nextSlide').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
});

document.getElementById('prevSlide').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
});
