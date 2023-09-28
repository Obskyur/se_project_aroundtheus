export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._data = { name, link };
    this._cardSelector = cardSelector;
    this._handleImageclick = handleImageClick;
  }

  //* PRIVATE MEMBERS
  // HTML Card Element
  _cardElement = document
    .querySelector(`${this._cardSelector}`)
    .content.firstElementChild.cloneNode(true);
  _imageElement = this._cardElement.querySelector(".card__image");
  // HTML title element
  _descriptionElement = this._cardElement.querySelector(".card__title");
  // HTML like button element
  _likeButton = this._cardElement.querySelector(".card__like-button");
  // HTML delete button element
  _deleteButton = this._cardElement.querySelector(
    ".card__delete-button"
  );

  getElement() {
    this._setCardValues();
    this._setEventListeners();
    return this._cardElement;
  }

  _handleDelete() {
    this._deleteButton.closest(".card").remove();
  }

  _handleLike() {
    this._likeButton.classList.toggle("card__like-button_active");
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
    this._imageElement.addEventListener("click", handleImageClick);
  }
}
