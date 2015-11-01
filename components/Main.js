import React from 'react';
import {calculatePayments} from '../helpers/mortgage';
import TableMortgage from './TableMortgage';
import Chart from './Chart';
import BaseFigures from './BaseFigures';
import Overpayment from './Overpayment';

export default (props)=> {

    const { rate, initial, years, actions, monthlyOverpayment, overpayments } = props;
    const { monthlyPayment, payments } = calculatePayments(initial, years, rate, monthlyOverpayment, overpayments);
    
    return (
      <div className="container-fluid">
        <div className="col-md-8 col-sm-12">
          <div className="col-sm-4">
            <BaseFigures {...props} />
          </div>
          <div className="col-sm-8">
            <Overpayment {...props} />
          </div>
          <div className="col-sm-12">
            <h2>Monthly Payment
              <span className="money"> {(+monthlyPayment + monthlyOverpayment).toFixed(2)}</span>
            </h2>
            <Chart data={payments} />
          </div>
        </div>
        <div className="col-sm-4">
          <TableMortgage data={payments}/>
        </div>
      </div>
    )
}
