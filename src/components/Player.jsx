import { useState } from "react"

export default function Player({ initialName, symbol, isActive }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);
    let playerNameContainer;
    if (isEditing) {
        playerNameContainer = <input type="text" required value={playerName} onChange={handleName}/>;
    } else {
        playerNameContainer = <span className="player-name">{playerName}</span>
    }
    function handleEditClick() {
        setIsEditing((editing)=>!editing);
    }
    function handleName(event) {
        setPlayerName(event.target.value);
    }
    return <li className={isActive ? 'player active': ''}>
        <span className="player">
            {playerNameContainer}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing?'Save':'Edit'}</button>
    </li>
}