import Piece from "classes/pieces/Piece";
import { Color } from "types";
import Cell from "classes/Cell";

class King extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, "k");
  }

  move(): void {
    console.log();
  }
}

export default King;
