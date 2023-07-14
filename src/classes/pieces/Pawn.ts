import Piece from "./Piece";
import { Color } from "../../types";
import Cell from "../Cell";

class Pawn extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, "p");
  }

  move(): void {
    console.log();
  }
}

export default Pawn;
