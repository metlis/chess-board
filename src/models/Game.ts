import GameController from "controllers/GameController";

class Game {
  private static instance: Game;
  public controller: GameController;

  private constructor() {
    this.controller = new GameController(this);
    this.controller.init();
  }

  static init(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }
}

export default Game;
