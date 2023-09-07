function showInputError(formEl, inputEl, config) {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(config.inputErrorClass);
  errorEl.classList.add(config.errorClass);
  errorEl.textContent = inputEl.validationMessage;
};

function hideInputError(formEl, inputEl, config) {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(config.inputErrorClass);
  errorEl.classList.remove(config.errorClass);
  errorEl.textContent = "";
};

function checkInputValidity(formEl, inputEl, config) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, config);
  }
  else {
    hideInputError(formEl, inputEl, config);
  }
};

function hasInvalid(inputFields) {
  return !inputFields.every((inputEl) => inputEl.validity.valid);
};

function toggleButtonState(inputFields, submitButton, config) {
  if (hasInvalid(inputFields)) {
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.disabled = true;
  }
  else {
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.disabled = false;
  }
};

function setEventListeners(formEl, config) {
  // Find inputs
  const inputFields = [...formEl.querySelectorAll(config.inputSelector)];
  const submitButton = formEl.querySelector(config.submitButtonSelector);
  // Validate inputs
  inputFields.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputFields, submitButton, config);
    });
  });
};

function enableValidation(config) {
  const formEls = [...document.querySelectorAll(config.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      const submitButton = formEl.querySelector(config.submitButtonSelector);
      evt.preventDefault();
      submitButton.classList.add(config.inactiveButtonClass);
      submitButton.disabled = true;
    });

    setEventListeners(formEl, config);
  });
};




enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
});
