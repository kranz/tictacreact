import React from 'react';
import Sign from './Sign';

function Square(props) {
  const className = props.isWinner ? "square winner" : "square";
  return (
    <button className={className} onClick={() => props.onClick()}>
      <Sign player={props.value} />
    </button>
  );
}

export default Square;