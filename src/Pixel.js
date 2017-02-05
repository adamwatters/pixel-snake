class Pixel {
  constructor(size) {
    this.element = document.createElement('div');
    this.element.setAttribute('class', 'pixel off');
    this.element.setAttribute('style', `width: ${size}%; height: 100%`);
    this.on = false;
  }

  toggle() {
    this.on = !this.on;
    this.element.setAttribute('class', `pixel ${this.on ? 'on' : 'off'}`);
  }
}

export default Pixel;
