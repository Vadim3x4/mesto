import Popup from './Popup.js';

/**
 * Класс для создания поп-апа с формой
 */
export default class PopupWithForm extends Popup {
    constructor({popup, handleFormSubmit}) {
        super(popup);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popup.querySelectorAll('.popup__form-item');
        this._form = this._popup.querySelector('.popup__form');
        this._submitButton = this._form.querySelector('.popup__save-button');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value
        })
        return this._formValues;
    }

    close(){
        super.close();
        this._form.reset()
    }

    renderLoading(status){
        if (status) {
            this._submitButton.textContent = 'Сохранение...'
        } else {
            this._submitButton.textContent = 'Сохранение';
        }
    }

    setEventListeners(evt) {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues())
            }
        )
    }
}