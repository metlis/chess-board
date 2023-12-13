import { Piece } from "types/board";
import Cell from "models/Cell";
import Move from "models/Move";
import PromotionPiece from "models/pieces/PromotionPiece";

export const GameEventTypeLiterals = [
  "changePiecesDraggability",
  "pieceMoved",
  "promotionOptionSelected",
  "switchActivePlayer",
  "pushMove",
  "checkMove",
  "setCheck",
  "setHasMoveOptions",
] as const;
export type GameEventType = (typeof GameEventTypeLiterals)[number];

export interface GameEventPayload {
  move?: [Piece, Cell] | Move;
  promotion?: PromotionPiece;
}
