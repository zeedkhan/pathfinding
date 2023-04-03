export const createNode = (row, col, initPosition) => {
  const { startRow, startCol, finishRow, finishCol } = initPosition;

  const startPos = row === startRow && col === startCol;
  const finishPos = row === finishRow && col === finishCol;

  return {
    col,
    row,
    isStart: startPos,
    isFinish: finishPos,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    isMove: false,
    weight: {
      g: 0,
      f: 0,
      h: 0,
      terrain: 0,
    },
    isEditing: false,
    /* 
      terrainType  
        0: path
        1: water
        2: mountain
        3: wall
    */
    terrainType: 0,
    previousNode: null,
  };
};

export const getNodesInShortestPathOrder = (finishNode) => {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;

  while (currentNode.previousNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodesInShortestPathOrder;
};
