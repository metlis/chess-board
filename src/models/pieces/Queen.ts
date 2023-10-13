import DiagonallyVerticallyHorizontallyMovingPiece from "models/pieces/DiagonallyVerticallyHorizontallyMovingPiece";
import { Color } from "types";
import Cell from "models/Cell";

class Queen extends DiagonallyVerticallyHorizontallyMovingPiece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, "q");
  }

  move(): void {
    console.log();
  }

  getMoveOptions(cell: Cell): Cell[] {
    return [
      ...this.getDiagonalMoveOptions(cell),
      ...this.getVerticalHorizontalMoveOptions(cell),
    ];
  }
}

export default Queen;
