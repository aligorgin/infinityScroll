const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let isInitialLoad = true;

// unsplash API
let initialCount = 5;
const apiKey = "P_GHbppiV1pzAUoCQ2KQfSjg0l9jspSWWnvdW9zZlQo";
let apiURL = 'https://api.unsplash.com/photos/random/?client_id=' + apiKey + '&count=' + initialCount;

function updateAPIURLWithNewCount(picCount) {
    apiURL = 'https://api.unsplash.com/photos/random/?client_id=' + apiKey + '&count=' + picCount;
}

// check if all images were loaded
function imageloaded() {
    imagesLoaded++;
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages){
        ready = !ready;
        loader.hidden = true;
    }
}


// help function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// create elements for links & photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0 ;
    totalImages = photosArray.length;
    // run function for each object in photosArray
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement("a");

        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target', '_blank');

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        // create <img> for photo
        const img = document.createElement('img');

        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description);

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // event listener, check when each is finished loading
        img.addEventListener('load',imageloaded);


        // put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });

}

// get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
        if (isInitialLoad){
            updateAPIURLWithNewCount(30);
            isInitialLoad = false;
        }
    } catch (err) {
        // catch error here
    }
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready= false;
        getPhotos();
    }
})

// on load
getPhotos();