/**
 * Класс для создания карточки поста.
 */
export default class Card {
    constructor({data, template, handleCardClick, handleDelPost, user, handleSetLike, handleDelLike}) {
        this._link = data.link;
        this._title = data.name;
        this._template = template.cloneNode(true);
        this._likes = data.likes
        this._cardId = data._id
        this._cardOwnerId = data.owner._id;
        this._user = user
        this._handleCardClick = handleCardClick
        this._handleSetLike = handleSetLike
        this._handleDelPost = handleDelPost
        this._handleDelLike = handleDelLike

    }

    _createPost() {
        this._imageView = this._template.querySelector('.post__image')
        this._likeCounter = this._template.querySelector('.post__like-counter')
        this._likeCounter.textContent = this._likes.length
        this._imageView.src = this._link;
        this._imageView.alt = this._title;
        this._template.querySelector('.post__title').textContent = this._title;
        this._likeButton = this._template.querySelector('.post__like')
        this._deleteButton = this._template.querySelector('.post__delete')
        this._postEventListener()
        this._delBtnActive()
        this._likeBtnActive()
        return this._template
    }

    deletePost(){
        this._template.remove()
    }

    _delBtnActive() {
        if (this._user !== this._cardOwnerId) {
            this._deleteButton.remove();
        }
    }

    likePost(data) {
        this._likes = data.likes;
        this._likeCounter.textContent = this._likes.length;
        this._likeButton.classList.toggle('post__like_active');
    }

    _likeBtnActive() {
        if (this.postIsLiked()){
            this._likeButton.classList.toggle('post__like_active');
            }
        }

    postIsLiked() {
        for (let i = 0; i < this._likes.length; i++) {
            if (this._likes[i]._id === this._user){return true}
        }
    }

    _postEventListener(){
        this._likeButton.addEventListener('click', () => {
            if (!this.postIsLiked()){
                this._handleSetLike(this._cardId)
            }else{
                this._handleDelLike(this._cardId)
            }
        })
        this._deleteButton.addEventListener('click', () => {
            this._handleDelPost(this._cardId, this._template)
        })
        this._imageView.addEventListener('click', () => {
            this._handleCardClick(this._link, this._title)
        });
    }

    getPost(){
        return this._createPost(this._link, this._title)
    }
}