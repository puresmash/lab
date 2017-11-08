import React, { Component } from 'react';
import { spring, TransitionMotion } from 'react-motion';
import './Player.css';
const Wrapper = ({ children }) => <div className="player-wrapper">{children}</div>;
const Toolbar = ({children}) => <div className="toolbar">{children}</div>;
export default class Player extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
    }
  }
  render() {
    const { items } = this.props;
    const { page } = this.state;
    return (
      <Wrapper>
        <div className="slide-wrapper">
          <TransitionMotion
            styles={items.map((item, i) => {
              let x = 0;
              if(item > this.state.page) x = 100;
              else if(item < this.state.page) x = -100;
              return {
                key: `slide-${i}`,
                style: { x: spring(x) },
                data: item
              };
          })}>
            {styles =>
              <div>{
                styles.map(item => {
                  return (
                    <div
                      key={item.key}
                      className="slide-item"
                      style={{ transform: `translateX(${item.style.x}vw)` }}
                    >
                      {item.data}
                    </div>
                  );
                })}
              </div>
            }
          </TransitionMotion>
        </div>
        <Toolbar className="toolbar-wrapper">
          <div className="toolbar">
            <button onClick={() => this.setState({ page: this.state.page - 1 })}>{'<'}</button>
            <input type="number"
              value={this.state.page}
              onChange={e => this.setState({ page: parseInt(e.target.value) })}
            />
            <button onClick={() => this.setState({ page: this.state.page + 1 })}>{'>'}</button>
          </div>
        </Toolbar>
      </Wrapper>
    );
  }
}
