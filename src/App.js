import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Piece from './components/Piece';
import Square from './components/Square';

// components

class App extends Component {
  render() {
    return (
      <Square black>
        <Piece />
      </Square>
    );
  }
}

export default App;
