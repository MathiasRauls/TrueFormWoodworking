document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const landingBannerImages = document.querySelectorAll('#landingBanner img');
    let imagesLoaded = 0;

    const imageLoaded = () => {
        imagesLoaded++;
        if (imagesLoaded === landingBannerImages.length) {
            // All images have loaded, fade out the loader
            loader.style.opacity = '0';
            loader.addEventListener('transitionend', function() {
                loader.style.display = 'none';
            });
        }
    };

    if (landingBannerImages.length === 0) {
        // No images to wait for, hide the loader immediately
        loader.style.opacity = '0';
        loader.addEventListener('transitionend', function() {
            loader.style.display = 'none';
        });
    } else {
        // Listen for the load event on each image
        landingBannerImages.forEach(img => {
            if (img.complete) {
                // The image is already loaded
                imageLoaded();
            } else {
                // Wait for the image to load
                img.addEventListener('load', imageLoaded);
                img.addEventListener('error', imageLoaded); // Consider error as loaded to avoid infinite loading
            }
        });
    }
});