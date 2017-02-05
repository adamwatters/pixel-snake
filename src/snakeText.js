import matrixUtilities from './matrixUtilities';

const font = {
  _: [
    0,
    0,
    0,
    0,
    0,
  ],

  s: [
    1, 1, 1, 1,
    1, 0, 0, 0,
    1, 1, 1, 1,
    0, 0, 0, 1,
    1, 1, 1, 1,
  ],

  n: [
    1, 0, 0, 1,
    1, 1, 0, 1,
    1, 1, 1, 1,
    1, 0, 1, 1,
    1, 0, 0, 1,
  ],

  a: [
    1, 1, 1, 1,
    1, 0, 0, 1,
    1, 1, 1, 1,
    1, 0, 0, 1,
    1, 0, 0, 1,
  ],

  k: [
    1, 0, 0, 1,
    1, 0, 1, 0,
    1, 1, 0, 0,
    1, 0, 1, 0,
    1, 0, 0, 1,
  ],

  e: [
    1, 1, 1, 1,
    1, 0, 0, 0,
    1, 1, 1, 1,
    1, 0, 0, 0,
    1, 1, 1, 1,
  ],
};

const { _, s, n, a, k, e } = font;
const chars = [_, n, _, a, _, k, _, e];
const snakeText = chars.reduce((acc, char) => matrixUtilities.combineHorizontal(acc, char, 5), s);

export default snakeText;
