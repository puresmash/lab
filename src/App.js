import React, { Component } from 'react';
import classNames from 'classnames';
import labs from './items';

import './App.css';

const TITLE = [
  'Display additive animation',
  'Demo mount and unmount effect',
  'Demo react-motion using player',
  'Demo old PrefetchPlayer',
  'Demo new PrefetchPlayer',
  'Demo dom mousedrag using rxjs',
  'Demo throttle and exhaustMap of redux-observable'
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      active: 6
    }
  }
  render() {
    const { active } = this.state;
    const ActComp = Object.values(labs)[active];
    return (
      <div className="App">
        <nav className="Nav">
          <ul style={{ listStyle: 'none', padding: 0 }}><li>
            {Object.keys(labs).map((ele, i) =>
              <div key={`item-${i}`}
                className={classNames('nav-item', active === i && 'nav-active')}
                onClick={() => this.setState({ active: i })}>
                {ele}
              </div>
            )}
          </li></ul>
        </nav>
        <section className="Content">
          <header className="Content-header">
            <h2>{TITLE[active]}</h2>
          </header>
          <div style={{ margin: 8 }}>{<ActComp />}</div>
        </section>
      </div>
    );
  }
}

export default App;
