const sendForms = () => {

    $('form').each(function() {
        $(this).submit(function() {
            let errors = false;
            $(this).find('.form-error').css("display", "none");
            $(this).find('.input-normal').removeClass('input-normal-invalid');

            $(this).find('input, textarea').each(function () {
                if($.trim($(this).val()) == '') {
                    errors = true;
                    $(this).addClass('input-normal-invalid');
                    if ($(this).next()[0].nodeName === 'SPAN') {
                        console.log($(this).next())
                        $(this).next().css("display", "block");
                    };
                }
            });

            if (!errors) {
                const dataForm = $( this ).serialize();
                $.ajax({
                    url: '../src/mail-send.php',
                    type: 'POST',
                    data: dataForm,
                    success: function(result) {

                    },
                    error: function() {
                        alert('Error');
                    }
                });
            }

            return false;
        });
    });









   /*
    
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

    allForms1.forEach(form => {
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

    */
};

export default sendForms;