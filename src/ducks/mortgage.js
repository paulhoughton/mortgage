const SET_INITIAL = 'SET/INITIAL';
const SET_YEARS = 'SET/YEARS';
const SET_RATE = 'SET/RATE';
const SET_MONTHLY_OVERPAYMENT = 'SET/MONTHLY_OVERPAYMENT';

const initialState = {
  initial: 200000,
  rate: 5,
  years: 25,
  monthlyOverpayment: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL:
      return {
        ...state,
        initial: action.val
      };
    case SET_RATE:
      return {
        ...state,
        rate: action.val
      };
    case SET_YEARS:
      return {
        ...state,
        years: action.val
      };
    case SET_MONTHLY_OVERPAYMENT:
      return {
        ...state,
        monthlyOverpayment: action.val
      };
    default:
      return state;
  }
}

export const setInitial = val => ({ type: SET_INITIAL, val });
export const setYears = val => ({ type: SET_YEARS, val });
export const setRate = val => ({ type: SET_RATE, val });
export const setMonthlyOverpayment = val => ({ type: SET_MONTHLY_OVERPAYMENT, val });
