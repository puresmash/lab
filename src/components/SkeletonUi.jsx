import React, { Component } from 'react';
import { spring, TransitionMotion } from 'react-motion';

const Block = ({ children, ...others }) => <div {...others} className="track">{children}</div>;

export default class SkeletonUi extends Component {
  render() {
    return (
      <TransitionMotion
        willEnter={comp => {
          return {
            ...comp.style,
            x: 32,
            opacity: 0,
            height: 0,
            margin: 0
          };
        }}
        willLeave={comp => {
          return {
            // ...comp.style,
            x: spring(32),
            opacity: spring(0),
            height: spring(0),
            margin: spring(0)
          };
        }}
        styles={this.props.items}
      >
        {styles =>
          <div>{styles.map(item => {
            return (
              <Block key={item.key} style={{
                  transform: `translate(${item.style.x}px)`,
                opacity: item.style.opacity,
                height: item.style.height,
                marginTop: item.style.margin,
                marginBottom: item.style.margin,
                overflow: 'hidden'
              }}>
                {item.data}
              </Block>
            );
          })}
          </div>
        }
      </TransitionMotion>
    )
  }
}
