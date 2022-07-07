// We want to finish with something like this:
import Item from './modules/item';
import Collection from './modules/collection';
import img from './assets/img/webpack.png';
import './css/main.scss';

const webpack = new Item('Webpack', 'The most popular JS bundler', img);
const collection = new Collection([webpack]);

const root = document.getElementById('root');
collection.renderCollection(root);
