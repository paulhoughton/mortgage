import React from 'react';
import { connect } from 'react-redux';

import payments from '../selectors/payments'

export default connect((state, props)=>({ monthlyOverpayment:state.mortgage.monthlyOverpayment, ...payments(state) }))(
({monthlyPayment, monthlyOverpayment, title})=> (
  <h2>{title}
    <span className="money"> {(+monthlyPayment + (+monthlyOverpayment)).toFixed(2)}</span>
  </h2>
))