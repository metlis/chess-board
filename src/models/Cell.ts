import { Color, Piece } from "types";

class Cell {
  public readonly color: Color;
  public piece: Piece | null;

  constructor(color: Color) {
    this.color = color;
    this.piece = null;
  }
}

export default Cell;
