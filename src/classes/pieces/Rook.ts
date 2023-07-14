import Piece from "./Piece";
import { Color } from "../../types";
import Cell from "../Cell";

class Rook extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, "r");
  }

  move(): void {
    console.log();
  }
}

export default Rook;
