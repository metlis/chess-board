import { ComponentRefresh } from "types";

class BaseComponent {
  public componentRefresh: ComponentRefresh = {};

  public refreshComponent(): void {
    if (this.componentRefresh.setVal) {
      this.componentRefresh.setVal(!this.componentRefresh.val);
    }
  }
}

export default BaseComponent;
