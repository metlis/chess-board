import type {
  Color,
  Piece,
  Coordinate,
  CellEventPayload,
  CellEventType,
  ComponentRefresh,
} from "types";
import BoardController from "controllers/BoardController";

class Cell {
  private controller: BoardController;
  public readonly color: Color;
  public readonly coordinate: Coordinate;
  public piece: Piece | null;
  public draggable: boolean = true;
  public componentRefresh: ComponentRefresh = {};

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
        this.onSetDraggable(this.refreshComponent.bind(this));
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

  private onSetDraggable(callback: Function = () => null): void {
    this.draggable = !this.draggable;
    callback();
  }

  private refreshComponent() {
    if (this.componentRefresh.setVal) {
      this.componentRefresh.setVal(!this.componentRefresh.val);
    }
  }
}

export default Cell;
