import Piece from "models/pieces/Piece";
import Board from "models/Board";
import { EventType, EventPayload, EventFn } from "types";

class BoardController {
  public board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  private dispatchEvent<T extends { on: EventFn<T> }>(
    event: EventType,
    items: T[],
    payload: EventPayload<T> = {}
  ): void {
    items.forEach((item: T) => item.on(event, payload));
  }

  public addEvent(event: EventType, payload: EventPayload<Piece> = {}): void {
    switch (event) {
      case "changePieceDraggability":
        this.changeDraggability(payload);
        break;
      case "getPieceMoveOptions":
        this.getMoveOptions(payload);
        break;
      default:
        throw new Error("Invalid event name");
    }
  }

  private changeDraggability(payload: EventPayload<Piece> = {}): void {
    if (payload.include) {
      this.dispatchEvent<Piece>("changePieceDraggability", payload.include);
    } else {
      const filtered: Piece[] = this.board.pieces.filter(
        (piece: Piece) => !(payload.exclude || []).includes(piece)
      );
      this.dispatchEvent<Piece>("changePieceDraggability", filtered);
    }
  }

  private getMoveOptions(payload: EventPayload<Piece> = {}) {
    this.dispatchEvent<Piece>("getPieceMoveOptions", payload.include || []);
  }
}

export default BoardController;
