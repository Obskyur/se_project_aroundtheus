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
const editProfilePopup = document.querySelector("#edit-profile-popup");
const addCardPopup = document.querySelector("#add-card-popup");
const cardListElement = document.querySelector(".cards__list");

//* Buttons
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

//* Form Data
// Edit Profile Form
const popupNameInput = editProfilePopup.querySelector("#popupName");
const popupDescriptionInput =
  editProfilePopup.querySelector("#popupDescription");


/*════════════════╕
 │ EVENT HANDLERS │
 ╘════════════════*/
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
}
function fillProfileInputs() {
  popupNameInput.value = profileName.textContent;
  popupDescriptionInput.value = profileDescription.textContent;
}

/*════════════════╕
 │ PAGE FUNCTIONS │
 ╘════════════════*/
editButton.addEventListener("click", () => {
  new PopupWithForm('#edit-profile-popup', handleProfileSave).open();
  fillProfileInputs();
  formValidators["edit-profile-form"].resetValidation();
});
addButton.addEventListener("click", () => {
  new PopupWithForm('#add-card-popup', handleAddCard).open();
  openPopup(addCardPopup);
  formValidators["add-card-form"].resetValidation();
});

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
