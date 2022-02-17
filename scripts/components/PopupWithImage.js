import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupLink = this._popup.querySelector('.popup__image-view');
        this._popupTitle = this._popup.querySelector('.popup__image-title')
    }

    open(name, link) {
        super.open();
        this._popupLink.src = link;
        this._popupTitle.textContent = name;
        this._popupLink.alt = name
    }
}