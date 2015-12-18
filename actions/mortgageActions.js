import * as types from '../constants/ActionTypes';

export function setInitial(event) {
  return { type: types.SET_INITIAL, val:event.target.value };
}

export function setYears(event) {
  return { type: types.SET_YEARS, val:event.target.value };
}

export function setRate(event) {
  return { type: types.SET_RATE, val:event.target.value };
}

export function setMonthlyOverpayment(event) {
  return { type: types.SET_MONTHLY_OVERPAYMENT, val:event.target.value };
}

export function addOverpayment() {
  return { type: types.ADD_OVERPAYMENT };
}

export function updateOverpayment(index, field, event) {
  return { type: types.UPDATE_OVERPAYMENT, index, field, val:event.target.value };
}

export function deleteOverpayment(index) {
  return { type: types.DELETE_OVERPAYMENT, index };
}