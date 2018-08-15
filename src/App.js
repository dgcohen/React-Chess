import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';

// components

class App extends Component {
  render() {
    return (
      <Board piecePosition={[0,0]} />
    );
  }
}

export default App;
