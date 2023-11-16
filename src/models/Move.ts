import Cell from "models/Cell";
import Piece from "models/pieces/Piece";

type Promotion = {
  from: Cell;
  piece: Piece;
};

class Move {
  public piece: Piece;
  public from: Cell;
  public to: Cell;
  public promotion: Promotion | null = null;
  public prevToPiece: Piece | null;
  public prevMoved: boolean = false;
  private enPassantCell: Cell | null = null;
  private enPassantPiece: Piece | null = null;

  public constructor(piece: Piece, to: Cell, promotion?: Promotion) {
    this.checkEnPassant(piece, to);
    this.piece = piece;
    this.from = promotion ? promotion.from : piece.cell;
    this.to = to;
    this.prevToPiece = to.piece;
    this.to.piece = this.piece;
    this.piece.cell = to;
    this.from.piece = null;
    this.prevMoved = this.piece.moved;
    this.piece.moved = true;
    this.promotion = promotion || null;
    this.to.refreshComponent();
    this.from.refreshComponent();
  }

  private checkEnPassant(piece: Piece, to: Cell) {
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
        this.enPassantPiece = cell.piece;
        this.enPassantCell = cell;
        cell.piece = null;
        cell.refreshComponent();
      }
    }
  }

  public undoMove() {
    if (this.promotion) {
      this.piece.cell = this.promotion.from;
      this.promotion.from.piece = this.piece;
    } else {
      this.piece.cell = this.from;
      this.from.piece = this.piece;
    }
    this.to.piece = this.prevToPiece;
    this.piece.moved = this.prevMoved;
    if (this.enPassantCell && this.enPassantPiece) {
      this.enPassantCell.piece = this.enPassantPiece;
    }
  }
}

export default Move;
