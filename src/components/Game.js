import { useState } from 'react';
import Board from './Board';
import {calculateWinner, checkDraw} from '../helpers';

function Game() {
  const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    const historyMoment = history.slice(0, stepNumber + 1);
    const current = historyMoment[stepNumber];
    const newSquares = current.squares.slice();

    // Ignore the click if someone wins or the square is already filled
    if(winner || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setHistory(historyMoment.concat({squares: newSquares}));
    setXIsNext(!xIsNext);
    setStepNumber(historyMoment.length);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const isDraw = checkDraw(current.squares);
  let status;
  if(winner) {
    status = `Winner: ${winner}`;
  } else if(isDraw) {
    status = 'Draw!'
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}`
                      : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => {jumpTo(move)}}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div className="status">{ status }</div>
        <ol>{ moves }</ol>
      </div>
    </div>
  );
}

export default Game;