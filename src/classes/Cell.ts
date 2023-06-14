import { Color } from "./types";

class Cell {
  public white: boolean;

  constructor(color: Color) {
    this.white = Boolean(color);
  }
}

export default Cell;
