import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./WINNING_COMBINATIONS"

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if(gameTurns.length > 0 && gameTurns[0].player=="X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [ gameTurns, setGameTurns ] = useState([]);
  const activePlayer = derivedActivePlayer(gameTurns);
  let winner = null;

  function handleSelectSquare(row, col) {
    setGameTurns((prevTurn) => {
      const currentPlayer = derivedActivePlayer(prevTurn);

      const updatedTurns = [{square: {row, col}, player: currentPlayer}, ...prevTurn];
      
      return updatedTurns;
    })
  }
  
  let myGameBoard = [...initialGameBoard.map(innerArray=>[...innerArray])];
    
  for(const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;

      myGameBoard[row][col] = player;
  }

  for(const comination of WINNING_COMBINATIONS) {
    const firstCell = myGameBoard[comination[0].row][comination[0].column];
    const secondCell = myGameBoard[comination[1].row][comination[1].column];
    const thirdCell = myGameBoard[comination[2].row][comination[2].column];
    
    if(firstCell && firstCell === secondCell && secondCell === thirdCell) {
      winner = firstCell;
    }
  }

  function handleRestart() {
    setGameTurns([]);
  }

  const hasDraw = gameTurns.length ===9 && !winner;
  return <main>
    <div id="game-container">
      {(winner || hasDraw) && <GameOver winner={winner} onRstart={handleRestart}/>}
      <ol id="players" className="highlight-player">
        <Player isActive={activePlayer==='X'} initialName="Player 1" symbol="X"/>
        <Player isActive={activePlayer==='O'} initialName="Player 2" symbol="O"/>
      </ol>
      <GameBoard onSelectSquare={ handleSelectSquare }
        board={ myGameBoard }/>
    </div>
    <Log turns={gameTurns} />
  </main>
}

export default App
