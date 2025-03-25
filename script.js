// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const section = document.querySelector(href);
            section.scrollIntoView({ behavior: 'smooth' });
            if (window.innerWidth <= 768) {
                document.querySelector('.nav-links').classList.remove('active');
            }
        }
    });
});

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Fade-in Animation for Sections
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

// Add fade-in CSS dynamically
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

// // Gallery Modal Interaction
// if (document.querySelector('.gallery')) {
//     const galleryItems = document.querySelectorAll('.gallery-item');
//     const modal = document.querySelector('.gallery-modal');
//     const modalImg = document.querySelector('.modal-content');
//     const closeModal = document.querySelector('.close-modal');

//     galleryItems.forEach(item => {
//         item.addEventListener('click', () => {
//             const imgSrc = item.querySelector('img').src;
//             modalImg.src = imgSrc;
//             modal.classList.add('active');
//         });
//     });

//     closeModal.addEventListener('click', () => {
//         modal.classList.remove('active');
//     });

//     modal.addEventListener('click', (e) => {
//         if (e.target === modal) {
//             modal.classList.remove('active');
//         }
//     });
// }