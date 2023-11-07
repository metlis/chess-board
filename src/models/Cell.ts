import type {
  Color,
  Piece,
  CellID,
  Coordinate,
  ComponentRefresh,
  EventType,
  EventPayload,
} from "types";
import Board from "models/Board";
import BoardController from "controllers/BoardController";
import { COLUMN_LETTERS, ROW_NUMBERS } from "../constants";

class Cell {
  public id: CellID;
  public board: Board;
  public controller: BoardController;
  public readonly color: Color;
  public coordinate: Coordinate;
  public piece: Piece | null;
  public componentRefresh: ComponentRefresh = {};

  constructor(color: Color, coordinate: Coordinate, board: Board) {
    this.id = `${COLUMN_LETTERS[coordinate[1]]}${ROW_NUMBERS[coordinate[0]]}`;
    this.color = color;
    this.coordinate = coordinate;
    this.piece = null;
    this.board = board;
    this.controller = board.controller;
  }

  public on(event: EventType, payload: EventPayload<Cell> = {}): void {
    switch (event) {
      case "showPromotionOptions":
        console.log(this);
        break;
      default:
        throw new Error("Invalid event name");
    }
  }

  public refreshComponent(): void {
    if (this.componentRefresh.setVal) {
      this.componentRefresh.setVal(!this.componentRefresh.val);
    }
  }
}

export default Cell;
