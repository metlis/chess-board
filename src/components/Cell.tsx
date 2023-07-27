import CellModel from "models/Cell";

type CellProps = {
  number: number;
  rowNumber: number;
  cell: CellModel;
};

export default function Cell({ cell, number, rowNumber }: CellProps) {
  return (
    <div className={`row__cell row__cell--${cell.color}`}>
      {cell.piece ? (
        <div className="piece">
          <img
            src={require(`images/pieces/${cell.piece.image}`)}
            alt={cell.piece.name}
            draggable={false}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
