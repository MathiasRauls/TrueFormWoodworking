// New Mobile Nav
var navToggle = document.querySelector('.nav-toggle');
var mobileNavClose = document.querySelector('.mobile-nav-close');
var mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
var mobileNavbar = document.querySelector('.mobile-nav-wrapper');
var mobileNavbarElem = document.querySelector('.mobile-nav');
var navbarOpen = false;

function openMobileNav() {
    console.log('Open Nav Menu');
    mobileNavbar.style.opacity = "100%";
    mobileNavbar.style.transform = "translateX(0%)";
    navbarOpen = true;
}

function closeMobileNav() {
    console.log('Closed Nav Menu');
    mobileNavbar.style.opacity = "0%";
    mobileNavbar.style.transform = "translateX(-100%)";
    navbarOpen = false;
}

navToggle.addEventListener('click', function() {
    if (window.innerWidth <= 770) {
        if (!navbarOpen) {
            openMobileNav();
        } else {
            closeMobileNav();
        }
    }
});

mobileNavLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 770) {
            console.log('Nav Link Clicked');
            closeMobileNav();
        }
    });
});

mobileNavClose.addEventListener('click', function() {
    closeMobileNav();
});

// Updated event listener for document click
document.addEventListener('click', function(event) {
    // Check if navbar is open, and if the click is outside both mobileNavbar and mobileNavbarElem
    if (navbarOpen && !mobileNavbar.contains(event.target) && !navToggle.contains(event.target)) {
        closeMobileNav();
    }
});

// Note: The navToggle is excluded from the outside click check to allow the navbar to open.
