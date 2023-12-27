import Move from "models/Move";
import Piece from "models/pieces/Piece";
import King from "models/pieces/King";
import Base from "models/Base";
import Refreshable from "mixins/Refreshable";
import { Color } from "types";

type snapshots = { [color in Color]: string[] };

class MovesHistory extends Refreshable(Base) {
  private stack: Move[] = [];
  private snapshots: snapshots = { b: [], w: [] };
  private pointer: number = -1;

  public get lastMove(): Move {
    return this.stack[this.pointer];
  }

  public addMove(move: Move, showMove: boolean = false) {
    if (showMove) this.switchLastMoveVisibility(true);
    this.stack.push(move);
    this.pointer++;
    if (showMove) {
      this.refreshComponent();
      this.switchLastMoveVisibility();
    }
  }

  private switchLastMoveVisibility(hide = false) {
    if (this.lastMove) {
      this.eventBridge.addEvent("cell:switchState", {
        include: [this.lastMove.from, this.lastMove.to],
        cellState: hide ? "default" : "lastMove",
      });
    }
  }

  public removeMove() {
    const move = this.stack.pop();
    if (move) {
      move.undoMove();
      this.pointer--;
    }
  }

  private takePiecesSnapshot(player: Color, pieces: Piece[]): string {
    const sortedPieces = [...pieces].sort((a, b) =>
      a.cell.id.localeCompare(b.cell.id)
    );
    const stripped: object = sortedPieces.map((piece) => ({
      cell: piece.cell.id,
      name: piece.name,
      color: piece.color,
      moveOptions: piece.moveOptions
        .map((cell) => cell.id)
        .sort((a, b) => a.localeCompare(b)),
      ...(piece instanceof King
        ? {
            longCastlingPossible: piece.longCastlingPossible,
            shortCastlingPossible: piece.shortCastlingPossible,
          }
        : {}),
    }));
    const snapshot = JSON.stringify(stripped);
    this.snapshots[player].push(snapshot);
    return snapshot;
  }

  public isThreefoldRepetition(player: Color, pieces: Piece[]): boolean {
    const snapshot = this.takePiecesSnapshot(player, pieces);
    let count = 0;
    this.snapshots[player].forEach((s) => {
      if (s === snapshot) count++;
    });
    return count === 3;
  }

  public get printable() {
    const moves: [string, string?][] = [];
    let whiteMove: string | null = null;
    let blackMove: string | null = null;

    const constructStr = (move: Move) => {
      if (move.castling) {
        return move.castling === 1 ? "0-0" : "0-0-0";
      }
      let str: string;
      if (move.promotion) {
        str = `${
          move.capture ? move.from.id.replace(/[0-9]/g, "x").toLowerCase() : ""
        }${move.to.id.toLowerCase()}=${move.piece.name.toUpperCase()}`;
      } else if (
        (move.capture && move.piece.name === "p") ||
        move.enPassantCell
      ) {
        str = `${move.from.id
          .replace(/[0-9]/g, "x")
          .toLowerCase()}${move.to.id.toLowerCase()}`;
      } else {
        str = `${move.piece.name.toUpperCase()}${
          move.longNotation
            ? move.from.id.replace(/[0-9]/g, "").toLowerCase()
            : ""
        }${move.capture ? "x" : ""}${move.to.id.toLowerCase()}`;
      }
      if (move.checking) str += "+";
      return str.replace("P", "");
    };

    for (let i = 0; i < this.stack.length; i++) {
      if (!whiteMove) {
        whiteMove = constructStr(this.stack[i]);
        if (i === this.stack.length - 1) moves.push([whiteMove]);
      } else {
        blackMove = constructStr(this.stack[i]);
        moves.push([whiteMove, blackMove]);
        whiteMove = null;
        blackMove = null;
      }
    }
    return moves;
  }
}

export default MovesHistory;
