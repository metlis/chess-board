import Game from "models/Game";
import { Color } from "types";
import Cell from "models/Cell";

class GameController {
  private game: Game;
  public colorMoveTurn: Color = "w";

  constructor(game: Game) {
    this.game = game;
    this.startGame();
  }

  public startGame() {
    this.blockPlayerPieces("b");
  }

  private blockPlayerPieces(color: Color) {
    const filtered: Cell[] = this.game.board.controller.cells.filter(
      (cell: Cell) => cell.color === color
    );
    this.game.board.controller.on("setDraggable", { include: filtered });
  }
}

export default GameController;
