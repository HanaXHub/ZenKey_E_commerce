 //scroll bar flip
 window.addEventListener("scroll", function () {
    var scrollDirection = (window.scrollY > this.lastScroll) ? "down" : "up";
    this.lastScroll = window.scrollY;
    var thumb = document.querySelector("body::-webkit-scrollbar-thumb");

    if (scrollDirection === "up") {
        document.body.style.setProperty("--scroll-gradient-start", "#ff660d");
        document.body.style.setProperty("--scroll-gradient-end", "black");
    } else {
        document.body.style.setProperty("--scroll-gradient-start", "black");
        document.body.style.setProperty("--scroll-gradient-end", "#ff660d");
    }
});

//Navbar smooth scroll
function smoothScroll(target) {
    const element = document.querySelector(target);
    const offset = 70;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}