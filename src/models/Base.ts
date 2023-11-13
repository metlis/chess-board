import Board from "models/Board";
import EventBridge from "controllers/EventBridge";
import GameController from "controllers/GameController";
import BaseComponent from "models/BaseComponent";

class Base extends BaseComponent {
  public readonly board: Board;
  public readonly eventBridge: EventBridge;
  public readonly gameController: GameController;

  constructor(board: Board) {
    super();
    this.board = board;
    this.eventBridge = this.board.eventBridge;
    this.gameController = this.board.game.controller;
  }
}

export default Base;
