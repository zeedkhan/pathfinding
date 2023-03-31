import React, { useEffect, useState } from "react";
import visualizeDfs from "../functional/dfs";
import { twoDimentionsArray } from "../utils/helper";
import Node from "./Node";
import visualizeBfs from "../functional/bfs";
import { createNode } from "../utils/node";
import {
  getNewGridWithWallToggled,
  moveStart,
  moveFinish,
  rd
} from "../utils/grid";
import visualizeDijkstra from "../functional/dijkstra";

/* INIT WHEN ANOMYNOUS */
const START_NODE_ROW = 0;
const START_NODE_COL = 4;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 14;

function Matrix() {
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [initPosition, setInitialPosition] = useState({
    startRow: START_NODE_ROW,
    startCol: START_NODE_COL,
    finishRow: FINISH_NODE_ROW,
    finishCol: FINISH_NODE_COL,
  });

  const [startNode, setStartNode] = useState(false);
  const [finishNode, setFinishNode] = useState(false);

  const [sizeRow, setSizeRow] = useState(48);
  const [sizeCol, setSizeCol] = useState(50);

  const [grid, setGrid] = useState([]);

  const handleMouseDown = (row, col) => {
    setMouseIsPressed(true);
    if (grid[row] && grid[row][col].isStart) {
      setFinishNode(false);
      return setStartNode(true);
    } else if (grid[row][col].isFinish) {
      setStartNode(false);
      return setFinishNode(true);
    }

    const newGrid = getNewGridWithWallToggled(grid, row, col);

    setGrid(newGrid);
    setStartNode(false);
    setFinishNode(false);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;

    if (startNode) {
      const newGrid = moveStart(grid, row, col);
      setInitialPosition({
        ...initPosition,
        startRow: row,
        startCol: col,
      });

      setGrid(newGrid);
    } else if (finishNode) {
      const newGrid = moveFinish(grid, row, col);
      setInitialPosition({
        ...initPosition,
        finishRow: row,
        finishCol: col,
      });

      setGrid(newGrid);
    } else {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid);
    }
  };

  const handleSetArray = (sizeRow, sizeCol) => {
    const matrix = twoDimentionsArray(sizeRow, sizeCol, initPosition);

    matrix.map((vertical) => {
      vertical.map((node) => {

        const htmlNode = document.getElementById(`node-${node.row}-${node.col}`)

        if (!!htmlNode) {
          htmlNode.classList.remove('node-shortest-path', 'node-visited', 'node-wall');
          if (!!node && node.isStart) {
            document.getElementById(`node-${node.row}-${node.col}`).classList.add('node-start')
          } else if (node.isFinish) {
            document.getElementById(`node-${node.row}-${node.col}`).classList.add('node-finish')
          }
        }

      })
    })

    setGrid(matrix);
  };

  const clearPath = () => {
    const newGrid = grid.slice()
    newGrid.map((vertical) => {
      vertical.map((node) => {
        node.distance = Infinity
        if (node.isVisited) {
          node.isVisited = !node.isVisited
        }
        document
          .getElementById(`node-${node.row}-${node.col}`)
          .classList.remove('node-shortest-path', 'node-visited')
        if (node.isStart) {
          document
            .getElementById(`node-${node.row}-${node.col}`)
            .classList.add('node-start')
        } else if (node.isFinish) {
          document
            .getElementById(`node-${node.row}-${node.col}`)
            .classList.add('node-finish')
        }
      })
    })
    setGrid(newGrid)
  }

  useEffect(() => {
    handleSetArray(sizeRow, sizeCol);
  }, []);

  const handleSetSizeRow = (rowSize) => {
    let tempBord = grid.slice();
    const currentRowSize = tempBord.length;
    let newMatrix = [];
    const currentColLength = tempBord[0].length;

    if (rowSize - sizeRow === 1) {
      // added
      const newRow = Array(currentColLength)
        .fill()
        .map((i, rowIdx) => (i = createNode(rowIdx, sizeRow, initPosition)));

      tempBord.push(newRow);
      newMatrix = tempBord;
    }

    if (rowSize - sizeRow === -1) {
      newMatrix = tempBord.filter((row, key) => key + 1 !== currentRowSize);
    }

    setGrid(newMatrix);
    setSizeRow(rowSize);
  };

  const handleSetSizeCol = (colSize) => {
    let newMatrix = [];
    const tempBord = grid.slice();

    if (colSize - sizeCol === 1) {
      const addedColMatrix = tempBord.map((row, rowIdx) => {
        const newNode = createNode(rowIdx, sizeCol, initPosition);
        row.push(newNode);
        return row;
      });
      newMatrix = addedColMatrix;
    }

    if (colSize - sizeCol === -1) {
      const removedColMatrix = tempBord.map((row) => {
        return row.filter((col, idx) => {
          return idx !== sizeCol - 1;
        });
      });
      newMatrix = removedColMatrix;
    }

    setGrid(newMatrix);
    setSizeCol(colSize);
  };

  return (
    <div>
      <div className="flex items-center justify-center py-5 space-x-4">
        <div className="flex space-x-2 max-w-[150px] justify-center">
          <label
            className="w-full max-w-[55px] flex items-center text-gray-700 text-sm font-bold"
            for="input-row"
          >
            Row:
          </label>
          <input
            id="input-row"
            onChange={(e) => handleSetSizeRow(e.target.value)}
            value={sizeRow}
            className="max-w-[100px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            placeholder="Number row"
          />
        </div>

        <div className=" flex space-x-2 max-w-[150px]">
          <label
            className="w-full max-w-[55px] flex items-center text-gray-700 text-sm font-bold"
            for="input-column"
          >
            Column:
          </label>
          <input
            id="input-column"
            value={sizeCol}
            onChange={(e) => handleSetSizeCol(e.target.value)}
            type="number"
            className="max-w-[100px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Number column"
          />
        </div>

        <div className="flex space-x-4">
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => clearPath()}
          >
            Clear path
          </button>
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => handleSetArray(sizeRow, sizeCol)}
          >
            Generate Maze
          </button>

          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => {
              handleSetArray(sizeRow, sizeCol);
              const newGrid = rd(grid, 10);
              setGrid(newGrid);
            }}
          >
            Generate Walls
          </button>

          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => visualizeDfs(grid, initPosition)}
          >
            dfs
          </button>
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => visualizeBfs(grid, initPosition)}
          >
            bfs
          </button>
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => visualizeDijkstra(grid, initPosition)}
          >
            Dijkstra
          </button>
        </div>
      </div>

      <hr />

      <table className="w-full table shadow-sm">
        <tbody className="w-full">
          {grid?.map((row, rowIdx) => {
            return (
              <tr key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall, isMove } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      isMove={isMove}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => handleMouseDown(row, col)}
                      onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                      onMouseUp={() => handleMouseUp()}
                      row={row}
                    ></Node>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Matrix;
