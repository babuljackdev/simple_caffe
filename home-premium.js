// Mobile Navigation Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// Active Navigation Link Highlighting
function setActiveNavLink() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Remove active class from all links
        link.classList.remove('active');

        // Add active class to current page link
        if (currentPage.includes(linkPath) || 
            (currentPage === '/' && linkPath === 'index.html') ||
            (currentPage.endsWith('/') && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Call on page load
setActiveNavLink();
/* Premium Homepage JavaScript */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initNavbarScroll();
    initStatsCounter();
    initNewsletterForm();
    initFeaturedItems();
    init3DTiltEffect();
    initParallax();
    initMouseGlow();
});

/* Scroll Animations */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

/* Navbar Scroll Effect */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

/* Stats Counter Animation */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateCounter = (element) => {
        const target = parseFloat(element.getAttribute('data-target'));
        const isDecimal = target % 1 !== 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = isDecimal ? target.toFixed(1) : target;
            }
        };

        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                statNumbers.forEach(stat => animateCounter(stat));
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

/* Newsletter Form */
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const input = form.querySelector('input[type="email"]');
            const email = input.value.trim();
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            showNotification('Thank you for subscribing! 🎉', 'success');
            form.reset();
        });
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)' : 'linear-gradient(135deg, #C62828 0%, #B71C1C 100%)'};
        color: white;
        font-weight: 600;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

/* Featured Items Click Handler */
function initFeaturedItems() {
    const featuredItems = document.querySelectorAll('.featured-item');
    
    featuredItems.forEach(item => {
        const itemId = item.getAttribute('data-id');
        const itemCategory = item.getAttribute('data-category');
        
        if (itemId && itemCategory) {
            item.addEventListener('click', () => {
                window.location.href = `item-details.html?id=${itemId}`;
            });
            
            const viewBtn = item.querySelector('.featured-view-btn');
            if (viewBtn) {
                viewBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    window.location.href = `item-details.html?id=${itemId}`;
                });
            }
        }
    });
}

/* 3D Tilt Effect */
function init3DTiltEffect() {
    const cards = document.querySelectorAll('.card-3d, .glass-card-3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

/* Parallax Effect */
function initParallax() {
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
            }
        });
    }
}

/* Mouse Glow Effect */
function initMouseGlow() {
    const cards = document.querySelectorAll('.card-3d, .glass-card-3d');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 25px 80px rgba(0, 0, 0, 0.4), 0 0 40px rgba(76, 175, 80, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
        });
    });
}

/* Button Ripple Effect */
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        createRipple(e);
    }
});

function createRipple(event) {
    const button = event.target;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease;
        left: ${x}px;
        top: ${y}px;
        width: 100px;
        height: 100px;
        margin-left: -50px;
        margin-top: -50px;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

/* Add Animation Keyframes */
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* Smooth Scroll for Anchor Links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* Performance Optimization - Debounce */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/* Performance Optimization - Throttle */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* Apply throttle to scroll events */
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations
}, 100));

/* Accessibility - Keyboard Navigation */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }
});

/* Accessibility - ARIA Labels */
document.querySelectorAll('.btn').forEach(btn => {
    if (!btn.getAttribute('aria-label')) {
        btn.setAttribute('aria-label', btn.textContent.trim());
    }
});

/* Lazy Loading for Images */
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

/* Console Message */
console.log('%c🎉 Simple Café Premium Website Loaded!', 'background: linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%); color: white; font-size: 16px; padding: 12px 20px; border-radius: 8px;');
console.log('%c✨ Premium 3D Effects & Glassmorphism Active', 'color: #2E7D32; font-size: 14px; font-weight: bold;');
