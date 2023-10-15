import Piece from "models/pieces/Piece";
import { Color } from "types";
import Cell from "models/Cell";

class King extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, "k");
  }

  private targetReachable(target: Cell): boolean {
    return !target.piece || target.piece.color !== this.color;
  }

  getMoveOptions(): Cell[] {
    const cells: Cell[] = [];

    const top = this.controller.getCell([
      this.cell.coordinate[0] + 1,
      this.cell.coordinate[1],
    ]);
    if (top && this.targetReachable(top)) cells.push(top);

    const bottom = this.controller.getCell([
      this.cell.coordinate[0] - 1,
      this.cell.coordinate[1],
    ]);
    if (bottom && this.targetReachable(bottom)) cells.push(bottom);

    const left = this.controller.getCell([
      this.cell.coordinate[0],
      this.cell.coordinate[1] - 1,
    ]);
    if (left && this.targetReachable(left)) cells.push(left);

    const right = this.controller.getCell([
      this.cell.coordinate[0],
      this.cell.coordinate[1] + 1,
    ]);
    if (right && this.targetReachable(right)) cells.push(right);

    const leftTop = this.controller.getCell([
      this.cell.coordinate[0] - 1,
      this.cell.coordinate[1] - 1,
    ]);
    if (leftTop && this.targetReachable(leftTop)) cells.push(leftTop);

    const rightTop = this.controller.getCell([
      this.cell.coordinate[0] - 1,
      this.cell.coordinate[1] + 1,
    ]);
    if (rightTop && this.targetReachable(rightTop)) cells.push(rightTop);

    const leftBottom = this.controller.getCell([
      this.cell.coordinate[0] + 1,
      this.cell.coordinate[1] - 1,
    ]);
    if (leftBottom && this.targetReachable(leftBottom)) cells.push(leftBottom);

    const rightBottom = this.controller.getCell([
      this.cell.coordinate[0] + 1,
      this.cell.coordinate[1] + 1,
    ]);
    if (rightBottom && this.targetReachable(rightBottom))
      cells.push(rightBottom);

    return cells;
  }
}

export default King;
