import Screen from './Screen';
import Renderer from './Renderer';
import Keyboard from './Keyboard';
import Game from './Game';
import snakeText from './snakeText';

const rootElement = document.getElementById('root');
const screen = new Screen(rootElement, 40, 35);

const width = 24;
const height = 24;
const renderer = new Renderer(screen.subScreen(8, 2, width, height));
const keyboard = new Keyboard();

const textRenderer = new Renderer(screen.subScreen(8, 28, 24, 6));
textRenderer.render(snakeText);

const gameConfig = {
  keyboard,
  renderer,
  width,
  height,
};

const game = new Game(gameConfig);
game.start();
