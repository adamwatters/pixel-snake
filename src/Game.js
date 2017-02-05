import Grid from './Grid';
import Player from './Player';
import Block from './Block';
import Food from './Food';

class Game {
  constructor({ keyboard, renderer, width, height }) {
    this.grid = new Grid(width, height);
    this.keyboard = keyboard;
    addBoundriesToGrid(this.grid);
    this.player = new Player(this.grid, this.keyboard);
    this.renderer = renderer;
    this.over = false;
  }

  start() {
    this.render();
    let counter = 0;
    const speed = 5;
    const tick = () => {
      if (counter === speed) {
        this.update();
        this.render();
        counter = 0;
      } else {
        counter += 1;
      }
      if (!this.over) {
        requestAnimationFrame(tick);
      } else {
        this.restart();
      }
    };
    tick();
  }

  restart() {
    this.grid.clear();
    this.keyboard.restart();
    addBoundriesToGrid(this.grid);
    this.player = new Player(this.grid, this.keyboard);
    this.over = false;
    this.start();
  }

  update() {
    this.player.update();
    this.handleCollisions();
    if (Math.random() < 0.08) {
      this.addFood();
    }
  }

  handleCollisions() {
    this.grid.positionsWithCollisions().forEach((p) => {
      this.handleBlockCollision(p);
      this.handleSelfCollision(p);
      this.handleFoodCollision(p);
    });
  }

  handleBlockCollision(postion) {
    if ((postion.bodies[0].type === 'PlayerSegment' && postion.bodies[1].type === 'Block') ||
    (postion.bodies[0].type === 'Block' && postion.bodies[1].type === 'PlayerSegment')) {
      this.over = true;
    }
  }

  handleSelfCollision(postion) {
    if ((postion.bodies[0].type === 'PlayerSegment' && postion.bodies[1].type === 'PlayerSegment') ||
    (postion.bodies[0].type === 'PlayerSegment' && postion.bodies[1].type === 'PlayerSegment')) {
      this.over = true;
    }
  }

  handleFoodCollision(position) {
    if (position.bodies[0].type === 'PlayerSegment' && position.bodies[1].type === 'Food') {
      position.remove(position.bodies[1]);
      this.player.addSegment();
    } else if (position.bodies[0].type === 'Food' && position.bodies[1].type === 'PlayerSegment') {
      position.remove(position.bodies[0]);
      this.player.addSegment();
    }
    return false;
  }

  addFood() {
    const empties = this.grid.empties();
    const randomEmpty = empties[Math.floor(Math.random() * (empties.length - 1))];
    randomEmpty.add(new Food());
  }

  render() {
    this.renderer.render(this.grid.forDisplay());
  }
}

function addBoundriesToGrid(grid) {
  grid.edges().forEach((position) => {
    position.add(new Block());
  });
}

export default Game;
