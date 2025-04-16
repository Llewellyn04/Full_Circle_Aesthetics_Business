// Smooth scrolling for navigation links
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

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Fade-in animation for sections
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

// Add fade animation styles dynamically
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

// Services background image and description animation
const radioButtons = document.querySelectorAll('input[name="basic_carousel"]');
const rightZone = document.getElementById('right-zone');
const serviceTitle = document.getElementById('service-title');
const serviceDesc = document.getElementById('service-desc');
const serviceLink = document.getElementById('service-link');

radioButtons.forEach((radio) => {
    radio.addEventListener('change', () => {
        // Update background image
        const bg = radio.getAttribute('data-bg');
        if (bg) {
            rightZone.style.backgroundImage = `url(${bg})`;
            rightZone.style.backgroundSize = 'cover';
            rightZone.style.backgroundPosition = 'center';
            rightZone.style.transition = 'background-image 0.5s ease-in-out';
        }

        // Update description content
        const title = radio.getAttribute('data-title');
        const desc = radio.getAttribute('data-desc');
        const link = radio.getAttribute('data-link');

        // Reset animation by removing and re-adding the animation class
        serviceTitle.classList.remove('animate');
        serviceDesc.classList.remove('animate');
        serviceLink.classList.remove('animate');

        // Force reflow to restart animation
        void serviceTitle.offsetWidth;
        void serviceDesc.offsetWidth;
        void serviceLink.offsetWidth;

        // Update content
        serviceTitle.textContent = title;
        serviceDesc.textContent = desc;
        serviceLink.setAttribute('href', link);

        // Trigger animation
        serviceTitle.classList.add('animate');
        serviceDesc.classList.add('animate');
        serviceLink.classList.add('animate');
    });
});

// Trigger default background and description on load
window.addEventListener('DOMContentLoaded', () => {
    const selected = document.querySelector('input[name="basic_carousel"]:checked');
    if (selected) selected.dispatchEvent(new Event('change'));

    // Secondary Navigation Active State
    const secondaryNav = document.querySelector('.secondary-nav');
    if (secondaryNav) {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const secondaryNavLinks = secondaryNav.querySelectorAll('a');

        secondaryNavLinks.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop();
            if (linkPath === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
});