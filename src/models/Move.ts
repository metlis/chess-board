import Cell from "models/Cell";
import Piece from "models/pieces/Piece";

class Move {
  private piece: Piece;
  private from: Cell;
  private to: Cell;

  public constructor(piece: Piece, to: Cell) {
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
}

export default Move;
