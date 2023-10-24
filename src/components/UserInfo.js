export default class UserInfo {
  constructor(profNameElementSelector, occupationElementSelector) {
    this._profName = document.querySelector(profNameElementSelector);
    this._occupation = document.querySelector(occupationElementSelector);
  }

  getUserInfo() {
    return {
      name: this._profName.textContent,
      occupation: this._occupation.textContent,
    };
  }

  setUserInfo(name, occupation) {
    this._profName.textContent = name;
    this._occupation.textContent = occupation;
  }
}
