// Sample product data with actual image URLs
const products = [
    {
                id: 1,
                name: "Badeel-Al-Oud",
                description: "A luxurious blend of oud with deep, complex scent profile.",
                price: 30.00,
                brand: "lattafa",
                scent: ["woody"],
                concentration: "Eau de Parfum",
                size: "100ml",
                longevity: "8-12 hours",
                image: "images/b.jpg",
                    images: [
            "images/products/badeel-al-oud/image-1.jpg",
            "images/products/badeel-al-oud/image-2.jpg",
            "images/products/badeel-al-oud/image-3.jpg"
        ],
                featured: true
            },
            {
                id: 2,
                name: "Oud Orchid",
                description: "Elegant oud fragrance with floral orchid notes.",
                price: 25.00,
                brand: "rasasi",
                scent: ["woody", "floral"],
                concentration: "Eau de Parfum",
                size: "100ml",
                longevity: "6-8 hours",
                image: "images/Oud Orchid.jpg",
                featured: true
            },

            {
                id: 3,
                name: "Ramz Silver",
                description: "Modern interpretation of oud with fresh, metallic notes.",
                price: 30.00,
                brand: "lattafa",
                scent: ["woody", "fresh"],
                concentration: "Eau de Parfum",
                size: "100ml",
                longevity: "6-8 hours",
                image: "images/Ramz Silver.jpg",
                featured: false
            },
            
            {
                id: 5,
                name: "Yara",
                description: "Feminine oud with sweet, fruity notes.",
                price: 30.00,
                brand: "lattafa",
                scent: ["woody", "floral"],
                concentration: "Eau de Parfum",
                size: "100ml",
                longevity: "6-8 hours",
                image: "images/Yara.jpg",
                featured: false
            },
        
            {
                id: 6,
                name: "Oud Najdia",
                description: "Traditional oud with authentic Middle Eastern character.",
                price: 25.00,
                brand: "rasasi",
                scent: ["woody"],
                concentration: "Eau de Parfum",
                size: "100ml",
                longevity: "8-10 hours",
                image: "images/Oud Najdia.jpg",
                featured: false
            },
            {
                id: 7,
                name: "Yara Pink",
                description: "Playful pink version of the popular Yara fragrance.",
                price: 30.00,
                brand: "lattafa",
                scent: ["floral", "fruity"],
                concentration: "Eau de Parfum",
                size: "100ml",
                longevity: "6-8 hours",
                image: "images/Yara Pink.jpg",
                featured: false
            },
            {
                id: 8,
                name: "Omnery Brandy",
                description: "Oud with rich brandy and boozy notes.",
                price: 28.00,
                brand: "rasasi",
                scent: ["woody", "spicy"],
                concentration: "Eau de Parfum",
                size: "100ml",
                longevity: "8-10 hours",
                image: "images/Omnery Brand.jpg",
                featured: false
            },
           
            {
                id: 9,
                name: "Cherry Gold",
                description: "Oud with sweet cherry and golden amber notes.",
                price: 25.00,
                brand: "lattafa",
                scent: ["woody", "fruity"],
                concentration: "Eau de Parfum",
                size: "100ml",
                longevity: "6-8 hours",
                image: "images/Cherry Gold.jpg",
                featured: false
            },
            {
                id: 10,
                name: "Eclaire",
                description: "Bright and luminous oud with sparkling notes.",
                price: 40.00,
                brand: "al-haramain",
                scent: ["woody", "fresh"],
                concentration: "Eau de Parfum",
                size: "100ml",
                longevity: "8-10 hours",
                image: "images/Eclaire.jpg",
                featured: true
            },
            {
                id: 11,
                name: "Yara Moi Eau de Parfum",
                description: "Special edition Yara with enhanced longevity.",
                price: 30.00,
                brand: "lattafa",
                scent: ["floral", "fruity"],
                concentration: "Eau de Parfum",
                size: "100ml",
                longevity: "8-10 hours",
                image: "images/Yara moi.jpg",
                featured: false
            },
            {
                id: 12,
                name: "Asad Zanzibar",
                description: "Exotic Asad edition with Zanzibar spices.",
                price: 30.00,
                brand: "lattafa",
                scent: ["woody", "spicy"],
                concentration: "Eau de Parfum",
                size: "100ml",
                longevity: "10-12 hours",
                image: "images/Asad Zanzibar.jpg",
                featured: false
            },
            {
                id: 13,
                name: "Yara Candy",
                description: "Sweet and playful Yara with candy-like notes.",
                price: 30.00,
                brand: "lattafa",
                scent: ["fruity", "sweet"],
                concentration: "Eau de Parfum",
                size: "100ml",
                longevity: "6-8 hours",
                image: "images/Yara Candy.jpg",
                images: [
            "images/Yara candy1.jpg",
            "images/Yara candy2.jpg",
            "images/Yara candy3.jpg"
        ],
                featured: false
            },
            {
                id: 14,
                name: "Bint Hooran",
                description: "Elegant feminine oud with delicate floral notes.",
                price: 25.00,
                brand: "rasasi",
                scent: ["floral", "woody"],
                concentration: "Eau de Parfum",
                size: "100ml",
                longevity: "6-8 hours",
                image: "images/Bint hooran.jpg",
                featured: false
            }
];

