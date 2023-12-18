import MovesHistory from "models/MovesHistory";
import useComponentRefresh from "hooks/useComponentRefresh";
import "styles/Moves.sass";

function Moves({ history }: { history: MovesHistory }) {
  useComponentRefresh(history.componentRefresh);

  return (
    <div className="moves">
      {history.printable.map((move, index) => (
        <div key={index} className="moves__move">
          <div className="moves__move__number">{index + 1}.</div>
          <div className="moves__move__half">{move[0]}</div>
          {move[1] ? <div className="moves__move__half">{move[1]}</div> : ""}
        </div>
      ))}
    </div>
  );
}

export default Moves;
