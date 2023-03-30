import React from "react";


function Node({ className, row, col, value, key, isFinish,
    isStart,
    isWall,
    isMove, onMouseDown, onMouseUp }) {


    const extraClassName = isFinish
        ? 'node-finish node-move'
        : isStart
            ? 'node-start node-move'
            : isWall
                ? 'node-wall'
                : isMove
                    ? 'node-move'
                    : ''

    return (
        <td
            onMouseDown={(e) => onMouseDown(e, row, col)}
            onMouseUp={(e) => onMouseUp(e, row, col)}
            key={key}
            id={`node-${row}-${col}`}
            className={`node ${extraClassName} ${className}`}>
        </td>
    );
}

export default Node;
