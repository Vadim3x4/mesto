import {initialCards} from './initialCards.js';

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
const postContainer = content.querySelector('.posts');
const postTemplate = document.querySelector('#post-template').content;
const popupImageView = document.querySelector('.popup__image-view')
const popupImageTitle = document.querySelector('.popup__image-title')
const popupSaveButtonPost = document.getElementById('submit-newpost')
const popupSaveButtonEditUser = document.getElementById('submit-edit_user')


/**
 * Функция удаления поста
 * @param post
 */
function deletePost(post){
    post.remove()
}

/**
 * Функция лайка поста
 * @param post
 */
function likePost(post){
    post.toggle('post__like_active')
}

/**
 * Функция просмотра изображения, в отдельном поп-апе
 * @param postLink
 * @param postTitle
 */
function imageViewPopup(postLink, postTitle){
    popupImageView.src = postLink;
    popupImageView.alt = postTitle;
    popupImageTitle.textContent = postTitle;
    openPopup(popupImage);
}

/**
 * Функция создания поста
 * @param postLink
 * @param postTitle
 * @returns {Node}
 */
function createPost(postLink, postTitle) {
    const postElement =  postTemplate.querySelector('.post').cloneNode(true);
    const likeButton = postElement.querySelector('.post__like')
    const deleteButton = postElement.querySelector('.post__delete')
    const imageView =  postElement.querySelector('.post__image')
    imageView.src = postLink;
    postElement.querySelector('.post__title').textContent = postTitle;
    imageView.alt = postTitle;
    likeButton.addEventListener('click', (evt) => {
        likePost(evt.target.classList)
    })
    deleteButton.addEventListener('click', () => {
        deletePost(postElement)
    })
    imageView.addEventListener('click', () => {
        imageViewPopup(postLink, postTitle)
    });
    return postElement
}

/**
 * Функция добавления поста
 * @param postLink
 * @param postTitle
 */
function addPost(postLink, postTitle) {
    const postElement =  createPost(postLink, postTitle)
    postContainer.prepend(postElement);
}

/**
 * Функция рендера постов
 */
function renderPosts(){
    initialCards.forEach(function (item) {
    addPost(item.link, item.name)
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
    addPost(postLinkInput.value, postTitleInput.value);
    postLinkInput.value = '' ;
    postTitleInput.value = '' ;
    closePopup(popupAdd);
    deactivateButton(popupSaveButtonPost)
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