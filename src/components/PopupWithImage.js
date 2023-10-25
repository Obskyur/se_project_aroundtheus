import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".popup__image");
    this._captionElement = this._popup.querySelector(".popup__caption");
  }

  open({ name, link }) {
    super.open();
    this._captionElement.textContent = name;
    this._imageElement.alt = name;
    this._imageElement.src = link;
  }
}
