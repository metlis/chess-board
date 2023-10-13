import Piece from "models/pieces/Piece";
import { Color } from "types";
import Cell from "models/Cell";

class Knight extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, "n");
  }

  move(): void {
    console.log();
  }

  public getMoveOptions(cell: Cell): Cell[] {
    const cells: Cell[] = [];
    if (!cell.piece) return cells;

    const columns: number[] = [];
    if (cell.coordinate[1] - 1 >= 0) {
      columns.push(cell.coordinate[1] - 1);
    }
    if (cell.coordinate[1] + 1 <= 7) {
      columns.push(cell.coordinate[1] + 1);
    }

    columns.forEach((column) => {
      const rows: number[] = [];
      if (cell.coordinate[0] - 2 >= 0) {
        rows.push(cell.coordinate[0] - 2);
      }
      if (cell.coordinate[0] + 2 <= 7) {
        rows.push(cell.coordinate[0] + 2);
      }

      rows.forEach((row) => {
        const target: Cell | null = cell.controller.getCell([row, column]);
        if (
          target &&
          cell.piece &&
          (target.piece === null || target.piece.color !== cell.piece.color)
        ) {
          cells.push(target);
        }
      });
    });

    return cells;
  }
}

export default Knight;
