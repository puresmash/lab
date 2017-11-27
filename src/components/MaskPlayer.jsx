
import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import { getViewport } from '../utils/CommonUtils';
import './MaskPlayer.css';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const Content = ({ children, start }) => {
  // const start = { height: 0, width: 0 };
  console.warn(start)
  const viewport = getViewport();
  const defaultStyle = {
    height: start.h,
    width: start.w,
    left: start.x,
    top: start.y
  }
  const end = {
    height: spring(viewport.y * 0.8),
    width: spring(viewport.x),
    left: spring(0),
    top: spring(viewport.y * 0.1)
  };
  console.log(defaultStyle);
  console.log(end)
  return (
    <Motion defaultStyle={defaultStyle} style={end}>
      {(style) => (
        <div className="content" style={{
          width: `${style.width}px`,
          height: `${style.height}px`,
          left: style.left,
          top: style.top
        }}>
          {children}
        </div>
      )}
    </Motion>
  );
};
const Header = ({ children, style }) => <div style={style} className="modal-header">{children}</div>;
const Body = ({ children }) => <div className="modal-body">{children}</div>

const AnimeBox = ({ children }) => {
  const start = { height: 0, width: 0 };
  const end = { height: spring(100), width: spring(100) };
  return (
    <Motion defaultStyle={start} style={end}>
      {(style) => (
        <div style={{
          width: `${style.width}%`,
          height: `${style.height}%`
        }}>
          {children}
        </div>
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

            <Content start={start}>
              <div className="c-panel">
                <div className="control" onClick={onPrevious}>
                  <i className="fa fa-chevron-left" />
                </div>
                <div className="control" onClick={onNext}
                  style={{ flex: 9, justifyContent: 'flex-end' }}>
                  <i className="fa fa-chevron-right" />
                </div>
              </div>
              <div style={{
                  backgroundColor: 'lightseagreen',
                  width: '100%',
                  height: '100%'
              }}>
                {children}
              </div>
              <Header style={closeTitle ? { height: 32 } : { height: 118 }}>
                <div className="title">
                  {'TITLE'}
                  <button className="btn" onClick={this.handleToogleTitle}>
                    <i className={`fa fa-caret-${closeTitle ? 'up' : 'down'}`} />
                  </button>
                </div>
                <span className="desc" style={closeTitle ? { opacity: 0 } : {}}>{lorem}</span>
              </Header>
            </Content>

          )}
      </div>
    );
  }
}

export default MaskPlayer;
