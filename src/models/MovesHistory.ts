import Move from "models/Move";

class MovesHistory {
  private stack: Move[] = [];
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
}

export default MovesHistory;
