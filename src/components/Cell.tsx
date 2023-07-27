import CellModel from "models/Cell";
import Piece from "components/Piece";

type CellProps = {
  number: number;
  rowNumber: number;
  cell: CellModel;
};

export default function Cell({ cell }: CellProps) {
  return (
    <div className={`row__cell row__cell--${cell.color}`}>
      {cell.piece ? <Piece cell={cell} /> : ""}
    </div>
  );
}
