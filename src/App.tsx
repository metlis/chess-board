import React from "react";
import { useState, useMemo } from "react";
import Desk from "./classes/Desk";
import Cell from "./classes/Cell";
import type { Color } from "./classes/types";
import "./App.css";

function App() {
  const desk: Desk = Desk.init();

  const [color, setColor] = useState<Color>(0);
  const cells: Cell[][] = useMemo(() => {
    if (color === 0) {
      return [...desk.cells].reverse();
    } else {
      return [...desk.cells];
    }
  }, [desk.cells, color]);

  function getRowNum(index: number): number {
    if (color === 0) {
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
                key={`${cell.white ? "W" : "B"}-${getRowNum(index)}-${idx + 1}`}
              >
                {`${cell.white ? "W" : "B"}-${getRowNum(index)}-${idx + 1}`}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
