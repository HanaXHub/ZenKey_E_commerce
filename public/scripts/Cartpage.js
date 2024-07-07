// To display the cart items and update the cart details and payment summary on the cart page
document.addEventListener("DOMContentLoaded", function () {
    const cartGrid = document.getElementById('cartGrid');
    const cartItemsContainer = document.querySelector('.cart-items-container');
    const cartItemCount = document.getElementById('cartItemCount');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    const popup = document.getElementById('popup');

    let cartProducts = [];

    const updateCart = (prodcuts) => {
        cartProducts = prodcuts;

        cartItemsContainer.innerHTML = '';

        // Add cart items back to the DOM
        cartProducts.forEach((product, index) => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            const imageProduct = typeof product.image === 'string' ? product.image : product.image[0];

            cartItemDiv.innerHTML = `
                <div class="cart-item-image-container">
                    <img src="${imageProduct}" alt="Product Image" class="cart-item-image">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${product.name}</div>
                    <div class="cart-item-quantity">
                        <span id="quantity-${index}" class="quantity">${product.quantity}</span>
                        <div class="item-quantity-selector">
                            <i class="fa-solid fa-caret-up fa-lg cursor-pointer" data-index="${index}" data-increment="true"></i>
                            <i class="fa-solid fa-caret-down fa-lg cursor-pointer" data-index="${index}" data-increment="false"></i>
                        </div>
                    </div>
                    <div class="cart-item-price" id="price-${index}">AED ${product.price.toFixed(2)}</div>
                    <div class="cart-item-price" id="itemTotal-${index}">AED ${(product.price * product.quantity).toFixed(2)}</div>
                    <div class="cart-item-remove">
                        <i class="fa-solid fa-trash-can fa-lg cursor-pointer trash-icon" style="color: #6d6d6d;" data-index="${index}"></i>
                    </div>
                </div>
            `;

            cartItemsContainer.appendChild(cartItemDiv);
        });

        // Call updateSummary to display the subtotal, shipping, and total on page load
        updateCartItemCount();
        document.dispatchEvent(new Event('cartUpdated'));
        updateSummary(cartProducts);
    };

    // Retrieve cart products from array in indexDB
    getCartProductsDB(function (cartProducts) {
        // Update the cart with the retrieved products
        updateCart(cartProducts);
    });

    // Function to update cart array in indexDB
    const updateCartInDB = (cartProducts) => {
        cartProducts.forEach(product => {
            updateCartProductDB(product);
        });
    };

    // Function to update subtotal, shipping, and total in the cart summary
    const updateSummary = () => {
        let subtotal = cartProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);
        let shipping = 0;
        if (subtotal > 0 && subtotal < 1000) {
            shipping = 30;
        }
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        shippingElement.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
        totalElement.textContent = `$${(subtotal + shipping).toFixed(2)}`;
    };

    // Function to update quantity
    const updateQuantity = (index, increment) => {
        if (increment) {
            cartProducts[index].quantity++;
        } else {
            if (cartProducts[index].quantity > 1) {
                cartProducts[index].quantity--;
            }
        }

        // Update the quantity in the IndexedDB
        updateCartProductDB(cartProducts[index]);

        // Update the cart display
        updateCart(cartProducts);
    };

    // Function to update cart item details
    const updateCartItem = (index) => {
        const quantitySpan = document.getElementById(`quantity-${index}`);
        const itemTotalSpan = document.getElementById(`itemTotal-${index}`);
        const item = cartProducts[index];
        quantitySpan.textContent = item.quantity;
        itemTotalSpan.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
    };

    getCartProductsDB(updateCart);

    // Function to update cart item count in the header
    const updateCartItemCount = () => {
        if (cartProducts.length === 0) {
            cartItemCount.textContent = 'Your cart is empty';
        } else {
            cartItemCount.textContent = `You have ${cartProducts.length} items in your cart`;
        }
    };

    cartItemsContainer.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('fa-caret-up') || target.classList.contains('fa-caret-down')) {
            const index = parseInt(target.getAttribute('data-index'));
            const increment = target.getAttribute('data-increment') === 'true';
            updateQuantity(index, increment);
        } else if (target.classList.contains('fa-trash-can')) {
            const index = target.closest('.cart-item-remove').querySelector('i').getAttribute('data-index');
            const productId = cartProducts[index].id;
            cartProducts.splice(index, 1);
            removeFromCartDB(productId);
            updateCart(cartProducts);

            popup.classList.add('show');
            setTimeout(() => {
                popup.classList.remove('show');
            }, 3000);
        }
    });
});
