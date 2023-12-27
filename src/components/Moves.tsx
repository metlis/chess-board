import MovesHistory from "models/MovesHistory";
import useComponentRefresh from "hooks/useComponentRefresh";
import "styles/Moves.sass";

function Moves({ history }: { history: MovesHistory }) {
  useComponentRefresh(history.componentRefresh);

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
    <div className="moves">
      {history.printableMoves.map((move, index) => (
        <div key={index} className="moves__move">
          <div className="moves__move__number">{index + 1}.</div>
          <div className="moves__move__half">{move[0]}</div>
          {move[1] ? <div className="moves__move__half">{move[1]}</div> : ""}
        </div>
      ))}
      {result}
    </div>
  );
}

export default Moves;
