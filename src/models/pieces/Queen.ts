import Piece from "models/pieces/Piece";
import { Color } from "types";
import Cell from "models/Cell";

class Queen extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, "q");
  }

  move(): void {
    console.log();
  }
}

export default Queen;
