import CellModel from "models/Cell";
import Piece from "components/Piece";
import { useState } from "react";

type CellProps = {
  number: number;
  rowNumber: number;
  cell: CellModel;
};

export default function Cell({ cell }: CellProps) {
  const [draggable, setDraggable] = useState(cell.draggable);
  cell.component.setDraggable = setDraggable;

  return (
    <div className={`row__cell row__cell--${cell.color}`}>
      {cell.piece ? <Piece cell={cell} draggable={draggable} /> : ""}
    </div>
  );
}
