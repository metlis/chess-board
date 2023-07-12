import { useState, useMemo } from "react";
import BoardClass from "../classes/Board";
import Cell from "../classes/Cell";
import type { Color } from "../classes/types";

export default function Board() {
  const board: BoardClass = BoardClass.init();

  const [colorOnTop, setColorOnTop] = useState<Color>("B");
  const cells: Cell[][] = useMemo(() => {
    if (colorOnTop === "B") {
      return [...board.cells].reverse();
    } else {
      return [...board.cells];
    }
  }, [board.cells, colorOnTop]);

  function getRowNum(index: number): number {
    if (colorOnTop === "B") {
      return 9 - (index + 1);
    } else {
      return index + 1;
    }
  }

  return (
    <>
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
    </>
  );
}
