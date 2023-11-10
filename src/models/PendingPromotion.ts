import Piece from "models/pieces/Piece";
import Cell from "models/Cell";
import PieceFactory from "models/PieceFactory";
import Move from "models/Move";
import GameController from "controllers/GameController";
import BoardController from "controllers/BoardController";
import { GameEventPayload, Row } from "types";

class PendingPromotion {
  private boardController: BoardController;
  private gameController: GameController;
  private readonly piece: Piece;
  private readonly from: Cell;
  private readonly to: Cell;
  private readonly promotionCells: Cell[];

  constructor(
    piece: Piece,
    to: Cell,
    gameController: GameController,
    boardController: BoardController
  ) {
    this.gameController = gameController;
    this.boardController = boardController;
    this.piece = piece;
    this.to = to;
    this.from = piece.cell;
    const promotionCells: Cell[] = [];
    let rows: Row[] = to.coordinate[0] === 0 ? [0, 1, 2, 3] : [4, 5, 6, 7];
    rows.forEach((i) => {
      const cell = this.boardController.board.getCell([i, to.coordinate[1]]);
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
    this.gameController.addEvent("changePiecesDraggability");
    this.boardController.addEvent("showPromotionOptions", {
      include: this.promotionCells,
    });
  }

  public optionSelected(payload: GameEventPayload) {
    this.boardController.addEvent("hidePromotionOptions", {
      include: this.promotionCells,
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
      this.gameController.addEvent("pushMove", { move });
      this.gameController.addEvent("switchActivePlayer");
    }
  }
}

export default PendingPromotion;
