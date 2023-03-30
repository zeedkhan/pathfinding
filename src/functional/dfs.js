import { getNodesPassNodes } from "../utils/node";

function dfs(grid, startNode, finishNode) {
    // const visited = new Set();

    const unvisitedNodes = [startNode];
    const visitedNodesInOrder = [];
    // const path = [];

    while (unvisitedNodes.length > 0) {
        const current = unvisitedNodes.pop();

        if (current.isWall) continue;

        if (current === finishNode) {
            return visitedNodesInOrder;
        }

        if (!current.isVisited) {
            current.isVisited = true


            visitedNodesInOrder.push(current);
            updateUnvisitedNeighbors(current, grid);

            // path.push(current)

            const { row, col } = current


            checkNeighbors(row, col + 1, grid, unvisitedNodes);
            checkNeighbors(row + 1, col, grid, unvisitedNodes);
            checkNeighbors(row, col - 1, grid, unvisitedNodes);
            checkNeighbors(row - 1, col, grid, unvisitedNodes);
        }

    }
}

function checkNeighbors(row, col, grid, unvisitedNodes) {
    if (row >= 0 && row < grid.length && col >= 0 && col < grid.length) {
        unvisitedNodes.push(grid[row][col]);
    }
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        //   neighbor.distance = node.distance + 1;
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

function visualizeDfs(grid, initPosition) {
    const { startRow, startCol, finishRow, finishCol } = initPosition

    const startNode = grid[startRow][startCol]


    const finishNode = grid[finishRow][finishCol];


    const visitedNodesInOrder = dfs(grid, startNode, finishNode)

    const nodesInShortestPathOrder = getNodesPassNodes(finishNode)

    console.log(nodesInShortestPathOrder)

    animate(visitedNodesInOrder, nodesInShortestPathOrder)
}





const animateShortestPath = (nodesInShortestPathOrder) => {


    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
            const node = nodesInShortestPathOrder[i]
            console.log(nodesInShortestPathOrder[i])
            document.getElementById(
                `node-${node.row}-${node.col}`
            ).className = 'node node-shortest-path'
        }, 50 * i)
    }
}

const animate = (visitedNodesInOrder, nodesInShortestPathOrder) => {

    for (let i = 0; i < visitedNodesInOrder.length; i++) {

        /* 
            At exit now
        */


        /* 
            Find exit

        */

        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(
                `node-${node.row}-${node.col}`
            ).className = 'node node-visited';
        }, 50 * i);

        if (i === visitedNodesInOrder.length - 1) {
            setTimeout(() => {
                animateShortestPath(nodesInShortestPathOrder)
            }, 50 * i)
            return
        }
    }
}





export default visualizeDfs;