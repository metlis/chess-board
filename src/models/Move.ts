import Cell from "models/Cell";
import Piece from "models/pieces/Piece";
import Base from "models/Base";
import King from "./pieces/King";

type Promotion = {
  from: Cell;
  piece: Piece;
};

class Move extends Base {
  public piece: Piece;
  public from: Cell;
  public to: Cell;
  public promotion: Promotion | null = null;
  public prevToPiece: Piece | null;
  public prevMoved: boolean = false;
  public enPassantCell: Cell | null = null;
  private enPassantPiece: Piece | null = null;
  private castledRook: Piece | null = null;
  private prevCastlingRookCell: Cell | null = null;
  public castling: 1 | 2 | null = null;
  public capture: boolean = false;
  public checking: boolean = false;
  public longNotation: boolean = false;

  public constructor(piece: Piece, to: Cell, promotion?: Promotion) {
    super(piece.cell.board);
    this.checkEnPassant(piece, to);
    this.checkCastling(piece, to);
    this.checkLongNotationRequired(piece, to);
    this.checkCapture(to, promotion);
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

  private checkCastling(piece: Piece, to: Cell) {
    if (!(piece instanceof King)) return;
    const _ = (oldCellOffset: number, newCellOffset: number) => {
      this.prevCastlingRookCell = this.board.getCell([
        piece.cell.coordinate[0],
        piece.cell.coordinate[1] + oldCellOffset,
      ]);
      const rook = this.prevCastlingRookCell?.piece;
      if (rook) {
        const newRookCell = this.board.getCell([
          rook.cell.coordinate[0],
          rook.cell.coordinate[1] + newCellOffset,
        ]);
        if (newRookCell && this.prevCastlingRookCell) {
          this.castledRook = rook;
          rook.cell = newRookCell;
          newRookCell.piece = rook;
          this.prevCastlingRookCell.piece = null;
          rook.cell.refreshComponent();
          this.prevCastlingRookCell.refreshComponent();
        }
      }
    };

    if (to.coordinate[1] - piece.cell.coordinate[1] === 2) {
      _(3, -2);
      this.castling = 1;
    } else if (to.coordinate[1] - piece.cell.coordinate[1] === -2) {
      _(-4, 3);
      this.castling = 2;
    }
  }

  public checkChecking() {
    if (this.piece.moveOptions.some((op: Cell) => op.piece?.name === "k")) {
      this.checking = true;
    }
  }

  private checkLongNotationRequired(piece: Piece, to: Cell) {
    this.longNotation = this.board.pieces.some(
      (p) =>
        p !== piece &&
        p.color === piece.color &&
        p.checkedMoveOptions.some((op) => op === to && p.name === piece.name)
    );
  }

  private checkCapture(to: Cell, promotion?: Promotion) {
    if (promotion) {
      this.capture = promotion.from.coordinate[1] !== to.coordinate[1];
    } else if (to.piece) {
      this.capture = true;
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
    if (this.castledRook && this.prevCastlingRookCell) {
      this.castledRook.cell.piece = null;
      this.castledRook.cell = this.prevCastlingRookCell;
      this.castledRook.cell.piece = this.castledRook;
    }
  }
}

export default Move;
