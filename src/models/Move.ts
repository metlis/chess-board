import Cell from "models/Cell";
import Piece from "models/pieces/Piece";

class Move {
  public piece: Piece;
  public from: Cell;
  public to: Cell;

  public constructor(piece: Piece, to: Cell) {
    this.checkPawnSpecialMove(piece, to);
    this.piece = piece;
    this.from = piece.cell;
    this.to = to;
    this.to.piece = this.piece;
    this.piece.cell = to;
    this.from.piece = null;
    this.piece.moved = true;
    this.to.refreshComponent();
    this.from.refreshComponent();
  }

  private checkPawnSpecialMove(piece: Piece, to: Cell) {
    if (
      piece.name === "p" &&
      to.coordinate[1] !== piece.cell.coordinate[1] &&
      !to.piece
    ) {
      const cell = piece.board.getCell([
        piece.cell.coordinate[0],
        to.coordinate[1],
      ]);
      if (cell) {
        cell.piece = null;
        cell.refreshComponent();
      }
    }
  }
}

export default Move;
