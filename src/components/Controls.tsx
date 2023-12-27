import Board from "models/Board";
import "styles/controls.sass";

export default function Controls({ board }: { board: Board }) {
  return (
    <div className="controls">
      <button
        className="button button--rotate"
        onClick={board.onRotate.bind(board)}
      >
        Rotate
      </button>
    </div>
  );
}
