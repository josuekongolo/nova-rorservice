/**
 * Nova Rørservice AS - Main JavaScript
 * Professional Plumbing Website
 */

(function() {
    'use strict';

    // ===========================================
    // DOM Elements
    // ===========================================
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const backToTopBtn = document.getElementById('back-to-top');
    const contactForm = document.getElementById('contact-form');

    // ===========================================
    // Header Scroll Effect
    // ===========================================
    function handleHeaderScroll() {
        if (!header) return;

        const scrollY = window.scrollY;
        const scrollThreshold = 50;

        if (scrollY > scrollThreshold) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    }

    // ===========================================
    // Mobile Menu Toggle
    // ===========================================
    function toggleMobileMenu() {
        if (!mobileMenuBtn || !mobileNav) return;

        const isOpen = mobileNav.classList.contains('active');

        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    function openMobileMenu() {
        mobileMenuBtn.classList.add('active');
        mobileNav.classList.add('active');
        document.body.classList.add('menu-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
    }

    function closeMobileMenu() {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.classList.remove('menu-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }

    // Close mobile menu when clicking on a link
    function handleMobileNavClick(e) {
        if (e.target.classList.contains('mobile-nav__link') ||
            e.target.classList.contains('mobile-nav__cta')) {
            closeMobileMenu();
        }
    }

    // Close mobile menu on resize to desktop
    function handleResize() {
        if (window.innerWidth >= 1024) {
            closeMobileMenu();
        }
    }

    // ===========================================
    // Back to Top Button
    // ===========================================
    function handleBackToTop() {
        if (!backToTopBtn) return;

        const scrollY = window.scrollY;
        const showThreshold = 300;

        if (scrollY > showThreshold) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // ===========================================
    // Smooth Scroll for Anchor Links
    // ===========================================
    function handleSmoothScroll(e) {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;

        const targetId = link.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        e.preventDefault();

        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Close mobile menu if open
        closeMobileMenu();
    }

    // ===========================================
    // Contact Form Handling
    // ===========================================
    function handleFormSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formMessage = document.getElementById('form-message');
        const submitBtn = form.querySelector('button[type="submit"]');

        // Get form data
        const formData = {
            name: form.querySelector('#name').value,
            email: form.querySelector('#email').value,
            phone: form.querySelector('#phone').value,
            address: form.querySelector('#address').value,
            inquiryType: form.querySelector('#inquiry-type').value,
            message: form.querySelector('#message').value
        };

        // Validate form
        if (!validateForm(formData)) {
            showFormMessage('Vennligst fyll ut alle obligatoriske felt.', 'error');
            return;
        }

        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg class="btn__icon" style="animation: spin 1s linear infinite;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                <line x1="2" y1="12" x2="6" y2="12"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
            </svg>
            Sender...
        `;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            showFormMessage(
                'Takk for din henvendelse! Vi har mottatt meldingen din og vil svare deg så snart som mulig, vanligvis innen samme arbeidsdag.',
                'success'
            );

            // Reset form
            form.reset();

            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <svg class="btn__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                Send Henvendelse
            `;

            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1500);
    }

    function validateForm(data) {
        return data.name && data.email && data.phone && data.inquiryType && data.message;
    }

    function showFormMessage(message, type) {
        const formMessage = document.getElementById('form-message');
        if (!formMessage) return;

        formMessage.textContent = message;
        formMessage.className = 'form-message';
        formMessage.classList.add(`form-message--${type}`);
        formMessage.style.display = 'block';

        // Hide message after 10 seconds for success
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 10000);
        }
    }

    // ===========================================
    // Intersection Observer for Animations
    // ===========================================
    function initAnimations() {
        const animatedElements = document.querySelectorAll('.service-card, .why-us__card, .value-card, .testimonial-card, .price-table, .service-block');

        if (!animatedElements.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 50);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach((el) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
    }

    // ===========================================
    // Phone Number Click Tracking
    // ===========================================
    function trackPhoneClicks() {
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

        phoneLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Track phone click (can be integrated with analytics)
                console.log('Phone number clicked:', this.href);
            });
        });
    }

    // ===========================================
    // Initialize
    // ===========================================
    function init() {
        // Scroll event listeners
        window.addEventListener('scroll', () => {
            handleHeaderScroll();
            handleBackToTop();
        }, { passive: true });

        // Mobile menu
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        }

        if (mobileNav) {
            mobileNav.addEventListener('click', handleMobileNavClick);
        }

        // Resize event
        window.addEventListener('resize', handleResize);

        // Back to top
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', scrollToTop);
        }

        // Smooth scroll
        document.addEventListener('click', handleSmoothScroll);

        // Contact form
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }

        // Initialize animations
        initAnimations();

        // Track phone clicks
        trackPhoneClicks();

        // Initial check for scroll position
        handleHeaderScroll();
        handleBackToTop();
    }

    // Run init when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Add CSS for spinner animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

})();
