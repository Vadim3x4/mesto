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
const postImage = content.querySelector('.popup__image-view');

const initialCards = [
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


/**
 * Функция для работы с создание/удалением/изменений состояния поста.
 * @param postLink
 * @param postTitle
 */
function addPost(postLink, postTitle) {
    const postTemplate = document.querySelector('#post-template').content;
    const postElement =  postTemplate.querySelector('.post').cloneNode(true);

    postElement.querySelector('.post__image').src = postLink;
    postElement.querySelector('.post__title').textContent = postTitle;
    postElement.querySelector('.post__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('post__like_active');
    });
    postElement.querySelector('.post__delete').addEventListener('click', function () {
        postElement.remove()
    });
    postElement.querySelector('.post__image').addEventListener('click', function (evt) {
        openPopup(evt, postLink)
    });
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
 */
function openPopup(evt, image_link='d') {
    if (evt.target.className.includes('profile__button-edit')){
        nameInput.value = profileUsername.textContent;
        prophecyInput.value = profileProphecy.textContent;
        popupEdit.classList.add('popup_opened');
    } else if (evt.target.className.includes('profile__add-post-button')){
        popupAdd.classList.add('popup_opened');
    } else if(evt.target.className.includes('post__image')){
        popupImage.classList.add('popup_opened');
        postImage.src = image_link;
    }
}

/**
 * Функция закрытия поп-апа
 */
function closePopup() {
    popupEdit.classList.remove('popup_opened');
    popupAdd.classList.remove('popup_opened');
    popupImage.classList.remove('popup_opened');
}

/**
 * Обработчик кнопки принятия формы
 * @param evt
 */
function formSubmitHandler (evt) {
    evt.preventDefault();
    if(evt.target.className.includes('popup__form_type_edit')){
        profileUsername.textContent = nameInput.value;
        profileProphecy.textContent = prophecyInput.value;
        closePopup();
    } else {
        addPost(postLinkInput.value, postTitleInput.value);
        postLinkInput.value = '' ;
        postTitleInput.value = '' ;
        closePopup();
    }

}

renderPosts()
profileEditButton.addEventListener('click', openPopup);
addPostButton.addEventListener('click', openPopup);

popupCloseButtonEdit.addEventListener('click', closePopup);
popupCloseButtonAdd.addEventListener('click', closePopup);
popupCloseButtonImageView.addEventListener('click', closePopup);

formElementEdit.addEventListener('submit', formSubmitHandler);
formElementAdd.addEventListener('submit', formSubmitHandler);

