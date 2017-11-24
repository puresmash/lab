import React, { Component } from 'react';
import MaskPlayer from '../components/MaskPlayer';

class UI1 extends Component {
  static TITLE = 'Mask';
  constructor() {
    super();
    this.state = {
      open: false
    };
  }
  handleOpen = () => {
    const bouding = this.ori.getBoundingClientRect()
    this.setState({
      open: true,
      start: {
        x: bouding.x,
        y: bouding.y,
        h: bouding.height,
        w: bouding.width
      }
    });
  }
  render() {
    return (
      <div style={{ display: 'flex' }}>

        <div ref={(ref) => this.ori = ref} style={{ width: 300, height: 300, backgroundColor: 'lightseagreen' }}/>
        <button className="btn" onClick={this.handleOpen}>Open Modal</button>

        <MaskPlayer start={this.state.start}
          open={this.state.open} onClose={() => this.setState({ open: false })}>

          <div className="image" />

        </MaskPlayer>
      </div>
    );
  }
}

export default UI1;
