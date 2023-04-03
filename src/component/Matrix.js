import React, { useEffect, useRef, useState, createRef, useMemo } from "react";
import visualizeDfs from "../algorithms/dfs";
import { twoDimentionsArray } from "../utils/helper";
import Node from "./Node";
import { createNode } from "../utils/node";
import {
  getNewGridWithWallToggled,
  moveStart,
  moveFinish,
  rd
} from "../utils/grid";

import { SelectableGroup, createSelectable } from 'react-selectable';

import visualizeDijkstra from "../algorithms/dijkstra";
import visualizeAstar from "../algorithms/astrar";
import visualizeBfs from "../algorithms/bfs";

import generateTerrain from "../utils/terrain";
import Navbar from "./nav/Navbar";
import visualizeBFS from "../algorithms/bsf";
import Sidebar from "./Sidebar";
import SplitButton from "./ui/SplitButton";
import { TextField, Switch, FormControlLabel } from "@mui/material";
import visualizeExploreMap from "../algorithms/countmap";
import visualizeCountIsland from "../algorithms/countIsland";
import NodesBord from "./NodesBord";
import NodeBordEdit from "./NodeBordEdit";
import visualizeBidirectional from "../algorithms/bidirection";


/* INIT WHEN ANOMYNOUS */
const START_NODE_ROW = 0;
const START_NODE_COL = 60;
const FINISH_NODE_ROW = 20;
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

  const [sizeRow, setSizeRow] = useState(35);
  const [sizeCol, setSizeCol] = useState(80);

  const [grid, setGrid] = useState([]);

  const [showSidebar, setShowSidebar] = useState(false);

  const [selectEditNodes, setSelectEditNodes] = useState([]);

  const [editMode, setEditMode] = useState(false);

  const handleShowSideBar = () => {
    setShowSidebar(!showSidebar);
  }

  const handleMouseDown = (e, row, col) => {
    setMouseIsPressed(true);

    // if (e.detail === 2) {
    //   // sidebar state
    //   setShowSidebar(!showSidebar)
    // }


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

  const handleEditMode = () => {
    setEditMode(!editMode);
  }

  const handleMouseUp = (e) => {
    setMouseIsPressed(false);
  };

  const handleMouseEnter = (e, row, col) => {
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
            htmlNode.classList.add('node-start')
          } else if (node.isFinish) {
            htmlNode.classList.add('node-finish')
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

        const htmlNode = document.getElementById(`node-${node.row}-${node.col}`);

        htmlNode.classList.remove('node-shortest-path', 'node-visited');

        if (node.isStart) {
          htmlNode.classList.add('node-start')
        } else if (node.isFinish) {
          htmlNode.classList.add('node-finish')
        }

        const terrainTypeClass = node.terrainType === 1 ? "node-water" : node.terrainType === 2 ? "node-moutain" : "";

        if (node.terrainType === 1) {
          htmlNode.classList.add(terrainTypeClass)
        } else if (node.terrainType === 2) {
          htmlNode.classList.add(terrainTypeClass)
        }


      })
    })
    setGrid(newGrid)
  }

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

  const handleChangeTerrainType = (newTerrain, node) => {

    const htmlNode = document.getElementById(`node-${node.row}-${node.col}`);

    if (!!htmlNode) {
      htmlNode.classList.remove("node-water", "node-mountain", "node-wall");
    }

    const tempNode = {
      ...node,
      isWall: newTerrain.terrainType === 3,
      terrainType: newTerrain.terrainType
    };

    const newGrid = grid.slice();

    newGrid[node.row][node.col] = tempNode;

    if (!!htmlNode) {
      const newType = newTerrain.terrainType;

      switch (newType) {
        case 1:
          htmlNode.classList.add("node-water")
          break;
        case 2:
          htmlNode.classList.add("node-mountain")
          break;
        case 3:
          htmlNode.classList.add("node-wall")
          break;
      }

    }


    setGrid(newGrid);
  }

  const buttonsAlgorithmItems = [
    { key: "Depth First Search" },
    { key: "Breadth First Search" },
    { key: "A*" },
    { key: "Best First Search" },
    { key: "Dijkstra's" },
    { key: "Bidirectional" }
  ];

  const handleOnEndSelection = (e) => {

    setShowSidebar(true);


    // merge 2ds array

    const nodes = e.map((rowNodes, key) => {
      const [_, row, col] = rowNodes.split("-");
      const node = grid[row][col];

      node.isEditing = true;

      const htmlNode = document.getElementById(`node-${row}-${col}`);

      if (!!htmlNode) {
        htmlNode.style.background = "red";
      }

      return node;
    })

    setSelectEditNodes(nodes);
  }

  const buttonsGridItems = [
    { key: "Clear path" },
    { key: "Generate Maze" },
    { key: "Generate Walls" },
    { key: "Generate Terrain" },
    { key: "Explore Map" },
    { key: "Count Island" }
  ];

  const handleClickAlgo = (algo) => {
    switch (algo) {
      case "Depth First Search":
        return visualizeDfs(grid, initPosition);
      case "Breadth First Search":
        return visualizeBfs(grid, initPosition);
      case "A*":
        return visualizeAstar(grid, initPosition);
      case "Best First Search":
        return visualizeBFS(grid, initPosition);
      case "Dijkstra's":
        return visualizeDijkstra(grid, initPosition);
      case "Bidirectional":
        // visualizeBidirectional(grid, initPosition);
        return
    }
  }

  const [report, setReport] = useState({
    countConntedIsland: 0,
    IslandCount: 0,
    waterCount: 0,
    pathCount: 0,
    wallCount: 0,
  })

  const handleClickGridItems = (fn) => {
    let report = {};
    switch (fn) {
      case "Clear path":
        return clearPath();
      case "Generate Maze":
        return handleSetArray(sizeRow, sizeCol);
      case "Generate Walls":
        handleSetArray(sizeRow, sizeCol);
        const newGrid = rd(grid, 10);
        setGrid(newGrid);
        return;
      case "Generate Terrain":
        const test = generateTerrain(grid)
        setGrid(test);
        return;
      case "Explore Map":
        report = visualizeExploreMap(grid, initPosition).report;
        setReport(report);
        return;
      case "Count Island":
        report = visualizeCountIsland(grid, initPosition).report;
        setReport(report)
        return;
    }
  }

  useEffect(() => {
    handleSetArray(sizeRow, sizeCol);
  }, []);

  const memoizedGrid = useMemo(() => grid, [grid]);


  return (
    <div className="">
      <div className="flex">


        {showSidebar && <Sidebar grid={grid} handleChangeTerrainType={handleChangeTerrainType} />}

        <div className="flex-1">
          <div className="flex items-center justify-center py-5 space-x-4">
            <div className="flex space-x-2 max-w-[150px] justify-center">
              <TextField
                label="Row"
                type="number"
                defaultValue={sizeRow}
                onChange={(e) => {
                  handleSetSizeRow(e.target.value)
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className=" flex space-x-2 max-w-[150px]">
              <TextField
                label="Col"
                type="number"
                defaultValue={sizeCol}
                onChange={(e) => {
                  handleSetSizeCol(e.target.value)
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="flex space-x-4">
              <FormControlLabel
                control={
                  <Switch checked={editMode} onChange={handleEditMode} name="edit-mode" />
                }
                labelPlacement="start"
                label="Edit Mode"
              />
            </div>

            <div className="flex space-x-4">
              <FormControlLabel
                disabled={editMode}
                control={
                  <Switch checked={showSidebar} onChange={handleShowSideBar} name="side-bar" />
                }
                labelPlacement="start"
                label="Side Bar"
              />
            </div>

            <div className="flex space-x-4">

              <SplitButton options={buttonsGridItems} handleClickAlgo={handleClickGridItems} />
              <SplitButton options={buttonsAlgorithmItems} handleClickAlgo={handleClickAlgo} />

            </div>
          </div>

          <hr />

          <table className="w-full table shadow-sm">
            <tbody className="w-full">
              {!editMode ? (
                <NodesBord
                  memoizedGrid={memoizedGrid}
                  grid={grid}
                  handleMouseDown={handleMouseDown}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseUp={handleMouseUp}
                />
              ) : (
                <NodeBordEdit
                  memoizedGrid={memoizedGrid}
                  grid={grid}
                  handleOnEndSelection={handleOnEndSelection}
                  selectedKeys={selectEditNodes}
                />
              )}

            </tbody>
          </table>
        </div>


      </div>


    </div>
  );
}

export default Matrix;
