import Cell from "models/Cell";
import EventBridge from "controllers/EventBridge";
import Board from "models/Board";
import {
  Color,
  ComponentRefresh,
  BoardEventPayload,
  BoardEventType,
  PieceImage,
  PieceName,
} from "types";

abstract class Piece {
  public board: Board;
  public eventBridge: EventBridge;
  public cell: Cell;
  public readonly color: Color;
  public readonly name: PieceName;
  public readonly image: PieceImage;
  public moved: boolean = false;
  public moveOptions: Cell[] = [];
  public draggable: boolean = false;
  public componentRefresh: ComponentRefresh = {};

  protected constructor(color: Color, cell: Cell, name: PieceName) {
    this.board = cell.board;
    this.eventBridge = cell.eventBridge;
    this.cell = cell;
    this.color = color;
    this.name = name;
    this.image = `${name}_${color}.svg`;
    cell.piece = this;
  }

  abstract getMoveOptions(): Cell[];

  public on(event: BoardEventType, payload: BoardEventPayload = {}): void {
    switch (event) {
      case "changePieceDraggability":
        this.changeDraggability(this.refreshComponent.bind(this));
        break;
      case "getPieceMoveOptions":
        this.getMoveOptions();
        break;
      default:
        throw new Error("Invalid event name");
    }
  }

  private changeDraggability(callback: Function = () => null): void {
    this.draggable = !this.draggable;
    callback();
  }

  private get draggabilityPayload(): BoardEventPayload {
    return {
      exclude: [
        this,
        ...this.board.pieces.filter((piece) => piece.color !== this.color),
      ],
    };
  }

  public onDragStart(): void {
    this.eventBridge.addEvent(
      "changePieceDraggability",
      this.draggabilityPayload
    );
  }

  public onDragStop(offset: { x: number; y: number }): void {
    this.eventBridge.addEvent(
      "changePieceDraggability",
      this.draggabilityPayload
    );
    const to = this.board.getCell([
      this.cell.coordinate[0] + offset.y,
      this.cell.coordinate[1] + offset.x,
    ]);
    if (to) {
      this.eventBridge.addEvent("pieceMoved", { move: [this, to] });
    } else {
      this.recenter();
    }
  }

  public recenter(): void {
    this.draggable = false;
    this.refreshComponent();
    setTimeout(() => {
      this.draggable = true;
      this.refreshComponent();
    }, 0);
  }

  public refreshComponent(): void {
    if (this.componentRefresh.setVal) {
      this.componentRefresh.setVal(!this.componentRefresh.val);
    }
  }
}

export default Piece;
