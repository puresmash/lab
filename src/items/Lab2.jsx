import React, { Component } from 'react';
import { spring } from 'react-motion';
import SkeletonUi from '../components/SkeletonUi';



export default class Lab2 extends Component {
  constructor() {
    super();
    this.state = {
      items: [
        {key: '1', data: 10, style: { x: 0, opacity: 100, height: 32, margin: 16 }},
        {key: '2', data: 20, style: { x: 0, opacity: 100, height: 32, margin: 16 }},
        {key: '3', data: 30, style: { x: 0, opacity: 100, height: 32, margin: 16 }}
      ]
    }
  }
  render() {
    return (
      <div>
        <button onClick={() => {
          this.setState({ items: this.state.items.splice(1) });
        }}>Remove first</button>
        <button onClick={() => {
          const index = Math.max(...this.state.items.map(ele => parseInt(ele.key)))
          const newItem = {
            key: `${index + 1}`,
            data: (index + 1) * 10,
            style: { x: spring(0), opacity: spring(100), height: spring(32), margin: spring(16) }
          };
          this.setState({ items: [newItem].concat(this.state.items) });
        }}>Add first</button>
        <SkeletonUi items={this.state.items}/>
      </div>
    );
  }
}
