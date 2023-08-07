import Cell from "models/Cell";
import Draggable from "react-draggable";
import { DraggableEvent } from "react-draggable";

type PieceProps = { cell: Cell; draggable: boolean };
type Node = { node: HTMLElement; x: number; y: number };
export default function Piece({ cell, draggable }: PieceProps) {
  function locatePiece(_: DraggableEvent, data: Node) {
    // console.log(_);
    // console.log(data);
    const { x: xOffset, y: yOffset } = data;
    const parent: HTMLElement = data.node.parentNode as HTMLElement;
    const parentHeight = parent.getBoundingClientRect().height;
    const parentWidth = parent.getBoundingClientRect().width;
    const xOffsetCells = Math.round(xOffset / parentWidth);
    const yOffsetCells = Math.round(yOffset / parentHeight);
    console.log(xOffsetCells, yOffsetCells);
  }

  function onStop(e: DraggableEvent, data: Node) {
    locatePiece(e, data);
    cell.onDragStop();
  }

  const piece = (
    <div className="piece">
      <img
        src={require(`images/pieces/${cell?.piece?.image}`)}
        alt={cell?.piece?.name}
        draggable={false}
      />
    </div>
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
