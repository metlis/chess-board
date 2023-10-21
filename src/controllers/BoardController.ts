import Cell from "models/Cell";
import Piece from "models/pieces/Piece";
import Board from "models/Board";
import { PieceEventType, CellEventType, EventPayload } from "types";

class BoardController {
  public board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  private dispatchCellEvent(
    event: CellEventType,
    cells: Cell[],
    payload: EventPayload<Cell> = {}
  ): void {
    cells.forEach((cell: Cell) => cell.on(event, payload));
  }

  public addCellEvent(
    event: CellEventType,
    payload: EventPayload<Cell> = {}
  ): void {}

  private dispatchPieceEvent(
    event: PieceEventType,
    pieces: Piece[],
    payload: EventPayload<Piece> = {}
  ): void {
    pieces.forEach((piece: Piece) => piece.on(event, payload));
  }

  public addPieceEvent(
    event: PieceEventType,
    payload: EventPayload<Piece> = {}
  ): void {
    switch (event) {
      case "changeDraggability":
        this.changeDraggability(payload);
        break;
      case "getMoveOptions":
        this.getMoveOptions(payload);
        break;
      default:
        throw new Error("Invalid event name");
    }
  }

  private changeDraggability(payload: EventPayload<Piece> = {}): void {
    if (payload.include) {
      this.dispatchPieceEvent("changeDraggability", payload.include);
    } else {
      const filtered: Piece[] = this.board.pieces.filter(
        (piece: Piece) => !(payload.exclude || []).includes(piece)
      );
      this.dispatchPieceEvent("changeDraggability", filtered);
    }
  }

  private getMoveOptions(payload: EventPayload<Piece> = {}) {
    this.dispatchPieceEvent("getMoveOptions", payload.include || []);
  }
}

export default BoardController;
