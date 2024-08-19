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

document.addEventListener('DOMContentLoaded', function () {
    const slides = document.getElementById('carouselSlides');
    const slideCount = slides.children.length;
    let currentIndex = 0;
    const intervalTime = 3000; // 3 seconds

    function goToSlide(index) {
        const offset = -index * 100;
        slides.style.transform = `translateX(${offset}%)`;
        currentIndex = index;
    }

    function nextSlide() {
        const nextIndex = (currentIndex + 1) % slideCount;
        goToSlide(nextIndex);
    }

    // Auto-slide functionality
    setInterval(nextSlide, intervalTime);

    // Navigation buttons
    document.getElementById('prevSlide').addEventListener('click', function () {
        const prevIndex = (currentIndex - 1 + slideCount) % slideCount;
        goToSlide(prevIndex);
    });

    document.getElementById('nextSlide').addEventListener('click', function () {
        nextSlide();
    });
});
