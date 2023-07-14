import Piece from "./Piece";
import { Color } from "../../types";
import Cell from "../Cell";

class Knight extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, "kn");
  }

  move(): void {
    console.log();
  }
}

export default Knight;
