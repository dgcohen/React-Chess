import React, { Component } from 'react';
import Board from './components/board';
import initializeBoard from './helpers/initializeBoard.js';

// components

class App extends Component {
  constructor () {
    super();
    this.state = {
      squares: initializeBoard()
    }
  }
  render() {
    return (
      <Board
        squares = { this.state.squares }
      />
    );
  }
}

export default App;
