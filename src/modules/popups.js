const popups = () => {

    // variables

    const popups = document.querySelectorAll('.popup'),
        btnsOpenPopup = document.querySelectorAll('.open-popup');


    // functions

    const openPopup = (name) => {
        popups.forEach(popup => {
            if (popup.attributes.title.nodeValue === name) {
                const popupContent = popup.querySelector('.popup__content');
 
                popup.style.visibility = 'visible';
                popupContent.classList.add('popup__content-active');
 
                popup.addEventListener('click', (event) => {
                    if (!event.target.closest('.popup__content') ||
                        event.target.closest('.popup__close')) {
                            closePopup(popupContent, popup);
                    }
                });
            }
        });
    }
 
    const closePopup = (popupContent, popup) => {
        popupContent.classList.remove('popup__content-active');
        popup.style.visibility = 'hidden';
    }

    // listebers

    btnsOpenPopup.forEach(btn => {
        btn.addEventListener('click', (event) => {
            openPopup(event.target.name);
        });
    });


}

export default popups;