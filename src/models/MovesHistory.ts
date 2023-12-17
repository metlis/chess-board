import Move from "models/Move";
import Piece from "models/pieces/Piece";
import { Color } from "types";

type snapshots = { [color in Color]: string[] };

class MovesHistory {
  private stack: Move[] = [];
  private snapshots: snapshots = { b: [], w: [] };
  private pointer: number = -1;

  public get lastMove(): Move {
    return this.stack[this.pointer];
  }

  public addMove(move: Move) {
    this.stack.push(move);
    this.pointer++;
  }

  public removeMove() {
    const move = this.stack.pop();
    if (move) {
      move.undoMove();
      this.pointer--;
    }
  }

  private takePiecesSnapshot(player: Color, pieces: Piece[]): string {
    const sortedPieces = [...pieces].sort((a, b) =>
      a.cell.id.localeCompare(b.cell.id)
    );
    const stripped: object = sortedPieces.map((piece) => ({
      cell: piece.cell.id,
      name: piece.name,
      color: piece.color,
      moved: piece.moved,
      moveOptions: piece.moveOptions
        .map((cell) => cell.id)
        .sort((a, b) => a.localeCompare(b)),
    }));
    const snapshot = JSON.stringify(stripped);
    this.snapshots[player].push(snapshot);
    return snapshot;
  }

  public isThreefoldRepetition(player: Color, pieces: Piece[]): boolean {
    const snapshot = this.takePiecesSnapshot(player, pieces);
    let count = 0;
    this.snapshots[player].forEach((s) => {
      if (s === snapshot) count++;
    });
    return count === 3;
  }
}

export default MovesHistory;
