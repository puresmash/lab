import React, { Component } from 'react';
import './Collapse.css';

const getMaxHeight = (ele) => {
  if(ele == null) {
    return 'auto';
  }
  // 保存舊的高度
  const h1 = ele.getBoundingClientRect().height;
  // 取得 自然高度
  ele.style.height = 'auto';
  const h2 = ele.getBoundingClientRect().height;
  // 切回舊高
  ele.style.height = h1 + 'px';
  console.warn('counting max height')
  return h2;
}

class Collapse extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    }
  }
  render() {
    const { children } = this.props;
    const { open } = this.state;
    return (
      <div className="collapse">
        <div className="banner" onClick={() => this.setState({ open: !open })}>
          <div>TITLE</div>
          <div className="icon" style={{
            transform: open ? 'rotate(90deg)' : null,
            transition: 'transform .3s',
          }}>
            <i className="fa fa-caret-right" />
          </div>
        </div>
        <div className="container-mask" style={{
          maxHeight: open ? getMaxHeight(this.container) : 0,
          transition: `max-height .${open ? 3 : 5}s`,
          // height: open ? 'auto' : 0
        }}>
          <div ref={ref => this.container = ref}
            className="container"
            style={{
              opacity: open ? 1 : 0,
              transition: 'transform .5s, opacity .5s',
              transitionTimingFunction: 'ease-out, ease-in',
              transform: open ? null : 'translate(-100%, 0)'
            }}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Collapse;
