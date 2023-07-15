import { useState, useMemo } from "react";
import BoardClass from "../classes/Board";
import CellClass from "../classes/Cell";
import Row from "./Row";
import Cell from "./Cell";
import type { Color } from "../types";

export default function Board() {
  const board: BoardClass = BoardClass.init();

  const [colorOnTop, setColorOnTop] = useState<Color>("b");
  const cells: CellClass[][] = useMemo(() => {
    if (colorOnTop === "b") {
      return [...board.cells].reverse();
    } else {
      return [...board.cells];
    }
  }, [board.cells, colorOnTop]);

  function getRowNum(index: number): number {
    if (colorOnTop === "b") {
      return 9 - (index + 1);
    } else {
      return index + 1;
    }
  }

  return (
    <>
      {cells.map((row: CellClass[], index: number) => (
        <Row key={getRowNum(index)} number={getRowNum(index)}>
          {cells[index].map((cell: CellClass, idx: number) => (
            <Cell number={idx + 1} rowNumber={getRowNum(index)} cell={cell} />
          ))}
        </Row>
      ))}
    </>
  );
}
