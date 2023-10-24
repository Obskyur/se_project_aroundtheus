export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._containerSelector.append(element);
  }

  _clear() {
    this._container.innerHTML = "";
  }

  renderItems() {
    this._clear();
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
