import Cell from "models/Cell";
import PieceFactory from "models/PieceFactory";
import BoardController from "controllers/BoardController";
import type { Color, Coordinate, PieceName, Row, Column } from "types";

class Board {
  public readonly cells: Cell[][] = [];
  private readonly piecePositionMap: {
    [key in PieceName]: Coordinate[];
  } = {
    b: [
      [0, 2],
      [0, 5],
      [7, 2],
      [7, 5],
    ],
    k: [
      [0, 4],
      [7, 4],
    ],
    n: [
      [0, 1],
      [0, 6],
      [7, 1],
      [7, 6],
    ],
    p: [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [1, 6],
      [1, 7],
      [6, 0],
      [6, 1],
      [6, 2],
      [6, 3],
      [6, 4],
      [6, 5],
      [6, 6],
      [6, 7],
    ],
    r: [
      [0, 0],
      [0, 7],
      [7, 0],
      [7, 7],
    ],
    q: [
      [0, 3],
      [7, 3],
    ],
  };
  public readonly columnLetters: string[] = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
  ];
  private static instance: Board;
  public controller: BoardController;

  private constructor() {
    this.controller = new BoardController();
    this.createCells();
    this.populateCells();
  }

  static init(): Board {
    if (!Board.instance) {
      Board.instance = new Board();
    }
    return Board.instance;
  }

  private createCells(): void {
    let color: Color = "w";
    for (let row: Row = 0; row < 8; row++) {
      this.cells[row] = [];
      for (let column: Column = 0; column < 8; column++) {
        const coordinate: Coordinate = [row, column] as Coordinate;
        const cell: Cell = new Cell(color, coordinate, this.controller);
        this.cells[row][column] = cell;
        this.controller.addCell(cell);
        if (column !== 7) {
          color = color === "w" ? "b" : "w";
        }
      }
    }
  }

  private populateCells(): void {
    const factory: PieceFactory = new PieceFactory();
    let p: PieceName;
    for (p in this.piecePositionMap) {
      const coordinates: Coordinate[] = this.piecePositionMap[p];
      // eslint-disable-next-line no-loop-func
      coordinates.forEach(([y, x]: Coordinate, index) => {
        const color: Color = index < coordinates.length / 2 ? "b" : "w";
        factory.create(p, color, this.cells[y][x]);
      });
    }
  }

  public getRotatedCells(): Cell[][] {
    const rotated: Cell[][] = [...this.cells].reverse();
    for (let i = 0; i < rotated.length; i++) {
      rotated[i] = [...rotated[i]].reverse();
    }
    return rotated;
  }
}

export default Board;
