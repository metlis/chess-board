import Piece from "models/pieces/Piece";
import Board from "models/Board";
import Cell from "models/Cell";
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

  public addEvent(
    event: EventType,
    payload: EventPayload<Piece | Cell> = {}
  ): void {
    switch (event) {
      case "changePieceDraggability":
        this.dispatchEvent(
          "changePieceDraggability",
          this.getItems(payload as EventPayload<Piece>)
        );
        break;
      case "getPieceMoveOptions":
        this.dispatchEvent(
          "getPieceMoveOptions",
          this.getItems(payload as EventPayload<Piece>)
        );
        break;
      case "showPromotionOptions":
        this.dispatchEvent(
          "showPromotionOptions",
          this.getItems(payload as EventPayload<Cell>)
        );
        break;
      default:
        throw new Error("Invalid event name");
    }
  }

  private getItems<T>(payload: EventPayload<T>): T[] {
    if (payload.include) {
      return payload.include;
    } else if (payload.exclude) {
      return (this.board.pieces as T[]).filter(
        (item) => !(payload.exclude || []).includes(item)
      );
    }
    return [];
  }
}

export default BoardController;
