import React, { Component } from 'react';
import Player from '../components/PrefetchPlayer';

export default class Lab4 extends Component {
  render() {
    return (
      <Player
        items={[
          'http://via.placeholder.com/300x150',
          'http://via.placeholder.com/301x150',
          'http://via.placeholder.com/302x150',
          'http://via.placeholder.com/303x150',
          'http://via.placeholder.com/304x150',
          'http://via.placeholder.com/305x150',
          'http://via.placeholder.com/306x150',
          'http://via.placeholder.com/307x150',
          'http://via.placeholder.com/308x150',
          'http://via.placeholder.com/309x150',
          'http://via.placeholder.com/310x150'
        ]}
      />
    );
  }
}
