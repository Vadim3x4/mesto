/**
 * Класс отвечает за управление отображением информации о пользователе на странице
 */
export default class UserInfo {
    constructor(nameSelector, prophecySelector) {
        this._nameElement = document.querySelector(nameSelector);
        this._prophecyElement = document.querySelector(prophecySelector);
    }

    getUserInfo() {
        return {
            name: this._nameElement,
            prophecy: this._prophecyElement,
        };
    }

    setUserInfo(data) {
        this._nameElement.textContent = data.username;
        this._prophecyElement.textContent = data.prophecy;
    }
}