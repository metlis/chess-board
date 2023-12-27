import Board from "models/Board";

export default function Controls({ board }: { board: Board }) {
  return (
    <>
      <button
        className="button button--rotate"
        onClick={board.onRotate.bind(board)}
      >
        Rotate
      </button>
    </>
  );
}
