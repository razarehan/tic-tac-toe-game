import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/Gameboard";
import Log from "./components/Log";
function App() {
  const [ gameTurns, setGameTurns ] = useState([]);
  const [ activePlayer, setActivePlayer ] = useState('X');
  
  function handleSelectSquare(row, col) {
    // this state for Player component
    setActivePlayer((currActivePlayer)=> currActivePlayer === 'X' ? 'O':'X');
    
    // this state for GameBoard component
    setGameTurns((prevTurn) => {
      let currentPlayer = "X";
      
      if(prevTurn.length > 0 && prevTurn[0].player === "X") {
        currentPlayer = "O";
      }

      const updatedTurns = [{square: {row, col}, player: currentPlayer}, ...prevTurn];
      
      return updatedTurns;
    })
  }
  
  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player isActive={activePlayer==='X'} initialName="Player 1" symbol="X"/>
        <Player isActive={activePlayer==='O'} initialName="Player 2" symbol="O"/>
      </ol>
      <GameBoard onSelectSquare={ handleSelectSquare }
        turns={ gameTurns }/>
    </div>
    <Log turns={gameTurns} />
  </main>
}

export default App
