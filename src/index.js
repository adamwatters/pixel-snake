import Screen from './Screen';
import Renderer from './Renderer';
import Keyboard from './Keyboard';
import Game from './Game';

const rootElement = document.getElementById('root');
const screen = new Screen(rootElement, 41, 31);

const width = 21;
const height = 21;
const renderer = new Renderer(screen.flattenedSubScreen(10, 5, width, height));
const keyboard = new Keyboard();

const gameConfig = {
  keyboard,
  renderer,
  width,
  height,
};

const game = new Game(gameConfig);
game.render();
game.start();
