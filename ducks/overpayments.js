const ADD_OVERPAYMENT = 'OVERPAYMENT/ADD';
const DELETE_OVERPAYMENT = 'OVERPAYMENT/DELETE';
const UPDATE_OVERPAYMENT = 'OVERPAYMENT/UPDATE';

const initialState = [{ year: 0, month: 1, amount: 0 }];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_OVERPAYMENT:
      return state.concat(initialState);
    case UPDATE_OVERPAYMENT:
      return state.map((item, i) => action.index === i ?
        Object.assign({}, item, { [action.field]: +action.val }) :
        item
      );
    case DELETE_OVERPAYMENT:
      return state.filter((_, i) => i !== +action.index);
    default:
      return state;
  }
}

export const addOverpayment = () => ({ type: ADD_OVERPAYMENT });
export const deleteOverpayment = index => dispatch => () => dispatch({ type: DELETE_OVERPAYMENT, index });
export const updateOverpayment = (index, field) => dispatch => event => dispatch(
  { type: UPDATE_OVERPAYMENT, index, field, val: event.target.value }
);

