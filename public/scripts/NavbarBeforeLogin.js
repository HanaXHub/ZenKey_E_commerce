document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    header.innerHTML = `
    <div class="primary-nav">
    <div class="mobile-nav-header">
        <div class="nav-logo">
            <a href="Landing.html">
                <img src="../Images/Logo.jpeg" alt="Logo">
            </a>
        </div>
        <div class="hamburger-menu">
            <div class="ham-rectangle"></div>
            <div class="ham-rectangle"></div>
            <div class="ham-rectangle"></div>
        </div>
    </div>
        <nav class="nav-links">
            <a href="Login.html">Login</a>
            <a href="Signup.html">Signup</a>
        </nav>
        <nav class="mobile-nav-links">
            <a href="Login.html">Login</a>
            <a href="Signup.html">Signup</a>
        </nav>
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
        background-color: #231f20;
        width: 100%;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
        height: auto;
    }  

    .nav-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 40px;
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
    
    .nav-links {
        margin-right: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 30px;
    }
    
    .nav-links a {
        font-family: 'Poppins Regular';
        font-size: 15px;
        color: #f2f2f2;
        text-decoration: none;
        padding: 14px 25px;
        transition: all ease-in-out 0.3s;
    }
    
    .nav-links a i {
        font-size: 23px;
    }
    
    .nav-links a:hover {
        border-bottom: 2px solid #ee5417;
    }
    
    .mobile-nav-links {
        display: none;
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
        0% { height: auto; }
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
        100% { height: auto; }
    }

    .ham-rectangle {
        width: 23px;
        height: 2px;
        border-radius: 5px;
        background-color: #f2f2f2;
        transition: 0.3s;
    }
    
    @media only screen and (max-width: 600px) {
        .primary-nav {
            position: fixed;
            flex-direction: column;
            align-items: center;
            padding: 40px 0px;
            z-index: 9999;
        }

        .mobile-nav-header {
            position: fixed;
            top: 0;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            z-index: 9999;
        }

        .nav-logo {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
        }
    
        .nav-links {
            display: none;
        }
    
        .mobile-nav-links {
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 30px;
            margin-top: 100px;
            transition: all ease-in-out 0.3s;
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
    }
    
    `;
    header.appendChild(style);

    // Toggle navigation links on hamburger icon click
    const primaryNav = document.querySelector('.primary-nav');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNavLinks = document.querySelector('.mobile-nav-links');
    const mobileNavHeader = document.querySelector('.mobile-nav-header');

    // Set initial state of mobileNavLinks to 'none'
    mobileNavLinks.style.display = 'none';

    hamburgerMenu.addEventListener('click', function () {
        if (mobileNavLinks.style.display === 'none') {
            mobileNavLinks.style.display = 'flex';
            // Extend to full screen height
            primaryNav.style.height = '100vh'; 
            primaryNav.style.animation = 'stretchBackground 0.1s ease-in-out';
            mobileNavHeader.style = 'border-bottom: none';
            // Toggle active class for hamburger icon animation
            hamburgerMenu.classList.toggle('active');
        }
        else {
            mobileNavLinks.style.display = 'none';
            primaryNav.style.height = 'auto'; // Revert to default height
            primaryNav.style.animation = 'stretchBackgroundReverse 0.1s ease-in-out';
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

        if (screenWidth > 600) {
            navLinksDesktop.style.display = 'flex';
            mobileNavLinks.style.display = 'none';
            hamburgerMenu.style.display = 'none';
            primaryNav.style.height = 'auto'; // Revert to default height
            mobileNavHeader.style = 'border-bottom: none';
            hamburgerMenu.classList.remove('active');
        } else {
            navLinksDesktop.style.display = 'none';
            hamburgerMenu.style.display = 'flex';
        }
    });
});
