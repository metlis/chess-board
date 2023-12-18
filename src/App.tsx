import Board from "components/Board";
import Moves from "components/Moves";
import Game from "models/Game";
import "styles/App.sass";

function App() {
  const game: Game = Game.init();

  return (
    <div className="app">
      <div>
        <Board board={game.controller.board} />
      </div>
      <div>
        <Moves history={game.controller.movesHistory} />
      </div>
    </div>
  );
}

export default App;
