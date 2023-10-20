import React from "react";
import Pawn from "models/pieces/Pawn";
import Bishop from "models/pieces/Bishop";
import Knight from "models/pieces/Knight";
import Rook from "models/pieces/Rook";
import Queen from "models/pieces/Queen";
import King from "models/pieces/King";
import Cell from "models/Cell";

export type Color = "b" | "w";
export type Row = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type Column = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type Coordinate = [Row, Column];
export type Piece = Bishop | King | Knight | Pawn | Rook | Queen;
export type PieceName = "b" | "k" | "n" | "p" | "r" | "q";
export type PieceImage = `${PieceName}_${Color}.svg`;

export type CellEventType =
  | "changePieceDraggability"
  | "getPieceMoveOptions"
  | "movePiece";

export type CellEventPayload = {
  exclude?: Cell[];
  include?: Cell[];
  source?: {
    from: Cell;
    to?: Cell;
  };
};

export type ComponentRefresh = {
  val?: boolean;
  setVal?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type PiecesCoordinates = {
  [key in PieceName]: Coordinate[];
};
