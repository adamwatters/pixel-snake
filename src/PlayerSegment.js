class PlayerSegment {
  constructor(coordinates, grid) {
    this.coordinates = coordinates;
    this.nextSegment = null;
    this.grid = grid;
    this.type = 'PlayerSegment';
    grid.position(this.coordinates).add(this);
  }

  addSegment() {
    if (this.nextSegment) {
      this.nextSegment.addSegment();
    } else {
      this.nextSegment = new PlayerSegment(this.coordinates, this.grid);
    }
  }

  update(coordinates) {
    this.grid.position(this.coordinates).remove(this);
    if (this.nextSegment) {
      this.nextSegment.update(this.coordinates, this.grid);
    }
    this.coordinates = coordinates;
    this.grid.position(coordinates).add(this);
  }
}

export default PlayerSegment;
