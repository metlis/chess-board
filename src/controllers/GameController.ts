import Board from "models/Board";
import Game from "models/Game";
import { Color } from "types";
import BoardController from "controllers/BoardController";

class GameController {
  private game: Game;
  private board: Board;
  private boardController: BoardController;

  constructor(game: Game) {
    this.game = game;
    this.board = this.game.board;
    this.boardController = this.game.board.controller;
    this.startGame();
  }

  private startGame() {
    this.getPlayerPossibleMoves("b");
    this.changePiecesDraggability("w");
  }

  private changePiecesDraggability(color?: Color) {
    this.boardController.addEvent("changePieceDraggability", {
      include: color
        ? this.board.pieces.filter((piece) => piece.color === color)
        : this.board.pieces,
    });
  }

  private getPlayerPossibleMoves(color: Color) {
    const pieces = this.board.pieces.filter((piece) => piece.color === color);
    this.boardController.addEvent("getPieceMoveOptions", {
      include: pieces,
    });
    pieces.forEach((piece) =>
      console.log(`Options: ${piece.color}-${piece.name}`, piece.moveOptions)
    );
  }
}

export default GameController;
