import React, { Component } from 'react';
import { Observable } from 'rxjs';


export default class Lab6 extends Component {
  static TITLE = 'Demo dom mousedrag using rxjs';
  constructor(){
    super();
    this.state = {
      movementX: 0
    };
  }
  componentDidMount() {

    const $target = document.querySelector('#brick');

    const mousemove$ = Observable.fromEvent(document, 'mousemove')
    const mouseup$ = Observable.fromEvent(document, 'mouseup')
    const mousedown$ = Observable.fromEvent($target, 'mousedown');

    const mousedrag$ = mousedown$
    .switchMap(md => {
      const startX = md.screenX;
      console.log(startX)
      return mousemove$
      .map(mm => {
        mm.preventDefault();
        return mm.screenX - startX;
      })
      .takeUntil(mouseup$)
    })
    .subscribe(movementX => {
      this.setState({ movementX })
      console.log('mousedrag', movementX);
    });


  }
  render() {
    return (
      <div style={{ minWidth: '100%', minHeight: '100%' }}>
        <div
          id="brick"
          style={{
            width: 100,
            height: 100,
            background: 'lightseagreen',
            transform: `translateX(${this.state.movementX}px)`
          }}>
          brick
        </div>
        <button type="button" onClick={() => this.setState({ movementX: 0 })}>
          Reset
        </button>
      </div>
    )
  }
}
