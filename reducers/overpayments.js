import { ADD_OVERPAYMENT, DELETE_OVERPAYMENT, UPDATE_OVERPAYMENT } from '../constants/ActionTypes';

const initialState = [{year:0, month:1, amount:0}];

export default function overpayments(state = initialState, action) {
  switch (action.type) {
  case ADD_OVERPAYMENT:
    return state.concat(initialState);
  case UPDATE_OVERPAYMENT:
    return state.map((item, i)=>action.index===i ? 
			Object.assign({}, item, {[action.field]: +action.val}):
			item
		)
  case DELETE_OVERPAYMENT:
  	return state.filter(function(_,i) {return i!==+action.index});
  default:
    return state;
  }
}
