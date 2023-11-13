import { Piece } from "types/board";
import Cell from "models/Cell";
import Move from "models/Move";
import PromotionPiece from "models/pieces/PromotionPiece";

export type GameEventType =
  | "changePiecesDraggability"
  | "pieceMoved"
  | "promotionOptionSelected"
  | "switchActivePlayer"
  | "pushMove";

export interface GameEventPayload {
  move?: [Piece, Cell] | Move;
  promotion?: PromotionPiece;
}
