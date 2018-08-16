import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './square';
import Piece from './piece';

export default class Board extends Component {
  static propTypes = {
    piecePosition: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  };

  renderSquare(i) {
    const x = i % 8;
    const y = Math.floor((i / 8));
    const black = (x + y) % 2 === 1;

    const [pieceX, pieceY] = this.props.piecePosition;
    const piece = (x === pieceX && y === pieceY) ? <Piece /> : null;

    return (
      <Square black={black}>
        {piece}
      </Square>
    );
  }
  render() {
    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }
    return (
      <div className="board">
        {squares}
      </div>
    );
  }
}