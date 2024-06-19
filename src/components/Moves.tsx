import MovesHistory from "chess_controller/src/models/MovesHistory";
import useComponentRefresh from "hooks/useComponentRefresh";
import { useRef, useEffect } from "react";
import "styles/moves.sass";

function Moves({ history }: { history: MovesHistory }) {
  useComponentRefresh(history);

  const movesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (movesRef.current) {
      movesRef.current.scrollTop = movesRef.current.scrollHeight;
    }
  });

  const result =
    history.winner !== undefined ? (
      history.winner === null ? (
        <div className="result">
          <div>1/2</div>
          <div>1/2</div>
        </div>
      ) : (
        <div className="result">
          <div>{history.winner === "w" ? "1" : "0"}</div>
          <div>{history.winner === "w" ? "0" : "1"}</div>
        </div>
      )
    ) : (
      ""
    );

  return (
    <div className="moves" ref={movesRef}>
      {history.printableMoves.map((move, index) => (
        <div key={index} className="moves__move">
          <div
            className={`moves__move__number ${
              history.visibleMoveNo === index
                ? "moves__move__number--active"
                : ""
            }`}
          >
            {index + 1}.
          </div>
          <div
            className={`moves__move__half ${
              history.visibleMoveNo === index && history.lastMoveIsWhite
                ? "moves__move__half--active"
                : ""
            }`}
          >
            {move[0]}
          </div>
          <div
            className={`moves__move__half ${
              history.visibleMoveNo === index && !history.lastMoveIsWhite
                ? "moves__move__half--active"
                : ""
            }`}
          >
            {move[1] ? move[1] : ""}
          </div>
        </div>
      ))}
      {result}
    </div>
  );
}

export default Moves;
