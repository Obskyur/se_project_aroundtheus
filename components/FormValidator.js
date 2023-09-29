export default class FormValidator {
  constructor(settings, formEl) {
    this._settings = settings;
    this._formEl = formEl;
  }

  enableValidation() {
    this._setEventListeners(this._formEl, this._settings);
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
    // Find Form Fields
    const inputFields = [...formEl.querySelectorAll(config.inputSelector)];
    const submitButton = formEl.querySelector(config.submitButtonSelector);

    // Submit Listener
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._disableButton(submitButton, config);
    });

    // Validate on Input Listener
    inputFields.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(formEl, inputEl, config);
        this._toggleButtonState(inputFields, submitButton, config);
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