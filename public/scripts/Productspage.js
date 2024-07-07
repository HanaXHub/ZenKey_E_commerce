// Function to store the product ID in local storage and redirect to product-view.html
function redirectToProductView(productId) {
  // Store the product ID in local storage
  localStorage.setItem('selectedProductId', productId);
  // Redirect to product-view.html
  window.location.href = 'product-view.html';
}

// Function to add a product to the cart (unchanged)
function addToCart(productId) {
  // Load cartProducts from local storage or set it to an empty array if it doesn't exist
  getCartProductsDB(function (cartProducts) {
    const index = cartProducts.findIndex(item => item.id === productId);
    if (index !== -1) {
      // Reset the quantity to 1 if the product is already in the cart
      cartProducts[index].quantity += 1;
      updateCartProductDB(cartProducts[index]);
    } else {
      // Add the product with quantity 1 if it's not in the cart
      const product = products.find(item => item.id === productId);
      if (product) {
        cartProducts.push({ ...product, quantity: 1 });
        addToCartDB({ ...product, quantity: 1 });
      }
    }
    document.dispatchEvent(new Event('cartUpdated'));
  });

  // Show the pop-up
  const popup = document.getElementById('popup');
  popup.classList.add('show');
  setTimeout(() => {
    popup.classList.remove('show');
  }, 3000);

  // Find the button that was clicked
  const addButton = document.querySelector(`button[data-product-id="${productId}"]`);

  // Change the button icon to a tick icon
  addButton.innerHTML = `
  <i class="fa-solid fa-check-circle cart-icon fa-lg"></i>
  Added to Cart
`;

  // Change the button color to green
  addButton.style.backgroundColor = 'green';

  // Disable the button
  addButton.disabled = true;

  // Revert back to the original state after 3 seconds
  setTimeout(() => {
    addButton.innerHTML = `
    <i class="fa-solid fa-cart-plus cart-icon fa-lg"></i>
    Add to Cart
  `;
    addButton.style.backgroundColor = '';
    addButton.disabled = false;
  }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
  const productGrid = document.getElementById('productGrid');
  const productFiltered = localStorage.getItem('productFiltered');

  // Function to filter products based on the productFiltered value
  function filterProducts(products, filterValue) {
    if (!filterValue || filterValue === 'All Products') {
      return products; // Return all products if filter is null or 'All Products'
    } else if (filterValue === 'Accessories') {
      // Filter products with category 'Deskpads' or 'Phone Cases' for 'Accessories' filter
      return products.filter(product => product.category === 'Deskpads' || product.category === 'Phone Cases');
    } else {
      // Filter products by category matching the productFiltered value
      return products.filter(product => product.category === filterValue);
    }
  }

  // Filter products based on productFiltered value
  const filteredProducts = filterProducts(products, productFiltered);

  // Loop through filtered products and generate HTML for each product
  filteredProducts.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    const imageProduct = typeof product.image === 'string' ? product.image : product.image[0];
    productDiv.innerHTML = `
      <div class="product-image-container" onclick="redirectToProductView(${product.id})">
        <img src="${imageProduct}" alt="Product Image" class="product-image">
      </div>
      <button class="add-to-cart" onclick="addToCart(${product.id})" data-product-id="${product.id}">
        <i class="fa-solid fa-cart-plus cart-icon fa-lg"></i>
        Add to Cart
      </button>
      <div class="product-name" onclick="redirectToProductView(${product.id})">${product.name}</div>
      <div class="product-price" onclick="redirectToProductView(${product.id})">AED ${product.price.toFixed(2)}</div>
    `;
    productGrid.appendChild(productDiv);
  });
});

