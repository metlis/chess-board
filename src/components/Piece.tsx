import Cell from "models/Cell";
import { useMemo } from "react";
import Draggable from "react-draggable";
import { DraggableEvent } from "react-draggable";

type PieceProps = { cell: Cell };
export default function Piece({ cell }: PieceProps) {
  function handleStop(e: DraggableEvent, data: Object) {
    console.log(e);
    console.log(data);
  }

  const draggable: boolean = useMemo(() => {
    return cell.draggable;
  }, [cell.draggable]);

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
        onStop={cell.onDragStop.bind(cell)}
      >
        {piece}
      </Draggable>
    );
  } else {
    return piece;
  }
}
