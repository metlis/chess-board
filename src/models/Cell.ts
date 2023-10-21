import type {
  Color,
  Piece,
  Coordinate,
  ComponentRefresh,
  EventType,
  EventPayload,
} from "types";
import Board from "models/Board";
import BoardController from "controllers/BoardController";

class Cell {
  public board: Board;
  public controller: BoardController;
  public readonly color: Color;
  public coordinate: Coordinate;
  public piece: Piece | null;
  public componentRefresh: ComponentRefresh = {};

  constructor(color: Color, coordinate: Coordinate, board: Board) {
    this.color = color;
    this.coordinate = coordinate;
    this.piece = null;
    this.board = board;
    this.controller = board.controller;
  }

  public on(event: EventType, payload: EventPayload<Cell> = {}): void {}

  public refreshComponent(): void {
    if (this.componentRefresh.setVal) {
      this.componentRefresh.setVal(!this.componentRefresh.val);
    }
  }
}

export default Cell;
