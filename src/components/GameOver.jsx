export default function GameOver({ winner, onRstart }) {
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            {winner && <p className="tt-capitalize">{winner} won!</p>}
            {!winner && <p>It&apos;s a Draw</p>}
            <p>
                <button onClick={onRstart}>Rematch!</button>
            </p>
        </div>
    )
}