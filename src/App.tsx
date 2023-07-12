import React from "react";
import { useState, useMemo } from "react";
import Board from "./classes/Board";
import Cell from "./classes/Cell";
import type { Color } from "./classes/types";
import "./App.css";

function App() {
  const board: Board = Board.init();

  const [color, setColor] = useState<Color>("B");
  const cells: Cell[][] = useMemo(() => {
    if (color === "B") {
      return [...board.cells].reverse();
    } else {
      return [...board.cells];
    }
  }, [board.cells, color]);

  function getRowNum(index: number): number {
    if (color === "B") {
      return 9 - (index + 1);
    } else {
      return index + 1;
    }
  }

  return (
    <div className="App">
      {cells.map((row: Cell[], index: number) => (
        <div className="row" key={getRowNum(index)}>
          <div className="row__number">{getRowNum(index)}</div>
          <div className="row__cells">
            {cells[index].map((cell: Cell, idx: number) => (
              <div
                className="row__cell"
                key={`${cell.color}-${getRowNum(index)}-${idx + 1}`}
              >
                {`${cell.color}-${getRowNum(index)}-${idx + 1}`}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
