import Board from "models/Board";
import Game from "models/Game";
import { Color, EventType } from "types";
import BoardController from "controllers/BoardController";

class GameController {
  private game: Game;
  private board: Board;
  private boardController: BoardController;
  private activePlayer: Color = "b";
  public isCheck: boolean = false;

  constructor(game: Game) {
    this.game = game;
    this.board = this.game.board;
    this.boardController = this.game.board.controller;
    this.switchActivePlayer();
  }

  public addEvent(event: EventType): void {
    switch (event) {
      case "pieceMoved":
        this.changePiecesDraggability();
        this.switchActivePlayer();
        break;
      default:
        throw new Error("Invalid event name");
    }
  }

  private get idlePlayer(): Color {
    return this.activePlayer === "b" ? "w" : "b";
  }

  private switchActivePlayer(): void {
    this.activePlayer = this.idlePlayer;
    this.isCheck = false;
    this.getPlayerPossibleMoves(this.idlePlayer);
    this.detectCheck();
    this.getPlayerPossibleMoves(this.activePlayer);
    this.changePiecesDraggability();
  }

  private changePiecesDraggability(): void {
    this.boardController.addEvent("changePieceDraggability", {
      include: this.board.pieces.filter(
        (piece) => piece.color === this.activePlayer
      ),
    });
  }

  private getPlayerPossibleMoves(color: Color): void {
    const pieces = this.board.pieces.filter((piece) => piece.color === color);
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
