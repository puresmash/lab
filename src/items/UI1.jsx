import React, { Component } from 'react';
import MaskPlayer from '../components/MaskPlayer';

const items = [
  'http://via.placeholder.com/250x150',
  'http://via.placeholder.com/150x250'
]

class UI1 extends Component {
  static TITLE = 'Mask';
  constructor() {
    super();
    this.state = {
      open: false
    };
    this.blocks = [];
  }
  handleOpen = (id) => () => {
    console.log(this.blocks)
    const bouding = this.blocks[id].getBoundingClientRect();
    this.setState({
      open: true,
      src: items[id],
      index: id,
      start: {
        x: bouding.x,
        y: bouding.y,
        h: bouding.height,
        w: bouding.width
      }
    });
  }
  handleNext = () => {
    const index = this.state.index;
    const id = items.length - 1 > index ? index + 1 : 0;
    this.handlePage(id)
  }
  handlePrevious = () => {
    const index = this.state.index;
    const id = index <= 0 ? items.length - 1 : index - 1;
    this.handlePage(id)
  }
  handlePage = (id) => {
    const bouding = this.blocks[id].getBoundingClientRect();
    this.setState({
      index: id,
      src: items[id],
      start: {
        x: bouding.x,
        y: bouding.y,
        h: bouding.height,
        w: bouding.width
      }
    })
  }
  render() {
    return (
      <div style={{ display: 'flex' }}>
        { items.map((src, i) => (
          <div key={`p-${i}`}>
            <div
              ref={ref => this.blocks[i] = ref}
              onClick={this.handleOpen(i)}
              className="block-image"
              style={{ backgroundImage: `url(${src})` }}>
              {/* <div  /> */}
            </div>
            {/* <button className="btn" onClick={this.handleOpen(i)}>Open Modal</button> */}
          </div>
        ))}
        <MaskPlayer
          start={this.state.start}
          open={this.state.open}
          onNext={this.handleNext}
          onPrevious={this.handlePrevious}
          onClose={() => this.setState({ open: false })}>

          <div className="image" style={{ backgroundImage: `url(${this.state.src})`}} />

        </MaskPlayer>
      </div>
    );
  }
}

export default UI1;
