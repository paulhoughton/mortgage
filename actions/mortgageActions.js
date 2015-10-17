import * as types from '../constants/ActionTypes';

export function setInitial(val) {
  return { type: types.SET_INITIAL, val };
}

export function setYears(val) {
  return { type: types.SET_YEARS, val };
}

export function setRate(val) {
  return { type: types.SET_RATE, val };
}

export function setMonthlyOverpayment(val) {
  return { type: types.SET_MONTHLY_OVERPAYMENT, val };
}

export function addOverpayment() {
  return { type: types.ADD_OVERPAYMENT };
}

export function updateOverpayment(index, field, value) {
  return { type: types.UPDATE_OVERPAYMENT, index, field, value };
}

export function deleteOverpayment(val) {
  return { type: types.DELETE_OVERPAYMENT, val };
}