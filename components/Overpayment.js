import React, {Component} from 'react';
export default class Overpayment extends Component {
  setMonthlyOverpayment(e){
	  this.props.actions.setMonthlyOverpayment(e.target.value)
  }
  addOverpayment(){
	  this.props.actions.addOverpayment(this.refs.OverpayYear.value, this.refs.OverpayAmount.value)
	  this.refs.OverpayYear.value="";
	  this.refs.OverpayAmount.value="";
  }
  deleteOverpayment(index){
	  this.props.actions.deleteOverpayment(index);
  }

  render() {
    return (
      <div>
        <div>
          <h2>Overpayment</h2>
          <label>Monthly:</label>
          <input type="text" maxLength="5" value={this.props.monthlyOverpayment} onChange={::this.setMonthlyOverpayment}/>
        </div>
        {this.props.overpayments.map((payment,i)=>(<div key={i}>
            <label>Year:</label>
            <input type="text" value={payment.year} disabled />
            <label>Amount:</label>
            <input type="text" value={payment.amount} disabled />
            <button className="btn btn-xs" onClick={this.deleteOverpayment.bind(this, i)}>X</button>
          </div>))
        }
        <div>
          <label>Year:</label>
          <input type="text" maxLength="2" ref="OverpayYear" />
          <label>Amount:</label>
          <input type="text" maxLength="6" ref="OverpayAmount"  />
          <button className="btn btn-xs" onClick={::this.addOverpayment}>+</button>
        </div>

      </div>
    );
  };
}