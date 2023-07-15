import Piece from "classes/pieces/Piece";
import { Color } from "types";
import Cell from "classes/Cell";

class Bishop extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, "b");
  }

  move(): void {
    console.log();
  }
}

export default Bishop;
