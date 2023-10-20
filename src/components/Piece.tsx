import { useEffect, useState } from "react";
import PieceModel from "models/pieces/Piece";
import Draggable from "react-draggable";
import { DraggableEvent } from "react-draggable";
import useComponentRefresh from "hooks/useComponentRefresh";

type PieceProps = { piece: PieceModel };
type Node = { node: HTMLElement; x: number; y: number };

export default function Piece({ piece }: PieceProps) {
  useComponentRefresh(piece!.componentRefresh);

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [draggable, setDraggable] = useState(piece.draggable);

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

  const pieceElement = piece?.image ? (
    <div className="piece">
      <img
        src={require(`images/pieces/${piece.image}`)}
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
