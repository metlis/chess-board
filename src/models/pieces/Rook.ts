import DiagonallyVerticallyHorizontallyMovingPiece from "models/pieces/DiagonallyVerticallyHorizontallyMovingPiece";
import { Color } from "types";
import Cell from "models/Cell";

class Rook extends DiagonallyVerticallyHorizontallyMovingPiece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, "r");
  }

  move(): void {
    console.log();
  }

  getMoveOptions(cell: Cell): Cell[] {
    return this.getVerticalHorizontalMoveOptions(cell);
  }
}

export default Rook;
