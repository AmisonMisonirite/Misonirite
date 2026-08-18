const checkboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
const products = document.querySelectorAll('.product-item');

// Listen for any checkbox check/uncheck activity
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterProducts);
});

function filterProducts() {
    // 1. Map active filters by category
    const activeFilters = {};
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            // Find which category group this checkbox belongs to
            const category = checkbox.closest('.filter-group').dataset.category;
            
            if (!activeFilters[category]) {
                activeFilters[category] = [];
            }
            activeFilters[category].push(checkbox.value);
        }
    });

    // 2. Evaluate each product against active filters
    products.forEach(product => {
        let isMatch = true;

        // Loop through each active category rule
        for (const category in activeFilters) {
            const allowedValues = activeFilters[category];
            const productValue = product.dataset[category];

            // If the item doesn't have the selected value in this category, it fails
            if (!allowedValues.includes(productValue)) {
                isMatch = false;
                break; // Break loop early for performance
            }
        }

        // 3. Show or hide product based on match status
        if (isMatch) {
            product.classList.remove('hidden');
        } else {
            product.classList.add('hidden');
        }
    });
}