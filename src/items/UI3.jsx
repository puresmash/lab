
import React, { Component } from 'react';
import FadeInWrapper from '../components/FadeInWrapper';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const dataList = [lorem, lorem, lorem];

const styles = {
  block: {
    // border: '1px solid lightgray',
    marginBottom: 16
  }
}

export default class UI3 extends Component {
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
        <button onClick={() => this.setState({ open: !open })}>INOUT</button>
        <FadeInWrapper open={open}>
          {dataList.map((item, i) =>
            <div key={`ary-${i}`} style={styles.block} >{item}</div>
          )}
        </FadeInWrapper>
      </div>
    );
  }
}
