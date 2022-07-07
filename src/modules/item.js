export default class Item {
  wrapper = null;

  constructor(title, description, img) {
    this.title = title;
    this.description = description;
    this.img = img;
  }

  createImg() {
    const img = document.createElement('img');
    img.src = this.img;
    img.width = 200;
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
