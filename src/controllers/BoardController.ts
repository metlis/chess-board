import Piece from "models/pieces/Piece";
import Board from "models/Board";
import Cell from "models/Cell";
import { BoardEventType, BoardEventPayload, BoardEventFn } from "types";

class BoardController {
  public board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  private dispatchEvent<T extends { on: BoardEventFn }>(
    event: BoardEventType,
    items: T[],
    payload: BoardEventPayload = {}
  ): void {
    items.forEach((item: T) => item.on(event, payload));
  }

  public addEvent(
    event: BoardEventType,
    payload: BoardEventPayload = {}
  ): void {
    switch (event) {
      case "changePieceDraggability":
        this.dispatchEvent("changePieceDraggability", this.getItems(payload));
        break;
      case "getPieceMoveOptions":
        this.dispatchEvent("getPieceMoveOptions", this.getItems(payload));
        break;
      case "showPromotionOptions":
        this.dispatchEvent("showPromotionOptions", this.getItems(payload));
        break;
      case "hidePromotionOptions":
        this.dispatchEvent("hidePromotionOptions", this.getItems(payload));
        break;
      default:
        throw new Error("Invalid event name");
    }
  }

  private getItems(payload: BoardEventPayload): (Piece | Cell)[] {
    if (payload.include) {
      return payload.include;
    } else if (payload.exclude?.length && payload.exclude[0] instanceof Piece) {
      return this.board.pieces.filter(
        (item) => !(payload.exclude || []).includes(item)
      );
    } else if (payload.exclude?.length && payload.exclude[0] instanceof Cell) {
      return this.board.cells.filter(
        (item) => !(payload.exclude || []).includes(item)
      );
    }
    return [];
  }
}

export default BoardController;
