import Board from "chess_controller/src/models/Board";
import "styles/controls.sass";
import { FaRotate, FaCopy, FaStop } from "react-icons/fa6";

type ControlsProps = { board: Board; startNewGame: Function };

export default function Controls({ board, startNewGame }: ControlsProps) {
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
        <button title="Copy moves" onClick={history.copyMoves.bind(history)}>
          <FaCopy />
        </button>
        <button title="Stop game" onClick={() => startNewGame()}>
          <FaStop />
        </button>
      </div>
    </div>
  );
}
