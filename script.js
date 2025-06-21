document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Navigation
    // ======================
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Ferme le menu mobile après clic
                const navbarCollapse = document.querySelector('.navbar-collapse.show');
                if (navbarCollapse) {
                    const toggler = document.querySelector('.navbar-toggler');
                    toggler.click();
                }
            }
        });
    });

    // Navbar scroll effect
    const nav = document.querySelector('.holographic-nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ======================
    // Animations des compétences
    // ======================
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const targetWidth = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 100);
        });
    }

    // ======================
    // Initialisation des librairies
    // ======================
    // Particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS.load('particles-js', 'assets/particles.json', function() {
            console.log('Particles.js loaded');
        });
    }

    // AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            disable: function() {
                return window.innerWidth < 768; // Désactive AOS sur mobile
            }
        });

        // Réanime les barres de progression quand la section est visible
        document.addEventListener('aos:in', ({ detail }) => {
            if (detail.classList.contains('skill-card')) {
                animateProgressBars();
            }
        });
    }

    // ======================
    // Autres fonctionnalités
    // ======================
    // Met à jour l'année dans le footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Anime les barres au chargement (si la section est visible)
    setTimeout(animateProgressBars, 500);
});

// ======================
// Optimisation pour le mobile
// ======================
// Réinitialise les animations quand la fenêtre est redimensionnée
window.addEventListener('resize', function() {
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});