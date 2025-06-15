
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const section = document.querySelector(href);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Cart functionality

document.addEventListener('DOMContentLoaded', function() {
    // Make cart icon link to cart.html
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            window.location.href = 'cart.html';
        });
    }

    // Add to cart functionality for all Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.btn-primary[data-product], .add-to-cart[data-product]');
    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.getAttribute('data-product');
            if (!productName) return;
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existing = cart.find(item => item.name === productName);
            if (existing) {
                existing.qty += 1;
            } else {
                cart.push({ name: productName, qty: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            // Optionally show feedback to user
            this.textContent = 'Added!';
            setTimeout(() => { this.textContent = 'Add to cart'; }, 1000);
        });
    });

    // Cart page rendering
    if (window.location.pathname.endsWith('cart.html')) {
        const cartItemsDiv = document.getElementById('cart-items');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cartItemsDiv.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <span>${item.name}</span>
                    <div class="cart-qty-controls">
                        <button class="qty-btn decrease-qty" data-product="${item.name}">-</button>
                        <span class="cart-qty">${item.qty}</span>
                        <button class="qty-btn increase-qty" data-product="${item.name}">+</button>
                    </div>
                    <button class="remove-from-cart" data-product="${item.name}">Remove</button>
                </div>
            `).join('');
        }
        // Quantity and remove functionality
        cartItemsDiv.addEventListener('click', function(e) {
            const product = e.target.getAttribute('data-product');
            if (e.target.classList.contains('remove-from-cart')) {
                cart = cart.filter(item => item.name !== product);
                localStorage.setItem('cart', JSON.stringify(cart));
                location.reload();
            }
            if (e.target.classList.contains('increase-qty')) {
                const item = cart.find(i => i.name === product);
                if (item) item.qty += 1;
                localStorage.setItem('cart', JSON.stringify(cart));
                location.reload();
            }
            if (e.target.classList.contains('decrease-qty')) {
                const item = cart.find(i => i.name === product);
                if (item && item.qty > 1) {
                    item.qty -= 1;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    location.reload();
                }
            }
        });
    }

    // Redirect to checkout.html on checkout button click
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'checkout.html';
        });
    }

    // Checkout page order summary logic
    if (window.location.pathname.endsWith('checkout.html')) {
        const orderSummaryDiv = document.getElementById('order-summary');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        // For demo: assign a price per product (could be replaced with real data)
        const productPrices = {
            'XX99 MARK II HEADPHONES': 2999,
            'XX99 MARK I HEADPHONES': 1999,
            'XX59 HEADPHONES': 899,
            'ZX1 HEADPHONES': 799,
            'ZX2 HEADPHONES': 999,
            'ZX3 HEADPHONES': 1099,
            'ZX4 HEADPHONES': 1299,
            'ZX5 HEADPHONES': 1499,
            'ZX1 SPEAKER': 1199,
            'ZX2 SPEAKER': 1399,
            'ZX3 SPEAKER': 1599,
            'ZX4 SPEAKER': 1799,
            'ZX5 SPEAKER': 1999,
            'ZX6 SPEAKER': 2199,
            'ZX7 SPEAKER': 2499,
            'ER1 EARPHONES': 299,
            'ER2 EARPHONES': 399,
            'ER3 EARPHONES': 499,
            'ER4 EARPHONES': 599,
            'ER5 EARPHONES': 699
        };
        let productTotal = 0;
        let totalQty = 0;
        cart.forEach(item => {
            const price = productPrices[item.name] || 0;
            productTotal += price * item.qty;
            totalQty += item.qty;
        });
        const shipping = 50;
        const vat = Math.round(productTotal * 0.2);
        const grandTotal = productTotal + shipping + vat;
        orderSummaryDiv.innerHTML = `
            <h3>Order Summary</h3>
            <p>Total Products: <strong>${totalQty}</strong></p>
            <p>Product Total: <strong>$${productTotal.toLocaleString()}</strong></p>
            <p>Shipping: <strong>$${shipping}</strong></p>
            <p>VAT (20%): <strong>$${vat.toLocaleString()}</strong></p>
            <p style="font-size:1.2em; margin-top:1em;">Grand Total: <strong>$${grandTotal.toLocaleString()}</strong></p>
        `;

        // Confirmation modal logic (now uses modal already in HTML)
        const modal = document.getElementById('order-confirmation-modal');
        // Close modal and redirect
        document.body.addEventListener('click', function(e) {
            if (e.target.id === 'close-modal-btn') {
                localStorage.removeItem('cart');
                window.location.href = 'index.html';
            }
        });
        // Handle checkout form submit
        const checkoutForm = document.getElementById('checkout-form');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', function(e) {
                e.preventDefault();
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                if (cart.length === 0) {
                    alert('Your cart is empty.');
                    return;
                }
                // Fill modal summary
                document.getElementById('modal-summary').innerHTML = `
                    <h4>Order Summary</h4>
                    <p>Total Products: <strong>${totalQty}</strong></p>
                    <p>Product Total: <strong>$${productTotal.toLocaleString()}</strong></p>
                    <p>Shipping: <strong>$${shipping}</strong></p>
                    <p>VAT (20%): <strong>$${vat.toLocaleString()}</strong></p>
                    <p style='font-size:1.1em;margin-top:1em;'>Grand Total: <strong>$${grandTotal.toLocaleString()}</strong></p>
                `;
                modal.style.display = 'flex';
                // localStorage.removeItem('cart'); // Do NOT clear cart here to persist after refresh
            });
        }
    }
});
