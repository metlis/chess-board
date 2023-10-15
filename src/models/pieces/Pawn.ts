import Piece from "models/pieces/Piece";
import { Color } from "types";
import Cell from "models/Cell";

class Pawn extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, "p");
  }

  move(): void {
    console.log();
  }

  getMoveOptions(): Cell[] {
    console.log();
    return [];
  }
}

export default Pawn;
