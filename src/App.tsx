import Board from "components/Board";
import Moves from "components/Moves";
import Game from "models/Game";
import Controls from "components/Controls";
import "styles/app.sass";

function App() {
  const game: Game = Game.init();

  return (
    <div className="app">
      <Board board={game.controller.board} />
      <div className="sidebar">
        <Moves history={game.controller.movesHistory} />
        <Controls board={game.controller.board} />
      </div>
    </div>
  );
}

export default App;
