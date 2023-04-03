import React from "react";

function Node({
  row,
  col,
  isFinish,
  isStart,
  isWall,
  isMove,
  onMouseDown,
  onMouseUp,
  onMouseEnter,
  ...res
}) {

  const extraClassName = isFinish
    ? "node-finish node-move"
    : isStart
      ? "node-start node-move"
      : isWall
        ? "node-wall"
        : isMove
          ? "node-move"
          : "";

  const terrainTypeClass = "";

  return (
    <td
      key={`node-${row}-${col}`}
      onMouseDown={(e) => onMouseDown ? onMouseDown(e, row, col) : false}
      onMouseUp={(e) => onMouseUp ? onMouseUp(e, row, col) : false}
      onMouseEnter={(e) => onMouseEnter ? onMouseEnter(e, row, col) : false}
      id={`node-${row}-${col}`}
      className={`node ${extraClassName} ${terrainTypeClass}`}
    ></td>
  );
}

export default Node;