// Render products to different sections
function renderFeaturedProducts() {
    const featuredProductsGrid = document.getElementById('featured-products');
    if (!featuredProductsGrid) return;
    
    // Clear existing content
    featuredProductsGrid.innerHTML = '';
    
    // Show only featured products
    const featuredProducts = products.filter(product => product.featured);
    
    // Create product cards
    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        featuredProductsGrid.appendChild(productCard);
    });
}

function renderShopProducts() {
    const shopProductsGrid = document.getElementById('shop-products');
    if (!shopProductsGrid) return;
    
    // Clear existing content
    shopProductsGrid.innerHTML = '';
    
    // Show all products initially
    products.forEach(product => {
        const productCard = createProductCard(product);
        shopProductsGrid.appendChild(productCard);
    });
    
    // Update results count
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        resultsCount.textContent = products.length;
    }
}

function renderRelatedProducts() {
    const relatedProductsGrid = document.getElementById('related-products');
    if (!relatedProductsGrid) return;
    
    // Clear existing content
    relatedProductsGrid.innerHTML = '';
    
    // Show 4 random products as related
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    const relatedProducts = shuffled.slice(0, 4);
    
    // Create product cards
    relatedProducts.forEach(product => {
        const productCard = createProductCard(product);
        relatedProductsGrid.appendChild(productCard);
    });
}

// Create a product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-product-id', product.id);
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='images/products/placeholder.jpg'">
            ${product.featured ? '<span class="product-badge">Featured</span>' : ''}
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">€${product.price.toFixed(2)}</div>
            <div class="product-actions">
                <button class="btn-add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-bag"></i> Add to Cart
                </button>
                <button class="btn-view-details" data-id="${product.id}">
                    <i class="fas fa-eye"></i> Details
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners to buttons
    const addToCartBtn = card.querySelector('.btn-add-to-cart');
    addToCartBtn.addEventListener('click', () => {
        addToCart(product);
        showNotification(`${product.name} added to cart!`);
    });
    
    const viewDetailsBtn = card.querySelector('.btn-view-details');
    viewDetailsBtn.addEventListener('click', () => {
        // Set current product and navigate to product detail page
        window.currentProduct = product;
        updateProductDetail();
        navigateToPage('product-detail');
    });
    
    return card;
}

