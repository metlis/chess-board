import CellModel from "chess_controller/src/models/Cell";
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
            src={require(`images/pieces/${cell.promotionPiece.code}.svg`)}
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
        cell.state === "moveOption"
          ? cell.piece
            ? `row__cell--move--beat ${
                cell.color === "b" ? "row__cell--move--beat--dark" : ""
              }`
            : `row__cell--move`
          : ""
      } ${
        cell.state === "checked"
          ? `row__cell--checked ${
              cell.color === "b" ? "row__cell--checked--dark" : ""
            }`
          : ""
      } ${
        cell.state === "lastMove"
          ? `row__cell--last-move ${
              cell.color === "b" ? "row__cell--last-move--dark" : ""
            }`
          : ""
      }`}
    >
      {cell.piece ? <Piece piece={cell.piece} /> : ""}
    </div>
  );
}
