// token: f88f7f13-d094-4973-ab37-f03c8d3d09a5
export default class Api {
  constructor(options) {
    this._baseURL = options.baseURL;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._handleResponse);
  }

  //* Card Add / Remove

  /// cardProperties: object containing 'name' and 'link' properties
  addCard(cardProperties) {
    return this._request(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardProperties),
    })
  }

  deleteCard(card) {
    return this._request(`${this._baseURL}/cards/${card._id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  //* GETTERS

  getCards() {
    return this._request(`${this._baseURL}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  getPageInfo() {
    return Promise.all([this.getCards(), this.getUser()]);
  }

  getUser() {
    return this._request(`${this._baseURL}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  //* SETTERS

  /// userInfo: object containing 'name' and 'about' properties
  setUser(userInfo) {
    return this._request(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(userInfo),
    });
  }

  setUserPicture(link) {
    return this._request(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      }),
    });
  }

  toggleLike(card) {
    return this._request(`${this._baseURL}/cards/${card._id}/likes`, {
      method: card.isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    });
  }

}
