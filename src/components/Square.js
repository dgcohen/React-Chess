import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Square extends Component {
  static propTypes = {
    black: PropTypes.bool
  };

  render() {
    const { black } = this.props;
    const color = black ? 'black' : 'white';

    return (
      <div className={"square " + color}>{this.props.children}</div>
    )
  }
}