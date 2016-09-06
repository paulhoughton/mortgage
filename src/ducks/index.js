import { combineReducers } from 'redux';
import mortgage from './mortgage';
import overpayments from './overpayments';

const rootReducer = combineReducers({
  mortgage,
  overpayments
});

export default rootReducer;
