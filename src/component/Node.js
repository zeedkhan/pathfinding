import React from "react";

function Node({
  className,
  row,
  col,
  value,
  key,
  isFinish,
  isStart,
  isWall,
  isMove,
  onMouseDown,
  onMouseUp,
  onMouseEnter,
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

  return (
    <td
      onMouseDown={() => onMouseDown(row, col)}
      onMouseUp={() => onMouseUp(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      key={key}
      id={`node-${row}-${col}`}
      className={`node ${extraClassName} ${className}`}
    ></td>
  );
}

export default Node;
