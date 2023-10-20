import type {
  Color,
  Piece,
  Coordinate,
  CellEventPayload,
  CellEventType,
  ComponentRefresh,
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

  public dispatch(event: CellEventType, payload: CellEventPayload = {}): void {
    this.controller.on(event, payload);
  }

  public on(event: CellEventType, payload: CellEventPayload = {}): void {
    switch (event) {
      case "changePieceDraggability":
        this.changePieceDraggability(
          this.piece?.refreshComponent.bind(this.piece)
        );
        break;
      case "getPieceMoveOptions":
        this.getPieceMoveOptions();
        break;
      default:
        throw new Error("Invalid event name");
    }
  }

  private changePieceDraggability(callback: Function = () => null): void {
    if (this.piece) {
      this.piece.draggable = !this.piece.draggable;
    }
    callback();
  }

  private getPieceMoveOptions(): Cell[] {
    if (!this.piece) return [];
    return this.piece.getMoveOptions();
  }

  public refreshComponent() {
    if (this.componentRefresh.setVal) {
      this.componentRefresh.setVal(!this.componentRefresh.val);
    }
  }
}

export default Cell;
