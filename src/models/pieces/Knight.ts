import Piece from "models/pieces/Piece";
import { Color } from "types";
import Cell from "models/Cell";

class Knight extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, "n");
  }

  public getMoveOptions(): Cell[] {
    const cells: Cell[] = [];

    const columns: number[] = [];
    if (this.cell.coordinate[1] - 1 >= 0) {
      columns.push(this.cell.coordinate[1] - 1);
    }
    if (this.cell.coordinate[1] + 1 <= 7) {
      columns.push(this.cell.coordinate[1] + 1);
    }

    columns.forEach((column) => {
      const rows: number[] = [];
      if (this.cell.coordinate[0] - 2 >= 0) {
        rows.push(this.cell.coordinate[0] - 2);
      }
      if (this.cell.coordinate[0] + 2 <= 7) {
        rows.push(this.cell.coordinate[0] + 2);
      }

      rows.forEach((row) => {
        const target: Cell | null = this.board.getCell([row, column]);
        if (
          target &&
          this.cell.piece &&
          (target.piece === null ||
            target.piece.color !== this.cell.piece.color)
        ) {
          cells.push(target);
        }
      });
    });

    this.moveOptions = cells;
    return cells;
  }
}

export default Knight;
