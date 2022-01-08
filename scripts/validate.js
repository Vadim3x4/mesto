/**
 * Функция отображения ошибок ввода
 * @param formElement
 * @param inputElement
 * @param errorMessage
 * @param config
 */
const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

/**
 * Функция скрытия ошибок ввода
 * @param formElement
 * @param inputElement
 * @param config
 */
const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

/**
 * Функция валидации ввода
 * @param formElement
 * @param inputElement
 * @param config
 */
const checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
};

/**
 * Функция проверяющая данные на валидность.
 * Возвращает булево значение
 * @param inputList
 * @returns {*}
 */
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

/**
 * Функция деактивации кнопки подтверждения формы
 * @param buttonElement
 * @param config
 */
const deactivateButton = (buttonElement, config) => {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute("disabled", '');
};

/**
 * Функция активации кнопки подтсверждения формы
 * @param buttonElement
 * @param config
 */
const activateButton = (buttonElement, config) => {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute("disabled", '');
};

/**
 * Функция определяющая состояние кнопки принятия формы
 * @param inputList
 * @param buttonElement
 * @param config
 */
const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
        deactivateButton(buttonElement, config)
    } else {
        activateButton(buttonElement, config);
    }
};

/**
 * Функция принимающая проверяющая каждую форму на валидность
 * @param formElement
 * @param config
 */
const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};

/**
 * Функция валидации
 * @param config
 */
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, config);
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__form-item',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup_save-button_inactive',
    inputErrorClass: 'popup__form-error-redline_active',
    errorClass: 'popup__form-error-input_active'
});