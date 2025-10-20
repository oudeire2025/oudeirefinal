// Wishlist functions
let wishlist = [];

function addToWishlist(product) {
    // Check if product is already in wishlist
    const existingItem = wishlist.find(item => item.id === product.id);
    
    if (!existingItem) {
        wishlist.push(product);
        
        // Save to localStorage
        localStorage.setItem('oudEireWishlist', JSON.stringify(wishlist));
        
        // Update UI
        updateWishlistUI();
    }
}

function updateWishlistUI() {
    // Update wishlist count
    const wishlistCount = document.querySelector('.wishlist-count');
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }
    
    // Update wishlist items
    const wishlistItems = document.getElementById('wishlist-items');
    const wishlistEmpty = document.getElementById('wishlist-empty');
    
    if (!wishlistItems || !wishlistEmpty) return;
    
    wishlistItems.innerHTML = '';
    
    if (wishlist.length === 0) {
        wishlistEmpty.classList.add('active');
        wishlistItems.classList.remove('active');
    } else {
        wishlistEmpty.classList.remove('active');
        wishlistItems.classList.add('active');
        
        wishlist.forEach(item => {
            const wishlistItem = document.createElement('div');
            wishlistItem.className = 'sidebar-item';
            wishlistItem.innerHTML = `
                <div class="sidebar-item-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='images/products/placeholder.jpg'">
                </div>
                <div class="sidebar-item-details">
                    <div class="sidebar-item-name">${item.name}</div>
                    <div class="sidebar-item-price">€${item.price.toFixed(2)}</div>
                    <div class="sidebar-item-controls">
                        <button class="remove-item" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            
            wishlistItems.appendChild(wishlistItem);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                removeFromWishlist(id);
            });
        });
    }
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    localStorage.setItem('oudEireWishlist', JSON.stringify(wishlist));
    updateWishlistUI();
}

function setupWishlist() {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('oudEireWishlist');
    if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
        updateWishlistUI();
    }
    
    // Add to wishlist from product detail page
    const addToWishlistDetail = document.getElementById('add-to-wishlist-detail');
    if (addToWishlistDetail) {
        addToWishlistDetail.addEventListener('click', () => {
            if (window.currentProduct) {
                addToWishlist(window.currentProduct);
                showNotification(`${window.currentProduct.name} added to wishlist!`);
            }
        });
    }
}