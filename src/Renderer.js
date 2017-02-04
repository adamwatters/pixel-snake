class Renderer {
  constructor(pixels) {
    this.pixels = pixels;
  }

  initizialize(initialState) {
    initialState.forEach((element, index) => {
      if (element === 1) {
        this.pixels[index].toggle();
      }
    });
    this.previousState = initialState;
  }

  render(nextState) {
    if (!this.previousState) {
      this.initizialize(nextState);
    } else {
      this.previousState.forEach((element, index) => {
        if (element !== nextState[index]) {
          this.pixels[index].toggle();
        }
      });
      this.previousState = nextState;
    }
  }
}

export default Renderer;
