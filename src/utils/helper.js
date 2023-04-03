import { createNode } from "./node";


function twoDimentionsArray(rowSize, colSize, initPosition) {

  const grid = [];

  for (let r = 0; r < rowSize; r++) {
    const currentRow = []
    for (let c = 0; c < colSize; c++) {
      currentRow.push(createNode(r, c, initPosition))
    }
    grid.push(currentRow)
  }
  return grid;
}

const shuffle2DArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    for (let j = array[i].length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (i + 1));
      const l = Math.floor(Math.random() * (j + 1));
      [array[i][j], array[k][l]] = [array[k][l], array[i][j]];
    }
  }
  return array;
}


const getAllNodes = (grid) => {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

export { twoDimentionsArray, shuffle2DArray, getAllNodes };
