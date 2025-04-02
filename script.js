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

function initSwiper() {
    if (window.innerWidth > 768) {
        if (!swiper) {
            swiper = new Swiper('.swiper-container', {
                slidesPerView: 3,
                spaceBetween: 10, // Reduced from 30 to make gaps smaller
                centeredSlides: true,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: true,
                },
                navigation: {
                    nextEl: '.services-next',
                    prevEl: '.services-prev',
                },
                breakpoints: {
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 5, // Reduced from 20
                    },
                    480: {
                        slidesPerView: 3,
                        spaceBetween: 5, // Reduced from 10
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
    }
}

// Initial call
initSwiper();

// Handle resize
window.addEventListener('resize', () => {
    initSwiper();
});

document.querySelector('.services-prev').addEventListener('click', () => {
    swiper.slidePrev();
});

document.querySelector('.services-next').addEventListener('click', () => {
    swiper.slideNext();
});