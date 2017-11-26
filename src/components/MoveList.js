import React from 'react';

function MoveList(props) {
  const moves = props.history.map((step, move) => {
    const desc = move ?
      'Move #' + move + ' (' + step.coord.col + ',' + step.coord.row + ')':
      'Game start';
    return (
      <li key={move}>
        <button onClick={() => props.onClick(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <ol>{moves}</ol>
  );    
}

export default MoveList;