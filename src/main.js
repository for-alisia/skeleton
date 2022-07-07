// We want to finish with something like this:
// import Item from './item';
// import Collection from './collection';
// import img from './assets/webpack.png';
// import './css/main.css';

// We want to have this class as separate module
class Item {
  constructor(title, description, img) {
    this.title = title;
    this.description = description;
    this.img = img;
  }

  createImg() {
    const img = document.createElement('img');
    img.src = this.image;
    this.wrapper?.appendChild(img);

    return this;
  }

  createHeading() {
    const heading = document.createElement('h3');
    heading.textContent = this.title;
    this.wrapper?.appendChild(heading);

    return this;
  }

  createDescription() {
    const description = document.createElement('p');
    description.textContent = this.description;
    this.wrapper?.appendChild(description);

    return this;
  }

  render() {
    this.wrapper = document.createElement('li');
    this.createHeading().createDescription().createImg();

    return this.wrapper;
  }
}

// This class should be a separate module as well
class Collection {
  constructor(items) {
    this.items = items.flat();
  }

  renderCollection(parent) {
    if (!this.items) {
      console.log('Can not render on empty collection!');
    }

    const list = document.createElement('ul');

    this.items.forEach((item) => {
      list.appendChild(item.render());
    });

    parent.appendChild(list);
  }
}

const webpack = new Item('Webpack', 'The most popular JS bundler');
const collection = new Collection([webpack]);

const root = document.getElementById('root');
collection.renderCollection(root);
