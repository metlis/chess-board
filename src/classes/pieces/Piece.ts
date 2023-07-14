import type { Color, PieceImage, PieceName } from "../../types";
import Cell from "../Cell";

abstract class Piece {
  public readonly color: Color;
  public readonly name: PieceName;
  public readonly image: PieceImage;

  protected constructor(color: Color, cell: Cell, name: PieceName) {
    this.color = color;
    this.name = name;
    this.image = `${name}_${color}.svg`;
    cell.piece = this;
  }

  abstract move(): void;
}

export default Piece;
