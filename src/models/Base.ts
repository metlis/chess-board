import Board from "models/Board";
import EventBridge from "controllers/EventBridge";

class Base {
  public readonly board: Board;
  public readonly eventBridge: EventBridge;

  constructor(board: Board) {
    this.board = board;
    this.eventBridge = this.board.eventBridge;
  }
}

export default Base;
