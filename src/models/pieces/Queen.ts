import DiagonallyVerticallyHorizontallyMovingPiece from "models/pieces/DiagonallyVerticallyHorizontallyMovingPiece";
import { Color } from "types";
import Cell from "models/Cell";

class Queen extends DiagonallyVerticallyHorizontallyMovingPiece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, "q");
  }

  getMoveOptions(): Cell[] {
    return [
      ...this.getDiagonalMoveOptions(),
      ...this.getVerticalHorizontalMoveOptions(),
    ];
  }
}

export default Queen;
