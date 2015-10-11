import React, { Component } from 'react';
import {calculatePayments} from '../helpers';
import Table from './Table';
import Chart from './Chart';
import BaseFigures from './BaseFigures';
import Overpayment from './Overpayment';

export default class MainSection extends Component {

  render() {
    const { rate, initial, years, actions, monthlyOverpayment, overpayments} = this.props;
    const { monthlyPayment, payments } = calculatePayments(initial, years, rate, monthlyOverpayment, overpayments);
    
    return (
      <div className="container-fluid">
        <div className="col-md-8 col-sm-12">
          <div className="col-sm-4">
            <BaseFigures {...this.props} />
          </div>
          <div className="col-sm-8">
            <Overpayment {...this.props} />
          </div>
          <div className="col-sm-12">
            <h2>Monthly Payment:
              <span className="money"> {(+monthlyPayment + monthlyOverpayment).toFixed(2)}</span>
            </h2>
            <Chart data={payments} />
          </div>
        </div>
        <div className="col-sm-4">
          <Table data={payments}/>
        </div>
      </div>
    )
  }
}
