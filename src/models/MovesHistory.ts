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
}

export default MovesHistory;
