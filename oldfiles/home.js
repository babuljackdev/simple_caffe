// Homepage JavaScript

// Newsletter Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show success message
            alert('Thank you for subscribing! You will receive our latest updates and offers.');
            
            // Reset form
            newsletterForm.reset();
        });
    }
    
    // Featured Item Click Handler
    const featuredItems = document.querySelectorAll('.featured-item');
    
    featuredItems.forEach(item => {
        const itemId = item.getAttribute('data-id');
        const itemCategory = item.getAttribute('data-category');
        
        if (itemId && itemCategory) {
            // Make entire featured item clickable
            item.addEventListener('click', () => {
                window.location.href = `item-details.html?id=${itemId}`;
            });
            
            // Also handle the "View Details" button click
            const viewBtn = item.querySelector('.featured-view-btn');
            if (viewBtn) {
                viewBtn.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent double navigation
                    window.location.href = `item-details.html?id=${itemId}`;
                });
            }
        }
    });
    
    // Animate stats on scroll
    const statsSection = document.querySelector('.stats-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    let animated = false;
    
    const animateStats = () => {
        if (animated) return;
        
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            animated = true;
            
            statNumbers.forEach(stat => {
                const targetValue = parseInt(stat.textContent);
                const suffix = stat.textContent.replace(/[0-9]/g, '');
                let currentValue = 0;
                const increment = targetValue / 50;
                
                const animate = () => {
                    currentValue += increment;
                    if (currentValue < targetValue) {
                        stat.textContent = Math.floor(currentValue) + suffix;
                        requestAnimationFrame(animate);
                    } else {
                        stat.textContent = targetValue + suffix;
                    }
                };
                
                animate();
            });
        }
    };
    
    window.addEventListener('scroll', animateStats);
    animateStats(); // Check on load
    
    // Smooth scroll for anchor links
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
    
    // Add parallax effect to hero
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < 600) {
                heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }
    
    // Testimonial card hover effect
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Offer card hover effect
    const offerCards = document.querySelectorAll('.offer-card');
    
    offerCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Featured item hover effect enhancement
    const featuredItemsEnhanced = document.querySelectorAll('.featured-item');
    
    featuredItemsEnhanced.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Button ripple effect
    const buttons = document.querySelectorAll('.btn, .btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
