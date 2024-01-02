popUpContainer = document.querySelector('#popupContainer');
projPopup = document.querySelector('.project-popup');
projToggle = document.querySelector('#popupToggle');
modernHome = document.querySelector('#modernHome');
modernHomeView = document.querySelector('#modernHomeView');
prevSlide = document.getElementById('prevSlide');
nxtSlide = document.getElementById('nextSlide');

isOpenBool = false;

// Modern Home Project
modernHome.addEventListener('click', function() {
    isOpenBool = true;
    console.log(isOpenBool)
    popUpContainer.style.display = 'flex';
    modernHomeView.style.display = 'flex';
    setTimeout(() => {
        popUpContainer.style.opacity = '1';
        modernHomeView.style.opacity = '1';
    }, 100);
});

// Project X Button
projToggle.addEventListener('click', function() {
    closePopup()
});

// Function to hide the popup
function closePopup() {
    popUpContainer.style.opacity = '0';
    modernHomeView.style.opacity = '0';
    setTimeout(() => {
        popUpContainer.style.display = 'none';
        modernHomeView.style.display = 'none';
    }, 500);
}

// Event listener for closing popup on outside click
popUpContainer.addEventListener('click', function(event) {
    // Check if the clicked area is not the .project-popup or a child of it
    if (!modernHomeView.contains(event.target)) {
        closePopup();
    }
});

// Slide Show
const images = [
    'https://picsum.photos/1920/1080?random=1',
    'https://picsum.photos/1920/1080?random=2',
    'https://picsum.photos/1920/1080?random=3'
    // Add more images as needed
];
let currentImageIndex = 0;

function updateBackgroundImage() {
    modernHomeView.style.backgroundImage = `url('${images[currentImageIndex]}')`;
}

prevSlide.addEventListener('click', function() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateBackgroundImage();
});

nxtSlide.addEventListener('click', function() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateBackgroundImage();
});

let touchstartX = 0;
let touchendX = 0;

function handleSwipeGesture() {
    if (touchendX < touchstartX) {
        // Swiped Left, show next image
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateBackgroundImage();
    }
    if (touchendX > touchstartX) {
        // Swiped Right, show previous image
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateBackgroundImage();
    }
}

projPopup.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
});

projPopup.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleSwipeGesture();
});

