import Pixel from './Pixel';

class Screen {
  constructor(rootElement, width, height) {
    this.pixels = [];
    const screenElement = document.createElement('div');
    screenElement.setAttribute('class', 'screen');
    let row;
    let rowElement;
    let pixel;
    for (let i = 0; i < height; i += 1) {
      row = [];
      rowElement = document.createElement('div');
      rowElement.setAttribute('class', 'row');
      rowElement.setAttribute('style', `width: 100%; height: ${100 / width}%`);
      for (let j = 0; j < width; j += 1) {
        pixel = new Pixel((100 / width));
        row.push(pixel);
        rowElement.appendChild(pixel.element);
      }
      this.pixels.push(row);
      screenElement.appendChild(rowElement);
    }
    rootElement.appendChild(screenElement);
  }

  subScreen(x, y, w, h) {
    const rows = this.pixels.slice(y, y + h);
    return rows.reduce((acc, row) => acc.concat(row.slice(x, x + w)), []);
  }
}

export default Screen;
