// script.js
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const section = document.querySelector(href);
            const offset = document.querySelector('.navbar').offsetHeight;
            const sectionPosition = section.offsetTop - offset;
            window.scrollTo({ top: sectionPosition, behavior: 'smooth' });
            if (window.innerWidth <= 768) {
                document.querySelector('.nav-links').classList.remove('active');
            }
        }
    });
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

const sections = document.querySelectorAll('section');
const options = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, options);

sections.forEach(section => {
    section.classList.add('fade-start');
    observer.observe(section);
});

const style = document.createElement('style');
style.textContent = `
    .fade-start {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Swiper initialization
let swiper;
let prevButton, nextButton;

function initSwiper() {
    if (window.innerWidth > 768) {
        if (!swiper) {
            // Ensure buttons are in the DOM for desktop
            prevButton = document.querySelector('.swiper-button-prev');
            nextButton = document.querySelector('.swiper-button-next');
            if (!prevButton) {
                prevButton = document.createElement('div');
                prevButton.className = 'swiper-button-prev';
                document.querySelector('.swiper-container').appendChild(prevButton);
            }
            if (!nextButton) {
                nextButton = document.createElement('div');
                nextButton.className = 'swiper-button-next';
                document.querySelector('.swiper-container').appendChild(nextButton);
            }

            swiper = new Swiper('.swiper-container', {
                slidesPerView: 3,
                spaceBetween: 30,
                centeredSlides: true,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    480: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                },
            });

            document.querySelectorAll('.swiper-slide').forEach(slide => {
                slide.addEventListener('click', () => {
                    swiper.autoplay.stop();
                });
            });
        }
    } else {
        if (swiper) {
            swiper.destroy(true, true); // Destroy Swiper on mobile
            swiper = null;
        }
        // Remove navigation buttons on mobile
        prevButton = document.querySelector('.swiper-button-prev');
        nextButton = document.querySelector('.swiper-button-next');
        if (prevButton) prevButton.remove();
        if (nextButton) nextButton.remove();
    }
}

// Initial call
initSwiper();

// Handle resize
window.addEventListener('resize', () => {
    initSwiper();
});