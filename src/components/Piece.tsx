import { useEffect, useState, useRef } from "react";
import PieceModel from "chess_controller/src/models/pieces/Piece";
import Draggable from "react-draggable";
import { DraggableEvent } from "react-draggable";
import useComponentRefresh from "hooks/useComponentRefresh";

type PieceProps = { piece: PieceModel };
type Node = { node: HTMLElement; x: number; y: number };

export default function Piece({ piece }: PieceProps) {
  useComponentRefresh(piece);

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [draggable, setDraggable] = useState(piece.draggable);

  const nodeRef = useRef(null);

  useEffect(() => {
    setDraggable(piece.draggable);
  }, [piece.draggable]);

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
    piece.onDragStop(offset);
  }

  const pieceElement = piece?.code ? (
    <div className="piece" ref={nodeRef}>
      <img
        src={require(`images/pieces/${piece.code}.svg`)}
        alt={piece.name}
        draggable={false}
      />
    </div>
  ) : (
    <></>
  );

  if (draggable) {
    return (
      <Draggable
        nodeRef={nodeRef}
        bounds=".board"
        onStart={piece.onDragStart.bind(piece)}
        onStop={onStop.bind(piece)}
        onDrag={locatePiece}
      >
        {pieceElement}
      </Draggable>
    );
  } else {
    return pieceElement;
  }
}
