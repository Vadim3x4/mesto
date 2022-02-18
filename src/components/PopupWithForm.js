import Popup from './Popup.js';

/**
 * Класс для создания поп-апа с формой
 */
export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popup.querySelectorAll('.popup__form-item');
        this._form = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        this._formValues = [];
        this._inputList.forEach(input => {
            this._formValues.push(input.value);
        })
        return this._formValues;
    }

    close(){
        super.close();
        this._form.reset()
    }

    setEventListeners(evt) {
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues())
        }
        )
    }
}