import React, { Component } from 'react';
import _ from 'lodash';
import PrefetchImage from '../components/PrefetchImage';
import '../components/PrefetchPlayer.css';

const items = [
  'http://via.placeholder.com/301x150',
  'http://via.placeholder.com/302x150',
  'http://via.placeholder.com/303x150',
  'http://via.placeholder.com/304x150',
  'http://via.placeholder.com/305x150',
  'http://via.placeholder.com/306x150',
  'http://via.placeholder.com/307x150',
  'http://via.placeholder.com/308x150',
  'http://via.placeholder.com/309x150',
  'http://via.placeholder.com/310x150'
];

export default class Lab5 extends Component {
  static TITLE = 'Demo new PrefetchPlayer';
  constructor(){
    super();
    this.state = {
      page: 0
    };
  }
  prev = () => {
    const { page } = this.state;
    if(page > 0)
      this.setState({ page: page - 1});
    else
      this.setState({ page: items.length - 1 });
  }
  next = () => {
    const { page } = this.state;
    if(page < items.length - 1)
      this.setState({ page: page + 1});
    else
      this.setState({ page: 0 });
  }
  render() {
    const { page } = this.state;
    return (
      <div style={{
        margin: 16,
        border: '1px solid #4d5a60',
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px'
      }}>
        <PrefetchImage prefetchRange={[1, 2]}
          activeIndex={page}
          items={items}>
          {(meta) =>
            <div className="wrapper">
              {meta.map(({ src, prefetch, isActive }, i) => {
                return (
                  <div key={`slide-${i}`}>
                    {prefetch}
                    <img alt={`slide-${i}`}
                      className="item" src={src}
                      style={isActive ? { transform: 'translateX(0)' } : {}}
                      onClick={this.next}/>
                  </div>
                );
              })}
            </div>}
        </PrefetchImage>
        {/* TIMELINE */}
        <div className="timeline">
          <div className="done" style={{
            width: `${(page) * 100 / (items.length - 1)}%`
          }}/>
        </div>
        {/* TOOLBAR */}
        <div className="toolbar">
          <button label="<" onClick={this.prev}>
            <i class="fa fa-arrow-circle-left" aria-hidden="true" />
          </button>
          <div className="page">
            <p style={{ minWidth: 52 }}>{`${this.state.page + 1} / ${items.length}`}</p>
          </div>
          <button label=">" onClick={this.next}>
            <i class="fa fa-arrow-circle-right" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }
}
