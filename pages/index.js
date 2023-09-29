import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js"

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
const modals = [...document.querySelectorAll(".modal")];
const editProfileModal = document.querySelector("#edit-profile-modal");
const addCardModal = document.querySelector("#add-card-modal");
const cardListElement = document.querySelector(".cards__list");
const imageModal = document.querySelector("#image-modal");
const modalImageElement = imageModal.querySelector(".modal__image");
const modalCaptionElement = imageModal.querySelector(".modal__caption");

//* Buttons
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

//* Form Data
// Edit Profile Form
const editProfileModalForm = document.forms["edit-profile-form"];
const modalNameInput = editProfileModal.querySelector("#modalName");
const modalDescriptionInput = editProfileModal.querySelector("#modalDescription");
// Add Card Form
const addCardModalForm = document.forms["add-card-form"];
const modalTitleInput = addCardModal.querySelector("#modal-title");
const modalLinkInput = addCardModal.querySelector("#modal-link");

/*════════════════╕
 │ EVENT HANDLERS │
 ╘════════════════*/
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
}
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}
function setFormFields() {
  modalNameInput.value = profileName.textContent;
  modalDescriptionInput.value = profileDescription.textContent;
}
function handleProfileSave(evt) {
  evt.preventDefault();
  profileName.textContent = modalNameInput.value;
  profileDescription.textContent = modalDescriptionInput.value;
  closeModal(editProfileModal);
}
function handleAddCard(evt) {
  const card = {
    name: "",
    link: "",
  };
  evt.preventDefault();
  card.name = modalTitleInput.value;
  card.link = modalLinkInput.value;
  cardListElement
    .prepend(new Card(card, "#card-template", handleImageClick)
    .getElement());
  evt.target.reset();

  closeModal(addCardModal);
}
function handleImageClick(card) {
  console.log(card);
  openModal(imageModal);
    modalImageElement.src = card.getData().link;
    modalImageElement.alt = card.getData().name;
    modalCaptionElement.textContent = card.getData().name;
}

/*════════════════╕
 │ PAGE FUNCTIONS │
 ╘════════════════*/
editButton.addEventListener("click", () => {
  openModal(editProfileModal);
  setFormFields();
});
addButton.addEventListener("click", () => {
  openModal(addCardModal);
});

/*═════════════════╕
 │ MODAL FUNCTIONS │
 ╘═════════════════*/
//* Modal Closing
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal__close"))
      closeModal(modal);
    if (evt.target.classList.contains("modal_opened"))
      closeModal(modal);
  });
});
//* Modal Submitting
editProfileModalForm.addEventListener("submit", handleProfileSave);
addCardModalForm.addEventListener("submit", handleAddCard);

/*════════════════╕
 │ CARD FUNCTIONS │
 ╘════════════════*/

// Add initial cards to HTML
initialCards.forEach((cardData) => {
  cardListElement
    .append(
    new Card(cardData, "#card-template", handleImageClick)
    .getElement());
});

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
const formEls = [...document
  .querySelectorAll(config.formSelector)];
formEls.forEach((formEl) => {
  formEl.validator = new FormValidator(config, formEl);
  formEl.validator.enableValidation();
});