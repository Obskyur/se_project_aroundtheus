import "./index.css";
import {
  addButton,
  config,
  editButton,
  formValidators,
  initialCards,
  popupNameInput,
  popupDescriptionInput,
  user,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";

/*═══════╕
 │ FORMS │
 ╘═══════*/
function fillProfileInputs() {
  popupNameInput.value = user.getUserInfo().name;
  popupDescriptionInput.value = user.getUserInfo().occupation;
}

editButton.addEventListener("click", () => {
  new PopupWithForm("#edit-profile-popup", handleProfileSave).open();
  fillProfileInputs();
  formValidators["edit-profile-form"].resetValidation();
});
addButton.addEventListener("click", () => {
  new PopupWithForm("#add-card-popup", handleAddCard).open();
  formValidators["add-card-form"].resetValidation();
});

/*═══════╕
 │ CARDS │
 ╘═══════*/
new Section(
  { items: initialCards, renderer: handleCreateCard },
  ".cards__list"
);

/*════════════════╕
 │ EVENT HANDLERS │
 ╘════════════════*/
function handleAddCard({ input_1, input_2 }) {
  const card = {
    name: input_1,
    link: input_2,
  };
  cardListElement.prepend(createCard(card));
}
function handleCreateCard(card) {
  return new Card(card, "#card-template", handleImageClick).getElement();
}
function handleImageClick(card) {
  const popup = new PopupWithImage("#image-popup");
  popup.open(card.getData());
}
function handleProfileSave({ input_1: name, input_2: description }) {
  user.setUserInfo(name, description);
}

/*═══════════╕
 │ VALIDATOR │
 ╘═══════════*/
function enableValidation(config) {
  const formEls = [...document.querySelectorAll(config.formSelector)];
  formEls.forEach((formEl) => {
    const validator = new FormValidator(config, formEl);
    const formName = formEl.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

enableValidation(config);
