import Cell from "models/Cell";
import PieceFactory from "models/PieceFactory";
import BoardController from "controllers/BoardController";
import type {
  Color,
  Coordinate,
  PieceName,
  Row,
  Column,
  PiecesCoordinates,
} from "types";
import { PIECES_COORDINATES, COLUMN_LETTERS, AXIS_VALUES } from "../constants";

class Board {
  public readonly cellGrid: Cell[][] = [];
  private readonly piecesCoordinates: PiecesCoordinates = PIECES_COORDINATES;
  public readonly columnLetters: string[] = COLUMN_LETTERS;
  private static instance: Board;
  public controller: BoardController;
  private _colorOnTop: Color;

  private constructor(colorOnTop: Color = "b") {
    this.controller = new BoardController(this);
    this.createCells();
    this.populateCells();
    this._colorOnTop = colorOnTop;
    if (this._colorOnTop === "w") {
      this.rotateBoard();
    }
  }

  static init(): Board {
    if (!Board.instance) {
      Board.instance = new Board();
    }
    return Board.instance;
  }

  public get colorOnTop() {
    return this._colorOnTop;
  }

  public set colorOnTop(color: Color) {
    this._colorOnTop = color;
  }

  private createCells(): Cell[][] {
    let color: Color = "w";
    const rows: Row[] = AXIS_VALUES;
    const columns: Column[] = AXIS_VALUES;
    for (let row of rows) {
      this.cellGrid[row] = [];
      for (let column of columns) {
        const coordinate: Coordinate = [row, column];
        this.cellGrid[row][column] = new Cell(
          color,
          coordinate,
          this.controller
        );
        if (column !== 7) {
          color = color === "w" ? "b" : "w";
        }
      }
    }
    return this.cellGrid;
  }

  private populateCells(): Cell[][] {
    const factory: PieceFactory = new PieceFactory();
    let p: PieceName;
    for (p in this.piecesCoordinates) {
      const coordinates: Coordinate[] = this.piecesCoordinates[p];
      // eslint-disable-next-line no-loop-func
      coordinates.forEach(([y, x]: Coordinate, index) => {
        const color: Color = index < coordinates.length / 2 ? "b" : "w";
        factory.create(p, color, this.cellGrid[y][x]);
      });
    }
    return this.cellGrid;
  }

  public rotateBoard(): Cell[][] {
    const rows: Row[] = AXIS_VALUES;
    const columns: Column[] = AXIS_VALUES;
    this.cellGrid.reverse();
    for (let row of rows) {
      this.cellGrid[row].reverse();
      for (let column of columns) {
        this.cellGrid[row][column].coordinate = [row, column];
      }
    }
    return this.cellGrid;
  }
}

export default Board;
