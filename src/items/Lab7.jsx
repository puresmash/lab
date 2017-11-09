import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ConsoleGUI from '../components/ConsoleGUI';
import * as Actions from '../actions';

const oldConsole = console.log;

class Lab7 extends Component {
  static TITLE = 'Demo throttle and exhaustMap of redux-observable';
  constructor() {
    super();
    this.state = {
      logs: []
    };
  }

  componentDidMount() {
    this.rewriteConsole();
  }

  rewriteConsole = () => {
    let queue = [];
    // Debounce here
    // prevent two console.log exec side by side
    // race condition (the first log will disappear)
    const fn = _.debounce(() => {
      if(queue.length === 0) return;
      this.setState({ logs: [].concat(queue.reverse()).concat(this.state.logs) });
      queue = [];
    }, 500, { maxWait: 1000 })
    console.log = (...args) => {
      oldConsole(...args);
      queue.push(...args);
      fn();
    }
  }

  // recover default behavior
  componentWillUnmount = () => {
    console.log = oldConsole;
  }

  render() {
    return (
      <div>
        <button onClick={() => this.props.dispatch(Actions.testing())}>
          Keep clicking me
        </button>
        <ConsoleGUI logs={this.state.logs}/>
      </div>
    );
  }
}

export default connect()(Lab7);
