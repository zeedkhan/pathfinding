import { createNode } from "./node";


function twoDimentionsArray(rowSize, colSize, initPosition) {

  const grid = [];
  
  const { startRow, startCol, finishRow, finishCol } = initPosition

  for (let r = 0; r < rowSize; r++) {
    const currentRow = []
    for (let c = 0; c < colSize; c++) {
        currentRow.push(createNode(r, c, initPosition))
    }
    grid.push(currentRow)
}
  return grid;
}


export { twoDimentionsArray };
