const sliderContainer = document.querySelector('.slider-container');
const indicatorContainer = document.querySelector('#index-indicators');
const indicators = document.getElementsByClassName('index');
const buttonContainer = document.querySelector('.controls');

const sliderWidth = sliderContainer.getBoundingClientRect().width;

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

buttonContainer.addEventListener('click', (e) => {
    const target = e.target;
    const currentIndex = findCurrentIndex();
    let indexToGo;

    if (target.matches('button#nextBtn')) {
        indexToGo = nextIndex(currentIndex);
    } else if (target.matches('button#prevBtn')) {
        indexToGo = prevIndex(currentIndex);
    } else return;

    sliderContainer.scroll({
        left: sliderWidth * indexToGo,
        top: 0
    });

    // remove previous indicator's active class
    indicators[currentIndex].classList.remove('active');
    // add next indicator's active class
    indicators[indexToGo].classList.add('active');
});

// create slides and indicators dynamically
function createSlides() {
    const slides = images.map(image => 
        `<img src=${image.src} alt=${image.title} class="slide" lazy/>`
    ).join('\n');
    sliderContainer.innerHTML = slides;

    const currentIndex = findCurrentIndex();
    const indicators = images.map((image, index) => index === currentIndex
        ? `<span class="index active"></span>`
        : `<span class="index"></span>`
    ).join('\n');
    indicatorContainer.innerHTML = indicators;
}

// calculate next index
const nextIndex = (currentIndex) => currentIndex < images.length - 1
    ? currentIndex + 1
    : 0;

// calculate previous index
const prevIndex = (currentIndex) => currentIndex > 0
    ? currentIndex - 1
    : images.length - 1;

// find current index by scrolled distance
const findCurrentIndex = () => 
    Math.round(sliderContainer.scrollLeft / sliderWidth);