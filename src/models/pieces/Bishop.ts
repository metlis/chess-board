import DiagonallyVerticallyHorizontallyMovingPiece from "models/pieces/DiagonallyVerticallyHorizontallyMovingPiece";
import Cell from "models/Cell";
import { Color } from "types";

class Bishop extends DiagonallyVerticallyHorizontallyMovingPiece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, "b");
  }

  move(): void {
    console.log();
  }

  getMoveOptions(cell: Cell): Cell[] {
    return this.getDiagonalMoveOptions(cell);
  }
}

export default Bishop;
