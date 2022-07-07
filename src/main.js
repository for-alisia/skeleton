// We want to finish with something like this:
// import Log from './log';
// import Calc from './calc';
// import img from './assets/webpack.png';
// import './css/main.css';

// We want to have this class as separate module
class Calc {
  add(...args) {
    return args.reduce((sum, elem) => sum + elem, 0);
  }

  partial(x, y) {
    return x * y;
  }

  test = (msg = 'Hello!') => {
    console.log(msg);
  };
}

// This class should be a separate module as well
class Log {
  log(msg) {
    console.log('=========');
    console.log(msg);
    console.log('=========');
  }
}

const log = new Log();
const calc = new Calc();

const result = calc.add(1, 2, 3);

log.log(calc.add(1, 2, 3));

const root = document.getElementById('root');
root?.textContent = `The result is ${result}`;

const image = document.createElement('img');
image.src = img;
document.body.appendChild(image);

calc.test();
const withSeven = calc.partial(?, 7);

log.log(withSeven(2));
