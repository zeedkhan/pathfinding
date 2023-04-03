import { getNodesInShortestPathOrder } from "../utils/node";

const aStarSearch = (matrix, startNode, finishNode) => {
    const openSet = [startNode];
    const closedSet = [];

    startNode.weight.g = 0;
    startNode.weight.h = calculateHeuristic(startNode, finishNode);
    startNode.weight.f = startNode.weight.g + startNode.weight.h;

    while (openSet.length > 0) {
        const currentNode = getLowestFScoreNode(openSet);

        if (currentNode === finishNode) {
            return getPath(finishNode);
        }

        removeFromArray(openSet, currentNode);
        closedSet.push(currentNode);

        const neighbors = getNeighbors(currentNode, matrix);

        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];

            // skip wall || skip water || skip visited
            if (closedSet.includes(neighbor) || neighbor.isWall || neighbor.terrainType === 1) {
                continue;
            }

            const tentativeGScore = currentNode.weight.g + calculateDistance(currentNode, neighbor);

            if (!openSet.includes(neighbor)) {
                openSet.push(neighbor);
            } else if (tentativeGScore >= neighbor.weight.g) {
                continue;
            }

            neighbor.previousNode = currentNode;
            neighbor.weight.g = tentativeGScore;
            neighbor.weight.h = calculateHeuristic(neighbor, finishNode);
            neighbor.weight.f = neighbor.weight.g + neighbor.weight.h;
        }
    }

    // []
    return []; // No path found
}

const getLowestFScoreNode = (nodes) => {
    let lowestNode = nodes[0];

    for (let i = 1; i < nodes.length; i++) {
        if (nodes[i].weight.f < lowestNode.weight.f) {
            lowestNode = nodes[i];
        }
    }

    return lowestNode;
}

const getNeighbors = (node, matrix) => {
    const neighbors = [];
    const { col, row } = node;
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    if (row > 0) neighbors.push(matrix[row - 1][col]);
    if (row < numRows - 1) neighbors.push(matrix[row + 1][col]);
    if (col > 0) neighbors.push(matrix[row][col - 1]);
    if (col < numCols - 1) neighbors.push(matrix[row][col + 1]);

    return neighbors.filter((neighbor) => !neighbor.isVisited);
}

const calculateDistance = (nodeA, nodeB) => {
    const { col: colA, row: rowA, weight: weightA } = nodeA;
    const { col: colB, row: rowB, weight: weightB } = nodeB;

    const distance = Math.sqrt(Math.pow((rowA + weightA.terrain) - (rowB + weightB.terrain), 2) + Math.pow((colA + weightA.terrain) - (colB + weightB.terrain), 2));

    if (nodeA.isMove && nodeB.isMove) {
        return distance * 1.5;
    } else if (nodeA.isMove || nodeB.isMove) {
        return distance * 1.2;
    } else {
        return distance;
    }
}

const calculateHeuristic = (nodeA, nodeB) => {
    const { col: colA, row: rowA } = nodeA;
    const { col: colB, row: rowB } = nodeB;

    const heuristic = Math.abs(rowA - rowB) + Math.abs(colA - colB);

    return heuristic;
}

const getPath = (node) => {
    const path = [];

    while (node !== null) {
        path.unshift(node);
        node = node.previousNode;
    }

    console.log("Exit path A*", path);
    return path;
}

const removeFromArray = (arr, item) => {
    const index = arr.indexOf(item);

    if (index > -1) {
        arr.splice(index, 1);
    }
}

const animate = (visitedNodesInOrder) => {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {

        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
        }, 50 * i);

        // start animate shorstest path
        if (i === visitedNodesInOrder.length - 1) {
            setTimeout(() => {
                animateShortestPath(visitedNodesInOrder);
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

function visualizeAstar(grid, initPosition) {

    const { startRow, startCol, finishRow, finishCol } = initPosition;

    const startNode = grid[startRow][startCol];

    const finishNode = grid[finishRow][finishCol];

    const visitedNodesInOrder = aStarSearch(grid, startNode, finishNode);

    /* This function will return shortest path itself no need nodesInShortestPathOrder */
    // const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);

    // animate
    animate(visitedNodesInOrder);

}

export default visualizeAstar;