function bidirectionalSearch(grid, startNode, finishNode) {
    // Initialize start and finish nodes for each search
    const startNode1 = startNode;
    const finishNode1 = finishNode;
    const startNode2 = grid[grid.length - 1][grid[0].length - 1];
    const finishNode2 = grid[0][0];

    // Initialize visited sets for each search
    const visited1 = new Set([startNode1]);
    const visited2 = new Set([startNode2]);

    // Initialize queue for each search
    const queue1 = [startNode1];
    const queue2 = [startNode2];

    while (queue1.length && queue2.length) {
        // Expand the search in the forward direction
        const currNode1 = queue1.shift();
        const neighbors1 = getUnvisitedNeighbors(currNode1, grid, visited1);
        for (let neighbor of neighbors1) {
            if (visited2.has(neighbor)) {
                return getPath(currNode1, neighbor, startNode1, startNode2, finishNode1, finishNode2);
            }
            visited1.add(neighbor);
            queue1.push(neighbor);
        }

        // Expand the search in the backward direction
        const currNode2 = queue2.shift();
        const neighbors2 = getUnvisitedNeighbors(currNode2, grid, visited2);
        for (let neighbor of neighbors2) {
            if (visited1.has(neighbor)) {
                return getPath(startNode1, startNode2, neighbor, currNode2, finishNode1, finishNode2);
            }
            visited2.add(neighbor);
            queue2.push(neighbor);
        }
    }

    // No path found
    return [];
}

function getPath(startNode1, startNode2, finishNode1, finishNode2, endNode1, endNode2) {
    const path1 = getShortestPath(startNode1, endNode1);
    const path2 = getShortestPath(startNode2, endNode2).reverse();
    return path1.concat(path2);
}

function getShortestPath(startNode, endNode) {
    const path = [];
    let currentNode = endNode;
    while (currentNode !== startNode) {
        path.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    path.unshift(startNode);
    return path;
}

function getUnvisitedNeighbors(node, grid, visited) {
    const neighbors = [];
    const { col, row } = node;

    helperAddNeighbors(grid, row, col-1, visited, neighbors);
    helperAddNeighbors(grid, row-1, col, visited, neighbors);
    helperAddNeighbors(grid, row, col+1, visited, neighbors);
    helperAddNeighbors(grid, row+1, col, visited, neighbors);

    // if (grid[row] !== undefined && col > 0 && grid[row][col] !== undefined && !visited.has(grid[row][col-1])) {
    //     neighbors.push(grid[row][col - 1]);
    // }

    // if (row > 0 && !visited.has(grid[row - 1][col])) {
    //     neighbors.push(grid[row - 1][col]);
    // }

    // if ()


    // if (col > 0 && !visited.has(grid[row][col - 1])) neighbors.push(grid[row][col - 1]);
    // if (row > 0 && !visited.has(grid[row - 1][col])) neighbors.push(grid[row - 1][col]);
    // if (col < grid[0].length - 1 && !visited.has(grid[row][col + 1])) neighbors.push(grid[row][col + 1]);
    // if (row < grid.length - 1 && !visited.has(grid[row + 1][col])) neighbors.push(grid[row + 1][col]);
    return neighbors;
}

function helperAddNeighbors (grid, row, col, visited, neighbors) {
    if (grid[row] !== undefined && grid[row][col] !== undefined && !visited.has(grid[row][col])) {
        neighbors.push(grid[row][col]);
    }
}

const animateShortestPath = (visitedNodesInOrder) => {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
        // start animate shorstest path
        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
        }, 50 * i);
    }
}

const animate = (visitedNodesInOrder, nodesInShortestPathOrder) => {

    console.log(visitedNodesInOrder)

    for (let i = 0; i < visitedNodesInOrder.length; i++) {
        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
                "node node-visited";
        }, 50 * i);

        /* Reach The Goal */
        // if (i === visitedNodesInOrder.length - 1) {
        //     setTimeout(() => {
        //         animateShortestPath(nodesInShortestPathOrder);
        //     }, 50 * i);
        //     return;
        // }
    }
};

const visualizeBidirectional = (grid, initPosition) => {

    const { startRow, startCol, finishRow, finishCol } = initPosition;

    const startNode = grid[startRow][startCol];

    const finishNode = grid[finishRow][finishCol];

    const visitedNodesInOrder = bidirectionalSearch(grid, startNode, finishNode);

    // animate
    animate(visitedNodesInOrder);

}

export default visualizeBidirectional;