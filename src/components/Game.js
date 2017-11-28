import React from 'react';
import Board, {SIZE as BOARD_SIZE} from './Board';
import MoveList from './MoveList';
import Status from './Status';
import ResetButton from './ResetButton';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(BOARD_SIZE*BOARD_SIZE).fill(null),
        coord: {
          col:0,
          row:0,
        }
      }],
      nextPlayer: 'X',
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
    squares[i] = this.state.nextPlayer;
    const myrow = Math.floor(i / BOARD_SIZE) +1;
    const mycol = (i + 1) - BOARD_SIZE * (myrow - 1);
    this.setState({
      history: history.concat([{
        squares: squares,
        coord: {
          col:mycol,
          row:myrow,
        }
      }]),
      stepNumber: history.length,
      nextPlayer: (this.state.nextPlayer === 'X') ? 'O' : 'X',
      lastKey: lastKey
    });
  }  
  
  jumpTo(step) {
    const lastKey = this.state.stepNumber;
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      nextPlayer: (step % 2) ? 'O' : 'X',
      lastKey: lastKey
    });
  }

  resetGame() {
  	this.setState({
  		history:[{
  			squares: Array(BOARD_SIZE*BOARD_SIZE).fill(null),
	        coord: {
    	      col:0,
        	  row:0,
	        }
  		}],
  		nextPlayer:'X',
  		stepNumber: 0,
  		lastKey: 0
  	});
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
//    const lastSquares = history[history.length -1].squares;
//    const winner = calculateWinner(lastSquares);
	const winner = calculateWinner(current.squares.slice());
	const winnerPlayer = winner ? winner.player : null;
	let winnerLine = null;
	if (winner && this.state.stepNumber === history.length -1) {
		winnerLine = winner.line;
	}
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            beBold= {this.state.beBold}
            winnerLine={winnerLine}
          />
          <ResetButton 
          	onReset={() => this.resetGame()} />
        </div>
        <div className="game-info">
          <Status winner={winnerPlayer} nextPlayer={this.state.nextPlayer} />
          <MoveList 
            history={this.state.history} 
            onClick={(move) => this.jumpTo(move)} 
            stepNumber={this.state.stepNumber}
            winner={winnerPlayer} />
        </div>
      </div>
    );
  }
}

export default Game;

function calculateWinner(squares) {
  const size = BOARD_SIZE;
  var lines = [];
  for(let i = 0; i<size;i++) {
    lines[i]=[];
    for(let j = 0; j<size;j++) {
      let idx = i * size + j;
      lines[i].push(idx)
    }
  }
  for(let i = 0; i<size;i++) {
    lines[i+size]=[];
    for(let j = 0; j<size; j++) {
      let idx = j*size + i;
      lines[i+size].push(idx)
    }
  }
  lines[size*2] = [];
  lines[size*2+1] = [];
  for (let k =0; k<size; k++) {
    lines[size*2].push(k*(size+1))
    lines[size*2+1].push((k+1)*(size-1))
  }
  for (let m = 0; m < lines.length; m++) {
    const riga = lines[m];
    let continua = (squares[riga[0]] !== null) ? true : false;
    for (let n = 0; n<size-1; n++) {
      if((squares[riga[n]] === squares[riga[n+1]]) && continua) {
        continua = true;
      } else {
        continua = false;
      }
    }
    if (continua) {
      return {player:squares[riga[0]], line: lines[m]};
    }
  }
  return null;
}
