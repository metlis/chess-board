import Piece from "./Piece";
import { Color } from "../../types";
import Cell from "../Cell";

class Bishop extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, "b");
  }

  move(): void {
    console.log();
  }
}

export default Bishop;
