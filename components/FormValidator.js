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
    this._setEventListeners(this._formEl, this._settings);
  }

  resetValidation()
  {
    this._toggleButtonState(this._inputFields, this._submitButton, this._settings);
    this._inputFields.forEach((input) => {
      this._hideInputError(this._formEl, input, this._settings);
    });
  }

  /*═══════════════════════╕
 │ INPUT FIELD FUNCTIONS │
 ╘═══════════════════════*/
  _showInputError(formEl, inputEl, config) {
    const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(config.inputErrorClass);
    errorEl.classList.add(config.errorClass);
    errorEl.textContent = inputEl.validationMessage;
  }

  _hideInputError(formEl, inputEl, config) {
    const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(config.inputErrorClass);
    errorEl.classList.remove(config.errorClass);
    errorEl.textContent = "";
  }

  _checkInputValidity(formEl, inputEl, config) {
    if (!inputEl.validity.valid) {
      this._showInputError(formEl, inputEl, config);
    } else {
      this._hideInputError(formEl, inputEl, config);
    }
  }

  _hasInvalid(inputFields) {
    return !inputFields.every((inputEl) => inputEl.validity.valid);
  }

  _setEventListeners(formEl, config) {
    // Submit Listener
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._disableButton(this._submitButton, config);
    });

    // Validate on Input Listener
    this._inputFields.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(formEl, inputEl, config);
        this._toggleButtonState(this._inputFields, this._submitButton, config);
      });
    });
  }

  /*══════════════════╕
 │ BUTTON FUNCTIONS │
 ╘══════════════════*/
  _disableButton(submitButton, config) {
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.disabled = true;
  }

  _enableButton(submitButton, config) {
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.disabled = false;
  }

  _toggleButtonState(inputFields, submitButton, config) {
    if (this._hasInvalid(inputFields)) {
      this._disableButton(submitButton, config);
    } else {
      this._enableButton(submitButton, config);
    }
  }
}
