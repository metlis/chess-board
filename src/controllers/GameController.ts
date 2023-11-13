import Board from "models/Board";
import Game from "models/Game";
import Move from "models/Move";
import PendingPromotion from "models/PendingPromotion";
import { Color, GameEventType, GameEventPayload } from "types";
import EventBridge from "controllers/EventBridge";

class GameController {
  private readonly game: Game;
  public readonly board: Board;
  public readonly eventBridge: EventBridge;
  private activePlayer: Color = "b";
  public isCheck: boolean = false;
  public moves: Move[] = [];
  private pendingPromotion: PendingPromotion | null = null;

  constructor(game: Game) {
    this.game = game;
    this.eventBridge = new EventBridge();
    this.board = new Board(this.game, this.eventBridge);
    this.switchActivePlayer();
  }

  private get idlePlayer(): Color {
    return this.activePlayer === "b" ? "w" : "b";
  }

  public get lastMove(): Move {
    return this.moves[this.moves.length - 1];
  }

  public on(event: GameEventType, payload: GameEventPayload = {}): void {
    switch (event) {
      case "pieceMoved":
        this.pieceMoved(payload);
        break;
      case "promotionOptionSelected":
        this.pendingPromotion?.optionSelected(payload);
        this.pendingPromotion = null;
        break;
      case "changePiecesDraggability":
        this.changePiecesDraggability();
        break;
      case "switchActivePlayer":
        this.switchActivePlayer();
        break;
      case "pushMove":
        if (payload.move instanceof Move) this.moves.push(payload.move);
        break;
      default:
        throw new Error("Invalid event name");
    }
  }

  private pieceMoved(payload: GameEventPayload): void {
    if (payload.move instanceof Array) {
      const [piece, to] = payload.move;
      if (piece.moveOptions.includes(to)) {
        if (piece.name === "p" && [0, 7].includes(to.coordinate[0])) {
          this.pendingPromotion = new PendingPromotion(piece, to);
          return;
        }
        const move: Move = new Move(piece, to);
        this.moves.push(move);
        this.changePiecesDraggability();
        this.switchActivePlayer();
      } else {
        piece.recenter();
      }
    }
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
    this.eventBridge.addEvent("changePieceDraggability", {
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
    this.eventBridge.addEvent("getPieceMoveOptions", {
      include: this.isCheck
        ? pieces.filter((piece) => piece.name === "k")
        : pieces,
    });
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
