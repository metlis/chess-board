import Pawn from "../classes/pieces/Pawn";
import Bishop from "../classes/pieces/Bishop";
import Knight from "../classes/pieces/Knight";
import Rook from "../classes/pieces/Rook";
import Queen from "../classes/pieces/Queen";
import King from "../classes/pieces/King";

type Color = "B" | "W";
type Coordinate = [
  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7,
  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
];
type Piece = Bishop | King | Knight | Pawn | Rook | Queen;
type PieceAbbreviation = "b" | "k" | "kn" | "p" | "r" | "q";

export type { Color, Coordinate, Piece, PieceAbbreviation };
