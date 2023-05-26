/*══════════════╕
 │ DOM ELEMENTS │
 ╘══════════════*/
const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const modal = document.querySelector(".modal");
const modalForm = modal.querySelector(".modal__form");
const modalCloseButton = modal.querySelector(".modal__close");
const modalNameInput = modal.querySelector("#modalName");
const modalDescriptionInput = modal.querySelector("#modalDescription");

/*════════════════╕
 │ EVENT HANDLERS │
 ╘════════════════*/
function modalOpen() {
  modalNameInput.value = profileName.textContent;
  modalDescriptionInput.value = profileDescription.textContent;
  modal.classList.add("modal_opened")
 }
function modalClose() {
  modal.classList.remove("modal_opened");
}
function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = modalNameInput.value;
  profileDescription.textContent = modalDescriptionInput.value;
  modalClose();
}

/*════════════════╕
 │ PAGE FUNCTIONS │
 ╘════════════════*/
editButton.addEventListener("click", modalOpen);

/*═════════════════╕
 │ MODAL FUNCTIONS │
 ╘═════════════════*/
modalCloseButton.addEventListener("click", modalClose);
modalForm.addEventListener("submit", handleProfileSubmit);

/*════════════════╕
 │ CARD FUNCTIONS │
 ╘════════════════*/

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
