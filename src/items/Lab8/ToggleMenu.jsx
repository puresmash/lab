import React, { Component } from 'react';

// HOC
function makeToggleable(Clickable) {
  // My class will overrided by static displayName
  return class MyClass extends Component {
    static displayName = 'MyCustomToggle';
    constructor() {
      super();
      this.state = { toggle: false };

    }
    toggle = () => {
      this.setState({ toggle: !this.state.toggle });
    }
    render() {
      return (
        <div id="toggle-wrapper">
          <Clickable {...this.props} onClick={this.toggle} />
          { this.state.toggle && this.props.children }
        </div>
      )
    }
  }
}

// @makeToggleable
// class Toggle extends Component {
//   render() {
//     return <h1
//       style={{ backgroundColor: 'lightgray' }}
//       onClick={this.props.onClick}>
//       {this.props.title}
//     </h1>
//   }
// }

const Toggle = (props) =>
  <h1 style={{ backgroundColor: 'lightgray' }}
    onClick={props.onClick}>
    {props.title}
  </h1>

export default makeToggleable(Toggle);
