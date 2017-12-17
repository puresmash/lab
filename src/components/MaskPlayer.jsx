
import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import classNames from 'classnames';
import Hammer from 'hammerjs';
import _ from 'lodash';
import { initPinchHelper, initPanHelper, initDoubleTapHelper } from '../helpers/EventHelper';
import { getViewport, toggleFullScreen, closeFullScreen } from '../utils/CommonUtils';
import './MaskPlayer.css';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const Wrapper = ({ children, style }) => <div className="modal-wrapper" style={style}>{children}</div>;
const BackLayer = (props) => <div {...props} className="bg" />;
// const Control = ({ children }) => <div className="control">{children}</div>
const ControlItem = ({ className, isLast, label, active, ...others }) =>
  <i {...others} className={className} style={{
    paddingRight: isLast ? 0 : 16,
    color: active ? 'lightskyblue' : '' }}>
    <span style={{ paddingLeft: 8 }}>{label}</span>
  </i>;
// const ControlArrow =
const Content = ({ children, scale, x, y }) =>
  <div className="modal-content">
    <children.type {...children.props} scale={scale} x={x} y={y} />
  </div>;

const AnimeBox = ({ children, start }) => {
  const viewport = getViewport();
  const defaultStyle = {
    height: start.h * 100 / viewport.y, width: start.w * 100 / viewport.x,
    left: start.x, top: start.y
  }
  console.warn(defaultStyle)
  const style = {
    height: spring(80), width: spring(100),
    left: spring(0), top: spring(viewport.y * 0.1)
  };
  console.warn(children)
  return (
    <Motion defaultStyle={defaultStyle} style={style}>
      {(style) => (
        <children.type {...children.props} style={{
          ...children.props.style,
          width: `${style.width}vw`,
          height: `${style.height}vh`,
          left: style.left,
          top: style.top
        }} />
      )}
    </Motion>
  );
}

class MaskPlayer extends Component {
  constructor() {
    super();
    this.state = {
      f12: false,
      isScaleMode: false, scale: 1, x: 0, y: 0,
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.open !== this.props.open && this.props.open) {
      this.initGesture();
    }
  }

  initGesture = () => {
    console.log(this.gestureRef)
    const manager = new Hammer.Manager(this.gestureRef);
    const pinch = new Hammer.Pinch();
    const doubleTap = new Hammer.Tap({ event: 'doubletap', taps: 2, enable: false });
    this.doubleTap = doubleTap;
    const pan = new Hammer.Pan({ enable: false });
    this.pan = pan;
    // pan.recognizeWith(swipe)
    // Add the recognizer to the manager.
    manager.add([pinch, doubleTap, pan]);
    manager.on('pinch pinchstart', initPinchHelper(scale => {
      this.setState({ scale });
      if(!this.state.isScaleMode) {
        this.on();
      }
      if(this.state.isScaleMode && scale === 1) {
        this.resetStage();
      }
    }));
    manager.on('doubletap', initDoubleTapHelper(this.resetStage));
    manager.on('pan panstart panend', initPanHelper((x, y) => this.setState({ x, y }), this.calcBound));
    this.manager = manager;
  }

  // MOBILE ONLY - Desktop won't trigger pan event
  on = () => {
    this.pan.set({ enable: true });
    this.doubleTap.set({ enable: true });
    this.setState({ isScaleMode: true });
    this.setState({ f12: true });
    toggleFullScreen(this.wrapperRef);
    console.warn('on')
  }

  off = () => {
    this.pan.set({ enable: false });
    this.doubleTap.set({ enable: false });
    this.setState({ isScaleMode: false, f12: false });
    closeFullScreen(this.wrapperRef);
    console.warn('off')
  }

  resetStage = () => {
    this.setState({ scale: 1, x: 0, y: 0 });
    this.off();
  }

  calcBound = () => {
    const wrapper = document.querySelector('.modal-content').getBoundingClientRect();
    const content = document.querySelector('.image').getBoundingClientRect();
    console.log(wrapper)
    console.log(content)
    return {
      mx: (content.width - wrapper.width) / 2,
      my: (content.height - wrapper.height) / 2,
    }
  }
  // END MOBILE ONLY

  handleClose = () => {
    if(this.manager) {
      this.manager.stop(true);
      this.manager.destroy();
      this.manager = null;
    }
    this.setState({ f12: false, isScaleMode: false });
    this.props.onClose();
    closeFullScreen();
  };

  render() {
    const { children, onPrevious, onNext, open, start } = this.props;
    const { scale, x, y, isScaleMode, f12 } = this.state;
    return (
        <div ref={ref => this.wrapperRef = ref}
          className={classNames('maskPlayer', this.state.f12 && 'f12')} style={open ? {} : { display: 'none' }}>
          <button className="btn btn-close" onClick={this.handleClose}>
            <i className="fa fa-times" />
          </button>

          { open && (
            <div>
              {/* <BackLayer onClick={() => this.on()}/> */}
              <BackLayer onClick={this.handleClose}/>
              <AnimeBox start={start}>
                <Wrapper>
                  {/* CONTROL */}
                  <div className="control" ref={ref => this.gestureRef = ref}>
                    <div className="top">{'TITLE'}</div>
                    <div className="arrow-layer" >
                      <div className="arrow"
                        style={isScaleMode ? { display: 'none' } : {}}
                        onClick={() => {
                          if(!isScaleMode) {
                            console.log(isScaleMode)
                            onPrevious()
                          }
                        }}>
                        <i className="fa fa-chevron-left" />
                      </div>
                      <div className="arrow"
                        style={{ flex: 3, justifyContent: 'flex-end', display: isScaleMode ? 'none' : null }}
                        onClick={() => {
                          if(!isScaleMode) {
                            onNext()
                          }
                        }}>
                        <i className="fa fa-chevron-right" />
                      </div>
                    </div>
                    <div className="bottom">
                      <ControlItem className="fa fa-thumbs-o-up" label="讚" />
                      <ControlItem className="fa fa-star-o" label="封面" />
                      <ControlItem className="fa fa-arrows" label="縮放" active={isScaleMode} />
                      <ControlItem isLast className="fa fa-expand" label="全螢幕" active={f12}
                        onClick={() => {
                          if(f12) {
                            this.resetStage();
                            this.setState({ f12: false });
                          }
                          else {
                            this.setState({ f12: true });
                          }
                          toggleFullScreen(this.wrapperRef);
                        }}
                      />
                    </div>
                  </div>
                  <Content scale={scale} x={x} y={y}>{children}</Content>
                </Wrapper>
              </AnimeBox>
            </div>
          )}
      </div>
    );
  }
}

export default MaskPlayer;
