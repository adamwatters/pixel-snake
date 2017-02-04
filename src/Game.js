import Grid from './Grid';
import Player from './Player';
import Block from './Block';

class Game {
  constructor({ keyboard, renderer, width, height }) {
    this.grid = new Grid(width, height);
    addBoundriesToGrid(this.grid);
    this.player = new Player(this.grid, keyboard);
    this.renderer = renderer;
    this.over = false;
  }

  start() {
    let counter = 0;
    const speed = 10;
    const tick = () => {
      if (counter === speed) {
        this.update();
        this.render();
        counter = 0;
      } else {
        counter += 1;
      }
      if (!this.over) {
        requestAnimationFrame(tick) 
      } else {
        console.log('game over')
      }
    }
    tick();
  }

  update() {
    this.player.update();
    if (this.grid.hasCollisions()) {
      this.over = true;
    }
  }

  render() {
    this.renderer.render(this.grid.forDisplay());
  }
}

function addBoundriesToGrid(grid) {
  grid.edges().forEach((position) => {
    position.add(new Block())
  })
}

export default Game;
