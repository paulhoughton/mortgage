import TableMortgage from './TableMortgage';
import Chart from './Chart';
import BaseFigures from './BaseFigures';
import Overpayment from './Overpayment';

export default (props)=> (
  <div className="container-fluid">
    <div className="col-md-8 col-sm-12">
      <BaseFigures className="col-sm-4" {...props} />
      <Overpayment className="col-sm-8" {...props} />
      <div className="col-sm-12">
        <h2>Monthly Payment
          <span className="money"> {(+props.monthlyPayment + props.monthlyOverpayment).toFixed(2)}</span>
        </h2>
        <Chart data={props.payments} />
      </div>
    </div>
    <TableMortgage className="col-sm-4" {...props} />
  </div>
)
