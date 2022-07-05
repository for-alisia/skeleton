class App {
  counter = null;

  create() {
    this.counter = 0;
    const name = 'World';
    console.log(`Hello ${name}`);
  }

  update = async () => {
    if (!counter) return false;

    this.counter++;
    console.log([1, 2, 3, [4, 5]].flat());

    return true;
  };
}

const app = new App();
app.create();
app.update().then((res) => console.log(res));
