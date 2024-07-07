document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    header.innerHTML = `
    <script src="/scripts/indexedDB.js"></script>
    <div class="primary-nav">
        <div class="mobile-nav-header">
            <div class="nav-logo">
                <a href="Home.html">
                    <img src="../Images/Logo.jpeg" alt="Logo">
                </a>
            </div>
            <div class="hamburger-menu">
                <div class="ham-rectangle"></div>
                <div class="ham-rectangle"></div>
                <div class="ham-rectangle"></div>
            </div>
        </div>

        <div class="search" id="search">
            <input type="text" class="search-bar" placeholder="Search" id="searchInput">
            <i class="fas fa-search"></i>
        </div>

        <nav class="nav-links">
            <a href="#"><i class="fas fa-bell"></i></a>
            <a href="Cart.html">
                <i class="fas fa-shopping-cart"></i>
            </a>
            <a href="Account.html">
                <i class="fas fa-user"></i>
            </a>
            <a onclick=confirmation('Are you sure?','You are about to logout.') href="Login.html">
                <i class="fa-solid fa-right-from-bracket"></i>
            </a>
        </nav>

        <nav class="mobile-nav-links">
            <a href="#"><i class="fas fa-bell"></i>Notifications</a>
            <a href="Cart.html">
                <i class="fas fa-shopping-cart"></i>
                Cart
            </a>
            <a href="Account.html">
                <i class="fas fa-user"></i>
                Account
            </a>
            <a onclick=confirmation('Are you sure?','You are about to logout.') href="Login.html">
                <i class="fa-solid fa-right-from-bracket"></i>
                Logout
            </a>
            <div class="mob-sec-nav">
                <a href="Products.html">All Products</a>
                <a href="Products.html" onclick"handleProduct()">Keyboards</a>
                <a href="Products.html" onclick"handleProduct()">Mice</a>
                <a href="Products.html" onclick"handleProduct()">Accessories</a>
            </div>
        </nav>
    </div>

    <div class="secondary-nav">
        <ul>
            <li><a href="Products.html">All Products</a></li>
            <li><a href="Products.html" onclick"handleProduct()">Keyboards</a></li>
            <li><a href="Products.html" onclick"handleProduct()">Mice</a></li>
            <li>
                <a href="Products.html" onclick"handleProduct()">Accessories</a>
                <div class="dropdown-content">
                    <a href="Products.html" onclick"handleProduct()">Deskpads</a>
                    <a href="Products.html" onclick"handleProduct()">Phone Cases</a>
                </div>
            </li>
        </ul>
    </div>
    <div id="overlay">
    <div id="notificationContainer" class="notification">
        <div class="notificationHeader">Notification</div>
        <div class="notes">
            <b>Re: Support Case (#123i219021)</b> <span onclick="markAllRead()">-</span>
            <p>Lorem ipsum dolor sit amet consectetur. Ornare massa nunc nibh tristique. Non ligula tristique ut ut libero</p>
        </div>
        <div class="notificationFooter">
            <button onclick="markAllRead()"><img src="../Images/double-tick.png" width="20" height="20"/><span>&nbsp;Mark all read</span></button>
        </div>
    </div>
</div>
    `;

    // Append CSS styles
    const style = document.createElement('style');
    style.textContent = `
    .primary-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0px;
        width: 100%;
        z-index: 9999;
        background-color: #231f20;
    }

    .nav-logo {
        margin-left: 20px;
        padding: 5px;
        border-bottom: 2px solid transparent;
        transition: 0.3s;
    }

    .nav-logo img {
        width: 150px;
        object-fit: contain;
    }

    .nav-logo:hover {
        cursor: pointer;
        border-bottom: 2px solid #ee5417;
    }

    .search {
        display: flex;
        align-items: center;
        padding-right: 20px;
        border: 1px solid #c3c3c3;
        color: #fff;
        border-radius: 25px;
        transition: 0.3s;
        font-family: 'Poppins Regular';
    }

    .search-bar {
        border: none;
        width: 100%;
        background-color: transparent;
        padding: 15px;
        padding-left: 20px;
        width: 300px;
        color: #fff;
        font-family: 'Poppins Regular';
        font-size: 13px;
    }

    .search-bar::placeholder {
        color: #d2d2d2;
        font-family: 'Poppins Regular';
        font-size: 13px;
    }

    .search-bar:focus {
        outline: none;
    }

    .search i {
        color: #fff;
    }

    .nav-links {
        margin-right: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 30px;
    }

    .nav-links a {
        color: #f2f2f2;
        border-bottom: 2px solid transparent;
        text-decoration: none;
        padding: 10px;
        transition: border ease-in-out 0.3s;
    }

    .nav-links a i {
        font-size: 23px;
    }

    .nav-links a:hover {
        border-bottom: 2px solid #ee5417;
    }

    .nav-active {
        border-bottom: 2px solid #ee5417;
    }

    .secondary-nav {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        background-color: #ee5417;
    }

    .secondary-nav ul {
        display: flex;
        flex-direction: row;
        list-style: none;
    }

    .secondary-nav ul li a {
        color: #fff;
        text-decoration: none;
        font-family: 'Poppins Regular';
        font-size: 15px;
        transition: 0.3s;
    }

    .secondary-nav ul li {
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 30px;
        padding-right: 30px;
        border-right: 1px solid #fff;
    }

    .secondary-nav ul li:last-child {
        border-right: none;
    }

    .secondary-nav ul li a:hover {
        color: #000;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #231f20;
        width: 200px;
        border-radius: 15px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        margin-top: 10px;
        margin-left: -10px;
        z-index: 1;
        transition: all ease-in-out 0.5s;
    }

    .dropdown-content a:last-child {
        border-bottom: none;
    }
    
    .dropdown-content a {
        color: #fff;
        padding: 25px;
        text-decoration: none;
        display: block;
        transition: color ease-in-out 0.2s;
        border-bottom: 1px solid #878787;
    }

    .secondary-nav ul li:hover .dropdown-content {
        display: block;
    }

    .secondary-nav ul li:hover .dropdown-content a {
        color: #fff;
    }

    .secondary-nav ul li:hover .dropdown-content a:hover {
        color: #ee5417;
    }

    .sec-nav-active {
        border-bottom: 1px solid #fff;
    }

    .cart-count {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 20px;
        height: 20px;
        background-color: #ff0000;
        font-family: 'Poppins Medium';
        color: white;
        border-radius: 50%;
        font-size: 12px;
        margin-left: 20px;
        margin-top: -37px;
    }

    .hamburger-menu {
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
        margin-top: -2px;
        gap: 5px;
        padding: 12px;
        background-color: #ee5417;
        border-radius: 5px;
        cursor: pointer;
        transition: 0.3s ease-in-out;
    }

    @keyframes stretchBackground {
        0% { height: 40px; }
        20% { height: 20vh; }
        40% { height: 40vh; }
        60% { height: 60vh; }
        80% { height: 80vh; }
        100% { height: 100vh; }
    }

    @keyframes stretchBackgroundReverse {
        0% { height: 100vh; }
        20% { height: 80vh; }
        40% { height: 60vh; }
        60% { height: 40vh; }
        80% { height: 20vh; }
        100% { height: 40px; }
    }

    .ham-rectangle {
        width: 23px;
        height: 2px;
        border-radius: 5px;
        background-color: #f2f2f2;
        transition: 0.3s;
    }

    .mobile-nav-links {
        display: none;
    }

    .mobile-nav-links a i {
        margin-right: 15px;
    }

    .mob-sec-nav {
        display: none;
    }

    .mob-nav-down {
        margin-left: 10px;
    }

    @media (max-width: 900px) {
        .grid-page {
            padding-top: 0;
            margin-top: 100px;
        }

        .primary-nav {
            position: fixed;
            top: 0;
            flex-direction: column;
            align-items: center;
            height: 40px;
        }

        .secondary-nav, .nav-links, .search {
            display: none;
        }

        .nav-logo {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
        }

        .mobile-nav-header {
            position: fixed;
            top: 0;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            z-index: 9999;
            padding: 20px 0px;
            height: auto;
            background-color: #231f20;
            transition: all ease-in-out 0.2s;
        }

        .mobile-nav-links {
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
        }

        .mobile-nav-links a {
            font-family: 'Poppins Regular';
            font-size: 18px;
            color: #f2f2f2;
            text-decoration: none;
            padding: 14px 25px;
            transition: all ease-in-out 0.3s;
            user-select: none;
        }

        .mob-sec-nav {
            padding: 20px;
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
            width: 100vw;
            height: 100%;
            background-color: #ee5417;
        }
        
        .hamburger-menu {
            display: flex;
        }

        .hamburger-menu.active {
            background-color: #fff;
        }

        .hamburger-menu.active .ham-rectangle {
            background-color: #000;
        }

        .hamburger-menu.active .ham-rectangle:nth-child(1) {
            transform: rotate(45deg) translate(5.2px, 5.2px);
        }
        
        .hamburger-menu.active .ham-rectangle:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger-menu.active .ham-rectangle:nth-child(3) {
            transform: rotate(-45deg) translate(5.3px, -5.3px);
        }       
    `;
    header.appendChild(style);

    // Set active class for the current page in the primary navbar
    const currentPage = window.location.pathname.split('/').pop();
    const nav = document.querySelector('nav');
    const navLinks = nav.querySelectorAll('a');
    // Toggle navigation links on hamburger icon click
    const primaryNav = document.querySelector('.primary-nav');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNavLinks = document.querySelector('.mobile-nav-links');
    const mobileNavHeader = document.querySelector('.mobile-nav-header');
    const secNav = document.querySelector('.mob-sec-nav');

    // Set initial state of mobileNavLinks to 'none'
    mobileNavLinks.style.display = 'none';

    if (currentPage === 'LandingPage.html') {
        const navLogo = document.querySelector('.nav-logo');
        navLogo.classList.add('nav-active');
    }

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('nav-active');
        }

        if (currentPage === 'Checkout.html' && link.getAttribute('href') === 'Cart.html') {
            link.classList.add('nav-active');
        }
    });

    hamburgerMenu.addEventListener('click', function () {
        if (mobileNavLinks.style.display === 'none') {
            secNav.style.display = 'flex';
            mobileNavLinks.style.display = 'flex';
            // Extend to full screen height
            primaryNav.style.height = '100vh';
            primaryNav.style.animation = 'stretchBackground 0.1s ease-in-out';
            mobileNavHeader.style = 'border-bottom: 1px solid #f2f2f2';
            // Toggle active class for hamburger icon animation
            hamburgerMenu.classList.toggle('active');
        }
        else {
            mobileNavLinks.style.display = 'none';
            secNav.style.display = 'none';
            primaryNav.style.height = '40px'; // Revert to default height
            primaryNav.style.animation = 'stretchBackgroundReverse 0.1s ease-in-out';
            mobileNavHeader.style = 'border-bottom: none';
            // Remove active class for hamburger icon animation
            hamburgerMenu.classList.remove('active');
        }
    });

    // Reset navbar on window resize
    window.addEventListener('resize', function () {
        const screenWidth = window.innerWidth;
        const navLinksDesktop = document.querySelector('.nav-links');
        const mobileNavLinks = document.querySelector('.mobile-nav-links');
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const primaryNav = document.querySelector('.primary-nav');
        const mobileNavHeader = document.querySelector('.mobile-nav-header');

        if (screenWidth > 900) {
            navLinksDesktop.style.display = 'flex';
            mobileNavLinks.style.display = 'none';
            hamburgerMenu.style.display = 'none';
            mobileNavHeader.style = 'border-bottom: none';
            primaryNav.style.height = 'auto'; // Revert to default height
            hamburgerMenu.classList.remove('active');
        } else {
            navLinksDesktop.style.display = 'none';
            hamburgerMenu.style.display = 'flex';
        }
    });
});

