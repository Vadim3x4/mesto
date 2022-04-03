import Popup from './Popup.js';

/**
 * Класс отвечает за обработку действий поп-апа удаления карточки
 */
export default class PopupWithDeleteCard extends Popup {
    constructor(popup) {
        super(popup);
        this._form = this._popup.querySelector('.popup__form');
    }

    setSubmitAction(action) {
        this._action = action
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._action();
        })
    }
}