import "./index.css";

import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithDeleteCard from "../components/PopupWithDeleteCard.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js"
import Api from "../components/Api.js"
import {environment} from '../utils/env'

import {
    config,
    profileEditButton,
    addPostButton,
    formElementEdit,
    formElementAdd,
    nameInput,
    prophecyInput,
    postElement,
    postContainer,
    avatarEditButton
} from '../utils/constants.js'

const api = new Api(environment);

/**
 * Загрузка и рендер карточек
 */
Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([initialCards, userData]) => {
        userInfo.setUserInfo(userData);
        section.renderItems(initialCards);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    });


/**
 * Функция создания карточки
 * @param data
 * @returns {*}
 */
function createCard(data) {
    const card = new Card({
        data: data,
        template: postElement,
        user: userInfo.getUserId(),
        handleCardClick: (postLink, postTitle) =>{
            popupImage.open(postTitle, postLink)
        },
        handleDelPost: (cardId) => {
            popupDelPost.open()
            popupDelPost.setSubmitAction(() => {
                api.deleteCard(cardId)
                    .then(() => {
                        popupDelPost.close();
                        card.deletePost();
                    })
                    .catch((err) => {
                        console.log(`Ошибка: ${err}`);
                    });
                });
            },
        handleSetLike: (cardId) => {
            api.setLike(cardId)
                .then((data) => {
                    card.likePost(data);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
            },
        handleDelLike: (cardId) => {
            api.deleteLike(cardId)
                .then((data) => {
                    card.likePost(data);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
            }
        }
    );
    return card.getPost()
}

// Подключение валидации
const profileEditFormValidation = new FormValidator(config, formElementEdit);
const postAddFormValidation = new FormValidator(config, formElementAdd);
profileEditFormValidation.enableValidation()
postAddFormValidation.enableValidation()

/**
 * Создание объекта пользователя
 * @type {UserInfo}
 */
const userInfo = new UserInfo(
    '.profile__username',
    '.profile__prophecy',
    '.profile__avatar'
);

/**
 * Создание объекта секции карточек
 * @type {Section}
 */
const section = new Section(
    {
        renderer: (data) => {section.addItem(createCard(data))},
        selector: '.posts'
    },

);

/**
 * Создание объекта Поп-апа, для удаления карточки
 * @type {PopupWithDeleteCard}
 */
const popupDelPost = new PopupWithDeleteCard(
    '.popup_type_delete-post'
)

/**
 * Создание объекта Поп-апа, для просмотра изображения карточки
 * @type {PopupWithImage}
 */
const popupImage = new PopupWithImage(
    '.popup_type_image-view'
)

/**
 * Создание объекта Поп-апа, для изменения данных пользователя
 * @type {PopupWithForm}
 */
const popupEditForm = new PopupWithForm({
        popup: '.popup_type_edit-profile',
        handleFormSubmit: (data) => {
            popupEditForm.renderLoading(true)
            api.setUserInfo(data)
                .then(data => {
                    userInfo.setUserInfo(data);
                    popupEditForm.close();
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                })
                .finally(() => {
                    popupEditForm.renderLoading(false)
                    }
                )
            }
        })

/**
 * Создание объекта Поп-апа, для добавления карточки
 * @type {PopupWithForm}
 */
const popupAddForm = new PopupWithForm({
        popup: '.popup_type_add-post',
        handleFormSubmit: (data) => {
            popupAddForm.renderLoading(true)
            api.addCard(data)
                .then(data => {
                    postContainer.prepend(createCard(data));
                    popupAddForm.close()
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                })
                .finally(() => {
                    popupAddForm.renderLoading(false)
                    }
                )
            }
        })

/**
 * Создание объекта Поп-апа, для изменения аватара пользователя
 * @type {PopupWithForm}
 */
const popupEditAvatarForm = new PopupWithForm({
    popup: '.popup_type_edit-avatar',
    handleFormSubmit: (data) => {
        popupAddForm.renderLoading(true)
        api.editAvatar(data)
            .then((data) => {
                userInfo.setAvatar(data);
                popupEditAvatarForm.close();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                popupEditAvatarForm.renderLoading(false)
                }
            )
    }
})

//Слушатели для обработки событий в Поп-апах
popupImage.setEventListeners()
popupEditForm.setEventListeners()
popupAddForm.setEventListeners()
popupDelPost.setEventListeners()
popupEditAvatarForm.setEventListeners()

//Слушатели для обработки кнопок на странице
profileEditButton.addEventListener('click', () => {
    const profileInfo = userInfo.getUserInfo()
    nameInput.value = profileInfo.name.textContent;
    prophecyInput.value = profileInfo.prophecy.textContent;
    profileEditFormValidation.resetValidation()
    popupEditForm.open()
});

addPostButton.addEventListener('click', () => {
    postAddFormValidation.resetValidation()
    popupAddForm.open()
});

avatarEditButton.addEventListener('click', () => {
    popupEditAvatarForm.open()
});





