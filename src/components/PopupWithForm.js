import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this.setEventListeners();
  }

  close() {
    super.close();
  }

  open() {
    super.open();
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
      evt.target.reset();
    });
  };

  _getInputValues() {
    const inputs = this._popupForm.querySelectorAll(".popup__input");
    const data = {};

    inputs.forEach((input, i) => {
      data[`input_${i + 1}`] = input.value;
    });

    return data;
  }
}
