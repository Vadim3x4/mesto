import {profileUsername, profileProphecy} from '../utils/constants.js'

/**
 * Класс отвечает за управление отображением информации о пользователе на странице
 */
export default class UserInfo {
    constructor(name, prophecy) {
        this._name = name;
        this._prophecy = prophecy;
    }

    getUserInfo() {
        this._name.value = profileUsername.textContent;
        this._prophecy.value = profileProphecy.textContent;
        return {
            "name": this._name.value,
            "prophecy": this._prophecy.value
        }
    }

    setUserInfo(data) {
        profileUsername.textContent = data[0];
        profileProphecy.textContent = data[1];
    }
}