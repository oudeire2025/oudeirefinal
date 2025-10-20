// Cart functions
let cart = [];

function addToCart(product, qty = 1) {
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({
            ...product,
            quantity: qty
        });
    }
    
    // Save to localStorage
    localStorage.setItem('oudEireCart', JSON.stringify(cart));
    
    // Update UI
    updateCartUI();
}

function updateCartUI() {
    // Update cart count
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
    
    // Update cart items
    const cartItems = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (!cartItems || !cartEmpty) return;
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartEmpty.style.display = 'flex';
        cartItems.style.display = 'none';
        if (checkoutBtn) {
            checkoutBtn.disabled = true;
        }
    } else {
        cartEmpty.style.display = 'none';
        cartItems.style.display = 'block';
        if (checkoutBtn) {
            checkoutBtn.disabled = false;
        }
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'sidebar-item';
            cartItem.innerHTML = `
                <div class="sidebar-item-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='images/products/placeholder.jpg'">
                </div>
                <div class="sidebar-item-details">
                    <div class="sidebar-item-name">${item.name}</div>
                    <div class="sidebar-item-price">€${item.price.toFixed(2)}</div>
                    <div class="sidebar-item-controls">
                        <span>Qty: ${item.quantity}</span>
                        <button class="remove-item" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            
            cartItems.appendChild(cartItem);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                removeFromCart(id);
            });
        });
    }
    
    // Update totals
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    
    if (cartSubtotal && cartTotal) {
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        cartSubtotal.textContent = `€${subtotal.toFixed(2)}`;
        cartTotal.textContent = `€${subtotal.toFixed(2)}`;
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('oudEireCart', JSON.stringify(cart));
    updateCartUI();
}

function setupCart() {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('oudEireCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
    
    // Add to cart from product detail page
    const addToCartDetail = document.getElementById('add-to-cart-detail');
    if (addToCartDetail) {
        addToCartDetail.addEventListener('click', () => {
            if (window.currentProduct) {
                const quantityDisplay = document.getElementById('quantity-display');
                const quantity = quantityDisplay ? parseInt(quantityDisplay.textContent) : 1;
                addToCart(window.currentProduct, quantity);
                showNotification(`${window.currentProduct.name} added to cart!`);
                
                // Reset quantity
                if (quantityDisplay) {
                    quantityDisplay.textContent = '1';
                }
            }
        });
    }
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                alert('Thank you for your purchase! This is a demo, so no actual order was placed.');
                cart = [];
                localStorage.setItem('oudEireCart', JSON.stringify(cart));
                updateCartUI();
                closeSidebar('cart');
            }
        });
    }
}