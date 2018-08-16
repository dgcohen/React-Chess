import React, { Component } from 'react';
import Board from './components/board';
import initializeBoard from './helpers/initializeBoard.js';

// components

class Game extends Component {
  constructor () {
    super();
    this.state = {
      squares: initializeBoard(),
      turn: 'white',
      player: 1,
      sourceSelection: -1,
      message: '',
      capturedWhitePieces: [],
      capturedBlackPieces: [],
    }
  }

  handleClick(index) {
    console.log(index);
  }

  render() {
    return (
      <Board
        squares = { this.state.squares }
        onClick = { (index) => this.handleClick(index) }
      />
    );
  }
}

export default Game;
