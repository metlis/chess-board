import Piece from "models/pieces/Piece";
import { Color } from "types";
import Cell from "models/Cell";

class King extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, "k");
  }

  move(): void {
    console.log();
  }

  getMoveOptions(cell: Cell): Cell[] {
    console.log();
    return [];
  }
}

export default King;
