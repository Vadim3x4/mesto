const content = document.querySelector('.content');
const popup = document.querySelector('.popup');
const profileEditButton = content.querySelector('.profile__button-edit');
const popupCloseButton = content.querySelector('.popup__close-button');

const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__form-item-name');
const prophecyInput = document.querySelector('.popup__form-item-prophecy');
const profileUsername = content.querySelector('.profile__username');
const profileProphecy = content.querySelector('.profile__prophecy');


/**
 * Функция открытия поп-апа, для редактирования профиля
 */
function openPopup() {
    nameInput.value = profileUsername.textContent;
    prophecyInput.value = profileProphecy.textContent;
    popup.classList.add('popup_opened');
}

/**
 * Функция закрытия поп-апа, для редактирования профиля
 */
function closePopup() {
    popup.classList.remove('popup_opened');
}


/**
 * Обработчик кнопки принятия формы
 * @param evt
 */
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileUsername.textContent = nameInput.value
    profileProphecy.textContent = prophecyInput.value
    closePopup()
}

profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);