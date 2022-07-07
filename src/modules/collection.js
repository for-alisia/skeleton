export default class Collection {
  constructor(items) {
    this.items = items.flat();
  }

  renderCollection(parent) {
    if (!this.items) {
      console.log(`Can not render on empty collection: ${this.items}`);
    }

    const list = document.createElement('ul');

    this.items.forEach((item) => {
      list.appendChild(item.render());
    });

    parent.appendChild(list);
  }
}
