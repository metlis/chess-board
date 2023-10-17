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
  private board: Board;
  public controller: BoardController;
  public readonly color: Color;
  public coordinate: Coordinate;
  public piece: Piece | null;
  public draggable: boolean = true;
  public componentRefresh: ComponentRefresh = {};

  constructor(color: Color, coordinate: Coordinate, board: Board) {
    this.color = color;
    this.coordinate = coordinate;
    this.piece = null;
    this.board = board;
    this.controller = board.controller;
  }

  private dispatch(event: CellEventType, payload: CellEventPayload = {}): void {
    this.controller.on(event, payload);
  }

  public on(event: CellEventType, payload: CellEventPayload = {}): void {
    switch (event) {
      case "setDraggable":
        this.onSetDraggable(this.refreshComponent.bind(this));
        break;
      default:
        throw new Error("Invalid event name");
    }
  }

  public onDragStart(): void {
    this.dispatch("setDraggable", { exclude: [this] });
  }

  public onDragStop(offset: { x: number; y: number }): void {
    this.dispatch("setDraggable", { exclude: [this] });
    const stopCell = this.controller.findCell(this, offset.x, offset.y);
    if (stopCell === this) {
      this.recenterPiece();
    } else if (stopCell !== null) {
      this.dispatch("movePiece", { source: { from: this, to: stopCell } });
    }
  }

  private onSetDraggable(callback: Function = () => null): void {
    this.draggable = !this.draggable;
    callback();
  }

  private refreshComponent() {
    if (this.componentRefresh.setVal) {
      this.componentRefresh.setVal(!this.componentRefresh.val);
    }
  }

  private recenterPiece() {
    this.draggable = false;
    this.refreshComponent();
    setTimeout(() => {
      this.draggable = true;
      this.refreshComponent();
    }, 0);
  }

  private getPieceNewCellOptions(): Cell[] {
    if (!this.piece) return [];
    return this.piece.getMoveOptions();
  }
}

export default Cell;
