import Board from "models/Board";
import EventBridge from "controllers/EventBridge";
import GameController from "controllers/GameController";

class Base {
  public readonly board: Board;
  public readonly eventBridge: EventBridge;
  public readonly gameController: GameController;

  constructor(board: Board) {
    this.board = board;
    this.eventBridge = this.board.eventBridge;
    this.gameController = this.board.game.controller;
  }
}

export default Base;
