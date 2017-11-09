import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { logTime, mockApiCall } from './utils/mockUtils';
import * as Actions from './actions';
// epics
import 'rxjs';

const rootReducer = (state={}, action) => {
  switch (action.type) {
    case 'TEST_ACTION_SUCCESS':
      console.log('Receive action', action);
      return { ...state }
    default:
      return state;
  }
}

const rootEpic = combineEpics(
  action$ => {
    return action$
    .ofType(Actions.TEST_ACTION)
    .throttleTime(1000)
    .map((action) => {
      console.log('Pass throttle');
      return action;
    })
    .exhaustMap((action) => {
      console.log('===WAITING API RESULT for 5 SECS===');
      console.log('EXHAUST ANY for 5 SECS');
      console.log(action)
      logTime(5);
      return mockApiCall(5);
    })
    .mapTo({ type: 'TEST_ACTION_SUCCESS' });
  }
)

const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware)
)

ReactDOM.render(
  <Provider store={store}><App/></Provider>,
  document.getElementById('root')
 );
registerServiceWorker();
