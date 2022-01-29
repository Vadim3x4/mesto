import {deactivateButton, activateButton} from "./index.js";

/**
 * Класс для валидации данных в формах.
 */
export class FormValidator {
    constructor(config, elementForm) {
        this._config = config;
        this._elementForm = elementForm;
    };

    /**
     * Функция проверяющая данные на валидность.
     * Возвращает булево значение
     * @param inputList
     * @returns {*}
     */
    _hasInvalidInput(inputList){
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    /**
     * Метод определяющий состояние кнопки принятия формы
     * @param inputList
     * @param buttonElement
     * @param config
     */
    _toggleButtonState(inputList, buttonElement, config){
        if (this._hasInvalidInput(inputList)) {
            deactivateButton(buttonElement, config)
        } else {
            activateButton(buttonElement, config);
        }
    };

    /**
     * Метод валидации ввода
     * @param formElement
     * @param inputElement
     * @param config
     */
    _checkInputValidity(formElement, inputElement, config){
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, config);
        } else {
            this._hideInputError(formElement, inputElement, config);
        }
    };

    /**
     * Метод скрытия ошибок ввода
     * @param formElement
     * @param inputElement
     * @param config
     */
    _hideInputError(formElement, inputElement, config){
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(config.inputErrorClass);
        errorElement.classList.remove(config.errorClass);
        errorElement.textContent = '';
    };

    /**
     * Метод отображения ошибок ввода
     * @param formElement
     * @param inputElement
     * @param errorMessage
     * @param config
     */
    _showInputError(formElement, inputElement, errorMessage, config){
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(config.errorClass);
    };

    /**
     * Метод проверяющий каждую форму на валидность
     */
    setEventListeners(){
        let inputList = Array.from(this._elementForm.querySelectorAll(this._config.inputSelector));
        let buttonElement = this._elementForm.querySelector(this._config.submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement, this._config);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(this._elementForm, inputElement, this._config);
                this._toggleButtonState(inputList, buttonElement, this._config);
            });
        })
    };

}