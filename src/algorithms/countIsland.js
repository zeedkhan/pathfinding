import { getNodesInShortestPathOrder } from "../utils/node";

const flatten = (arr) => {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}

function dfs(row, col, grid, visitedNodesInOrder, report, length = 0, island) {
    if (grid[row] === undefined || grid[row][col] === undefined || grid[row][col].isVisited || grid[row][col].terrainType !== 2 || island.has(`${row},${col}`)) {
        return;
    }

    grid[row][col].isVisited = true;
    island.add(`${row},${col}`);


    dfs(row + 1, col, grid, visitedNodesInOrder, report, length + 1, island);
    dfs(row - 1, col, grid, visitedNodesInOrder, report, length + 1, island);
    dfs(row, col - 1, grid, visitedNodesInOrder, report, length + 1, island);
    dfs(row, col + 1, grid, visitedNodesInOrder, report, length + 1, island);

    if (length >= 2) {
        visitedNodesInOrder.push(Array.from(island).map(pos => {
            const [nodeRow, nodeCol] = pos.split(",");
            return grid[nodeRow][nodeCol]
        }));
        report.connectedIslandCount = report.connectedIslandCount + 1;
    }
}

function detectIsland(grid, report) {

    const visitedNodesInOrder = [];



    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j].terrainType === 2 && !grid[i][j].isVisited) {
                const island = new Set();
                dfs(i, j, grid, visitedNodesInOrder, report, 1, island);
            }
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
        // //   neighbor.distance = node.distance + 1;
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

function visualizeCountIsland(grid, initPosition) {
    const report = {
        connectedIslandCount: 0,
        IslandCount: 0,
        waterCount: 0,
        pathCount: 0,
        wallCount: 0,
    };

    const { startRow, startCol, finishRow, finishCol } = initPosition;

    const startNode = grid[startRow][startCol];

    const finishNode = grid[finishRow][finishCol];

    const visitedNodesInOrder = flatten(detectIsland(grid, report));

    animate(visitedNodesInOrder);

    return { grid, report };
}



const animate = (visitedNodesInOrder) => {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
                "node node-visited";
        }, 50 * i);
    }
};

export default visualizeCountIsland;
