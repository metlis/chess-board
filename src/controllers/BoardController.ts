import Piece from "models/pieces/Piece";
import Board from "models/Board";
import Cell from "models/Cell";
import { BoardEventType, BoardEventPayload, BoardEventFn } from "types";

class BoardController {
  public board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  private dispatchEvent<T extends { on: BoardEventFn<T> }>(
    event: BoardEventType,
    items: T[],
    payload: BoardEventPayload<T> = {}
  ): void {
    items.forEach((item: T) => item.on(event, payload));
  }

  public addEvent(
    event: BoardEventType,
    payload: BoardEventPayload<Piece | Cell> = {}
  ): void {
    switch (event) {
      case "changePieceDraggability":
        this.dispatchEvent(
          "changePieceDraggability",
          this.getItems(payload as BoardEventPayload<Piece>)
        );
        break;
      case "getPieceMoveOptions":
        this.dispatchEvent(
          "getPieceMoveOptions",
          this.getItems(payload as BoardEventPayload<Piece>)
        );
        break;
      case "showPromotionOptions":
        this.dispatchEvent(
          "showPromotionOptions",
          this.getItems(payload as BoardEventPayload<Cell>)
        );
        break;
      case "hidePromotionOptions":
        this.dispatchEvent(
          "hidePromotionOptions",
          this.getItems(payload as BoardEventPayload<Cell>)
        );
        break;
      default:
        throw new Error("Invalid event name");
    }
  }

  private getItems<T>(payload: BoardEventPayload<T>): T[] {
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
