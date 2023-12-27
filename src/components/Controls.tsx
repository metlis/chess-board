import Board from "models/Board";
import "styles/controls.sass";
import { FaRotate, FaCopy } from "react-icons/fa6";

export default function Controls({ board }: { board: Board }) {
  return (
    <div className="controls">
      <div className="controls__row controls__row--rewind">
        <button title="First">&lt;&lt;</button>
        <button title="Previous">&lt;</button>
        <button title="Next">&gt;</button>
        <button title="Last">&gt;&gt;</button>
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
