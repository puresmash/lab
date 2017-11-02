import React, { Component } from 'react';
import Player from './components/Player';

export default class Lab3 extends Component {
  render() {
    return (
      <Player
        items={[
          1, 2, 3, 4, 5, 6
        ]}
      />
    );
  }
}
