import Board from "models/Board";
import Game from "models/Game";
import Move from "models/Move";
import MovesHistory from "models/MovesHistory";
import PendingPromotion from "models/PendingPromotion";
import { Color, GameEventType, GameEventPayload } from "types";
import EventBridge from "controllers/EventBridge";

class GameController {
  private readonly game: Game;
  public readonly board: Board;
  public readonly eventBridge: EventBridge;
  private activePlayer: Color = "b";
  public isCheck: boolean = false;
  private movesHistory: MovesHistory;
  private pendingPromotion: PendingPromotion | null = null;

  constructor(game: Game) {
    this.game = game;
    this.eventBridge = new EventBridge();
    this.board = new Board(this.game, this.eventBridge);
    this.movesHistory = new MovesHistory();
  }

  public init() {
    this.board.init();
    this.switchActivePlayer();
  }

  public get idlePlayer(): Color {
    return this.activePlayer === "b" ? "w" : "b";
  }

  public get lastMove(): Move {
    return this.movesHistory.lastMove;
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
        if (payload.move instanceof Move) {
          this.movesHistory.addMove(payload.move);
        }
        break;
      case "checkMove":
        this.checkMove(payload);
        break;
      default:
        throw new Error("Invalid event name");
    }
  }

  private pieceMoved(payload: GameEventPayload): void {
    if (payload.move instanceof Array) {
      const [piece, to] = payload.move;
      if (piece.checkedMoveOptions.includes(to)) {
        if (piece.name === "p" && [0, 7].includes(to.coordinate[0])) {
          this.pendingPromotion = new PendingPromotion(piece, to);
          return;
        }
        this.movesHistory.addMove(new Move(piece, to));
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
    this.getPossibleMoves(this.idlePlayer);
    this.getPossibleMoves(this.activePlayer);
    this.changePiecesDraggability();
  }

  private changePiecesDraggability(): void {
    this.eventBridge.addEvent("changePieceDraggability", {
      include: this.board.pieces.filter(
        (piece) => piece.color === this.activePlayer
      ),
    });
  }

  private getPossibleMoves(color: Color): void {
    const pieces = this.board.pieces.filter((piece) => piece.color === color);
    this.eventBridge.addEvent("getPieceMoveOptions", {
      include: pieces,
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

  private checkMove(payload: GameEventPayload) {
    if (payload.move instanceof Array) {
      const move: Move = new Move(...payload.move);
      this.movesHistory.addMove(move);
      this.getPossibleMoves(this.idlePlayer);
      this.detectCheck();
      if (!this.isCheck) {
        this.movesHistory.removeMove();
        move.piece.addCheckedMoveOption(payload.move[1]);
      } else {
        this.movesHistory.removeMove();
      }
      this.isCheck = false;
    }
  }
}

export default GameController;
