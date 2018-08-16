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
      status: '',
      capturedWhitePieces: [],
      capturedBlackPieces: [],
    }
  }

  handleClick(index) {
    // Create shallow copy of board so we don't alter state
    const squares = this.state.squares.slice();

    if (this.state.sourceSelection < 0) {
      // If wrong player's piece or a blank square is selected
      if (!squares[index] || squares[index].player !== this.state.player) {
        this.setState({ status: "Player " + this.state.player + "'s turn. Please select a " + this.state.turn + " piece."});
      }
      else {
        this.setState({
          status: "Choose destination for selected piece",
          sourceSelection: index
        });
      }
    }
    else {
      if (squares[index] && squares[index].player === this.state.player) {
        this.setState({
          status: "Invalid move: you cannot move to a square occupied by your own piece.",
          sourceSelection: -1,
        });
      }
      else {
        const isCheckmate = this.isCheckmate(this.state.player);
        const capturedWhitePieces = this.state.capturedWhitePieces.slice();
        const capturedBlackPieces = this.state.capturedBlackPieces.slice();
        const holdsEnemy = !!squares[index];
        const isMovePossible = squares[this.state.sourceSelection].isMovePossible(this.state.sourceSelection, index, holdsEnemy);
        const srcToDestPath = squares[this.state.sourceSelection].getSrcToDestPath(this.state.sourceSelection, index);
        const isSlidingPathClear = this.isSlidingPathClear(srcToDestPath);

        console.log(isCheckmate);

        if (isMovePossible && isSlidingPathClear) {
          if (squares[index] !== null) {
            if (squares[index].player === 1) {
              capturedWhitePieces.push(squares[index]);
            }
            else {
              capturedBlackPieces.push(squares[index]);
            }
          }

          squares[index] = squares[this.state.sourceSelection];
          squares[this.state.sourceSelection] = null;

          let player = this.state.player === 1 ? 2 : 1;
          let turn = this.state.turn === "white" ? "black" : "white";

          this.setState({
            sourceSelection: -1,
            squares: squares,
            capturedBlackPieces: capturedBlackPieces,
            capturedWhitePieces: capturedWhitePieces,
            player: player,
            turn: turn,
            status: '',
          });
        }
        else {
          this.setState({
            status: "Invalid move",
            sourceSelection: -1,
          });
        }
      }
    }
  }

  /**
   * Check that path is clear for non-jumping pieces.
   * @return {Boolean}
   */
  isSlidingPathClear(srcToDestPath){
    let slidingIsPathClear = true;
    for(let i = 0; i < srcToDestPath.length; i++){
      if(this.state.squares[srcToDestPath[i]] !== null){
        slidingIsPathClear = false;
      }
    }
    return slidingIsPathClear;
  }

  /**
   * Check if move is a checkmate.
   * @return {Boolean}
   */
  isCheckmate(currentPlayer){
    let king = null;
    let kingIndex = null;
    let possibleKingMoves = [];
    console.log(currentPlayer);
    // find other player's king
    this.state.squares.forEach((square, index) => {
      if (square && square.type === 'king' && square.player !== currentPlayer) {
        kingIndex = index;
        king = square;
      };
    });

    // find clear spaces around king
    this.state.squares.forEach((square, index) => {
      if (king.isMovePossible(kingIndex, index) && square.player !== currentPlayer) {
        possibleKingMoves.push(index);
      };
    });

    return possibleKingMoves;
  }

  render() {
    return (
      <div>
      <Board
        squares = { this.state.squares }
        onClick = { (index) => this.handleClick(index) }
      />
      <div className="game-info">
        <div className={this.state.turn + " turn-info"}>
          <h3>{this.state.player === 1 ? 'White\'s Turn' : 'Black\'s Turn'}</h3>
        </div>
        <div className="game-status">{this.state.status}</div>
      </div>
      </div>
    );
  }
}

export default Game;
