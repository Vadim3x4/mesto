import {imageViewPopup} from "./index.js";

const postContainer = document.querySelector('.posts');

/**
 * Класс для создания карточки поста.
 * Доступный метод .getPost(post_image:url, post_title:str, template:html)
 */
export class Post {
    constructor(link, title, template) {
        this._link = link;
        this._title = title;
        this._template = template.cloneNode(true);
    }

    _createPost() {
        let imageView = this._template.querySelector('.post__image')
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
        let likeButton = this._template.querySelector('.post__like')
        let deleteButton = this._template.querySelector('.post__delete')
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
        let postElement =  this._createPost(this._link, this._title)
        postContainer.prepend(postElement);
    }
}