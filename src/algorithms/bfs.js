import { getNodesInShortestPathOrder } from "../utils/node";

function bfs(grid, startNode, finishNode) {
  const unvisitedNodes = [startNode];
  const visitedNodesInOrder = [];

  while (unvisitedNodes.length > 0) {
    const current = unvisitedNodes.shift();

    // isWall || terrainType === 1
    if (current.isWall || current.terrainType === 1) {
      continue;
    };

    if (current === finishNode) {
      return visitedNodesInOrder;
    }

    if (!current.isVisited) {
      current.isVisited = true;

      visitedNodesInOrder.push(current);
      updateUnvisitedNeighbors(current, grid);

      const { row, col } = current;

      checkNeighbors(row, col + 1, grid, unvisitedNodes);
      checkNeighbors(row + 1, col, grid, unvisitedNodes);
      checkNeighbors(row, col - 1, grid, unvisitedNodes);
      checkNeighbors(row - 1, col, grid, unvisitedNodes);
    }
  }
  return visitedNodesInOrder;
}

function checkNeighbors(row, col, grid, unvisitedNodes) {
  if (grid[row] !== undefined && grid[row][col] !== undefined) {
    unvisitedNodes.push(grid[row][col]);
  }
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function visualizeBfs(grid, initPosition) {
  const { startRow, startCol, finishRow, finishCol } = initPosition;

  const startNode = grid[startRow][startCol];

  const finishNode = grid[finishRow][finishCol];

  const visitedNodesInOrder = bfs(grid, startNode, finishNode);

  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);

  animate(visitedNodesInOrder, nodesInShortestPathOrder);
}

const animateShortestPath = (nodesInShortestPathOrder) => {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    setTimeout(() => {
      const node = nodesInShortestPathOrder[i];
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node node-shortest-path";
    }, 50 * i);
  }
};

const animate = (visitedNodesInOrder, nodesInShortestPathOrder) => {
  for (let i = 0; i < visitedNodesInOrder.length; i++) {
    setTimeout(() => {
      const node = visitedNodesInOrder[i];
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node node-visited";
    }, 50 * i);

    /* Reach The Goal */ 
    if (i === visitedNodesInOrder.length - 1) {
      setTimeout(() => {
        animateShortestPath(nodesInShortestPathOrder);
      }, 50 * i);
      return;
    }
  }
};

export { bfs }
export default visualizeBfs;
