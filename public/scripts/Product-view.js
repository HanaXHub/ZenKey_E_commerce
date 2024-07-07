document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the selected product ID from local storage
  const selectedProductId = localStorage.getItem('selectedProductId');

  // Fetch the product information based on the selected product ID
  const selectedProduct = products.find(product => product.id === parseInt(selectedProductId));

  // Update the DOM elements with the product information
  if (selectedProduct) {
    document.title = selectedProduct.title;
    document.getElementById('productName').textContent = selectedProduct.title;
    document.getElementById('productDescName').innerHTML = `
      ${selectedProduct.name}
      <span class="product-desc-seller">Sold by ${selectedProduct.seller}</span>
      <span class="product-desc-price">AED ${selectedProduct.price.toFixed(2)}</span>
    `;
    document.getElementById('productDescDescription').textContent = selectedProduct.description;

    const imageSet = document.getElementById('imageSet');
    // Check if the image field is a string or an array
    if (typeof selectedProduct.image === 'string') {
      // If it's a string, create a single image element
      const imageCover = document.createElement('div');
      imageCover.classList.add('image-cover');
      const imageElement0 = document.createElement('img');
      imageElement0.src = selectedProduct.image;
      imageElement0.alt = 'Product Cover';
      imageCover.appendChild(imageElement0);
      const imageThumbnail = document.createElement('div');
      imageThumbnail.classList.add('image-thumbnails');
      const imageElement = document.createElement('img');
      imageElement.src = selectedProduct.image;
      imageElement.alt = 'Product Thumbnail';
      imageThumbnail.appendChild(imageElement);
      imageSet.appendChild(imageCover);
      imageSet.appendChild(imageThumbnail);
    } else if (Array.isArray(selectedProduct.image)) {
      // If it's an array, create image elements for each image URL
      const imageCover = document.createElement('div');
      imageCover.classList.add('image-cover');
      const imageElement0 = document.createElement('img');
      imageElement0.src = selectedProduct.image[0];
      imageElement0.alt = 'Product Cover';
      imageCover.appendChild(imageElement0);
      imageSet.appendChild(imageCover);
      const imageThumbnail = document.createElement('div');
      imageThumbnail.classList.add('image-thumbnails');
      selectedProduct.image.forEach(imageUrl => {
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.alt = 'Product Thumbnail';
        imageThumbnail.appendChild(imageElement);
      });
      imageSet.appendChild(imageThumbnail);
    } else {
      console.error('Invalid image format.');
    }

    // Store the current quantity in a variable
    let currentQuantity = 1;

    // Function to decrease quantity
    window.decreaseQuantity = function () {
      if (currentQuantity > 1) {
        currentQuantity--;
        document.getElementById('quantity').textContent = currentQuantity;
      }
    }

    // Function to increase quantity
    window.increaseQuantity = function () {
      if (currentQuantity < 12) {
        currentQuantity++;
        document.getElementById('quantity').textContent = currentQuantity;
      }
    }

    // Function to add the product to the cart with the selected quantity
    window.addToCart = function () {
      const quantity = currentQuantity;

      getCartProductsDB(function (cartProducts) {
        const index = cartProducts.findIndex(item => item.id === selectedProduct.id);
        if (index !== -1) {
          cartProducts[index].quantity += quantity;
          updateCartProductDB(cartProducts[index]);
        } else {
          const productToAdd = { ...selectedProduct, quantity };
          addToCartDB(productToAdd);
        }

        const popup = document.getElementById('popup');
        popup.classList.add('show');
        setTimeout(() => {
          popup.classList.remove('show');
        }, 3000);

        const addToCartButton = document.querySelector('.product-add-to-cart');
        addToCartButton.textContent = 'Added to Cart';
        addToCartButton.style.backgroundColor = '#4CAF50';
        addToCartButton.style.cursor = 'default';
        addToCartButton.disabled = true;

        setTimeout(() => {
          addToCartButton.textContent = 'Add to Cart';
          addToCartButton.style.backgroundColor = '#000';
          addToCartButton.style.cursor = 'pointer';
          addToCartButton.disabled = false;
        }, 3000);
      });
    }

    // Add event listeners to filter buttons
    const filterButtons = document.querySelectorAll('.filterBox .category li');

    filterButtons.forEach(button => {
      button.addEventListener('click', function () {
        const filterValue = this.textContent.trim();
        localStorage.setItem('productFiltered', filterValue);
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        location.reload();
      });
    });

    // Get the filter value from localStorage
    const selectedFilter = localStorage.getItem('productFiltered');

    if (selectedFilter) {
      filterButtons.forEach(button => {
        if (button.textContent.trim() === selectedFilter) {
          button.classList.add('active');
        }
      });
    }
  } else {
    console.error('Selected product not found.');
  }
});
