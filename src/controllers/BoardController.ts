import Cell from "models/Cell";
import Board from "models/Board";
import { CellEventType, CellEventPayload } from "types";

class BoardController {
  public board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  private get cells() {
    const cells: Cell[] = [];
    for (let row of this.board.cellGrid) {
      row.forEach((cell) => cells.push(cell));
    }
    return cells;
  }

  private dispatch(
    event: CellEventType,
    cells: Cell[],
    payload: CellEventPayload = {}
  ): void {
    cells.forEach((cell: Cell) => cell.on(event, payload));
  }

  public on(event: CellEventType, payload: CellEventPayload = {}): void {
    switch (event) {
      case "setDraggable":
        this.setDraggable(payload);
        break;
      default:
        throw new Error("Invalid event name");
    }
  }

  private setDraggable(payload: CellEventPayload = {}): void {
    const filtered: Cell[] = this.cells.filter(
      (cell: Cell) => !(payload.exclude || []).includes(cell)
    );
    this.dispatch("setDraggable", filtered);
  }
}

export default BoardController;
