export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this.renderItems();
  }

  addItem(element, server = false) {
    server ?
      this._container.append(element) :
      this._container.prepend(element);
  }

  _clear() {
    this._container.innerHTML = "";
  }

  renderItems() {
    this._clear();
    this._items.forEach((item) => {
      const element = this._renderer(item);
      this.addItem(element, true);
    });
  }
}
