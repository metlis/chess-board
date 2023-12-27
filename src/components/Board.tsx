import BoardModel from "models/Board";
import CellModel from "models/Cell";
import Row from "components/Row";
import Cell from "components/Cell";
import "styles/Board.sass";
import useComponentRefresh from "hooks/useComponentRefresh";

export default function Board({ board }: { board: BoardModel }) {
  useComponentRefresh(board.componentRefresh);

  function getRowNum(index: number): number {
    if (board.colorOnTop === "b") {
      return 9 - (index + 1);
    } else {
      return index + 1;
    }
  }

  return (
    <>
      <div className="board">
        {board.cellGrid.map((_row: CellModel[], index: number) => (
          <Row
            key={getRowNum(index)}
            number={getRowNum(index)}
            colorOnTop={board.colorOnTop}
          >
            {board.cellGrid[index].map((cell: CellModel, idx: number) => (
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
            {(board.colorOnTop === "b"
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
    </>
  );
}
