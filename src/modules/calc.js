const calc = ()=> {
    const season = document.getElementById('switch-season'),
        distance = document.getElementById('distance'),
        waitSwitch = document.getElementById('switch-wait'),
        waitTime = document.getElementById('wait-time'),
        time = document.querySelector('.time'),
        quantityPers = document.getElementById('quantity'),
        childsSwitch = document.getElementById('switch-child'),
        childSettings = document.querySelector('.child-settings'),
        childQuantity = document.getElementById('child-quantity'),
        childAge = document.getElementById('child-age'),
        calculation = document.getElementById('calc'),
        totalPrice = document.getElementById('total-price'),
        accordionHeading = document.querySelectorAll('.panel-heading'),
        accordionCollapse = document.querySelectorAll('.panel-collapse');

    let dataOrder = {
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
                    <input style="width: 80%;" class="childAgeUnico input-normal" name="child_age${i}" type="text">
                    <span class="form-error">Введите цифру меньше 12</span>`;
                    childAge.appendChild(div)
                } else {
                    div.innerHTML = `<span>Возраст ${i}-eго ребенка</span>
                    <input style="width: 80%;" class="childAgeUnico input-normal" name="child_age${i}" type="text">
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
                        target.value = +target.value;
                        errorMessage('hide', target);
                    }
                    dataOrder.childs.childAge.push(+childAge.value);
                });
            });
        }
    }

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

    //  listeners

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
        if (target.value.match(regExp) || target.value < 1) {
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
        totalPrice.scrollIntoView({
            block: 'center',
            behavior: "smooth"
        });
    });
}

export default calc;