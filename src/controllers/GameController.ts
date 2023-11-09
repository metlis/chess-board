import Board from "models/Board";
import Game from "models/Game";
import Move from "models/Move";
import Piece from "models/pieces/Piece";
import Cell from "models/Cell";
import PieceFactory from "models/PieceFactory";
import { Color, EventPayload, EventType, Row } from "types";
import BoardController from "controllers/BoardController";

class GameController {
  private game: Game;
  private board: Board;
  private boardController: BoardController;
  private activePlayer: Color = "b";
  public isCheck: boolean = false;
  public moves: Move[] = [];
  private pendingPromotionMove: {
    piece: Piece;
    from: Cell;
    to: Cell;
    promotionCells: Cell[];
  } | null = null;

  constructor(game: Game) {
    this.game = game;
    this.board = this.game.board;
    this.boardController = this.game.board.controller;
    this.switchActivePlayer();
  }

  private get idlePlayer(): Color {
    return this.activePlayer === "b" ? "w" : "b";
  }

  public get lastMove(): Move {
    return this.moves[this.moves.length - 1];
  }

  public addEvent(
    event: EventType,
    payload: EventPayload<Cell | Piece> = {}
  ): void {
    switch (event) {
      case "pieceMoved":
        this.pieceMoved(payload);
        break;
      case "promotionOptionSelected":
        this.promotionOptionSelected(payload);
        break;
      default:
        throw new Error("Invalid event name");
    }
  }

  private pieceMoved(payload: EventPayload<Cell | Piece>): void {
    if (payload.move) {
      const [piece, to] = payload.move;
      if (piece.moveOptions.includes(to)) {
        if (piece.name === "p" && [0, 7].includes(to.coordinate[0])) {
          this.showPromotionOptions(piece, to);
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

  private promotionOptionSelected(payload: EventPayload<Cell | Piece>) {
    this.boardController.addEvent("hidePromotionOptions", {
      include: this.pendingPromotionMove
        ? this.pendingPromotionMove.promotionCells
        : [],
    });
    if (payload.promotion && this.pendingPromotionMove) {
      const piece: Piece = new PieceFactory().create(
        payload.promotion.name,
        payload.promotion.color,
        this.pendingPromotionMove.to
      );
      const move: Move = new Move(piece, this.pendingPromotionMove.to, {
        from: this.pendingPromotionMove.from,
        piece: this.pendingPromotionMove.piece,
      });
      this.moves.push(move);
      this.switchActivePlayer();
    }
    this.pendingPromotionMove = null;
  }

  private showPromotionOptions(piece: Piece, to: Cell) {
    const promotionCells: Cell[] = [];
    let rows: Row[] = to.coordinate[0] === 0 ? [0, 1, 2, 3] : [4, 5, 6, 7];
    rows.forEach((i) => {
      const cell = this.board.getCell([i, to.coordinate[1]]);
      if (cell) {
        promotionCells.push(cell);
      }
    });

    const from = piece.cell;
    this.pendingPromotionMove = { piece, to, from, promotionCells };
    from.piece = null;
    from.refreshComponent();

    this.changePiecesDraggability();
    this.boardController.addEvent("showPromotionOptions", {
      include: promotionCells,
    });
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
