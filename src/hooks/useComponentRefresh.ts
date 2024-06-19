import { useState } from "react";
import Base from "chess_controller/src/models/Base";
import Board from "chess_controller/src/models/Board";

type refreshEvent =
  | "board:init"
  | "board:rotate"
  | "cell:update"
  | "piece:update"
  | "history:update";

/*
  Used to trigger component update from object instance
*/
export default function useComponentRefresh(model: Base | Board) {
  const [val, setVal] = useState(true);

  function refresh(eventType: refreshEvent) {
    if (!eventType) return;
    setVal(!val);
  }

  model.hook = refresh;
}
