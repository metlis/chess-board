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
      case "movePiece":
        this.movePiece(payload);
        break;
      default:
        throw new Error("Invalid event name");
    }
  }

  public findCell(source: Cell, xOffset: number, yOffset: number): Cell | null {
    try {
      return this.board.cellGrid[source.coordinate[0] + yOffset][
        source.coordinate[1] + xOffset
      ];
    } catch {
      return null;
    }
  }

  private setDraggable(payload: CellEventPayload = {}): void {
    const filtered: Cell[] = this.cells.filter(
      (cell: Cell) => !(payload.exclude || []).includes(cell)
    );
    this.dispatch("setDraggable", filtered);
  }

  private movePiece(payload: CellEventPayload = {}) {
    if (!payload.source || !payload.source.from) return;
    if (payload.source.from.piece && payload.source.to) {
      payload.source.to.piece = payload.source.from.piece;
      payload.source.from.piece = null;
    }
  }
}

export default BoardController;
