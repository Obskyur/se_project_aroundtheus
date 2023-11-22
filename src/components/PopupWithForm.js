import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputs = this._popupForm.querySelectorAll(".popup__input");
    this._handleFormSubmit = handleFormSubmit;
    this._buttonText = this._popupForm.querySelector(".popup__button");
    this.setEventListeners();
  }

  saving(show) {
    console.log(this._buttonText);
    show
      ? (this._buttonText.textContent = "Saving...")
      : (this._buttonText.textContent = "Save");
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      evt.target.reset();
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
