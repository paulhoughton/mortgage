import React from 'react';

import Header from '../components/Header';
import TableMortgage from './TableMortgage';
import Chart from './Chart';
import BaseFigures from './BaseFigures';
import Overpayment from './Overpayment';
import Payment from './Payment';

export default () => (
  <div>
    <Header title={"Mortgage Overpayment Calculator"} />
    <div className="container-fluid">
      <div className="col-md-8 col-sm-12">
        <BaseFigures className="col-sm-4" />
        <Overpayment className="col-sm-8" />
        <div className="col-sm-12">
          <Payment title="Monthly Payment" />
          <Chart />
        </div>
      </div>
      <TableMortgage className="col-sm-4" />
    </div>
  </div>
)


