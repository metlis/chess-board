import Piece from "classes/pieces/Piece";
import { Color } from "types";
import Cell from "classes/Cell";

class Pawn extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, "p");
  }

  move(): void {
    console.log();
  }
}

export default Pawn;
