import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitBtn = this._popupForm.querySelector(".popup__button");
    this._submitBtnText = this._submitBtn.textContent;
    this.setEventListeners();
  }

  renderLoading(isLoading, loadingText) {
    isLoading
      ? (this._submitBtn.textContent = loadingText)
      : (this._submitBtn.textContent = this._submitBtnText);
  }

  reset() {
    this._popupForm.reset();
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  };
}
