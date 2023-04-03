import { shuffle2DArray } from "./helper";


const generateTerrain = (grid) => {

    const matrix = grid.slice();
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const node = matrix[row][col];

            // Randomly set some nodes to be water
            if (Math.random() < 0.2) {
                // node.isWall = true;
                node.weight.terrain = Infinity;
                node.terrainType = 1; // water
            }

            // Randomly set some nodes to be mountains
            if (Math.random() < 0.1) {
                node.weight.terrain += Math.floor(Math.random() * 10) + 1;
                node.terrainType = 2; // mountains
            }

            if (node.isFinish) {
                node.terrainType = 0;
            }

            if (node.isStart) {
                node.terrainType = 0;
            }

            // Set terrain type for flat terrain
            if (!node.isWall && node.weight.terrain === 0) {
                node.terrainType = 0; // flat terrain
            }
        }
    }


    animate(matrix);

    return matrix
}


const animate = (grid) => {
    const tempGrid = grid.slice();
    // const getSpecialNode = shuffle2DArray(tempGrid.flat().filter((node) => node.terrainType > 0));
    const getSpecialNode = tempGrid.flat().filter((node) => node.terrainType > 0);

    for (let i = 0; i < getSpecialNode.length; i++) {
        setTimeout(() => {
            const { row, col, terrainType } = getSpecialNode[i];

            const htmlNode = document.getElementById(`node-${row}-${col}`);

            const terrainTypeClass = terrainType === 1 ? "node-water" : terrainType === 2 ? "node-mountain" : "";

            htmlNode.classList.add(terrainTypeClass);

        }, 5 * i);
    }

}

export default generateTerrain