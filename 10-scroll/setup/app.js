const header = document.querySelector('header');
const menu = document.querySelector('#nav-menu');
const links = document.querySelectorAll('a');
const year = document.querySelector('footer #year');
const scrollBtn = document.querySelector('#scroll-btn');

const headerHeight = header.getBoundingClientRect().height;
const homePageHeight = document.querySelector('section#Home').getBoundingClientRect().height;

// auto-update year
year.outerHTML = new Date().getFullYear();

// menu expanding/collapsing for mobile
menu.addEventListener('click', () => header.classList.toggle('expand'));

window.addEventListener('scroll', () => {
    const positionY = window.scrollY;

    // change header style according to the positionY
    header.classList.toggle('scrolled', 
        positionY > homePageHeight - headerHeight
    );

    // toggle scroll-to-top btn according to the positionY
    scrollBtn.classList.toggle('show', positionY > homePageHeight);
});

links.forEach(link => {
    const href = link.getAttribute('href');

    // if link starts with '#'
    if (/^\#/.test(href)) {
        link.addEventListener('click', (e) => {
            // get targeted element's position
            elemHeight = document.querySelector(href).offsetTop;

            e.preventDefault();

            // collapse menu if it is expanded
            header.classList.remove('expand');
            
            // scroll to targeted element's position
            window.scrollTo({
                left: 0,
                top: elemHeight - headerHeight,
                behavior: 'smooth'
            });
        });
    }
})