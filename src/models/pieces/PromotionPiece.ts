import type { Color, PieceImage, PieceName } from "types";
import EventBridge from "controllers/EventBridge";

class PromotionPiece {
  public color: Color;
  public name: PieceName;
  public image: PieceImage;
  public eventBridge: EventBridge;

  public constructor(color: Color, name: PieceName, eventBridge: EventBridge) {
    this.color = color;
    this.name = name;
    this.image = `${name}_${color}.svg`;
    this.eventBridge = eventBridge;
  }

  public onSelected() {
    this.eventBridge.addEvent("promotionOptionSelected", { promotion: this });
  }
}

export default PromotionPiece;
