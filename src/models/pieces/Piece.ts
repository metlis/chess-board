import Cell from "models/Cell";
import BoardController from "controllers/BoardController";
import GameController from "controllers/GameController";
import Board from "models/Board";
import {
  Color,
  ComponentRefresh,
  EventPayload,
  EventType,
  PieceImage,
  PieceName,
} from "types";

abstract class Piece {
  public board: Board;
  public boardController: BoardController;
  public gameController: GameController | undefined;
  public cell: Cell;
  public readonly color: Color;
  public readonly name: PieceName;
  public readonly image: PieceImage;
  public moved: boolean = false;
  public moveOptions: Cell[] = [];
  public draggable: boolean = false;
  public componentRefresh: ComponentRefresh = {};

  protected constructor(color: Color, cell: Cell, name: PieceName) {
    this.board = cell.controller.board;
    this.boardController = cell.controller;
    this.cell = cell;
    this.color = color;
    this.name = name;
    this.image = `${name}_${color}.svg`;
    cell.piece = this;
    setTimeout(() => {
      this.gameController = this.board.game.controller;
    }, 0);
  }

  abstract getMoveOptions(): Cell[];

  public on(event: EventType, payload: EventPayload<Piece> = {}): void {
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

  private get draggabilityPayload(): EventPayload<Piece> {
    return {
      exclude: [
        this,
        ...this.board.pieces.filter((piece) => piece.color !== this.color),
      ],
    };
  }

  public onDragStart(): void {
    this.boardController.addEvent(
      "changePieceDraggability",
      this.draggabilityPayload
    );
  }

  public onDragStop(offset: { x: number; y: number }): void {
    this.boardController.addEvent(
      "changePieceDraggability",
      this.draggabilityPayload
    );
    const to = this.board.getCell([
      this.cell.coordinate[0] + offset.y,
      this.cell.coordinate[1] + offset.x,
    ]);
    if (to) {
      this.gameController!.addEvent("pieceMoved", { move: [this, to] });
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
