// Application state
window.currentProduct = null;

// Initialize the application
function init() {
    // Set current product to first product for demo
    window.currentProduct = products[0];
    updateProductDetail();
    
    // Render products
    renderFeaturedProducts();
    renderShopProducts();
    renderRelatedProducts();
    
    // Set up functionality
    setupMobileMenu();
    setupTouchInteractions();
    setupNavigation();
    setupCart();
    setupWishlist();
    setupSearch();
    setupSidebars();
    
    // Ensure all sidebars are closed on initialization
    closeAllSidebars();
}

// Sidebar functions
function openSidebar(sidebarType) {
    // Close all sidebars first
    closeAllSidebars();
    
    // Open the requested sidebar
    const sidebar = document.getElementById(`${sidebarType}-sidebar`);
    const overlay = document.getElementById(`${sidebarType}-overlay`);
    
    if (sidebar) {
        sidebar.classList.add('active');
    }
    if (overlay) {
        overlay.classList.add('active');
    }
    
    document.body.style.overflow = 'hidden';
    
    // For search sidebar, focus the input
    if (sidebarType === 'search') {
        setTimeout(() => {
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.focus();
            }
        }, 300);
        showSearchSuggestions();
    }
}

function closeSidebar(sidebarType) {
    const sidebar = document.getElementById(`${sidebarType}-sidebar`);
    const overlay = document.getElementById(`${sidebarType}-overlay`);
    
    if (sidebar) {
        sidebar.classList.remove('active');
    }
    if (overlay) {
        overlay.classList.remove('active');
    }
    
    document.body.style.overflow = '';
    
    // For search sidebar, clear the input
    if (sidebarType === 'search') {
        clearSearch();
    }
}

function closeAllSidebars() {
    document.querySelectorAll('.sidebar').forEach(sidebar => {
        sidebar.classList.remove('active');
    });
    document.querySelectorAll('.overlay').forEach(overlay => {
        overlay.classList.remove('active');
    });
    document.body.style.overflow = '';
    
    // Clear search when closing all sidebars
    clearSearch();
}

function setupSidebars() {
    // Sidebar toggles
    const searchBtn = document.getElementById('search-btn');
    const wishlistBtn = document.getElementById('wishlist-btn');
    const cartBtn = document.getElementById('cart-btn');
    const accountBtn = document.getElementById('account-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openSidebar('search');
        });
    }

    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openSidebar('wishlist');
        });
    }

    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openSidebar('cart');
        });
    }

    if (accountBtn) {
        accountBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openSidebar('account');
        });
    }

    // Sidebar close buttons
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const wishlistCloseBtn = document.getElementById('wishlist-close-btn');
    const searchCloseBtn = document.getElementById('search-close-btn');
    const accountCloseBtn = document.getElementById('account-close-btn');
    
    if (cartCloseBtn) {
        cartCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeSidebar('cart');
        });
    }
    
    if (wishlistCloseBtn) {
        wishlistCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeSidebar('wishlist');
        });
    }
    
    if (searchCloseBtn) {
        searchCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeSidebar('search');
        });
    }
    
    if (accountCloseBtn) {
        accountCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeSidebar('account');
        });
    }

    // Overlay clicks
    const cartOverlay = document.getElementById('cart-overlay');
    const wishlistOverlay = document.getElementById('wishlist-overlay');
    const searchOverlay = document.getElementById('search-overlay');
    const accountOverlay = document.getElementById('account-overlay');
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => closeSidebar('cart'));
    }
    if (wishlistOverlay) {
        wishlistOverlay.addEventListener('click', () => closeSidebar('wishlist'));
    }
    if (searchOverlay) {
        searchOverlay.addEventListener('click', () => closeSidebar('search'));
    }
    if (accountOverlay) {
        accountOverlay.addEventListener('click', () => closeSidebar('account'));
    }

    // Continue shopping
    const continueShopping = document.querySelector('.continue-shopping');
    if (continueShopping) {
        continueShopping.addEventListener('click', () => closeSidebar('cart'));
    }
}

// Notification function
function showNotification(message) {
    const notification = document.getElementById('notification');
    if (!notification) return;
    
    const notificationText = notification.querySelector('span');
    if (notificationText) {
        notificationText.textContent = message;
    }
    
    notification.classList.add('active');
    
    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}


// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

function setupAccountRedirect() {
    // Account button in header
    const accountBtn = document.getElementById('account-btn');
    if (accountBtn) {
        accountBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = 'FORM.html';
        });
    }
    
    // Account links in navigation and footer
    document.querySelectorAll('a.nav-link[data-page="account"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'FORM.html';
        });
    });
    
    // Hide account sidebar since we're redirecting
    const accountSidebar = document.getElementById('account-sidebar');
    const accountOverlay = document.getElementById('account-overlay');
    if (accountSidebar) accountSidebar.style.display = 'none';
    if (accountOverlay) accountOverlay.style.display = 'none';
}

