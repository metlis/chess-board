import type { Color, PieceImage, PieceName } from "types";
import GameController from "controllers/GameController";

class PromotionPiece {
  public color: Color;
  public name: PieceName;
  public image: PieceImage;
  public controller: GameController;

  public constructor(
    color: Color,
    name: PieceName,
    controller: GameController
  ) {
    this.color = color;
    this.name = name;
    this.image = `${name}_${color}.svg`;
    this.controller = controller;
  }

  public onSelected() {
    this.controller.addEvent("promotionOptionSelected", { promotion: this });
  }
}

export default PromotionPiece;
