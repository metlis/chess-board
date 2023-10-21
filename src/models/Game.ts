import GameController from "controllers/GameController";
import Board from "models/Board";

class Game {
  private static instance: Game;
  public board: Board;
  public controller: GameController;

  private constructor() {
    this.board = new Board(this);
    this.controller = new GameController(this);
  }

  static init(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }
}

export default Game;
