import Screen from "./Screen";
import Renderer from "./Renderer";
import Keyboard from "./Keyboard";
import Game from "./Game";
import snakeText from "./snakeText";

const rootElement = document.getElementById("root");
// width and height in webview are not what you expect
// width stays constant and height changes
// values are rounded
var clientWidth = root.getBoundingClientRect().width;
var clientHeight = root.getBoundingClientRect().height;
var ratio = (clientHeight / clientWidth) * 100;
var roundedRatio = Math.round(ratio);
// console.log(roundedRatio);
// var roundedRatio = Math.round(ratio);
// var baseSizeInVW = roundedRatio <= 1 ? 100 : 100 / roundedRatio;
// var multiplier = baseSizeInVW / 100;
// var clockSizeInVW = baseSizeInVW * 0.9;
const width = 28;
const height = Math.round(width * (roundedRatio / 100));
const screen = new Screen(rootElement, width, height);
const renderer = new Renderer(screen.subScreen(0, 0, width, height));
const keyboard = new Keyboard();

const textRenderer = new Renderer(screen.subScreen(1, 1, 24, 6));
// create a new div element
const instructions = document.createElement("div");
// and give it some content
const instructionsInner = document.createElement("div");
instructionsInner.style.cssText = `
  text-align: center;
`;
instructions.appendChild(instructionsInner);
const instructionsContent = document.createTextNode(
  "arrow key or swipe to start the game"
);
// add the text node to the newly created div
instructionsInner.appendChild(instructionsContent);
instructions.style.cssText = `
  position: absolute;
  left: 10vw;
  top: 10vw;
  right: 10vw;
  bottom: 10vw;
  display: flex;
  align-items: center;
  justify-content: center;
  color: greenyellow;
  font-size: ${roundedRatio > 100 ? "10vw" : "10vh"};
  font-family: 'VT323', monospace;
`;

rootElement.appendChild(instructions);

const onGameStart = () => {
  instructions.style.display = "none";
};

const gameConfig = {
  keyboard,
  renderer,
  width,
  height,
  onGameStart
};

const game = new Game(gameConfig);
game.start();
