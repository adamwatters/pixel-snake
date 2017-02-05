import Pixel from './Pixel';

class Screen {
  constructor(rootElement, width, height) {
    const screenElement = document.createElement('div');
    screenElement.setAttribute('class', 'screen');
    this.pixels = [];
    let row;
    let pixel;
    for (let i = 0; i < height; i += 1) {
      row = [];
      for (let j = 0; j < width; j += 1) {
        pixel = new Pixel((100 / width));
        row.push(pixel);
        screenElement.appendChild(pixel.element);
      }
      this.pixels.push(row);
    }
    rootElement.appendChild(screenElement);
  }

  flattenedSubScreen(x, y, w, h) {
    const rows = this.pixels.slice(y, y + h);
    return rows.reduce((acc, row) => acc.concat(row.slice(x, x + w)), []);
  }
}

export default Screen;
