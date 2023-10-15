import type { Color, PieceImage, PieceName } from "types";
import Cell from "models/Cell";
import BoardController from "../../controllers/BoardController";

abstract class Piece {
  public readonly color: Color;
  public readonly name: PieceName;
  public readonly image: PieceImage;
  public cell: Cell;
  public controller: BoardController;
  public moved = false;

  protected constructor(color: Color, cell: Cell, name: PieceName) {
    this.color = color;
    this.name = name;
    this.image = `${name}_${color}.svg`;
    cell.piece = this;
    this.cell = cell;
    this.controller = this.cell.controller;
  }

  abstract getMoveOptions(): Cell[];

  public move() {
    this.moved = true;
  }

  public get canMove(): boolean {
    return this.color === this.controller.board.colorMoveTurn;
  }
}

export default Piece;
