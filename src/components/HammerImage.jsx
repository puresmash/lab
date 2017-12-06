import React, { Component } from 'react';
import Hammer from 'hammerjs';
import _ from 'lodash';
import { initPinchHelper, initPanHelper, initTapHelper } from '../helpers/EventHelper';

export default class HammerImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 1,
      x: 0, y: 0,
    };
    this.initGesture(props.target);
  }
  //
  componentWillReceiveProps(np) {
    if(np.src !== this.props.src) {
      this.resetGesture();
    }
  }
  // Pan
  panEvent = _.throttle(
    (e) => {
      const { x, y } = e;
      this.setState({ coords: { x, y } });
    }, 100
  );
  // Tap
  tapEvent = _.throttle(e => console.log('tap', e), 100);
  initGesture = (ref) => {
    console.log(ref)
    const manager = new Hammer.Manager(ref);
    const pinch = new Hammer.Pinch();
    const tap = new Hammer.Tap();
    const pan = new Hammer.Pan();
    // pan.recognizeWith(swipe)
    // Add the recognizer to the manager.
    manager.add([pinch, tap, pan]);
    manager.on('tap', initTapHelper((scale) => this.setState({ scale })));
    manager.on('pan panstart panend', initPanHelper((x, y) => this.setState({ x, y })));
    manager.on('pinch pinchstart', initPinchHelper((scale) => this.setState({ scale })));
    this.manager = manager;
  }
  resetGesture = () => {
    if(this.manager) {
      this.manager.destroy();
      this.manager = null;
      this.initGesture(this.props.target);
    }
  }
  render() {
    const { src } = this.props;
    const { scale, x, y } = this.state;
    return (
      <div className="image" style={{
        backgroundImage: `url(${src})`,
        transform: `scale(${scale}) translate(${x/scale}px, ${y/scale}px)`
      }} />
    );
  }
}
