const clearPrevMove = (grid, type) => {
  const newGrid = grid.slice();

  newGrid.map((x) => x.map((y) => (y[type] = false)));

  return newGrid;
};

export const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;

  return newGrid;
};

export const moveStart = (grid, row, col) => {
  if (grid[row][col].isFinish || grid[row][col].isWall) return grid;

  const newGrid = clearPrevMove(grid, "isStart");

  const node = newGrid[row][col];

  const newNode = {
    ...node,
    isStart: !node.isStart,
  };

  newGrid[row][col] = newNode;

  return newGrid;
};

export const moveFinish = (grid, row, col) => {
  if (grid[row][col].isStart || grid[row][col].isWall) return grid;

  const newGrid = clearPrevMove(grid, "isFinish");

  const node = newGrid[row][col];

  const newNode = {
    ...node,
    isFinish: !node.isFinish,
  };

  newGrid[row][col] = newNode;

  return newGrid;
};
