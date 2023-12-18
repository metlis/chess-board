import Board from "models/Board";
import Game from "models/Game";
import Move from "models/Move";
import King from "models/pieces/King";
import MovesHistory from "models/MovesHistory";
import PendingPromotion from "models/PendingPromotion";
import { Color, GameEventPayload, GameEventType, Piece } from "types";
import EventBridge from "controllers/EventBridge";

class GameController {
  private readonly game: Game;
  public readonly board: Board;
  public readonly eventBridge: EventBridge;
  private activePlayer: Color = "b";
  public movesHistory: MovesHistory;
  private pendingPromotion: PendingPromotion | null = null;
  private isCheck: boolean = false;
  private activePlayerHasMoveOptions: boolean = false;
  private winner: Color | undefined | null = undefined;
  private pieceTouched: Piece | null = null;

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

  private get activePlayerKing(): Piece[] {
    return this.board.pieces.filter(
      (piece) => piece.color === this.activePlayer && piece instanceof King
    );
  }

  public on(event: GameEventType, payload: GameEventPayload = {}): void {
    switch (event) {
      case "game:pieceMoved":
        this.onPieceMove(payload);
        break;
      case "game:promotionOptionSelected":
        this.pendingPromotion?.optionSelected(payload);
        this.pendingPromotion = null;
        break;
      case "game:changePiecesDraggability":
        this.changePiecesDraggability();
        break;
      case "game:switchActivePlayer":
        this.switchActivePlayer();
        break;
      case "game:pushMove":
        if (payload.move instanceof Move) {
          this.movesHistory.addMove(payload.move, true);
        }
        break;
      case "game:checkMove":
        this.checkMove(payload);
        break;
      case "game:setCheck":
        this.isCheck = true;
        break;
      case "game:setHasMoveOptions":
        this.activePlayerHasMoveOptions = true;
        break;
      case "game:pieceTouched":
        if (payload.piece) {
          this.pieceTouched = payload.piece;
        }
        break;
      case "game:cellClicked":
        this.onCellClick(payload);
        break;
      default:
        throw new Error("Invalid event name");
    }
  }

  private onPieceMove(payload: GameEventPayload): void {
    if (payload.move instanceof Array) {
      const [piece, to] = payload.move;
      if (piece.checkedMoveOptions.includes(to)) {
        if (piece.name === "p" && [0, 7].includes(to.coordinate[0])) {
          this.pendingPromotion = new PendingPromotion(piece, to);
          return;
        }
        this.movesHistory.addMove(new Move(piece, to), true);
        this.eventBridge.addEvent("king:removeCheck", {
          include: this.activePlayerKing,
        });
        this.changePiecesDraggability();
        this.switchActivePlayer();
        this.lastMove.checkChecking();
      } else {
        piece.recenter();
      }
    }
  }

  private onCellClick(payload: GameEventPayload) {
    if (
      payload.cell &&
      this.pieceTouched?.checkedMoveOptions.includes(payload.cell)
    ) {
      this.eventBridge.addEvent(
        "piece:changeDraggability",
        this.pieceTouched?.draggabilityPayload
      );
      this.eventBridge.addEvent("cell:changeMoveOptionsVisibility", {
        include: this.pieceTouched.checkedMoveOptions,
      });
      this.onPieceMove({ move: [this.pieceTouched, payload.cell] });
      this.pieceTouched = null;
    }
  }

  private switchActivePlayer(): void {
    this.activePlayer = this.idlePlayer;
    this.getPossibleMoves(this.idlePlayer);
    this.getPossibleMoves(this.activePlayer);
    this.changePiecesDraggability();
    this.detectCheck();
    if (this.isCheck) {
      this.eventBridge.addEvent("king:setCheck", {
        include: this.activePlayerKing,
      });
    } else {
      this.eventBridge.addEvent("king:removeCheck", {
        include: this.activePlayerKing,
      });
    }
    this.checkGameOver();
    if (this.winner !== undefined) {
      console.log(this.winner);
      this.changePiecesDraggability();
    }
  }

  private changePiecesDraggability(): void {
    this.eventBridge.addEvent("piece:changeDraggability", {
      include: this.board.pieces.filter(
        (piece) => piece.color === this.activePlayer
      ),
    });
  }

  private getPossibleMoves(color: Color): void {
    this.eventBridge.addEvent("piece:getMoveOptions", {
      include: this.board.pieces.filter((piece) => piece.color === color),
    });
  }

  private detectCheck(): void {
    this.isCheck = false;
    this.eventBridge.addEvent("piece:detectCheck", {
      include: this.board.pieces.filter(
        (piece) => piece.color === this.idlePlayer
      ),
    });
  }

  private detectActivePlayerHasMoveOptions(): void {
    this.activePlayerHasMoveOptions = false;
    this.eventBridge.addEvent("piece:detectHasMoveOptions", {
      include: this.board.pieces.filter(
        (piece) => piece.color === this.activePlayer
      ),
    });
  }

  private checkGameOver(): void {
    if (
      this.movesHistory.isThreefoldRepetition(
        this.activePlayer,
        this.board.pieces
      )
    ) {
      this.winner = null;
      return;
    }
    this.detectActivePlayerHasMoveOptions();
    if (!this.activePlayerHasMoveOptions) {
      if (this.isCheck) {
        this.winner = this.idlePlayer;
      } else {
        this.winner = null;
      }
    }
  }

  private checkMove(payload: GameEventPayload): void {
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
    }
  }
}

export default GameController;
