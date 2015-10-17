import { SET_INITIAL, SET_RATE, SET_YEARS, SET_MONTHLY_OVERPAYMENT, ADD_OVERPAYMENT, DELETE_OVERPAYMENT, UPDATE_OVERPAYMENT } from '../constants/ActionTypes';

const initialState = {
	initial: 200000,
	rate:5,
	years:25,
	monthlyOverpayment:0,
	overpayments:[{year:0, month:1, amount:0}]
};

export default function calculations(state = initialState, action) {
	
  switch (action.type) {
  case SET_INITIAL:
	  return {
		  ...state,
		  initial:action.val
	  }
  case SET_RATE:
	  return {
		  ...state,
		  rate:action.val
	  }
  case SET_YEARS:
	  return {
		  ...state,
		  years:action.val
	  }
  case SET_MONTHLY_OVERPAYMENT:
	  return {
		  ...state,
		  monthlyOverpayment:+action.val
	  }
  case ADD_OVERPAYMENT:
    return {
		...state,
		overpayments:state.overpayments.concat({year:0, month:1, amount:0})
	}
  case UPDATE_OVERPAYMENT:
    return {
		...state,
		overpayments:state.overpayments.map((item, i)=>action.index===i ? 
			Object.assign({}, item, {[action.field]: action.value}):
			item
		)
	}
	case DELETE_OVERPAYMENT:
	return {
		...state,
		overpayments:state.overpayments.filter(function(d,i) {return i!==+action.val})
	}
  default:
    return state;
  }
}
