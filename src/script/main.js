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

    const servisContent = document.querySelectorAll('.servis__content'),
        accordionHeading = document.querySelectorAll('.panel-heading'),
        accordionCollapse = document.querySelectorAll('.panel-collapse'),
        header = document.getElementById('header'),
        arrowUp = document.getElementById('arrow-up'),
        season = document.getElementById('switch-season'),
        distance = document.getElementById('distance'),
        waitSwitch = document.getElementById('switch-wait'),
        time = document.querySelector('.time'),
        waitTime = document.getElementById('wait-time'),
        quantityPers = document.getElementById('quantity'),
        childsSwitch = document.getElementById('switch-child'),
        childSettings = document.querySelector('.child-settings'),
        childAge = document.getElementById('child-age'),
        childQuantity = document.getElementById('child-quantity'),
        totalPrice = document.getElementById('total-price'),
        formErrorMessage = document.querySelectorAll('.form-error'),
        calculation = document.getElementById('calc'),
        submitFormCalc = document.getElementById('submit-form-calc'),
        allForms = document.querySelectorAll('form');

                
    let arrowShow = false,
        dataOrder = {
            season: 'summer',
            distance: 0,
            wait: false,
            waitTime: 0,
            quantityPers: 0,
            childs: {
                available: false,
                childQuantity: 0,
                childAge: []
            },
            totalPrice: 0
        };
    ;

    // functions

    const calcPriceTaxi = () => {
        const distance = dataOrder.distance,
            priceKM = dataOrder.distance <= 80 ? 0.8 : 
            dataOrder.distance > 80 && dataOrder.distance <= 120 ? 0.7 :
            dataOrder.distance > 120 && dataOrder.distance <= 150 ? 0.65 :
            dataOrder.distance > 150 ? 0.6 : 0.6,
            seasonMargen = dataOrder.season === 'summer' ? 0.05 : 0.05,
            waitTimePrice = dataOrder.waitTime * 10,
            quantityPers = dataOrder.quantityPers;
        
        let totalPriceAccordion = distance * priceKM;
        if (dataOrder.season === 'summer') {
            totalPriceAccordion += totalPriceAccordion * seasonMargen;
        } else {
            totalPriceAccordion -= totalPriceAccordion * seasonMargen;
        }
        if (dataOrder.wait) {
            totalPriceAccordion += waitTimePrice;
        }
        if (quantityPers > 4) {
            totalPriceAccordion *= 1.7;
        }
        
        return Math.floor(totalPriceAccordion);

    }

    
    const errorMessage = (message, target) => {
        target = message === 'show' ?
        target.nextElementSibling.style.display = 'block' :
        target.nextElementSibling.style.display = 'none';
    }

    const addElement = (nameBlock, amount) => {
        if (nameBlock === 'age') {
            // добавление в обект количество детей
            dataOrder.childs.childQuantity = amount;

            if (childAge.childElementCount) {
                for (let i = 0; childAge.childElementCount; i++) {
                    childAge.removeChild(childAge.firstElementChild);
                }
            }
            for (let i = 1; i <= amount; i++) {
                const div = document.createElement('li');
                if (i < 3) {
                    div.innerHTML = `<span>Возраст ${i}-ого ребенка</span>
                    <input style="width: 80%;" class="input-normal" name="child_age${i}" class="childAgeUnico" type="text">
                    <span class="form-error">Введите цифру меньше 12</span>`;
                    childAge.appendChild(div)
                } else {
                    div.innerHTML = `<span>Возраст ${i}-eго ребенка</span>
                    <input style="width: 80%;" class="input-normal" name="child_age${i}" class="childAgeUnico" type="text">
                    <span class="form-error">Введите цифру меньше 12</span>`;
                    childAge.appendChild(div)
                }
            }
            const childAgeUnico = document.querySelectorAll('.childAgeUnico');
            childAgeUnico.forEach(childAge => {
                childAge.addEventListener('input', (event) => {
                    const regExp = /\D/g;
                    const target = event.target;
                    
                    if (target.value.match(regExp) || +target.value > 12) {
                        target.value = 0;
                        errorMessage('show', target);
                    } else {
                        target.value = target.value;
                        errorMessage('hide', target);
                    }
                    dataOrder.childs.childAge.push(+childAge.value);
                });
            });
        }
    }

    const formValidation = (form) => {
        for (let i = 0; i < form.length; i++) {
            if (form[i].nodeName === 'INPUT' && form[i].type !== 'checkbox') {
                console.log(form[i].value)
            }
        }
    };


    // Listeners

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

    //  header and arrow Up
    window.addEventListener('scroll', function() {
        if (pageYOffset > 300) {
            if(!header.classList.contains('header-light')) {
                header.classList.add('header-light');
                arrowShow = true;
                arrowUp.style.display = 'flex';
            }
        } else {
            header.classList.remove('header-light');
            arrowShow = false;
            arrowUp.style.display = 'none';
        }
        if (!!arrowShow) {
            arrowUp.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            });
        }
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

    // calc

    season.addEventListener('change', (event) => {
        if (event.target.checked) {
            dataOrder.season = 'winter';
        } else {
            dataOrder.season = 'summer';
        }
    });

    distance.addEventListener('change', (event) => {
        const regExp = /\D/g;
        const target = event.target;
        if (target.value.match(regExp) || +target.value > 600) {
            target.value = 0;
            errorMessage('show', target);
           
        } else {
            target.value = target.value;
            errorMessage('hide', target);
            dataOrder.distance = +target.value;
        }
    });

    waitSwitch.addEventListener('change', (event) => {
        const checked = event.target.checked;
        if (checked) {
            time.style.display = 'flex';
            dataOrder.wait = true;
        } else {
            time.style.display = 'none';
            waitTime.value = '';
            dataOrder.wait = false;
        }
    });

    waitTime.addEventListener('change', (event) => {
        const regExp = /\D/g;
        const target = event.target;
        if (target.value.match(regExp)) {
            target.value = 0;
            errorMessage('show', target);
           
        } else {
            target.value = target.value;
            errorMessage('hide', target);
            dataOrder.waitTime = +target.value;
        }
    });
    
    quantityPers.addEventListener('change', (event) => {
        const regExp = /\D/g;
        const target = event.target;
        if (target.value.match(regExp)) {
            target.value = 0;
            errorMessage('show', target);
           
        } else {
            target.value = target.value;
            errorMessage('hide', target);
            dataOrder.quantityPers = +target.value;
        }
    });
    childsSwitch.addEventListener('change', (event) => {
        const checked = event.target.checked;
        childSettings.style.display = checked ? 'block' : 'none';
        
        if (checked) {
            dataOrder.childs.available = true;
            childQuantity.addEventListener('input', (event) => {
                console.log(event)
                const regExp = /\D/g;
                const target = event.target;
                if (target.value.match(regExp) || +target.value > 3) {
                    target.value = 0;
                    errorMessage('show', target);
                    if (childAge.childElementCount) {
                        for (let i = 0; childAge.childElementCount; i++) {
                            childAge.removeChild(childAge.firstElementChild);
                        }
                    }
                
                } else {
                    target.value = target.value;
                    errorMessage('hide', target);
                    dataOrder.childs.childQuantity = +target.value;
                    addElement('age', +target.value)
                }
            });
        } else {
            dataOrder.childs.available = false;
            dataOrder.childs.childAge = [];
            dataOrder.childs.childQuantity = 0;

            if (childQuantity) {
                childQuantity.children[1].value = ''
            }

            if (childAge.childElementCount) {
                for (let i = 0; childAge.childElementCount; i++) {
                    childAge.removeChild(childAge.firstElementChild);
                }
            }
        }
    });
    

    calculation.addEventListener('click', () => {
        totalPrice.value = calcPriceTaxi();
    });

    allForms.forEach(form => {
        form.addEventListener('click', (event) => {
            if (event.target.type ==='submit') {
                formValidation(form);
            }
        });
    })

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