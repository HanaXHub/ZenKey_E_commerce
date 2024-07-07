document.addEventListener('DOMContentLoaded', function () {
    const footer = document.querySelector('footer');
    footer.innerHTML = `
    <div class="footer-body">
    <div class="footer-logo">
        <img src="../Images/Logo.jpeg">
    </div>
    <div class="footer-sections">
        <div class="footer-section">
            <span>Links</span>
            <li><a href="Landing.html#home" onclick="smoothScroll('#home')">Home</a></li>
            <li><a href="Landing.html#products" onclick="smoothScroll('#products')">Products</a></li>
            <li><a href="Landing.html#partners" onclick="smoothScroll('#partners')">Partners</a></li>
            <li><a href="Landing.html#keyfeatures" onclick="smoothScroll('#keyfeatures')">Key Features</a></li>
            <li><a href="Landing.html#download" onclick="smoothScroll('#download')">Download</a></li>
        </div>
        <div class="footer-section">
            <span>Get In Touch</span>
            <li><a href="#"><i class="fab fa-facebook"></i>Facebook</a></li>
            <li><a href="#"><i class="fab fa-instagram"></i>Instagram</a></li>
            <li><a href="#"><i class="fab fa-twitter"></i>Twitter</a></li>
            <li><a href="#"><i class="fab fa-linkedin"></i>Linkedin</a></li>
        </div>
    </div>
</div>
<div class="footer-bottom">
    <div class="footer-bottom-text">
        <span>&copy; 2024 Zenkey Store. All rights reserved.</span>
    </div>
</div>
    `;

    // Append CSS styles
    const style = document.createElement('style');
    style.textContent = `
    footer {
        width: 100%;
        height: fit-content;
        background: #282828;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .footer-body {
        width: 100%;
        height: 85%;
        display: flex;
        flex-direction: row;
        margin-top: 150px;
        margin-bottom: 175px;
        justify-content: space-evenly;
        gap: 50px;
    }

    .footer-logo {
        width: 25%;
        height: fit-content;
        background-color: #000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .footer-logo img {
        width: 100%;
    }

    .footer-sections {
        width: 60%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        gap: 50px;
    }

    .footer-section {
        width: 15%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 20px;
        color: #fff;
        padding: 20px;
        height: 20vh;
    }

    .footer-section span {
        font-family: 'Poppins SemiBold';
        font-size: 20px;
    }

    .footer-section li {
        font-family: 'Poppins Regular';
        font-size: 15px;
        list-style: none;
        cursor: pointer;
    }

    .footer-section li:hover {
        color: #ff660d;
        transition: 0.3s ease-in-out;
    }

    .footer-section li a {
        text-decoration: none;
        color: #fff;
    }

    .footer-section li a:hover {
        color: #ff660d;
        transition: 0.3s ease-in-out;
    }

    .footer-section i {
        margin-right: 10px;
    }

    .footer-bottom {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        color: #fff;
        height: 15%;
        background-color: #000;
        font-family: 'Poppins Medium';
        font-size: 15px;
        letter-spacing: 1px;
        text-transform: uppercase;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    ::-webkit-scrollbar {
        width: 12px;
    }

    ::-webkit-scrollbar-track {
        background-color: black;
    }

    ::-webkit-scrollbar-thumb {
        background: linear-gradient(var(--scroll-gradient-start), var(--scroll-gradient-end));
        border-radius: 6px;
    }

    @media (max-width: 850px) {
        .footer-body {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 80px;
            margin-top: 100px;
            margin-bottom: 125px;
        }

        .footer-logo {
            width: 55%;
        }

        .footer-sections {
            width: 100%;
            height: fit-content;
        }

        .footer-section {
            width: 22%;
            height: fit-content;
        }

        .footer-section i {
            margin-right: 50px;
        }

        .footer-section span {
            font-size: 18px;
        }

        .footer-section li a {
            font-size: 14px;
        }

        .footer-bottom-text {
            font-size: 11px;
        }
    `;
    footer.appendChild(style);
});
