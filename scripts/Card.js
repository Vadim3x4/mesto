import {imageViewPopup} from "./index.js";



/**
 * Класс для создания карточки поста.
 * Доступный метод .getPost(post_image:url, post_title:str, template:html)
 */
export class Card {
    constructor(link, title, template) {
        this._link = link;
        this._title = title;
        this._template = template.cloneNode(true);
    }

    _createPost() {
        const imageView = this._template.querySelector('.post__image')
        imageView.src = this._link;
        imageView.alt = this._title;
        this._template.querySelector('.post__title').textContent = this._title;
        this._postEventListener(imageView)
        return this._template
    }

    _likePost(post){
        post.toggle('post__like_active')
    }

    _deletePost(post){
        post.remove()
    }

    _postEventListener(imageView){
        const likeButton = this._template.querySelector('.post__like')
        const deleteButton = this._template.querySelector('.post__delete')
        likeButton.addEventListener('click', (evt) => {
            this._likePost(evt.target.classList)
        })
        deleteButton.addEventListener('click', () => {
            this._deletePost(this._template)
        })
        imageView.addEventListener('click', () => {
            imageViewPopup(this._link, this._title)
        });
    }

    getPost(){
        const postElement =  this._createPost(this._link, this._title)
        return postElement
    }
}