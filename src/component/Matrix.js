

import React, { useEffect, useState } from 'react'
import visualizeDfs from '../functional/dfs';
import { twoDimentionsArray } from '../utils/helper';
import Node from './Node';
import visualizeBfs from '../functional/bfs';

/* INIT WHEN ANOMYNOUS */
const START_NODE_ROW = 10
const START_NODE_COL = 10
const FINISH_NODE_ROW = 10
const FINISH_NODE_COL = 14

function Matrix() {

	const [initPosition, setInitialPosition] = useState({
		startRow: START_NODE_ROW,
		startCol: START_NODE_COL,
		finishRow: FINISH_NODE_ROW,
		finishCol: FINISH_NODE_COL
	})

	const [sizeRow, setSizeRow] = useState(25);
	const [sizeCol, setSizeCol] = useState(25);

	const [grid, setGrid] = useState([]);

	// mouse
	const [mousePosition, setMousePosition] = useState(null);
	const [lastClickedPosition, setLastClickedPosition] = useState(null);

	const handleMouseDown = (position, row, col) => {
		setMousePosition(position);
	};


	const handleMouseUp = (position, row, col) => {
		setMousePosition(null);

		setLastClickedPosition(position);
	};


	const handleSetArray = (sizeRow, sizeCol) => {
		const matrix = twoDimentionsArray(sizeRow, sizeCol, initPosition);
		setGrid(matrix);
	};

	useEffect(() => {
		handleSetArray(sizeRow, sizeCol)
	}, [])


	return (
		<div>
			<div className="flex flex-col items-center py-5">
				<div className="mb-4 flex space-x-2 max-w-[150px]">
					<label className="w-full max-w-[55px] flex items-center text-gray-700 text-sm font-bold" for="input-row">
						Row:
					</label>
					<input
						id="input-row"
						onChange={(e) => setSizeRow(e.target.value)}
						value={sizeRow}
						className="max-w-[100px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Number row" />
				</div>

				<div className="mb-4 flex space-x-2 max-w-[150px]">
					<label className="w-full max-w-[55px] flex items-center text-gray-700 text-sm font-bold" for="input-column">
						Column:
					</label>
					<input
						id="input-column"
						value={sizeCol}
						onChange={(e) => setSizeCol(e.target.value)}
						type="number"
						className="max-w-[100px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Number column" />
				</div>

				<div className='flex space-x-4'>
					<button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' onClick={() => handleSetArray(sizeRow, sizeCol)}>Generate Maze</button>

					<button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' onClick={() => visualizeDfs(grid, initPosition)}>dfs</button>
					<button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' onClick={() => visualizeBfs(grid, initPosition)}>bfs</button>
				</div>

			</div>

			<hr />

			<table className="w-full table">
				<tbody className="w-full">
					{grid?.map((row, rowIdx) => {
						return (
							<tr key={rowIdx}>
								{row.map((node, nodeIdx) => {
									const {
										row,
										col,
										isFinish,
										isStart,
										isWall,
										isMove,
									} = node
									return (
										<Node
											key={nodeIdx}
											col={col}
											isFinish={isFinish}
											isStart={isStart}
											isWall={isWall}
											isMove={isMove}
											// mouseIsPressed={mouseIsPressed}
											onMouseDown={(row, col) =>
												handleMouseDown(row, col)
											}
											// onMouseEnter={(row, col) =>
											// 	handleMouseEnter(row, col)
											// }
											onMouseUp={() =>
												handleMouseUp()
											}
											row={row}></Node>
									)
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default Matrix;