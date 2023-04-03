function dfs(grid, startNode, finishNode, report) {

    const unvisitedNodes = [startNode];
    const visitedNodesInOrder = [];

    while (unvisitedNodes.length > 0) {
        const current = unvisitedNodes.pop();

        if (!current.isVisited) {
            current.isVisited = true;

            visitedNodesInOrder.push(current);
            updateUnvisitedNeighbors(current, grid);

            if (current.isWall) {
                report.wallCount = report.wallCount + 1;
            }
            if (current.terrainType === 0) {
                report.pathCount = report.pathCount + 1;
            }
            if (current.terrainType === 1) {
                report.waterCount = report.waterCount + 1;
            }
            if (current.terrainType === 2) {
                report.IslandCount = report.IslandCount + 1;
            }


            const { row, col } = current;

            checkNeighbors(row + 1, col, grid, unvisitedNodes);
            checkNeighbors(row - 1, col, grid, unvisitedNodes);
            checkNeighbors(row, col + 1, grid, unvisitedNodes);
            checkNeighbors(row, col - 1, grid, unvisitedNodes);
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

function visualizeExploreMap(grid, initPosition) {
    const report = {
        IslandCount: 0,
        waterCount: 0,
        pathCount: 0,
        wallCount: 0,
    };

    const { startRow, startCol, finishRow, finishCol } = initPosition;

    const startNode = grid[startRow][startCol];

    const finishNode = grid[finishRow][finishCol];

    const visitedNodesInOrder = dfs(grid, startNode, finishNode, report);

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

export default visualizeExploreMap;
