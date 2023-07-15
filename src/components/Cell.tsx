import CellClass from "classes/Cell";

type CellProps = {
  number: number;
  rowNumber: number;
  cell: CellClass;
};

export default function Cell({ cell, number, rowNumber }: CellProps) {
  return (
    <div className="row__cell">
      {`${cell.color}-${rowNumber}-${number} ${cell.piece?.name || ""}`}
    </div>
  );
}
