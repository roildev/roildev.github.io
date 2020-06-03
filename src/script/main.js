"use strict";
$(document).ready(function() {
    $('.slider').slick({
        arrows: true,
        dots: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 1500,
        pauseOnFocus: true,
        pauseOnHover: true,
        pauseOnDotsHover: true,
        draggable: true,
        swipe: true,
        touchTreshold: 10,
        centerMode: false
    });
});