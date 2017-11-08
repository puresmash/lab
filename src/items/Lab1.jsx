import React, { Component } from 'react';
import Toogle from '../components/Toogle';


export default class extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }
  render() {
    return (
      <div>
        <button onClick={() => this.setState({ open: !this.state.open })}>
          toogle
        </button>
        <Toogle open={this.state.open}/>
      </div>
    );
  }
}
