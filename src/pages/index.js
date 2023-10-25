import "./index.css";
import { config, formValidators, initialCards } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import UserInfo from "../components/UserInfo";

/*══════╕
 │ USER │
 ╘══════*/
const user = new UserInfo(".profile__title", ".profile__description");
var userName = user.getUserInfo().name;
var userOcc = user.getUserInfo().occupation;

/*══════════════╕
 │ PAGE BUTTONS │
 ╘══════════════*/
export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");

editButton.addEventListener("click", () => {
  userName = user.getUserInfo().name;
  userOcc = user.getUserInfo().occupation;
  editProfilePopup.open();
  editProfilePopup.setInputValues({title: userName, description: userOcc });
  formValidators["edit-profile-form"].resetValidation();
});
addButton.addEventListener("click", () => {
  addCardPopup.open();
  formValidators["add-card-form"].resetValidation();
});

/*═══════╕
 │ FORMS │
 ╘═══════*/
const editProfilePopup = new PopupWithForm(
  "#edit-profile-popup",
  handleProfileSave
);
const addCardPopup = new PopupWithForm("#add-card-popup", handleAddCard);

/*═══════╕
 │ CARDS │
 ╘═══════*/
const cardListElement = document.querySelector(".cards__list");

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
  cardListElement.prepend(handleCreateCard(card));
}
function handleCreateCard(card) {
  return new Card(card, "#card-template", handleImageClick).getElement();
}
function handleImageClick(card) {
  const popup = new PopupWithImage("#image-popup");
  popup.open(card.getData());
}
function handleProfileSave({ title: name, description: description }) {
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
