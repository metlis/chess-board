import Cell from "./Cell";
import PieceFactory from "./PieceFactory";
import type { Color, Coordinate, PieceAbbreviation } from "./types";

interface piecePosition {
  b: Coordinate[];
  k: Coordinate[];
  kn: Coordinate[];
  p: Coordinate[];
  r: Coordinate[];
  q: Coordinate[];
}

class Board {
  public readonly cells: Cell[][] = [];
  private readonly piecePositionMap: piecePosition = {
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
    kn: [
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
  private static instance: Board;

  private constructor() {
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
    let color: Color = "B";
    for (let i = 0; i < 8; i++) {
      this.cells[i] = [];
      for (let y = 0; y < 8; y++) {
        this.cells[i][y] = new Cell(color);
        color = color === "B" ? "W" : "B";
      }
    }
  }

  private populateCells(): void {
    const factory: PieceFactory = new PieceFactory();
    let p: PieceAbbreviation;
    for (p in this.piecePositionMap) {
      const coordinates: Coordinate[] = this.piecePositionMap[p];
      // eslint-disable-next-line no-loop-func
      coordinates.forEach(([y, x]: Coordinate, index) => {
        const color: Color = index < coordinates.length / 2 ? "B" : "W";
        factory.create(p, color, this.cells[y][x]);
      });
    }
  }
}

export default Board;
