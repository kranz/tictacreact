import React, { Component } from 'react';
import Sign from './Sign';

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      <Sign player={props.value} />
    </button>
  );
}

export default Square;