import React, { Component } from 'react';
import { spring, Motion } from 'react-motion';

const Track = ({ children }) => <div className="track">{children}</div>;
const Circle = (props) => <div {...props} className="circle" />;

class Toogle extends Component {
  render() {
    return (
      <Track >
        <Motion style={{
          left: spring(this.props.open ? 100 : 0),
          marginLeft: spring(this.props.open ? -32 : 0)
        }}>
          { style =>
            <Circle style={{
              left: style.left + '%',
              marginLeft: style.marginLeft
            }} />
          }
        </Motion>
      </Track>
    );
  }
}

export default Toogle;
