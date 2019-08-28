import PlayerSegment from "./PlayerSegment";

class Player {
  constructor(grid, keyboard) {
    this.grid = grid;
    this.keyboard = keyboard;
    this.head = new PlayerSegment({ x: 3, y: 3 }, grid);
  }

  addSegment() {
    this.head.addSegment();
  }

  update() {
    const newCoordinates = {
      x: this.head.coordinates.x,
      y: this.head.coordinates.y
    };
    this.direction = decideDirection(
      this.direction,
      this.keyboard.lastDirectionPressed
    );
    switch (this.direction) {
      case "left":
        newCoordinates.x -= 1;
        break;
      case "right":
        newCoordinates.x += 1;
        break;
      case "up":
        newCoordinates.y -= 1;
        break;
      case "down":
        newCoordinates.y += 1;
        break;
      default:
      // do nothing
    }
    this.head.update(newCoordinates);
  }
}

function decideDirection(currentDirection, lastDirectionPressed) {
  switch (currentDirection) {
    case "left":
      return lastDirectionPressed === "right"
        ? currentDirection
        : lastDirectionPressed;
    case "right":
      return lastDirectionPressed === "left"
        ? currentDirection
        : lastDirectionPressed;
    case "up":
      return lastDirectionPressed === "down"
        ? currentDirection
        : lastDirectionPressed;
    case "down":
      return lastDirectionPressed === "up"
        ? currentDirection
        : lastDirectionPressed;
    default:
      return lastDirectionPressed;
  }
}

export default Player;
