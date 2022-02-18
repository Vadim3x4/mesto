import "./index.css";

import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js"

import {
    initialCards,
    config,
    profileEditButton,
    addPostButton,
    formElementEdit,
    formElementAdd,
    nameInput,
    prophecyInput,
    postElement,
    postContainer,
} from '../utils/constants.js'


/**
 * Функция создания карточки
 */
function createCard(item) {
    const card = new Card(item.link,item.name, postElement, handleCardClick);
    return card.getPost()
}

/**
 * Функция, которая отвечает за создание и отрисовку данных на странице.
 * @param item
 */
function renderer(item) {
    section.addItem(createCard(item))
}

/**
 * Колбэк сабмита формы изменения профиля
 * @param data
 */
function handleProfileFormSubmit (data) {
    userInfo.setUserInfo(data)
    popupEditForm.close();
}

/**
 * Колбэк сабмита формы добавления новой карточки
 * @param data
 */
function handleAddCard (data) {
    const newCard = createCard({link:data.link, name:data.title})
    postContainer.prepend(newCard);
    popupAddForm.close()
}

/**
 * Колбэк для открытия поп-апа с изображением
 * @param postLink
 * @param postTitle
 */
function handleCardClick(postLink, postTitle){
    popupImage.open(postTitle, postLink)
}

const profileEditFormValidation = new FormValidator(config, formElementEdit);
const postAddFormValidation = new FormValidator(config, formElementAdd);
profileEditFormValidation.enableValidation()
postAddFormValidation.enableValidation()

const userInfo = new UserInfo(
    '.profile__username',
    '.profile__prophecy'
);
const section = new Section(
    {'items': initialCards, 'renderer': renderer},
    '.posts'
);
section.renderItems()
const popupEdit = new Popup(
    '.popup_type_edit-profile'
)
popupEdit.setEventListeners()
const popupAdd = new Popup(
    '.popup_type_add-post'
)
popupAdd.setEventListeners()
const popupImage = new PopupWithImage(
    '.popup_type_image-view'
)
popupImage.setEventListeners()
const popupEditForm = new PopupWithForm(
    '.popup_type_edit-profile',
    handleProfileFormSubmit
)
popupEditForm.setEventListeners()
const popupAddForm = new PopupWithForm(
    '.popup_type_add-post',
    handleAddCard
)
popupAddForm.setEventListeners()


profileEditButton.addEventListener('click', () => {
    const profileInfo = userInfo.getUserInfo()
    nameInput.value = profileInfo.name.textContent;
    prophecyInput.value = profileInfo.prophecy.textContent;
    profileEditFormValidation.resetValidation()
    popupEdit.open()
});

addPostButton.addEventListener('click', () => {
    postAddFormValidation.resetValidation()
    popupAdd.open()
});






