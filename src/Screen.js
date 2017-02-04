import Pixel from './Pixel';

class Screen {
  constructor(rootElement, height, width) {
    const screenElement = document.createElement('div');
    screenElement.setAttribute('class', 'screen');
    this.pixels = [];
    let column;
    let pixel;
    for (let i = 0; i < height; i += 1) {
      column = [];
      for (let j = 0; j < width; j += 1) {
        pixel = new Pixel((100 / width));
        column.push(pixel);
        screenElement.appendChild(pixel.element);
      }
      this.pixels.push(column);
    }
    rootElement.appendChild(screenElement);
  }

  flattenedSubScreen(x, y, w, h) {
    const rows = this.pixels.slice(y, y + h);
    return rows.reduce((acc, row) => {
      return acc.concat(row.slice(x, x + w));
    }, []);
  }
}

export default Screen;
