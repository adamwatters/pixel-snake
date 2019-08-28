const combineHorizontal = (a, b, height) => {
  let newMatrix = [];
  const aWidth = a.length / height;
  const bWidth = b.length / height;
  for (let i = 0; i < height; i += 1) {
    newMatrix = newMatrix.concat(a.slice(i * aWidth, i * aWidth + aWidth));
    newMatrix = newMatrix.concat(b.slice(i * bWidth, i * bWidth + bWidth));
  }
  return newMatrix;
};

const combineVertical = (a, b) => a.concat(b);

const matrixUtilities = {
  combineHorizontal,
  combineVertical
};

export default matrixUtilities;
