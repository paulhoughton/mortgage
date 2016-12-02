import React from 'react';
import { connect } from 'react-redux';

import { setMonthlyOverpayment } from '../ducks/mortgage';
import * as actions from '../ducks/overpayments';


export default connect(({ mortgage, overpayments })=>({ mortgage, overpayments }))(
({ mortgage, overpayments, className, dispatch }) => (
  <div className={ className }>
    <div>
      <h2>Overpayment</h2>
      <label>Monthly</label>
      <input type="text" maxLength="5" value={ mortgage.monthlyOverpayment } onChange={ e=>dispatch(setMonthlyOverpayment(e.target.value)) }/>
    </div>
    <div>
        <label>Year</label>
        <label>Month</label>
        <label>Amount</label>
    </div>
    {overpayments.map(({ year, month, amount }, i) => (
      <div key={i}>
        <input type="number" min="0" max={ mortgage.years } value={ year } onChange={ e=>dispatch(actions.updateOverpayment(i, "year", e.target.value )) } />
        <input type="number" min="1" max="12" value={ month } onChange={ e=>dispatch(actions.updateOverpayment(i, "month", e.target.value )) } />
        <input type="text" value={ amount } onChange={ e=>dispatch(actions.updateOverpayment(i, "amount", e.target.value )) } />

        {i === overpayments.length-1 ?
          <button className="btn btn-xs" onClick={ e=>dispatch(actions.addOverpayment()) }>+</button> :
          <button className="btn btn-xs" onClick={ e=>dispatch(actions.deleteOverpayment(i)) }>X</button>}
      </div>))
    }

  </div>
));
