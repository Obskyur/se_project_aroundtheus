export default class FormValidator {
  constructor(settings, formEl) {
    this._settings = settings;
    this._formEl = formEl;
    // Find Form Fields
    this._inputFields = [
      ...formEl.querySelectorAll(this._settings.inputSelector),
    ];
    this._submitButton = formEl.querySelector(
      this._settings.submitButtonSelector
    );
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._toggleButtonState(
      this._inputFields,
      this._submitButton,
      this._settings
    );
    this._inputFields.forEach((input) => {
      this._hideInputError(this._formEl, input, this._settings);
    });
  }

  /*═══════════════════════╕
 │ INPUT FIELD FUNCTIONS │
 ╘═══════════════════════*/
  _showInputError(inputEl) {
    const errorEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._settings.inputErrorClass);
    errorEl.classList.add(this._settings.errorClass);
    errorEl.textContent = inputEl.validationMessage;
  }

  _hideInputError(inputEl) {
    const errorEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._settings.inputErrorClass);
    errorEl.classList.remove(this._settings.errorClass);
    errorEl.textContent = "";
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _hasInvalid(inputFields) {
    return !inputFields.every((inputEl) => inputEl.validity.valid);
  }

  _setEventListeners() {
    // Submit Listener
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._disableButton(this._submitButton, this._settings);
    });

    // Validate on Input Listener
    this._inputFields.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  /*══════════════════╕
 │ BUTTON FUNCTIONS │
 ╘══════════════════*/
  _disableButton() {
    this._submitButton.classList.add(this._settings.inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._settings.inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _toggleButtonState() {
    if (this._hasInvalid(this._inputFields)) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }
}
