import React from 'react';

function MoveList(props) {
  const moves = props.history.map((step, move) => {
    const coord = '(' + step.coord.col + ',' + step.coord.row + ')';
    let desc;
    if(!move) {
      desc = 'Game start';
    } else if (move === props.history.length -1 && props.winner) {
      desc = coord + ' Winner is ' + props.winner;
    } else if (move === props.stepNumber) {
      desc = <b>{coord} Move # {move}</b>;
    } else {
      desc = coord + ' Move #' + move;
    }
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