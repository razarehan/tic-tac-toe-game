import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./WINNING_COMBINATIONS"

const PLAYER = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
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

function derivedGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(innerArray=>[...innerArray])];

  for(const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard
}

function derivedWinner(gameBoard, player) {
  let winner;

  for(const comination of WINNING_COMBINATIONS) {
    const firstCell = gameBoard[comination[0].row][comination[0].column];
    const secondCell = gameBoard[comination[1].row][comination[1].column];
    const thirdCell = gameBoard[comination[2].row][comination[2].column];
    
    if(firstCell && firstCell === secondCell && secondCell === thirdCell) {
      winner = player[firstCell];
    }
  }
  
  return winner;
}

function App() {
  const [ gameTurns, setGameTurns ] = useState([]);
  const [ players, setPlayers ] = useState(PLAYER);

  const activePlayer = derivedActivePlayer(gameTurns);

  function handleSelectSquare(row, col) {
    setGameTurns((prevTurn) => {
      const currentPlayer = derivedActivePlayer(prevTurn);

      const updatedTurns = [{square: {row, col}, player: currentPlayer}, ...prevTurn];
      
      return updatedTurns;
    })
  }
  
  const myGameBoard = derivedGameBoard(gameTurns);


  const winner = derivedWinner(myGameBoard, players);

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers=>{
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  const hasDraw = gameTurns.length ===9 && !winner;
  return <main>
    <div id="game-container">
      {(winner || hasDraw) && <GameOver winner={winner} onRstart={handleRestart}/>}
      <ol id="players" className="highlight-player">
        <Player onSave={handlePlayerNameChange} isActive={activePlayer==='X'} initialName={PLAYER.X} symbol="X"/>
        <Player onSave={handlePlayerNameChange} isActive={activePlayer==='O'} initialName={PLAYER.O} symbol="O"/>
      </ol>
      <GameBoard onSelectSquare={ handleSelectSquare }
        board={ myGameBoard }/>
    </div>
    <Log turns={gameTurns} />
  </main>
}

export default App
