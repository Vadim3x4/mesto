
/**
 * Класс для валидации данных в формах.
 */
export class FormValidator {

    constructor(config, elementForm) {
        this._config = config;
        this._elementForm = elementForm;
        this._inputList = Array.from(this._elementForm.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._elementForm.querySelector(this._config.submitButtonSelector);
    };

    /**
     * Функция проверяющая данные на валидность.
     * Возвращает булево значение
     * @returns {*}
     */
    _hasInvalidInput(){
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    /**
     * Функция деактивации кнопки подтверждения формы
     */
    _deactivateButton(){
        this._buttonElement.classList.add(this._config.inactiveButtonClass);
        this._buttonElement.setAttribute("disabled", '');
    }

    /**
     * Функция активации кнопки подтверждения формы
     */
    _activateButton(){
        this._buttonElement.classList.remove(this._config.inactiveButtonClass);
        this._buttonElement.removeAttribute("disabled", '');
    }

    /**
     * Метод определяющий состояние кнопки принятия формы
     */
    _toggleButtonState(){
        if (this._hasInvalidInput()) {
            this._deactivateButton(this._buttonElement)
        } else {
            this._activateButton(this._buttonElement);
        }
    };

    /**
     * Метод валидации ввода
     * @param inputElement
     */
    _checkInputValidity(inputElement){
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    /**
     * Метод скрытия ошибок ввода
     * @param inputElement
     */
    _hideInputError(inputElement){
        const errorElement = this._elementForm.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
    };

    /**
     * Метод отображения ошибок ввода
     * @param inputElement
     * @param errorMessage
     */
    _showInputError(inputElement, errorMessage){
        const errorElement = this._elementForm.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);
    };

    /**
     * Метод проверяющий каждую форму на валидность
     */
    _setEventListeners(){
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        })
    };

    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });
    }

    enableValidation(){
        this._setEventListeners()
    }

}