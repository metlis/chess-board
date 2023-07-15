import Pawn from "classes/pieces/Pawn";
import Bishop from "classes/pieces/Bishop";
import Knight from "classes/pieces/Knight";
import Rook from "classes/pieces/Rook";
import Queen from "classes/pieces/Queen";
import King from "classes/pieces/King";
import Cell from "classes/Cell";
import type { PieceName, Piece, Color } from "types";

class PieceFactory {
  create(name: PieceName, color: Color, cell: Cell): Piece {
    let instance: Piece;
    switch (name) {
      case "b":
        instance = new Bishop(color, cell);
        break;
      case "k":
        instance = new King(color, cell);
        break;
      case "kn":
        instance = new Knight(color, cell);
        break;
      case "p":
        instance = new Pawn(color, cell);
        break;
      case "r":
        instance = new Rook(color, cell);
        break;
      case "q":
        instance = new Queen(color, cell);
        break;
      default:
        throw new Error("Invalid parameter");
    }
    return instance;
  }
}

export default PieceFactory;
