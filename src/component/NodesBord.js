import React from 'react'
import Node from './Node';

function NodesBord({ grid, memoizedGrid, handleMouseUp, handleMouseEnter, handleMouseDown }) {
    return grid?.map((row, rowIdx) => {
        return (
            <tr
                key={rowIdx}>
                {row.map(({ ...nodeValues }, nodeIdx) => {
                    const { row, col } = nodeValues;
                    return (
                        <Node
                            key={nodeIdx}
                            {...nodeValues}
                            onMouseDown={(e, row, col) => handleMouseDown(e, row, col)}
                            onMouseEnter={(e, row, col) => handleMouseEnter(e, row, col)}
                            onMouseUp={(e) => handleMouseUp(e)}
                            row={row}
                        ></Node>
                    )

                })}
            </tr>
        );
    })
}

export default NodesBord