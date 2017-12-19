
import React, { Component } from 'react';
import FadeInWrapper from './FadeInWrapper';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const styles = {
  block: {
    // border: '1px solid lightgray',
    marginBottom: 16
  }
}

export default class FadeInAnimation extends Component {
  static TITLE = 'Fade-in Animation';
  constructor() {
    super();
    this.state = {
      open: false
    };
  }
  render() {
    const { open } = this.state;
    return (
      <div>
        <button className="btn" onClick={() => this.setState({ open: !open })}>INOUT</button>
        <FadeInWrapper open={open}>
          {/* Jsx tags, With wrapper */}
          <TestItem />
          {/* Html tags, Native */}
          <div style={styles.block} >{lorem}</div>
          <div style={styles.block} >{lorem}</div>
        </FadeInWrapper>
      </div>
    );
  }
}

class TestItem extends Component {
  constructor() {
    super();
    this.state = { cnt: 0 };
  }
  render() {
    const { cnt } = this.state;
    return (
      // <div style={Object.assign({}, this.props.style, styles.block)}>
      <div style={styles.block}>
        {/* Child component changes will not affect FadeInWrapper to rerender */}
        <button onClick={() => this.setState({ cnt: cnt + 1 })}>Change Child</button>
        {lorem}{cnt}
      </div>
    );
  }
}
