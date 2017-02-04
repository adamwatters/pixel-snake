class Player {
  constructor(grid, keyboard) {
    this.coordinates = { x: 2, y: 2 };
    this.head = {};
    this.grid = grid;
    this.grid.position(this.coordinates).add(this);
    this.keyboard = keyboard;
  }

  update() {
    this.direction = decideDirection(this.direction, this.keyboard.lastDirectionPressed);
    this.grid.position(this.coordinates).remove(this);
    switch (this.direction) {
      case 'left':
        this.coordinates.x -= 1;
        break;
      case 'right':
        this.coordinates.x += 1;
        break;
      case 'up':
        this.coordinates.y -= 1;
        break;
      case 'down':
        this.coordinates.y += 1;
        break;
      default:
        // do nothing
    }
    this.grid.position(this.coordinates).add(this);
  }
}

function decideDirection(currentDirection, lastDirectionPressed) {
  switch (currentDirection) {
    case 'left':
      return lastDirectionPressed === 'right' ? currentDirection : lastDirectionPressed;
    case 'right':
      return lastDirectionPressed === 'left' ? currentDirection : lastDirectionPressed
    case 'up':
      return lastDirectionPressed === 'down' ? currentDirection : lastDirectionPressed
    case 'down':
      return lastDirectionPressed === 'up' ? currentDirection : lastDirectionPressed
    default:
      return lastDirectionPressed;
  }
}

export default Player;
