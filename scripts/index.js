/*═══════╕
 │ CARDS │
 ╘═══════*/
let initialCards = [
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
const editModal = document.querySelector("#edit-profile-modal");
const addModal = document.querySelector("#add-card-modal");
const cardListElement = document.querySelector(".cards__list");

//* Buttons
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

//* Form Data
// Edit Profile Form
const editModalForm = editModal.querySelector(".modal__form");
const editModalCloseButton = editModal.querySelector(".modal__close");
const modalNameInput = editModal.querySelector("#modalName");
const modalDescriptionInput = editModal.querySelector("#modalDescription");
// Add Card Form
const addModalForm = addModal.querySelector(".modal__form");
const addModalCloseButton = addModal.querySelector(".modal__close");
const modalTitleInput = addModal.querySelector("#modal-title");
const modalLinkInput = addModal.querySelector("#modal-link");

//* Cards
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/*════════════════╕
 │ EVENT HANDLERS │
 ╘════════════════*/
function modalOpen(modal) {
  modal.classList.add("modal_opened");
}
function modalClose(modal) {
  modal.classList.remove("modal_opened");
}
function setFormFields(form) {
  if (form.id === "edit-profile-form") {
    modalNameInput.value = profileName.textContent;
    modalDescriptionInput.value = profileDescription.textContent;
  }
}
function handleProfileSave(evt) {
  evt.preventDefault();
  profileName.textContent = modalNameInput.value;
  profileDescription.textContent = modalDescriptionInput.value;
  modalClose(editModal);
}
function handleAddCard(evt) {
  let card = {
    name: "",
    link: "",
  };
  evt.preventDefault();
  card.name = modalTitleInput.value;
  card.link = modalLinkInput.value;
  cardListElement.prepend(addCardDataToHTML(card));
  modalClose(addModal);
}

/*════════════════╕
 │ PAGE FUNCTIONS │
 ╘════════════════*/
editButton.addEventListener("click", () => {
  modalOpen(editModal);
  setFormFields(editModalForm);
});
addButton.addEventListener("click", () => {
  modalOpen(addModal);
});

/*═════════════════╕
 │ MODAL FUNCTIONS │
 ╘═════════════════*/
editModalCloseButton.addEventListener("click", () => modalClose(editModal));
addModalCloseButton.addEventListener("click", () => modalClose(addModal));
editModalForm.addEventListener("submit", handleProfileSave);
addModalForm.addEventListener("submit", handleAddCard);

/*════════════════╕
 │ CARD FUNCTIONS │
 ╘════════════════*/

// Given cardData, return raw HTML for card
function addCardDataToHTML(cardData) {
  // Clone Template
  const cardElement = cardTemplate.cloneNode(true);
  // Store Values
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardDescriptionElement = cardElement.querySelector(".card__title");
  // Set Values for Card Instance
  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardDescriptionElement.textContent = cardData.name;
  // Return this 'card'
  return cardElement;
}

// Add a card to HTML
initialCards.forEach((cardData) => {
  cardListElement.append(addCardDataToHTML(cardData));
});
