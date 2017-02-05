import Position from './Position';

class Grid {
  constructor(width, height) {
    this.positions = buildPositions(width, height);
    this.width = width;
    this.height = height;
  }

  position({ x, y }) {
    return this.positions[(y * this.width) + x];
  }

  edges() {
    return this.positions.filter((position, index) => {
      return index < this.width ||
             index >= ((this.width * this.height) - this.width) ||
             index % this.width === 0 ||
             (index + 1) % this.width === 0;
    });
  }

  clear() {
    this.positions.forEach((p) => {
      p.clear();
    });
  }

  empties() {
    return this.positions.filter((p) => {
      return p.isEmpty;
    });
  }

  positionsWithCollisions() {
    return this.positions.filter(p => p.containsCollision());
  }

  forDisplay() {
    return this.positions.map((position) => {
      return position.isEmpty() ? 0 : 1;
    });
  }
}

function buildPositions(width, height) {
  const positions = [];
  for (let i = 0; i < width * height; i += 1) {
    positions.push(new Position());
  }
  return positions;
}

export default Grid;
