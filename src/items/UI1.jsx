import React, { Component } from 'react';
import Hammer from 'hammerjs';
import _ from 'lodash';
import MaskPlayer from '../components/MaskPlayer';
import HammerImage from '../components/HammerImage';

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
    // this.initGesture();
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
  // Pinch
  pinchEvent = _.throttle(
    (e) => {
      const scale = e.scale;
      this.setState({ scale: this.lastScale * scale });
      if(e.type === 'pinchend') {
        console.log('pinch end', scale);
        this.lastScale *= scale;
        return;
      }
      console.log('pinch', scale);
    }, 100
  );
  // Tap
  tapEvent = _.throttle(
    (e) => console.log('tap', e), 100
  );
  // Pan
  panEvent = _.throttle(
    (e) => console.log(e), 100
  )
  initGesture = () => {
    // const square = document.querySelector('.maskPlayer');
    const square = this.gestureRef;
    const manager = new Hammer.Manager(square);
    const pinch = new Hammer.Pinch();
    const rotate = new Hammer.Rotate();
    const tap = new Hammer.Tap();
    pinch.recognizeWith(rotate);
    // Add the recognizer to the manager.
    manager.add([pinch, rotate, tap]);
    manager.on('pinch pinchend', this.pinchEvent)
    manager.on('tap', this.tapEvent)
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
                // onTouchEnd={() => this.handleOpen(i, domElement)}
                className="block-image"
                style={{ backgroundImage: `url(${src})` }}>
                {/* <div  /> */}
              </div>
              {/* <button className="btn" onClick={this.handleOpen(i)}>Open Modal</button> */}
            </div>
          );
        })}
        <MaskPlayer
          wrapperRef={ref => this.gestureRef = ref}
          start={this.state.start}
          scale={this.state.scale}
          open={this.state.open}
          onNext={this.handleNext}
          onPrevious={this.handlePrevious}
          onClose={() => this.setState({ open: false })}>
          <HammerImage target={this.gestureRef} src={this.state.src}/>
          {/* <div className="image" style={{
            backgroundImage: `url(${this.state.src})`,
            transform: `scale3D(${this.state.scale}, ${this.state.scale}, 1)`
          }} /> */}

        </MaskPlayer>
      </div>
    );
  }
}

export default UI1;