// Setting the focus and blur events for the search input
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchDiv = document.getElementById('search');

    searchInput.addEventListener('focus', function () {
        searchDiv.style.border = '1px solid #ee5417';
    });

    searchInput.addEventListener('blur', function () {
        searchDiv.style.border = '1px solid #c3c3c3';
    });
});


// Setting filtered product in local storage
document.addEventListener('DOMContentLoaded', function () {
    const secondaryNav = document.querySelector('.secondary-nav');
    const secondaryMobNav = document.querySelector('.mob-sec-nav');
    const secondaryNavLinks = secondaryNav.querySelectorAll('a');
    const secondaryMobNavLinks = secondaryMobNav.querySelectorAll('a');
    secondaryNavLinks.forEach(link => {
        link.addEventListener('click', function () {
            localStorage.setItem('productFiltered', link.textContent);
        });
    });
    secondaryMobNavLinks.forEach(link => {
        link.addEventListener('click', function () {
            localStorage.setItem('productFiltered', link.textContent);
        });
    });
});


// Set active class for the filtered product in the secondary navbar
document.addEventListener('DOMContentLoaded', function () {
    const secondaryNav = document.querySelector('.secondary-nav');
    const secondaryNavLinks = secondaryNav.querySelectorAll('a');
    secondaryNavLinks.forEach(link => {
        if (link.textContent === localStorage.getItem('productFiltered')) {
            link.classList.add('sec-nav-active');
        }

        if ((localStorage.getItem('productFiltered') === 'Deskpads' ||
            localStorage.getItem('productFiltered') === 'Phone Cases') && link.textContent === 'Accessories') {
            link.classList.add('sec-nav-active');
        }
    });
}
);