// Update product detail page
function updateProductDetail() {
    if (!window.currentProduct) return;

    // Cache references
    const productDetailTitle = document.getElementById('product-detail-title');
    const productDetailPrice = document.getElementById('product-detail-price');
    const productDetailDescription = document.getElementById('product-detail-description');
    const specBrand = document.getElementById('spec-brand');
    const specConcentration = document.getElementById('spec-concentration');
    const specSize = document.getElementById('spec-size');
    const specScent = document.getElementById('spec-scent');
    const specLongevity = document.getElementById('spec-longevity');
    const mainProductImage = document.getElementById('main-product-image');
    const productThumbnails = document.querySelectorAll('.product-thumbnail');

    const p = window.currentProduct;

    // Update text details
    if (productDetailTitle) productDetailTitle.textContent = p.name;
    if (productDetailPrice) productDetailPrice.textContent = `€${p.price.toFixed(2)}`;
    if (productDetailDescription) productDetailDescription.textContent = p.description;
    if (specBrand) specBrand.textContent = p.brand.charAt(0).toUpperCase() + p.brand.slice(1);
    if (specConcentration) specConcentration.textContent = p.concentration;
    if (specSize) specSize.textContent = p.size;
    if (specScent) specScent.textContent = p.scent.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ');
    if (specLongevity) specLongevity.textContent = p.longevity;

    // Handle images
    if (!mainProductImage) return;

    const images = p.images || [p.image, p.image, p.image];

    // Set main image
    mainProductImage.src = images[0];
    mainProductImage.alt = p.name;

    // Update thumbnails
    productThumbnails.forEach((thumbnail, index) => {
        const img = thumbnail.querySelector('img');
        if (images[index]) {
            img.src = images[index];
            img.alt = `${p.name} view ${index + 1}`;
        }

        // Add click event to swap image
        thumbnail.onclick = function() {
            mainProductImage.src = images[index];
            productThumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        };
    });
}


// Filter and sort functions
function applyFilters() {
    // Get selected filters
    const selectedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked'))
        .map(checkbox => checkbox.value);
        
    const priceRange = document.getElementById('price-range');
    const maxPrice = priceRange ? parseInt(priceRange.value) : 500;
        
    const selectedScents = Array.from(document.querySelectorAll('input[name="scent"]:checked'))
        .map(checkbox => checkbox.value);
    
    // Filter products
    let filteredProducts = products.filter(product => {
        // Brand filter
        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
            return false;
        }
        
        // Price filter
        if (product.price > maxPrice) {
            return false;
        }
        
        // Scent filter
        if (selectedScents.length > 0) {
            const scentMatch = selectedScents.some(scent => 
                product.scent.includes(scent)
            );
            
            if (!scentMatch) return false;
        }
        
        return true;
    });
    
    // Apply sorting
    const sortOptions = document.getElementById('sort-options');
    const sortBy = sortOptions ? sortOptions.value : 'featured';
    filteredProducts = sortProducts(filteredProducts, sortBy);
    
    // Update UI
    updateShopProductsGrid(filteredProducts);
    
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        resultsCount.textContent = filteredProducts.length;
    }
}

function resetFilters() {
    // Uncheck all filter checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset price range
    const priceRange = document.getElementById('price-range');
    const currentPrice = document.getElementById('current-price');
    if (priceRange && currentPrice) {
        priceRange.value = 500;
        currentPrice.textContent = '€500';
    }
    
    // Reset sort option
    const sortOptions = document.getElementById('sort-options');
    if (sortOptions) {
        sortOptions.value = 'featured';
    }
    
    // Show all products
    updateShopProductsGrid(sortProducts(products, 'featured'));
    
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        resultsCount.textContent = products.length;
    }
}

function applySorting() {
    applyFilters();
}

function sortProducts(products, sortBy) {
    const sortedProducts = [...products];
    
    switch(sortBy) {
        case 'newest':
            // In a real app, this would use a date field
            return sortedProducts;
        case 'price-low':
            return sortedProducts.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sortedProducts.sort((a, b) => b.price - a.price);
        case 'name':
            return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        case 'featured':
        default:
            return sortedProducts.sort((a, b) => b.featured - a.featured);
    }
}

function updateShopProductsGrid(filteredProducts) {
    const shopProductsGrid = document.getElementById('shop-products');
    if (!shopProductsGrid) return;
    
    shopProductsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        shopProductsGrid.appendChild(productCard);
    });
}