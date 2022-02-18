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
    profileUsername,
    profileProphecy
} from '../utils/constants.js'


/**
 * Функция создания карточки
 */
function createCard(item) {
    const card = new Card(item.link,item.name, postElement, handleCardClick);
    return card.getPost()
}

function renderer(item) {
    section.addItem(createCard(item))
}

function handleProfileFormSubmit (data) {
    userInfo.setUserInfo(data)
    popupEditForm.close();
}

function handleAddCard (data) {
    const newCard = createCard({link:data[0], name:data[1]})
    postContainer.prepend(newCard);
    popupAddForm.close()
}

function handleCardClick(postLink, postTitle){
    popupImage.open(postTitle, postLink)
}

const profileEditFormValidation = new FormValidator(config, formElementEdit);
const postAddFormValidation = new FormValidator(config, formElementAdd);
profileEditFormValidation.enableValidation()
postAddFormValidation.enableValidation()

const userInfo = new UserInfo(
    profileUsername,
    profileProphecy
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
    nameInput.value = profileInfo.name;
    prophecyInput.value = profileInfo.prophecy;
    profileEditFormValidation.resetValidation()
    popupEdit.open()
});

addPostButton.addEventListener('click', () => {
    postAddFormValidation.resetValidation()
    popupAdd.open()
});






