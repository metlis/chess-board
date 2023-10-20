import type { Color, PieceImage, PieceName } from "types";
import Cell from "models/Cell";
import BoardController from "controllers/BoardController";
import Board from "models/Board";
import { ComponentRefresh } from "types";

abstract class Piece {
  public board: Board;
  public controller: BoardController;
  public cell: Cell;
  public readonly color: Color;
  public readonly name: PieceName;
  public readonly image: PieceImage;
  public moved = false;
  public moveOptions: Cell[] = [];
  public draggable: boolean = false;
  public componentRefresh: ComponentRefresh = {};

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

  public refreshComponent() {
    if (this.componentRefresh.setVal) {
      this.componentRefresh.setVal(!this.componentRefresh.val);
    }
  }

  public recenterPiece() {
    this.draggable = false;
    this.refreshComponent();
    setTimeout(() => {
      this.draggable = true;
      this.refreshComponent();
    }, 0);
  }

  public onDragStart(): void {
    this.cell.dispatch("changePieceDraggability", { exclude: [this.cell] });
  }

  public onDragStop(offset: { x: number; y: number }): void {
    this.cell.dispatch("changePieceDraggability", { exclude: [this.cell] });
    const stopCell = this.controller.findCell(this.cell, offset.x, offset.y);
    if (stopCell === this.cell) {
      this.recenterPiece();
    } else if (stopCell !== null) {
      this.cell.dispatch("movePiece", {
        source: { from: this.cell, to: stopCell },
      });
    }
  }
}

export default Piece;
