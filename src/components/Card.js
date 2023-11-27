export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    //* Passed values:
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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

  setLike() {
    this._data.isLiked
      ? this._likeButton.classList.add("card__like-button_active")
      : this._likeButton.classList.remove("card__like-button_active");
  }

  _handleDelete(card) {
    this._handleDeleteClick(card);
  }

  _handleLike(card) {
    card._data.isLiked = !card._data.isLiked;
    this._handleLikeClick(card);
  }

  _setCardValues() {
    this._imageElement.src = this._data.link;
    this._imageElement.alt = this._data.name;
    this._descriptionElement.textContent = this._data.name;
    if (this._data.isLiked)
      this._likeButton.classList.add("card__like-button_active");
  }

  _setEventListeners() {
    // Like button
    this._likeButton.addEventListener("click", () => this._handleLike(this));

    // Delete button
    this._deleteButton.addEventListener("click", () =>
      this._handleDelete(this)
    );

    // Image
    this._imageElement.addEventListener("click", () =>
      this._handleImageClick(this)
    );
  }
}
