export const profileUsername = document.querySelector('.profile__username');
export const profileProphecy = document.querySelector('.profile__prophecy');
export const profileEditButton = document.querySelector('.profile__button-edit');
export const addPostButton = document.querySelector('.profile__add-post-button');
export const formElementEdit = document.querySelector('.popup__form_type_edit');
export const formElementAdd = document.querySelector('.popup__form_type_add');
export const nameInput = document.querySelector('.popup__form-item_type_name');
export const prophecyInput = document.querySelector('.popup__form-item_type_prophecy');
export const postTemplate = document.querySelector('#post-template').content;
export const postElement =  postTemplate.querySelector('.post')
export const postContainer = document.querySelector('.posts');

export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-item',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup_save-button_inactive',
    inputErrorClass: 'popup__form-error-redline_active',
    errorClass: 'popup__form-error-input_active'
}