const popUpContainer = document.querySelector('#popupContainer');
const projToggle = document.querySelector('#popupToggle');

const projectToPopupMapping = {
    modernCloset: 'modernClosetView',
    mcmKitchen: 'mcmKitchenView',
    computerRoom: 'computerRoomView',
    tradVanity: 'tradVanityView',
    bookCase: 'bookCaseView',
    // Add mappings for additional projects here
};

const projectsInfo = {
    modernClosetView: {
        images: [
            './images/modern-closet/closet6.jpg',
            './images/modern-closet/closet1.jpg',
            './images/modern-closet/closet2.jpg',
            './images/modern-closet/closet4.jpg',
        ]
    },
    mcmKitchenView: {
        images: [
            './images/mcm-kitchen/mcm-kitchen1.jpg',
            './images/mcm-kitchen/mcm-kitchen2.jpg',
            './images/mcm-kitchen/mcm-kitchen3.jpg',
            './images/mcm-kitchen/mcm-kitchen5.jpg',
            './images/mcm-kitchen/mcm-kitchen6.jpg',
        ]
    },
    computerRoomView: {
        images: [
            './images/computer-room/computer-room.jpg',
        ]
    },
    tradVanityView: {
        images: [
            './images/trad-vanity/vanity1.jpg',
            './images/trad-vanity/vanity2.jpg',
        ]
    },
    bookCaseView: {
        images: [
            './images/book-case/case2.jpg',
            './images/book-case/case1.jpg',
        ]
    },
    // Define images for additional projects here
};

let currentImageIndex = 0;
let currentProject = null;

// Update the background image of the popup based on the current project's images
function updateBackgroundImage(images) {
    const projPopup = document.querySelector(`#${currentProject}`); // Selects the currently displayed popup by ID
    if (images && images.length > 0) {
        projPopup.style.backgroundImage = `url('${images[currentImageIndex]}')`;
    }
}

/// Function to setup close button event listeners dynamically
function setupCloseButtonListeners() {
    document.querySelectorAll('.popup-toggle').forEach(toggle => {
        toggle.removeEventListener('click', closePopup); // Remove existing listener to prevent duplicates
        toggle.addEventListener('click', closePopup);
    });
}

// Modify the showProjectPopup function to call setupCloseButtonListeners
function showProjectPopup(projectMenuId) {
    const popupId = projectToPopupMapping[projectMenuId];
    currentProject = popupId;
    currentImageIndex = 0;

    document.querySelectorAll('.project-popup').forEach(popup => popup.style.display = 'none');
    
    const selectedPopup = document.getElementById(popupId);
    if (selectedPopup) {
        selectedPopup.style.display = 'flex';
        popUpContainer.style.display = 'flex';
        setTimeout(() => {
            popUpContainer.style.opacity = '1';
            setupSlideControls(); // Set up slide controls
            setupCloseButtonListeners(); // Set up close button listeners here
        }, 100);
        updateBackgroundImage(projectsInfo[currentProject].images);
    }
}

// Function to hide the popup
function closePopup() {
    popUpContainer.style.opacity = '0';
    setTimeout(() => {
        popUpContainer.style.display = 'none';
        document.querySelectorAll('.project-popup').forEach(popup => popup.style.display = 'none');
        currentProject = null;
    }, 500);
}

// Dynamically set up slide control event listeners
function setupSlideControls() {
    const currentProjPopup = document.getElementById(currentProject);
    if (!currentProjPopup) return;

    const prevSlide = currentProjPopup.querySelector('.slideshow-arrow.left');
    const nextSlide = currentProjPopup.querySelector('.slideshow-arrow.right');

    prevSlide.onclick = () => changeSlide(-1);
    nextSlide.onclick = () => changeSlide(1);
}

// Change slide based on direction
function changeSlide(direction) {
    if (!currentProject) return;
    const images = projectsInfo[currentProject].images;
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
    updateBackgroundImage(images);
}

document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('click', function() {
        showProjectPopup(this.id);
    });
});

popUpContainer.addEventListener('click', function(event) {
    if (!event.target.closest('.project-popup')) closePopup();
});

let touchstartX = 0;
let touchendX = 0;

function handleSwipeGesture() {
    if (!currentProject) return;
    const images = projectsInfo[currentProject].images;
    if (touchendX < touchstartX) changeSlide(1); // Next image
    else if (touchendX > touchstartX) changeSlide(-1); // Previous image
}

document.querySelector('.project-popup').addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
});

document.querySelector('.project-popup').addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleSwipeGesture();
});

projToggle.addEventListener('click', closePopup);