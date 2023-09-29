export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    //* Passed values:
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;

    //* PRIVATE DOM MEMBERS:
    // DOM Card Element
    this._cardElement = document
      .querySelector(`${this._cardSelector}`)
      .content.firstElementChild.cloneNode(true);
    // DOM image element
    this._imageElement = this._cardElement.querySelector(".card__image");
    // DOM title element
    this._descriptionElement = this._cardElement.querySelector(".card__title");
    // DOM like button element
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    // DOM delete button element
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
  }

  getData() {
    return this._data;
  }

  getElement() {
    this._setCardValues();
    this._setEventListeners();
    return this._cardElement;
  }

  _handleDelete() {
    this.closest(".card").remove();
  }

  _handleLike() {
    this.classList.toggle("card__like-button_active");
  }

  _setCardValues() {
    this._imageElement.src = this._data.link;
    this._imageElement.alt = this._data.name;
    this._descriptionElement.textContent = this._data.name;
  }

  _setEventListeners() {
    // Like button
    this._likeButton.addEventListener("click", this._handleLike);

    // Delete button
    this._deleteButton.addEventListener("click", this._handleDelete);

    // Image
    this._imageElement.addEventListener("click", () =>
      this._handleImageClick(this)
    );
  }
}
