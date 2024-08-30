export default function Log({player, symbol, row, col}) {
    return <>
        <p>{player} has put {symbol} on {row}-{col}</p>
    </>
}