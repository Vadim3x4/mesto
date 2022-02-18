/**
 * Класс для создания карточки поста.
 * Доступный метод .getPost(post_image:url, post_title:str, template:html, handleCardClick:func)
 */
export default class Card {
    constructor(link, title, template, handleCardClick) {
        this._link = link;
        this._title = title;
        this._template = template.cloneNode(true);
        this._handleCardClick = handleCardClick
    }

    _createPost() {
        this._imageView = this._template.querySelector('.post__image')
        this._imageView.src = this._link;
        this._imageView.alt = this._title;
        this._template.querySelector('.post__title').textContent = this._title;
        this._postEventListener()
        return this._template
    }

    _likePost(post){
        post.toggle('post__like_active')
    }

    _deletePost(post){
        post.remove()
    }

    _postEventListener(){
        const likeButton = this._template.querySelector('.post__like')
        const deleteButton = this._template.querySelector('.post__delete')
        likeButton.addEventListener('click', (evt) => {
            this._likePost(evt.target.classList)
        })
        deleteButton.addEventListener('click', () => {
            this._deletePost(this._template)
        })
        this._imageView.addEventListener('click', () => {
            this._handleCardClick(this._link, this._title)
        });
    }

    getPost(){
        return this._createPost(this._link, this._title)
    }
}