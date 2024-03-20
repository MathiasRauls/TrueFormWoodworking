document.addEventListener('DOMContentLoaded', function() {
    
    // Select all links with hashes
    const links = document.querySelectorAll('a[href*="#"]');

    for (let link of links) {
        link.addEventListener('click', function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
                location.hostname === this.hostname
            ) {
                // Figure out element to scroll to
                let target = document.querySelector(this.hash);
                target = target ? target : document.querySelector('[name=' + this.hash.slice(1) + ']');
                
                // Does a scroll target exist?
                if (target) {
                    event.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    }


    // Fade-in animation Landing
    const flourish = document.querySelector('.landing-elem');
    const h1 = document.querySelector('.landing-content-wrapper h1');
    const h2 = document.querySelector('.landing-content-wrapper h2');
    const text1 = h1.textContent;
    const text2 = h2.textContent;
    h1.textContent = '‎ ';  // Clear initial content
    h2.textContent = '‎ ';  // Clear initial content

    // Function to add typing effect to h1
    function typeText(element, content, index = 0) {
        if (index < content.length) {
            const span = document.createElement('span');
            span.textContent = content[index];
            element.appendChild(span);

            // After a brief delay, apply the CSS transition
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
                span.style.fontWeight = '700';
            }, 0);  // Small delay before starting the transition

            setTimeout(() => typeText(element, content, index + 1), 70);  // Adjust the delay as needed
        }
    }

    // Start typing after the fade-in animation
    setTimeout(() => {
        typeText(h1, text1);
    }, 1500);  // Start typing 1.5s after page load

    // Start typing after the fade-in animation
    setTimeout(() => {
        typeText(h2, text2);
        
    }, 1500);  // Start typing 1.5s after page load

});


// Carousel
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
let currentIndex = 0;

function updateCarousel() {
    slides.forEach((slide, index) => {
        if (index === currentIndex) {
            slide.style.opacity = "1";
        } else {
            slide.style.opacity = "0";
        }
    });

    indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});

setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
}, 10000);

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
}

function previousSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
}

// Variables to track touch positions
let touchStart = 0;
let touchEnd = 0;

function handleTouchStart(evt) {
    touchStart = evt.touches[0].clientX;
}

function handleTouchMove(evt) {
    touchEnd = evt.touches[0].clientX;
}

function handleTouchEnd() {
    if (touchStart - touchEnd > 75) {
        // Swipe left - next slide
        nextSlide();
    } else if (touchEnd - touchStart > 75) {
        // Swipe right - previous slide
        previousSlide();
    }
}

// Add touch event listeners to the carousel
const carousel = document.querySelector('.carousel');
carousel.addEventListener('touchstart', handleTouchStart);
carousel.addEventListener('touchmove', handleTouchMove);
carousel.addEventListener('touchend', handleTouchEnd);


document.addEventListener('click', function(event) {
    // Check if the clicked element is an anchor tag
    if (event.target.tagName === 'A') {
        var href = event.target.getAttribute('href');

        // Check if the href attribute is in the format "#example"
        if (href && href.startsWith('#')) {
            event.preventDefault(); // Prevent default anchor behavior

            var targetId = href.substring(1); // Extract the ID
            var targetElement = document.getElementById(targetId);

            if (targetElement) {
                var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 200; // Calculate position with offset

                // Smooth scroll to the target position
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }
});

// Parallax Images
function updateParallax() {
    const parallaxImages = document.querySelectorAll('.parallax');

    parallaxImages.forEach(img => {
        const rect = img.parentElement.getBoundingClientRect();
        const speed = 0.1; // Adjust this value for different speeds
        const translateY = rect.top * speed;

        img.style.transform = `translate(-0.1%, ${translateY}px)`;
    });
}

window.addEventListener('scroll', updateParallax);
