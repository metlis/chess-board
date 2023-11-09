import type {
  Color,
  Piece,
  PieceName,
  CellID,
  Coordinate,
  ComponentRefresh,
  EventType,
  EventPayload,
} from "types";
import Board from "models/Board";
import PromotionPiece from "models/pieces/PromotionPiece";
import BoardController from "controllers/BoardController";
import { COLUMN_LETTERS, ROW_NUMBERS } from "../constants";

class Cell {
  public id: CellID;
  public board: Board;
  public controller: BoardController;
  public readonly color: Color;
  public coordinate: Coordinate;
  public piece: Piece | null;
  public promotionPiece: PromotionPiece | null = null;
  public componentRefresh: ComponentRefresh = {};

  constructor(color: Color, coordinate: Coordinate, board: Board) {
    this.id = `${COLUMN_LETTERS[coordinate[1]]}${ROW_NUMBERS[coordinate[0]]}`;
    this.color = color;
    this.coordinate = coordinate;
    this.piece = null;
    this.board = board;
    this.controller = board.controller;
  }

  public on(event: EventType, payload: EventPayload<Cell> = {}): void {
    switch (event) {
      case "showPromotionOptions":
        this.showPromotionOptions();
        break;
      case "hidePromotionOptions":
        this.hidePromotionOptions();
        break;
      default:
        throw new Error("Invalid event name");
    }
  }

  private showPromotionOptions() {
    let pieceName: PieceName | null = null;
    let pieceColor: Color | null = null;
    if ([0, 7].includes(this.coordinate[0])) {
      pieceName = "q";
    } else if ([1, 6].includes(this.coordinate[0])) {
      pieceName = "r";
    } else if ([2, 5].includes(this.coordinate[0])) {
      pieceName = "b";
    } else if ([3, 4].includes(this.coordinate[0])) {
      pieceName = "n";
    }
    if (pieceName) {
      pieceColor =
        this.coordinate[0] < 4
          ? this.board.colorOnTop === "b"
            ? "w"
            : "b"
          : this.board.colorOnTop === "b"
          ? "b"
          : "w";
      this.promotionPiece = new PromotionPiece(
        pieceColor,
        pieceName,
        this.board.game.controller
      );
      this.refreshComponent();
    }
  }

  private hidePromotionOptions() {
    this.promotionPiece = null;
    this.refreshComponent();
  }

  public refreshComponent(): void {
    if (this.componentRefresh.setVal) {
      this.componentRefresh.setVal(!this.componentRefresh.val);
    }
  }
}

export default Cell;
