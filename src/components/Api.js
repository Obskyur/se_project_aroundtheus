// token: f88f7f13-d094-4973-ab37-f03c8d3d09a5
export default class Api {
  constructor(options) {
    this._baseURL = options.baseURL;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  //* Card Add / Remove

  /// cardProperties: object containing 'name' and 'link' properties
  addCard(cardProperties) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardProperties),
    }).then(this._handleResponse);
  }

  deleteCard(card) {
    return fetch(`${this._baseURL}/cards/${card._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  //* GETTERS

  getCards() {
    return fetch(`${this._baseURL}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getPageInfo() {
    return Promise.all([this.getCards(), this.getUser()]);
  }

  getUser() {
    return fetch(`${this._baseURL}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  //* SETTERS

  /// userInfo: object containing 'name' and 'about' properties
  setUser(userInfo) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(userInfo),
    }).then(this._handleResponse);
  }

  setUserPicture(link) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: {
        avatar: link
      },
    }).then(this._handleResponse);
  }

  toggleLike(card, like) {
    return fetch(`${this._baseURL}/cards/${card._id}/likes`, {
      method: like ? "PUT" : "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

}
