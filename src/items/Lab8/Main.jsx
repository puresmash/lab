import React, { Component } from 'react';
import ToggleMenu from './ToggleMenu';

class Menu extends Component {
  static TITLE = 'Demo Hoc';
  render() {
    return (
      <ToggleMenu title="Click Me to Toggle">
        <p>Some Content</p>
      </ToggleMenu>
    );
  }
}

export default Menu;
