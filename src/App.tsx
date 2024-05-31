import Board from "components/Board";
import Moves from "components/Moves";
import Game from "chess_controller/src/models/Game";
import Controls from "components/Controls";
import { useState } from "react";
import "styles/app.sass";

function App() {
  const [game, setGame] = useState<Game>(new Game());

  const startNewGame = () => {
    setGame(new Game());
  };

  return (
    <div className="app">
      <Board board={game.controller.board} />
      <div className="sidebar">
        <Moves history={game.controller.movesHistory} />
        <Controls board={game.controller.board} startNewGame={startNewGame} />
      </div>
    </div>
  );
}

export default App;
