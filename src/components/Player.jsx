import { useState } from "react"

export default function Player({ name, symbol }) {
    const [isEditing, setIsEditing] = useState(false);
    let buttonText = "";
    let playerNameContainer;
    if (isEditing) {
        buttonText = "Save";
        playerNameContainer = <input type="text" required />;
    } else {
        buttonText = "Edit";
        playerNameContainer = <span className="player-name">{name}</span>
    }
    function handleEditClick() {
        setIsEditing(!isEditing);
    }
    return <li>
        <span className="player">
            {playerNameContainer}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{buttonText}</button>
    </li>
}