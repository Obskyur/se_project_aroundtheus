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
const user = new UserInfo(".profile__title", ".profile__description");
const profileImage = document.querySelector(".profile__image");

/*══════════════╕
 │ PAGE BUTTONS │
 ╘══════════════*/
export const editProfileButton = document.querySelector(".profile__edit-button");
export const editImageButton = document.querySelector(".profile__image-update");
export const addCardButton = document.querySelector(".profile__add-button");

editProfileButton.addEventListener("click", () => {
  const { name, occupation } = user.getUserInfo();
  editProfilePopup.saving(false);
  editProfilePopup.open();
  editProfilePopup.setInputValues({ title: name, description: occupation });
  formValidators["edit-profile-form"].resetValidation();
});
editImageButton.addEventListener("click", () => {
  editProfileImagePopup.saving(false);
  editProfileImagePopup.open();
})
addCardButton.addEventListener("click", () => {
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
const editProfileImagePopup = new PopupWithForm(
  "#edit-profile-image-popup",
  handleProfileImageSave
);
const addCardPopup = new PopupWithForm("#add-card-popup", handleAddCard);
const confirmDeletePopup = new PopupConfirm('#confirm-delete-popup', handleDeleteCard);

/*═══════╕
 │ CARDS │
 ╘═══════*/
let cardSection;
let targetCard;

/*════════════════╕
 │ EVENT HANDLERS │
 ╘════════════════*/
const imagePopup = new PopupWithImage("#image-popup");
const deleteButton = document.querySelector("#confirm-delete-button");

function handleAddCard({ title, url }) {
  api.addCard({name: title, link: url})
  .then(cardObj => {
    cardSection.addItem(cardObj);
    addCardPopup.close();
  })
  .catch(err => console.error(err));
}
function handleCreateCard(card) {
  return new Card(card, "#card-template", handleImageClick, handleDeleteClick, handleLikeClick).getElement();
}
function handleDeleteCard() {
  confirmDeletePopup.deleting(true);
  api.deleteCard(targetCard)
    .then(() => api.getPageInfo()
      .then(([cardArray]) => {
        console.log(cardArray);
        cardSection.setItems(cardArray);
        cardSection.renderItems();
        confirmDeletePopup.close();
      })
    )
    .catch(err => console.log(err));
}
function handleDeleteClick(card) {
  targetCard = card.getData();
  confirmDeletePopup.deleting(false);
  confirmDeletePopup.open();
}
function handleImageClick(card) {
  imagePopup.open(card.getData());
}
function handleLikeClick(card) {
  targetCard = card.getData();
  api.toggleLike(targetCard)
  .then(cardSection.renderItems())
  .catch(err => console.log(err));
}
function handleProfileImageSave({url}) {
  console.log(url);
  editProfileImagePopup.saving(true);
  profileImage.src = url;
  api.setUserPicture(url)
    .then((res) => {
      console.log(res);
      editProfileImagePopup.close();
    })
    .catch(err => console.error(err));
}
function handleProfileSave({ title, description }) {
  editProfilePopup.saving(true);
  api.setUser({ name: title, about: description })
    .then(({name, about}) => {
      user.setUserInfo(name, about);
    })
    .catch(err => console.error(err));
  editProfilePopup.close();
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
    console.log(cardArray);

    // Update User Details from Server
    profileImage.src = userInfo.avatar;
    user.setUserInfo(userInfo.name, userInfo.about);
    
    // Update Cards from Server
    cardSection = new Section(
      { items: cardArray, renderer: handleCreateCard },
      ".cards__list"
    );
  })
  .catch(err => console.error(err));
