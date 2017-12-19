import React, { Component } from 'react';
import { Toggle, NormalToggle } from './Toggle';

export default class ToggleDemo extends Component {
  static TITLE = 'Compare additive animation with normal css transition';
  constructor() {
    super();
    this.state = {
      open: false
    };
  }
  render() {
    return (
      <div className="toggle-demo">
        <button className="btn" onClick={() => this.setState({ open: !this.state.open })}>
          toogle
        </button>
        {/* REACT MOTION */}
        <span>Additive Animation - React Motion</span>
        <Toggle open={this.state.open}/>
        {/* NORMAL */}
        <span>Ease-in-out Transition</span>
        <NormalToggle open={this.state.open} />
      </div>
    );
  }
}
