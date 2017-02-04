import Screen from './Screen';
import Renderer from './Renderer';
import Keyboard from './Keyboard';
import Game from './Game';

const rootElement = document.getElementById('root');
const screen = new Screen(rootElement, 40, 50);

const width = 24;
const height = 24;
const renderer = new Renderer(screen.flattenedSubScreen(3, 3, width, height));
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
