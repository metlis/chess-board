import { useState } from "react";
import BoardModel from "models/Board";
import CellModel from "models/Cell";
import Row from "components/Row";
import Cell from "components/Cell";
import type { Color } from "types";
import "styles/Board.sass";
import useComponentRefresh from "hooks/useComponentRefresh";

export default function Board({ board }: { board: BoardModel }) {
  useComponentRefresh(board.componentRefresh);

  const [colorOnTop, setColorOnTop] = useState<Color>(board.colorOnTop);

  const [cells, setCells] = useState(board.cellGrid);

  const onRotate = () => {
    board.colorOnTop = board.colorOnTop === "b" ? "w" : "b";
    setColorOnTop(board.colorOnTop);
    setCells(board.rotateBoard());
  };

  function getRowNum(index: number): number {
    if (colorOnTop === "b") {
      return 9 - (index + 1);
    } else {
      return index + 1;
    }
  }

  return (
    <>
      <div className="board">
        {cells.map((_row: CellModel[], index: number) => (
          <Row
            key={getRowNum(index)}
            number={getRowNum(index)}
            colorOnTop={colorOnTop}
          >
            {cells[index].map((cell: CellModel, idx: number) => (
              <Cell
                key={`${getRowNum(index)}-${idx + 1}`}
                number={idx + 1}
                rowNumber={getRowNum(index)}
                cell={cell}
              />
            ))}
          </Row>
        ))}
        <div className="row">
          <div className="row__cells row__cells--letters">
            {(colorOnTop === "b"
              ? board.columnLetters
              : [...board.columnLetters].reverse()
            ).map((i) => (
              <div className="row__cell" key={i}>
                {i}
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className="button button--rotate" onClick={onRotate}>
        Rotate
      </button>
    </>
  );
}
