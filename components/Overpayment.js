import React, {Component} from 'react';
export default class Overpayment extends Component {
  setMonthlyOverpayment(e){
	  this.props.actions.setMonthlyOverpayment(e.target.value)
  }
  addOverpayment(){
	  this.props.actions.addOverpayment();
  }
  updateOverpayment(index, type, e) {
    this.props.actions.updateOverpayment(index, type,+e.target.value)
  }
  deleteOverpayment(index){
	  this.props.actions.deleteOverpayment(index);
  }

  render() {
    return (
      <div>
        <div>
          <h2>Overpayment</h2>
          <label>Monthly</label>
          <input type="text" maxLength="5" value={this.props.monthlyOverpayment} onChange={::this.setMonthlyOverpayment}/>
        </div>
        <div>
            <label>Year</label>
            <label>Month</label>
            <label>Amount</label>
        </div>
        {this.props.overpayments.map((payment,i)=>(<div key={i}>
            <input type="text" type="number" min="0" max={this.props.years} value={payment.year} onChange={this.updateOverpayment.bind(this, i, "year")} />
            <input type="text" type="number" min="1" max="12" value={payment.month} onChange={this.updateOverpayment.bind(this, i, "month")} />
            <input type="text" value={payment.amount} onChange={this.updateOverpayment.bind(this, i, "amount")}  />
            
            {i===this.props.overpayments.length-1 ?
              <button className="btn btn-xs" onClick={::this.addOverpayment}>+</button> : 
              <button className="btn btn-xs" onClick={this.deleteOverpayment.bind(this, i)}>X</button>}
          </div>))
        }
        <div>
        </div>

      </div>
    );
  };
}