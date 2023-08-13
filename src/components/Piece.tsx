import { useState } from "react";
import Cell from "models/Cell";
import Draggable from "react-draggable";
import { DraggableEvent } from "react-draggable";

type PieceProps = { cell: Cell; draggable: boolean };
type Node = { node: HTMLElement; x: number; y: number };

export default function Piece({ cell, draggable }: PieceProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function locatePiece(_: DraggableEvent, data: Node) {
    const { x: xOffset, y: yOffset } = data;
    const parent: HTMLElement = data.node.parentNode as HTMLElement;
    const parentHeight = parent.getBoundingClientRect().height;
    const parentWidth = parent.getBoundingClientRect().width;
    setOffset({
      x: Math.round(xOffset / parentWidth),
      y: Math.round(yOffset / parentHeight),
    });
  }

  function onStop(e: DraggableEvent, data: Node) {
    locatePiece(e, data);
    cell.onDragStop(offset);
  }

  const piece = cell?.piece?.image ? (
    <div className="piece">
      <img
        src={require(`images/pieces/${cell.piece.image}`)}
        alt={cell.piece.name}
        draggable={false}
      />
    </div>
  ) : (
    <></>
  );

  if (draggable) {
    return (
      <Draggable
        bounds=".board"
        onStart={cell.onDragStart.bind(cell)}
        onStop={onStop.bind(cell)}
        onDrag={locatePiece}
      >
        {piece}
      </Draggable>
    );
  } else {
    return piece;
  }
}
