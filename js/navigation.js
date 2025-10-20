// Navigation function
function navigateToPage(pageId) {
    // Update active page
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update active nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo(0, 0);
    
    // Close any open sidebars when navigating
    closeAllSidebars();
}

// Enhanced mobile menu functionality
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    
    if (!mobileMenuBtn || !mainNav) return;
    
    mobileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isExpanded = mainNav.classList.contains('active');
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
        
        // Update hamburger icon
        const icon = mobileMenuBtn.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            if (mobileMenuBtn) {
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

// Enhanced touch interactions
function setupTouchInteractions() {
    // Add touch feedback to buttons
    document.querySelectorAll('.btn, .product-actions button').forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // Prevent zoom on double tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// Set up navigation event listeners
function setupNavigation() {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            navigateToPage(pageId);
            
            // Close mobile menu if open
            const mainNav = document.getElementById('main-nav');
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                const mobileMenuBtn = document.getElementById('mobile-menu-btn');
                if (mobileMenuBtn) {
                    mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // Shop Now button
    const shopNowBtn = document.getElementById('shop-now-btn');
    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToPage('shop');
        });
    }

    // Product detail page interactions
    const decreaseQuantity = document.getElementById('decrease-quantity');
    const increaseQuantity = document.getElementById('increase-quantity');
    const quantityDisplay = document.getElementById('quantity-display');
    
    if (decreaseQuantity && increaseQuantity && quantityDisplay) {
        let quantity = 1;
        
        decreaseQuantity.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                quantityDisplay.textContent = quantity;
            }
        });

        increaseQuantity.addEventListener('click', () => {
            quantity++;
            quantityDisplay.textContent = quantity;
        });
    }

    // Product thumbnail interactions
    const productThumbnails = document.querySelectorAll('.product-thumbnail');
    productThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Remove active class from all thumbnails
            productThumbnails.forEach(t => t.classList.remove('active'));
            // Add active class to clicked thumbnail
            thumbnail.classList.add('active');
        });
    });

    // Form submissions
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}!`);
            newsletterForm.reset();
        });
    }
    
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Login functionality would be implemented in a real application.');
            loginForm.reset();
            closeSidebar('account');
        });
    }
    
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Registration functionality would be implemented in a real application.');
            registerForm.reset();
            closeSidebar('account');
        });
    }
    
    // Filter and sort
    const applyFiltersBtn = document.getElementById('apply-filters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyFilters);
    }
    
    const resetFiltersBtn = document.getElementById('reset-filters');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', resetFilters);
    }
    
    const sortOptions = document.getElementById('sort-options');
    if (sortOptions) {
        sortOptions.addEventListener('change', applySorting);
    }
    
    // Price range slider
    const priceRange = document.getElementById('price-range');
    const currentPrice = document.getElementById('current-price');
    if (priceRange && currentPrice) {
        priceRange.addEventListener('input', function() {
            currentPrice.textContent = `€${this.value}`;
        });
    }
    
// Add to js/navigation.js - Footer navigation setup
function setupFooterNavigation() {
    // Add event listeners for footer navigation links
    document.querySelectorAll('.footer-column a.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            
            // Special handling for legal pages that might be separate files
            if (isLegalPage(pageId)) {
                // For demo purposes, we'll navigate to the page within the SPA
                // In a real implementation, these might be separate HTML files
                navigateToPage(pageId);
            } else {
                navigateToPage(pageId);
            }
            
            // Close mobile menu if open
            const mainNav = document.getElementById('main-nav');
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                const mobileMenuBtn = document.getElementById('mobile-menu-btn');
                if (mobileMenuBtn) {
                    mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
}

// Check if a page is a legal page
function isLegalPage(pageId) {
    const legalPages = ['terms', 'privacy', 'reviews-policy', 'cookies', 'help', 'delivery', 'returns'];
    return legalPages.includes(pageId);
}

// Add legal pages to the navigation system
function setupLegalPages() {
    // Create legal pages if they don't exist
    const legalPages = [
        { id: 'terms', title: 'Terms & Conditions', description: 'Please read these terms carefully before using our services' },
        { id: 'privacy', title: 'Privacy Policy', description: 'How we collect, use, and protect your information' },
        { id: 'reviews-policy', title: 'Customer Reviews Policy', description: 'Guidelines for submitting and moderating customer reviews' },
        { id: 'cookies', title: 'Cookie Preferences', description: 'Manage your cookie settings and preferences' },
        { id: 'help', title: 'Help Center', description: 'Find answers to common questions and get support' },
        { id: 'delivery', title: 'Delivery Information', description: 'Shipping options and delivery timelines for Ireland' },
        { id: 'returns', title: 'Returns Policy', description: 'Our hassle-free returns and exchanges process for Ireland' }
    ];

    legalPages.forEach(page => {
        // Check if page already exists
        if (!document.getElementById(page.id)) {
            createLegalPage(page);
        }
    });
}

function createLegalPage(pageInfo) {
    const main = document.querySelector('main');
    if (!main) return;

    const page = document.createElement('section');
    page.id = pageInfo.id;
    page.className = 'page';
    
    // Basic legal page template
    page.innerHTML = `
        <div class="page-header">
            <div class="container">
                <h1>${pageInfo.title}</h1>
                <p>${pageInfo.description}</p>
            </div>
        </div>
        
        <div class="container">
            <div class="legal-page">
                <div class="legal-content">
                    <h1>${pageInfo.title}</h1>
                    
                    <div class="page-content" id="${pageInfo.id}-content">
                        <!-- Content will be loaded dynamically or statically -->
                        <p>This is the ${pageInfo.title} page. Content would be loaded here.</p>
                        <p>In a full implementation, this would contain the complete legal text for ${pageInfo.title}.</p>
                    </div>
                    
                    <div class="last-updated">
                        Last updated: December 2023
                    </div>
                    
                    <a href="#" class="back-to-top">Back to Top</a>
                </div>
            </div>
        </div>
    `;
    
    main.appendChild(page);
    
    // Add back to top functionality
    const backToTop = page.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Update the setupNavigation function to include footer navigation
function setupNavigation() {
    // ... existing navigation code ...
    
    // Add footer navigation
    setupFooterNavigation();
    setupLegalPages();
    
    // ... rest of existing navigation code ...
}

    // Close sidebars when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllSidebars();
        }
    });
}

