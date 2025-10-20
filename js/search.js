// Search functions
function clearSearch() {
    const searchInput = document.getElementById('search-input');
    const searchClearBtn = document.getElementById('search-clear-btn');
    
    if (searchInput) {
        searchInput.value = '';
    }
    if (searchClearBtn) {
        searchClearBtn.style.display = 'none';
    }
    showSearchSuggestions();
}

function showSearchSuggestions() {
    const searchSuggestions = document.getElementById('search-suggestions');
    const searchResults = document.getElementById('search-results');
    const searchEmpty = document.getElementById('search-empty');
    const searchLoading = document.getElementById('search-loading');
    
    if (searchSuggestions) {
        searchSuggestions.classList.remove('hidden');
    }
    if (searchResults) {
        searchResults.classList.remove('active');
    }
    if (searchEmpty) {
        searchEmpty.style.display = 'none';
    }
    if (searchLoading) {
        searchLoading.classList.remove('active');
    }
}

function performSearch(query) {
    const searchSuggestions = document.getElementById('search-suggestions');
    const searchResults = document.getElementById('search-results');
    const searchEmpty = document.getElementById('search-empty');
    const searchLoading = document.getElementById('search-loading');
    
    // Show loading state
    if (searchSuggestions) {
        searchSuggestions.classList.add('hidden');
    }
    if (searchResults) {
        searchResults.classList.remove('active');
    }
    if (searchEmpty) {
        searchEmpty.style.display = 'none';
    }
    if (searchLoading) {
        searchLoading.classList.add('active');
    }
    
    // Simulate API call delay
    setTimeout(() => {
        if (searchLoading) {
            searchLoading.classList.remove('active');
        }
        
        // Filter products based on query
        const results = products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.toLowerCase().includes(query.toLowerCase()) ||
            product.scent.some(s => s.toLowerCase().includes(query.toLowerCase()))
        );
        
        // Display results
        if (results.length > 0) {
            displaySearchResults(results);
        } else {
            if (searchEmpty) {
                searchEmpty.style.display = 'flex';
            }
        }
    }, 800);
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;
    
    searchResults.innerHTML = '';
    searchResults.classList.add('active');
    
    results.forEach(product => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.setAttribute('data-id', product.id);
        resultItem.innerHTML = `
            <div class="search-result-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='images/products/placeholder.jpg'">
            </div>
            <div class="search-result-details">
                <div class="search-result-name">${product.name}</div>
                <div class="search-result-price">€${product.price.toFixed(2)}</div>
            </div>
        `;
        
        resultItem.addEventListener('click', () => {
            // Set current product and navigate to product detail page
            window.currentProduct = product;
            updateProductDetail();
            navigateToPage('product-detail');
            closeSidebar('search');
        });
        
        searchResults.appendChild(resultItem);
    });
}

function setupSearch() {
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