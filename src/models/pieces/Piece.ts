import type { Color, PieceImage, PieceName } from "types";
import Cell from "models/Cell";
import BoardController from "controllers/BoardController";
import Board from "models/Board";

abstract class Piece {
  public readonly color: Color;
  public readonly name: PieceName;
  public readonly image: PieceImage;
  public cell: Cell;
  public moved = false;
  private board: Board;
  public controller: BoardController;

  protected constructor(color: Color, cell: Cell, name: PieceName) {
    this.color = color;
    this.name = name;
    this.image = `${name}_${color}.svg`;
    cell.piece = this;
    this.cell = cell;
    this.controller = this.cell.controller;
    this.board = this.cell.controller.board;
  }

  abstract getMoveOptions(): Cell[];

  public move() {
    this.moved = true;
  }

  public get canMove(): boolean {
    return this.color === this.board.game.controller.colorMoveTurn;
  }
}

export default Piece;
