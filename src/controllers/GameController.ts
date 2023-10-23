import Board from "models/Board";
import Game from "models/Game";
import { Color } from "types";
import BoardController from "controllers/BoardController";

class GameController {
  private game: Game;
  private board: Board;
  private boardController: BoardController;
  private activePlayer: Color = "w";
  public isCheck: boolean = false;

  constructor(game: Game) {
    this.game = game;
    this.board = this.game.board;
    this.boardController = this.game.board.controller;
    this.switchActivePlayer();
  }

  private switchActivePlayer(): void {
    this.detectCheck();
    this.getPlayerPossibleMoves();
    this.changePiecesDraggability();
  }

  private changePiecesDraggability(): void {
    this.boardController.addEvent("changePieceDraggability", {
      include: this.board.pieces.filter(
        (piece) => piece.color === this.activePlayer
      ),
    });
  }

  private getPlayerPossibleMoves(): void {
    const pieces = this.board.pieces.filter(
      (piece) => piece.color === this.activePlayer
    );
    if (this.isCheck) {
      pieces.forEach((piece) => (piece.moveOptions = []));
    }
    this.boardController.addEvent("getPieceMoveOptions", {
      include: this.isCheck
        ? pieces.filter((piece) => piece.name === "k")
        : pieces,
    });
    pieces.forEach((piece) =>
      console.log(`Options: ${piece.color}-${piece.name}`, piece.moveOptions)
    );
  }

  private detectCheck(): void {
    let _isCheck = false;
    this.board.pieces
      .filter((piece) => piece.color !== this.activePlayer)
      .forEach((piece) =>
        piece.moveOptions.forEach((option) => {
          if (
            option.piece?.name === "k" &&
            option.piece.color === this.activePlayer
          ) {
            _isCheck = true;
          }
        })
      );
    this.isCheck = _isCheck;
  }
}

export default GameController;
