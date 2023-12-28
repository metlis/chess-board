import Board from "models/Board";
import "styles/controls.sass";
import { FaRotate, FaCopy } from "react-icons/fa6";

export default function Controls({ board }: { board: Board }) {
  const history = board.game.controller.movesHistory;
  return (
    <div className="controls">
      <div className="controls__row controls__row--rewind">
        <button title="First" onClick={history.goToStart.bind(history)}>
          &lt;&lt;
        </button>
        <button title="Previous" onClick={history.goBack.bind(history)}>
          &lt;
        </button>
        <button title="Next" onClick={history.goForward.bind(history)}>
          &gt;
        </button>
        <button title="Last" onClick={history.goToEnd.bind(history)}>
          &gt;&gt;
        </button>
      </div>
      <div className="controls__row controls__row--actions">
        <button
          className="button button--rotate"
          onClick={board.onRotate.bind(board)}
          title="Rotate board"
        >
          <FaRotate />
        </button>
        <button title="Copy moves">
          <FaCopy />
        </button>
      </div>
    </div>
  );
}
