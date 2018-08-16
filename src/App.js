import React, { Component } from 'react';
import Board from './components/board';

// components

class App extends Component {
  render() {
    return (
      <Board piecePosition={[0,0]} />
    );
  }
}

export default App;
