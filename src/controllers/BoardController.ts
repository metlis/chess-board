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
        this.dispatchEvent(
          "changePieceDraggability",
          this.getItems(payload, this.board.pieces)
        );
        break;
      case "getPieceMoveOptions":
        this.dispatchEvent(
          "getPieceMoveOptions",
          this.getItems(payload, this.board.pieces)
        );
        break;
      default:
        throw new Error("Invalid event name");
    }
  }

  private getItems<T>(payload: EventPayload<T>, items: T[] = []): T[] {
    if (payload.include) {
      return payload.include;
    } else if (payload.exclude) {
      return items.filter((item) => !(payload.exclude || []).includes(item));
    }
    return [];
  }
}

export default BoardController;
