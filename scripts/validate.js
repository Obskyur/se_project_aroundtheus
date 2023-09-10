/*═══════════════════════╕
 │ INPUT FIELD FUNCTIONS │
 ╘═══════════════════════*/
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

/*══════════════════╕
 │ BUTTON FUNCTIONS │
 ╘══════════════════*/
function disableButton(submitButton, config) {
  submitButton.classList.add(config.inactiveButtonClass);
  submitButton.disabled = true;
}

function enableButton(submitButton, config) {
  submitButton.classList.remove(config.inactiveButtonClass);
  submitButton.disabled = false;
}

function toggleButtonState(inputFields, submitButton, config) {
  if (hasInvalid(inputFields)) {
    disableButton(submitButton, config);
  }
  else {
    enableButton(submitButton, config);
  }
};

/*══════════════════════════════╕
 │ FORM EVENT LISTENER HANDLERS │
 ╘══════════════════════════════*/
function setEventListeners(formEl, config) {
  // Find inputs
  const inputFields = [...formEl.querySelectorAll(config.inputSelector)];
  const submitButton = formEl.querySelector(config.submitButtonSelector);

  // Submit Listener
  formEl.addEventListener("submit", (evt) => {
    evt.preventDefault();
    disableButton(submitButton, config);
  });
  
  // Validate on Input Listener
  inputFields.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputFields, submitButton, config);
    });
  });
};

/*═════════════════════════╕
 │ FORM VALIDATION WRAPPER │
 ╘═════════════════════════*/
function enableValidation(config) {
  const formEls = [...document.querySelectorAll(config.formSelector)];
  formEls.forEach((formEl) => {

    setEventListeners(formEl, config);
  });
};



/*══════════════════════╕
 │ RUN VALIDATION SETUP │
 ╘══════════════════════*/
enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
});
