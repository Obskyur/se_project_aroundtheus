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

//* Cards
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/*════════════════╕
 │ EVENT HANDLERS │
 ╘════════════════*/
function openModal(modal) {
  modal.classList.add("modal_opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
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
  cardListElement.prepend(addCardDataToHTML(card));
  evt.target.reset();

  closeModal(addCardModal);
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
// Modal Close Buttons
document
  .querySelectorAll(".modal__close")
  .forEach((closeButton) =>
    closeButton.addEventListener("click", () =>
      closeModal(closeButton.closest(".modal"))
    )
  );
editProfileModalForm.addEventListener("submit", handleProfileSave);
addCardModalForm.addEventListener("submit", handleAddCard);

/*════════════════╕
 │ CARD FUNCTIONS │
 ╘════════════════*/

// Given cardData element, return raw HTML for card
function addCardDataToHTML(cardData) {
  // Clone Template
  const cardElement = cardTemplate.cloneNode(true);
  // Store Values
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardDescriptionElement = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  // Set Values for Card Instance
  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardDescriptionElement.textContent = cardData.name;

  // Card Event Listeners
  cardImageElement.addEventListener("click", () => {
    openModal(imageModal);
    modalImageElement.src = cardData.link;
    modalImageElement.alt = cardData.name;
    modalCaptionElement.textContent = cardData.name;
  });
  likeButton.addEventListener("click", () =>
    likeButton.classList.toggle("card__like-button_active")
  );
  deleteButton.addEventListener("click", () =>
    deleteButton.closest(".card").remove()
  );
  // Return this 'card'
  return cardElement;
}

// Add initial cards to HTML
initialCards.forEach((cardData) => {
  cardListElement.append(addCardDataToHTML(cardData));
});
