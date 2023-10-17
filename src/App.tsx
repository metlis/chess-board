import Board from "components/Board";
import Game from "models/Game";
import "styles/App.sass";

function App() {
  const game: Game = Game.init();

  return (
    <div className="App">
      <Board board={game.board} />
    </div>
  );
}

export default App;
