import CellModel from "models/Cell";
import Piece from "components/Piece";
import useComponentRefresh from "hooks/useComponentRefresh";

type CellProps = {
  number: number;
  rowNumber: number;
  cell: CellModel;
};

export default function Cell({ cell }: CellProps) {
  useComponentRefresh(cell.componentRefresh);

  return (
    <div id={cell.id} className={`row__cell row__cell--${cell.color}`}>
      {cell.piece ? <Piece piece={cell.piece} /> : ""}
    </div>
  );
}
