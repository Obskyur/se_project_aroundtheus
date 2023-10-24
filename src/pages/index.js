import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";

/*═══════╕
 │ CARDS │
 ╘═══════*/
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];

/*══════════════╕
 │ DOM ELEMENTS │
 ╘══════════════*/
//* Profile Data
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//* Wrappers
const popups = [...document.querySelectorAll(".popup")];
const editProfilePopup = document.querySelector("#edit-profile-popup");
const addCardPopup = document.querySelector("#add-card-popup");
const cardListElement = document.querySelector(".cards__list");
// const imagePopup = document.querySelector("#image-popup");
// const popupImageElement = imagePopup.querySelector(".popup__image");
// const popupCaptionElement = imagePopup.querySelector(".popup__caption");

//* Buttons
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

//* Form Data
// Edit Profile Form
const editProfilePopupForm = document.forms["edit-profile-form"];
const popupNameInput = editProfilePopup.querySelector("#popupName");
const popupDescriptionInput =
  editProfilePopup.querySelector("#popupDescription");
// Add Card Form
const addCardPopupForm = document.forms["add-card-form"];
const popupTitleInput = addCardPopup.querySelector("#popup-title");
const popupLinkInput = addCardPopup.querySelector("#popup-link");

/*════════════════╕
 │ EVENT HANDLERS │
 ╘════════════════*/
// function openPopup(popup) {
//   popup.classList.add("popup_opened");
//   document.addEventListener("keydown", closeByEscape);
// }
// function closePopup(popup) {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener("keydown", closeByEscape);
// }
// function closeByEscape(evt) {
//   if (evt.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_opened");
//     closePopup(openedPopup);
//   }
// }
function fillProfileInputs() {
  popupNameInput.value = profileName.textContent;
  popupDescriptionInput.value = profileDescription.textContent;
}
function handleProfileSave({ input_1: name , input_2: description }) {
  profileName.textContent = name;
  profileDescription.textContent = description;
}
function handleAddCard({ input_1, input_2 }) {
  const card = {};
  card.name = input_1;
  card.link = input_2;
  cardListElement.prepend(createCard(card));
}

function handleImageClick(card) {
  const popup = new PopupWithImage("#image-popup")
  popup.open(card.getData());
  // const { link, name } = card.getData();
  // openPopup(imagePopup);
  // popupImageElement.src = link;
  // popupImageElement.alt = name;
  // popupCaptionElement.textContent = name;
}

/*════════════════╕
 │ PAGE FUNCTIONS │
 ╘════════════════*/
editButton.addEventListener("click", () => {
  new PopupWithForm('#edit-profile-popup', handleProfileSave).open();
  // openPopup(editProfilePopup);
  fillProfileInputs();
  formValidators["edit-profile-form"].resetValidation();
});
addButton.addEventListener("click", () => {
  new PopupWithForm('#add-card-popup', handleAddCard).open();
  openPopup(addCardPopup);
  formValidators["add-card-form"].resetValidation();
});

/*═════════════════╕
 │ MODAL FUNCTIONS │
 ╘═════════════════*/
// //* Popup Closing
// popups.forEach((popup) => {
//   popup.addEventListener("mousedown", (evt) => {
//     if (evt.target.classList.contains("popup__close")) closePopup(popup);
//     if (evt.target.classList.contains("popup_opened")) closePopup(popup);
//   });
// });
//* Popup Submitting
// editProfilePopupForm.addEventListener("submit", handleProfileSave);
// addCardPopupForm.addEventListener("submit", handleAddCard);

/*════════════════╕
 │ CARD FUNCTIONS │
 ╘════════════════*/
function createCard(card) {
  return new Card(card, "#card-template", handleImageClick).getElement();
}

// Add initial cards to HTML
initialCards.forEach((cardData) => {
  cardListElement.append(createCard(cardData));
});

/*═════════╕
 │ IMPORTS │
 ╘═════════*/
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const formValidators = {};

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
