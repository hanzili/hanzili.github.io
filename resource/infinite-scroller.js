const count = 30;
const apiKey = 'nHSAuoSPvnhpYmQ9jZNR9dfp_wD_OfUfCBtzRGzNGhs';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`
const imageContainer = document.getElementById('pictures');
const loader = document.getElementById('loader');

let totalImage = 30;
let loadedImage = 0;
let ready = true;
let photosArray = [];

// request pictures from the API
async function getPicture() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch (error){}
}

// make elements and add attributes
// append elements to the page
function displayPhotos() {
    loadedImage = 0;
    photosArray.forEach((photo) => {
        console.log(photo);
        const a = document.createElement('a');
        const button = document.createElement('button');
        const img = document.createElement('img');
        button.innerHTML = "Download";
        setAttributes(a, {
            href: photo.links.html,
            target: '_blank'
        })
        setAttributes(button, {onclick: photo.urls.raw,}
        )
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        img.addEventListener('load',checkLoaded);
        a.appendChild(img);
        imageContainer.appendChild(a);
        
        //imageContainer.appendChild(button);
    })        
}

// helper function
// set attributes to an element
function setAttributes(item, attribuitesList) {
    for (const [key, value] of Object.entries(attribuitesList)) {
        console.log([key,value]);
        item.setAttribute(key, attribuitesList[key]);
    }
}

// check if the images are loading (number of pictures that complete loading === total number of pictures)
function checkLoaded() {
    loadedImage++;
    if (loadedImage === totalImage) {
        ready=true;
        loader.hidden=true;            
    }
}

// the windows check everytime if the page is scrolling
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPicture();
    }
});
  
getPicture();

