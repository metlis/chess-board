import type { Color } from "../../types";
import Cell from "../Cell";

abstract class Piece {
  public readonly color: Color;

  constructor(color: Color, cell: Cell) {
    this.color = color;
    cell.piece = this;
  }

  abstract move(): void;
}

export default Piece;
