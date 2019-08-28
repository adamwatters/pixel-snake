class Pixel {
  constructor(size) {
    console.log(size);
    this.element = document.createElement("div");
    this.element.setAttribute("class", "pixel off");
    this.element.setAttribute("style", `width: 3vw; height: 3vw`);
    this.on = false;
  }

  toggle() {
    this.on = !this.on;
    this.element.setAttribute("class", `pixel ${this.on ? "on" : "off"}`);
  }
}

export default Pixel;