// Update the init function
function init() {
    // ... your existing init code ...
    
    setupAccountRedirect();
    
    // ... rest of your init code ...
}

// Updated setupAccountRedirect function - fix search bar issue
function setupAccountRedirect() {
    // Only handle account button, not search button
    const accountBtn = document.getElementById('account-btn');
    if (accountBtn) {
        accountBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = 'FORM.html';
        });
    }
    
    // Account links in navigation and footer (but not search)
    document.querySelectorAll('a.nav-link[data-page="account"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'FORM.html';
        });
    });
    
    // Hide account sidebar since we're redirecting
    const accountSidebar = document.getElementById('account-sidebar');
    const accountOverlay = document.getElementById('account-overlay');
    if (accountSidebar) accountSidebar.style.display = 'none';
    if (accountOverlay) accountOverlay.style.display = 'none';
}

// Updated setupSidebars function - ensure search works properly
function setupSidebars() {
    // Sidebar toggles - make sure search is handled separately
    const searchBtn = document.getElementById('search-btn');
    const wishlistBtn = document.getElementById('wishlist-btn');
    const cartBtn = document.getElementById('cart-btn');
    
    // Search button - open search sidebar
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openSidebar('search');
        });
    }

    // Wishlist button - open wishlist sidebar
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openSidebar('wishlist');
        });
    }

    // Cart button - open cart sidebar
    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openSidebar('cart');
        });
    }

    // Sidebar close buttons
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const wishlistCloseBtn = document.getElementById('wishlist-close-btn');
    const searchCloseBtn = document.getElementById('search-close-btn');
    
    if (cartCloseBtn) {
        cartCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeSidebar('cart');
        });
    }
    
    if (wishlistCloseBtn) {
        wishlistCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeSidebar('wishlist');
        });
    }
    
    if (searchCloseBtn) {
        searchCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeSidebar('search');
        });
    }

    // Overlay clicks
    const cartOverlay = document.getElementById('cart-overlay');
    const wishlistOverlay = document.getElementById('wishlist-overlay');
    const searchOverlay = document.getElementById('search-overlay');
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => closeSidebar('cart'));
    }
    if (wishlistOverlay) {
        wishlistOverlay.addEventListener('click', () => closeSidebar('wishlist'));
    }
    if (searchOverlay) {
        searchOverlay.addEventListener('click', () => closeSidebar('search'));
    }

    // Continue shopping
    const continueShopping = document.querySelector('.continue-shopping');
    if (continueShopping) {
        continueShopping.addEventListener('click', () => closeSidebar('cart'));
    }
}

// Make sure search functionality is properly initialized
function setupSearchFunctionality() {
    const searchInput = document.getElementById('search-input');
    const searchClearBtn = document.getElementById('search-clear-btn');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        
        if (query.length > 0) {
            if (searchClearBtn) {
                searchClearBtn.style.display = 'flex';
            }
            performSearch(query);
        } else {
            if (searchClearBtn) {
                searchClearBtn.style.display = 'none';
            }
            showSearchSuggestions();
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query.length > 0) {
                performSearch(query);
            }
        }
    });

    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', clearSearch);
    }

    // Suggestion tags
    document.querySelectorAll('.suggestion-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = tag.textContent;
                performSearch(tag.textContent);
            }
        });
    });

    // Category suggestions
    document.querySelectorAll('.category-suggestion').forEach(suggestion => {
        suggestion.addEventListener('click', () => {
            const category = suggestion.querySelector('span').textContent;
            navigateToPage('shop');
            closeSidebar('search');
            
            // In a real app, we would filter products by category
            setTimeout(() => {
                alert(`Showing products in: ${category}`);
            }, 500);
        });
    });
}

// Updated init function
function init() {
    // Set current product to first product for demo
    window.currentProduct = products[0];
    updateProductDetail();
    
    // Render products
    renderFeaturedProducts();
    renderShopProducts();
    renderRelatedProducts();
    
    // Set up functionality
    setupMobileMenu();
    setupTouchInteractions();
    setupNavigation();
    setupCart();
    setupWishlist();
    setupSearchFunctionality(); // Use the new search setup
    setupSidebars(); // Use the updated sidebar setup
    setupAccountRedirect(); // Add account redirect
    
    // Ensure all sidebars are closed on initialization
    closeAllSidebars();
}