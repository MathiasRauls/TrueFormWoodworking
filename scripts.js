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
    const text = h1.textContent;
    h1.textContent = '';  // Clear initial content

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
            }, 50);  // Small delay before starting the transition

            setTimeout(() => typeText(element, content, index + 1), 70);  // Adjust the delay as needed
        }
    }

    // Start typing after the fade-in animation
    setTimeout(() => {
        typeText(h1, text);
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
