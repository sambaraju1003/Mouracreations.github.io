// ===============================
// Moura Creations JavaScript
// ===============================

// Mobile Navigation
const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");

if (menu) {
    menu.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

// Close mobile menu after clicking a link
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
    });
});

// Sticky Header
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");

    if (window.scrollY > 80) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll(
    ".hero-left, .hero-right, .about-box, .product, .review, .gallery-grid img, .contact-container"
);

function revealOnScroll() {

    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(element => {

        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {

            element.classList.add("show");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Product Hover Effect
document.querySelectorAll(".product").forEach(product => {

    product.addEventListener("mouseenter", () => {

        product.style.transform = "translateY(-12px)";

    });

    product.addEventListener("mouseleave", () => {

        product.style.transform = "translateY(0)";

    });

});

// Gallery Hover Zoom
document.querySelectorAll(".gallery-grid img").forEach(img => {

    img.addEventListener("mouseenter", () => {

        img.style.transform = "scale(1.05)";

    });

    img.addEventListener("mouseleave", () => {

        img.style.transform = "scale(1)";

    });

});

// Button Ripple Effect
document.querySelectorAll(".btn").forEach(btn => {

    btn.addEventListener("click", function (e) {

        const circle = document.createElement("span");

        const diameter = Math.max(this.clientWidth, this.clientHeight);

        circle.style.width = circle.style.height = `${diameter}px`;

        circle.style.left = `${e.offsetX - diameter / 2}px`;

        circle.style.top = `${e.offsetY - diameter / 2}px`;

        circle.classList.add("ripple");

        const ripple = this.getElementsByClassName("ripple")[0];

        if (ripple) {
            ripple.remove();
        }

        this.appendChild(circle);

    });

});

// Contact Form
const form = document.querySelector("form");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("Thank you for contacting Moura Creations! We will get back to you soon.");

        form.reset();

    });

}

// Back to Top Button
const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.id = "topBtn";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

// Console Welcome
console.log("Welcome to Moura Creations");
