export default class UserInfo {
  constructor(profImageElementSelector, profNameElementSelector, occupationElementSelector) {
    this._profImage = document.querySelector(profImageElementSelector);
    this._profName = document.querySelector(profNameElementSelector);
    this._occupation = document.querySelector(occupationElementSelector);
  }

  getUserInfo() {
    return {
      name: this._profName.textContent,
      occupation: this._occupation.textContent,
    };
  }

  setUserImage(url) {
    this._profImage.src = url;
  }

  setUserInfo(name, occupation) {
    this._profName.textContent = name;
    this._occupation.textContent = occupation;
  }
}
