import type {
  Color,
  Piece,
  PieceName,
  CellID,
  Coordinate,
  BoardEventType,
  BoardEventPayload,
} from "types";
import Base from "models/Base";
import Board from "models/Board";
import PromotionPiece from "models/pieces/PromotionPiece";
import Refreshable from "mixins/Refreshable";
import { COLUMN_LETTERS, ROW_NUMBERS } from "../constants";

class Cell extends Refreshable(Base) {
  public id: CellID;
  public readonly color: Color;
  public coordinate: Coordinate;
  public piece: Piece | null;
  public promotionPiece: PromotionPiece | null = null;
  public isMoveOption: boolean = false;

  constructor(color: Color, coordinate: Coordinate, board: Board) {
    super(board);
    this.id = `${COLUMN_LETTERS[coordinate[1]]}${ROW_NUMBERS[coordinate[0]]}`;
    this.color = color;
    this.coordinate = coordinate;
    this.piece = null;
  }

  public on(event: BoardEventType, payload: BoardEventPayload = {}): void {
    switch (event) {
      case "board:showPromotionOptions":
        this.showPromotionOptions();
        break;
      case "board:hidePromotionOptions":
        this.hidePromotionOptions();
        break;
      case "board:changeMoveOptionsVisibility":
        this.changeMoveOptionsVisibility();
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
      this.promotionPiece = new PromotionPiece(pieceColor, pieceName, this);
      this.refreshComponent();
    }
  }

  private hidePromotionOptions() {
    this.promotionPiece = null;
    this.refreshComponent();
  }

  private changeMoveOptionsVisibility() {
    this.isMoveOption = !this.isMoveOption;
    this.refreshComponent();
  }
}

export default Cell;
