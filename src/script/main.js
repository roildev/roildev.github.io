"use strict";
$(document).ready(function() {
    $('.slider').slick({
        arrows: true,
        dots: true,
        speed: 2000,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnFocus: true,
        pauseOnHover: true,
        pauseOnDotsHover: true,
        draggable: true,
        swipe: true,
        touchTreshold: 10,
        centerMode: false
    });
});

const servisContent = document.querySelectorAll('.servis__content'),
    circleBig = document.querySelectorAll('.circle-big'),
    circleSmall = document.querySelectorAll('.circle-small')

console.log(servisContent);

servisContent.forEach(card => {
    card.addEventListener('mouseover', (event) => {
        if (event.target.closest('.servis__content')) {
            card.childNodes[1].classList.remove('circle-big-active');
            card.childNodes[1].classList.add('circle-big-active');
            card.childNodes[3].classList.remove('circle-small-active');
            card.childNodes[3].classList.add('circle-small-active');
        }
    });
    card.addEventListener('mouseleave', (event) => {
        if (event.target.closest('.servis__content')) {
            card.childNodes[1].classList.remove('circle-big-active');
            card.childNodes[3].classList.remove('circle-small-active');
        }
    });
});