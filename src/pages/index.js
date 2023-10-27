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

/*══════════════╕
 │ PAGE BUTTONS │
 ╘══════════════*/
export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");

editButton.addEventListener("click", () => {
  const { name, occupation } = user.getUserInfo();
  editProfilePopup.open();
  editProfilePopup.setInputValues({ title: name, description: occupation });
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
const cardSection = new Section(
  { items: initialCards, renderer: handleCreateCard },
  ".cards__list"
);

/*════════════════╕
 │ EVENT HANDLERS │
 ╘════════════════*/
const imagePopup = new PopupWithImage("#image-popup");

function handleAddCard({ title, url }) {
  const card = {
    name: title,
    link: url,
  };
  cardSection.addItem(handleCreateCard(card));
}
function handleCreateCard(card) {
  return new Card(card, "#card-template", handleImageClick).getElement();
}
function handleImageClick(card) {
  imagePopup.open(card.getData());
}
function handleProfileSave({ title, description }) {
  user.setUserInfo(title, description);
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
