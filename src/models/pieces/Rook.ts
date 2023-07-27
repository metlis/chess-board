import Piece from "models/pieces/Piece";
import { Color } from "types";
import Cell from "models/Cell";

class Rook extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, "r");
  }

  move(): void {
    console.log();
  }
}

export default Rook;