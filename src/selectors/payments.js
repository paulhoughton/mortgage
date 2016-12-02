import { createSelector } from 'reselect';

import { calculatePayments } from '../helpers/mortgage';

const getMortgage = (state) => state.mortgage;
const getOverpayments = (state) => state.overpayments;

export default createSelector(
  [ getMortgage, getOverpayments ],
  (mortgage, overpayments) => {
    return calculatePayments({ ...mortgage, overpayments })
  }
);