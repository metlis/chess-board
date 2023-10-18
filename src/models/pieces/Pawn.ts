import Piece from "models/pieces/Piece";
import { Color } from "types";
import Cell from "models/Cell";

class Pawn extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, "p");
  }

  private get movingUp(): boolean {
    return this.color !== this.controller.board.colorOnTop;
  }

  getMoveOptions(): Cell[] {
    const cells: Cell[] = [];

    const left = this.controller.getCell([
      this.cell.coordinate[0] + 1 * (this.movingUp ? -1 : 1),
      this.cell.coordinate[1] - 1,
    ]);
    if (left && left.piece && left.piece.color !== this.color) {
      cells.push(left);
    }

    const singleStraight = this.controller.getCell([
      this.cell.coordinate[0] + 1 * (this.movingUp ? -1 : 1),
      this.cell.coordinate[1],
    ]);
    if (singleStraight && !singleStraight.piece) {
      cells.push(singleStraight);
    }

    const doubleStraight = this.controller.getCell([
      this.cell.coordinate[0] + 2 * (this.movingUp ? -1 : 1),
      this.cell.coordinate[1],
    ]);
    if (doubleStraight && !this.moved && !doubleStraight.piece) {
      cells.push(doubleStraight);
    }

    const right = this.controller.getCell([
      this.cell.coordinate[0] + 1 * (this.movingUp ? -1 : 1),
      this.cell.coordinate[1] + 1,
    ]);
    if (right && right.piece && right.piece.color !== this.color) {
      cells.push(right);
    }

    this.moveOptions = cells;
    return cells;
  }
}

export default Pawn;
