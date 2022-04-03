/**
 * Класс отвечает за управление отображением информации о пользователе на странице
 */
export default class UserInfo {
    constructor(nameSelector, prophecySelector, avatar, userId) {
        this._nameElement = document.querySelector(nameSelector);
        this._prophecyElement = document.querySelector(prophecySelector);
        this._avatarElement = document.querySelector(avatar);
        this._userId = userId
    }

    getUserInfo() {
        return {
            name: this._nameElement,
            prophecy: this._prophecyElement,
        };
    }

    getUserId(){
        return this._userId
    }

    setAvatar(userdata){
        this._avatarElement.src = userdata.avatar;
    }

    setUserInfo(userdata) {
        this._nameElement.textContent = userdata.name;
        this._prophecyElement.textContent = userdata.about;
        this._avatarElement.src = userdata.avatar;
        this._userId = userdata._id
    }
}