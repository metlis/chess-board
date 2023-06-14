import Pawn from "./pieces/Pawn";
import Bishop from "./pieces/Bishop";
import Knight from "./pieces/Knight";
import Rook from "./pieces/Rook";
import Queen from "./pieces/Queen";
import King from "./pieces/King";

type Color = 0 | 1;
type PieceLetter = "b" | "k" | "kn" | "p" | "q" | "r";
type Piece = Bishop | King | Knight | Pawn | Rook | Queen;
type Coordinate = [
  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7,
  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
];

export type { Color, Coordinate, Piece, PieceLetter };
