class Position {
  constructor() {
    this.bodies = [];
    this.nextSegment = null;
  }
  add(body) {
    this.bodies.push(body);
  }
  remove(body) {
    this.bodies = this.bodies.filter(b => b !== body);
  }
  containsCollision() {
    return this.bodies.length > 1;
  }
  empty() {
    return this.bodies.length === 0;
  }
}

export default Position;
