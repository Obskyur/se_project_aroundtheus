import "./index.css";
import { config, formValidators } from "../utils/constants.js";
import Api from "../components/Api.js";
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
let cardSection;
// const cardSection = new Section(
//   { items: initialCards, renderer: handleCreateCard },
//   ".cards__list"
// );

/*════════════════╕
 │ EVENT HANDLERS │
 ╘════════════════*/
const imagePopup = new PopupWithImage("#image-popup");

function handleAddCard({ title, url }) {
  api.addCard({name: title, link: url})
  .then(cardObj => {
    cardSection.addItem(handleCreateCard(cardObj));
  })
  .catch(err => console.error(err));
}
function handleCreateCard(card) {
  return new Card(card, "#card-template", handleImageClick).getElement();
}
function handleImageClick(card) {
  imagePopup.open(card.getData());
}
function handleProfileSave({ title, description }) {
  api.setUser({ name: title, about: description })
    .then(({name, about}) => {
      user.setUserInfo(name, about);
    })
    .catch(err => console.error(err));
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

const api = new Api({
  baseURL: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "f88f7f13-d094-4973-ab37-f03c8d3d09a5",
    "Content-Type": "application/json",
  },
});

// Initialize Page from Server:
api.getPageInfo()
  .then(([cardArray, userInfo]) => {
    console.log(userInfo);
    console.log(cardArray);

    // Update User Details from Server
    user.setUserInfo(userInfo.name, userInfo.about);
    
    // Update Cards from Server
    cardSection = new Section(
      { items: cardArray, renderer: handleCreateCard },
      ".cards__list"
    );
  })
  .catch(err => console.error(err));
