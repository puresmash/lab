import React, { Component } from 'react';
import Collapse from '../components/Collapse';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export default class UI2 extends Component {
  static TITLE = 'Collapse';

  render() {
    return (
      <Collapse>
        <span>{lorem}</span>
      </Collapse>
    );
  }
}
