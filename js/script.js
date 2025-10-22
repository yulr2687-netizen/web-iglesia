// Carousel scroll functions
function scrollDiaconos(direction) {
    const container = document.getElementById('diaconos-carousel');
    container.scrollBy({ left: direction * 300, behavior: 'smooth' });
}

function scrollServicios(direction) {
    const container = document.getElementById('servicios-carousel');
    container.scrollBy({ left: direction * 300, behavior: 'smooth' });
}

function scrollEventos(direction) {
    const container = document.getElementById('eventos-carousel');
    container.scrollBy({ left: direction * 300, behavior: 'smooth' });
}

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    const mobileCloseButton = document.getElementById('mobile-close-button');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMobileMenu = () => {
        mobileMenu.classList.toggle('translate-x-full');
        mobileOverlay.classList.toggle('is-active');
    };

    const closeMobileMenu = () => {
        mobileMenu.classList.add('translate-x-full');
        mobileOverlay.classList.remove('is-active');
    };

    menuButton.addEventListener('click', toggleMobileMenu);
    mobileCloseButton.addEventListener('click', closeMobileMenu);
    mobileOverlay.addEventListener('click', closeMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Intersection Observer for fade-in animation
    const fadeInElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeInElements.forEach(element => {
        observer.observe(element);
    });
});

//Funcionalidades de los mapas
const googleMapsButton = document.getElementById('google-maps-button');
const wazeButton = document.getElementById('waze-button');

googleMapsButton.addEventListener('click', () => {
    const googleMapsUrl = 'https://maps.app.goo.gl/nVBM2GnDNeU9onw78';
    window.open(googleMapsUrl, '_blank');
});

wazeButton.addEventListener('click', () => {
    const wazeUrl = 'https://waze.com/ul/h63vv87r1r';
    window.open(wazeUrl, '_blank');
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("img").forEach(img => {
    img.oncontextmenu = () => false;  // bloquea clic derecho
  });
});