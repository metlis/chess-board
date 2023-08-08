import CellModel from "models/Cell";
import Piece from "components/Piece";
import useComponentRefresh from "hooks/useComponentRefresh";
import { useState, useEffect } from "react";

type CellProps = {
  number: number;
  rowNumber: number;
  cell: CellModel;
};

export default function Cell({ cell }: CellProps) {
  useComponentRefresh(cell.componentRefresh);

  const [draggable, setDraggable] = useState(cell.draggable);

  useEffect(() => {
    setDraggable(cell.draggable);
  }, [cell.draggable]);

  return (
    <div className={`row__cell row__cell--${cell.color}`}>
      {cell.piece ? <Piece cell={cell} draggable={draggable} /> : ""}
    </div>
  );
}
