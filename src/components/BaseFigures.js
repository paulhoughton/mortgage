import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../ducks/mortgage';

export default connect(({ mortgage }) => ({ mortgage }))(
  ({ mortgage: { initial, years, rate }, className, dispatch }) => (
    <div className={ className }>
      <div>
        <h2>Initial</h2>
        <label>Amount</label>
        <input type="text" maxLength="7" value={ initial } onChange={ e=>dispatch(actions.setInitial(e.target.value)) } />
      </div>
      <div>
        <label>Years</label>
        <input type="number" maxLength="2" value={ years } onChange={ e=>dispatch(actions.setYears(e.target.value)) } />
      </div>
      <div>
        <label>Rate</label>
        <input type="text" value={ rate } onChange={ e=>dispatch(actions.setRate(e.target.value)) } />
      </div>
    </div>
  ));