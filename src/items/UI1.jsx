import React, { Component } from 'react';
import Hammer from 'hammerjs';
import _ from 'lodash';
import MaskPlayer from '../components/MaskPlayer';
import ScaleImage from '../components/ScaleImage';

const items = [
  'http://via.placeholder.com/250x150',
  'http://via.placeholder.com/150x250'
]

class UI1 extends Component {
  static TITLE = 'Mask';
  constructor() {
    super();
    this.state = {
      open: false,
      scale: 1,
      isMobile: false
    };
    this.lastScale = 1;
  }
  componentDidMount = () => {
    const width = window.screen.width;
    const isMobile = width < 768;
    this.setState({ isMobile })
  }
  handleOpen = (index, domElement) => {
    if(domElement == null) return;
    const bouding = domElement.getBoundingClientRect();
    this.setState({
      open: true,
      src: items[index],
      index,
      start: {
        x: bouding.x || bouding.left,
        y: bouding.y || bouding.top,
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
    this.setState({
      index: id,
      src: items[id]
    })
  }

  render() {
    const { isMobile } = this.state;
    return (
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row'
      }}>
        { items.map((src, i) => {
          let domElement = null;
          return (
            <div key={`p-${i}`}>
              <div
                ref={ref => domElement = ref}
                onClick={() => this.handleOpen(i, domElement)}
                className="block-image"
                style={{ backgroundImage: `url(${src})` }}>
              </div>
              {/* <button className="btn" onClick={this.handleOpen(i)}>Open Modal</button> */}
            </div>
          );
        })}
        <MaskPlayer
          start={this.state.start}
          scale={this.state.scale}
          open={this.state.open}
          onNext={this.handleNext}
          onPrevious={this.handlePrevious}
          onClose={() => this.setState({ open: false })}>
          <ScaleImage src={this.state.src}/>
        </MaskPlayer>
      </div>
    );
  }
}

export default UI1;
