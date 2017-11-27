import React, { Component } from 'react';
import Square from './Square';

class Board extends React.Component {
  renderSquare(i) {
    let isWinner = null;
    if (this.props.winnerLine) {
      isWinner = this.props.winnerLine.indexOf(i) !== -1;
    }
    return (
      <Square
        isWinner={isWinner}
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        beBold = {this.props.beBold}
      />
    );
  }

  render() {
    var rows = [];
    let squares = [];
    for(var r = 0; r < 3; r++) {
      for(var s = 0; s < 3; s++) {
        const idx = 3*r + s;
        squares.push(this.renderSquare(idx));
      }
      rows.push(<div key={r} className="board-row">{squares}</div>);
      squares=[];
    } 
    return <div>{rows}</div>
  }
}

export default Board;