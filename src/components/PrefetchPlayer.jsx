import React, { Component } from 'react';
import _ from 'lodash';
import Image from './Image';
import './PrefetchPlayer.css';

export default class PrefetchPlayer extends Component {
  props: {
    items: Array<string>
  }
  constructor() {
    super();
    this.cached = [];
    this.state = {
      page: 1,
    }
  }
  render() {
    const { items } = this.props;
    const { page } = this.state;
    return (
      <div>
        <div className="wrapper">
          {items.map((item, i) =>  {
            const isActive = page === i;
            if(isActive) {
              this.cached[i] = true;
            }
            return (
              <Image key={`slide-${i}`} alt="slide-img"
                className="item" src={item}
                isActive={isActive}
                isPrefetch={_.inRange(i+1, page+1, page+2)}
                isCached={this.cached[i] === true}
                style={isActive ? { transform: 'translateX(0)' } : {}} />
            );
          })}
        </div>
        {/* TIMELINE */}
        <div className="timeline">
          <div className="done" style={{
            width: `${(page - 1) * 100 / (items.length - 1)}%`
          }}/>
        </div>
        {/* TOOLBAR */}
        <div className="toolbar">
          <button label="<" onClick={() => this.setState({ page: this.state.page - 1})}>
            <i className="fa fa-arrow-circle-left" aria-hidden="true" />
          </button>
          <div className="page"><p>{this.state.page}</p></div>
          <button label=">" onClick={() => this.setState({ page: this.state.page + 1})}>
            <i className="fa fa-arrow-circle-right" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }
}
