export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this.renderItems();
  }

  addItem(cardObj) {
    this._items.unshift(cardObj);
    this.renderItem(cardObj, false);
  }

  _clear() {
    this._container.innerHTML = "";
  }

  deleteItem(cardObj) {
    this._items.splice(
      this._items.findIndex(item =>
        item._id == cardObj._id
      ), 1);
  }

  renderItem(cardObj, server = false) {
    server ?
      this._container.append(this._renderer(cardObj)) :
      this._container.prepend(this._renderer(cardObj));
  }

  renderItems() {
    this._clear();
    this._items.forEach((item) => {
      this.renderItem(item, true);
    });
  }

  setItems(items) {
    this._items = items;
  }
}
