import type {
  Color,
  Piece,
  Coordinate,
  CellEventPayload,
  CellEventType,
} from "types";
import BoardController from "controllers/BoardController";

class Cell {
  private controller: BoardController;
  public readonly color: Color;
  public readonly coordinate: Coordinate;
  public piece: Piece | null;
  public draggable = true;

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
      case "switchDraggable":
        this.onSwitchDraggable();
        break;
      default:
        throw new Error("Invalid event name");
    }
  }

  public onDragStart(): void {
    this.dispatch("switchDraggable", { exclude: [this] });
  }

  public onDragStop(): void {
    this.dispatch("switchDraggable", { exclude: [this] });
  }

  private onSwitchDraggable(): void {
    this.draggable = !this.draggable;
  }
}

export default Cell;
