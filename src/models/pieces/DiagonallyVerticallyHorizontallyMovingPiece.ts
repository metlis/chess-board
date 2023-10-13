import Piece from "models/pieces/Piece";
import Cell from "models/Cell";

abstract class DiagonallyVerticallyHorizontallyMovingPiece extends Piece {
  private targetReachable(target: Cell, start: Cell): boolean {
    return !target.piece || target.piece.color !== start.piece?.color;
  }

  protected getDiagonalMoveOptions(cell: Cell): Cell[] {
    const cells: Cell[] = [];
    if (!cell.piece) return cells;

    const topLeft: [number, number] = [
      cell.coordinate[0] - 1,
      cell.coordinate[1] - 1,
    ];
    while (topLeft[0] >= 0 && topLeft[1] >= 0) {
      const target = cell.controller.getCell(topLeft);
      if (target && this.targetReachable(target, cell)) cells.push(target);
      if (target?.piece) break;
      topLeft[0] = topLeft[0] - 1;
      topLeft[1] = topLeft[1] - 1;
    }

    const topRight: [number, number] = [
      cell.coordinate[0] - 1,
      cell.coordinate[1] + 1,
    ];
    while (topRight[0] >= 0 && topRight[1] <= 7) {
      const target = cell.controller.getCell(topRight);
      if (target && this.targetReachable(target, cell)) cells.push(target);
      if (target?.piece) break;
      topRight[0] = topRight[0] - 1;
      topRight[1] = topRight[1] + 1;
    }

    const bottomRight: [number, number] = [
      cell.coordinate[0] + 1,
      cell.coordinate[1] + 1,
    ];
    while (bottomRight[0] <= 7 && bottomRight[1] <= 7) {
      const target = cell.controller.getCell(bottomRight);
      if (target && this.targetReachable(target, cell)) cells.push(target);
      if (target?.piece) break;
      bottomRight[0] = bottomRight[0] + 1;
      bottomRight[1] = bottomRight[1] + 1;
    }

    const bottomLeft: [number, number] = [
      cell.coordinate[0] + 1,
      cell.coordinate[1] - 1,
    ];
    while (bottomLeft[0] <= 7 && bottomLeft[1] >= 0) {
      const target = cell.controller.getCell(bottomLeft);
      if (target && this.targetReachable(target, cell)) cells.push(target);
      if (target?.piece) break;
      bottomLeft[0] = bottomLeft[0] + 1;
      bottomLeft[1] = bottomLeft[1] - 1;
    }

    return cells;
  }

  protected getVerticalHorizontalMoveOptions(cell: Cell): Cell[] {
    const cells: Cell[] = [];
    if (!cell.piece) return cells;

    let top = cell.coordinate[0] - 1;
    while (top >= 0) {
      const target = cell.controller.getCell([top, cell.coordinate[1]]);
      if (target && this.targetReachable(target, cell)) cells.push(target);
      if (target?.piece) break;
      top--;
    }

    let bottom = cell.coordinate[0] + 1;
    while (bottom <= 7) {
      const target = cell.controller.getCell([bottom, cell.coordinate[1]]);
      if (target && this.targetReachable(target, cell)) cells.push(target);
      if (target?.piece) break;
      bottom++;
    }

    let left = cell.coordinate[1] - 1;
    while (left >= 0) {
      const target = cell.controller.getCell([cell.coordinate[0], left]);
      if (target && this.targetReachable(target, cell)) cells.push(target);
      if (target?.piece) break;
      left--;
    }

    let right = cell.coordinate[1] + 1;
    while (right <= 7) {
      const target = cell.controller.getCell([cell.coordinate[0], right]);
      if (target && this.targetReachable(target, cell)) cells.push(target);
      if (target?.piece) break;
      right++;
    }

    return [];
  }
}

export default DiagonallyVerticallyHorizontallyMovingPiece;
