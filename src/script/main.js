 "use strict";
 //   { "moz": true, "esnext": true, "globals": {}, "globalstrict": false, "quotmark": true, "smarttabs": true, "trailing": true, "undef": true, "unused": true, "maxerr": 10000, "devel": true, "predef": ["require", "exports"] };
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
     circleSmall = document.querySelectorAll('.circle-small'),
     accordionHeading = document.querySelectorAll('.panel-heading'),
     accordionCollapse = document.querySelectorAll('.panel-collapse'),
     header = document.getElementById('header'),
     doc = document;


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

//  header
window.addEventListener('scroll', function() {
    if (pageYOffset > 100) {
        if(!header.classList.contains('header-light')) {
            header.classList.add('header-light');
        }
    } else {
        header.classList.remove('header-light');
    }
    // document.getElementById('showScroll').innerHTML = pageYOffset + 'px';
  });

//  accordion

accordionHeading.forEach((item, index) => {
    item.addEventListener('click', () => {
        accordionCollapse.forEach((item2, index2) => {
            if (item2.classList.contains('collapse-open')) {
                item2.classList.remove('collapse-open');
            } else {
                item2.classList.remove('collapse-open');
                if (index === index2) {
                    item2.classList.toggle('collapse-open');
                }
            }
        });
    });
});

    

 // const popupLinks = document.querySelectorAll('.popup-link');
 // const body = document.querySelector('body');
 // const lockPadding = document.querySelectorAll('.lock-padding');

 // let unlock = true;

 // const timeout = 800;

 // if (popupLinks.length > 0) {
 //     for (let index = 0; index < popupLinks.length; index++) {
 //         const popupLink = popupLinks[index];
 //         popupLink.addEventListener('click', function(e) {
 //             const popupName = popupLink.getAttribute('href').replace('#', '');
 //             const curentPopup = document.getElementById(popupName);
 //             popupOpen(curentPopup);
 //             e.preventDefault();
 //         });
 //     }
 // }

 // const popupCloseIcon = document.querySelectorAll('.close-popup');
 // if (popupCloseIcon.length > 0) {
 //     for (let index = 0; index < popupCloseIcon.length; index++) {
 //         const el = popupCloseIcon[index];
 //         el.addEventListener('click', function(e) {
 //             popupClose(el.closest('.popup'));
 //             e.preventDefault();
 //         });
 //     }
 // }

 // function popupOpen(curentPopup) {
 //     if (curentPopup && unlock) {
 //         const popupActive = document.querySelector('.popup.open');
 //         if (popupActive) {
 //             popupClose(popupActive, false);
 //         } else {
 //             bodyLock();
 //         }
 //         curentPopup.classList.add('open');
 //         curentPopup.addEventListener('click', function(e) {
 //             if (!e.target.closest('.popup__content')) {
 //                 popupClose(e.target.closest('.popup'));
 //             }
 //         });
 //     }

 // }

 // function popupClose(popupActive, doUnlock = true) {
 //     if (unlock) {
 //         popupActive.classList.remove('open');
 //         if (doUnlock) {
 //             bodyUnLock();
 //         }

 //     }
 // }

 // function bodyLock() {
 //     const lockPaddingValue = window.innerWidth - document.querySelector('.wraper').offsetWidth + 'px';

 //     for (let index = 0; index < lockPadding.length; index++) {
 //         const el = lockPadding[index];
 //         el.style.paddingRight = lockPaddingValue;
 //     }
 //     body.style.paddingRight = lockPaddingValue;
 //     body.classList.add('lock');

 //     unlock = false;
 //     setTimeout(function() {
 //         unlock = true;
 //     }, timeout);
 // }