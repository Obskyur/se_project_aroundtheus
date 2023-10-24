import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".popup__image");
    this._captionElement = this._popup.querySelector(".popup__caption");
  }

  open({ name, link }) {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._captionElement.textContent = name;
    this._imageElement.alt = name;
    this._imageElement.src = link;
  }

  close() {
    super.close();
  }

  _handleEscClose(evt) {
    super._handleEscClose(evt);
}

  setEventListeners() {
    super.setEventListeners();
  }
}
