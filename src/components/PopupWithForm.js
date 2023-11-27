import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputs = this._popupForm.querySelectorAll(".popup__input");
    this._handleFormSubmit = handleFormSubmit;
    this._submitBtn = this._popupForm.querySelector(".popup__button");
    this._submitBtnText = this._submitBtn.textContent;
    this.setEventListeners();
  }

  open() {
    super.open();
    setTimeout(() => this._inputs[0].focus(), 700);
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
      this._handleFormSubmit(this._getInputValues());
    });
  };

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  _getInputValues() {
    const data = {};

    this._inputs.forEach((input) => {
      data[input.name] = input.value;
    });

    return data;
  }
}
