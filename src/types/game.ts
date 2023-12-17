import { Piece } from "types/board";
import Cell from "models/Cell";
import Move from "models/Move";
import PromotionPiece from "models/pieces/PromotionPiece";

export const GameEventTypeLiterals = [
  "game:changePiecesDraggability",
  "game:pieceMoved",
  "game:pieceTouched",
  "game:promotionOptionSelected",
  "game:switchActivePlayer",
  "game:pushMove",
  "game:checkMove",
  "game:setCheck",
  "game:setHasMoveOptions",
  "game:cellClicked",
] as const;
export type GameEventType = (typeof GameEventTypeLiterals)[number];

export interface GameEventPayload {
  move?: [Piece, Cell] | Move;
  promotion?: PromotionPiece;
  piece?: Piece;
  cell?: Cell;
}
