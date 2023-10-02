const preloader = document.querySelector('#preloader');
const controlBtn = document.querySelector('.playback-controls #controlBtn');
const video = document.querySelector('.video-container');

// remove the preloader after window loaded
window.addEventListener('load', () => preloader.classList.add('hide'));

// play/pause the video & change the icon accordingly
controlBtn.parentElement.addEventListener('click', () => {
    if (!controlBtn.classList.contains('paused')) {
        controlBtn.classList.add('paused');
        video.pause();
        setTimeout(() => 
            controlBtn.innerHTML = `<i class="fa-solid fa-play"></i>`
        , 200);
    } else {
        controlBtn.classList.remove('paused');
        video.play()
        setTimeout(() => 
            controlBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`
        , 200);
    }
})