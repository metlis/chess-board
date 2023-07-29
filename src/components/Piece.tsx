import Cell from "models/Cell";
import Draggable from "react-draggable";
import { DraggableEvent } from "react-draggable";

type PieceProps = { cell: Cell };
export default function Piece({ cell }: PieceProps) {
  function handleStop(e: DraggableEvent, data: Object) {
    console.log(e);
    console.log(data);
  }
  return (
    <Draggable bounds=".board" onStop={handleStop}>
      <div className="piece">
        <img
          src={require(`images/pieces/${cell?.piece?.image}`)}
          alt={cell?.piece?.name}
          draggable={false}
        />
      </div>
    </Draggable>
  );
}
