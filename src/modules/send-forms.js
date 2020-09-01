const sendForms = () => {
    
    // Variables

    const formErrorMessage = document.querySelectorAll('.form-error'),
        allForms = document.querySelectorAll('form'),
        errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо мы скоро с Вами свяжемся!',
        statusMessage = document.createElement('div');
 
    statusMessage.style.cssText = 'font-size: 2rem';
    statusMessage.style.color = '#19b5fe';;;

    // Functions

    const postData1 = (body) => fetch('./src/mail-send.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    });

    const postData = (body) => {
        console.log(body)
        return fetch('../src/mail-send.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }
 
    
    const formValidation = (form) => {
        let formData = {};
        formData.formName = form.name
        for (let i = 0; i < form.length; i++) {
            if (form[i].nodeName === 'INPUT' && form[i].type !== 'checkbox') {
                if (form[i].validity.typeMismatch) {
                    form[i].setCustomValidity("I expect an e-mail, darling!");
                } else {
                    form[i].setCustomValidity("");
                }
                // if (form[i].name === 'cityFrom') {
                //     console.log(form[i].value)
                // }
            }
        }
        console.log(formData)
    };

    // Listeners

    allForms.forEach(form => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
 
            console.log(form)
            // if (event.target.type ==='submit') {
            //     console.log(form.value);
            //     formValidation(form);
            // }
 
            const formData = new FormData(form);
            let body = {};
    
            form.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
    
            formData.forEach((val, key) => {
                body[key] = val;
            });
            console.log(body)
    
            postData(body)
                .then(response => {
                    if (response.status !== 200) {
                        console.log(response);
                        throw new Error('status network not 200');
                    }
                    console.log(response);
                    statusMessage.textContent = successMessage;
                    setTimeout(() => {
                        statusMessage.textContent = '';
                    }, 5000);
                         
                    form.reset();
                })
                .catch(error => {
                    statusMessage.textContent = errorMessage;
                    setTimeout(() => {
                        statusMessage.textContent = '';
                    }, 5000);
                    console.error(error);
                });
            
        });
    });
};

export default sendForms;