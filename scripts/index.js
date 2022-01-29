import {initialCards} from './initialCards.js';
import {Post} from "./Card.js";
import {FormValidator} from "./FormValidator.js";

const content = document.querySelector('.content');
const popupEdit = document.querySelector('.popup_type_edit-profile');
const popupAdd = document.querySelector('.popup_type_add-post');
const popupImage = document.querySelector('.popup_type_image-view');
const profileEditButton = content.querySelector('.profile__button-edit');
const addPostButton = content.querySelector('.profile__add-post-button');
const popupCloseButtonEdit = content.querySelector('.popup__close-button_type_edit');
const popupCloseButtonAdd = content.querySelector('.popup__close-button_type_add');
const popupCloseButtonImageView = content.querySelector('.popup__close-button_type_view');
const formElementEdit = document.querySelector('.popup__form_type_edit');
const formElementAdd = document.querySelector('.popup__form_type_add');
const nameInput = document.querySelector('.popup__form-item_type_name');
const prophecyInput = document.querySelector('.popup__form-item_type_prophecy');
const postLinkInput = document.querySelector('.popup__form-item_type_link');
const postTitleInput = document.querySelector('.popup__form-item_type_title');
const profileUsername = content.querySelector('.profile__username');
const profileProphecy = content.querySelector('.profile__prophecy');
const postTemplate = document.querySelector('#post-template').content;
const popupImageView = document.querySelector('.popup__image-view')
const popupImageTitle = document.querySelector('.popup__image-title')
const popupSaveButtonPost = document.getElementById('submit-newpost')
const postElement =  postTemplate.querySelector('.post')


/**
 * Функция рендера постов
 */
function renderPosts(){
    initialCards.forEach(function (item) {
        let post = new Post(item.link, item.name, postElement);
        post.getPost()
    });
}

/**
 * Функция открытия поп-апа
 *  * @param popup
 */
function openPopup(popup){
    popup.classList.add('popup_opened');
    setEventPopupListeners(popup);
}

/**
 * Функция закрытия поп-апа
 *  * @param popup
 */
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    removeEventPopupListeners(popup);
}

/**
 * Обработчик кнопки принятия формы редактирования профиля
 * @param evt
 */
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileUsername.textContent = nameInput.value;
    profileProphecy.textContent = prophecyInput.value;
    closePopup(popupEdit);
}

/**
 * Обработчик кнопки создания нового поста
 * @param evt
 */
function handleAddCard (evt) {
    evt.preventDefault();
    let newPost = new Post(postLinkInput.value, postTitleInput.value, postElement)
    newPost.getPost()
    postLinkInput.value = '' ;
    postTitleInput.value = '' ;
    closePopup(popupAdd);
    deactivateButton(popupSaveButtonPost, {
        formSelector: '.popup__form',
        inputSelector: '.popup__form-item',
        submitButtonSelector: '.popup__save-button',
        inactiveButtonClass: 'popup_save-button_inactive',
        inputErrorClass: 'popup__form-error-redline_active',
        errorClass: 'popup__form-error-input_active'
    })
}

/**
 * Функция для закрывания поп-апа при нажатии Esc
 * @param evt
 */
function keyHandler(evt) {
    const esc = 'Escape';
    if (evt.key === esc) {
        const openPopup = document.querySelector('.popup_opened');
        closePopup(openPopup);
    }
}

/**
 * Функция для закрывания поп-апа при нажатии оверлея
 * @param evt
 */
function closePopupByClickingOverlay(evt){
    if(evt.target === evt.currentTarget){
        closePopup(evt.target)
    }
}

/**
 * Функция для добавляения слушаетелей
 * @param popup
 */
function setEventPopupListeners(popup){
    document.addEventListener('keydown', keyHandler);
    popup.addEventListener('click', closePopupByClickingOverlay);
}

/**
 * Функция для удаления слушаетелей
 * @param popup
 */
function removeEventPopupListeners(popup){
    document.removeEventListener('keydown', keyHandler);
    popup.addEventListener('click', closePopupByClickingOverlay);
}

export function imageViewPopup(postLink, postTitle){
    popupImageView.src = postLink;
    popupImageView.alt = postTitle;
    popupImageTitle.textContent = postTitle;
    openPopup(popupImage);
}

/**
 * Функция деактивации кнопки подтверждения формы
 * @param buttonElement
 * @param config
 */
function deactivateButton(buttonElement, config){
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute("disabled", '');
}


profileEditButton.addEventListener('click', () => {
    nameInput.value = profileUsername.textContent;
    prophecyInput.value = profileProphecy.textContent;
    openPopup(popupEdit)
});
addPostButton.addEventListener('click', () => {
    openPopup(popupAdd)
});
popupCloseButtonEdit.addEventListener('click', ()=>{
    closePopup(popupEdit)
});
popupCloseButtonAdd.addEventListener('click', ()=>{
    closePopup(popupAdd)
});
popupCloseButtonImageView.addEventListener('click', ()=>{
    closePopup(popupImage)
});
formElementEdit.addEventListener('submit', handleProfileFormSubmit);
formElementAdd.addEventListener('submit', handleAddCard);
renderPosts()


/**
 * Функция валидации
 * @param config
 */
const enableValidation = (config) => {
    let formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        let newForm = new FormValidator(config, formElement)
        newForm.setEventListeners()
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__form-item',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup_save-button_inactive',
    inputErrorClass: 'popup__form-error-redline_active',
    errorClass: 'popup__form-error-input_active'
});