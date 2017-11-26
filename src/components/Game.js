import React, { Component } from 'react';
import Board from './Board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        coord: {
          col:0,
          row:0,
        }
      }],
      xIsNext: true,
      stepNumber: 0,
      lastKey: 0
    }
  }
  
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const lastKey = this.state.stepNumber;
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const myrow = Math.floor(i/3) +1;
    const mycol = (i+1) - 3*(myrow-1);
    this.setState({
      history: history.concat([{
        squares: squares,
        coord: {
          col:mycol,
          row:myrow,
        }
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      lastKey: lastKey
    });
  }  
  
  jumpTo(step) {
    const lastKey = this.state.stepNumber;
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      lastKey: lastKey
    });
  }

  
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      console.dir(step)
      const desc = move ?
        'Go to move #' + move + ' (' + step.coord.col + ',' + step.coord.row + ')':
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });    
    
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            beBold= {this.state.beBold}
          />   
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
