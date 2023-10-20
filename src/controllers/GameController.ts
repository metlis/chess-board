import Game from "models/Game";
import { Color } from "types";
import BoardController from "controllers/BoardController";

class GameController {
  private game: Game;
  private boardController: BoardController;

  constructor(game: Game) {
    this.game = game;
    this.boardController = this.game.board.controller;
    this.startGame();
  }

  private startGame() {
    this.getPlayerPossibleMoves("b");
    this.changePiecesDraggability("w");
  }

  private changePiecesDraggability(color?: Color) {
    this.boardController.on("changePieceDraggability", {
      include: color
        ? this.boardController.getCellsByPieceColor(color)
        : this.boardController.getCellsWithPieces(),
    });
  }

  private getPlayerPossibleMoves(color: Color) {
    const cells = this.boardController.getCellsByPieceColor(color);
    this.boardController.on("getPieceMoveOptions", {
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
