import "./index.css";
import { config, formValidators } from "../utils/constants.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import PopupConfirm from "../components/PopupConfirm.js";
import UserInfo from "../components/UserInfo";

/*══════╕
 │ USER │
 ╘══════*/
const user = new UserInfo(".profile__image", ".profile__title", ".profile__description");

/*══════════════╕
 │ PAGE BUTTONS │
 ╘══════════════*/
export const editProfileButton = document.querySelector(
  ".profile__edit-button"
);
export const editImageButton = document.querySelector(".profile__image-update");
export const addCardButton = document.querySelector(".profile__add-button");

editProfileButton.addEventListener("click", () => {
  const { name, occupation } = user.getUserInfo();
  editProfilePopup.renderLoading(false);
  editProfilePopup.open();
  editProfilePopup.focus();
  editProfilePopup.setInputValues({ title: name, description: occupation });
  formValidators["edit-profile-form"].resetValidation();
});
editImageButton.addEventListener("click", () => {
  editProfileImagePopup.renderLoading(false);
  editProfileImagePopup.open();
  editProfileImagePopup.focus();
  formValidators["edit-profile-image-form"].resetValidation();
});
addCardButton.addEventListener("click", () => {
  addCardPopup.open();
  addCardPopup.focus();
  formValidators["add-card-form"].resetValidation();
});

/*═══════╕
 │ FORMS │
 ╘═══════*/
const editProfilePopup = new PopupWithForm(
  "#edit-profile-popup",
  handleProfileSave
);
const editProfileImagePopup = new PopupWithForm(
  "#edit-profile-image-popup",
  handleProfileImageSave
);
const addCardPopup = new PopupWithForm("#add-card-popup", handleAddCard);
const confirmDeletePopup = new PopupConfirm(
  "#confirm-delete-popup",
  handleDeleteCard
);

/*═══════╕
 │ CARDS │
 ╘═══════*/
let cardSection;
let targetCard;

/*════════════════╕
 │ EVENT HANDLERS │
 ╘════════════════*/
const imagePopup = new PopupWithImage("#image-popup");

function handleSubmit(request, popup, loadingText = "Saving...") {
  popup.renderLoading(true, loadingText);
  request()
    .then(() => {
      popup.close();
      popup.reset();
    })
    .catch(console.error)
    .finally(() => popup.renderLoading(false));
}

function handleAddCard({ title, url }) {
  function makeRequest() {
    return api
      .addCard({ name: title, link: url })
      .then(cardObj => cardSection.addItem(cardObj));
  }
  handleSubmit(makeRequest, addCardPopup);
}
function handleCreateCard(card) {
  return new Card(
    card,
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ).getElement();
}
function handleDeleteCard() {
  function makeRequest() {
    return api
    .deleteCard(targetCard)
    .then(() => {
      cardSection.deleteItem(targetCard);
      cardSection.renderItems();
    })
  }
  handleSubmit(makeRequest, confirmDeletePopup, "Deleting...");
}
function handleDeleteClick(card) {
  targetCard = card.getData();
  confirmDeletePopup.renderLoading(false);
  confirmDeletePopup.open();
}
function handleImageClick(card) {
  imagePopup.open(card.getData());
}
function handleLikeClick(card) {
  targetCard = card.getData();
  api
    .toggleLike(targetCard)
    .then(() => card.setLike())
    .catch(console.error);
}
function handleProfileImageSave({ url }) {
  function makeRequest() {
    return api
      .setUserPicture(url)
      .then(() => user.setUserImage(url));
  }
  handleSubmit(makeRequest, editProfileImagePopup);
}
function handleProfileSave({ title, description }) {
  function makeRequest() {
    return api
      .setUser({ name: title, about: description })
      .then(({ name, about }) => user.setUserInfo(name, about));
  }
  handleSubmit(makeRequest, editProfilePopup);
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
api
  .getPageInfo()
  .then(([cardArray, userInfo]) => {
    // Update User Details from Server
    user.setUserImage(userInfo.avatar);
    user.setUserInfo(userInfo.name, userInfo.about);

    // Update Cards from Server
    cardSection = new Section(
      { items: cardArray, renderer: handleCreateCard },
      ".cards__list"
    );
  })
  .catch(console.error);
