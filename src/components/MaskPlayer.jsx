
import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import { getViewport } from '../utils/CommonUtils';
import './MaskPlayer.css';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const Wrapper = ({ children, style }) => <div className="modal-wrapper" style={style}>{children}</div>;
const BackLayer = (props) => <div {...props} className="bg" />;
const Control = ({ children }) => <div className="control">{children}</div>
const ControlItem = ({ className, isLast, label }) =>
  <i className={className} style={isLast ? { paddingRight: 16 } : {}}>
    <span style={{ paddingLeft: 8 }}>{label}</span>
  </i>;
// const ControlArrow =
const Content = ({ children }) => <div className="content">{children}</div>;

const AnimeBox = ({ children, start }) => {
  const viewport = getViewport();
  const defaultStyle = {
    height: start.h * 100 / viewport.y, width: start.w * 100 / viewport.x,
    left: start.x, top: start.y
  }
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
      closeTitle: true,
    }
  }
  handleToogleTitle = () => this.setState({ closeTitle: !this.state.closeTitle });

  render() {
    const { children, onPrevious, onNext, onClose, open, start } = this.props;
    const { closeTitle } = this.state;
    return (
        <div className="maskPlayer" style={open ? {} : { display: 'none' }}>
          <button className="btn btn-close" onClick={onClose}>
            <i className="fa fa-times" />
          </button>

          { open && (
            <AnimeBox start={start}>
              <Wrapper>
                <BackLayer onClick={onClose}/>
                <Control>
                  <div className="top">{'TITLE'}</div>
                  <div className="arrow-layer">
                    <div className="arrow" onClick={onPrevious}>
                      <i className="fa fa-chevron-left" />
                    </div>
                    <div className="arrow" onClick={onNext}
                      style={{ flex: 3, justifyContent: 'flex-end' }}>
                      <i className="fa fa-chevron-right" />
                    </div>
                  </div>
                  <div className="bottom">
                    <ControlItem isLast className="fa fa-thumbs-o-up" label="讚" />
                    <ControlItem className="fa fa-star-o" label="封面" />
                  </div>
                </Control>
                <Content>{children}</Content>
              </Wrapper>
            </AnimeBox>
          )}
      </div>
    );
  }
}

export default MaskPlayer;
