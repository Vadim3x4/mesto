import {initialCards, config} from './initialCards.js';
import {Card} from "./Card.js";
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
const postContainer = document.querySelector('.posts');

/**
 * Функция создания карточки
 */
function createCard(item) {
    const card = new Card(item.link,item.name, postElement);
    const cardElement = card.getPost()
    return cardElement
}

function renderPosts(){
    initialCards.forEach(function (item) {
        const cardElement = createCard(item)
        postContainer.prepend(cardElement);
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
    const newCard = createCard({link:postLinkInput.value, name:postTitleInput.value})
    postContainer.prepend(newCard);
    postLinkInput.value = '' ;
    postTitleInput.value = '' ;
    closePopup(popupAdd);
}

/**
 * Функция для закрывания поп-апа при нажатии Esc
 * @param evt
 */
function closePopupByClickingEscape(evt) {
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
    document.addEventListener('keydown', closePopupByClickingEscape);
    popup.addEventListener('click', closePopupByClickingOverlay);
}

/**
 * Функция для удаления слушаетелей
 * @param popup
 */
function removeEventPopupListeners(popup){
    document.removeEventListener('keydown', closePopupByClickingEscape);
    popup.addEventListener('click', closePopupByClickingOverlay);
}

export function imageViewPopup(postLink, postTitle){
    popupImageView.src = postLink;
    popupImageView.alt = postTitle;
    popupImageTitle.textContent = postTitle;
    openPopup(popupImage);
}

const profileEditFormValidation = new FormValidator(config, formElementEdit);
const postAddFormValidation = new FormValidator(config, formElementAdd);
profileEditFormValidation.enableValidation()
postAddFormValidation.enableValidation()

profileEditButton.addEventListener('click', () => {
    nameInput.value = profileUsername.textContent;
    prophecyInput.value = profileProphecy.textContent;
    profileEditFormValidation.resetValidation()
    openPopup(popupEdit)
});

addPostButton.addEventListener('click', () => {
    postAddFormValidation.resetValidation()
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
