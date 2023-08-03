import type {
  Color,
  Piece,
  Coordinate,
  CellEventPayload,
  CellEventType,
} from "types";
import BoardController from "controllers/BoardController";
import React from "react";

type component = {
  setDraggable?: React.Dispatch<React.SetStateAction<boolean>>;
};

class Cell {
  private controller: BoardController;
  public readonly color: Color;
  public readonly coordinate: Coordinate;
  public piece: Piece | null;
  public draggable: boolean = true;
  public component: component = {};

  constructor(
    color: Color,
    coordinate: Coordinate,
    controller: BoardController
  ) {
    this.color = color;
    this.coordinate = coordinate;
    this.piece = null;
    this.controller = controller;
  }

  private dispatch(event: CellEventType, payload: CellEventPayload = {}): void {
    this.controller.on(event, payload);
  }

  public on(event: CellEventType, payload: CellEventPayload = {}): void {
    switch (event) {
      case "setDraggable":
        this.onSetDraggable();
        break;
      default:
        throw new Error("Invalid event name");
    }
  }

  public onDragStart(): void {
    this.dispatch("setDraggable", { exclude: [this] });
  }

  public onDragStop(): void {
    this.dispatch("setDraggable", { exclude: [this] });
  }

  private onSetDraggable(): void {
    this.draggable = !this.draggable;
    if (this.component.setDraggable) {
      this.component.setDraggable(this.draggable);
    }
  }
}

export default Cell;
