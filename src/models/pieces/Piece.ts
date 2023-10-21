import type { Color, PieceImage, PieceName } from "types";
import Cell from "models/Cell";
import BoardController from "controllers/BoardController";
import Board from "models/Board";
import { EventPayload, EventType, ComponentRefresh } from "types";

abstract class Piece {
  public board: Board;
  public boardController: BoardController;
  public cell: Cell;
  public readonly color: Color;
  public readonly name: PieceName;
  public readonly image: PieceImage;
  public moved = false;
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
  }

  abstract getMoveOptions(): Cell[];

  public move() {
    this.moved = true;
  }

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

  public onDragStart(): void {
    this.boardController.addEvent("changePieceDraggability", {
      exclude: [this],
    });
  }

  public onDragStop(offset: { x: number; y: number }): void {
    this.boardController.addEvent("changePieceDraggability", {
      exclude: [this],
    });
    const stopCell = this.board.getCell([
      this.cell.coordinate[0] + offset.y,
      this.cell.coordinate[1] + offset.x,
    ]);
    if (stopCell === this.cell) {
      this.recenter();
    } else if (stopCell !== null) {
      this.reattach(this.cell, stopCell);
    }
  }

  private reattach(from: Cell, to: Cell): void {
    if (from.piece && to) {
      to.piece = from.piece;
      to.piece.cell = to;
      from.piece = null;
      to.refreshComponent();
      from.refreshComponent();
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
