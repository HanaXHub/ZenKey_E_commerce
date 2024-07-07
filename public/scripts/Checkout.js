document.addEventListener("DOMContentLoaded", function () {
    const checkoutButton = document.querySelector(".priced-checkout-button");
    const masterImage = document.querySelector(".master-image");
    const visaImage = document.querySelector(".visa-image");

    checkoutButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevents the default button action

        // Get all input fields
        const inputs = document.querySelectorAll(".checkout-input");

        // Validate input fields
        let isValid = true;
        inputs.forEach(function (input) {
            const label = input.previousElementSibling; // Get the label element
            const errorIndicator = label.querySelector(".error-indicator");

            if (input.hasAttribute("required") && input.value.trim() === "") {
                if (!errorIndicator) {
                    label.innerHTML += "<span class='error-indicator'> *</span>"; // Add red asterisk to label
                }
                isValid = false;
            } else {
                if (errorIndicator) {
                    label.removeChild(errorIndicator); // Remove asterisk from label if present
                }
            }
        });

        // Validate phone number
        const phoneInput = document.getElementById("phone");
        const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/; // Regex for international phone number format
        if (!phoneRegex.test(phoneInput.value)) {
            const label = phoneInput.previousElementSibling; // Get the label element
            const errorIndicator = label.querySelector(".error-indicator");
            if (!errorIndicator) {
                label.innerHTML += "<span class='error-indicator'> *</span>"; // Add red asterisk to label
            }
            isValid = false;
        }

        // Validate email
        const emailInput = document.getElementById("email");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation
        if (!emailRegex.test(emailInput.value)) {
            const label = emailInput.previousElementSibling; // Get the label element
            const errorIndicator = label.querySelector(".error-indicator");
            if (!errorIndicator) {
                label.innerHTML += "<span class='error-indicator'> *</span>"; // Add red asterisk to label
            }
            isValid = false;
        }

        // Validate card number
        const cardNumberInput = document.getElementById("card-number");
        const cardNumberRegex = /^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/; // Regex for card number format
        if (!cardNumberRegex.test(cardNumberInput.value)) {
            const label = cardNumberInput.previousElementSibling; // Get the label element
            const errorIndicator = label.querySelector(".error-indicator");
            if (!errorIndicator) {
                label.innerHTML += "<span class='error-indicator'> *</span>"; // Add red asterisk to label
            }
            isValid = false;
        }

        // Validate expiry date
        const expiryDateInput = document.getElementById("expiry-date");
        const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // Regex for expiry date format (MM/YY)
        if (!expiryDateRegex.test(expiryDateInput.value)) {
            const label = expiryDateInput.previousElementSibling; // Get the label element
            const errorIndicator = label.querySelector(".error-indicator");
            if (!errorIndicator) {
                label.innerHTML += "<span class='error-indicator'> *</span>"; // Add red asterisk to label
            }
            isValid = false;
        }

        // Validate CVV
        const cvvInput = document.getElementById("cvv");
        const cvvRegex = /^\d{3,4}$/; // Regex for CVV format (3 or 4 digits?)
        if (!cvvRegex.test(cvvInput.value)) {
            const label = cvvInput.previousElementSibling; // Get the label element
            const errorIndicator = label.querySelector(".error-indicator");
            if (!errorIndicator) {
                label.innerHTML += "<span class='error-indicator'> *</span>"; // Add red asterisk to label
            }
            isValid = false;
        }

        // Check if card type is selected
        if (!masterImage.classList.contains("selected") && !visaImage.classList.contains("selected")) {
            const masterLabel = masterImage.previousElementSibling; // Get the label element
            const visaLabel = visaImage.previousElementSibling; // Get the label element
            const masterErrorIndicator = masterLabel.querySelector(".error-indicator");
            const visaErrorIndicator = visaLabel.querySelector(".error-indicator");
            if (!masterErrorIndicator) {
                masterLabel.innerHTML += "<span class='error-indicator'> *</span>"; // Add red asterisk to label
            }
            if (!visaErrorIndicator) {
                visaLabel.innerHTML += "<span class='error-indicator'> *</span>"; // Add red asterisk to label
            }
            isValid = false;
        }

        // If all input fields are valid, show success message
        if (isValid) {
            // Check if the user is offline
            if (!navigator.onLine) {
                // Show error message for offline checkout
                handleOfflineCheckout();
                return;
            }
            
            // Retrieve cart products from cartDB
            getCartProductsDB(function (cartProducts) {
                // Save ordered products to ordersDB
                addOrderToDB(cartProducts);

                // Clear cartDB
                clearCartDB();

                alert("Payment has been made!", "");

                // Redirect to home page after 3 seconds
                setTimeout(function () {
                    window.location.href = "Home.html";
                }, 3000);
            });
        } else {
            // Show error message for incorrect form details
            alert("Please enter the details correctly.", "");
        }
    });

    // Card type selection
    masterImage.addEventListener("click", function () {
        masterImage.classList.add("selected");
        visaImage.classList.remove("selected");
        const masterLabel = masterImage.previousElementSibling; // Get the label element
        if (masterLabel) {
            const masterErrorIndicator = masterLabel.querySelector(".error-indicator");
            if (masterErrorIndicator) {
                masterLabel.removeChild(masterErrorIndicator); // Remove asterisk from label
            }
        }
        const visaLabel = visaImage.previousElementSibling; // Get the label element
        const visaErrorIndicator = visaLabel.querySelector(".error-indicator");
        if (visaErrorIndicator) {
            visaLabel.removeChild(visaErrorIndicator); // Remove asterisk from label
        }
    });

    visaImage.addEventListener("click", function () {
        visaImage.classList.add("selected");
        masterImage.classList.remove("selected");
        const visaLabel = visaImage.previousElementSibling; // Get the label element
        if (visaLabel) {
            const visaErrorIndicator = visaLabel.querySelector(".error-indicator");
            if (visaErrorIndicator) {
                visaLabel.removeChild(visaErrorIndicator); // Remove asterisk from label
            }
        }
        const masterLabel = masterImage.previousElementSibling; // Get the label element
        const masterErrorIndicator = masterLabel.querySelector(".error-indicator");
        if (masterErrorIndicator) {
            masterLabel.removeChild(masterErrorIndicator); // Remove asterisk from label
        }
    });


    // Update summary based on cart products
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    const buttonPriceElement = document.getElementById('button-price');

    // Retrieve cart products from array in local storage
    let cartProducts = [];

    // Retrieve cart products from array in indexDB
    getCartProductsDB(function (cartProducts) {
        // Update the cart with the retrieved products
        updateSummary(cartProducts);
    });

    // Function to update subtotal, shipping, and total in the cart summary
    const updateSummary = (cartProducts) => {
        console.log('Cart Products:', cartProducts); // Log the cart products object
        let subtotal = 0;

        // Iterate over each property (product) in the cartProducts object
        for (let productId in cartProducts) {
            if (cartProducts.hasOwnProperty(productId)) {
                const product = cartProducts[productId];
                subtotal += product.price * product.quantity;
            }
        }

        console.log('Subtotal:', subtotal); // Log the calculated subtotal

        let shipping = 0;
        if (subtotal > 0 && subtotal < 1000) {
            shipping = 30;
        }
        subtotalElement.textContent = `AED ${subtotal.toFixed(2)}`;
        shippingElement.textContent = shipping === 0 ? 'Free' : `AED ${shipping.toFixed(2)}`;
        totalElement.textContent = `AED ${(subtotal + shipping).toFixed(2)}`;
        buttonPriceElement.textContent = `AED ${(subtotal + shipping).toFixed(2)}`;
    };

    // Call updateSummary to display the subtotal, shipping, and total on page load
    updateSummary();
});


function handleOfflineCheckout() {
    ProgressiveKITT.addMessage("You are currently offline. To proceed with checkout please go back online ", { hideAfter: 2000 });

}

function notificationPermission() {
    Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
            navigator.serviceWorker.ready.then(function (registration) {
                registration.showNotification(
                    "Order Confirmation",
                    {
                        body:
                            "Would you like to continue with your checkout?",
                        icon: "/Images/ZenkeyLogoSmall.png",
                        actions: [
                            { action: "confirm1", title: "Yes" },
                            { action: "confirm2", title: "No" }
                        ],

                    }
                );
            });
        }
    });
}

