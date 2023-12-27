import Base from "models/Base";
import Piece from "models/pieces/Piece";
import Cell from "models/Cell";
import PieceFactory from "models/PieceFactory";
import Refreshable from "mixins/Refreshable";
import Move from "models/Move";
import { GameEventPayload, Row } from "types";

class PendingPromotion extends Refreshable(Base) {
  private readonly piece: Piece;
  private readonly from: Cell;
  private readonly to: Cell;
  private readonly promotionCells: Cell[];

  constructor(piece: Piece, to: Cell) {
    super(to.board);
    this.piece = piece;
    this.to = to;
    this.from = piece.cell;
    const promotionCells: Cell[] = [];
    let rows: Row[] = to.coordinate[0] === 0 ? [0, 1, 2, 3] : [4, 5, 6, 7];
    rows.forEach((i) => {
      const cell = piece.board.getCell([i, to.coordinate[1]]);
      if (cell) {
        promotionCells.push(cell);
      }
    });
    this.promotionCells = promotionCells;
    this.from.piece = null;
    this.from.refreshComponent();
    this.showOptions();
  }

  private showOptions() {
    this.eventBridge.addEvent("game:changeActivePlayerPiecesDraggability");
    this.eventBridge.addEvent("cell:switchState", {
      include: this.promotionCells,
      cellState: "promotionOption",
    });
  }

  public optionSelected(payload: GameEventPayload) {
    this.eventBridge.addEvent("cell:switchState", {
      include: this.promotionCells,
      cellState: "default",
    });
    if (payload.promotion) {
      const piece: Piece = new PieceFactory().create(
        payload.promotion.name,
        payload.promotion.color,
        this.to
      );
      const move: Move = new Move(piece, this.to, {
        from: this.from,
        piece: this.piece,
      });
      this.eventBridge.addEvent("game:addMove", { move });
      this.eventBridge.addEvent("game:switchActivePlayer");
    }
  }
}

export default PendingPromotion;
