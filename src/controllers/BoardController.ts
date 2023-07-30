import Cell from "models/Cell";
import { CellEventType, CellEventPayload } from "types";

class BoardController {
  public cells: Cell[] = [];

  public addCell(cell: Cell): void {
    this.cells.push(cell);
  }

  private dispatch(
    event: CellEventType,
    cells: Cell[],
    payload: CellEventPayload = {}
  ): void {
    cells.forEach((cell: Cell) => cell.on(event, payload));
  }

  public on(event: CellEventType, payload: CellEventPayload = {}): void {
    switch (event) {
      case "switchDraggable":
        this.switchDraggable(payload);
        break;
      default:
        throw new Error("Invalid event name");
    }
  }

  private switchDraggable(payload: CellEventPayload = {}): void {
    const filtered: Cell[] = this.cells.filter(
      (cell: Cell) => !(payload.exclude || []).includes(cell)
    );
    this.dispatch("switchDraggable", filtered);
  }
}

export default BoardController;
