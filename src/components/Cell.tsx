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

  if (cell.promotionPiece) {
    return (
      <div
        onClick={cell.promotionPiece.onSelected.bind(cell.promotionPiece)}
        className={`row__cell row__cell--w row__cell--promotion row__cell--promotion--${
          cell.coordinate[0] < 4 ? "top" : "bottom"
        } row__cell--promotion--${
          cell.coordinate[1] === 0 ? "left" : ""
        } row__cell--promotion--${cell.coordinate[1] === 7 ? "right" : ""}`}
      >
        <div className="piece">
          <img
            src={require(`images/pieces/${cell.promotionPiece.image}`)}
            alt={cell.promotionPiece.name}
            draggable={false}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      id={cell.id}
      onClick={cell.onClick.bind(cell)}
      className={`row__cell row__cell--${cell.color} ${
        cell.isMoveOption
          ? cell.piece
            ? `row__cell--move-beat`
            : `row__cell--move`
          : ""
      }`}
    >
      {cell.piece ? <Piece piece={cell.piece} /> : ""}
    </div>
  );
}
