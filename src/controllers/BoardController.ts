import Cell from "models/Cell";
import Board from "models/Board";
import { CellEventType, CellEventPayload, Color } from "types";

class BoardController {
  public board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  public get cells() {
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
      case "changePieceDraggability":
        this.changePieceDraggability(payload);
        break;
      case "movePiece":
        this.movePiece(payload);
        break;
      case "getPieceMoveOptions":
        this.getPieceMoveOptions(payload);
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

  private changePieceDraggability(payload: CellEventPayload = {}): void {
    if (payload.include) {
      this.dispatch("changePieceDraggability", payload.include);
    } else {
      const filtered: Cell[] = this.cells.filter(
        (cell: Cell) => !(payload.exclude || []).includes(cell)
      );
      this.dispatch("changePieceDraggability", filtered);
    }
  }

  private movePiece(payload: CellEventPayload = {}) {
    if (!payload.source || !payload.source.from) return;
    if (payload.source.from.piece && payload.source.to) {
      payload.source.to.piece = payload.source.from.piece;
      payload.source.to.piece.cell = payload.source.to;
      payload.source.from.piece = null;
      payload.source.to.refreshComponent();
      payload.source.from.refreshComponent();
    }
  }

  public getCell(coordinate: [number, number]): Cell | null {
    if (
      coordinate[0] < 0 ||
      coordinate[0] > 7 ||
      coordinate[1] < 0 ||
      coordinate[1] > 7
    ) {
      return null;
    }
    return this.board.cellGrid[coordinate[0]][coordinate[1]];
  }

  public getCellsByPieceColor(color: Color): Cell[] {
    return this.cells.filter((cell: Cell) => cell.piece?.color === color);
  }

  public getCellsWithPieces(): Cell[] {
    return this.cells.filter((cell: Cell) => !!cell.piece);
  }

  private getPieceMoveOptions(payload: CellEventPayload = {}) {
    if (payload.include) {
      this.dispatch("getPieceMoveOptions", payload.include);
    }
  }
}

export default BoardController;
