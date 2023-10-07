const sliderContainer = document.querySelector('.slider-container'),
    sliderWidth = sliderContainer.getBoundingClientRect().width,
    indicatorContainer = document.querySelector('#index-indicators'),
    indicators = document.getElementsByClassName('index'),
    buttonContainer = document.querySelector('.controls');

let initialPos, initialIndex;

const images = [ 
    { 
        src: 'images/img-1.jpeg', 
        title: 'The Ocean'
    },
    { 
        src: 'images/img-2.jpeg', 
        title: 'Pineapple with sunglasses on a beach'
    },
    { 
        src: 'images/person-1.jpeg', 
        title: 'A girl with a street background'
    }];

window.addEventListener('DOMContentLoaded', () => createSlides());

// Touch events
sliderContainer.addEventListener('touchstart', touchStartAction);
sliderContainer.addEventListener('touchend', touchEndAction);

// Mouse event
sliderContainer.addEventListener('mousedown', touchStartAction);

// Button click event
buttonContainer.addEventListener('click', (e) => {
    const target = e.target;
    const currentIndex = getCurrentIndex();

    if (target.matches('button#nextBtn')) {
        nextIndex(currentIndex);
    } else if (target.matches('button#prevBtn')) {
        prevIndex(currentIndex);
    } 
});

// create slides and indicators dynamically
function createSlides() {
    const slides = images.map(image => 
        `<img src=${image.src} alt=${image.title} class="slide" lazy/>`
    ).join('\n');
    sliderContainer.innerHTML = slides;

    const currentIndex = getCurrentIndex();
    const indicators = images.map((image, index) => index === currentIndex
        ? `<span class="index active"></span>`
        : `<span class="index"></span>`
    ).join('\n');
    indicatorContainer.innerHTML = indicators;
}

function touchStartAction (e) {
    initialPos = e.clientX || e.changedTouches[0].clientX;
    initialIndex = getCurrentIndex();

    if (e.type === "mousedown") {
        e.preventDefault();
        document.addEventListener('mousemove', mouseMoveAction);
        document.addEventListener('mouseup', touchEndAction);
    }
}

function touchEndAction (e) {
    const lastPos = e.clientX || e.changedTouches[0].clientX;
    const movedDistance = initialPos > lastPos
        ? initialPos - lastPos
        : lastPos - initialPos;

    if (e.type === "mouseup") {
        document.removeEventListener('mousemove', mouseMoveAction);
        document.removeEventListener('mouseup', touchEndAction);
    }

    if (movedDistance < sliderWidth / 3) {
        scrollToIndex(initialIndex);
        return;
    }

    if (initialPos > lastPos)
        nextIndex(initialIndex);
    else 
        prevIndex(initialIndex);
}

function mouseMoveAction (e) {
    const movedDistance = initialPos - e.clientX;
    sliderContainer.scroll({
        left: (initialIndex * sliderWidth) + movedDistance,
        top: 0
    });
}

// get current index by scrolled distance
const getCurrentIndex = () => 
    Math.round(sliderContainer.scrollLeft / sliderWidth);

// next index
const nextIndex = (currentIndex) => {
    const indexToGo = currentIndex < images.length - 1 ? currentIndex + 1 : 0;

    scrollToIndex(indexToGo);
}

// previous index
const prevIndex = (currentIndex) => {
    const indexToGo = currentIndex > 0 ? currentIndex - 1 : images.length - 1;

    scrollToIndex(indexToGo);
}

// scroll to the destination
function scrollToIndex (indexToGo) {
    sliderContainer.scroll({
        left: sliderWidth * indexToGo,
        top: 0
    });

    // remove previous indicator's active class
    [...indicators].forEach(indicator => indicator.classList.remove('active'));
    // add next indicator's active class
    indicators[indexToGo].classList.add('active');
}
