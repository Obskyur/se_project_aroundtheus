import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor( popupSelector, handleFormSubmit ) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    super.close();
  }

  open() {
    super.open();
  }

  
}