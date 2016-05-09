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

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_INITIAL:
      return {
      ...state,
        initial: +action.val
      };
    case SET_RATE:
      return {
        ...state,
        rate: +action.val
      };
    case SET_YEARS:
      return {
        ...state,
        years: +action.val
      };
    case SET_MONTHLY_OVERPAYMENT:
      return {
        ...state,
        monthlyOverpayment: +action.val
      };
    default:
      return state;
  }
}

export const setInitial = (event) => ({ type: SET_INITIAL, val: event.target.value });
export const setYears = (event) => ({ type: SET_YEARS, val: event.target.value });
export const setRate = (event) => ({ type: SET_RATE, val: event.target.value });
export const setMonthlyOverpayment = (event) => ({ type: SET_MONTHLY_OVERPAYMENT, val: event.target.value });
