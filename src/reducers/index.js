
import { combineReducers } from 'redux';

const rootReducer = (state={}, action) => {
  switch (action.type) {
    case 'TEST_ACTION_SUCCESS':
      console.log('Receive action', action);
      return { ...state }
    default:
      return state;
  }
}

export default combineReducers({
  rootReducer
});
