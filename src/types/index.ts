import Pawn from "models/pieces/Pawn";
import Bishop from "models/pieces/Bishop";
import Knight from "models/pieces/Knight";
import Rook from "models/pieces/Rook";
import Queen from "models/pieces/Queen";
import King from "models/pieces/King";

export type Color = "b" | "w";
export type Coordinate = [
  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7,
  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
];
export type Piece = Bishop | King | Knight | Pawn | Rook | Queen;
export type PieceName = "b" | "k" | "kn" | "p" | "r" | "q";
export type PieceImage = `${PieceName}_${Color}.svg`;
