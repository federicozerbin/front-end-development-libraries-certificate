const { useState } = React;

const winningIndexConfig = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //col
    [0, 4, 8], [2, 4, 6],            //diagonal
];

function calculateWinner(squares) {
    for (const [a, b, c] of winningIndexConfig) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
            return squares[a];
    }
    return null;
}

export function Board() {

    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    //handles x turn (if !xisNext, handles o turn. index identifies a square)
    function handleTurn(index) {

        //if that square is already not null, does not click
        if (squares[index] || winner) return;

        const newSquaresConfig = [...squares];
        newSquaresConfig[index] = xIsNext ? 'X' : 'O';
        setSquares(newSquaresConfig);
        setXIsNext(!xIsNext);
    }

    //resets the game by loading initial state
    function handleReset() {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    }

    const winner = calculateWinner(squares);
    const isDraw = !winner && squares.every(square => square !== null);

    return (
        <div className="gameContainer">
            <div className="squaresBoard">
                {squares.map((value, index) => (
                    <button
                        key={index}
                        className="square"
                        onClick={() => handleTurn(index)}
                    >
                        {value}
                    </button>
                ))}
            </div>

            {winner && <p>Winner: {winner}</p>}
            {isDraw && <p>Draw</p>}
            <button id="reset" onClick={handleReset}>Reset</button>

        </div>
    );
}