// Handling active class for the secondary navbar
document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname.split('/').pop();
    if ((!currentPage.includes('Products') || !currentPage.includes('Product'))
        && localStorage.getItem('productFiltered') !== null) {
        localStorage.removeItem('productFiltered');
    }
}
);

// Set the cart count indicator
document.addEventListener('DOMContentLoaded', function () {
    // Function to update the cart count indicator
    const updateCartCount = () => {
        // Get the number of cart products from IndexedDB
        getCartProductsDB(function(cartProducts) {
            const cartCount = cartProducts.length;

            // Find the cart icon link
            const cartLink = document.querySelector('nav a[href="Cart.html"]');

            // Check if the cart count indicator already exists
            let circle = cartLink.querySelector('.cart-count');
            if (!circle) {
                // Create and append the circle indicator if it doesn't exist
                circle = document.createElement('div');
                circle.classList.add('cart-count');
                cartLink.appendChild(circle);
            }

            // Update the cart count
            circle.textContent = cartCount;
        });
    };

    // Update the cart count on page load
    updateCartCount();

    // Update the cart count whenever the cart is updated
    document.addEventListener('cartUpdated', updateCartCount);
});

// Function to toggle the display of the notification overlay
function toggleOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = overlay.style.display === 'block' ? 'none' : 'block';
}

// Function to mark all notifications as read
function markAllRead() {
    const notificationContainer = document.getElementById('notificationContainer');

    notificationContainer.innerHTML = `
        <div class="notificationHeader">Notification</div>
        <div class="notificationBodyEmpty">
            <img src="../Images/EmptyNotification.png" width="258" height="235.5"/>
            <h3>No Notifications Yet</h3>
            <h5 class="CBL">Come Back Later</h5>
        </div>
    `;

    toggleOverlay(); // Hide the overlay after marking all notifications as read
}


document.addEventListener('DOMContentLoaded', function () {
    // Initially hide the notification overlay
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';

    // Add event listener to the bell icon to toggle the overlay
    const bellIcon = document.querySelector('nav a[href="#"]');
    bellIcon.addEventListener('click', toggleOverlay);

    // Add event listener to the mark all read button
    const markAllReadButton = document.querySelector('#notificationContainer button');
    markAllReadButton.addEventListener('click', markAllRead);
});