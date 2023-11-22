import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._buttonText = this._popupForm.querySelector(".popup__button");
    this.setEventListeners();
  }

  deleting(show) {
    show ?
      this._buttonText.textContent = "Deleting..." :
      this._buttonText.textContent = "Yes";
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
      evt.target.reset();
    });
  };
}
