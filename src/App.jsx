import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/Gameboard";
function App() {
  const [ activePlayer, setActivePlayer ] = useState('X');
  
  function handleSelectSquare() {
    setActivePlayer((currActivePlayer)=> currActivePlayer === 'X' ? 'O':'X');
  }
  
  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player isActive={activePlayer==='X'} initialName="Player 1" symbol="X"/>
        <Player isActive={activePlayer==='O'} initialName="Player 2" symbol="O"/>
      </ol>
      <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}/>
    </div>
  </main>
}

export default App
