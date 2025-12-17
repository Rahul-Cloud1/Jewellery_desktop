// Parallax effect for hero/banner background
window.addEventListener('scroll', function() {
    document.querySelectorAll('.parallax-bg').forEach(bg => {
        const scrolled = window.scrollY;
        bg.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
});

// Add parallax-bg div to hero/banner/main-header if not present
['.hero', '.banner', '.main-header'].forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
        if (!el.querySelector('.parallax-bg')) {
            const bg = document.createElement('div');
            bg.className = 'parallax-bg';
            el.prepend(bg);
        }
    });
});

// Smooth scroll for anchor links (for browsers that don't support CSS smooth scroll)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
// Add ripple effect to buttons
document.querySelectorAll('button, .btn').forEach(btn => {
    btn.classList.add('ripple');
    btn.addEventListener('click', function(e) {
        const circle = document.createElement('span');
        circle.classList.add('ripple-effect');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        circle.style.width = circle.style.height = size + 'px';
        circle.style.left = (e.clientX - rect.left - size/2) + 'px';
        circle.style.top = (e.clientY - rect.top - size/2) + 'px';
        btn.appendChild(circle);
        setTimeout(() => circle.remove(), 600);
    });
});
.clicked-effect {
    box-shadow: 0 0 0 4px #0078d7aa !important;
    transform: scale(0.97) !important;
}
`;
document.head.appendChild(style);
document.addEventListener('DOMContentLoaded', () => {








// Utility: Add pointer cursor to all clickable elements
document.querySelectorAll('a, button, .clickable').forEach(el => {
    el.style.cursor = 'pointer';
});

// Click feedback effect
document.querySelectorAll('a[href], button, .clickable').forEach(el => {
    el.addEventListener('click', function(e) {
        if (el.tagName.toLowerCase() === 'a' && el.getAttribute('href')) {
            return;
        }
        el.classList.add('clicked-effect');
        setTimeout(() => el.classList.remove('clicked-effect'), 200);
    });
});

// Add a simple feedback effect for clicks
const style = document.createElement('style');
style.innerHTML = `
.clicked-effect {
    box-shadow: 0 0 0 4px #0078d7aa !important;
    transform: scale(0.97) !important;
}
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Hero Button Smooth Scroll ---
    const heroBtn = document.querySelector('.hero-text button');
    if (heroBtn) {
        heroBtn.addEventListener('click', e => {
            e.preventDefault();
            const bestsellers = document.querySelector('.bestsellers');
            if (bestsellers) bestsellers.scrollIntoView({behavior: 'smooth'});
        });
    }

    // --- 2. Bestsellers Tabs Functionality ---
    const tabs = document.querySelectorAll('.bestsellers .tabs button');
    const products = document.querySelector('.bestsellers .products');
    if (tabs.length && products) {
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                // Demo: swap product images/titles for each tab
                const type = this.textContent.trim();
                let html = '';
                for (let i = 0; i < 3; i++) {
                    html += `<div class="card">
                        <img src="assets/${type}.png" class="img" alt="${type}">
                        <div class="card-info">
                            <div class="card-title">${type.toUpperCase()} DESIGN ${i+1}</div>
                            <div class="card-price">₹${79904 + i*1000} <span class="old">₹${99904 + i*1000}</span></div>
                        </div>
                    </div>`;
                }
                products.innerHTML = html;
            });
        });
    }

    // --- 3. Collection Tabs Filter (Demo) ---
    const collectionTabs = document.querySelectorAll('.collection-tabs .tab');
    if (collectionTabs.length) {
        collectionTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                collectionTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                // Optionally filter products by collection
            });
        });
    }

    // --- 4. Animated Testimonials Carousel ---
    const testimonials = document.querySelectorAll('.testimonial-list .testimonial');
    if (testimonials.length > 1) {
        let idx = 0;
        setInterval(() => {
            testimonials.forEach((t, i) => {
                t.style.opacity = (i === idx) ? '1' : '0.3';
                t.style.transform = (i === idx) ? 'scale(1.08)' : 'scale(0.95)';
            });
            idx = (idx + 1) % testimonials.length;
        }, 2500);
    }

    // --- 5. Scroll Animation for Sections (fix: add .reveal-animate only after DOM loaded) ---
    const revealSections = document.querySelectorAll('section, .features, .brands');
    revealSections.forEach(sec => sec.classList.add('reveal-animate'));
    const revealOnScroll = () => {
        const trigger = window.innerHeight * 0.92;
        revealSections.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            if (rect.top < trigger) {
                sec.classList.remove('reveal-animate');
            } else {
                sec.classList.add('reveal-animate');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});