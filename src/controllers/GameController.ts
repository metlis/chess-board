import Game from "models/Game";
import { Color } from "types";
import BoardController from "controllers/BoardController";

class GameController {
  private game: Game;
  private boardController: BoardController;
  public colorMoveTurn: Color = "w";

  constructor(game: Game) {
    this.game = game;
    this.boardController = this.game.board.controller;
    this.startGame();
  }

  private startGame() {
    this.blockPlayerPieces("b");
    this.getPlayerPossibleMoves("b");
  }

  private blockPlayerPieces(color: Color) {
    this.boardController.on("setDraggable", {
      include: this.boardController.getCellsByPieceColor(color),
    });
  }

  private getPlayerPossibleMoves(color: Color) {
    const cells = this.boardController.getCellsByPieceColor(color);
    this.boardController.on("getPiecesMoveOptions", {
      include: cells,
    });
    cells.forEach((cell) =>
      console.log(
        `Options: ${cell?.piece?.color}-${cell?.piece?.name}`,
        cell.piece?.moveOptions
      )
    );
  }
}

export default GameController;
