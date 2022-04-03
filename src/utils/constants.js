export const profileEditButton = document.querySelector('.profile__button-edit');
export const addPostButton = document.querySelector('.profile__add-post-button');
export const formElementEdit = document.querySelector('.popup__form_type_edit');
export const formElementAdd = document.querySelector('.popup__form_type_add');
export const nameInput = document.querySelector('.popup__form-item_type_name');
export const prophecyInput = document.querySelector('.popup__form-item_type_prophecy');
export const postTemplate = document.querySelector('#post-template').content;
export const postElement =  postTemplate.querySelector('.post')
export const postContainer = document.querySelector('.posts');
export const avatarEditButton = document.querySelector('.profile__avatar-btn');

export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-item',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup_save-button_inactive',
    inputErrorClass: 'popup__form-error-redline_active',
    errorClass: 'popup__form-error-input_active'
}