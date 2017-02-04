class Position {
  constructor() {
    this.bodies = [];
  }
  add(body) {
    this.bodies.push(body);
  }
  remove(body) {
    this.bodies = this.bodies.filter(b => b !== body);
  }
  collision() {
    return this.bodies.length > 1;
  }
  empty() {
    return this.bodies.length === 0;
  }
}

export default Position;
