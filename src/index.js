import Screen from "./Screen";
import Renderer from "./Renderer";
import Keyboard from "./Keyboard";
import Game from "./Game";
import snakeText from "./snakeText";

const rootElement = document.getElementById("root");
const screen = new Screen(rootElement, 40, 35);

const width = 24;
const height = 24;
const renderer = new Renderer(screen.subScreen(8, 2, width, height));
const keyboard = new Keyboard();

const textRenderer = new Renderer(screen.subScreen(8, 28, 24, 6));
// create a new div element
const instructions = document.createElement("div");
// and give it some content
const instructionsContent = document.createTextNode(
  "press an arrow key to start the game"
);
// add the text node to the newly created div
instructions.appendChild(instructionsContent);
instructions.style.cssText =
  "position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); background-color: greenyellow";

rootElement.appendChild(instructions);

const onGameStart = () => {
  instructions.style.display = "none";
};

textRenderer.render(snakeText);

const gameConfig = {
  keyboard,
  renderer,
  width,
  height,
  onGameStart
};

const game = new Game(gameConfig);
game.start();
