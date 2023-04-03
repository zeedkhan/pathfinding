import { getNodesInShortestPathOrder } from "../utils/node";
import { getAllNodes } from "../utils/helper";

const bestFirstSearch = (grid, startNode, finishNode) => {
    const visitedNodesInOrder = [];
    const unvisitedNodes = getAllNodes(grid);
    startNode.distance = 0;

    while (unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const current = unvisitedNodes.shift();

        // isWall || terrainType === 1
        if (current.isWall || current.terrainType === 1) {
            continue;
        };

        if (current.distance === Infinity) {
            return visitedNodesInOrder
        };

        current.isVisited = true;
        visitedNodesInOrder.push(current);

        if (current === finishNode) {
            return visitedNodesInOrder
        };

        updateUnvisitedNeighbors(current, grid, finishNode);
    }

    return visitedNodesInOrder;
}

const sortNodesByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

const updateUnvisitedNeighbors = (node, grid, finishNode) => {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);

    for (let neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + calculateHeuristic(neighbor, finishNode);
        neighbor.previousNode = node;
    }
}

const getUnvisitedNeighbors = (node, grid) => {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter((neighbor) => !neighbor.isVisited);
}

const calculateHeuristic = (node, finishNode) => {
    const weightA = node.weight.terrain;
    const weightB = finishNode.weight.terrain;

    const dx = Math.abs((node.col + weightA) - (finishNode.col + weightB));
    const dy = Math.abs((node.row + weightA) - (finishNode.row + + weightB));
    return dx + dy;
}

const animate = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {

        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
        }, 50 * i);

        // start animate shorstest path
        if (i === visitedNodesInOrder.length - 1) {
            setTimeout(() => {
                animateShortestPath(nodesInShortestPathOrder);
            }, 50 * i)
            return;
        }
    }
};

const animateShortestPath = (visitedNodesInOrder) => {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
        // start animate shorstest path
        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
        }, 50 * i);
    }
}

const visualizeBFS = (grid, initPosition) => {

    const { startRow, startCol, finishRow, finishCol } = initPosition;

    const startNode = grid[startRow][startCol];

    const finishNode = grid[finishRow][finishCol];

    const visitedNodesInOrder = bestFirstSearch(grid, startNode, finishNode);

    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);

    // animate
    animate(visitedNodesInOrder, nodesInShortestPathOrder);

}

export default visualizeBFS;