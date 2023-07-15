import Piece from "classes/pieces/Piece";
import { Color } from "types";
import Cell from "classes/Cell";

class Queen extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, "q");
  }

  move(): void {
    console.log();
  }
}

export default Queen;
