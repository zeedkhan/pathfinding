import { getNodesInShortestPathOrder } from "../utils/node";
import { getAllNodes } from "../utils/helper";

function dijkstra(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);

    while (unvisitedNodes.length > 0) {
        sortNodesByDistance(unvisitedNodes);
        const current = unvisitedNodes.shift();

        // isWall || terrainType === 1
        if (current.isWall || current.terrainType === 1) {
            continue;
        };

        // If the closest node is at a distance of infinity,
        // we must be trapped and should stop.
        if (current.distance === Infinity) return visitedNodesInOrder;

        current.isVisited = true;
        visitedNodesInOrder.push(current);

        if (current === finishNode) return visitedNodesInOrder;

        updateUnvisitedNeighbors(current, grid);
    }

    return visitedNodesInOrder;
}


function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
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
    return neighbors.filter(neighbor => !neighbor.isVisited);
}


const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            console.log(nodesInShortestPathOrder[i]);
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

        if (i === visitedNodesInOrder.length - 1) {
            setTimeout(() => {
                animateShortestPath(nodesInShortestPathOrder);
            }, 50 * i);
            return;
        }
    }
};

function visualizeDijkstra(grid, initPosition) {

    const { startRow, startCol, finishRow, finishCol } = initPosition;

    const startNode = grid[startRow][startCol];

    const finishNode = grid[finishRow][finishCol];

    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);

    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);

    animate(visitedNodesInOrder, nodesInShortestPathOrder);

}

export default visualizeDijkstra;